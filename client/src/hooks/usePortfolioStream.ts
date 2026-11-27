import { useCallback, useEffect, useState } from 'react';
import {
  CreateGuestbookPayload,
  CreateMessagePayload,
  GuestbookEntry,
  Post,
  Project,
} from '../domain/models';
import { guestbookService } from '../services/guestbookService';
import { messageService } from '../services/messageService';
import { postService } from '../services/postService';
import { projectService } from '../services/projectService';
import { useLikedStorage } from './useLikedStorage';

export function usePortfolioStream() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const projectLikes = useLikedStorage('aygen-liked-projects');
  const postLikes = useLikedStorage('aygen-liked-posts');

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' = 'success') => {
      setToast({ message, type });
      setTimeout(() => {
        setToast((prev) => (prev?.message === message ? null : prev));
      }, 3600);
    },
    []
  );

  const refreshAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [projData, postData, guestData] = await Promise.all([
        projectService.getAll(),
        postService.getAll(),
        guestbookService.getAll(),
      ]);
      setProjects(projData);
      setPosts(postData);
      setGuestbook(guestData);
    } catch {
      showToast('Could not connect to backend API. Ensure server is running.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const handleLikeProject = useCallback(
    async (id: string) => {
      // Optimistic increment
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
      );
      projectLikes.markLiked(id);

      try {
        const updated = await projectService.like(id);
        setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
      } catch {
        // Revert optimistic update on failure
        setProjects((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, likes: Math.max(0, p.likes - 1) } : p
          )
        );
        showToast('Could not save like right now.', 'error');
      }
    },
    [projectLikes, showToast]
  );

  const handleLikePost = useCallback(
    async (id: string) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
      );
      postLikes.markLiked(id);

      try {
        const updated = await postService.like(id);
        setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      } catch {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, likes: Math.max(0, p.likes - 1) } : p
          )
        );
        showToast('Could not save like right now.', 'error');
      }
    },
    [postLikes, showToast]
  );

  const handleAddGuestbookEntry = useCallback(
    async (payload: CreateGuestbookPayload) => {
      try {
        const created = await guestbookService.create(payload);
        setGuestbook((prev) => [created, ...prev]);
        showToast('Your note has been posted to the guestbook!');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to post note.';
        showToast(msg, 'error');
        throw err;
      }
    },
    [showToast]
  );

  const handleSendMessage = useCallback(
    async (payload: CreateMessagePayload) => {
      try {
        await messageService.send(payload);
        showToast('Direct message sent to Aygen!');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to send message.';
        showToast(msg, 'error');
        throw err;
      }
    },
    [showToast]
  );

  return {
    projects,
    posts,
    guestbook,
    isLoading,
    toast,
    showToast,
    dismissToast: () => setToast(null),
    isProjectLiked: projectLikes.isLiked,
    isPostLiked: postLikes.isLiked,
    handleLikeProject,
    handleLikePost,
    handleAddGuestbookEntry,
    handleSendMessage,
    refreshAll,
  };
}

