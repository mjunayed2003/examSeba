'use client';

import React, { useState } from 'react';
import {
  Menu,
  X,
  User,
  GraduationCap,
  BookOpen,
  Award,
  Bell,
  LogOut,
  Calendar,
  Layers,
  ShoppingBag,
  Flame
} from 'lucide-react';

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

  const navLinks = [
    { id: 'home', label: 'Home', icon: Layers },
    { id: 'exams', label: 'Exams', icon: Award },
    { id: 'courses', label: 'কোর্সসমূহ', icon: GraduationCap },
    { id: 'studyroom', label: 'ফ্রি স্টাডি রুম', icon: BookOpen },
    { id: 'job_alert', label: 'Job Alert', icon: Bell },
    { id: 'leaderboard', label: 'লিডারবোর্ড', icon: Flame },
    { id: 'routine', label: 'রুটিন ও নোটিশ', icon: Calendar },
    { id: 'books', label: 'বই সম্ভার', icon: ShoppingBag },
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
      {/* Top Banner Notice (Biddabari style alert bar) */}
      <div className="bg-[#004085] text-white text-xs md:text-sm py-1.5 px-4 font-medium flex items-center justify-between border-b border-blue-400/20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
              লাইভ আপডেট
            </span>
            <span className="truncate">
              ⚡ ৪৭তম বিসিএস ও প্রাইমারি ৩য় ধাপের পূর্ণাঙ্গ লাইভ মডেল টেস্ট চলছে! ফ্রি অংশ নিন।
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-blue-100">
            <span>হেল্পলাইন: ০৯৬১-২০০৩০০</span>
            <span>|</span>
            <span>সকাল ৯টা - রাত ১০টা</span>
          </div>
        </div>
      </div>

      {/* Main Navbar - Exact Bijoyjatra styling */}
      <header className="navbar-custom">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between min-h-[68px] gap-2">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-blue-100 transition-transform duration-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Brand Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="flex items-center gap-2.5 text-white font-bold text-xl md:text-2xl tracking-wide group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-inner group-hover:scale-105 transition-all">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-white group-hover:text-blue-100 transition-colors">
                  JobQuizTest
                </span>
                <span className="text-[10px] text-blue-100 tracking-wider font-medium">
                  এক্সাম সেবা পোর্টাল
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`nav-link-custom ${isActive ? 'active' : ''}`}
                  >
                    <Icon className="w-4 h-4 opacity-90" />
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
                <Flame className="w-4 h-4 text-red-600 fill-red-600 animate-bounce" />
                <span>লাইভ এক্সাম</span>
              </button>

              {/* Profile or Login */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-3 py-1.5 rounded-full text-sm font-semibold transition-all shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-full bg-white text-[#007bff] font-bold flex items-center justify-center text-xs shadow-sm">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="max-w-[90px] truncate hidden md:inline">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-slate-100 animate-in fade-in zoom-in-95 duration-150"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                        <p className="font-bold text-slate-800 text-sm">{currentUser.name}</p>
                        <p className="text-xs text-slate-500">{currentUser.phone}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-[#007bff] text-[11px] font-semibold rounded-md border border-blue-200">
                          {currentUser.batch}
                        </span>
                      </div>

                      <button
                        onClick={onOpenDashboard}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#007bff] flex items-center gap-2.5 transition-colors"
                      >
                        <User className="w-4 h-4 text-[#007bff]" />
                        <span>শিক্ষার্থী ড্যাশবোর্ড</span>
                      </button>

                      <button
                        onClick={() => onOpenExamModal()}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#007bff] flex items-center gap-2.5 transition-colors"
                      >
                        <Award className="w-4 h-4 text-[#007bff]" />
                        <span>আমার পরীক্ষা ও ফলাফল</span>
                      </button>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>লগআউট করুন</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenAuthModal('login')}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 rounded-full text-xs md:text-sm border border-white/30 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onOpenAuthModal('signup')}
                    className="bg-white text-[#007bff] hover:bg-blue-50 font-bold px-3.5 py-1.5 rounded-full text-xs md:text-sm shadow-md transition-all hidden sm:inline-block"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[290px] bg-gradient-to-b from-[#007bff] to-[#0056b3] text-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-white" />
            <span className="font-extrabold text-lg text-white">JobQuizTest</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full text-white/80 hover:text-white"
          >
            <X size={22} />
          </button>
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
                ড্যাশবোর্ড দেখুন
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
                লগইন
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal('signup');
                }}
                className="flex-1 py-1.5 bg-blue-600 border border-white/30 text-white text-xs font-bold rounded-lg text-center"
              >
                অ্যাকাউন্ট খুলুন
              </button>
            </div>
          )}
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'text-blue-50 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 opacity-90" />
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
            <Flame className="w-4 h-4 text-red-600 fill-red-600" />
            <span>লাইভ পরীক্ষা শুরু করুন</span>
          </button>
        </div>
      </div>
    </>
  );
}
