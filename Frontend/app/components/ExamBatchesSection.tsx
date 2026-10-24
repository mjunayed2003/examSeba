'use client';

import React, { useState } from 'react';
import {
  FaGraduationCap,
  FaShieldAlt,
  FaAward,
  FaBookOpen,
  FaUniversity,
  FaArrowRight
} from 'react-icons/fa';
import { FaFire } from 'react-icons/fa6';
import { SAMPLE_EXAMS, Exam } from '../data/examData';
import { useLanguage } from '../context/LanguageContext';

interface ExamBatchesSectionProps {
  onStartExam: (exam: Exam) => void;
}

export default function ExamBatchesSection({ onStartExam }: ExamBatchesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { lang, t } = useLanguage();

  const isBn = lang === 'bn';

  const batches = [
    {
      id: 'primary',
      icon: FaGraduationCap,
      title: isBn ? 'প্রাইমারি শিক্ষক নিয়োগ' : 'Primary Teacher Recruitment',
      description: isBn
        ? 'প্রাথমিক সহকারী শিক্ষক নিয়োগ পরীক্ষার পূর্ণাঙ্গ সিলেবাসভিত্তিক মডেল টেস্ট ও বিগত সালের নির্ভুল প্রশ্নব্যাংক।'
        : 'Complete model tests and past questions based on the full Primary Assistant Teacher syllabus.',
      questions: '250+',
      mockTests: '15',
      subjects: '5',
      examId: 'primary-mock-1',
      badge: isBn ? 'লাইভ চলছে' : 'Live Now'
    },
    {
      id: 'ntrca',
      icon: FaShieldAlt,
      title: isBn ? '১৯তম শিক্ষক নিবন্ধন (NTRCA)' : '19th NTRCA Registration',
      description: isBn
        ? 'স্কুল ও কলেজ উভয় পর্যায়ের সাধারণ জ্ঞান, বাংলা, ইংরেজি ও গণিতের পূর্ণাঙ্গ স্পেশাল প্রিলিমিনারি টেস্ট।'
        : 'Full preliminary model tests for School & College levels covering Bengali, English, Math, and GK.',
      questions: '400+',
      mockTests: '20',
      subjects: '8',
      examId: 'ntrca-mock-1',
      badge: isBn ? 'নতুন সিলেবাস' : 'New Syllabus'
    },
    {
      id: 'bcs',
      icon: FaAward,
      title: isBn ? '৪৭তম বিসিএস প্রিলিমিনারি' : '47th BCS Preliminary',
      description: isBn
        ? 'বিসিএস প্রিলিমিনারি ২০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট ও বিষয়ভিত্তিক স্ট্যান্ডার্ড প্রশ্ন সমাধান।'
        : 'Full 200-mark preliminary model tests and standard subject-wise solutions for 47th BCS.',
      questions: '800+',
      mockTests: '30',
      subjects: '10',
      examId: 'bcs-preli-1',
      badge: isBn ? 'টপ রেটেড' : 'Top Rated'
    },
    {
      id: 'general',
      icon: FaBookOpen,
      title: isBn ? 'ডেইলি জিকে ও কারেন্ট অ্যাফেয়ার্স' : 'Daily GK & Current Affairs',
      description: isBn
        ? 'সাম্প্রতিক বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলি, সংবিধান ও সমসাময়িক জাতীয় ঘটনাবলির প্রতিদিনের কুইজ।'
        : 'Daily quizzes on recent national, international affairs, constitution, and contemporary events.',
      questions: '350+',
      mockTests: '25',
      subjects: '4',
      examId: 'daily-free-1',
      badge: isBn ? 'প্রতিদিন ফ্রি' : 'Daily Free'
    },
    {
      id: 'bank',
      icon: FaUniversity,
      title: isBn ? 'কম্বাইন্ড ব্যাংক অফিসার' : 'Combined Bank Officer',
      description: isBn
        ? 'বাংলাদেশ ব্যাংক ও ৮টি রাষ্ট্রায়ত্ত ব্যাংকের অফিসার ও সিনিয়র অফিসার নিয়োগের পূর্ণাঙ্গ IBA প্যাটার্ন মডেল টেস্ট।'
        : 'Comprehensive IBA-pattern model tests for Senior Officer & Officer recruitment across state banks.',
      questions: '500+',
      mockTests: '18',
      subjects: '6',
      examId: 'bank-job-1',
      badge: isBn ? 'IBA প্যাটার্ন' : 'IBA Pattern'
    },
  ];

  const handleBatchClick = (examId: string) => {
    const exam = SAMPLE_EXAMS.find((e) => e.id === examId) || SAMPLE_EXAMS[0];
    onStartExam(exam);
  };

  const filteredBatches =
    selectedCategory === 'all'
      ? batches
      : batches.filter((b) => b.id === selectedCategory);

  const tabs = [
    { id: 'all', label: t.batches.catAll },
    { id: 'primary', label: t.batches.catPrimary },
    { id: 'bcs', label: t.batches.catBcs },
    { id: 'ntrca', label: t.batches.catNtrca },
    { id: 'bank', label: t.batches.catBank },
  ];

  return (
    <section id="exams" className="py-20 bg-[#f8f9fa] border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#007bff] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            {t.batches.badge}
          </span>
          <h2 className="bijoy-section-title mt-2">{t.batches.title}</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            {t.batches.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#007bff] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredBatches.map((batch) => {
            const Icon = batch.icon;
            return (
              <div key={batch.id} className="bijoy-batch-card group">
                
                {/* Badge */}
                <div className="self-end mb-1">
                  <span className="bg-blue-50 text-[#007bff] border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <FaFire className="w-3 h-3 text-red-500" />
                    {batch.badge}
                  </span>
                </div>

                {/* Batch Icon */}
                <div className="bijoy-batch-icon">
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-2.5 group-hover:text-[#007bff] transition-colors">
                  {batch.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                  {batch.description}
                </p>

                {/* Batch Stats Row */}
                <div className="bijoy-batch-stats">
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-[#007bff]">
                      {batch.questions}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {isBn ? 'প্রশ্ন' : 'Questions'}
                    </span>
                  </div>
                  <div className="w-[1px] bg-slate-200" />
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-[#007bff]">
                      {batch.mockTests}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {isBn ? 'মক টেস্ট' : 'Mock Tests'}
                    </span>
                  </div>
                  <div className="w-[1px] bg-slate-200" />
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-[#007bff]">
                      {batch.subjects}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {isBn ? 'বিষয়' : 'Subjects'}
                    </span>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={() => handleBatchClick(batch.examId)}
                  className="bijoy-batch-btn group-hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span>{t.batches.startBtn}</span>
                  <FaArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
