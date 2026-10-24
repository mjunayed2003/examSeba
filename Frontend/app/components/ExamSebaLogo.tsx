'use client';

import React from 'react';

export type LogoLanguage = 'bn' | 'en';
export type LogoTheme = 'light' | 'dark';
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ExamSebaLogoProps {
  lang?: LogoLanguage;
  theme?: LogoTheme;
  size?: LogoSize;
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
}

/**
 * Modern High-Quality Vector Emblem for Exam Seba
 * Represents graduation mortarboard, open book pages, and success tick.
 */
export function ExamSebaLogoMark({
  size = 'md',
  theme = 'light',
  className = '',
}: {
  size?: LogoSize;
  theme?: LogoTheme;
  className?: string;
}) {
  const sizeMap: Record<LogoSize, { box: string; px: number }> = {
    sm: { box: 'w-8 h-8 min-w-[32px]', px: 32 },
    md: { box: 'w-10 h-10 min-w-[40px]', px: 40 },
    lg: { box: 'w-12 h-12 min-w-[48px]', px: 48 },
    xl: { box: 'w-16 h-16 min-w-[64px]', px: 64 },
  };

  const { box } = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl ${box} transition-all duration-300 ${
        theme === 'dark'
          ? 'shadow-[0_0_20px_rgba(37,99,235,0.35)]'
          : 'shadow-[0_4px_16px_rgba(0,123,255,0.22)]'
      } ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
        aria-hidden="true"
      >
        <defs>
          {/* Main Background Gradient */}
          <linearGradient id="examSebaBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#007bff" />
            <stop offset="100%" stopColor="#0056b3" />
          </linearGradient>

          {/* Golden Amber Gradient for Accents */}
          <linearGradient id="examSebaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Book Page Accent Gradient */}
          <linearGradient id="examSebaPage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          {/* Subtle Glow Filter */}
          <filter id="examSebaGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="1.5" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Squircle Badge Background */}
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill="url(#examSebaBg)"
        />

        {/* Inner Highlight Border */}
        <rect
          x="3.5"
          y="3.5"
          width="57"
          height="57"
          rx="14.5"
          fill="none"
          stroke="rgba(255, 255, 255, 0.28)"
          strokeWidth="1.5"
        />

        {/* Diagonal Light Sheen */}
        <path
          d="M2 18 C14 8, 32 4, 62 18 L62 2 C32 2, 14 6, 2 12 Z"
          fill="white"
          opacity="0.12"
        />

        {/* --- Open Book / Service Foundation at Bottom --- */}
        {/* Left Book Page */}
        <path
          d="M15 44 C21 41 26 42 30.5 45 L30.5 53 C26 50 21 49 15 52 Z"
          fill="url(#examSebaPage)"
          opacity="0.95"
        />
        {/* Right Book Page */}
        <path
          d="M49 44 C43 41 38 42 33.5 45 L33.5 53 C38 50 43 49 49 52 Z"
          fill="url(#examSebaPage)"
          opacity="0.95"
        />
        {/* Book Spine */}
        <line
          x1="32"
          y1="44.5"
          x2="32"
          y2="53"
          stroke="#94a3b8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* --- Graduation Cap (Mortarboard) on Top --- */}
        {/* Skull Cap Underneath */}
        <path
          d="M21 27 L21 34 C21 38.5 25.5 41.5 32 41.5 C38.5 41.5 43 38.5 43 34 L43 27 Z"
          fill="#0f172a"
          opacity="0.25"
        />
        <path
          d="M22 26 L22 33 C22 37 26 40 32 40 C38 40 42 37 42 33 L42 26 Z"
          fill="#ffffff"
          opacity="0.92"
        />

        {/* Mortarboard Diamond Top */}
        <polygon
          points="32,13 51,21.5 32,30 13,21.5"
          fill="#ffffff"
        />

        {/* Cap Shadow Edge */}
        <polygon
          points="32,30 51,21.5 48,24 32,31"
          fill="#cbd5e1"
        />

        {/* Golden Tassel & Cord */}
        <circle cx="32" cy="21.5" r="2" fill="url(#examSebaGold)" />
        <path
          d="M32 21.5 Q45 23 45.5 31.5"
          fill="none"
          stroke="url(#examSebaGold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <polygon
          points="43.5,31.5 47.5,31.5 45.5,36.5"
          fill="url(#examSebaGold)"
        />

        {/* Golden Success Checkmark on Center Crest */}
        <path
          d="M27.5 47.5 L30.5 50.5 L36.5 44"
          fill="none"
          stroke="url(#examSebaGold)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#examSebaGlow)"
        />
      </svg>
    </div>
  );
}

/**
 * Full Exam Seba Logo Component
 * Supports:
 * - Languages: Bangla (Default) & English
 * - Themes: Light & Dark
 * - Sizes: sm, md, lg, xl
 * - Optional Tagline
 */
export default function ExamSebaLogo({
  lang = 'bn',
  theme = 'light',
  size = 'md',
  showTagline = true,
  className = '',
  onClick,
  href,
}: ExamSebaLogoProps) {
  const isBangla = lang === 'bn';
  const isDark = theme === 'dark';

  // Typography size scalers
  const titleSizeMap: Record<LogoSize, string> = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
    xl: 'text-3xl md:text-4xl',
  };

  const taglineSizeMap: Record<LogoSize, string> = {
    sm: 'text-[9px]',
    md: 'text-[10px] md:text-[11px]',
    lg: 'text-xs',
    xl: 'text-xs md:text-sm',
  };

  // Color Tokens based on Theme
  const mainTextColor = isDark ? 'text-white' : 'text-slate-900';
  const accentColor = isDark
    ? 'text-amber-400'
    : 'text-[#007bff]';

  const tagColor = isDark ? 'text-blue-200/90' : 'text-slate-500';

  const content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Brand Emblem */}
      <ExamSebaLogoMark size={size} theme={theme} className="group-hover:scale-105 transition-transform" />

      {/* Typography Wordmark */}
      <div className="flex flex-col leading-tight text-left">
        <div className={`font-black tracking-tight ${titleSizeMap[size]} flex items-center gap-1`}>
          {isBangla ? (
            <>
              <span className={`${mainTextColor} transition-colors group-hover:opacity-90`}>
                এক্সাম
              </span>
              <span className={`${accentColor} transition-colors font-extrabold`}>
                সেবা
              </span>
            </>
          ) : (
            <>
              <span className={`${mainTextColor} transition-colors group-hover:opacity-90`}>
                Exam
              </span>
              <span className={`${accentColor} transition-colors font-extrabold`}>
                Seba
              </span>
            </>
          )}
        </div>

        {/* Subtitle / Tagline */}
        {showTagline && (
          <span className={`${taglineSizeMap[size]} ${tagColor} font-semibold tracking-wide mt-0.5`}>
            {isBangla ? 'অনলাইন পরীক্ষা ও প্রস্তুতি' : 'Online Exam & Preparation'}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl"
        aria-label={isBangla ? 'এক্সাম সেবা হোম' : 'Exam Seba Home'}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        type="button"
        className="text-left focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl"
        aria-label={isBangla ? 'এক্সাম সেবা হোম' : 'Exam Seba Home'}
      >
        {content}
      </button>
    );
  }

  return content;
}

/**
 * Interactive Showcase Component to Preview all 4 Variants
 * - Bangla Light (Default)
 * - Bangla Dark
 * - English Light
 * - English Dark
 */
export function ExamSebaLogoShowcase() {
  return (
    <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm my-8">
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-[#007bff] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
          অফিসিয়াল ব্র্যান্ড আইডেন্টিটি
        </span>
        <h3 className="text-2xl font-extrabold text-slate-800 mt-2">
          এক্সাম সেবা (Exam Seba) লোগো ভ্যারিয়েন্ট
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-1">
          বাংলা ও ইংরেজি উভয় ভাষায়, লাইট এবং ডার্ক মোডের জন্য প্রস্তুত সম্পূর্ণ ভেক্টর লোগো। ডিফল্ট হিসেবে বাংলা ব্যবহৃত হয়।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Bangla Light (Default) */}
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-md flex flex-col justify-between relative overflow-hidden">
          <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
            ডিফল্ট (Default)
          </span>
          <div className="py-6 flex items-center justify-center">
            <ExamSebaLogo lang="bn" theme="light" size="lg" />
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-slate-700">১. বাংলা — লাইট মোড</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono">lang=&quot;bn&quot; theme=&quot;light&quot;</span>
          </div>
        </div>

        {/* 2. Bangla Dark */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="py-6 flex items-center justify-center">
            <ExamSebaLogo lang="bn" theme="dark" size="lg" />
          </div>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-200">২. বাংলা — ডার্ক মোড</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono text-slate-300">lang=&quot;bn&quot; theme=&quot;dark&quot;</span>
          </div>
        </div>

        {/* 3. English Light */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="py-6 flex items-center justify-center">
            <ExamSebaLogo lang="en" theme="light" size="lg" />
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-slate-700">৩. English — Light Mode</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono">lang=&quot;en&quot; theme=&quot;light&quot;</span>
          </div>
        </div>

        {/* 4. English Dark */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="py-6 flex items-center justify-center">
            <ExamSebaLogo lang="en" theme="dark" size="lg" />
          </div>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-200">৪. English — Dark Mode</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono text-slate-300">lang=&quot;en&quot; theme=&quot;dark&quot;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
