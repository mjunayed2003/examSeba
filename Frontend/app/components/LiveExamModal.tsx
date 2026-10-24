'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  FaRegClock,
  FaCircleExclamation,
  FaCircleQuestion,
  FaArrowRight,
  FaArrowLeft,
  FaRotateRight,
  FaAward,
  FaTrophy,
  FaBookOpen,
  FaFlag
} from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { Exam } from '../data/examData';

interface LiveExamModalProps {
  exam: Exam | null;
  isOpen: boolean;
  onClose: () => void;
  onViewLeaderboard: () => void;
  onSaveResult?: (result: ExamResult) => void;
}

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
}

export default function LiveExamModal({
  exam,
  isOpen,
  onClose,
  onViewLeaderboard,
  onSaveResult,
}: LiveExamModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(exam ? exam.durationMinutes * 60 : 0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);

  const handleSubmitExam = useCallback(() => {
    if (!exam) return;
    setShowConfirmSubmit(false);
    setIsSubmitted(true);

    let correctCount = 0;
    let wrongCount = 0;
    const attemptedCount = Object.keys(selectedAnswers).length;

    exam.questions.forEach((q) => {
      const userPick = selectedAnswers[q.id];
      if (userPick !== undefined) {
        if (userPick === q.correctAnswer) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const negativeDeductions = wrongCount * exam.negativeMark;
    const finalScore = Math.max(0, correctCount * 1 - negativeDeductions);
    const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;
    const timeSpent = exam.durationMinutes * 60 - timeLeft;

    const calculatedResult: ExamResult = {
      examId: exam.id,
      examTitle: exam.title,
      totalQuestions: exam.totalQuestions,
      attempted: attemptedCount,
      correct: correctCount,
      wrong: wrongCount,
      negativeDeduction: Number(negativeDeductions.toFixed(2)),
      finalScore: Number(finalScore.toFixed(2)),
      accuracy: Math.round(accuracy),
      isPassed: finalScore >= exam.passMarks,
      timeSpentSeconds: timeSpent,
      answers: selectedAnswers,
    };

    setResult(calculatedResult);
    if (onSaveResult) {
      onSaveResult(calculatedResult);
    }
  }, [exam, selectedAnswers, timeLeft, onSaveResult]);

  const handleSubmitExamRef = React.useRef(handleSubmitExam);
  useEffect(() => {
    handleSubmitExamRef.current = handleSubmitExam;
  }, [handleSubmitExam]);

  // Live Timer Countdown
  useEffect(() => {
    if (!isOpen || !exam || isSubmitted) return;

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
  }, [isOpen, exam, isSubmitted]);

  if (!isOpen || !exam) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = exam.questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleClearOption = () => {
    if (isSubmitted) return;
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
    setIsSubmitted(false);
    setResult(null);
  };

  const optionLettersBangla = ['ক', 'খ', 'গ', 'ঘ'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3 truncate">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold">
              <FaAward className="w-4 h-4 text-amber-300" />
            </div>
            <div className="truncate">
              <h3 className="font-bold text-sm sm:text-base truncate leading-tight">
                {exam.title}
              </h3>
              <p className="text-xs text-blue-100 flex items-center gap-2 mt-0.5">
                <span>{exam.batchName}</span>
                <span>•</span>
                <span>নেগেটিভ মার্কিং: {exam.negativeMark}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold border ${
                  timeLeft < 120
                    ? 'bg-red-500/30 border-red-300 text-red-100 animate-pulse'
                    : 'bg-white/15 border-white/30 text-white'
                }`}
              >
                <FaRegClock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {!isSubmitted ? (
            /* ACTIVE EXAM RUNNER */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Current Question */}
              <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-slate-200 min-h-[420px]">
                <div>
                  
                  {/* Subject Tag & Question Number */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#007bff] text-xs font-bold border border-blue-200">
                      বিষয়: {currentQ.subject}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleToggleFlag}
                        className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 border transition-colors ${
                          flaggedQuestions[currentQ.id]
                            ? 'bg-amber-100 text-amber-800 border-amber-300 font-bold'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <FaFlag className="w-3 h-3" />
                        <span>{flaggedQuestions[currentQ.id] ? 'রিভিউ মার্কড' : 'রিভিউ করুন'}</span>
                      </button>
                      <span className="text-xs text-slate-500 font-bold">
                        প্রশ্ন {currentQuestionIndex + 1} / {exam.questions.length}
                      </span>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-6 leading-relaxed">
                    {currentQuestionIndex + 1}. {currentQ.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQ.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentQ.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(oIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3.5 transition-all text-sm font-medium ${
                            isSelected
                              ? 'bg-blue-50 border-[#007bff] text-[#0056b3] ring-2 ring-[#007bff]/20 font-semibold'
                              : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              isSelected
                                ? 'bg-[#007bff] text-white'
                                : 'bg-white border border-slate-300 text-slate-600'
                            }`}
                          >
                            {optionLettersBangla[oIdx]}
                          </div>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question Bottom Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={handleClearOption}
                    disabled={selectedAnswers[currentQ.id] === undefined}
                    className="text-xs text-slate-500 hover:text-red-600 disabled:opacity-30 disabled:hover:text-slate-500 font-medium"
                  >
                    উত্তর মুছুন (Clear)
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1"
                    >
                      <FaArrowLeft className="w-3 h-3" />
                      <span>পূর্ববর্তী</span>
                    </button>

                    {currentQuestionIndex < exam.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                        className="px-4 py-1.5 rounded-lg bg-[#007bff] hover:bg-[#0056b3] text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                      >
                        <span>পরবর্তী</span>
                        <FaArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowConfirmSubmit(true)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm animate-bounce"
                      >
                        পরীক্ষা সমাপ্ত করুন
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Question Navigator Palette */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-sm text-slate-800 mb-3 flex items-center justify-between">
                    <span>প্রশ্ন প্যালেট (Navigator)</span>
                    <span className="text-xs text-blue-600 font-semibold">
                      উত্তর: {Object.keys(selectedAnswers).length}/{exam.questions.length}
                    </span>
                  </h5>

                  {/* Indicator Legends */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-slate-600">উত্তর দেওয়া হয়েছে</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
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
                  <div className="grid grid-cols-5 gap-2">
                    {exam.questions.map((q, qIndex) => {
                      const isAnswered = selectedAnswers[q.id] !== undefined;
                      const isFlagged = flaggedQuestions[q.id];
                      const isCurrent = currentQuestionIndex === qIndex;

                      let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                      if (isAnswered) bgClass = 'bg-emerald-500 text-white font-bold hover:bg-emerald-600';
                      if (isFlagged) bgClass = 'bg-amber-400 text-slate-900 font-bold hover:bg-amber-500';

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(qIndex)}
                          className={`h-9 rounded-xl text-xs font-semibold transition-all relative flex items-center justify-center ${bgClass} ${
                            isCurrent ? 'ring-2 ring-[#007bff] ring-offset-2 scale-105' : ''
                          }`}
                        >
                          {qIndex + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Final Submit Trigger */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-transform hover:scale-[1.02]"
                  >
                    সব প্রশ্ন জমা দিন (Submit Exam)
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* RESULT & DETAILED SOLUTION SHEET */
            result && (
              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Result Summary Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 text-center relative overflow-hidden">
                  
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-blue-50 text-[#007bff] shadow-inner">
                    <FaTrophy className="w-8 h-8 text-amber-500" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-800 mb-1">
                    {result.isPassed ? 'অভিনন্দন! আপনি উত্তীর্ণ হয়েছেন' : 'পরীক্ষা সম্পন্ন হয়েছে'}
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    {result.examTitle} • পাস মার্ক: {exam.passMarks}
                  </p>

                  {/* Score Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100">
                      <span className="text-xs text-slate-600 block">প্রাপ্ত নম্বর</span>
                      <span className="text-2xl font-black text-[#007bff]">{result.finalScore}</span>
                      <span className="text-[11px] text-slate-500"> / {result.totalQuestions}</span>
                    </div>
                    <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
                      <span className="text-xs text-slate-600 block">সঠিক উত্তর</span>
                      <span className="text-2xl font-black text-emerald-600">{result.correct}</span>
                      <span className="text-[11px] text-slate-500"> টি প্রশ্ন</span>
                    </div>
                    <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-100">
                      <span className="text-xs text-slate-600 block">ভুল উত্তর</span>
                      <span className="text-2xl font-black text-rose-600">{result.wrong}</span>
                      <span className="text-[11px] text-slate-500"> (-{result.negativeDeduction})</span>
                    </div>
                    <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-100">
                      <span className="text-xs text-slate-600 block">নির্ভুলতার হার</span>
                      <span className="text-2xl font-black text-purple-600">{result.accuracy}%</span>
                      <span className="text-[11px] text-slate-500"> এক্যুরেসি</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={handleRetake}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                    >
                      <FaRotateRight className="w-3.5 h-3.5" />
                      <span>পুনরায় পরীক্ষা দিন</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onViewLeaderboard();
                      }}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
                    >
                      <FaTrophy className="w-3.5 h-3.5 text-slate-900" />
                      <span>মেধা তালিকা (Leaderboard) দেখুন</span>
                    </button>
                  </div>
                </div>

                {/* Tabs: Summary vs Solution */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <h4 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                      <FaBookOpen className="w-4 h-4 text-[#007bff]" />
                      <span>বিস্তারিত প্রশ্ন সমাধান ও ব্যাখ্যা</span>
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      মোট {exam.questions.length} টি প্রশ্নের পুঙ্খানুপুঙ্খ ব্যাখ্যা
                    </span>
                  </div>

                  {/* Question-by-Question Solution List */}
                  <div className="space-y-6">
                    {exam.questions.map((q, idx) => {
                      const userPick = result.answers[q.id];
                      const isCorrect = userPick === q.correctAnswer;
                      const isSkipped = userPick === undefined;

                      return (
                        <div
                          key={q.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            isCorrect
                              ? 'bg-emerald-50/30 border-emerald-200'
                              : isSkipped
                              ? 'bg-slate-50 border-slate-200'
                              : 'bg-rose-50/30 border-rose-200'
                          }`}
                        >
                          {/* Question header badge */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-slate-500">
                              প্রশ্ন নং: {idx + 1} • {q.subject}
                            </span>
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                                isCorrect
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isSkipped
                                  ? 'bg-slate-200 text-slate-700'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {isCorrect ? '✓ সঠিক' : isSkipped ? '— উত্তর দেননি' : '✗ ভুল উত্তর'}
                            </span>
                          </div>

                          <h5 className="font-bold text-slate-800 mb-4 text-sm sm:text-base">
                            {idx + 1}. {q.question}
                          </h5>

                          {/* Options status */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                            {q.options.map((opt, oIdx) => {
                              const isThisCorrect = q.correctAnswer === oIdx;
                              const isThisSelected = userPick === oIdx;

                              let optClass = 'bg-white border-slate-200 text-slate-700';
                              if (isThisCorrect) {
                                optClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                              } else if (isThisSelected && !isThisCorrect) {
                                optClass = 'bg-rose-100 border-rose-400 text-rose-900 font-bold line-through';
                              }

                              return (
                                <div
                                  key={oIdx}
                                  className={`p-2.5 rounded-xl border text-xs sm:text-sm flex items-center gap-2 ${optClass}`}
                                >
                                  <span className="w-5 h-5 rounded-full bg-white/70 flex items-center justify-center font-bold text-xs">
                                    {optionLettersBangla[oIdx]}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Detailed Explanation */}
                          <div className="bg-white/80 p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm">
                            <div className="font-bold text-slate-700 mb-1 flex items-center gap-1.5 text-blue-600">
                              <FaCircleQuestion className="w-3.5 h-3.5" />
                              <span>ব্যাখ্যা ও রেফারেন্স:</span>
                            </div>
                            <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )
          )}
        </div>

        {/* Confirmation Modal overlay */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center border border-slate-100 animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <FaCircleExclamation className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">
                আপনি কি পরীক্ষা সমাপ্ত করতে চান?
              </h4>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                আপনি <strong>{Object.keys(selectedAnswers).length}</strong> টি প্রশ্নের উত্তর দিয়েছেন। এখনো{' '}
                <strong>{exam.questions.length - Object.keys(selectedAnswers).length}</strong> টি প্রশ্ন বাকি রয়েছে।
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100"
                >
                  পরীক্ষা চালিয়ে যান
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md"
                >
                  হ্যাঁ, নিশ্চিত জমা দিন
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
