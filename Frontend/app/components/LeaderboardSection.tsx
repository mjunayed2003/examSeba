'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaTrophy } from 'react-icons/fa6';
import { SAMPLE_LEADERBOARD } from '../data/examData';
import { useLanguage } from '../context/LanguageContext';

interface LeaderboardSectionProps {
  userResult?: unknown;
}

export default function LeaderboardSection({}: LeaderboardSectionProps) {
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  const batches = [
    { id: 'all', label: t.leaderboard.filterAll },
    { id: 'bcs', label: t.leaderboard.filterBcs },
    { id: 'primary', label: t.leaderboard.filterPrimary },
    { id: 'bank', label: t.leaderboard.filterBank },
    { id: 'ntrca', label: t.leaderboard.filterNtrca },
  ];

  const filteredEntries =
    selectedBatch === 'all'
      ? SAMPLE_LEADERBOARD
      : SAMPLE_LEADERBOARD.filter((entry) => {
          if (selectedBatch === 'bcs') return entry.batch.includes('বিসিএস');
          if (selectedBatch === 'primary') return entry.batch.includes('প্রাইমারি');
          if (selectedBatch === 'bank') return entry.batch.includes('ব্যাংক');
          if (selectedBatch === 'ntrca') return entry.batch.includes('NTRCA');
          return true;
        });

  return (
    <section id="leaderboard" className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
            {t.leaderboard.badge}
          </span>
          <h2 className="bijoy-section-title mt-2">{t.leaderboard.title}</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto -mt-6">
            {t.leaderboard.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {batches.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBatch(b.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                selectedBatch === b.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Top 3 Podium Highlights on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          {filteredEntries[1] && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center flex flex-col items-center justify-center order-2 md:order-1 relative shadow-sm">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-black flex items-center justify-center text-sm mb-2">
                2
              </div>
              <Image
                src={filteredEntries[1].avatar}
                alt={filteredEntries[1].studentName}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-300 mb-2 shadow"
              />
              <h4 className="font-bold text-slate-800 text-sm">{filteredEntries[1].studentName}</h4>
              <p className="text-xs text-slate-500 mb-2">{filteredEntries[1].batch}</p>
              <span className="text-lg font-black text-slate-700">{filteredEntries[1].score} {isBn ? 'মার্কস' : 'Marks'}</span>
              <span className="text-[11px] text-slate-400">{filteredEntries[1].timeSpent}</span>
            </div>
          )}

          {/* 1st Place (Champion) */}
          {filteredEntries[0] && (
            <div className="bg-gradient-to-b from-amber-50 to-amber-100/50 border-2 border-amber-300 rounded-2xl p-6 text-center flex flex-col items-center justify-center order-1 md:order-2 relative shadow-lg transform md:-translate-y-3">
              <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase flex items-center gap-1 shadow">
                <FaTrophy className="w-3.5 h-3.5" />
                <span>{t.leaderboard.firstPlace}</span>
              </div>
              <Image
                src={filteredEntries[0].avatar}
                alt={filteredEntries[0].studentName}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 mb-2 shadow-md mt-2"
              />
              <h4 className="font-extrabold text-slate-900 text-base">{filteredEntries[0].studentName}</h4>
              <p className="text-xs text-amber-800 font-medium mb-2">{filteredEntries[0].batch}</p>
              <span className="text-2xl font-black text-[#007bff]">{filteredEntries[0].score} / 10</span>
              <span className="text-xs text-slate-600 font-semibold">{filteredEntries[0].timeSpent}</span>
            </div>
          )}

          {/* 3rd Place */}
          {filteredEntries[2] && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center flex flex-col items-center justify-center order-3 md:order-3 relative shadow-sm">
              <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-900 font-black flex items-center justify-center text-sm mb-2">
                3
              </div>
              <Image
                src={filteredEntries[2].avatar}
                alt={filteredEntries[2].studentName}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-600/40 mb-2 shadow"
              />
              <h4 className="font-bold text-slate-800 text-sm">{filteredEntries[2].studentName}</h4>
              <p className="text-xs text-slate-500 mb-2">{filteredEntries[2].batch}</p>
              <span className="text-lg font-black text-slate-700">{filteredEntries[2].score} {isBn ? 'মার্কস' : 'Marks'}</span>
              <span className="text-[11px] text-slate-400">{filteredEntries[2].timeSpent}</span>
            </div>
          )}
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 text-center">{t.leaderboard.rankCol}</th>
                  <th className="py-3.5 px-4">{t.leaderboard.nameCol}</th>
                  <th className="py-3.5 px-4">{t.leaderboard.batchCol}</th>
                  <th className="py-3.5 px-4 text-center">{t.leaderboard.scoreCol}</th>
                  <th className="py-3.5 px-4 text-center">{t.leaderboard.accuracyCol}</th>
                  <th className="py-3.5 px-4 text-center">{t.leaderboard.timeCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEntries.map((entry) => (
                  <tr key={entry.rank} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs ${
                          entry.rank === 1
                            ? 'bg-amber-400 text-slate-950'
                            : entry.rank === 2
                            ? 'bg-slate-300 text-slate-800'
                            : entry.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {entry.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <Image
                          src={entry.avatar}
                          alt={entry.studentName}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <span className="font-bold text-slate-800">{entry.studentName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-700 block">{entry.batch}</span>
                      <span className="text-[11px] text-slate-400">{entry.examTitle}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-black text-[#007bff] text-sm sm:text-base">
                        {entry.score}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {entry.accuracy}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-500 font-medium text-xs">
                      {entry.timeSpent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
