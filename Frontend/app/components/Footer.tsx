'use client';

import React from 'react';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Send,
  Heart,
  ShieldCheck,
  Globe,
  Share2
} from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: About */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-wide">
                JobQuizTest
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              বাংলাদেশের প্রথম সারির চাকরি পরীক্ষা প্রস্তুতি ও মডেল টেস্ট প্ল্যাটফর্ম। বিসিএস, প্রাথমিক শিক্ষক নিয়োগ ও ব্যাংকের নির্ভুল মূল্যায়ন।
            </p>
            <div className="flex items-center gap-3">
              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* YouTube SVG */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* Telegram */}
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              গুরুত্বপূর্ণ লিংকসমূহ
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-blue-400 transition-colors"
                >
                  মূল পাতা (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  এক্সাম ব্যাচসমূহ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('courses')}
                  className="hover:text-blue-400 transition-colors"
                >
                  কোর্স ও লাইভ ক্লাস
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('studyroom')}
                  className="hover:text-blue-400 transition-colors"
                >
                  ফ্রি স্টাডি রুম ও PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('leaderboard')}
                  className="hover:text-blue-400 transition-colors"
                >
                  লাইভ লিডারবোর্ড
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Exams & Batches */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              পরীক্ষা ক্যাটাগরি
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  বিসিএস প্রিলিমিনারি পরীক্ষা
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  প্রাথমিক সহকারী শিক্ষক নিয়োগ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  ১৯তম শিক্ষক নিবন্ধন (NTRCA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  কম্বাইন্ড ব্যাংক অফিসার পরীক্ষা
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('job_alert')}
                  className="hover:text-blue-400 transition-colors"
                >
                  চলমান সকল চাকরির খবর
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Helpline */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              যোগাযোগ ও হেল্পডেস্ক
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-bold">০৯৬১-২০০৩০০, ০১৭XXXXXXXX</span>
                  <span>(সকাল ৯টা হতে রাত ১০টা)</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@examsheba.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 JobQuizTest | Exam Sheba. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-slate-400">গোপনীয়তা নীতি</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">ব্যবহারের শর্তাবলী</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">রিফান্ড পলিসি</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
