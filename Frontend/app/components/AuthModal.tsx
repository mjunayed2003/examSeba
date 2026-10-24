'use client';

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: { name: string; phone: string; batch: string }) => void;
}

export default function AuthModal({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [batch, setBatch] = useState('৪৭তম বিসিএস বুলেট ব্যাচ');
  const [error, setError] = useState('');
  const { lang, t } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && !name.trim()) {
      setError(t.auth.validationName);
      return;
    }

    if (!phone || phone.length < 11) {
      setError(t.auth.validationPhone);
      return;
    }

    if (!password || password.length < 6) {
      setError(t.auth.validationPassword);
      return;
    }

    onLoginSuccess({
      name: mode === 'signup' ? name : 'মোঃ আব্দুল্লাহ আল মামুন',
      phone,
      batch,
    });
    onClose();
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: lang === 'bn' ? 'আব্দুল্লাহ আল মামুন' : 'Abdullah Al Mamun',
      phone: '01712345678',
      batch: lang === 'bn' ? '৪৭তম বিসিএস বুলেট ব্যাচ' : '47th BCS Bullet Batch',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm sm:max-w-md w-full p-7 sm:p-10 shadow-lg border border-slate-200/80 relative animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
            {mode === 'login' ? 'Exam System Login' : 'Exam System Sign Up'}
          </h2>
          <div className="mt-1 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-[11px] font-semibold text-[#0066ff] hover:underline"
            >
              {lang === 'bn' ? '১-ক্লিক ডেমো লগইন' : '1-Click Demo Fill'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* Form matching screenshot */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Target Batch
              </label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] text-sm text-slate-800 transition-colors bg-white"
              >
                <option value="৪৭তম বিসিএস বুলেট ব্যাচ">{lang === 'bn' ? '৪৭তম বিসিএস বুলেট ব্যাচ' : '47th BCS Bullet Batch'}</option>
                <option value="প্রাইমারি স্পেশাল গোল্ড ব্যাচ">{lang === 'bn' ? 'প্রাইমারি স্পেশাল গোল্ড ব্যাচ' : 'Primary Special Gold Batch'}</option>
                <option value="১৯তম শিক্ষক নিবন্ধন ব্যাচ">{lang === 'bn' ? '১৯তম শিক্ষক নিবন্ধন ব্যাচ' : '19th NTRCA Registration Batch'}</option>
                <option value="কম্বাইন্ড ব্যাংক অফিসার ব্যাচ">{lang === 'bn' ? 'কম্বাইন্ড ব্যাংক অফিসার ব্যাচ' : 'Combined Bank Officer Batch'}</option>
              </select>
            </div>
          )}

          {/* Blue Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#0066ff] hover:bg-[#0055d4] active:bg-[#0047b8] text-white font-medium text-sm rounded-lg transition-colors shadow-xs flex items-center justify-center cursor-pointer mt-6"
          >
            {mode === 'login' ? 'Login' : 'Sign up'}
          </button>
        </form>

        {/* Switch Mode: Don't have an account? Sign up */}
        <div className="text-center mt-6 text-sm text-slate-600">
          {mode === 'login' ? (
            <p>
              <span>Don&apos;t have an account? </span>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#0066ff] font-medium hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#0066ff] font-medium hover:underline cursor-pointer"
              >
                Login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
