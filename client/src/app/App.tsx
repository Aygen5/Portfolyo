import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';
import { ProfileTabId } from '../domain/models';
import { AboutTab } from '../features/about/AboutTab';
import { FeedTab } from '../features/feed/FeedTab';
import { GuestbookTab } from '../features/guestbook/GuestbookTab';
import { HeroSection } from '../features/hero/HeroSection';
import { Footer } from '../features/navbar/Footer';
import { Navbar } from '../features/navbar/Navbar';
import { ProfileHeaderCard } from '../features/profile/ProfileHeaderCard';
import { ProfileTabs } from '../features/profile/ProfileTabs';
import { TechStackTab } from '../features/stack/TechStackTab';
import { usePortfolioStream } from '../hooks/usePortfolioStream';

export function App() {
  const [activeTab, setActiveTab] = useState<ProfileTabId>('feed');
  const {
    projects,
    posts,
    guestbook,
    isLoading,
    toast,
    dismissToast,
    isProjectLiked,
    isPostLiked,
    handleLikeProject,
    handleLikePost,
    handleAddGuestbookEntry,
    handleSendMessage,
  } = usePortfolioStream();

  const handleSelectTab = useCallback((tab: ProfileTabId, scrollToTabs = false) => {
    setActiveTab(tab);
    if (scrollToTabs) {
      document.getElementById('profile-tabs')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleHireMeClick = useCallback(() => {
    setActiveTab('guestbook');
    document.getElementById('profile-tabs')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onHireMeClick={handleHireMeClick}
      />

      <main
        id="top"
        className="flex-1 w-full max-w-3xl mx-auto px-md sm:px-lg py-lg sm:py-xl flex flex-col gap-xl"
      >
        <HeroSection
          onViewProjects={() => handleSelectTab('feed', true)}
          onGetInTouch={handleHireMeClick}
        />

        <Card as="section" className="overflow-hidden">
          <ProfileHeaderCard onContactClick={handleHireMeClick} />

          <ProfileTabs
            activeTab={activeTab}
            onSelectTab={(tab) => handleSelectTab(tab, false)}
            projectCount={projects.length || 6}
          />

          <div className="p-md sm:p-lg bg-light-surface/40 dark:bg-dark-surface/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
              >
                {activeTab === 'feed' && (
                  <FeedTab
                    projects={projects}
                    posts={posts}
                    isLoading={isLoading}
                    isProjectLiked={isProjectLiked}
                    isPostLiked={isPostLiked}
                    onLikeProject={handleLikeProject}
                    onLikePost={handleLikePost}
                  />
                )}

                {activeTab === 'about' && <AboutTab />}

                {activeTab === 'stack' && <TechStackTab />}

                {activeTab === 'guestbook' && (
                  <GuestbookTab
                    entries={guestbook}
                    onAddEntry={handleAddGuestbookEntry}
                    onSendMessage={handleSendMessage}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </main>

      <Footer />

      <Toast
        message={toast?.message ?? null}
        type={toast?.type}
        onDismiss={dismissToast}
      />
    </div>
  );
}
