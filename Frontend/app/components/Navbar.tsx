'use client';

import React, { useState } from 'react';
import {
  FaFire,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';
import { HiBars3 } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import ExamSebaLogo from './ExamSebaLogo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenExamModal: (examId?: string) => void;
  onOpenAuthModal: (mode: 'login' | 'signup') => void;
  onOpenDashboard: () => void;
  currentUser: { name: string; phone: string; batch: string } | null;
  onLogout: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({
  onOpenExamModal,
  onOpenAuthModal,
  onOpenDashboard,
  currentUser,
  onLogout,
  activeSection,
  setActiveSection
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'exams', label: t.nav.exams },
    { id: 'courses', label: t.nav.courses },
    { id: 'studyroom', label: t.nav.studyroom },
    { id: 'job_alert', label: t.nav.job_alert },
    { id: 'leaderboard', label: t.nav.leaderboard },
    { id: 'routine', label: t.nav.routine },
    { id: 'books', label: t.nav.books },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Notice (Biddabari / Bijoyjatra style alert bar) */}
      <div className="bg-[#004085] text-white text-xs md:text-sm py-1.5 px-4 font-medium border-b border-blue-400/20">
        <div className="container mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
              {t.nav.liveUpdate}
            </span>
            <span className="truncate">
              {t.nav.topNotice}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-blue-100 shrink-0">
            <span className="hidden md:inline">{t.nav.helpline}</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{t.nav.hours}</span>
            <span className="hidden md:inline">|</span>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-xs shadow transition-all flex items-center gap-1 border border-amber-300 hover:scale-105"
              title="Change Language / ভাষা পরিবর্তন করুন"
              aria-label="Toggle language between Bangla and English"
            >
              <span>🌐</span>
              <span>{t.nav.switchLang}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="navbar-custom">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between min-h-[68px] gap-2">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-blue-100 transition-transform duration-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <IoClose size={26} /> : <HiBars3 size={26} />}
            </button>

            {/* Brand Logo - default Bangla, updates to English when lang changes */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="group py-1"
            >
              <ExamSebaLogo lang={lang} theme="dark" size="md" />
            </a>

            {/* Desktop Navigation Links - CLEAN TEXT (No extra icons) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`nav-link-custom ${isActive ? 'active' : ''}`}
                  >
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Action & User Profile Section */}
            <div className="flex items-center gap-2.5 ml-auto lg:ml-0">
              
              {/* Live Exam Fast Launch Button */}
              <button
                onClick={() => onOpenExamModal()}
                className="hidden sm:inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-3.5 py-1.5 rounded-full text-xs md:text-sm shadow-md transition-transform hover:scale-105"
              >
                <FaFire className="w-4 h-4 text-red-600 animate-bounce" />
                <span>{t.nav.liveExamBtn}</span>
              </button>

              {/* User Profile or Login CTA */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs uppercase shadow">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-800 text-sm truncate">{currentUser.name}</p>
                        <p className="text-xs text-slate-500">{currentUser.phone}</p>
                        <span className="inline-block mt-1 text-[10px] bg-blue-50 text-[#007bff] font-bold px-2 py-0.5 rounded">
                          {currentUser.batch}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onOpenDashboard();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#007bff] flex items-center gap-2 font-medium"
                      >
                        <FaUserCircle className="w-4 h-4" />
                        <span>{t.nav.dashboardBtn}</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium border-t border-slate-100"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        <span>{t.nav.logout}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenAuthModal('login')}
                    className="px-3 py-1.5 text-xs font-bold text-white hover:text-blue-100 transition-colors"
                  >
                    {t.nav.login}
                  </button>
                  <button
                    onClick={() => onOpenAuthModal('signup')}
                    className="px-3.5 py-1.5 text-xs font-bold bg-white text-[#007bff] hover:bg-blue-50 rounded-lg shadow-sm transition-all"
                  >
                    {t.nav.signup}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[#004085] text-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-white/15 flex items-center justify-between">
          <ExamSebaLogo lang={lang} theme="dark" size="sm" />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-xs shadow flex items-center gap-1"
              aria-label="Toggle language"
            >
              <span>🌐</span>
              <span>{t.nav.switchLang}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white"
            >
              <IoClose size={22} />
            </button>
          </div>
        </div>

        {/* User Card inside mobile menu */}
        <div className="p-4 bg-white/10 border-b border-white/10">
          {currentUser ? (
            <div>
              <p className="font-bold text-sm">{currentUser.name}</p>
              <p className="text-xs text-blue-100">{currentUser.phone}</p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="mt-2 text-xs bg-white text-[#007bff] px-3 py-1 rounded-md font-bold inline-block"
              >
                {t.nav.dashboardBtn}
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal('login');
                }}
                className="flex-1 py-1.5 bg-white text-[#007bff] text-xs font-bold rounded-lg text-center"
              >
                {t.nav.login}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal('signup');
                }}
                className="flex-1 py-1.5 bg-blue-600 border border-white/30 text-white text-xs font-bold rounded-lg text-center"
              >
                {t.nav.signup}
              </button>
            </div>
          )}
        </div>

        {/* Clean text nav links in drawer (No icons) */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'text-blue-50 hover:bg-white/10'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/15 bg-black/10">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenExamModal();
            }}
            className="w-full bg-amber-400 text-slate-900 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <FaFire className="w-4 h-4 text-red-600" />
            <span>{t.nav.liveExamBtn}</span>
          </button>
        </div>
      </div>
    </>
  );
}
