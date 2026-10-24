'use client';

import React from 'react';
import { FaPlayCircle, FaAward, FaUserPlus } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

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
  return (
    <section className="hero-section relative">
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-semibold mb-6 shadow-sm">
          <HiSparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>বাংলাদেশের নির্ভরযোগ্য অনলাইন চাকরি প্রস্তুতি ও পরীক্ষা পোর্টাল</span>
        </div>

        {/* Hero Title - Exact Bijoyjatra text & styling */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight">
          অনলাইন পরীক্ষা পোর্টাল
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-9 font-normal leading-relaxed">
          আধুনিক প্রযুক্তির সাহায্যে আপনার স্বপ্নের চাকরির জন্য প্রস্তুতি নিন। বিসিএস, প্রাইমারি, শিক্ষক নিবন্ধন ও ব্যাংকের জন্য রিয়েল-টাইম লাইভ মডেল টেস্ট।
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          
          <button
            onClick={onStartExam}
            className="hero-btn-primary"
            id="hero-start-exam-btn"
          >
            <FaPlayCircle className="w-5 h-5 text-[#007bff]" />
            <span>পরীক্ষা শুরু করুন</span>
          </button>

          <button
            onClick={onOpenDemo}
            className="hero-btn-outline"
            id="hero-demo-exam-btn"
          >
            <FaAward className="w-5 h-5 text-white" />
            <span>ফ্রি ডেমো মডেল টেস্ট</span>
          </button>

          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
              id="hero-auth-btn"
            >
              <FaUserPlus className="w-4 h-4 text-amber-300" />
              <span>নতুন একাউন্ট খুলুন</span>
            </button>
          )}

        </div>

        {/* Biddabari Style Quick Category Fast Selectors */}
        <div className="pt-6 border-t border-white/20">
          <p className="text-xs text-blue-200 font-medium mb-3">জনপ্রিয় ক্যাটাগরি অনুসারে সরাসরি প্রস্তুতি নিন:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: '🎯 ৪৭তম বিসিএস প্রিলি', filter: 'bcs' },
              { label: '📚 প্রাইমারি শিক্ষক নিয়োগ', filter: 'primary' },
              { label: '🏛️ ১৯তম NTRCA শিক্ষক নিবন্ধন', filter: 'ntrca' },
              { label: '🏦 কম্বাইন্ড ব্যাংক অফিসার', filter: 'bank' },
              { label: '⚡ ডেইলি কারেন্ট অ্যাফেয়ার্স', filter: 'general' },
            ].map((cat, idx) => (
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
