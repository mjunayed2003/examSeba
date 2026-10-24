'use client';

import React from 'react';
import Link from 'next/link';
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaTelegram
} from 'react-icons/fa6';
import ExamSebaLogo from './ExamSebaLogo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: About */}
          <div>
            <div className="mb-4">
              <ExamSebaLogo lang={lang} theme="dark" size="md" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {t.footer.about}
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
                <FaTelegram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.nav.exams}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('courses')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.nav.courses}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('studyroom')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.nav.studyroom}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('leaderboard')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.nav.leaderboard}
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link href="/login" className="hover:text-blue-400 transition-colors">
                  {t.nav.login}
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-blue-400 transition-colors">
                  {t.nav.signup}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition-colors font-bold flex items-center gap-1">
                  <span>🛡️</span>
                  <span>{isBn ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Exams & Batches */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t.footer.categories}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.footer.bcsExam}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.footer.primaryExam}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.footer.ntrcaExam}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('exams')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.footer.bankExam}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('job_alert')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.footer.allJobs}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Helpline */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <FaPhone className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-1" />
                <div>
                  <span className="block text-white font-bold">0961-200300, 017XXXXXXXX</span>
                  <span>{t.footer.helplineText}</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>support@examsheba.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FaLocationDot className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-1" />
                <span>{isBn ? 'মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ' : 'Mirpur-10, Dhaka-1216, Bangladesh'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-slate-400">{t.footer.privacy}</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">{t.footer.terms}</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">{t.footer.refund}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
