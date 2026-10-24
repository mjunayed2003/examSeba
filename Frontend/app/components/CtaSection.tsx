'use client';

import React from 'react';
import { FaRocket, FaPlayCircle } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

interface CtaSectionProps {
  onStartExam: () => void;
  onOpenAuth: () => void;
}

export default function CtaSection({ onStartExam, onOpenAuth }: CtaSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="hero-section py-16 text-center relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
          {t.cta.title}
        </h2>
        
        <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
          {t.cta.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          
          <button
            onClick={onOpenAuth}
            className="hero-btn-primary"
            id="cta-register-btn"
          >
            <FaRocket className="w-5 h-5 text-[#007bff]" />
            <span>{t.cta.btnSignup}</span>
          </button>

          <button
            onClick={onStartExam}
            className="hero-btn-outline"
            id="cta-demo-btn"
          >
            <FaPlayCircle className="w-5 h-5 text-white" />
            <span>{t.cta.btnExam}</span>
          </button>

        </div>

      </div>
    </section>
  );
}
