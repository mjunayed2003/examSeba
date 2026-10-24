'use client';

import React from 'react';
import { Rocket, PlayCircle } from 'lucide-react';

interface CtaSectionProps {
  onStartExam: () => void;
  onOpenAuth: () => void;
}

export default function CtaSection({ onStartExam, onOpenAuth }: CtaSectionProps) {
  return (
    <section className="hero-section py-16 text-center relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
          আজই শুরু করুন আপনার প্রস্তুতি
        </h2>
        
        <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
          হাজারো সফল শিক্ষার্থীর সাথে যোগ দিন এবং আপনার স্বপ্নের চাকরি পেতে প্রস্তুত হন।
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          
          <button
            onClick={onOpenAuth}
            className="hero-btn-primary"
            id="cta-register-btn"
          >
            <Rocket className="w-5 h-5 text-[#007bff]" />
            <span>ফ্রি রেজিস্ট্রেশন</span>
          </button>

          <button
            onClick={onStartExam}
            className="hero-btn-outline"
            id="cta-demo-btn"
          >
            <PlayCircle className="w-5 h-5 text-white" />
            <span>ডেমো দেখুন</span>
          </button>

        </div>

      </div>
    </section>
  );
}
