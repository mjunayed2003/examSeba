'use client';

import React, { useState } from 'react';
import {
  FaFire,
  FaFileAlt,
  FaClock,
  FaCheck,
  FaDownload
} from 'react-icons/fa';
import { FREE_STUDY_MATERIALS, SAMPLE_EXAMS, Exam } from '../data/examData';
import { useLanguage } from '../context/LanguageContext';

interface DailyFreeExamSectionProps {
  onStartExam: (exam: Exam) => void;
}

export default function DailyFreeExamSection({ onStartExam }: DailyFreeExamSectionProps) {
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  const handleDownload = (id: string, title: string) => {
    setDownloadedIds((prev) => ({ ...prev, [id]: true }));
    const element = document.createElement('a');
    const file = new Blob([`Exam Seba Exclusive Study Note\n\nTitle: ${title}\n\nDownloaded successfully from Exam Seba Online Platform.`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const dailyFreeExam = SAMPLE_EXAMS[0];

  return (
    <section id="studyroom" className="py-20 bg-[#f8f9fa] border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            {t.dailyExam.badge}
          </span>
          <h2 className="bijoy-section-title mt-2">{t.dailyExam.title}</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            {t.dailyExam.subtitle}
          </p>
        </div>

        {/* Highlighted Daily Free Exam Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-black uppercase mb-3 shadow-sm">
                <FaFire className="w-3.5 h-3.5 text-red-600" />
                <span>{isBn ? 'আজকের লাইভ ফ্রি এক্সাম' : 'Today\'s Free Live Exam'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
                {dailyFreeExam.title}
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm mb-4 leading-relaxed">
                {isBn
                  ? '১০টি সিলেবাস ভিত্তিক মানসম্মত প্রশ্ন • সময়: ১০ মিনিট • প্রতিটি ভুল উত্তরের জন্য ০.২৫ নম্বর কর্তন। পরীক্ষা শেষে তাৎক্ষণিক সমাধান ও মেধা তালিকা দেখুন।'
                  : '10 syllabus-aligned standard questions • 10 minutes duration • 0.25 negative marking. Instant solution & leaderboard after exam.'}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-emerald-50">
                <span className="flex items-center gap-1">
                  <FaClock className="w-4 h-4 text-amber-300" />
                  <span>10 {isBn ? 'মিনিট' : 'Mins'}</span>
                </span>
                <span>•</span>
                <span>10 {isBn ? 'নম্বর' : 'Marks'}</span>
                <span>•</span>
                <span className="bg-emerald-800/60 px-2.5 py-0.5 rounded-md">
                  {isBn ? 'আজকে সম্পূর্ণ ফ্রি' : '100% Free Today'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onStartExam(dailyFreeExam)}
              className="px-8 py-3.5 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-sm sm:text-base shadow-2xl transition-all hover:scale-105 flex items-center gap-2 shrink-0"
            >
              <span>{t.dailyExam.startNow}</span>
            </button>
          </div>
        </div>

        {/* Free PDF Notes Grid */}
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <FaFileAlt className="w-5 h-5 text-[#007bff]" />
          <span>{isBn ? 'ডাউনলোডযোগ্য ফ্রি লেকচার শিট ও হ্যান্ডনোট (PDF)' : 'Downloadable Free Lecture Sheets & Notes (PDF)'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FREE_STUDY_MATERIALS.map((mat) => {
            const isDownloaded = downloadedIds[mat.id];
            return (
              <div
                key={mat.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#007bff] flex items-center justify-center font-bold mb-3">
                    <FaFileAlt className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#007bff] bg-blue-50/70 px-2 py-0.5 rounded-md inline-block mb-2">
                    {mat.subject}
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 mb-2 leading-snug line-clamp-2">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    {mat.size} • {mat.downloads}+ {isBn ? 'ডাউনলোড' : 'downloads'}
                  </p>
                </div>

                <button
                  onClick={() => handleDownload(mat.id, mat.title)}
                  className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isDownloaded
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-[#007bff] text-slate-700 hover:text-white border border-slate-200'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <FaCheck className="w-3.5 h-3.5" />
                      <span>{isBn ? 'ডাউনলোড সম্পন্ন' : 'Downloaded'}</span>
                    </>
                  ) : (
                    <>
                      <FaDownload className="w-3.5 h-3.5" />
                      <span>{isBn ? 'ফ্রি ডাউনলোড' : 'Free Download'}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
