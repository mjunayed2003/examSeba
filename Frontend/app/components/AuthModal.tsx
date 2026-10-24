'use client';

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaUser, FaLock, FaPhoneAlt } from 'react-icons/fa';
import ExamSebaLogo from './ExamSebaLogo';
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <IoClose className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <ExamSebaLogo lang={lang} theme="light" size="md" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-800">
            {mode === 'login' ? t.auth.loginTitle : t.auth.signupTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login' ? t.auth.loginSub : t.auth.signupSub}
          </p>
        </div>

        {/* 1-Click Demo Login Trigger */}
        <div className="mb-6 p-3 bg-blue-50/70 rounded-2xl border border-blue-200 text-center">
          <p className="text-xs text-blue-900 font-semibold mb-2">
            {t.auth.demoText}
          </p>
          <button
            onClick={handleDemoLogin}
            type="button"
            className="w-full py-2 px-3 bg-[#007bff] hover:bg-[#0056b3] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <span>{t.auth.demoBtn}</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t.auth.nameLabel} *</label>
              <div className="relative">
                <FaUser className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder={t.auth.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-bold mb-1">{t.auth.phoneLabel} *</label>
            <div className="relative">
              <FaPhoneAlt className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="tel"
                required
                placeholder={t.auth.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">{t.auth.passwordLabel} *</label>
            <div className="relative">
              <FaLock className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder={t.auth.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff]"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t.auth.batchLabel} *</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff] bg-white"
              >
                <option value="৪৭তম বিসিএস বুলেট ব্যাচ">{lang === 'bn' ? '৪৭তম বিসিএস বুলেট ব্যাচ' : '47th BCS Bullet Batch'}</option>
                <option value="প্রাইমারি স্পেশাল গোল্ড ব্যাচ">{lang === 'bn' ? 'প্রাইমারি স্পেশাল গোল্ড ব্যাচ' : 'Primary Special Gold Batch'}</option>
                <option value="১৯তম শিক্ষক নিবন্ধন ব্যাচ">{lang === 'bn' ? '১৯তম শিক্ষক নিবন্ধন ব্যাচ' : '19th NTRCA Registration Batch'}</option>
                <option value="কম্বাইন্ড ব্যাংক অফিসার ব্যাচ">{lang === 'bn' ? 'কম্বাইন্ড ব্যাংক অফিসার ব্যাচ' : 'Combined Bank Officer Batch'}</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004085] text-white font-bold rounded-xl shadow-md transition-all text-sm mt-2"
          >
            {mode === 'login' ? t.auth.submitLogin : t.auth.submitSignup}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="text-center mt-5 text-xs text-slate-600">
          {mode === 'login' ? (
            <p>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#007bff] font-bold hover:underline"
              >
                {t.auth.noAccount}
              </button>
            </p>
          ) : (
            <p>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#007bff] font-bold hover:underline"
              >
                {t.auth.hasAccount}
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
