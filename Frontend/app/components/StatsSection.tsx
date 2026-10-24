'use client';

import React, { useEffect, useState } from 'react';
import { FaUsers, FaClipboardCheck, FaBookOpen, FaTrophy } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function StatsSection() {
  const { t } = useLanguage();
  const [counts, setCounts] = useState({
    students: 0,
    exams: 0,
    courses: 0,
    successRate: 0,
  });

  useEffect(() => {
    const duration = 1800; // ms
    const frameRate = 30;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCounts({
        students: Math.floor(easeProgress * 50000),
        exams: Math.floor(easeProgress * 250000),
        courses: Math.floor(easeProgress * 25000),
        successRate: Math.floor(easeProgress * 95),
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCounts({
          students: 50000,
          exams: 250000,
          courses: 25000,
          successRate: 95,
        });
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: FaUsers,
      value: counts.students.toLocaleString('en-US') + '+',
      label: t.stats.students,
    },
    {
      icon: FaClipboardCheck,
      value: counts.exams.toLocaleString('en-US') + '+',
      label: t.stats.examsTaken,
    },
    {
      icon: FaBookOpen,
      value: counts.courses.toLocaleString('en-US') + '+',
      label: t.stats.questionBank,
    },
    {
      icon: FaTrophy,
      value: counts.successRate + '%',
      label: t.stats.passRate,
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="bijoy-section-title">{t.stats.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bijoy-stat-card group">
                <div className="bijoy-stat-icon">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-[#007bff] mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-slate-600 text-sm font-semibold tracking-wide">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
