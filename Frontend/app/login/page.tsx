'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPhoneAlt, FaLock, FaUserShield, FaGraduationCap, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import ExamSebaLogo from '../components/ExamSebaLogo';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { lang, toggleLang } = useLanguage();
  const isBn = lang === 'bn';

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleStudentLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError(isBn ? 'অনুগ্রহ করে মোবাইল নম্বর প্রদান করুন' : 'Please provide your mobile number');
      return;
    }
    if (password.length < 6) {
      setError(isBn ? 'পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters');
      return;
    }

    const studentUser = {
      name: identifier.includes('@') ? 'আব্দুল্লাহ আল মামুন' : 'আব্দুল্লাহ আল মামুন',
      phone: identifier,
      batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
    };

    try {
      localStorage.setItem('exam_seba_user', JSON.stringify(studentUser));
      window.dispatchEvent(new Event('exam_seba_auth_change'));
    } catch {
      // ignore
    }

    setSuccessMsg(isBn ? 'লগইন সফল হয়েছে! রিডাইরেক্ট করা হচ্ছে...' : 'Login successful! Redirecting...');
    setTimeout(() => {
      router.push('/');
    }, 800);
  };

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError(isBn ? 'অনুগ্রহ করে অ্যাডমিন ইমেইল প্রদান করুন' : 'Please enter admin email');
      return;
    }
    if (!password.trim()) {
      setError(isBn ? 'অনুগ্রহ করে অ্যাডমিন পাসওয়ার্ড প্রদান করুন' : 'Please enter admin password');
      return;
    }

    const adminSession = {
      name: 'এডমিন মামুনুর রশিদ',
      email: identifier,
      role: 'Super Admin',
      loggedInAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('exam_seba_admin', JSON.stringify(adminSession));
      window.dispatchEvent(new Event('exam_seba_admin_change'));
    } catch {
      // ignore
    }

    setSuccessMsg(isBn ? 'অ্যাডমিন ভেরিফিকেশন সফল! প্যানেলে নেওয়া হচ্ছে...' : 'Admin verified! Entering console...');
    setTimeout(() => {
      router.push('/admin');
    }, 800);
  };

  const fillDemoStudent = () => {
    setIdentifier('01712345678');
    setPassword('123456');
    setError('');
  };

  const fillDemoAdmin = () => {
    setIdentifier('admin@examsheba.com');
    setPassword('admin123');
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

      {/* Main Login Card */}
      <main className="container mx-auto flex items-center justify-center my-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-white/30 max-w-md w-full p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          
          {/* Decorative background glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Headline */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <ExamSebaLogo lang={lang} theme="light" size="lg" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {activeTab === 'student'
                ? (isBn ? 'শিক্ষার্থী লগইন' : 'Student Login')
                : (isBn ? 'অ্যাডমিন পোর্টাল' : 'Admin Portal')}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {activeTab === 'student'
                ? (isBn ? 'আপনার প্রোফাইলে প্রবেশ করে মডেল টেস্ট শুরু করুন' : 'Log in to continue your model tests & courses')
                : (isBn ? 'প্রশ্নব্যাংক ও পরীক্ষা নিয়ন্ত্রক এক্সেস' : 'Manage exams, questions, and students')}
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab('student');
                setError('');
                setIdentifier('');
                setPassword('');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'student'
                  ? 'bg-white text-[#007bff] shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaGraduationCap className="w-4 h-4" />
              <span>{isBn ? 'শিক্ষার্থী' : 'Student'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setError('');
                setIdentifier('');
                setPassword('');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaUserShield className="w-4 h-4" />
              <span>{isBn ? 'অ্যাডমিন' : 'Admin'}</span>
            </button>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="mb-4 p-2.5 bg-blue-50/70 border border-blue-200/60 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              {isBn ? 'টেস্টিং ডেমো একাউন্ট:' : 'Quick Demo Test:'}
            </span>
            <button
              type="button"
              onClick={activeTab === 'student' ? fillDemoStudent : fillDemoAdmin}
              className="bg-[#007bff] hover:bg-[#0056b3] text-white px-2.5 py-1 rounded-lg font-bold shadow-sm transition-all"
            >
              {isBn ? '১-ক্লিক পূরণ' : '1-Click Auto Fill'}
            </button>
          </div>

          {/* Feedback messages */}
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
          <form
            onSubmit={activeTab === 'student' ? handleStudentLogin : handleAdminLogin}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {activeTab === 'student'
                  ? (isBn ? 'মোবাইল নম্বর / ইমেইল' : 'Mobile Number or Email')
                  : (isBn ? 'অ্যাডমিন ইমেইল' : 'Admin Email Address')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    activeTab === 'student'
                      ? (isBn ? '০১৭১২-৩৪৫৬৭৮' : '017XXXXXXXX')
                      : 'admin@examsheba.com'
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {isBn ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(isBn ? 'পাসওয়ার্ড রিসেটের জন্য হেল্পলাইনে যোগাযোগ করুন: 0961-200300' : 'Contact helpline for password reset: 0961-200300');
                  }}
                  className="text-[11px] text-[#007bff] hover:underline font-semibold"
                >
                  {isBn ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaLock className="w-3.5 h-3.5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#007bff] focus:ring-blue-400 w-3.5 h-3.5"
                />
                <span>{isBn ? 'আমাকে মনে রাখুন' : 'Remember me'}</span>
              </label>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 ${
                activeTab === 'student'
                  ? 'bg-[#007bff] hover:bg-[#0056b3] text-white shadow-blue-500/25'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/25'
              }`}
            >
              <span>
                {activeTab === 'student'
                  ? (isBn ? 'লগইন করুন' : 'Sign In as Student')
                  : (isBn ? 'অ্যাডমিন প্যানেলে প্রবেশ করুন' : 'Enter Admin Console')}
              </span>
            </button>
          </form>

          {/* Bottom Switch to Register */}
          {activeTab === 'student' ? (
            <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
              <span>{isBn ? 'এখনো কোনো একাউন্ট নেই?' : "Don't have an account yet?"} </span>
              <Link
                href="/register"
                className="font-black text-[#007bff] hover:underline"
              >
                {isBn ? 'বিনামূল্যে রেজিস্ট্রেশন করুন' : 'Register Free'}
              </Link>
            </div>
          ) : (
            <div className="mt-6 pt-5 border-t border-slate-100 text-center text-[11px] text-slate-500">
              <span>🔒 {isBn ? 'শুধুমাত্র অনুমোদিত পরীক্ষা নিয়ন্ত্রক ও প্রশাসকদের জন্য সংরক্ষিত।' : 'Authorized Exam Seba administrators only.'}</span>
            </div>
          )}

        </div>
      </main>

      {/* Footer Info */}
      <footer className="container mx-auto text-center py-2 text-xs text-blue-100">
        <p>© 2026 {isBn ? 'এক্সাম সেবা' : 'Exam Seba'} — {isBn ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</p>
      </footer>

    </div>
  );
}
