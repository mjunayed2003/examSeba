'use client';

import React from 'react';
import {
  X,
  User,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Trophy,
  Flame,
  FileCheck,
  TrendingUp,
  LogOut
} from 'lucide-react';

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
  if (!isOpen || !user) return null;

  const pastExams = [
    {
      title: 'প্রাইমারি শিক্ষক নিয়োগ মডেল টেস্ট - ০১',
      score: '৯.৫০ / ১০',
      accuracy: '৯৫%',
      date: '২৪ অক্টোবর ২০২৬',
      status: 'উত্তীর্ণ',
      rank: '২য় মেধা স্থান',
    },
    {
      title: '৪৭তম বিসিএস প্রিলিমিনারি পূর্ণাঙ্গ লাইভ এক্সাম',
      score: '৮.৭৫ / ১০',
      accuracy: '৮৮%',
      date: '২২ অক্টোবর ২০২৬',
      status: 'উত্তীর্ণ',
      rank: '৫ম মেধা স্থান',
    },
    {
      title: 'ডেইলি বাংলা ব্যাকরণ কুইজ - ০৩',
      score: '১০ / ১০',
      accuracy: '১০০%',
      date: '২০ অক্টোবর ২০২৬',
      status: 'উত্তীর্ণ',
      rank: '১ম মেধা স্থান',
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
            <X size={22} />
          </button>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 text-center">
            <span className="text-[11px] text-slate-500 block">মোট পরীক্ষা</span>
            <span className="text-2xl font-black text-[#007bff]">১২ টি</span>
          </div>
          <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[11px] text-slate-500 block">গড় স্কোর</span>
            <span className="text-2xl font-black text-emerald-600">৯১%</span>
          </div>
          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-100 text-center">
            <span className="text-[11px] text-slate-500 block">সর্বোচ্চ অবস্থান</span>
            <span className="text-2xl font-black text-amber-600">১ম স্থান</span>
          </div>
          <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 text-center">
            <span className="text-[11px] text-slate-500 block">স্টাডি স্ট্রিক</span>
            <span className="text-2xl font-black text-purple-600">৭ দিন</span>
          </div>
        </div>

        {/* Certificate / Badge */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-300 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-800">
                টপ স্কিল পারফর্মার ব্যাজ অর্জন
              </h4>
              <p className="text-xs text-amber-900">
                ধারাবাহিক ৩টি মডেল টেস্টে ৯০%+ নম্বর পাওয়ার স্বীকৃতি।
              </p>
            </div>
          </div>
          <span className="text-[11px] bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full shadow-sm">
            ভেরিফাইড
          </span>
        </div>

        {/* Recent Exam History */}
        <div className="mb-6">
          <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#007bff]" />
            <span>সাম্প্রতিক পরীক্ষার ইতিহাস ও ফলাফল</span>
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
                    {exam.date} • এক্যুরেসি: {exam.accuracy} • {exam.rank}
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
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onStartExam();
            }}
            className="px-5 py-2.5 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4" />
            <span>নতুন লাইভ পরীক্ষা দিন</span>
          </button>
        </div>

      </div>
    </div>
  );
}
