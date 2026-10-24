'use client';

import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaBuilding,
  FaExternalLinkAlt,
  FaChevronRight
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { SAMPLE_JOBS, JobCircular } from '../data/examData';
import { useLanguage } from '../context/LanguageContext';

export default function JobAlertSection() {
  const [selectedJob, setSelectedJob] = useState<JobCircular | null>(null);
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <section id="job_alert" className="py-20 bg-[#f8f9fa] border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
            {t.jobAlert.badge}
          </span>
          <h2 className="bijoy-section-title mt-2">{t.jobAlert.title}</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            {t.jobAlert.subtitle}
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
                    <FaCalendarAlt className="w-3.5 h-3.5" />
                    <span>{isBn ? 'শেষ তারিখ:' : 'Deadline:'} {job.deadline}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#007bff] transition-colors leading-snug">
                  {job.title}
                </h3>

                <p className="text-xs text-slate-500 font-semibold mb-4 flex items-center gap-1.5">
                  <FaBuilding className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.organization}</span>
                </p>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl mb-4 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">{isBn ? 'মোট পদসংখ্যা' : 'Vacancies'}</span>
                    <span className="font-extrabold text-slate-800 text-sm">{job.vacancies}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">{isBn ? 'বেতন স্কেল' : 'Salary Scale'}</span>
                    <span className="font-bold text-slate-700 truncate block">{job.salaryScale}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 mb-4 line-clamp-2">
                  <span className="font-bold text-slate-700">{isBn ? 'যোগ্যতা: ' : 'Eligibility: '}</span>
                  {job.qualification}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="text-xs font-bold text-[#007bff] hover:underline flex items-center gap-1"
                >
                  <span>{isBn ? 'সম্পূর্ণ নোটিশ দেখুন' : 'View Full Circular'}</span>
                  <FaChevronRight className="w-3 h-3" />
                </button>

                <a
                  href={job.applicationLink || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#007bff] text-slate-700 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span>{isBn ? 'আবেদন করুন' : 'Apply'}</span>
                  <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Job Details */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-[#007bff] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {selectedJob.category}
                </span>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700"
                >
                  <IoClose size={22} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">
                {selectedJob.title}
              </h3>
              <p className="text-xs text-slate-500 font-semibold mb-4">
                {selectedJob.organization}
              </p>

              <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 leading-relaxed">
                <p>
                  <strong>{isBn ? 'পদসংখ্যা:' : 'Vacancies:'}</strong> {selectedJob.vacancies}
                </p>
                <p>
                  <strong>{isBn ? 'বেতন গ্রেড/স্কেল:' : 'Salary Grade:'}</strong> {selectedJob.salaryScale}
                </p>
                <p>
                  <strong>{isBn ? 'আবেদনের শেষ তারিখ:' : 'Deadline:'}</strong> {selectedJob.deadline}
                </p>
                <p>
                  <strong>{isBn ? 'শিক্ষাগত যোগ্যতা:' : 'Required Qualification:'}</strong> {selectedJob.qualification}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedJob.applicationLink || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-[#007bff] hover:bg-[#0056b3] text-white text-center font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{isBn ? 'অনলাইনে আবেদন করুন' : 'Apply Online'}</span>
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
