'use client';

import React from 'react';
import { FaPlayCircle, FaAward, FaUserPlus } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onStartExam: () => void;
  onOpenDemo: () => void;
  onOpenAuth?: () => void;
}

export default function HeroSection({
  onStartExam,
  onOpenDemo,
  onOpenAuth
}: HeroSectionProps) {
  const { lang, t } = useLanguage();

  const categories = lang === 'bn' ? [
    { label: '🎯 ৪৭তম বিসিএস প্রিলি' },
    { label: '📚 প্রাইমারি শিক্ষক নিয়োগ' },
    { label: '🏛️ ১৯তম NTRCA নিবন্ধন' },
    { label: '🏦 কম্বাইন্ড ব্যাংক অফিসার' },
    { label: '⚡ ডেইলি মডেল টেস্ট' },
  ] : [
    { label: '🎯 47th BCS Prelims' },
    { label: '📚 Primary Teacher Exam' },
    { label: '🏛️ 19th NTRCA Registration' },
    { label: '🏦 Combined Bank Officer' },
    { label: '⚡ Daily Model Tests' },
  ];

  return (
    <section className="hero-section relative">
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight">
          <span>{t.hero.titlePart1} </span>
          <span className="text-amber-400 underline decoration-amber-400/40">{t.hero.titleHighlight}</span>
          <span> {t.hero.titlePart2}</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-9 font-normal leading-relaxed">
          {t.hero.desc}
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          
          <button
            onClick={onStartExam}
            className="hero-btn-primary"
            id="hero-start-exam-btn"
          >
            <FaPlayCircle className="w-5 h-5 text-[#007bff]" />
            <span>{t.hero.startFreeExam}</span>
          </button>

          <button
            onClick={onOpenDemo}
            className="hero-btn-outline"
            id="hero-demo-exam-btn"
          >
            <FaAward className="w-5 h-5 text-white" />
            <span>{t.hero.demoTest}</span>
          </button>

          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
              id="hero-auth-btn"
            >
              <FaUserPlus className="w-4 h-4 text-amber-300" />
              <span>{t.hero.registerFree}</span>
            </button>
          )}

        </div>

        {/* Quick Category Fast Selectors */}
        <div className="pt-6 border-t border-white/20">
          <p className="text-xs text-blue-200 font-medium mb-3">
            {lang === 'bn' ? 'জনপ্রিয় ক্যাটাগরি অনুসারে সরাসরি প্রস্তুতি নিন:' : 'Prepare directly by popular category:'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={onStartExam}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs md:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all hover:scale-105"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
