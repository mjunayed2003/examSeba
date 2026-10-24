'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Bell,
  Clock,
  FileCheck,
  AlertCircle,
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_NOTICES, Notice, Exam } from '../data/examData';

interface RoutineNoticeSectionProps {
  onStartExam: () => void;
}

export default function RoutineNoticeSection({ onStartExam }: RoutineNoticeSectionProps) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const routineItems = [
    {
      date: '২৪ অক্টোবর ২০২৬ (আজ)',
      time: 'রাত ৯:০০ টা',
      batch: '৪৭তম বিসিএস বুলেট লাইভ ব্যাচ',
      topic: 'পূর্ণাঙ্গ বিসিএস প্রিলিমিনারি মডেল টেস্ট (২০০ নম্বর)',
      status: 'লাইভ চলছে',
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse',
    },
    {
      date: '২৫ অক্টোবর ২০২৬ (আগামীকাল)',
      time: 'সকাল ১০:০০ টা',
      batch: '১৯তম NTRCA শিক্ষক নিবন্ধন ব্যাচ',
      topic: 'বাংলা ব্যাকরণ ও সাধারণ জ্ঞান স্পেশাল টেস্ট (৫০ নম্বর)',
      status: 'আসন্ন',
      statusClass: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      date: '২৬ অক্টোবর ২০২৬',
      time: 'দুপুর ৩:০০ টা',
      batch: 'প্রাইমারি স্পেশাল গোল্ড ব্যাচ',
      topic: 'গণিত ও সাধারণ বিজ্ঞান স্পেশাল টেস্ট (৪০ নম্বর)',
      status: 'আসন্ন',
      statusClass: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    {
      date: '২৭ অক্টোবর ২০২৬',
      time: 'সন্ধ্যা ৭:৩০ টা',
      batch: 'কম্বাইন্ড ব্যাংক অফিসার ব্যাচ',
      topic: 'Quantitative Aptitude & Banking General Knowledge',
      status: 'আসন্ন',
      statusClass: 'bg-slate-100 text-slate-700 border-slate-200',
    },
  ];

  return (
    <section id="routine" className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#007bff] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            সাপ্তাহিক ও মাসিক শিডিউল
          </span>
          <h2 className="bijoy-section-title mt-2">পরীক্ষার রুটিন ও নোটিশ বোর্ড</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            সকল ব্যাচের পরীক্ষার সময়সূচি এবং জরুরি ঘোষণা এক সাথে জানুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Routine Schedule Table */}
          <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#007bff]" />
                <span>আসন্ন মডেল টেস্টের রুটিন</span>
              </span>
              <span className="text-xs text-slate-500 font-normal">রিয়েল-টাইম আপডেট</span>
            </h3>

            <div className="space-y-3">
              {routineItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-300 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs font-bold text-[#007bff] bg-blue-50 px-2 py-0.5 rounded">
                        {item.batch}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${item.statusClass}`}>
                        {item.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-800 text-sm mb-1">{item.topic}</h4>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.time}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onStartExam}
                    className="px-4 py-2 rounded-xl bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-xs shadow-sm self-start sm:self-center transition-transform hover:scale-105 shrink-0"
                  >
                    পরীক্ষায় যান
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Notice Board */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-500" />
              <span>জরুরি নোটিশ বোর্ড</span>
            </h3>

            <div className="space-y-4">
              {SAMPLE_NOTICES.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {notice.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{notice.date}</span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug line-clamp-2 hover:text-[#007bff]">
                    {notice.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Notice Detail Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
                  নোটিশ বিজ্ঞপ্তি
                </span>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <h4 className="font-bold text-slate-800 text-sm mb-2 leading-relaxed">
                {selectedNotice.title}
              </h4>
              <p className="text-xs text-slate-400 mb-4">{selectedNotice.date}</p>

              <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 mb-5">
                {selectedNotice.content}
              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
