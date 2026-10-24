'use client';

import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  Phone,
  GraduationCap,
  Sparkles
} from 'lucide-react';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: name || 'আব্দুল্লাহ আল মামুন',
      phone: phone || '01712345678',
      batch: batch,
    });
    onClose();
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: 'তানজিলা তাসনিম',
      phone: '01899123456',
      batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
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
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#007bff] to-[#0056b3] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-800">
            {mode === 'login' ? 'শিক্ষার্থী লগইন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login'
              ? 'আপনার অ্যাকাউন্টে প্রবেশ করে লাইভ পরীক্ষায় অংশ নিন'
              : 'আজই রেজিস্ট্রেশন করে ফ্রি মডেল টেস্ট দিন'}
          </p>
        </div>

        {/* 1-Click Demo Login Trigger */}
        <div className="mb-6 p-3 bg-blue-50/70 rounded-2xl border border-blue-200 text-center">
          <p className="text-xs text-blue-900 font-semibold mb-2">
            দ্রুত ডেমো অ্যাকাউন্টে প্রবেশ করতে চান?
          </p>
          <button
            onClick={handleDemoLogin}
            type="button"
            className="w-full py-2 px-3 bg-[#007bff] hover:bg-[#0056b3] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>১-ক্লিকে ডেমো লগইন করুন</span>
          </button>
        </div>

        <div className="flex items-center gap-3 my-4">
          <div className="h-[1px] bg-slate-200 flex-1" />
          <span className="text-[11px] text-slate-400 font-bold uppercase">অথবা ফর্ম পূরণ করুন</span>
          <div className="h-[1px] bg-slate-200 flex-1" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">পূর্ণ নাম *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: তানজিলা তাসনিম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-bold mb-1">মোবাইল নম্বর *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="tel"
                required
                placeholder="০১XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">পাসওয়ার্ড *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff]"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-slate-700 font-bold mb-1">আপনার টার্গেট ব্যাচ *</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#007bff] bg-white"
              >
                <option value="৪৭তম বিসিএস বুলেট ব্যাচ">৪৭তম বিসিএস বুলেট ব্যাচ</option>
                <option value="প্রাইমারি স্পেশাল গোল্ড ব্যাচ">প্রাইমারি স্পেশাল গোল্ড ব্যাচ</option>
                <option value="১৯তম শিক্ষক নিবন্ধন ব্যাচ">১৯তম শিক্ষক নিবন্ধন ব্যাচ</option>
                <option value="কম্বাইন্ড ব্যাংক অফিসার ব্যাচ">কম্বাইন্ড ব্যাংক অফিসার ব্যাচ</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0056b3] hover:to-[#004085] text-white font-bold rounded-xl shadow-md transition-all text-sm mt-2"
          >
            {mode === 'login' ? 'লগইন করুন' : 'অ্যাকাউন্ট নিশ্চিত করুন'}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="text-center mt-5 text-xs text-slate-600">
          {mode === 'login' ? (
            <p>
              অ্যাকাউন্ট নেই?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#007bff] font-bold hover:underline"
              >
                নতুন অ্যাকাউন্ট তৈরি করুন
              </button>
            </p>
          ) : (
            <p>
              ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#007bff] font-bold hover:underline"
              >
                লগইন করুন
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
