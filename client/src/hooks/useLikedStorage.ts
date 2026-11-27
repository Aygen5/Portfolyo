import { useCallback, useState } from 'react';

export function useLikedStorage(storageKey: string) {
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });

  const markLiked = useCallback(
    (id: string) => {
      setLikedIds((prev) => {
        const next = { ...prev, [id]: true };
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          // ignore storage quota errors
        }
        return next;
      });
    },
    [storageKey]
  );

  const isLiked = useCallback((id: string) => Boolean(likedIds[id]), [likedIds]);

  return { isLiked, markLiked };
}
