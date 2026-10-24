'use client';

import React, { useState } from 'react';
import {
  Download,
  Flame,
  FileText,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { FREE_STUDY_MATERIALS, SAMPLE_EXAMS, Exam } from '../data/examData';

interface DailyFreeExamSectionProps {
  onStartExam: (exam: Exam) => void;
}

export default function DailyFreeExamSection({ onStartExam }: DailyFreeExamSectionProps) {
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});

  const handleDownload = (id: string, title: string) => {
    setDownloadedIds((prev) => ({ ...prev, [id]: true }));
    // trigger simulated download
    const element = document.createElement('a');
    const file = new Blob([`Exam Sheba & Biddabari Exclusive Study Note\n\nTitle: ${title}\n\nDownloaded successfully from Exam Sheba Online Platform.`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const dailyFreeExam = SAMPLE_EXAMS[0]; // Primary free mock test

  return (
    <section id="studyroom" className="py-20 bg-[#f8f9fa] border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            ১০০% উন্মুক্ত ও ফ্রি
          </span>
          <h2 className="bijoy-section-title mt-2">ফ্রি স্টাডি রুম ও দৈনিক মডেল টেস্ট</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            প্রতিদিন বিনামূল্যে মডেল টেস্টে অংশ নিন এবং গুরুত্বপূর্ণ বিষয়ের হ্যান্ডনোট ও প্রশ্নব্যাংক ডাউনলোড করুন।
          </p>
        </div>

        {/* Highlighted Daily Free Exam Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-black uppercase mb-3 shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                <span>আজকের লাইভ ফ্রি এক্সাম</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
                {dailyFreeExam.title}
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm mb-4 leading-relaxed">
                ১০টি সিলেবাস ভিত্তিক মানসম্মত প্রশ্ন • সময়: ১০ মিনিট • প্রতিটি ভুল উত্তরের জন্য ০.২৫ নম্বর কর্তন।
                পরীক্ষা শেষে তাৎক্ষণিক সমাধান ও মেধা তালিকা দেখুন।
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-emerald-50">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>১০ মিনিট</span>
                </span>
                <span>•</span>
                <span>১০ নম্বর</span>
                <span>•</span>
                <span className="bg-emerald-800/60 px-2.5 py-0.5 rounded-md">
                  আজকে ফ্রি পার্টিসিপেশন
                </span>
              </div>
            </div>

            <button
              onClick={() => onStartExam(dailyFreeExam)}
              className="px-8 py-3.5 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-sm sm:text-base shadow-2xl transition-all hover:scale-105 flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>ফ্রি পরীক্ষা শুরু করুন</span>
            </button>
          </div>
        </div>

        {/* Free PDF Notes Grid */}
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#007bff]" />
          <span>ডাউনলোডযোগ্য ফ্রি লেকচার শিট ও হ্যান্ডনোট (PDF)</span>
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
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#007bff] bg-blue-50/70 px-2 py-0.5 rounded-md inline-block mb-2">
                    {mat.subject}
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 mb-2 leading-snug line-clamp-2">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    {mat.size} • {mat.downloads}+ ডাউনলোড
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
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>ডাউনলোড হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>ফ্রি ডাউনলোড করুন</span>
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
