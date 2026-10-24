'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Building,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_JOBS, JobCircular } from '../data/examData';

export default function JobAlertSection() {
  const [selectedJob, setSelectedJob] = useState<JobCircular | null>(null);

  return (
    <section id="job_alert" className="py-20 bg-[#f8f9fa] border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
            সদ্য প্রকাশিত চাকরির বিজ্ঞপ্তি
          </span>
          <h2 className="bijoy-section-title mt-2">চাকরির খবর ও নিয়োগ সার্কুলার</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            বিসিএস, প্রাথমিক শিক্ষক নিয়োগ, ব্যাংক ও মন্ত্রণালয়ের চলমান সকল সরকারি চাকরির তথ্য এক নজরে।
          </p>
        </div>

        {/* Circulars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_JOBS.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-50 text-[#007bff] text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-200">
                    {job.category}
                  </span>
                  <span className="text-xs font-bold text-red-500 flex items-center gap-1 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>শেষ তারিখ: {job.deadline}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#007bff] transition-colors leading-snug">
                  {job.title}
                </h3>

                <p className="text-xs text-slate-500 font-semibold mb-4 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span>{job.organization}</span>
                </p>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl mb-4 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">মোট পদসংখ্যা</span>
                    <span className="font-extrabold text-slate-800 text-sm">{job.vacancies}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">বেতন স্কেল</span>
                    <span className="font-bold text-slate-700 truncate block">{job.salaryScale}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 mb-4 line-clamp-2">
                  <span className="font-bold text-slate-700">যোগ্যতা: </span>
                  {job.qualification}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="text-xs font-bold text-[#007bff] hover:underline flex items-center gap-1"
                >
                  <span>সম্পূর্ণ নোটিশ দেখুন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={job.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>আবেদন লিংক</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Detail Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  সার্কুলার বিবরণ
                </span>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-slate-400 hover:text-slate-700 font-bold"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">{selectedJob.title}</h3>
              <p className="text-xs text-slate-500 mb-4 font-medium">{selectedJob.organization}</p>

              <div className="space-y-3 text-xs text-slate-700 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold block text-slate-800">পদসংখ্যা:</span>
                  <span>{selectedJob.vacancies}</span>
                </div>
                <div>
                  <span className="font-bold block text-slate-800">শিক্ষাগত যোগ্যতা:</span>
                  <span>{selectedJob.qualification}</span>
                </div>
                <div>
                  <span className="font-bold block text-slate-800">বেতন স্কেল:</span>
                  <span>{selectedJob.salaryScale}</span>
                </div>
                <div>
                  <span className="font-bold block text-red-600">আবেদনের শেষ তারিখ ও সময়:</span>
                  <span className="font-bold">{selectedJob.deadline}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
                >
                  বন্ধ করুন
                </button>
                <a
                  href={selectedJob.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 shadow"
                >
                  <span>অনলাইনে আবেদন করুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
