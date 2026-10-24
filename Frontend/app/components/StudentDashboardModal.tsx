'use client';

import React from 'react';
import { FaTrophy, FaFire, FaClipboardCheck, FaArrowRightFromBracket } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useLanguage } from '../context/LanguageContext';

interface StudentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; phone: string; batch: string } | null;
  onLogout: () => void;
  onStartExam: () => void;
}

export default function StudentDashboardModal({
  isOpen,
  onClose,
  user,
  onLogout,
  onStartExam,
}: StudentDashboardModalProps) {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  if (!isOpen || !user) return null;

  const pastExams = [
    {
      title: isBn ? 'প্রাইমারি শিক্ষক নিয়োগ মডেল টেস্ট - ০১' : 'Primary Teacher Model Test - 01',
      score: '9.50 / 10',
      accuracy: '95%',
      date: isBn ? '২৪ অক্টোবর ২০২৬' : '24 October 2026',
      status: isBn ? 'উত্তীর্ণ' : 'Passed',
      rank: isBn ? '২য় মেধা স্থান' : '2nd Rank',
    },
    {
      title: isBn ? '৪৭তম বিসিএস প্রিলিমিনারি পূর্ণাঙ্গ লাইভ এক্সাম' : '47th BCS Prelims Live Full Exam',
      score: '8.75 / 10',
      accuracy: '88%',
      date: isBn ? '২২ অক্টোবর ২০২৬' : '22 October 2026',
      status: isBn ? 'উত্তীর্ণ' : 'Passed',
      rank: isBn ? '৫ম মেধা স্থান' : '5th Rank',
    },
    {
      title: isBn ? 'ডেইলি বাংলা ব্যাকরণ কুইজ - ০৩' : 'Daily Bengali Grammar Quiz - 03',
      score: '10 / 10',
      accuracy: '100%',
      date: isBn ? '২০ অক্টোবর ২০২৬' : '20 October 2026',
      status: isBn ? 'উত্তীর্ণ' : 'Passed',
      rank: isBn ? '১ম মেধা স্থান' : '1st Rank',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#007bff] to-[#0056b3] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-800 leading-tight">
                {user.name}
              </h3>
              <p className="text-xs text-slate-500">{user.phone} • {user.batch}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 text-center">
            <span className="text-[11px] text-slate-500 block">{t.dashboard.totalExams}</span>
            <span className="text-2xl font-black text-[#007bff]">12 {isBn ? 'টি' : ''}</span>
          </div>
          <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[11px] text-slate-500 block">{t.dashboard.avgScore}</span>
            <span className="text-2xl font-black text-emerald-600">91%</span>
          </div>
          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-100 text-center">
            <span className="text-[11px] text-slate-500 block">{t.dashboard.topRank}</span>
            <span className="text-2xl font-black text-amber-600">1st</span>
          </div>
          <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 text-center">
            <span className="text-[11px] text-slate-500 block">{t.dashboard.streak}</span>
            <span className="text-2xl font-black text-purple-600">7 {isBn ? 'দিন' : 'Days'}</span>
          </div>
        </div>

        {/* Certificate / Badge */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-300 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <FaTrophy className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-800">
                {t.dashboard.badgeTitle}
              </h4>
              <p className="text-xs text-amber-900">
                {t.dashboard.badgeDesc}
              </p>
            </div>
          </div>
          <span className="text-[11px] bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full shadow-sm">
            {t.dashboard.verified}
          </span>
        </div>

        {/* Recent Exam History */}
        <div className="mb-6">
          <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
            <FaClipboardCheck className="w-4 h-4 text-[#007bff]" />
            <span>{t.dashboard.historyTitle}</span>
          </h4>

          <div className="space-y-2.5">
            {pastExams.map((exam, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <h5 className="font-bold text-slate-800 text-sm mb-0.5">{exam.title}</h5>
                  <p className="text-slate-500">
                    {exam.date} • {isBn ? 'এক্যুরেসি' : 'Accuracy'}: {exam.accuracy} • {exam.rank}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-black text-[#007bff] block text-sm">{exam.score}</span>
                  <span className="text-[11px] text-emerald-600 font-bold">{exam.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5"
          >
            <FaArrowRightFromBracket className="w-4 h-4" />
            <span>{t.dashboard.logout}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onStartExam();
            }}
            className="px-5 py-2.5 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <FaFire className="w-4 h-4" />
            <span>{t.dashboard.newExam}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
