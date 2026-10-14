import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CourseCatalogue } from './components/courses/CourseCatalogue';
import { CourseOverviewPage } from './components/courses/CourseOverviewPage';
import { UnitTopicListingPage } from './components/courses/UnitTopicListingPage';
import { LessonPage } from './components/lesson/LessonPage';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { StudentProfilePage } from './components/profile/StudentProfilePage';
import { SettingsPage } from './components/profile/SettingsPage';
import { AchievementsPage } from './components/achievements/AchievementsPage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { LogInPage } from './components/auth/LogInPage';
import { PasswordResetPage } from './components/auth/PasswordResetPage';
import { AboutPage } from './components/info/AboutPage';
import { HelpPage } from './components/info/HelpPage';
import { CourseId } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [viewParams, setViewParams] = useState<Record<string, any>>({});

  const handleNavigate = (view: string, params: Record<string, any> = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#FAF8F0] text-[#24364B] flex flex-col font-sans">
        
        {/* Fixed Navigation Bar that remains visible on scroll */}
        <Navbar currentView={currentView} onNavigate={handleNavigate} />

        {/* Main Content with top padding (pt-16) to ensure content is never hidden under the fixed navbar */}
        <main className="flex-1 pt-16">
          {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}

          {currentView === 'courses' && <CourseCatalogue onNavigate={handleNavigate} />}

          {currentView === 'course-detail' && (
            <CourseOverviewPage
              courseId={(viewParams.courseId as CourseId) || 'python'}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'unit-detail' && (
            <UnitTopicListingPage
              courseId={(viewParams.courseId as CourseId) || 'python'}
              unitNumber={viewParams.unitNumber || 1}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'lesson' && (
            <LessonPage
              courseId={(viewParams.courseId as CourseId) || 'python'}
              topicNumber={viewParams.topicNumber || 1}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'dashboard' && <StudentDashboard onNavigate={handleNavigate} />}

          {currentView === 'profile' && <StudentProfilePage onNavigate={handleNavigate} />}

          {currentView === 'settings' && <SettingsPage onNavigate={handleNavigate} />}

          {currentView === 'achievements' && <AchievementsPage onNavigate={handleNavigate} />}

          {currentView === 'leaderboard' && <LeaderboardPage onNavigate={handleNavigate} />}

          {currentView === 'signup' && <SignUpPage onNavigate={handleNavigate} />}

          {currentView === 'login' && <LogInPage onNavigate={handleNavigate} />}

          {currentView === 'password-reset' && <PasswordResetPage onNavigate={handleNavigate} />}

          {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}

          {currentView === 'help' && <HelpPage onNavigate={handleNavigate} />}
        </main>
      </div>
    </AuthProvider>
  );
}
