'use client';

import React, { useState, useSyncExternalStore, useMemo } from 'react';
import Link from 'next/link';
import {
  FaChartPie,
  FaFileAlt,
  FaBookOpen,
  FaUsers,
  FaBullhorn,
  FaCog,
  FaPlus,
  FaTrash,
  FaSignOutAlt,
  FaArrowLeft,
  FaSearch,
  FaUserShield,
  FaLock,
  FaTimes,
  FaFire,
  FaDownload,
  FaChartLine,
  FaTrophy,
  FaAward,
  FaEdit,
  FaCheckCircle,
  FaBan,
  FaEye,
  FaUserPlus,
  FaGraduationCap,
  FaCheck,
  FaCopy,
  FaKey,
} from 'react-icons/fa';
import { HiBars3 } from 'react-icons/hi2';
import ExamSebaLogo from '../components/ExamSebaLogo';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_EXAMS, Exam } from '../data/examData';

// Data Interfaces
export interface AdminQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface AdminStudent {
  id: string;
  name: string;
  phone: string;
  email?: string;
  batch: string;
  joinedDate: string;
  status: 'active' | 'suspended' | 'banned';
  role: 'student' | 'moderator' | 'instructor';
  examsTaken: number;
  avgScore: number;
  accuracy: number;
  history?: {
    examId: string;
    examTitle: string;
    score: number;
    total: number;
    accuracy: number;
    date: string;
    isPassed: boolean;
  }[];
}

export interface AdminNotice {
  id: string;
  title: string;
  category: string;
  date: string;
  isUrgent: boolean;
  content: string;
}

export interface AdminResultEntry {
  id: string;
  examId: string;
  examTitle: string;
  studentName: string;
  studentPhone: string;
  batch: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  timeSpent: string;
  submittedAt: string;
  isPassed: boolean;
  rank: number;
}

// Local storage subscription for admin auth
function subscribeAdmin(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('exam_seba_admin_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('exam_seba_admin_change', callback);
  };
}

function getAdminSnapshot(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('exam_seba_admin');
  } catch {
    return null;
  }
}

function getServerAdminSnapshot(): string | null {
  return null;
}

export default function AdminPage() {
  const { lang, toggleLang, t } = useLanguage();
  const isBn = lang === 'bn';

  // Admin Auth State
  const adminRaw = useSyncExternalStore(subscribeAdmin, getAdminSnapshot, getServerAdminSnapshot);
  const adminUser: { name: string; email: string; role: string } | null = adminRaw ? JSON.parse(adminRaw) : null;
  const isAdminLoggedIn = !!adminUser;

  const [adminInputEmail, setAdminInputEmail] = useState('');
  const [adminInputPassword, setAdminInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'students' | 'exams' | 'questions' | 'results' | 'notices' | 'settings'
  >('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // State: Analytics Timeframe
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'today' | '7days' | '30days' | 'all'>('7days');

  // State: Exams
  const [examsList, setExamsList] = useState<Exam[]>(SAMPLE_EXAMS);
  const [examSearch, setExamSearch] = useState('');
  const [examCategoryFilter, setExamCategoryFilter] = useState('all');
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamCategory, setNewExamCategory] = useState<'bcs' | 'primary' | 'ntrca' | 'bank' | 'general' | 'subject'>('bcs');
  const [newExamBatch, setNewExamBatch] = useState('৪৭তম বিসিএস বুলেট ব্যাচ');
  const [newExamQuestions, setNewExamQuestions] = useState('25');
  const [newExamDuration, setNewExamDuration] = useState('20');
  const [newExamPassMark, setNewExamPassMark] = useState('14');
  const [newExamNegativeMark, setNewExamNegativeMark] = useState('0.25');

  // State: Questions
  const [questionsList, setQuestionsList] = useState<AdminQuestion[]>([
    {
      id: 'q-1',
      subject: 'বাংলা সাহিত্য ও ব্যাকরণ',
      question: "'কবর' নাটকটির রচয়িতা কে?",
      options: ['মুনীর চৌধুরী', 'শামসুর রাহমান', 'জসীম উদ্দীন', 'কাজী নজরুল ইসলাম'],
      correctAnswer: 0,
      explanation: 'মুনীর চৌধুরী ১৯৫২ সালের ভাষা আন্দোলনের পটভূমিতে ঢাকা কেন্দ্রীয় কারাগারে এই নাটকটি রচনা করেন।',
      difficulty: 'easy',
    },
    {
      id: 'q-2',
      subject: 'ইংরেজি ব্যাকরণ ও সাহিত্য',
      question: 'Identify the word that remains unchanged in its plural form:',
      options: ['Deer', 'Ox', 'Foot', 'Mouse'],
      correctAnswer: 0,
      explanation: "'Deer', 'Sheep', 'Species' ইত্যাদি শব্দের সিঙ্গুলার ও প্লুরাল উভয় রূপ একই থাকে।",
      difficulty: 'medium',
    },
    {
      id: 'q-3',
      subject: 'গণিত ও মানসিক দক্ষতা',
      question: 'যদি x + y = 7 এবং xy = 10 হয়, তবে x² + y² এর মান কত?',
      options: ['29', '39', '49', '59'],
      correctAnswer: 0,
      explanation: 'x² + y² = (x + y)² - 2xy = (7)² - 2(10) = 49 - 20 = 29।',
      difficulty: 'medium',
    },
    {
      id: 'q-4',
      subject: 'বাংলাদেশ বিষয়াবলী',
      question: 'বাংলাদেশের সংবিধান কত তারিখে গণপরিষদে গৃহীত হয়?',
      options: ['৪ নভেম্বর ১৯৭২', '১৬ ডিসেম্বর ১৯৭২', '২৬ মার্চ ১৯৭২', '১৭ এপ্রিল ১৯৭২'],
      correctAnswer: 0,
      explanation: '১৯৭২ সালের ৪ নভেম্বর গণপরিষদে বাংলাদেশের সংবিধান গৃহীত হয় এবং ১৬ ডিসেম্বর থেকে কার্যকর হয়।',
      difficulty: 'easy',
    },
    {
      id: 'q-5',
      subject: 'আন্তর্জাতিক বিষয়াবলী',
      question: 'জাতিসংঘের টেকসই উন্নয়ন লক্ষ্যমাত্রা (SDG) এর মোট গোল বা লক্ষ্য কয়টি?',
      options: ['১৭টি', '১৫টি', '১৯টি', '২১টি'],
      correctAnswer: 0,
      explanation: 'SDG এর মোট ১৭টি মূল লক্ষ্যমাত্রা এবং ১৬৯টি সুনির্দিষ্ট টার্গেট রয়েছে।',
      difficulty: 'easy',
    },
    {
      id: 'q-6',
      subject: 'সাধারণ বিজ্ঞান ও আইসিটি',
      question: 'কম্পিউটারের প্রধান মেমোরি কোনটি?',
      options: ['RAM ও ROM', 'হার্ডডিস্ক', 'পেনড্রাইভ', 'সিডি রম'],
      correctAnswer: 0,
      explanation: 'RAM এবং ROM হলো কম্পিউটারের প্রাথমিক বা প্রাইমারি মেমোরি।',
      difficulty: 'easy',
    },
  ]);
  const [questionSearch, setQuestionSearch] = useState('');
  const [questionSubjectFilter, setQuestionSubjectFilter] = useState('all');
  const [questionDifficultyFilter, setQuestionDifficultyFilter] = useState('all');
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<AdminQuestion | null>(null);
  const [newQSubject, setNewQSubject] = useState('বাংলা সাহিত্য ও ব্যাকরণ');
  const [newQDifficulty, setNewQDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [newQText, setNewQText] = useState('');
  const [newQOp1, setNewQOp1] = useState('');
  const [newQOp2, setNewQOp2] = useState('');
  const [newQOp3, setNewQOp3] = useState('');
  const [newQOp4, setNewQOp4] = useState('');
  const [newQCorrect, setNewQCorrect] = useState(0);
  const [newQExplanation, setNewQExplanation] = useState('');

  // State: Students & Users Management
  const [studentsList, setStudentsList] = useState<AdminStudent[]>([
    {
      id: 'std-1',
      name: 'আব্দুল্লাহ আল মামুন',
      phone: '01712345678',
      email: 'mamun@gmail.com',
      batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
      joinedDate: '১২ সেপ্টেম্বর ২০২৬',
      status: 'active',
      role: 'student',
      examsTaken: 28,
      avgScore: 84.5,
      accuracy: 91,
      history: [
        { examId: 'bcs-1', examTitle: '৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১', score: 23.5, total: 25, accuracy: 94, date: '২৮ অক্টোবর ২০২৬', isPassed: true },
        { examId: 'pri-1', examTitle: 'প্রাইমারি শিক্ষক নিয়োগ মডেল টেস্ট - ০১', score: 9.5, total: 10, accuracy: 95, date: '২৬ অক্টোবর ২০২৬', isPassed: true },
        { examId: 'bcs-2', examTitle: 'বিসিএস বাংলাদেশ বিষয়াবলী স্পেশাল', score: 18.0, total: 20, accuracy: 90, date: '২৪ অক্টোবর ২০২৬', isPassed: true },
      ],
    },
    {
      id: 'std-2',
      name: 'নুসরাত জাহান তামান্না',
      phone: '01887654321',
      email: 'nusrat@gmail.com',
      batch: 'প্রাইমারি শিক্ষক নিয়োগ স্পেশাল',
      joinedDate: '১৫ সেপ্টেম্বর ২০২৬',
      status: 'active',
      role: 'student',
      examsTaken: 21,
      avgScore: 78.2,
      accuracy: 86,
      history: [
        { examId: 'pri-1', examTitle: 'প্রাইমারি শিক্ষক নিয়োগ মডেল টেস্ট - ০১', score: 8.75, total: 10, accuracy: 88, date: '২৯ অক্টোবর ২০২৬', isPassed: true },
        { examId: 'bcs-1', examTitle: '৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১', score: 19.5, total: 25, accuracy: 82, date: '২৫ অক্টোবর ২০২৬', isPassed: true },
      ],
    },
    {
      id: 'std-3',
      name: 'শাকিল আহমেদ',
      phone: '01991234567',
      email: 'shakil@gmail.com',
      batch: '১৯তম NTRCA শিক্ষক নিবন্ধন',
      joinedDate: '০১ অক্টোবর ২০২৬',
      status: 'active',
      role: 'student',
      examsTaken: 15,
      avgScore: 72.0,
      accuracy: 80,
      history: [
        { examId: 'ntrca-1', examTitle: '১৯তম শিক্ষক নিবন্ধন প্রস্তুতি টেস্ট', score: 16.5, total: 25, accuracy: 75, date: '২৭ অক্টোবর ২০২৬', isPassed: true },
      ],
    },
    {
      id: 'std-4',
      name: 'ফাতিমা তুজ জোহরা',
      phone: '01619876543',
      email: 'fatima@gmail.com',
      batch: 'কম্বাইন্ড ব্যাংক অফিসার প্রিলি',
      joinedDate: '০৫ অক্টোবর ২০২৬',
      status: 'active',
      role: 'instructor',
      examsTaken: 34,
      avgScore: 89.0,
      accuracy: 94,
      history: [
        { examId: 'bank-1', examTitle: 'ব্যাংক অফিসার স্পেশাল মডেল টেস্ট', score: 24.0, total: 25, accuracy: 96, date: '৩০ অক্টোবর ২০২৬', isPassed: true },
      ],
    },
    {
      id: 'std-5',
      name: 'মেহেদী হাসান রনি',
      phone: '01551239874',
      email: 'mehedi@gmail.com',
      batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
      joinedDate: '১০ অক্টোবর ২০২৬',
      status: 'suspended',
      role: 'student',
      examsTaken: 6,
      avgScore: 42.5,
      accuracy: 52,
      history: [
        { examId: 'bcs-1', examTitle: '৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১', score: 10.5, total: 25, accuracy: 48, date: '১৮ অক্টোবর ২০২৬', isPassed: false },
      ],
    },
    {
      id: 'std-6',
      name: 'তানভীর আহমেদ',
      phone: '01301122334',
      email: 'tanveer@gmail.com',
      batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
      joinedDate: '১২ অক্টোবর ২০২৬',
      status: 'banned',
      role: 'student',
      examsTaken: 2,
      avgScore: 28.0,
      accuracy: 35,
      history: [],
    },
  ]);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentBatchFilter, setStudentBatchFilter] = useState('all');
  const [studentStatusFilter, setStudentStatusFilter] = useState('all');
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<AdminStudent | null>(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentBatch, setNewStudentBatch] = useState('৪৭তম বিসিএস বুলেট ব্যাচ');
  const [newStudentRole, setNewStudentRole] = useState<'student' | 'instructor' | 'moderator'>('student');

  // State: Results & Merit List
  const [resultsList, setResultsList] = useState<AdminResultEntry[]>([
    {
      id: 'res-1',
      examId: 'bcs-1',
      examTitle: '৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১',
      studentName: 'আব্দুল্লাহ আল মামুন',
      studentPhone: '01712345678',
      batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
      score: 23.5,
      totalMarks: 25,
      accuracy: 94,
      timeSpent: '১২ মি. ২০ সে.',
      submittedAt: 'আজ সকাল ১০:৪২',
      isPassed: true,
      rank: 1,
    },
    {
      id: 'res-2',
      examId: 'bcs-1',
      examTitle: '৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১',
      studentName: 'ফাতিমা তুজ জোহরা',
      studentPhone: '01619876543',
      batch: 'কম্বাইন্ড ব্যাংক অফিসার প্রিলি',
      score: 22.75,
      totalMarks: 25,
      accuracy: 92,
      timeSpent: '১৩ মি. ১০ সে.',
      submittedAt: 'আজ সকাল ১০:৪৬',
      isPassed: true,
      rank: 2,
    },
    {
      id: 'res-3',
      examId: 'bcs-1',
      examTitle: '৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১',
      studentName: 'নুসরাত জাহান তামান্না',
      studentPhone: '01887654321',
      batch: 'প্রাইমারি শিক্ষক নিয়োগ স্পেশাল',
      score: 21.0,
      totalMarks: 25,
      accuracy: 88,
      timeSpent: '১৪ মি. ০৫ সে.',
      submittedAt: 'আজ সকাল ১০:৫১',
      isPassed: true,
      rank: 3,
    },
    {
      id: 'res-4',
      examId: 'bcs-1',
      examTitle: '৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১',
      studentName: 'শাকিল আহমেদ',
      studentPhone: '01991234567',
      batch: '১৯তম NTRCA শিক্ষক নিবন্ধন',
      score: 18.5,
      totalMarks: 25,
      accuracy: 78,
      timeSpent: '১৫ মি. ৩০ সে.',
      submittedAt: 'আজ সকাল ১১:০৫',
      isPassed: true,
      rank: 4,
    },
    {
      id: 'res-5',
      examId: 'bcs-1',
      examTitle: '৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১',
      studentName: 'মেহেদী হাসান রনি',
      studentPhone: '01551239874',
      batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
      score: 11.25,
      totalMarks: 25,
      accuracy: 52,
      timeSpent: '১৬ মি. ৪৫ সে.',
      submittedAt: 'আজ সকাল ১১:২০',
      isPassed: false,
      rank: 5,
    },
  ]);
  const [resultExamFilter, setResultExamFilter] = useState('all');
  const [resultSearch, setResultSearch] = useState('');

  // State: Notices
  const [noticesList, setNoticesList] = useState<AdminNotice[]>([
    {
      id: 'not-1',
      title: '৪৭তম বিসিএস প্রিলিমিনারি পূর্ণাঙ্গ লাইভ মডেল টেস্ট সিডিউল',
      category: 'বিসিএস পরীক্ষা',
      date: '২৪ অক্টোবর ২০২৬',
      isUrgent: true,
      content: 'আগামীকাল সকাল ১০:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত লাইভ মডেল টেস্ট অনুষ্ঠিত হবে। সকল শিক্ষার্থীকে নির্ধারিত সময়ে অংশ নেওয়ার অনুরোধ করা হলো।',
    },
    {
      id: 'not-2',
      title: 'প্রাইমারি শিক্ষক নিয়োগ ৩য় ধাপ পরীক্ষার রুটিন প্রকাশ',
      category: 'রুটিন আপডেট',
      date: '২২ অক্টোবর ২০২৬',
      isUrgent: false,
      content: 'প্রাইমারি শিক্ষক নিয়োগ ৩য় ধাপের মেগা মডেল টেস্ট আগামী শুক্রবার শুরু হবে। বিস্তারিত সিলেবাস ডাউনলোড করুন।',
    },
  ]);
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('সাধারণ নোটিশ');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeUrgent, setNewNoticeUrgent] = useState(false);

  // Settings State
  const [platformName, setPlatformName] = useState('Exam Seba (এক্সাম সেবা)');
  const [helplineNumber, setHelplineNumber] = useState('0961-200300');
  const [negativeMarkingValue, setNegativeMarkingValue] = useState('0.25');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoEvaluateMode, setAutoEvaluateMode] = useState(true);
  const [studentRegistrationOpen, setStudentRegistrationOpen] = useState(true);

  // Admin Direct Login
  const handleAdminDirectLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');

    if (!adminInputEmail.trim() || !adminInputPassword.trim()) {
      setLoginError(isBn ? 'ইমেইল ও পাসওয়ার্ড প্রদান করুন' : 'Please provide email and password');
      return;
    }

    const session = {
      name: 'এডমিন মামুনুর রশিদ',
      email: adminInputEmail.trim(),
      role: 'Super Admin',
    };

    try {
      localStorage.setItem('exam_seba_admin', JSON.stringify(session));
      window.dispatchEvent(new Event('exam_seba_admin_change'));
    } catch {
      // ignore
    }

    showToast(isBn ? 'অ্যাডমিন পোর্টালে স্বাগতম!' : 'Welcome to Admin Console!');
  };

  const handle1ClickAdminUnlock = () => {
    const session = {
      name: 'এডমিন মামুনুর রশিদ',
      email: 'admin@examsheba.com',
      role: 'Super Admin',
    };
    try {
      localStorage.setItem('exam_seba_admin', JSON.stringify(session));
      window.dispatchEvent(new Event('exam_seba_admin_change'));
    } catch {
      // ignore
    }
    showToast(isBn ? 'সুপার অ্যাডমিন হিসেবে সফলভাবে প্রবেশ করেছেন!' : 'Signed in as Super Admin!');
  };

  const handleAdminLogout = () => {
    try {
      localStorage.removeItem('exam_seba_admin');
      window.dispatchEvent(new Event('exam_seba_admin_change'));
    } catch {
      // ignore
    }
    showToast(isBn ? 'অ্যাডমিন লগআউট সম্পন্ন হয়েছে' : 'Admin logged out successfully');
  };

  // Exam Management Actions
  const handleCreateOrUpdateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;

    const totalQ = parseInt(newExamQuestions) || 25;
    const duration = parseInt(newExamDuration) || 20;
    const passMarks = parseInt(newExamPassMark) || 14;
    const negMark = parseFloat(newExamNegativeMark) || 0.25;

    if (editingExam) {
      setExamsList(
        examsList.map((ex) =>
          ex.id === editingExam.id
            ? {
                ...ex,
                title: newExamTitle.trim(),
                category: newExamCategory,
                batchName: newExamBatch,
                totalQuestions: totalQ,
                totalMarks: totalQ,
                durationMinutes: duration,
                passMarks,
                negativeMark: negMark,
              }
            : ex
        )
      );
      setEditingExam(null);
      showToast(isBn ? 'পরীক্ষার তথ্য আপডেট করা হয়েছে!' : 'Exam updated successfully!');
    } else {
      const newExam: Exam = {
        id: `exam-${Date.now()}`,
        title: newExamTitle.trim(),
        category: newExamCategory,
        totalQuestions: totalQ,
        totalMarks: totalQ,
        durationMinutes: duration,
        negativeMark: negMark,
        passMarks,
        batchName: newExamBatch,
        examDate: isBn ? 'আজকে লাইভ চলছে' : 'Live Now',
        isLive: true,
        isFree: true,
        questions: SAMPLE_EXAMS[0].questions,
      };

      setExamsList([newExam, ...examsList]);
      showToast(isBn ? 'নতুন পরীক্ষা সফলভাবে তৈরি হয়েছে!' : 'New exam created successfully!');
    }

    setIsAddExamOpen(false);
    setNewExamTitle('');
  };

  const handleOpenEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setNewExamTitle(exam.title);
    setNewExamCategory(exam.category);
    setNewExamBatch(exam.batchName);
    setNewExamQuestions(exam.totalQuestions.toString());
    setNewExamDuration(exam.durationMinutes.toString());
    setNewExamPassMark(exam.passMarks.toString());
    setNewExamNegativeMark(exam.negativeMark.toString());
    setIsAddExamOpen(true);
  };

  const handleDeleteExam = (id: string) => {
    setExamsList(examsList.filter((e) => e.id !== id));
    showToast(isBn ? 'পরীক্ষাটি মুছে ফেলা হয়েছে' : 'Exam deleted successfully');
  };

  const handleDuplicateExam = (exam: Exam) => {
    const duplicated: Exam = {
      ...exam,
      id: `exam-${Date.now()}`,
      title: `${exam.title} (কপি)`,
    };
    setExamsList([duplicated, ...examsList]);
    showToast(isBn ? 'পরীক্ষাটি সফলভাবে ডুপ্লিকেট করা হয়েছে' : 'Exam duplicated successfully');
  };

  const handleToggleExamLive = (id: string) => {
    setExamsList(
      examsList.map((e) => (e.id === id ? { ...e, isLive: !e.isLive } : e))
    );
    showToast(isBn ? 'পরীক্ষার লাইভ স্ট্যাটাস পরিবর্তন হয়েছে' : 'Exam live status toggled');
  };

  // Question Actions
  const handleCreateOrUpdateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim() || !newQOp1.trim() || !newQOp2.trim()) return;

    if (editingQuestion) {
      setQuestionsList(
        questionsList.map((q) =>
          q.id === editingQuestion.id
            ? {
                ...q,
                subject: newQSubject,
                difficulty: newQDifficulty,
                question: newQText.trim(),
                options: [newQOp1.trim(), newQOp2.trim(), newQOp3.trim() || 'অপশন ৩', newQOp4.trim() || 'অপশন ৪'],
                correctAnswer: newQCorrect,
                explanation: newQExplanation.trim() || 'সঠিক ব্যাখ্যা প্রদান করা হলো।',
              }
            : q
        )
      );
      setEditingQuestion(null);
      showToast(isBn ? 'প্রশ্নটি আপডেট করা হয়েছে!' : 'Question updated!');
    } else {
      const newQ: AdminQuestion = {
        id: `q-${Date.now()}`,
        subject: newQSubject,
        difficulty: newQDifficulty,
        question: newQText.trim(),
        options: [newQOp1.trim(), newQOp2.trim(), newQOp3.trim() || 'অপশন ৩', newQOp4.trim() || 'অপশন ৪'],
        correctAnswer: newQCorrect,
        explanation: newQExplanation.trim() || (isBn ? 'সঠিক উত্তর নির্বাচন করা হয়েছে।' : 'Correct answer marked.'),
      };
      setQuestionsList([newQ, ...questionsList]);
      showToast(isBn ? 'প্রশ্নব্যাংকে নতুন প্রশ্ন যুক্ত হয়েছে!' : 'Question added to question bank!');
    }

    setIsAddQuestionOpen(false);
    setNewQText('');
    setNewQOp1('');
    setNewQOp2('');
    setNewQOp3('');
    setNewQOp4('');
    setNewQExplanation('');
  };

  const handleOpenEditQuestion = (q: AdminQuestion) => {
    setEditingQuestion(q);
    setNewQSubject(q.subject);
    setNewQDifficulty(q.difficulty || 'medium');
    setNewQText(q.question);
    setNewQOp1(q.options[0] || '');
    setNewQOp2(q.options[1] || '');
    setNewQOp3(q.options[2] || '');
    setNewQOp4(q.options[3] || '');
    setNewQCorrect(q.correctAnswer);
    setNewQExplanation(q.explanation);
    setIsAddQuestionOpen(true);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestionsList(questionsList.filter((q) => q.id !== id));
    showToast(isBn ? 'প্রশ্নটি মুছে ফেলা হয়েছে' : 'Question removed');
  };

  const handleImportSampleQuestions = () => {
    const sampleBatch: AdminQuestion[] = [
      {
        id: `q-sample-${Date.now()}-1`,
        subject: 'বাংলাদেশ বিষয়াবলী',
        question: 'মুজিবনগর সরকার কোন তারিখে শপথ গ্রহণ করে?',
        options: ['১৭ এপ্রিল ১৯৭১', '১০ এপ্রিল ১৯৭১', '২৬ মার্চ ১৯৭১', '৭ মার্চ ১৯৭১'],
        correctAnswer: 0,
        explanation: '১৯৭১ সালের ১৭ এপ্রিল তৎকালীন মেহেরপুরের বৈদ্যনাথতলায় (বর্তমান মুজিবনগর) প্রথম স্বাধীন বাংলাদেশ সরকার শপথ গ্রহণ করে।',
        difficulty: 'easy',
      },
      {
        id: `q-sample-${Date.now()}-2`,
        subject: 'গণিত ও মানসিক দক্ষতা',
        question: 'কোন ত্রিভুজের বাহুগুলোর অনুপাত ৫:১২:১৩ হলে এটি কোন ধরনের ত্রিভুজ?',
        options: ['সমকোণী ত্রিভুজ', 'সমবাহু ত্রিভুজ', 'স্থূলকোণী ত্রিভুজ', 'সমদ্বিবাহু ত্রিভুজ'],
        correctAnswer: 0,
        explanation: 'পীথাগোরাসের উপপাদ্য অনুযায়ী ৫² + ১২² = ২৫ + ১৪৪ = ১৬৯ = ১৩²। সুতরাং এটি সমকোণী ত্রিভুজ।',
        difficulty: 'medium',
      },
    ];
    setQuestionsList([...sampleBatch, ...questionsList]);
    showToast(isBn ? 'নমুনা প্রশ্নব্যাংক সফলভাবে ইম্পোর্ট করা হয়েছে!' : 'Sample questions imported successfully!');
  };

  // Student / User Management Actions
  const handleToggleStudentStatus = (id: string, newStatus: 'active' | 'suspended' | 'banned') => {
    setStudentsList(
      studentsList.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    showToast(isBn ? `শিক্ষার্থীর স্ট্যাটাস: ${newStatus} করা হয়েছে` : `Student marked as ${newStatus}`);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentPhone.trim()) return;

    const newStd: AdminStudent = {
      id: `std-${Date.now()}`,
      name: newStudentName.trim(),
      phone: newStudentPhone.trim(),
      email: newStudentEmail.trim() || 'student@examsheba.com',
      batch: newStudentBatch,
      joinedDate: isBn ? 'আজকে' : 'Today',
      status: 'active',
      role: newStudentRole,
      examsTaken: 0,
      avgScore: 0,
      accuracy: 0,
      history: [],
    };

    setStudentsList([newStd, ...studentsList]);
    setIsAddStudentOpen(false);
    setNewStudentName('');
    setNewStudentPhone('');
    setNewStudentEmail('');
    showToast(isBn ? 'নতুন শিক্ষার্থী সফলভাবে যুক্ত হয়েছে!' : 'New student registered successfully!');
  };

  const handleDeleteStudent = (id: string) => {
    setStudentsList(studentsList.filter((s) => s.id !== id));
    if (selectedStudentForProfile?.id === id) {
      setSelectedStudentForProfile(null);
    }
    showToast(isBn ? 'শিক্ষার্থী প্রোফাইল মুছে ফেলা হয়েছে' : 'Student record deleted');
  };

  // Export Student Directory to CSV
  const handleExportStudentsCSV = () => {
    let csv = 'ID,Name,Phone,Email,Batch,Role,Status,ExamsTaken,AvgScore,Accuracy,JoinedDate\n';
    studentsList.forEach((s) => {
      csv += `"${s.id}","${s.name}","${s.phone}","${s.email || ''}","${s.batch}","${s.role}","${s.status}",${s.examsTaken},${s.avgScore},${s.accuracy},"${s.joinedDate}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-seba-students-${Date.now()}.csv`;
    a.click();
    showToast(isBn ? 'শিক্ষার্থী তালিকা CSV ডাউনলোড শুরু হয়েছে!' : 'Student CSV export downloaded!');
  };

  // Notice Actions
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;

    const newN: AdminNotice = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle.trim(),
      category: newNoticeCategory,
      date: isBn ? 'আজকে' : 'Today',
      isUrgent: newNoticeUrgent,
      content: newNoticeContent.trim(),
    };

    setNoticesList([newN, ...noticesList]);
    setIsAddNoticeOpen(false);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setNewNoticeUrgent(false);
    showToast(isBn ? 'নোটিশটি সফলভাবে প্রকাশ করা হয়েছে!' : 'Notice published successfully!');
  };

  const handleDeleteNotice = (id: string) => {
    setNoticesList(noticesList.filter((n) => n.id !== id));
    showToast(isBn ? 'নোটিশটি ডিলিট করা হয়েছে' : 'Notice deleted');
  };

  // Export Complete System Backup
  const handleExportBackup = () => {
    const backupData = {
      exams: examsList,
      questions: questionsList,
      students: studentsList,
      results: resultsList,
      notices: noticesList,
      settings: {
        platformName,
        helplineNumber,
        negativeMarkingValue,
        maintenanceMode,
        autoEvaluateMode,
        studentRegistrationOpen,
      },
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-seba-complete-backup-${Date.now()}.json`;
    a.click();
    showToast(isBn ? 'সম্পূর্ণ প্ল্যাটফর্ম ব্যাকআপ ডাউনলোড সম্পন্ন হয়েছে!' : 'Platform JSON backup downloaded!');
  };

  // Filtered queries
  const filteredExams = useMemo(() => {
    return examsList.filter((e) => {
      const matchesSearch = e.title.toLowerCase().includes(examSearch.toLowerCase());
      const matchesCat = examCategoryFilter === 'all' || e.category.includes(examCategoryFilter);
      return matchesSearch && matchesCat;
    });
  }, [examsList, examSearch, examCategoryFilter]);

  const filteredQuestions = useMemo(() => {
    return questionsList.filter((q) => {
      const matchesSearch = q.question.toLowerCase().includes(questionSearch.toLowerCase());
      const matchesSub = questionSubjectFilter === 'all' || q.subject === questionSubjectFilter;
      const matchesDiff = questionDifficultyFilter === 'all' || q.difficulty === questionDifficultyFilter;
      return matchesSearch && matchesSub && matchesDiff;
    });
  }, [questionsList, questionSearch, questionSubjectFilter, questionDifficultyFilter]);

  const filteredStudents = useMemo(() => {
    return studentsList.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.phone.includes(studentSearch) ||
        (s.email && s.email.toLowerCase().includes(studentSearch.toLowerCase()));
      const matchesBatch = studentBatchFilter === 'all' || s.batch === studentBatchFilter;
      const matchesStatus = studentStatusFilter === 'all' || s.status === studentStatusFilter;
      return matchesSearch && matchesBatch && matchesStatus;
    });
  }, [studentsList, studentSearch, studentBatchFilter, studentStatusFilter]);

  const filteredResults = useMemo(() => {
    return resultsList.filter((r) => {
      const matchesExam = resultExamFilter === 'all' || r.examId === resultExamFilter;
      const matchesSearch =
        r.studentName.toLowerCase().includes(resultSearch.toLowerCase()) ||
        r.studentPhone.includes(resultSearch);
      return matchesExam && matchesSearch;
    });
  }, [resultsList, resultExamFilter, resultSearch]);

  // Navigation tab configurations
  const navTabs = [
    { id: 'overview', label: isBn ? 'সার্বিক ড্যাশবোর্ড' : 'Overview', icon: FaChartPie },
    { id: 'analytics', label: isBn ? 'অ্যানালাইসিস ও রিপোর্টস' : 'Analytics & Insights', icon: FaChartLine },
    { id: 'students', label: isBn ? 'ইউজার ও শিক্ষার্থী' : 'User Management', icon: FaUsers, badge: studentsList.length },
    { id: 'exams', label: isBn ? 'পরীক্ষা ব্যবস্থাপনা' : 'Exam Management', icon: FaFileAlt, badge: examsList.length },
    { id: 'questions', label: isBn ? 'প্রশ্নব্যাংক' : 'Question Bank', icon: FaBookOpen, badge: questionsList.length },
    { id: 'results', label: isBn ? 'ফলাফল ও মেধা তালিকা' : 'Results & Merit', icon: FaTrophy, badge: resultsList.length },
    { id: 'notices', label: isBn ? 'নোটিশ ও এলার্ট' : 'Notices', icon: FaBullhorn, badge: noticesList.length },
    { id: 'settings', label: isBn ? 'প্ল্যাটফর্ম সেটিংস' : 'Settings', icon: FaCog },
  ];

  // ==========================================
  // UNLOGGED IN VIEW: Admin Gate
  // ==========================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-between p-4 sm:p-6 text-white selection:bg-[#007bff]">
        {/* Top bar */}
        <div className="container mx-auto flex items-center justify-between py-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/20"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'মূল সাইটে ফিরুন' : 'Back to Home'}</span>
          </Link>

          <button
            onClick={toggleLang}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3.5 py-1.5 rounded-full text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <span>🌐</span>
            <span>{isBn ? 'English' : 'বাংলা'}</span>
          </button>
        </div>

        {/* Login Gate Box */}
        <div className="container mx-auto flex items-center justify-center my-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <ExamSebaLogo lang={lang} theme="dark" size="lg" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-0.5 rounded-full text-xs font-bold mb-2">
                <FaLock className="w-3 h-3" />
                <span>{isBn ? 'নিরাপদ অ্যাডমিন পোর্টাল' : 'Secure Admin Portal'}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {isBn ? 'অ্যাডমিন কন্ট্রোল সেন্টার' : 'Exam Seba Admin Console'}
              </h1>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                {isBn ? 'প্ল্যাটফর্ম পরিচালনা করতে আপনার অ্যাডমিন ক্রেডেনশিয়াল প্রদান করুন' : 'Enter credentials to manage exams, students and analysis'}
              </p>
            </div>

            {/* 1-Click Fast Unlock */}
            <div className="mb-5 p-3.5 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white flex items-center gap-1.5">
                  <FaUserShield className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isBn ? 'সুপার অ্যাডমিন ডেমো' : 'Super Admin Demo'}</span>
                </p>
                <p className="text-[11px] text-blue-200">{isBn ? '১-ক্লিকে তাৎক্ষণিক আনলক' : '1-Click instant unlock'}</p>
              </div>
              <button
                type="button"
                onClick={handle1ClickAdminUnlock}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3.5 py-1.5 rounded-xl shadow transition-transform hover:scale-105"
              >
                {isBn ? 'আনলক করুন' : 'Unlock Now'}
              </button>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-300 text-xs font-bold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleAdminDirectLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isBn ? 'অ্যাডমিন ইমেইল' : 'Admin Email'}
                </label>
                <input
                  type="email"
                  value={adminInputEmail}
                  onChange={(e) => setAdminInputEmail(e.target.value)}
                  placeholder="admin@examsheba.com"
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isBn ? 'সিকিউরিটি পাসওয়ার্ড' : 'Security Password'}
                </label>
                <input
                  type="password"
                  value={adminInputPassword}
                  onChange={(e) => setAdminInputPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0062cc] hover:to-[#004085] text-white font-extrabold text-sm rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
              >
                {isBn ? 'লগইন করুন' : 'Login to Admin'}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 py-3">
          Exam Seba Admin Suite • Professional Education Management System
        </div>
      </div>
    );
  }

  // ==========================================
  // LOGGED IN VIEW: Full Professional Admin Panel
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col lg:flex-row text-slate-800 selection:bg-[#007bff] selection:text-white">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in slide-in-from-bottom">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toast}</span>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <ExamSebaLogo lang={lang} theme="dark" size="sm" />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div className="px-5 py-2.5 bg-blue-950/40 border-b border-slate-800/60 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">
              {isBn ? 'অ্যাডমিন কন্ট্রোল স্যুইট' : 'Admin Control Suite'}
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>v2.5 Pro</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as typeof activeTab);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xs uppercase shadow">
              {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{adminUser?.name || 'এডমিন মামুনুর রশিদ'}</p>
              <p className="text-[10px] text-blue-300 truncate">{adminUser?.email || 'admin@examsheba.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
            <Link
              href="/"
              className="flex-1 text-center py-2 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <FaArrowLeft className="w-3 h-3" />
              <span>{isBn ? 'মূল সাইট' : 'View Public Site'}</span>
            </Link>

            <button
              onClick={handleAdminLogout}
              className="py-2 px-3 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
              title="লগআউট"
            >
              <FaSignOutAlt className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-7 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle menu"
            >
              <HiBars3 size={24} />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 capitalize">
                {navTabs.find((t) => t.id === activeTab)?.label}
              </h2>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Exam Seba Enterprise Control • রিয়েল-টাইম লাইভ ম্যানেজমেন্ট সিস্টেম
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="hidden md:flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-bold">
              <FaFire className="w-3.5 h-3.5 animate-bounce" />
              <span>{isBn ? '৩টি লাইভ এক্সাম চলমান' : '3 Live Exams Running'}</span>
            </div>

            {/* Language Switch */}
            <button
              onClick={toggleLang}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1 rounded-full text-xs shadow-sm flex items-center gap-1 transition-transform hover:scale-105"
            >
              <span>🌐</span>
              <span>{isBn ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Site Preview Button */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 bg-[#007bff] hover:bg-[#0056b3] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <span>{isBn ? 'সাইট প্রিভিউ' : 'Site Preview'}</span>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">

          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW & PLATFORM DASHBOARD                      */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 Primary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold">মোট নিবন্ধিত শিক্ষার্থী</span>
                    <span className="w-9 h-9 rounded-2xl bg-blue-50 text-[#007bff] flex items-center justify-center">
                      <FaUsers className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">{studentsList.length * 2400 + 480}+</div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      ↑ ১৪.২% এই মাসে বৃদ্ধি
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold">সক্রিয় মডেল টেস্ট</span>
                    <span className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <FaFileAlt className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">{examsList.length} টি</div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      সকল চাকরি ব্যাচ কভার্ড
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold">প্রশ্নব্যাংকে মোট প্রশ্ন</span>
                    <span className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <FaBookOpen className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">{questionsList.length * 4200 + 150}+</div>
                    <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      পুঙ্খানুপুঙ্খ ব্যাখ্যা সহ
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold">আজকের পরীক্ষা গ্রহণ</span>
                    <span className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <FaChartLine className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">১,৮২০ জন</div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      গড় পাস রেট: ৭১.৪%
                    </span>
                  </div>
                </div>
              </div>

              {/* Fast Action Toolbar Banner */}
              <div className="bg-gradient-to-r from-[#004085] via-[#0056b3] to-[#007bff] rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black">দ্রুত অ্যাডমিন অ্যাকশন গ্রহণ করুন</h3>
                  <p className="text-xs text-blue-100 mt-1">
                    নতুন মডেল টেস্ট প্রকাশ করুন, প্রশ্নব্যাংক সমৃদ্ধ করুন, ইউজার ম্যানেজ করুন অথবা নোটিশ জারি করুন।
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      setActiveTab('exams');
                      setEditingExam(null);
                      setNewExamTitle('');
                      setIsAddExamOpen(true);
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 shadow"
                  >
                    <FaPlus className="w-3 h-3" />
                    <span>নতুন পরীক্ষা তৈরি</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('questions');
                      setEditingQuestion(null);
                      setIsAddQuestionOpen(true);
                    }}
                    className="bg-white hover:bg-blue-50 text-[#007bff] font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 shadow"
                  >
                    <FaPlus className="w-3 h-3" />
                    <span>প্রশ্ন যোগ করুন</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('students');
                      setIsAddStudentOpen(true);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 shadow"
                  >
                    <FaUserPlus className="w-3 h-3" />
                    <span>শিক্ষার্থী যোগ</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('analytics');
                    }}
                    className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5"
                  >
                    <FaChartLine className="w-3 h-3" />
                    <span>অ্যানালাইটিক্স রিপোর্ট</span>
                  </button>
                </div>
              </div>

              {/* Real-time Submissions Stream */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      সাম্প্রতিক পরীক্ষা সাবমিশন (রিয়েল-টাইম লাইভ ফিড)
                    </h3>
                    <p className="text-xs text-slate-500">পরীক্ষার্থীদের তাৎক্ষণিক জমা দেওয়া উত্তর ও প্রাপ্ত স্কোর</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('results')}
                    className="text-xs text-[#007bff] hover:underline font-bold"
                  >
                    সকল ফলাফল দেখুন →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-black border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">মেধা</th>
                        <th className="py-3 px-4">শিক্ষার্থী</th>
                        <th className="py-3 px-4">পরীক্ষার নাম</th>
                        <th className="py-3 px-4">স্কোর</th>
                        <th className="py-3 px-4">নির্ভুলতা</th>
                        <th className="py-3 px-4">ফলাফল</th>
                        <th className="py-3 px-4">সময়</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {resultsList.slice(0, 5).map((res) => (
                        <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <span className="w-6 h-6 rounded-full bg-blue-50 text-[#007bff] font-bold inline-flex items-center justify-center text-xs">
                              #{res.rank}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {res.studentName}
                            <span className="block text-[11px] text-slate-400 font-normal">{res.studentPhone}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-700">{res.examTitle}</td>
                          <td className="py-3 px-4 font-black text-slate-800">
                            {res.score} / {res.totalMarks}
                          </td>
                          <td className="py-3 px-4 font-bold text-purple-600">{res.accuracy}%</td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                res.isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {res.isPassed ? 'উত্তীর্ণ' : 'অনুত্তীর্ণ'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500">{res.submittedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: ADVANCED ANALYTICS & INSIGHTS (NEW DEDICATED TAB)  */}
          {/* ========================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Analytics Header & Timeframe Selector */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <FaChartLine className="w-5 h-5 text-[#007bff]" />
                    <span>ইন-ডেপথ পারফরম্যান্স অ্যানালাইসিস ও প্ল্যাটফর্ম রিপোর্টস</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    শিক্ষার্থীদের পরীক্ষার সাফল্য, বিষয়ভিত্তিক নির্ভুলতা ও সামগ্রিক অংশগ্রহণ মেট্রিক্স
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
                  <button
                    onClick={() => setAnalyticsTimeframe('today')}
                    className={`px-3 py-1.5 rounded-xl transition-colors ${analyticsTimeframe === 'today' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                  >
                    আজ
                  </button>
                  <button
                    onClick={() => setAnalyticsTimeframe('7days')}
                    className={`px-3 py-1.5 rounded-xl transition-colors ${analyticsTimeframe === '7days' ? 'bg-white text-[#007bff] shadow-sm' : 'text-slate-500'}`}
                  >
                    গত ৭ দিন
                  </button>
                  <button
                    onClick={() => setAnalyticsTimeframe('30days')}
                    className={`px-3 py-1.5 rounded-xl transition-colors ${analyticsTimeframe === '30days' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                  >
                    গত ৩০ দিন
                  </button>
                  <button
                    onClick={() => setAnalyticsTimeframe('all')}
                    className={`px-3 py-1.5 rounded-xl transition-colors ${analyticsTimeframe === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                  >
                    সর্বকালীন
                  </button>
                </div>
              </div>

              {/* 4 Analytics KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-bold block mb-1">মোট পরীক্ষা গ্রহণ (Attempts)</span>
                  <div className="text-2xl font-black text-[#007bff]">৯৮,৪২০ বার</div>
                  <span className="text-[11px] font-bold text-emerald-600">↑ ১৮% গত সপ্তাহের চেয়ে বৃদ্ধি</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-bold block mb-1">সামগ্রিক গড় স্কোর</span>
                  <div className="text-2xl font-black text-slate-800">৬৫.৮%</div>
                  <span className="text-[11px] font-bold text-blue-600">পাস মার্ক বেঞ্চমার্ক: ৬০%</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-bold block mb-1">সার্বিক পাস রেট</span>
                  <div className="text-2xl font-black text-emerald-600">৭১.২%</div>
                  <span className="text-[11px] font-bold text-emerald-700">৭০,০৭৫ জন শিক্ষার্থী উত্তীর্ণ</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-bold block mb-1">দৈনিক সক্রিয় পরীক্ষার্থী</span>
                  <div className="text-2xl font-black text-purple-600">১,৮৪০ জন</div>
                  <span className="text-[11px] font-bold text-purple-700">পিক সময়: সন্ধ্যা ৭:০০ - রাত ১০:০০</span>
                </div>
              </div>

              {/* Visual Interactive SVG Area Chart: Daily Exam Attempts Trend */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      দৈনিক পরীক্ষা গ্রহণের ট্রেন্ড (Daily Exam Traffic)
                    </h4>
                    <p className="text-xs text-slate-500">গত ৭ দিনের পরীক্ষা সম্পন্ন করার পরিসংখ্যান</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <span className="w-3 h-3 rounded-full bg-[#007bff]" />
                    <span>পরীক্ষা গ্রহণ সংখ্যা</span>
                  </div>
                </div>

                {/* SVG Area Chart */}
                <div className="h-48 w-full">
                  <svg className="w-full h-full" viewBox="0 0 700 180" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#007bff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#007bff" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="30" x2="700" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="75" x2="700" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="120" x2="700" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="160" x2="700" y2="160" stroke="#e2e8f0" strokeWidth="1.5" />

                    {/* Gradient Area Fill */}
                    <path
                      d="M 50 140 Q 150 90 250 110 T 450 60 T 650 40 L 650 160 L 50 160 Z"
                      fill="url(#chartGradient)"
                    />
                    {/* Line Stroke */}
                    <path
                      d="M 50 140 Q 150 90 250 110 T 450 60 T 650 40"
                      fill="none"
                      stroke="#007bff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {[
                      { x: 50, y: 140, label: 'শনি', val: '১,১০০' },
                      { x: 150, y: 95, label: 'রবি', val: '১,৫২০' },
                      { x: 250, y: 110, label: 'সোম', val: '১,৪০০' },
                      { x: 350, y: 80, label: 'মঙ্গল', val: '১,৬৮০' },
                      { x: 450, y: 60, label: 'বুধ', val: '১,৮৪০' },
                      { x: 550, y: 55, label: 'বৃহঃ', val: '১,৯১০' },
                      { x: 650, y: 40, label: 'শুক্র', val: '২,২৫০' },
                    ].map((pt, idx) => (
                      <g key={idx}>
                        <circle cx={pt.x} cy={pt.y} r="5" fill="#007bff" stroke="#ffffff" strokeWidth="2.5" />
                        <text x={pt.x} y={pt.y - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0056b3">
                          {pt.val}
                        </text>
                        <text x={pt.x} y={175} textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Two Column Analysis: Subject Difficulty & Score Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Subject-Wise Accuracy & Difficulty Breakdown */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mb-1">
                    বিষয়ভিত্তিক পারফরম্যান্স ও কাঠিন্য মেট্রিক্স
                  </h4>
                  <p className="text-xs text-slate-500 mb-5">শিক্ষার্থীরা কোন বিষয়ে কেমন স্কোর করছে</p>

                  <div className="space-y-4">
                    {[
                      { name: 'বাংলাদেশ বিষয়াবলী', rate: 84, level: 'সহজ', color: 'bg-emerald-500' },
                      { name: 'বাংলা সাহিত্য ও ব্যাকরণ', rate: 78, level: 'মাঝারি', color: 'bg-blue-500' },
                      { name: 'সাধারণ বিজ্ঞান ও তথ্যপ্রযুক্তি', rate: 72, level: 'মাঝারি', color: 'bg-teal-500' },
                      { name: 'আন্তর্জাতিক বিষয়াবলী', rate: 66, level: 'মাঝারি', color: 'bg-amber-500' },
                      { name: 'গাণিতিক যুক্তি ও মানসিক দক্ষতা', rate: 58, level: 'কঠিন', color: 'bg-indigo-500' },
                      { name: 'ইংরেজি সাহিত্য ও ব্যাকরণ', rate: 52, level: 'কঠিন', color: 'bg-rose-500' },
                    ].map((subj) => (
                      <div key={subj.name}>
                        <div className="flex justify-between items-center text-xs font-bold mb-1">
                          <span className="text-slate-800">{subj.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600">{subj.rate}% নির্ভুলতা</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                subj.level === 'সহজ'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : subj.level === 'মাঝারি'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {subj.level}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className={`${subj.color} h-full rounded-full transition-all duration-500`} style={{ width: `${subj.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score Distribution & Category Share */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mb-1">
                      স্কোর বণ্টন হিস্টোগ্রাম (Score Distribution)
                    </h4>
                    <p className="text-xs text-slate-500 mb-5">শিক্ষার্থীদের স্কোর ব্র্যাকেট বিশ্লেষণ</p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                          <span>৮০% - ১০০% (মেধাবী ক্যাটাগরি)</span>
                          <span className="text-emerald-600">২০% পরীক্ষার্থী</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '20%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                          <span>৬০% - ৭৯% (সন্তোষজনক ক্যাটাগরি)</span>
                          <span className="text-[#007bff]">৪৫% পরীক্ষার্থী</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div className="bg-[#007bff] h-full rounded-full" style={{ width: '45%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                          <span>৪০% - ৫৯% (গড় ক্যাটাগরি)</span>
                          <span className="text-amber-600">২৫% পরীক্ষার্থী</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '25%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                          <span>৪০% এর নিচে (উন্নতি প্রয়োজন)</span>
                          <span className="text-rose-600">১০% পরীক্ষার্থী</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full rounded-full" style={{ width: '10%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Participation Share */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-center text-xs font-bold">
                    <div>
                      <span className="block text-slate-400 text-[10px]">বিসিএস পরীক্ষা</span>
                      <span className="text-base text-slate-900 font-black">৪৩%</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[10px]">প্রাইমারি শিক্ষক</span>
                      <span className="text-base text-slate-900 font-black">২৯%</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[10px]">শিক্ষক নিবন্ধন</span>
                      <span className="text-base text-slate-900 font-black">১৮%</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[10px]">ব্যাংক জবস</span>
                      <span className="text-base text-slate-900 font-black">১০%</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: COMPLETE USER / STUDENT MANAGEMENT SYSTEM         */}
          {/* ========================================================= */}
          {activeTab === 'students' && (
            <div className="space-y-5">
              
              {/* Top Controls & Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <span className="text-xs text-slate-500 font-bold block mb-1">মোট শিক্ষার্থী</span>
                  <span className="text-2xl font-black text-[#007bff]">{studentsList.length} জন</span>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm text-center">
                  <span className="text-xs text-emerald-800 font-bold block mb-1">সক্রিয় শিক্ষার্থী</span>
                  <span className="text-2xl font-black text-emerald-600">
                    {studentsList.filter((s) => s.status === 'active').length} জন
                  </span>
                </div>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm text-center">
                  <span className="text-xs text-amber-800 font-bold block mb-1">স্থগিত শিক্ষার্থী</span>
                  <span className="text-2xl font-black text-amber-600">
                    {studentsList.filter((s) => s.status === 'suspended').length} জন
                  </span>
                </div>
                <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 shadow-sm text-center">
                  <span className="text-xs text-rose-800 font-bold block mb-1">নিষিদ্ধ শিক্ষার্থী</span>
                  <span className="text-2xl font-black text-rose-600">
                    {studentsList.filter((s) => s.status === 'banned').length} জন
                  </span>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  <div className="relative min-w-[220px]">
                    <FaSearch className="w-3.5 h-3.5 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      placeholder="নাম, ফোন বা ইমেইল দিয়ে সার্চ..."
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                    />
                  </div>

                  <select
                    value={studentBatchFilter}
                    onChange={(e) => setStudentBatchFilter(e.target.value)}
                    className="py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  >
                    <option value="all">সকল ব্যাচ</option>
                    <option value="৪৭তম বিসিএস বুলেট ব্যাচ">৪৭তম বিসিএস বুলেট ব্যাচ</option>
                    <option value="প্রাইমারি শিক্ষক নিয়োগ স্পেশাল">প্রাইমারি শিক্ষক নিয়োগ</option>
                    <option value="১৯তম NTRCA শিক্ষক নিবন্ধন">১৯তম NTRCA নিবন্ধন</option>
                    <option value="কম্বাইন্ড ব্যাংক অফিসার প্রিলি">ব্যাংক অফিসার প্রিলি</option>
                  </select>

                  <select
                    value={studentStatusFilter}
                    onChange={(e) => setStudentStatusFilter(e.target.value)}
                    className="py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  >
                    <option value="all">সকল স্ট্যাটাস</option>
                    <option value="active">সক্রিয় (Active)</option>
                    <option value="suspended">স্থগিত (Suspended)</option>
                    <option value="banned">নিষিদ্ধ (Banned)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportStudentsCSV}
                    className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <FaDownload className="w-3 h-3" />
                    <span>CSV এক্সপোর্ট</span>
                  </button>

                  <button
                    onClick={() => setIsAddStudentOpen(true)}
                    className="px-4 py-2.5 rounded-2xl bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                  >
                    <FaUserPlus className="w-3.5 h-3.5" />
                    <span>নতুন শিক্ষার্থী যোগ</span>
                  </button>
                </div>
              </div>

              {/* Students Data Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-black border-b border-slate-100">
                      <tr>
                        <th className="py-3.5 px-4">শিক্ষার্থীর নাম ও যোগাযোগ</th>
                        <th className="py-3.5 px-4">টার্গেট ব্যাচ ও রোল</th>
                        <th className="py-3.5 px-4 text-center">পরীক্ষা সংখ্যা</th>
                        <th className="py-3.5 px-4 text-center">গড় স্কোর %</th>
                        <th className="py-3.5 px-4 text-center">নির্ভুলতা</th>
                        <th className="py-3.5 px-4">যোগদান</th>
                        <th className="py-3.5 px-4">স্ট্যাটাস</th>
                        <th className="py-3.5 px-4 text-right">পদক্ষেপ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.map((std) => (
                        <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#007bff] font-bold flex items-center justify-center text-xs shrink-0">
                                {std.name.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block">{std.name}</span>
                                <span className="text-[11px] text-slate-400 font-mono">{std.phone}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-800 block">{std.batch}</span>
                            <span className="text-[10px] text-blue-600 font-bold uppercase">{std.role}</span>
                          </td>

                          <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                            {std.examsTaken} টি
                          </td>

                          <td className="py-3.5 px-4 text-center font-black text-slate-900">
                            {std.avgScore}%
                          </td>

                          <td className="py-3.5 px-4 text-center font-bold text-purple-600">
                            {std.accuracy}%
                          </td>

                          <td className="py-3.5 px-4 text-slate-500">{std.joinedDate}</td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                std.status === 'active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : std.status === 'suspended'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {std.status === 'active'
                                ? 'সক্রিয়'
                                : std.status === 'suspended'
                                ? 'স্থগিত'
                                : 'নিষিদ্ধ'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedStudentForProfile(std)}
                                className="p-1.5 rounded-lg text-[#007bff] hover:bg-blue-50 transition-colors"
                                title="প্রোফাইল ও পরীক্ষার ইতিহাস দেখুন"
                              >
                                <FaEye className="w-3.5 h-3.5" />
                              </button>

                              {std.status === 'active' ? (
                                <button
                                  onClick={() => handleToggleStudentStatus(std.id, 'suspended')}
                                  className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                                  title="স্থগিত করুন"
                                >
                                  <FaBan className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleToggleStudentStatus(std.id, 'active')}
                                  className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                                  title="সক্রিয় করুন"
                                >
                                  <FaCheckCircle className="w-3.5 h-3.5" />
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteStudent(std.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                title="মুছে ফেলুন"
                              >
                                <FaTrash className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Student Profile & History Modal */}
              {selectedStudentForProfile && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#007bff] font-extrabold flex items-center justify-center text-lg shadow-inner">
                          {selectedStudentForProfile.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-lg">
                            {selectedStudentForProfile.name}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {selectedStudentForProfile.phone} • {selectedStudentForProfile.batch}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStudentForProfile(null)}
                        className="text-slate-400 hover:text-slate-700 p-1"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>

                    {/* Stats Strip */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-blue-50/80 p-3.5 rounded-2xl border border-blue-100 text-center">
                        <span className="text-[11px] text-slate-500 block mb-0.5">মোট পরীক্ষা</span>
                        <strong className="text-xl font-black text-[#007bff]">{selectedStudentForProfile.examsTaken} টি</strong>
                      </div>
                      <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-100 text-center">
                        <span className="text-[11px] text-slate-500 block mb-0.5">গড় স্কোর</span>
                        <strong className="text-xl font-black text-emerald-600">{selectedStudentForProfile.avgScore}%</strong>
                      </div>
                      <div className="bg-purple-50/80 p-3.5 rounded-2xl border border-purple-100 text-center">
                        <span className="text-[11px] text-slate-500 block mb-0.5">নির্ভুলতার হার</span>
                        <strong className="text-xl font-black text-purple-600">{selectedStudentForProfile.accuracy}%</strong>
                      </div>
                    </div>

                    {/* Exam Attempts History */}
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-800 mb-3 flex items-center gap-2">
                        <FaAward className="w-4 h-4 text-[#007bff]" />
                        <span>শিক্ষার্থীর পরীক্ষা গ্রহণের বিস্তারিত হিস্ট্রি:</span>
                      </h4>

                      {selectedStudentForProfile.history && selectedStudentForProfile.history.length > 0 ? (
                        <div className="space-y-2.5">
                          {selectedStudentForProfile.history.map((hist, hIdx) => (
                            <div
                              key={hIdx}
                              className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                            >
                              <div>
                                <strong className="text-slate-900 block">{hist.examTitle}</strong>
                                <span className="text-slate-500 text-[11px]">{hist.date}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-black text-slate-900 block">
                                  {hist.score} / {hist.total} ({hist.accuracy}%)
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    hist.isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}
                                >
                                  {hist.isPassed ? 'উত্তীর্ণ' : 'অনুত্তীর্ণ'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                          এখনও কোনো পরীক্ষা সম্পন্ন করেননি।
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => setSelectedStudentForProfile(null)}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl"
                      >
                        বন্ধ করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Student Modal */}
              {isAddStudentOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="font-bold text-slate-900 text-base">নতুন শিক্ষার্থী যুক্ত করুন</h3>
                      <button onClick={() => setIsAddStudentOpen(false)} className="text-slate-400 hover:text-slate-700">
                        <FaTimes size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleCreateStudent} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষার্থীর পূর্ণ নাম *</label>
                        <input
                          type="text"
                          required
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                          placeholder="যেমন: সায়েম আহমেদ"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল ফোন নম্বর *</label>
                        <input
                          type="text"
                          required
                          value={newStudentPhone}
                          onChange={(e) => setNewStudentPhone(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                        <input
                          type="email"
                          value={newStudentEmail}
                          onChange={(e) => setNewStudentEmail(e.target.value)}
                          placeholder="student@gmail.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">টার্গেট ব্যাচ *</label>
                        <select
                          value={newStudentBatch}
                          onChange={(e) => setNewStudentBatch(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        >
                          <option value="৪৭তম বিসিএস বুলেট ব্যাচ">৪৭তম বিসিএস বুলেট ব্যাচ</option>
                          <option value="প্রাইমারি শিক্ষক নিয়োগ স্পেশাল">প্রাইমারি শিক্ষক নিয়োগ স্পেশাল</option>
                          <option value="১৯তম NTRCA শিক্ষক নিবন্ধন">১৯তম NTRCA শিক্ষক নিবন্ধন</option>
                          <option value="কম্বাইন্ড ব্যাংক অফিসার প্রিলি">কম্বাইন্ড ব্যাংক অফিসার প্রিলি</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">রোল / টাইপ</label>
                        <select
                          value={newStudentRole}
                          onChange={(e) => setNewStudentRole(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        >
                          <option value="student">শিক্ষার্থী (Student)</option>
                          <option value="moderator">মডারেটর (Moderator)</option>
                          <option value="instructor">ইন্সট্রাক্টর (Instructor)</option>
                        </select>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddStudentOpen(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-xl text-xs font-bold shadow"
                        >
                          শিক্ষার্থী সেভ করুন
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: EXAM MANAGEMENT SYSTEM                            */}
          {/* ========================================================= */}
          {activeTab === 'exams' && (
            <div className="space-y-5">
              
              {/* Header Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative min-w-[200px]">
                    <FaSearch className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={examSearch}
                      onChange={(e) => setExamSearch(e.target.value)}
                      placeholder="পরীক্ষা অনুসন্ধান করুন..."
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                    />
                  </div>

                  <select
                    value={examCategoryFilter}
                    onChange={(e) => setExamCategoryFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  >
                    <option value="all">সকল ক্যাটাগরি</option>
                    <option value="bcs">বিসিএস (BCS)</option>
                    <option value="primary">প্রাইমারি (Primary)</option>
                    <option value="bank">ব্যাংক (Bank)</option>
                    <option value="ntrca">নিবন্ধন (NTRCA)</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setEditingExam(null);
                    setNewExamTitle('');
                    setIsAddExamOpen(true);
                  }}
                  className="bg-[#007bff] hover:bg-[#0056b3] text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <FaPlus className="w-3 h-3" />
                  <span>নতুন পরীক্ষা তৈরি করুন</span>
                </button>
              </div>

              {/* Exams Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-black border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">পরীক্ষার নাম</th>
                        <th className="py-3 px-4">ক্যাটাগরি</th>
                        <th className="py-3 px-4">ব্যাচ</th>
                        <th className="py-3 px-4 text-center">প্রশ্ন সংখ্যা</th>
                        <th className="py-3 px-4 text-center">সময়</th>
                        <th className="py-3 px-4 text-center">পাস মার্ক</th>
                        <th className="py-3 px-4 text-center">নেগেটিভ মার্ক</th>
                        <th className="py-3 px-4">স্ট্যাটাস</th>
                        <th className="py-3 px-4 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredExams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900">{exam.title}</td>
                          <td className="py-3.5 px-4">
                            <span className="text-[10px] font-bold bg-blue-50 text-[#007bff] px-2.5 py-0.5 rounded-full uppercase">
                              {exam.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{exam.batchName}</td>
                          <td className="py-3.5 px-4 text-center font-bold">{exam.totalQuestions} টি</td>
                          <td className="py-3.5 px-4 text-center font-semibold">{exam.durationMinutes} মি.</td>
                          <td className="py-3.5 px-4 text-center font-bold text-emerald-600">{exam.passMarks}</td>
                          <td className="py-3.5 px-4 text-center font-bold text-rose-600">-{exam.negativeMark}</td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleToggleExamLive(exam.id)}
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                                exam.isLive
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {exam.isLive ? '● লাইভ' : '○ ড্রাফট'}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditExam(exam)}
                                className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                                title="এডিট করুন"
                              >
                                <FaEdit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDuplicateExam(exam)}
                                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                                title="ডুপ্লিকেট করুন"
                              >
                                <FaCopy className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteExam(exam.id)}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                                title="মুছে ফেলুন"
                              >
                                <FaTrash className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add/Edit Exam Modal */}
              {isAddExamOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="font-bold text-slate-900 text-base">
                        {editingExam ? 'পরীক্ষা সম্পাদনা করুন' : 'নতুন পরীক্ষা তৈরি করুন'}
                      </h3>
                      <button onClick={() => setIsAddExamOpen(false)} className="text-slate-400 hover:text-slate-700">
                        <FaTimes size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleCreateOrUpdateExam} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">পরীক্ষার শিরোনাম *</label>
                        <input
                          type="text"
                          required
                          value={newExamTitle}
                          onChange={(e) => setNewExamTitle(e.target.value)}
                          placeholder="যেমন: ৪৭তম বিসিএস বাংলা ভাষা ও সাহিত্য স্পেশাল"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                          <select
                            value={newExamCategory}
                            onChange={(e) => setNewExamCategory(e.target.value as any)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          >
                            <option value="bcs">বিসিএস (BCS)</option>
                            <option value="primary">প্রাইমারি শিক্ষক নিয়োগ</option>
                            <option value="ntrca">শিক্ষক নিবন্ধন (NTRCA)</option>
                            <option value="bank">ব্যাংক জবস</option>
                            <option value="general">সাধারণ মডেল টেস্ট</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">টার্গেট ব্যাচ</label>
                          <input
                            type="text"
                            value={newExamBatch}
                            onChange={(e) => setNewExamBatch(e.target.value)}
                            placeholder="ব্যাচের নাম"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">প্রশ্ন সংখ্যা</label>
                          <input
                            type="number"
                            value={newExamQuestions}
                            onChange={(e) => setNewExamQuestions(e.target.value)}
                            className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">সময় (মি.)</label>
                          <input
                            type="number"
                            value={newExamDuration}
                            onChange={(e) => setNewExamDuration(e.target.value)}
                            className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">পাস মার্ক</label>
                          <input
                            type="number"
                            value={newExamPassMark}
                            onChange={(e) => setNewExamPassMark(e.target.value)}
                            className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">নেগেটিভ</label>
                          <input
                            type="text"
                            value={newExamNegativeMark}
                            onChange={(e) => setNewExamNegativeMark(e.target.value)}
                            className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddExamOpen(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-xl text-xs font-bold shadow"
                        >
                          {editingExam ? 'আপডেট করুন' : 'তৈরি করুন'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: QUESTION BANK MANAGEMENT                           */}
          {/* ========================================================= */}
          {activeTab === 'questions' && (
            <div className="space-y-5">
              
              {/* Header Filters & Add Question */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  <div className="relative min-w-[200px]">
                    <FaSearch className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={questionSearch}
                      onChange={(e) => setQuestionSearch(e.target.value)}
                      placeholder="প্রশ্ন বা ব্যাখ্যা খুঁজুন..."
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                    />
                  </div>

                  <select
                    value={questionSubjectFilter}
                    onChange={(e) => setQuestionSubjectFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  >
                    <option value="all">সকল বিষয়</option>
                    <option value="বাংলা সাহিত্য ও ব্যাকরণ">বাংলা সাহিত্য ও ব্যাকরণ</option>
                    <option value="ইংরেজি ব্যাকরণ ও সাহিত্য">ইংরেজি ব্যাকরণ ও সাহিত্য</option>
                    <option value="গণিত ও মানসিক দক্ষতা">গণিত ও মানসিক দক্ষতা</option>
                    <option value="বাংলাদেশ বিষয়াবলী">বাংলাদেশ বিষয়াবলী</option>
                    <option value="আন্তর্জাতিক বিষয়াবলী">আন্তর্জাতিক বিষয়াবলী</option>
                    <option value="সাধারণ বিজ্ঞান ও আইসিটি">সাধারণ বিজ্ঞান ও আইসিটি</option>
                  </select>

                  <select
                    value={questionDifficultyFilter}
                    onChange={(e) => setQuestionDifficultyFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  >
                    <option value="all">সকল কাঠিন্য স্তর</option>
                    <option value="easy">সহজ (Easy)</option>
                    <option value="medium">মাঝারি (Medium)</option>
                    <option value="hard">কঠিন (Hard)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleImportSampleQuestions}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    নমুনা প্রশ্ন ইম্পোর্ট
                  </button>

                  <button
                    onClick={() => {
                      setEditingQuestion(null);
                      setNewQText('');
                      setNewQOp1('');
                      setNewQOp2('');
                      setNewQOp3('');
                      setNewQOp4('');
                      setNewQExplanation('');
                      setIsAddQuestionOpen(true);
                    }}
                    className="bg-[#007bff] hover:bg-[#0056b3] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <FaPlus className="w-3 h-3" />
                    <span>প্রশ্ন যোগ করুন</span>
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {filteredQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative group hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#007bff] px-3 py-0.5 rounded-full border border-blue-200">
                          {q.subject}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            q.difficulty === 'easy'
                              ? 'bg-emerald-100 text-emerald-800'
                              : q.difficulty === 'hard'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {q.difficulty === 'easy' ? 'সহজ' : q.difficulty === 'hard' ? 'কঠিন' : 'মাঝারি'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditQuestion(q)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="সম্পাদনা করুন"
                        >
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                          title="মুছে ফেলুন"
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="font-bold text-slate-900 text-sm sm:text-base mb-3 leading-relaxed">
                      {idx + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {q.options.map((op, opIdx) => (
                        <div
                          key={opIdx}
                          className={`p-2.5 rounded-xl text-xs flex items-center gap-2.5 ${
                            opIdx === q.correctAnswer
                              ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-300'
                              : 'bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                              opIdx === q.correctAnswer
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {opIdx + 1}
                          </span>
                          <span>{op}</span>
                          {opIdx === q.correctAnswer && <span className="text-[10px] text-emerald-700 font-extrabold ml-auto">(সঠিক)</span>}
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <strong className="text-[#007bff]">ব্যাখ্যা ও রেফারেন্স: </strong>
                      {q.explanation}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Question Modal */}
              {isAddQuestionOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="font-bold text-slate-900 text-base">
                        {editingQuestion ? 'প্রশ্ন সম্পাদনা করুন' : 'নতুন প্রশ্ন যুক্ত করুন'}
                      </h3>
                      <button onClick={() => setIsAddQuestionOpen(false)} className="text-slate-400 hover:text-slate-700">
                        <FaTimes size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleCreateOrUpdateQuestion} className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">বিষয় *</label>
                          <select
                            value={newQSubject}
                            onChange={(e) => setNewQSubject(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          >
                            <option value="বাংলা সাহিত্য ও ব্যাকরণ">বাংলা সাহিত্য ও ব্যাকরণ</option>
                            <option value="ইংরেজি ব্যাকরণ ও সাহিত্য">ইংরেজি ব্যাকরণ ও সাহিত্য</option>
                            <option value="গণিত ও মানসিক দক্ষতা">গণিত ও মানসিক দক্ষতা</option>
                            <option value="বাংলাদেশ বিষয়াবলী">বাংলাদেশ বিষয়াবলী</option>
                            <option value="আন্তর্জাতিক বিষয়াবলী">আন্তর্জাতিক বিষয়াবলী</option>
                            <option value="সাধারণ বিজ্ঞান ও আইসিটি">সাধারণ বিজ্ঞান ও আইসিটি</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">কাঠিন্য স্তর</label>
                          <select
                            value={newQDifficulty}
                            onChange={(e) => setNewQDifficulty(e.target.value as any)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          >
                            <option value="easy">সহজ (Easy)</option>
                            <option value="medium">মাঝারি (Medium)</option>
                            <option value="hard">কঠিন (Hard)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">প্রশ্নটি লিখুন *</label>
                        <textarea
                          required
                          rows={2}
                          value={newQText}
                          onChange={(e) => setNewQText(e.target.value)}
                          placeholder="এখানে প্রশ্ন টাইপ করুন..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-700">৪টি বিকল্প অপশন লিখুন *</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="অপশন ১"
                            value={newQOp1}
                            onChange={(e) => setNewQOp1(e.target.value)}
                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                          <input
                            type="text"
                            required
                            placeholder="অপশন ২"
                            value={newQOp2}
                            onChange={(e) => setNewQOp2(e.target.value)}
                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                          <input
                            type="text"
                            placeholder="অপশন ৩"
                            value={newQOp3}
                            onChange={(e) => setNewQOp3(e.target.value)}
                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                          <input
                            type="text"
                            placeholder="অপশন ৪"
                            value={newQOp4}
                            onChange={(e) => setNewQOp4(e.target.value)}
                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">সঠিক উত্তর নির্বাচন করুন</label>
                        <select
                          value={newQCorrect}
                          onChange={(e) => setNewQCorrect(parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900"
                        >
                          <option value={0}>অপশন ১</option>
                          <option value={1}>অপশন ২</option>
                          <option value={2}>অপশন ৩</option>
                          <option value={3}>অপশন ৪</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">বিস্তারিত ব্যাখ্যা ও তথ্যসূত্র</label>
                        <textarea
                          rows={2}
                          value={newQExplanation}
                          onChange={(e) => setNewQExplanation(e.target.value)}
                          placeholder="ব্যাখ্যা ও তথ্যসূত্র প্রদান করুন..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddQuestionOpen(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-xl text-xs font-bold shadow"
                        >
                          {editingQuestion ? 'আপডেট করুন' : 'প্রশ্ন যোগ করুন'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: RESULTS & LIVE MERIT LIST (NEW DEDICATED TAB)     */}
          {/* ========================================================= */}
          {activeTab === 'results' && (
            <div className="space-y-5">
              
              {/* Filter & Export Bar */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  <div className="relative min-w-[200px]">
                    <FaSearch className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={resultSearch}
                      onChange={(e) => setResultSearch(e.target.value)}
                      placeholder="শিক্ষার্থীর নাম বা রোল দিয়ে খুঁজুন..."
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                    />
                  </div>

                  <select
                    value={resultExamFilter}
                    onChange={(e) => setResultExamFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  >
                    <option value="all">সকল পরীক্ষার ফলাফল</option>
                    <option value="bcs-1">৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১</option>
                    <option value="primary-mock-1">প্রাইমারি শিক্ষক নিয়োগ মডেল টেস্ট - ০১</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    let csv = 'Rank,Name,Phone,Batch,Exam,Score,Total,Accuracy,TimeSpent,Status\n';
                    resultsList.forEach((r) => {
                      csv += `${r.rank},"${r.studentName}","${r.studentPhone}","${r.batch}","${r.examTitle}",${r.score},${r.totalMarks},${r.accuracy},"${r.timeSpent}","${r.isPassed ? 'Passed' : 'Failed'}"\n`;
                    });
                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `exam-seba-merit-list-${Date.now()}.csv`;
                    a.click();
                    showToast(isBn ? 'মেধা তালিকা CSV ডাউনলোড শুরু হয়েছে!' : 'Merit List CSV downloaded!');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
                >
                  <FaDownload className="w-3.5 h-3.5" />
                  <span>অফিসিয়াল মেধা তালিকা ডাউনলোড</span>
                </button>
              </div>

              {/* Merit List Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-black border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">মেধা স্থান</th>
                        <th className="py-3 px-4">শিক্ষার্থীর নাম</th>
                        <th className="py-3 px-4">টার্গেট ব্যাচ</th>
                        <th className="py-3 px-4">পরীক্ষার নাম</th>
                        <th className="py-3 px-4 text-center">স্কোর</th>
                        <th className="py-3 px-4 text-center">নির্ভুলতা</th>
                        <th className="py-3 px-4 text-center">সময় ব্যয়</th>
                        <th className="py-3 px-4">ফলাফল</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredResults.map((res) => (
                        <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-black">
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${
                                res.rank === 1
                                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                                  : res.rank === 2
                                  ? 'bg-slate-200 text-slate-900'
                                  : res.rank === 3
                                  ? 'bg-amber-700/20 text-amber-900'
                                  : 'bg-blue-50 text-[#007bff]'
                              }`}
                            >
                              #{res.rank}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {res.studentName}
                            <span className="block text-[11px] text-slate-400 font-mono">{res.studentPhone}</span>
                          </td>

                          <td className="py-3.5 px-4 text-slate-700">{res.batch}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{res.examTitle}</td>
                          <td className="py-3.5 px-4 text-center font-black text-slate-900">
                            {res.score} / {res.totalMarks}
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold text-purple-600">{res.accuracy}%</td>
                          <td className="py-3.5 px-4 text-center text-slate-500 font-mono">{res.timeSpent}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                res.isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {res.isPassed ? 'উত্তীর্ণ' : 'অনুত্তীর্ণ'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: NOTICES & CIRCULARS BOARD                         */}
          {/* ========================================================= */}
          {activeTab === 'notices' && (
            <div className="space-y-5">
              
              <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">ওয়েবসাইট নোটিশ বোর্ড ও জরুরি এলার্ট</h3>
                  <p className="text-xs text-slate-500">শিক্ষার্থীদের জন্য রুটিন ও পরীক্ষার বিজ্ঞপ্তি প্রকাশ করুন</p>
                </div>
                <button
                  onClick={() => setIsAddNoticeOpen(true)}
                  className="bg-[#007bff] hover:bg-[#0056b3] text-white px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <FaPlus className="w-3 h-3" />
                  <span>নতুন নোটিশ পোস্ট করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {noticesList.map((not) => (
                  <div
                    key={not.id}
                    className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold bg-blue-50 text-[#007bff] px-2.5 py-0.5 rounded-full">
                          {not.category}
                        </span>
                        {not.isUrgent && (
                          <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full animate-pulse">
                            জরুরি নোটিশ
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{not.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">{not.content}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>{not.date}</span>
                      <button
                        onClick={() => handleDeleteNotice(not.id)}
                        className="text-rose-500 hover:text-rose-700 font-bold"
                      >
                        মুছে ফেলুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Notice Modal */}
              {isAddNoticeOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="font-bold text-slate-900 text-base">নতুন নোটিশ প্রকাশ করুন</h3>
                      <button onClick={() => setIsAddNoticeOpen(false)} className="text-slate-400 hover:text-slate-700">
                        <FaTimes size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleCreateNotice} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">নোটিশ শিরোনাম *</label>
                        <input
                          type="text"
                          required
                          value={newNoticeTitle}
                          onChange={(e) => setNewNoticeTitle(e.target.value)}
                          placeholder="যেমন: ৪৭তম বিসিএস মেগা মডেল টেস্ট রুটিন"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                        <select
                          value={newNoticeCategory}
                          onChange={(e) => setNewNoticeCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        >
                          <option value="সাধারণ নোটিশ">সাধারণ নোটিশ</option>
                          <option value="বিসিএস পরীক্ষা">বিসিএস পরীক্ষা</option>
                          <option value="প্রাইমারি শিক্ষক">প্রাইমারি শিক্ষক</option>
                          <option value="রুটিন আপডেট">রুটিন আপডেট</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">বিস্তারিত বিবরণ *</label>
                        <textarea
                          required
                          rows={3}
                          value={newNoticeContent}
                          onChange={(e) => setNewNoticeContent(e.target.value)}
                          placeholder="নোটিশের বিস্তারিত টেক্সট লিখুন..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="urgentNoticeCheck"
                          checked={newNoticeUrgent}
                          onChange={(e) => setNewNoticeUrgent(e.target.checked)}
                          className="rounded text-rose-600 focus:ring-rose-400 w-3.5 h-3.5"
                        />
                        <label htmlFor="urgentNoticeCheck" className="text-xs font-bold text-rose-600 cursor-pointer">
                          জরুরি নোটিশ হিসেবে চিহ্নিত করুন (টপ ব্যানারে শো হবে)
                        </label>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddNoticeOpen(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-xl text-xs font-bold shadow"
                        >
                          প্রকাশ করুন
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: SYSTEM SETTINGS & PLATFORM CONFIGS                 */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-slate-900">প্ল্যাটফর্ম সেটিংস ও ডাটাবেস ব্যাকআপ</h3>
                <p className="text-xs text-slate-500 mt-1">
                  সাইটের বৈশ্বিক কনফিগারেশন, নেগেটিভ মার্কিং স্ট্যান্ডার্ড ও সিস্টেম ব্যাকআপ নিয়ন্ত্রণ
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্ল্যাটফর্মের নাম</label>
                  <input
                    type="text"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সাপোর্ট হেল্পলাইন</label>
                  <input
                    type="text"
                    value={helplineNumber}
                    onChange={(e) => setHelplineNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ডিফল্ট নেগেটিভ মার্কিং হার (প্রতি ভুল উত্তরে)
                  </label>
                  <select
                    value={negativeMarkingValue}
                    onChange={(e) => setNegativeMarkingValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold"
                  >
                    <option value="0.25">০.২৫ (বিসিএস ও প্রাইমারি স্ট্যান্ডার্ড)</option>
                    <option value="0.50">০.৫০ (ব্যাংক ও মন্ত্রণালয় স্ট্যান্ডার্ড)</option>
                    <option value="0.00">০.০০ (নেগেটিভ মার্কিং নেই)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">স্বয়ংক্রিয় ফলাফল মূল্যায়ন (Auto-Evaluation)</p>
                    <p className="text-[11px] text-slate-500">পরীক্ষা সাবমিট করার সাথে সাথেই তাৎক্ষণিক ফলাফল প্রকাশ হবে</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoEvaluateMode}
                    onChange={(e) => setAutoEvaluateMode(e.target.checked)}
                    className="w-4 h-4 text-[#007bff] rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">নতুন শিক্ষার্থী রেজিস্ট্রেশন চালু</p>
                    <p className="text-[11px] text-slate-500">অনলাইনে নতুন শিক্ষার্থীরা রেজিস্ট্রেশন করতে পারবে</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={studentRegistrationOpen}
                    onChange={(e) => setStudentRegistrationOpen(e.target.checked)}
                    className="w-4 h-4 text-[#007bff] rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">মেইনটেন্যান্স মোড</p>
                    <p className="text-[11px] text-slate-500">চালু থাকলে সাধারণ শিক্ষার্থীরা পরীক্ষার সাইটে প্রবেশ করতে পারবে না</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500" />
                  </label>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <FaDownload className="w-3.5 h-3.5" />
                    <span>সম্পূর্ণ ডাটাবেস ব্যাকআপ ডাউনলোড</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!')}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-2xl text-xs font-bold shadow"
                  >
                    সেটিংস সেভ করুন
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}
