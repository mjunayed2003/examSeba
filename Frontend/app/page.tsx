'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import ExamBatchesSection from './components/ExamBatchesSection';
import CourseCatalogSection from './components/CourseCatalogSection';
import DailyFreeExamSection from './components/DailyFreeExamSection';
import LeaderboardSection from './components/LeaderboardSection';
import JobAlertSection from './components/JobAlertSection';
import RoutineNoticeSection from './components/RoutineNoticeSection';
import BookStoreSection from './components/BookStoreSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import LiveExamModal, { ExamResult } from './components/LiveExamModal';
import AuthModal from './components/AuthModal';
import StudentDashboardModal from './components/StudentDashboardModal';
import { SAMPLE_EXAMS, Exam, Course } from './data/examData';

export default function Home() {
  // Navigation State
  const [activeSection, setActiveSection] = useState('home');

  // Exam Modal State
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Student Profile State (Simulated user login)
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    phone: string;
    batch: string;
  } | null>({
    name: 'আব্দুল্লাহ আল মামুন',
    phone: '01712345678',
    batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
  });

  // Student Dashboard Modal State
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Success Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Start Exam Trigger
  const handleStartExam = (exam?: Exam) => {
    const selected = exam || SAMPLE_EXAMS[0];
    setActiveExam(selected);
    setIsExamModalOpen(true);
  };

  // Open Auth Modal
  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Enroll in Course
  const handleEnrollCourse = (course: Course) => {
    if (!currentUser) {
      handleOpenAuth('signup');
    } else {
      showToast(`'${course.title}' কোর্সে সফলভাবে এনরোলমেন্ট রিকুয়েস্ট গ্রহণ করা হয়েছে!`);
    }
  };

  const handleSaveResult = (res: ExamResult) => {
    showToast(`পরীক্ষা সম্পন্ন! আপনার প্রাপ্ত স্কোর: ${res.finalScore}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] selection:bg-[#007bff] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar with responsive menu & profile dropdown */}
      <Navbar
        onOpenExamModal={() => handleStartExam()}
        onOpenAuthModal={handleOpenAuth}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast('সফলভাবে লগআউট সম্পন্ন হয়েছে।');
        }}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1">
        {/* Exact Bijoyjatra Hero Section */}
        <div id="home">
          <HeroSection
            onStartExam={() => handleStartExam(SAMPLE_EXAMS[0])}
            onOpenDemo={() => handleStartExam(SAMPLE_EXAMS[1])}
            onOpenAuth={() => handleOpenAuth('signup')}
          />
        </div>

        {/* Exact Bijoyjatra Stats Section with animated counter numbers */}
        <StatsSection />

        {/* Exact Bijoyjatra Features Section (6 cards) */}
        <FeaturesSection />

        {/* Exact Bijoyjatra Exam Batches Section (প্রাইমারি, বিসিএস, নিবন্ধন, ইত্যাদি) */}
        <ExamBatchesSection onStartExam={handleStartExam} />

        {/* Biddabari Feature: Live Courses & Batches Catalog */}
        <CourseCatalogSection onEnrollCourse={handleEnrollCourse} />

        {/* Biddabari Feature: Free Study Room & Daily Free Model Test */}
        <DailyFreeExamSection onStartExam={handleStartExam} />

        {/* Biddabari Feature: Live Leaderboard & Merit List */}
        <LeaderboardSection />

        {/* Biddabari Feature: Job Circulars & Alert */}
        <JobAlertSection />

        {/* Biddabari Feature: Exam Routine Schedule & Notice Board */}
        <RoutineNoticeSection onStartExam={() => handleStartExam()} />

        {/* Biddabari Feature: Publications & Book Store */}
        <BookStoreSection />

        {/* Exact Bijoyjatra Call To Action Section */}
        <CtaSection
          onStartExam={() => handleStartExam(SAMPLE_EXAMS[0])}
          onOpenAuth={() => handleOpenAuth('signup')}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(sec) => {
          setActiveSection(sec);
          const el = document.getElementById(sec);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Interactive Live Exam Runner Modal (Biddabari's flagship feature) */}
      <LiveExamModal
        exam={activeExam}
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        onViewLeaderboard={() => {
          setActiveSection('leaderboard');
          const el = document.getElementById('leaderboard');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSaveResult={handleSaveResult}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`স্বাগতম, ${user.name}!`);
        }}
      />

      {/* Student Dashboard Modal */}
      <StudentDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        user={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast('লগআউট সম্পন্ন হয়েছে।');
        }}
        onStartExam={() => handleStartExam()}
      />

    </div>
  );
}
