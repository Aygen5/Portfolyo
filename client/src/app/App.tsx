import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';
import { ProfileTabId } from '../domain/models';
import { AboutTab } from '../features/about/AboutTab';
import { AdminDashboard } from '../features/admin/AdminDashboard';
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
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(
    () => window.location.pathname === '/admin'
  );

  const {
    projects,
    posts,
    guestbook,
    isLoading,
    toast,
    showToast,
    dismissToast,
    isProjectLiked,
    isPostLiked,
    handleLikeProject,
    handleLikePost,
    handleAddGuestbookEntry,
    handleSendMessage,
    refreshAll,
  } = usePortfolioStream();

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminRoute(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAdmin = useCallback(() => {
    window.history.pushState({}, '', '/admin');
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToPortfolio = useCallback(() => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectTab = useCallback(
    (tab: ProfileTabId, scrollToTabs = false) => {
      if (isAdminRoute) {
        window.history.pushState({}, '', '/');
        setIsAdminRoute(false);
      }
      setActiveTab(tab);
      if (scrollToTabs) {
        setTimeout(() => {
          document.getElementById('profile-tabs')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    },
    [isAdminRoute]
  );

  const handleHireMeClick = useCallback(() => {
    if (isAdminRoute) {
      window.history.pushState({}, '', '/');
      setIsAdminRoute(false);
    }
    setActiveTab('guestbook');
    setTimeout(() => {
      document.getElementById('profile-tabs')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, [isAdminRoute]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onHireMeClick={handleHireMeClick}
      />

      <main
        id="top"
        className="flex-1 w-full max-w-5xl mx-auto px-md sm:px-lg py-lg sm:py-xl flex flex-col gap-xl"
      >
        {isAdminRoute ? (
          <AdminDashboard
            projects={projects}
            posts={posts}
            guestbook={guestbook}
            onRefreshPublicStream={refreshAll}
            onBackToPortfolio={navigateToPortfolio}
            onNotify={showToast}
          />
        ) : (
          <>
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
          </>
        )}
      </main>

      <Footer onOpenAdmin={navigateToAdmin} />

      <Toast
        message={toast?.message ?? null}
        type={toast?.type}
        onDismiss={dismissToast}
      />
    </div>
  );
}
