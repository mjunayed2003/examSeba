'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaGraduationCap, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { SAMPLE_COURSES, Course } from '../data/examData';

interface CourseCatalogSectionProps {
  onEnrollCourse: (course: Course) => void;
}

export default function CourseCatalogSection({ onEnrollCourse }: CourseCatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCourseDetails, setActiveCourseDetails] = useState<Course | null>(null);

  const categories = [
    { id: 'all', label: 'সকল কোর্স' },
    { id: 'primary', label: 'প্রাইমারি শিক্ষক' },
    { id: 'bcs', label: 'বিসিএস প্রিলি' },
    { id: 'ntrca', label: 'শিক্ষক নিবন্ধন' },
    { id: 'bank', label: 'ব্যাংক অফিসার' },
  ];

  const filteredCourses =
    selectedCategory === 'all'
      ? SAMPLE_COURSES
      : SAMPLE_COURSES.filter((c) => c.category === selectedCategory);

  return (
    <section id="courses" className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#007bff] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            বিদ্যাবাড়ি স্পেশাল কোর্স উইং
          </span>
          <h2 className="bijoy-section-title mt-2">সেরা চাকরি প্রস্তুতি লাইভ ব্যাচসমূহ</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            দেশের শীর্ষস্থানীয় বিসিএস ক্যাডার ও অভিজ্ঞ শিক্ষক মণ্ডলীর সরাসরি তত্ত্বাবধানে লাইভ ক্লাস ও পরীক্ষা।
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#007bff] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Banner Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <Image
                  src={course.bannerImage}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#007bff] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md z-10">
                  {course.badge}
                </div>
                <div className="absolute top-3 right-3 bg-white/95 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm z-10">
                  {course.tag}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 leading-snug group-hover:text-[#007bff] transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1.5">
                    <FaGraduationCap className="w-4 h-4 text-[#007bff]" />
                    <span>মেন্টর: {course.mentor} ({course.mentorDesignation})</span>
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-slate-50 rounded-xl mb-4 border border-slate-100 text-center">
                    <div>
                      <span className="block text-xs text-slate-500">লাইভ ক্লাস</span>
                      <span className="font-bold text-sm text-slate-800">{course.totalClasses}+ টি</span>
                    </div>
                    <div className="border-x border-slate-200">
                      <span className="block text-xs text-slate-500">মডেল টেস্ট</span>
                      <span className="font-bold text-sm text-[#007bff]">{course.totalExams}+ টি</span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-500">শিক্ষার্থী</span>
                      <span className="font-bold text-sm text-slate-800">{course.enrolledStudents}+</span>
                    </div>
                  </div>

                  {/* Feature bullet preview */}
                  <ul className="space-y-1.5 text-xs text-slate-600 mb-5">
                    {course.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <FaCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-[#007bff]">
                        ৳{course.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ৳{course.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block">
                      ভর্তিতে বিশেষ ৫০% ছাড় চলছে
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCourseDetails(course)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      সিলেবাস দেখুন
                    </button>
                    <button
                      onClick={() => onEnrollCourse(course)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004085] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>ভর্তি হন</span>
                      <FaArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Course Details Modal */}
        {activeCourseDetails && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-500">কোর্স বিস্তারিত ও রুটিন</span>
                </div>
                <button
                  onClick={() => setActiveCourseDetails(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700"
                >
                  <IoClose size={20} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {activeCourseDetails.title}
              </h3>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-slate-700 mb-5 leading-relaxed">
                <p className="font-bold text-blue-900 mb-1">কোর্স মেন্টর:</p>
                <p>{activeCourseDetails.mentor} — {activeCourseDetails.mentorDesignation}</p>
              </div>

              <h4 className="font-bold text-sm text-slate-800 mb-2">কোর্সের প্রধান সুবিধাসমূহ:</h4>
              <div className="space-y-2 mb-6">
                {activeCourseDetails.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <FaCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-sm text-slate-800 mb-2">সাপ্তাহিক ক্লাস রুটিন:</h4>
              <div className="space-y-2 mb-6">
                {activeCourseDetails.routine.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{r.topic}</span>
                      <span className="text-slate-500">{r.instructor}</span>
                    </div>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold text-[#007bff]">
                      {r.date}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span className="text-xs text-slate-500 block">কোর্স ফি</span>
                  <span className="text-2xl font-black text-[#007bff]">৳{activeCourseDetails.price}</span>
                </div>
                <button
                  onClick={() => {
                    const c = activeCourseDetails;
                    setActiveCourseDetails(null);
                    onEnrollCourse(c);
                  }}
                  className="px-6 py-2.5 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  এখনই ভর্তি নিশ্চিত করুন
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
