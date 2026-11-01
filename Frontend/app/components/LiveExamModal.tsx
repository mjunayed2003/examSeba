'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  FaRegClock,
  FaCircleExclamation,
  FaCircleQuestion,
  FaCircleCheck,
  FaArrowRight,
  FaArrowLeft,
  FaRotateRight,
  FaAward,
  FaTrophy,
  FaBookOpen,
  FaFlag,
  FaShieldHalved,
  FaChartPie,
  FaDownload,
  FaListCheck,
  FaPlay,
  FaCheck
} from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { Exam } from '../data/examData';
import { useLanguage } from '../context/LanguageContext';

export interface ExamResult {
  examId: string;
  examTitle: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  negativeDeduction: number;
  finalScore: number;
  accuracy: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  answers: Record<number, number>;
  subjectStats?: Record<string, { total: number; correct: number; wrong: number }>;
}

interface LiveExamModalProps {
  exam: Exam | null;
  isOpen: boolean;
  onClose: () => void;
  onViewLeaderboard: () => void;
  onSaveResult?: (result: ExamResult) => void;
}

type ExamStep = 'instructions' | 'running' | 'review' | 'result';

export default function LiveExamModal({
  exam,
  isOpen,
  onClose,
  onViewLeaderboard,
  onSaveResult,
}: LiveExamModalProps) {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  // Step state: instructions -> running -> review -> result
  const [currentStep, setCurrentStep] = useState<ExamStep>('instructions');
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [candidateName, setCandidateName] = useState('মো: সাকিবুল হাসান');

  // Exam runner state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(exam ? exam.durationMinutes * 60 : 0);
  const [result, setResult] = useState<ExamResult | null>(null);

  // Navigator and Solution filters
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'answered' | 'unanswered' | 'flagged'>('all');
  const [solutionFilter, setSolutionFilter] = useState<'all' | 'correct' | 'wrong' | 'skipped'>('all');

  // Reset when exam changes or modal opens
  useEffect(() => {
    if (exam && isOpen) {
      setCurrentStep('instructions');
      setAgreedToRules(false);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setFlaggedQuestions({});
      setTimeLeft(exam.durationMinutes * 60);
      setResult(null);
      setPaletteFilter('all');
      setSolutionFilter('all');

      // Check for logged in user name
      if (typeof window !== 'undefined') {
        try {
          const userRaw = localStorage.getItem('exam_seba_user');
          if (userRaw) {
            const parsed = JSON.parse(userRaw);
            if (parsed.name) setCandidateName(parsed.name);
          }
        } catch {
          // ignore
        }
      }
    }
  }, [exam, isOpen]);

  // Handle final submission calculation
  const handleSubmitExam = useCallback(() => {
    if (!exam) return;

    let correctCount = 0;
    let wrongCount = 0;
    const attemptedCount = Object.keys(selectedAnswers).length;
    const subjectBreakdown: Record<string, { total: number; correct: number; wrong: number }> = {};

    exam.questions.forEach((q) => {
      const subj = q.subject || 'সাধারণ';
      if (!subjectBreakdown[subj]) {
        subjectBreakdown[subj] = { total: 0, correct: 0, wrong: 0 };
      }
      subjectBreakdown[subj].total += 1;

      const userPick = selectedAnswers[q.id];
      if (userPick !== undefined) {
        if (userPick === q.correctAnswer) {
          correctCount++;
          subjectBreakdown[subj].correct += 1;
        } else {
          wrongCount++;
          subjectBreakdown[subj].wrong += 1;
        }
      }
    });

    const negativeDeductions = wrongCount * exam.negativeMark;
    const rawScore = correctCount * 1 - negativeDeductions;
    const finalScore = Math.max(0, Number(rawScore.toFixed(2)));
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const timeSpent = exam.durationMinutes * 60 - timeLeft;

    const calculatedResult: ExamResult = {
      examId: exam.id,
      examTitle: exam.title,
      totalQuestions: exam.totalQuestions,
      attempted: attemptedCount,
      correct: correctCount,
      wrong: wrongCount,
      negativeDeduction: Number(negativeDeductions.toFixed(2)),
      finalScore,
      accuracy,
      isPassed: finalScore >= exam.passMarks,
      timeSpentSeconds: timeSpent,
      answers: selectedAnswers,
      subjectStats: subjectBreakdown,
    };

    setResult(calculatedResult);
    setCurrentStep('result');

    if (onSaveResult) {
      onSaveResult(calculatedResult);
    }
  }, [exam, selectedAnswers, timeLeft, onSaveResult]);

  const handleSubmitExamRef = React.useRef(handleSubmitExam);
  useEffect(() => {
    handleSubmitExamRef.current = handleSubmitExam;
  }, [handleSubmitExam]);

  // Live Timer Countdown only in 'running' step
  useEffect(() => {
    if (!isOpen || !exam || currentStep !== 'running') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExamRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, exam, currentStep]);

  if (!isOpen || !exam) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = exam.questions[currentQuestionIndex] || exam.questions[0];

  const handleSelectOption = (optionIndex: number) => {
    if (currentStep !== 'running') return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleClearOption = () => {
    if (currentStep !== 'running') return;
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleRetake = () => {
    setTimeLeft(exam.durationMinutes * 60);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentQuestionIndex(0);
    setCurrentStep('instructions');
    setAgreedToRules(false);
    setResult(null);
  };

  const optionLettersBangla = isBn ? ['ক', 'খ', 'গ', 'ঘ'] : ['A', 'B', 'C', 'D'];

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalFlagged = Object.keys(flaggedQuestions).filter((k) => flaggedQuestions[Number(k)]).length;
  const totalUnanswered = exam.questions.length - totalAnswered;
  const progressPercent = Math.round((totalAnswered / exam.questions.length) * 100);

  // Questions filtered for palette
  const filteredPaletteQuestions = exam.questions.filter((q) => {
    const isAns = selectedAnswers[q.id] !== undefined;
    const isFlg = flaggedQuestions[q.id];
    if (paletteFilter === 'answered') return isAns;
    if (paletteFilter === 'unanswered') return !isAns;
    if (paletteFilter === 'flagged') return isFlg;
    return true;
  });

  // Filtered solution questions
  const filteredSolutionQuestions = exam.questions.filter((q) => {
    if (!result) return true;
    const userPick = result.answers[q.id];
    const isCorrect = userPick === q.correctAnswer;
    const isSkipped = userPick === undefined;
    if (solutionFilter === 'correct') return isCorrect;
    if (solutionFilter === 'wrong') return !isCorrect && !isSkipped;
    if (solutionFilter === 'skipped') return isSkipped;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200">

        {/* Global Exam Header */}
        <div className="bg-gradient-to-r from-[#007bff] via-[#0062cc] to-[#0056b3] text-white px-5 sm:px-7 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3 truncate">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center font-bold shadow-inner">
              <FaAward className="w-5 h-5 text-amber-300" />
            </div>
            <div className="truncate">
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight truncate leading-tight">
                {exam.title}
              </h3>
              <p className="text-xs text-blue-100 flex items-center gap-2 mt-0.5">
                <span className="font-semibold">{exam.batchName}</span>
                <span>•</span>
                <span>নেগেটিভ মার্কিং: {exam.negativeMark}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Clock (when running or review) */}
            {(currentStep === 'running' || currentStep === 'review') && (
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border shadow-inner transition-colors ${
                  timeLeft < 180
                    ? 'bg-rose-500/30 border-rose-300 text-white animate-pulse'
                    : timeLeft < 300
                    ? 'bg-amber-500/30 border-amber-300 text-amber-100'
                    : 'bg-white/15 border-white/30 text-white'
                }`}
              >
                <FaRegClock className="w-4 h-4 text-amber-300" />
                <span className="font-mono tracking-wider">{formatTime(timeLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-all"
              title="বন্ধ করুন"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Multi-Step Wizard Indicator */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-7 py-2.5">
          <div className="flex items-center justify-between max-w-3xl mx-auto text-xs font-bold">
            
            {/* Step 1: Instructions */}
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                  currentStep === 'instructions'
                    ? 'bg-[#007bff] text-white ring-4 ring-blue-100'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                {currentStep === 'instructions' ? '১' : '✓'}
              </div>
              <span className={currentStep === 'instructions' ? 'text-[#0056b3]' : 'text-slate-600'}>
                নির্দেশনা ও প্রস্তুতি
              </span>
            </div>

            <div className="h-0.5 flex-1 mx-2 sm:mx-4 bg-slate-300" />

            {/* Step 2: Live Exam */}
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                  currentStep === 'running'
                    ? 'bg-[#007bff] text-white ring-4 ring-blue-100'
                    : currentStep === 'instructions'
                    ? 'bg-slate-300 text-slate-600'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                {currentStep === 'review' || currentStep === 'result' ? '✓' : '২'}
              </div>
              <span className={currentStep === 'running' ? 'text-[#0056b3]' : 'text-slate-600'}>
                লাইভ পরীক্ষা
              </span>
            </div>

            <div className="h-0.5 flex-1 mx-2 sm:mx-4 bg-slate-300" />

            {/* Step 3: Review */}
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                  currentStep === 'review'
                    ? 'bg-[#007bff] text-white ring-4 ring-blue-100'
                    : currentStep === 'result'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 text-slate-600'
                }`}
              >
                {currentStep === 'result' ? '✓' : '৩'}
              </div>
              <span className={currentStep === 'review' ? 'text-[#0056b3]' : 'text-slate-600'}>
                পর্যবেক্ষণ ও সাবমিট
              </span>
            </div>

            <div className="h-0.5 flex-1 mx-2 sm:mx-4 bg-slate-300" />

            {/* Step 4: Result */}
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                  currentStep === 'result'
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                    : 'bg-slate-300 text-slate-600'
                }`}
              >
                ৪
              </div>
              <span className={currentStep === 'result' ? 'text-emerald-700' : 'text-slate-500'}>
                ফলাফল ও সমাধান
              </span>
            </div>

          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f8f9fa]">

          {/* ======================================================== */}
          {/* STEP 1: EXAM INSTRUCTIONS & READINESS                    */}
          {/* ======================================================== */}
          {currentStep === 'instructions' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Exam Info Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-blue-50 text-[#007bff] border border-blue-200">
                    ধাপ ০১: পরীক্ষা নির্দেশনা ও প্রস্তুতি
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {exam.batchName}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
                  {exam.title}
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  পরীক্ষাটি শুরু করার পূর্বে নিচের সকল তথ্য ও নির্দেশনা মনোযোগ সহকারে পাঠ করুন।
                </p>

                {/* Grid Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 block mb-1">মোট প্রশ্ন</span>
                    <span className="text-2xl font-black text-[#007bff]">{exam.totalQuestions}</span>
                    <span className="text-[11px] text-slate-500 block">টি নৈর্ব্যক্তিক</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 block mb-1">সময়সীমা</span>
                    <span className="text-2xl font-black text-slate-800">{exam.durationMinutes}</span>
                    <span className="text-[11px] text-slate-500 block">মিনিট</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 block mb-1">পূর্ণমান</span>
                    <span className="text-2xl font-black text-emerald-600">{exam.totalMarks || exam.totalQuestions}</span>
                    <span className="text-[11px] text-slate-500 block">প্রতিটি ১ নম্বর</span>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-center">
                    <span className="text-xs text-rose-600 block mb-1">নেগেটিভ মার্কিং</span>
                    <span className="text-2xl font-black text-rose-600">-{exam.negativeMark}</span>
                    <span className="text-[11px] text-rose-500 block">প্রতি ভুলে কর্তন</span>
                  </div>
                </div>

                {/* Important Rules Checklist */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 mb-6">
                  <h4 className="font-bold text-sm text-amber-900 mb-3 flex items-center gap-2">
                    <FaShieldHalved className="w-4 h-4 text-amber-600" />
                    <span>পরীক্ষা সংক্রান্ত জরুরি নিয়মাবলী:</span>
                  </h4>
                  <ul className="text-xs sm:text-sm text-amber-900/90 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>প্রতিটি প্রশ্নের জন্য ৪টি অপশন থাকবে এবং যেকোনো ১টি সঠিক উত্তর নির্বাচন করতে হবে।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>প্রতিটি সঠিক উত্তরের জন্য <strong>+১.০০</strong> নম্বর পাবেন এবং প্রতিটি ভুল উত্তরের জন্য <strong>-{exam.negativeMark}</strong> নম্বর কাটা যাবে।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>কোনো প্রশ্নের উত্তর সন্দেহজনক মনে হলে <strong>'রিভিউ এর জন্য চিহ্নিত করুন'</strong> বাটন ব্যবহার করতে পারেন।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>সময়সীমা শেষ হলে পরীক্ষাটি <strong>স্বয়ংক্রিয়ভাবে সাবমিট</strong> হয়ে যাবে। ব্রাউজার রিলোড বা বন্ধ না করার পরামর্শ রইল।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>পরীক্ষা শেষ করার পর পুঙ্খানুপুঙ্খ ব্যাখ্যাসহ <strong>সমাধান শিট</strong> এবং <strong>মেধা তালিকা</strong> দেখতে পাবেন।</span>
                    </li>
                  </ul>
                </div>

                {/* Candidate Information & Confirmation */}
                <div className="border-t border-slate-200 pt-5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <span className="text-xs text-slate-500 block">পরীক্ষার্থীর নাম:</span>
                      <strong className="text-sm text-slate-800">{candidateName}</strong>
                    </div>
                    <div className="text-xs text-slate-500">
                      পাস মার্ক: <strong className="text-emerald-600 text-sm">{exam.passMarks}</strong> নম্বর
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={agreedToRules}
                      onChange={(e) => setAgreedToRules(e.target.checked)}
                      className="w-4 h-4 text-[#007bff] rounded focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      আমি সকল নিয়মাবলী পাঠ করেছি এবং সময়মতো সততার সাথে পরীক্ষা প্রদানে সম্মত।
                    </span>
                  </label>
                </div>

                {/* Action Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    disabled={!agreedToRules}
                    onClick={() => setCurrentStep('running')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0062cc] hover:to-[#004085] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
                  >
                    <FaPlay className="w-4 h-4" />
                    <span>পরীক্ষা শুরু করুন (Start Live Exam)</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: LIVE EXAMINATION RUNNER                          */}
          {/* ======================================================== */}
          {currentStep === 'running' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Current Question Card */}
              <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 min-h-[460px]">
                <div>
                  
                  {/* Top Question Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#007bff] text-xs font-bold border border-blue-200">
                        বিষয়: {currentQ.subject}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        মান: +১.০০ / -{exam.negativeMark}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleToggleFlag}
                        className={`text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 border transition-all ${
                          flaggedQuestions[currentQ.id]
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-sm'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <FaFlag className={`w-3 h-3 ${flaggedQuestions[currentQ.id] ? 'text-amber-600' : 'text-slate-400'}`} />
                        <span>{flaggedQuestions[currentQ.id] ? 'রিভিউ মার্ক করা' : 'রিভিউ রাখুন'}</span>
                      </button>
                      <span className="text-xs text-slate-600 font-bold bg-slate-100 px-2.5 py-1 rounded-lg">
                        প্রশ্ন {currentQuestionIndex + 1} / {exam.questions.length}
                      </span>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="mb-6">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                      <span className="text-[#007bff] font-extrabold mr-1.5">{currentQuestionIndex + 1}.</span>
                      {currentQ.question}
                    </h4>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {currentQ.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentQ.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(oIdx)}
                          className={`w-full text-left p-4 rounded-2xl border flex items-center gap-4 transition-all text-sm font-medium ${
                            isSelected
                              ? 'bg-blue-50/90 border-[#007bff] text-[#0056b3] ring-2 ring-[#007bff]/20 font-semibold shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-[#007bff] text-white shadow-md'
                                : 'bg-white border border-slate-300 text-slate-600'
                            }`}
                          >
                            {optionLettersBangla[oIdx]}
                          </div>
                          <span className="flex-1 leading-snug">{opt}</span>
                          {isSelected && <FaCircleCheck className="w-5 h-5 text-[#007bff]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Navigation Toolbar */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={handleClearOption}
                    disabled={selectedAnswers[currentQ.id] === undefined}
                    className="text-xs text-slate-500 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-500 font-semibold transition-colors"
                  >
                    উত্তর সাফ করুন (Clear)
                  </button>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1.5 transition-colors"
                    >
                      <FaArrowLeft className="w-3 h-3" />
                      <span>পূর্ববর্তী</span>
                    </button>

                    {currentQuestionIndex < exam.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                        className="px-5 py-2 rounded-xl bg-[#007bff] hover:bg-[#0056b3] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-transform active:scale-95"
                      >
                        <span>পরবর্তী প্রশ্ন</span>
                        <FaArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentStep('review')}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform active:scale-95 animate-pulse"
                      >
                        <FaListCheck className="w-3.5 h-3.5" />
                        <span>পর্যবেক্ষণ ও সাবমিট</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Question Navigator Palette */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-extrabold text-sm text-slate-800">
                      প্রশ্ন প্যালেট (Navigator)
                    </h5>
                    <span className="text-xs text-[#007bff] font-bold">
                      উত্তর: {totalAnswered} / {exam.questions.length} ({progressPercent}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                    <div
                      className="bg-gradient-to-r from-[#007bff] to-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Filter tabs */}
                  <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl mb-4 text-[11px] font-bold text-center">
                    <button
                      onClick={() => setPaletteFilter('all')}
                      className={`py-1 rounded-lg transition-colors ${paletteFilter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                    >
                      সকল ({exam.questions.length})
                    </button>
                    <button
                      onClick={() => setPaletteFilter('answered')}
                      className={`py-1 rounded-lg transition-colors ${paletteFilter === 'answered' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
                    >
                      উত্তর ({totalAnswered})
                    </button>
                    <button
                      onClick={() => setPaletteFilter('unanswered')}
                      className={`py-1 rounded-lg transition-colors ${paletteFilter === 'unanswered' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500'}`}
                    >
                      বাকি ({totalUnanswered})
                    </button>
                    <button
                      onClick={() => setPaletteFilter('flagged')}
                      className={`py-1 rounded-lg transition-colors ${paletteFilter === 'flagged' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500'}`}
                    >
                      রিভিউ ({totalFlagged})
                    </button>
                  </div>

                  {/* Indicators Legend */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
                      <span className="text-slate-600">উত্তর দেওয়া হয়েছে</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
                      <span className="text-slate-600">রিভিউ মার্ক করা</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <span className="text-slate-600">দেখা হয়নি / খালি</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full border-2 border-[#007bff]" />
                      <span className="text-slate-600">বর্তমান প্রশ্ন</span>
                    </div>
                  </div>

                  {/* Question Grid Buttons */}
                  <div className="grid grid-cols-5 gap-2 max-h-[260px] overflow-y-auto p-1">
                    {exam.questions.map((q, qIndex) => {
                      const isAnswered = selectedAnswers[q.id] !== undefined;
                      const isFlagged = flaggedQuestions[q.id];
                      const isCurrent = currentQuestionIndex === qIndex;

                      // Check filter
                      if (paletteFilter === 'answered' && !isAnswered) return null;
                      if (paletteFilter === 'unanswered' && isAnswered) return null;
                      if (paletteFilter === 'flagged' && !isFlagged) return null;

                      let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                      if (isAnswered) bgClass = 'bg-emerald-500 text-white font-bold hover:bg-emerald-600 shadow-sm';
                      if (isFlagged) bgClass = 'bg-amber-400 text-slate-900 font-bold hover:bg-amber-500 shadow-sm';

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(qIndex)}
                          className={`h-9 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center ${bgClass} ${
                            isCurrent ? 'ring-2 ring-[#007bff] ring-offset-2 scale-105 z-10' : ''
                          }`}
                        >
                          {qIndex + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Final Review & Submit Button */}
                <div className="pt-5 mt-5 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep('review')}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <FaListCheck className="w-4 h-4" />
                    <span>পর্যবেক্ষণ ও সাবমিট (Step 3)</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: REVIEW & FINAL CONFIRMATION STEP                 */}
          {/* ======================================================== */}
          {currentStep === 'review' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
                    <FaCircleExclamation className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-1">
                    ধাপ ০৩: চূড়ান্ত সাবমিট পূর্ববর্তী পর্যবেক্ষণ
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    ফলাফল গণনার পূর্বে আপনার উত্তরসমূহ এক নজরে যাচাই করে নিন।
                  </p>
                </div>

                {/* Status Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 block mb-1">মোট প্রশ্ন</span>
                    <span className="text-2xl font-black text-slate-800">{exam.questions.length}</span>
                    <span className="text-[11px] text-slate-500 block">টি প্রশ্ন</span>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
                    <span className="text-xs text-emerald-700 block mb-1">উত্তর দেওয়া হয়েছে</span>
                    <span className="text-2xl font-black text-emerald-600">{totalAnswered}</span>
                    <span className="text-[11px] text-emerald-600 block">টি সম্পন্ন</span>
                  </div>

                  <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-center">
                    <span className="text-xs text-rose-700 block mb-1">উত্তর দেননি (খালি)</span>
                    <span className="text-2xl font-black text-rose-600">{totalUnanswered}</span>
                    <span className="text-[11px] text-rose-600 block">টি বাকি</span>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
                    <span className="text-xs text-amber-800 block mb-1">রিভিউ মার্ক করা</span>
                    <span className="text-2xl font-black text-amber-600">{totalFlagged}</span>
                    <span className="text-[11px] text-amber-700 block">টি প্রশ্ন</span>
                  </div>
                </div>

                {/* Warning if unanswered */}
                {totalUnanswered > 0 && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm p-4 rounded-2xl mb-6 flex items-start gap-3">
                    <FaCircleExclamation className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>সতর্কতা:</strong> আপনার এখনও <strong>{totalUnanswered}টি</strong> প্রশ্নের উত্তর দেওয়া বাকি রয়েছে। আপনি চাইলে যেকোনো প্রশ্নে ক্লিক করে সরাসরি উত্তর দিতে পারেন।
                    </div>
                  </div>
                )}

                {/* Quick Review Grid */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
                  <h5 className="font-bold text-xs sm:text-sm text-slate-700 mb-3 flex items-center justify-between">
                    <span>প্রশ্নের অবস্থা ও দ্রুত পরিবর্তন (ক্লিক করে এডিট করুন):</span>
                    <span className="text-xs text-blue-600 font-semibold">অবশিষ্ট সময়: {formatTime(timeLeft)}</span>
                  </h5>

                  <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                    {exam.questions.map((q, qIndex) => {
                      const isAnswered = selectedAnswers[q.id] !== undefined;
                      const isFlagged = flaggedQuestions[q.id];

                      let bgClass = 'bg-white text-slate-700 border-slate-300 hover:border-blue-400';
                      if (isAnswered) bgClass = 'bg-emerald-500 text-white font-bold border-emerald-600';
                      if (isFlagged) bgClass = 'bg-amber-400 text-slate-900 font-bold border-amber-500';

                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            setCurrentQuestionIndex(qIndex);
                            setCurrentStep('running');
                          }}
                          title={`প্রশ্ন নং ${qIndex + 1} পরিবর্তন করতে ক্লিক করুন`}
                          className={`h-9 rounded-xl text-xs font-semibold border flex items-center justify-center transition-transform hover:scale-110 ${bgClass}`}
                        >
                          {qIndex + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Two Main Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setCurrentStep('running')}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaArrowLeft className="w-3.5 h-3.5" />
                    <span>পরীক্ষায় ফিরে যান (Go Back to Exam)</span>
                  </button>

                  <button
                    onClick={handleSubmitExam}
                    className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-transform hover:scale-[1.02]"
                  >
                    <FaCheck className="w-4 h-4" />
                    <span>চূড়ান্তভাবে ফলাফল জমা দিন (Confirm Submit)</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 4: RESULTS, IN-DEPTH ANALYTICS & SOLUTIONS          */}
          {/* ======================================================== */}
          {currentStep === 'result' && result && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Result Summary Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#007bff] via-emerald-500 to-[#0056b3]" />

                <div className="w-16 h-16 rounded-3xl mx-auto mb-3 flex items-center justify-center bg-blue-50 text-[#007bff] shadow-inner border border-blue-100">
                  <FaTrophy className="w-8 h-8 text-amber-500 animate-bounce" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase mb-2 bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span>ধাপ ০৪: পূর্ণাঙ্গ ফলাফল ও বিশ্লেষণ</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1">
                  {result.isPassed ? 'অভিনন্দন! আপনি উত্তীর্ণ হয়েছেন 🎉' : 'পরীক্ষা সম্পন্ন হয়েছে (উন্নতির সুযোগ আছে)'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  {result.examTitle} • পাস মার্ক: <strong>{exam.passMarks}</strong> • সময় লেগেছে: <strong>{formatTime(result.timeSpentSeconds)}</strong>
                </p>

                {/* Score Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
                  <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 text-center">
                    <span className="text-xs text-slate-600 font-semibold block mb-1">প্রাপ্ত নম্বর (Score)</span>
                    <span className="text-3xl font-black text-[#007bff]">{result.finalScore}</span>
                    <span className="text-[11px] text-slate-500 block"> / {result.totalQuestions} পূর্ণমান</span>
                  </div>

                  <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-center">
                    <span className="text-xs text-emerald-800 font-semibold block mb-1">সঠিক উত্তর</span>
                    <span className="text-3xl font-black text-emerald-600">{result.correct}</span>
                    <span className="text-[11px] text-emerald-700 block">টি সঠিক (+{result.correct})</span>
                  </div>

                  <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-200 text-center">
                    <span className="text-xs text-rose-800 font-semibold block mb-1">ভুল উত্তর</span>
                    <span className="text-3xl font-black text-rose-600">{result.wrong}</span>
                    <span className="text-[11px] text-rose-700 block">নেগেটিভ: -{result.negativeDeduction}</span>
                  </div>

                  <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-200 text-center">
                    <span className="text-xs text-purple-800 font-semibold block mb-1">নির্ভুলতার হার</span>
                    <span className="text-3xl font-black text-purple-600">{result.accuracy}%</span>
                    <span className="text-[11px] text-purple-700 block">সঠিকতার শতকরা হার</span>
                  </div>
                </div>

                {/* Subject-Wise Performance Breakdown */}
                {result.subjectStats && Object.keys(result.subjectStats).length > 0 && (
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6 text-left">
                    <h5 className="font-extrabold text-xs sm:text-sm text-slate-800 mb-3 flex items-center gap-2">
                      <FaChartPie className="w-4 h-4 text-[#007bff]" />
                      <span>বিষয়ভিত্তিক পারফরম্যান্স অ্যানালাইসিস (Subject Analysis):</span>
                    </h5>

                    <div className="space-y-3">
                      {Object.entries(result.subjectStats).map(([subj, stats]) => {
                        const subjPct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                        return (
                          <div key={subj}>
                            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                              <span>{subj}</span>
                              <span className="text-slate-500">
                                {stats.correct} / {stats.total} সঠিক ({subjPct}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  subjPct >= 75 ? 'bg-emerald-500' : subjPct >= 50 ? 'bg-blue-500' : 'bg-rose-500'
                                }`}
                                style={{ width: `${subjPct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={handleRetake}
                    className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                  >
                    <FaRotateRight className="w-3.5 h-3.5" />
                    <span>আবার পরীক্ষা দিন (Retake)</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onViewLeaderboard();
                    }}
                    className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-transform hover:scale-105"
                  >
                    <FaTrophy className="w-4 h-4 text-slate-900" />
                    <span>মেধা তালিকা দেখুন (Leaderboard)</span>
                  </button>
                </div>

              </div>

              {/* Detailed Question Solution Sheet */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-6">
                  <div>
                    <h4 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                      <FaBookOpen className="w-5 h-5 text-[#007bff]" />
                      <span>বিস্তারিত প্রশ্ন সমাধান ও পুঙ্খানুপুঙ্খ ব্যাখ্যা</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      মোট {exam.questions.length}টি প্রশ্নের সঠিক উত্তর ও নোট
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
                    <button
                      onClick={() => setSolutionFilter('all')}
                      className={`px-3 py-1 rounded-xl transition-colors ${solutionFilter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                    >
                      সকল ({exam.questions.length})
                    </button>
                    <button
                      onClick={() => setSolutionFilter('correct')}
                      className={`px-3 py-1 rounded-xl transition-colors ${solutionFilter === 'correct' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
                    >
                      সঠিক ({result.correct})
                    </button>
                    <button
                      onClick={() => setSolutionFilter('wrong')}
                      className={`px-3 py-1 rounded-xl transition-colors ${solutionFilter === 'wrong' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-500'}`}
                    >
                      ভুল ({result.wrong})
                    </button>
                    <button
                      onClick={() => setSolutionFilter('skipped')}
                      className={`px-3 py-1 rounded-xl transition-colors ${solutionFilter === 'skipped' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500'}`}
                    >
                      বাদ পড়া ({exam.questions.length - result.attempted})
                    </button>
                  </div>
                </div>

                {/* Solution Question Cards */}
                <div className="space-y-5">
                  {filteredSolutionQuestions.map((q, idx) => {
                    const userPick = result.answers[q.id];
                    const isCorrect = userPick === q.correctAnswer;
                    const isSkipped = userPick === undefined;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          isCorrect
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : isSkipped
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-rose-50/40 border-rose-200'
                        }`}
                      >
                        {/* Header Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-500">
                            প্রশ্ন নং: {idx + 1} • বিষয়: {q.subject}
                          </span>
                          <span
                            className={`text-xs px-3 py-0.5 rounded-full font-extrabold ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : isSkipped
                                ? 'bg-slate-200 text-slate-700 border border-slate-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}
                          >
                            {isCorrect ? '✓ সঠিক উত্তর' : isSkipped ? '— উত্তর দেননি' : '✗ ভুল উত্তর'}
                          </span>
                        </div>

                        {/* Question Text */}
                        <h5 className="font-bold text-slate-900 mb-4 text-sm sm:text-base leading-relaxed">
                          {idx + 1}. {q.question}
                        </h5>

                        {/* Options status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                          {q.options.map((opt, oIdx) => {
                            const isThisCorrect = q.correctAnswer === oIdx;
                            const isThisSelected = userPick === oIdx;

                            let optClass = 'bg-white border-slate-200 text-slate-700';
                            if (isThisCorrect) {
                              optClass = 'bg-emerald-100/90 border-emerald-400 text-emerald-950 font-bold';
                            } else if (isThisSelected && !isThisCorrect) {
                              optClass = 'bg-rose-100/90 border-rose-400 text-rose-950 font-bold line-through';
                            }

                            return (
                              <div
                                key={oIdx}
                                className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-2.5 ${optClass}`}
                              >
                                <span className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center font-bold text-xs shrink-0">
                                  {optionLettersBangla[oIdx]}
                                </span>
                                <span className="flex-1">{opt}</span>
                                {isThisCorrect && <span className="text-[11px] text-emerald-700 font-extrabold">(সঠিক)</span>}
                                {isThisSelected && !isThisCorrect && <span className="text-[11px] text-rose-700 font-extrabold">(আপনার ভুল উত্তর)</span>}
                              </div>
                            );
                          })}
                        </div>

                        {/* Detailed Explanation */}
                        <div className="bg-white/90 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
                          <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5 text-[#007bff]">
                            <FaCircleQuestion className="w-4 h-4 text-[#007bff]" />
                            <span>বিশদ ব্যাখ্যা ও রেফারেন্স নোট:</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
