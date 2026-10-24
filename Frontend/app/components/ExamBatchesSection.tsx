'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  BookOpen,
  Layers,
  Landmark,
  ArrowRight,
  Flame,
  Clock,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { SAMPLE_EXAMS, Exam } from '../data/examData';

interface ExamBatchesSectionProps {
  onStartExam: (exam: Exam) => void;
}

export default function ExamBatchesSection({ onStartExam }: ExamBatchesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const batches = [
    {
      id: 'primary',
      icon: GraduationCap,
      title: 'প্রাইমারি পরীক্ষা',
      description:
        'প্রাথমিক শিক্ষা সমাপনী ও শিক্ষক নিয়োগ পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি। সকল বিষয়ের উপর বিস্তারিত অনুশীলন।',
      questions: '250+',
      mockTests: '15',
      subjects: '5',
      subjectLabel: 'বিষয়',
      examId: 'primary-mock-1',
      badge: 'লাইভ চলছে'
    },
    {
      id: 'ntrca',
      icon: ShieldCheck,
      title: 'নিবন্ধন পরীক্ষা',
      description:
        'শিক্ষক নিবন্ধন পরীক্ষার সম্পূর্ণ প্রস্তুতি। স্কুল ও কলেজ পর্যায়ের সকল সাধারণ ও ঐচ্ছিক বিষয়।',
      questions: '400+',
      mockTests: '20',
      subjects: '8',
      subjectLabel: 'বিষয়',
      examId: 'ntrca-mock-1',
      badge: 'নতুন সিলেবাস'
    },
    {
      id: 'bcs',
      icon: Award,
      title: 'বিসিএস পরীক্ষা',
      description:
        'বাংলাদেশ সিভিল সার্ভিস পরীক্ষার প্রিলিমিনারি ও রিটেন পরীক্ষার সম্পূর্ণ সিলেবাস ভিত্তিক প্রস্তুতি।',
      questions: '800+',
      mockTests: '30',
      subjects: '10',
      subjectLabel: 'বিষয়',
      examId: 'bcs-preli-1',
      badge: 'টপ রেটেড'
    },
    {
      id: 'general',
      icon: BookOpen,
      title: 'সাধারণ জ্ঞান',
      description:
        'বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলী, সাম্প্রতিক বিশ্ব, ইতিহাস, ভূগোল, বিজ্ঞান ও প্রযুক্তি সহ সকল বিষয়।',
      questions: '600+',
      mockTests: '25',
      subjects: '12',
      subjectLabel: 'টপিক',
      examId: 'primary-mock-1',
      badge: 'দৈনিক কুইজ'
    },
    {
      id: 'subject',
      icon: Layers,
      title: 'সাবজেক্ট ওয়াইজ',
      description:
        'বাংলা, ইংরেজি, গণিত, বিজ্ঞান সহ প্রতিটি বিষয়ের আলাদা আলাদা অধ্যায়ভিত্তিক গভীর প্রস্তুতি।',
      questions: '1000+',
      mockTests: '40',
      subjects: '15',
      subjectLabel: 'বিষয়',
      examId: 'bcs-preli-1',
      badge: 'অধ্যায়ভিত্তিক'
    },
    {
      id: 'bank',
      icon: Landmark,
      title: 'ব্যাংক জব',
      description:
        'সরকারি ও বেসরকারি ব্যাংকের সিনিয়র অফিসার, অফিসার ও ক্যাশিয়ার পদের জন্য বিশেষ ম্যাথ ও ইংলিশ প্রস্তুতি।',
      questions: '500+',
      mockTests: '18',
      subjects: '6',
      subjectLabel: 'বিষয়',
      examId: 'bank-job-1',
      badge: 'IBA প্যাটার্ন'
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

  return (
    <section id="exams" className="py-20 bg-[#f8f9fa] border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <h2 className="bijoy-section-title">এক্সাম ব্যাচসমূহ</h2>

        {/* Category Tabs (Biddabari style filter) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'সকল ব্যাচ (All)' },
            { id: 'primary', label: 'প্রাইমারি শিক্ষক' },
            { id: 'bcs', label: 'বিসিএস প্রিলি' },
            { id: 'ntrca', label: 'শিক্ষক নিবন্ধন' },
            { id: 'bank', label: 'ব্যাংক অফিসার' },
          ].map((tab) => (
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

        {/* Batches Grid - Exact Bijoyjatra batch card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredBatches.map((batch) => {
            const Icon = batch.icon;
            return (
              <div key={batch.id} className="bijoy-batch-card group">
                
                {/* Badge */}
                <div className="self-end mb-1">
                  <span className="bg-blue-50 text-[#007bff] border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500 fill-red-500" />
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
                    <span className="text-xs text-slate-500 font-medium">প্রশ্ন</span>
                  </div>
                  <div className="w-[1px] bg-slate-200" />
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-[#007bff]">
                      {batch.mockTests}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">মক টেস্ট</span>
                  </div>
                  <div className="w-[1px] bg-slate-200" />
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-[#007bff]">
                      {batch.subjects}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{batch.subjectLabel}</span>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={() => handleBatchClick(batch.examId)}
                  className="bijoy-batch-btn group-hover:shadow-lg"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>এখনই শুরু করুন</span>
                </button>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
