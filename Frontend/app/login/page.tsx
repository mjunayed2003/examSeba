'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { lang, toggleLang } = useLanguage();
  const isBn = lang === 'bn';

  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError(isBn ? 'অনুগ্রহ করে ইউজারনেম বা মোবাইল নম্বর দিন' : 'Please enter your username');
      return;
    }

    if (!password.trim()) {
      setError(isBn ? 'অনুগ্রহ করে পাসওয়ার্ড দিন' : 'Please enter your password');
      return;
    }

    setLoading(true);

    if (role === 'admin') {
      const adminSession = {
        name: 'এডমিন মামুনুর রশিদ',
        email: username.includes('@') ? username : 'admin@examsheba.com',
        role: 'Super Admin',
        loggedInAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem('exam_seba_admin', JSON.stringify(adminSession));
        window.dispatchEvent(new Event('exam_seba_admin_change'));
      } catch {
        // ignore
      }
      setTimeout(() => {
        router.push('/admin');
      }, 400);
    } else {
      const studentUser = {
        name: isBn ? 'আব্দুল্লাহ আল মামুন' : 'Abdullah Al Mamun',
        phone: username,
        batch: isBn ? '৪৭তম বিসিএস বুলেট ব্যাচ' : '47th BCS Bullet Batch',
      };
      try {
        localStorage.setItem('exam_seba_user', JSON.stringify(studentUser));
        window.dispatchEvent(new Event('exam_seba_auth_change'));
      } catch {
        // ignore
      }
      setTimeout(() => {
        router.push('/');
      }, 400);
    }
  };

  const handleQuickFill = () => {
    if (role === 'admin') {
      setUsername('admin@examsheba.com');
      setPassword('admin123');
    } else {
      setUsername('01712345678');
      setPassword('123456');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-between items-center p-4 sm:p-6 font-sans text-slate-800">
      
      {/* Top Bar for back & lang switch */}
      <header className="w-full max-w-md flex items-center justify-between py-2">
        <Link
          href="/"
          className="text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium flex items-center gap-1"
        >
          <span>←</span>
          <span>{isBn ? 'হোম পেজ' : 'Home'}</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-[11px] font-semibold text-[#0066ff] hover:underline"
          >
            {isBn ? 'ডেমো অটো-ফিল' : 'Auto-fill Demo'}
          </button>
          
          <button
            type="button"
            onClick={toggleLang}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs"
          >
            {isBn ? 'English' : 'বাংলা'}
          </button>
        </div>
      </header>

      {/* Exact Centered Login Box as in user image */}
      <main className="w-full max-w-sm sm:max-w-md my-auto">
        <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-200/80">
          
          {/* Header Title */}
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 text-center tracking-tight mb-7">
            {isBn ? 'Exam System Login' : 'Exam System Login'}
          </h1>

          {/* Role switcher (minimal tab) */}
          <div className="flex items-center justify-center gap-2 mb-6 text-xs">
            <button
              type="button"
              onClick={() => {
                setRole('student');
                setError('');
              }}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                role === 'student'
                  ? 'bg-blue-50 text-[#0066ff] border border-blue-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isBn ? 'শিক্ষার্থী (Student)' : 'Student'}
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setError('');
              }}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                role === 'admin'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isBn ? 'অ্যাডমিন (Admin)' : 'Admin'}
            </button>
          </div>

          {error && (
            <div className="mb-5 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="usernameInput"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                {role === 'admin'
                  ? (isBn ? 'Username / Email' : 'Username')
                  : (isBn ? 'Username' : 'Username')}
              </label>
              <input
                id="usernameInput"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=""
                autoComplete="username"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="passwordInput"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                {isBn ? 'Password' : 'Password'}
              </label>
              <input
                id="passwordInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                autoComplete="current-password"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
              />
            </div>

            {/* Blue Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#0066ff] hover:bg-[#0055d4] active:bg-[#0047b8] text-white font-medium text-sm rounded-lg transition-colors shadow-xs flex items-center justify-center cursor-pointer mt-6"
            >
              {loading
                ? (isBn ? 'Logging in...' : 'Logging in...')
                : (isBn ? 'Login' : 'Login')}
            </button>
          </form>

          {/* Bottom link: Don't have an account? Sign up */}
          <div className="mt-6 text-center text-sm text-slate-600">
            <span>{isBn ? "Don't have an account? " : "Don't have an account? "}</span>
            <Link
              href="/register"
              className="text-[#0066ff] hover:underline font-medium"
            >
              {isBn ? 'Sign up' : 'Sign up'}
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-xs text-slate-400 py-3">
        © 2026 Exam Seba. All rights reserved.
      </footer>

    </div>
  );
}
