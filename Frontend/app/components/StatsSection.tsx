'use client';

import React, { useEffect, useState } from 'react';
import { FaUsers, FaClipboardCheck, FaBookOpen, FaTrophy } from 'react-icons/fa';

export default function StatsSection() {
  const [counts, setCounts] = useState({
    students: 0,
    exams: 0,
    courses: 0,
    successRate: 0,
  });

  useEffect(() => {
    // Smooth animated number counting
    const duration = 1800; // ms
    const frameRate = 30;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setCounts({
        students: Math.floor(easeProgress * 10000),
        exams: Math.floor(easeProgress * 500),
        courses: Math.floor(easeProgress * 50),
        successRate: Math.floor(easeProgress * 95),
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCounts({
          students: 10000,
          exams: 500,
          courses: 50,
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
      label: 'সফল শিক্ষার্থী',
    },
    {
      icon: FaClipboardCheck,
      value: counts.exams.toLocaleString('en-US') + '+',
      label: 'বিভিন্ন পরীক্ষা',
    },
    {
      icon: FaBookOpen,
      value: counts.courses.toLocaleString('en-US') + '+',
      label: 'বিষয়ভিত্তিক কোর্স',
    },
    {
      icon: FaTrophy,
      value: counts.successRate + '%',
      label: 'সাফল্যের হার',
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="bijoy-section-title">আমাদের সাফল্যের পরিসংখ্যান</h2>

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
                <div className="text-sm md:text-base font-semibold text-slate-600">
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
