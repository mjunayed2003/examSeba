'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaPhoneAlt, FaEnvelope, FaLock, FaGraduationCap, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import ExamSebaLogo from '../components/ExamSebaLogo';
import { useLanguage } from '../context/LanguageContext';

export default function RegisterPage() {
  const router = useRouter();
  const { lang, toggleLang } = useLanguage();
  const isBn = lang === 'bn';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('৪৭তম বিসিএস বুলেট ব্যাচ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const targetBatches = isBn ? [
    '৪৭তম বিসিএস বুলেট ব্যাচ',
    'প্রাইমারি শিক্ষক নিয়োগ ৩য় ধাপ স্পেশাল',
    '১৯তম NTRCA শিক্ষক নিবন্ধন ক্র্যাশ ব্যাচ',
    '১০ম-২০তম গ্রেড সরকারি চাকরি প্রস্তুতি',
    'কম্বাইন্ড ব্যাংক অফিসার প্রিলি ব্যাচ',
  ] : [
    '47th BCS Bullet Batch',
    'Primary Teacher Recruitment 3rd Phase',
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
      setError(isBn ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)' : 'Please enter valid 11-digit mobile number');
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
    if (!agreeTerms) {
      setError(isBn ? 'অনুগ্রহ করে নিয়ম ও গোপনীয়তা নীতি মেনে নিন' : 'Please accept the Terms and Privacy Policy');
      return;
    }

    const newUser = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      batch: batch,
      registeredAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('exam_seba_user', JSON.stringify(newUser));
      window.dispatchEvent(new Event('exam_seba_auth_change'));
    } catch {
      // ignore
    }

    setSuccessMsg(isBn ? 'অভিনন্দন! রেজিস্ট্রেশন সফল হয়েছে। হোম পেজে নেওয়া হচ্ছে...' : 'Congratulations! Registration successful. Redirecting...');
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  const fillDemoStudent = () => {
    setName(isBn ? 'নুসরাত জাহান' : 'Nusrat Jahan');
    setPhone('01887654321');
    setEmail('nusrat@example.com');
    setBatch(targetBatches[0]);
    setPassword('123456');
    setConfirmPassword('123456');
    setAgreeTerms(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002b5c] via-[#004085] to-[#0056b3] flex flex-col justify-between p-4 sm:p-6 text-slate-800">
      
      {/* Top Bar */}
      <header className="container mx-auto flex items-center justify-between py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all backdrop-blur-md border border-white/20"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>{isBn ? 'মূল সাইটে ফিরুন' : 'Back to Home'}</span>
        </Link>

        {/* Language Switch */}
        <button
          onClick={toggleLang}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1 rounded-full text-xs shadow-md transition-all flex items-center gap-1.5 border border-amber-300"
          aria-label="Toggle Language"
        >
          <span>🌐</span>
          <span>{isBn ? 'English' : 'বাংলা'}</span>
        </button>
      </header>

      {/* Main Registration Card */}
      <main className="container mx-auto flex items-center justify-center my-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-white/30 max-w-lg w-full p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          
          {/* Decorative background glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Headline */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <ExamSebaLogo lang={lang} theme="light" size="lg" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {isBn ? 'নতুন শিক্ষার্থী রেজিস্ট্রেশন' : 'Student Registration'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isBn
                ? 'বিনামূল্যে অ্যাকাউন্ট খুলে ২০,০০০+ প্রশ্নের মডেল টেস্টে অংশ নিন'
                : 'Create your free account and practice with 20,000+ model tests'}
            </p>
          </div>

          {/* 1-Click Demo Fill */}
          <div className="mb-4 p-2.5 bg-blue-50/70 border border-blue-200/60 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              {isBn ? 'টেস্টিং ডেমো তথ্য:' : 'Quick Demo Data:'}
            </span>
            <button
              type="button"
              onClick={fillDemoStudent}
              className="bg-[#007bff] hover:bg-[#0056b3] text-white px-2.5 py-1 rounded-lg font-bold shadow-sm transition-all"
            >
              {isBn ? '১-ক্লিক পূরণ' : '1-Click Auto Fill'}
            </button>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-bold animate-in fade-in">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <FaCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-3.5">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isBn ? 'পুরো নাম *' : 'Full Name *'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaUser className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isBn ? 'যেমন: নুসরাত জাহান' : 'e.g. Nusrat Jahan'}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Mobile & Email in 2 columns on sm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBn ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaPhoneAlt className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBn ? 'ইমেইল এড্রেস (ঐচ্ছিক)' : 'Email (Optional)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaEnvelope className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Target Exam Batch */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isBn ? 'টার্গেট চাকরির পরীক্ষা / ব্যাচ *' : 'Target Exam Batch *'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaGraduationCap className="w-3.5 h-3.5" />
                </div>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:bg-white transition-all font-medium"
                >
                  {targetBatches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBn ? 'পাসওয়ার্ড *' : 'Password *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaLock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBn ? 'পাসওয়ার্ড নিশ্চিত করুন *' : 'Confirm Password *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaLock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-[#007bff] focus:ring-blue-400 mt-0.5 w-3.5 h-3.5"
                />
                <span>
                  {isBn ? (
                    <>
                      আমি এক্সাম সেবার{' '}
                      <span className="text-[#007bff] font-semibold underline">ব্যবহারবিধি</span> ও{' '}
                      <span className="text-[#007bff] font-semibold underline">গোপনীয়তা নীতি</span> মেনে নিচ্ছি।
                    </>
                  ) : (
                    <>
                      I agree to the{' '}
                      <span className="text-[#007bff] font-semibold underline">Terms of Use</span> and{' '}
                      <span className="text-[#007bff] font-semibold underline">Privacy Policy</span>.
                    </>
                  )}
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-black text-xs sm:text-sm bg-[#007bff] hover:bg-[#0056b3] text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
            >
              <span>{isBn ? 'রেজিস্ট্রেশন সম্পন্ন করুন' : 'Complete Registration'}</span>
            </button>
          </form>

          {/* Bottom Switch to Login */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>{isBn ? 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে?' : 'Already have an account?'} </span>
            <Link
              href="/login"
              className="font-black text-[#007bff] hover:underline"
            >
              {isBn ? 'এখানে লগইন করুন' : 'Login here'}
            </Link>
          </div>

        </div>
      </main>

      {/* Footer Info */}
      <footer className="container mx-auto text-center py-2 text-xs text-blue-100">
        <p>© 2026 {isBn ? 'এক্সাম সেবা' : 'Exam Seba'} — {isBn ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</p>
      </footer>

    </div>
  );
}
