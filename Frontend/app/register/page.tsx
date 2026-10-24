'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function RegisterPage() {
  const router = useRouter();
  const { lang, toggleLang } = useLanguage();
  const isBn = lang === 'bn';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [batch, setBatch] = useState('৪৭তম বিসিএস বুলেট ব্যাচ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const targetBatches = isBn ? [
    '৪৭তম বিসিএস বুলেট ব্যাচ',
    'প্রাইমারি শিক্ষক নিয়োগ স্পেশাল ব্যাচ',
    '১৯তম NTRCA শিক্ষক নিবন্ধন ক্র্যাশ ব্যাচ',
    '১০ম-২০তম গ্রেড সরকারি চাকরি প্রস্তুতি',
    'কম্বাইন্ড ব্যাংক অফিসার প্রিলি ব্যাচ',
  ] : [
    '47th BCS Bullet Batch',
    'Primary Teacher Recruitment Special',
    '19th NTRCA Registration Crash Batch',
    '10th-20th Grade Govt Job Batch',
    'Combined Bank Officer Prelims',
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(isBn ? 'আপনার পুরো নাম লিখুন' : 'Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      setError(isBn ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' : 'Please enter valid 11-digit mobile number');
      return;
    }
    if (password.length < 6) {
      setError(isBn ? 'পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError(isBn ? 'পাসওয়ার্ড দুটি মিলছে না' : 'Passwords do not match');
      return;
    }

    setLoading(true);

    const newUser = {
      name: name.trim(),
      phone: phone.trim(),
      batch: batch,
      registeredAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('exam_seba_user', JSON.stringify(newUser));
      window.dispatchEvent(new Event('exam_seba_auth_change'));
    } catch {
      // ignore
    }

    setTimeout(() => {
      router.push('/');
    }, 400);
  };

  const handleQuickFill = () => {
    setName(isBn ? 'নুসরাত জাহান' : 'Nusrat Jahan');
    setPhone('01887654321');
    setBatch(targetBatches[0]);
    setPassword('123456');
    setConfirmPassword('123456');
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

      {/* Centered Register Box */}
      <main className="w-full max-w-sm sm:max-w-md my-auto">
        <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-200/80">
          
          {/* Header Title */}
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 text-center tracking-tight mb-7">
            {isBn ? 'Exam System Sign Up' : 'Exam System Sign Up'}
          </h1>

          {error && (
            <div className="mb-5 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
              />
            </div>

            {/* Username / Mobile */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Username / Mobile Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=""
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
              />
            </div>

            {/* Target Batch */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Target Batch
              </label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
              >
                {targetBatches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=""
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
                ? (isBn ? 'Creating account...' : 'Creating account...')
                : (isBn ? 'Sign up' : 'Sign up')}
            </button>
          </form>

          {/* Bottom link: Already have an account? Login */}
          <div className="mt-6 text-center text-sm text-slate-600">
            <span>{isBn ? 'Already have an account? ' : 'Already have an account? '}</span>
            <Link
              href="/login"
              className="text-[#0066ff] hover:underline font-medium"
            >
              {isBn ? 'Login' : 'Login'}
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
