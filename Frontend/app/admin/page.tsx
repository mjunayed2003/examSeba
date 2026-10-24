'use client';

import React, { useState, useSyncExternalStore } from 'react';
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
} from 'react-icons/fa';
import { HiBars3 } from 'react-icons/hi2';
import ExamSebaLogo from '../components/ExamSebaLogo';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_EXAMS, Exam } from '../data/examData';

interface AdminQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AdminStudent {
  id: string;
  name: string;
  phone: string;
  batch: string;
  joinedDate: string;
  status: 'active' | 'suspended';
  examsTaken: number;
}

interface AdminNotice {
  id: string;
  title: string;
  category: string;
  date: string;
  isUrgent: boolean;
  content: string;
}

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

  // Admin Auth State via useSyncExternalStore
  const adminRaw = useSyncExternalStore(subscribeAdmin, getAdminSnapshot, getServerAdminSnapshot);
  const adminUser: { name: string; email: string; role: string } | null = adminRaw ? JSON.parse(adminRaw) : null;
  const isAdminLoggedIn = !!adminUser;

  const [adminInputEmail, setAdminInputEmail] = useState('');
  const [adminInputPassword, setAdminInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'exams' | 'questions' | 'students' | 'notices' | 'settings'>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // State: Exams
  const [examsList, setExamsList] = useState<Exam[]>(SAMPLE_EXAMS);
  const [examSearch, setExamSearch] = useState('');
  const [examCategoryFilter, setExamCategoryFilter] = useState('all');
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamCategory, setNewExamCategory] = useState<'bcs' | 'primary' | 'ntrca' | 'bank' | 'general' | 'subject'>('bcs');
  const [newExamQuestions, setNewExamQuestions] = useState('100');
  const [newExamDuration, setNewExamDuration] = useState('60');
  const [newExamPassMark, setNewExamPassMark] = useState('50');

  // State: Questions
  const [questionsList, setQuestionsList] = useState<AdminQuestion[]>([
    {
      id: 'q-1',
      subject: 'বাংলা সাহিত্য ও ব্যাকরণ',
      question: "'কবর' নাটকটির রচয়িতা কে?",
      options: ['মুনীর চৌধুরী', 'শামসুর রাহমান', 'জসীম উদ্দীন', 'কাজী নজরুল ইসলাম'],
      correctAnswer: 0,
      explanation: 'মুনীর চৌধুরী ১৯৫২ সালের ভাষা আন্দোলনের পটভূমিতে ঢাকা কেন্দ্রীয় কারাগারে এই নাটকটি রচনা করেন।',
    },
    {
      id: 'q-2',
      subject: 'ইংরেজি ব্যাকরণ ও সাহিত্য',
      question: "Identify the word that remains unchanged in its plural form:",
      options: ['Deer', 'Ox', 'Foot', 'Mouse'],
      correctAnswer: 0,
      explanation: "'Deer', 'Sheep', 'Species' ইত্যাদি শব্দের সিঙ্গুলার ও প্লুরাল উভয় রূপ একই থাকে।",
    },
    {
      id: 'q-3',
      subject: 'গণিত ও মানসিক দক্ষতা',
      question: 'যদি x + y = 7 এবং xy = 10 হয়, তবে x² + y² এর মান কত?',
      options: ['29', '39', '49', '59'],
      correctAnswer: 0,
      explanation: 'x² + y² = (x + y)² - 2xy = (7)² - 2(10) = 49 - 20 = 29।',
    },
    {
      id: 'q-4',
      subject: 'বাংলাদেশ বিষয়াবলী',
      question: 'বাংলাদেশের সংবিধান কত তারিখে গণপরিষদে গৃহীত হয়?',
      options: ['৪ নভেম্বর ১৯৭২', '১৬ ডিসেম্বর ১৯৭২', '২৬ মার্চ ১৯৭২', '১৭ এপ্রিল ১৯৭২'],
      correctAnswer: 0,
      explanation: '১৯৭২ সালের ৪ নভেম্বর গণপরিষদে বাংলাদেশের সংবিধান গৃহীত হয় এবং ১৬ ডিসেম্বর থেকে কার্যকর হয়।',
    },
    {
      id: 'q-5',
      subject: 'আন্তর্জাতিক বিষয়াবলী',
      question: 'জাতিসংঘের টেকসই উন্নয়ন লক্ষ্যমাত্রা (SDG) এর মোট গোল বা লক্ষ্য কয়টি?',
      options: ['১৭টি', '১৫টি', '১৯টি', '২১টি'],
      correctAnswer: 0,
      explanation: 'SDG এর মোট ১৭টি মূল লক্ষ্যমাত্রা এবং ১৬৯টি সুনির্দিষ্ট টার্গেট রয়েছে।',
    },
  ]);
  const [questionSearch, setQuestionSearch] = useState('');
  const [questionSubjectFilter, setQuestionSubjectFilter] = useState('all');
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [newQSubject, setNewQSubject] = useState('বাংলা সাহিত্য ও ব্যাকরণ');
  const [newQText, setNewQText] = useState('');
  const [newQOp1, setNewQOp1] = useState('');
  const [newQOp2, setNewQOp2] = useState('');
  const [newQOp3, setNewQOp3] = useState('');
  const [newQOp4, setNewQOp4] = useState('');
  const [newQCorrect, setNewQCorrect] = useState(0);
  const [newQExplanation, setNewQExplanation] = useState('');

  // State: Students
  const [studentsList, setStudentsList] = useState<AdminStudent[]>([
    {
      id: 'std-1',
      name: 'আব্দুল্লাহ আল মামুন',
      phone: '01712345678',
      batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
      joinedDate: '১২ সেপ্টেম্বর ২০২৬',
      status: 'active',
      examsTaken: 28,
    },
    {
      id: 'std-2',
      name: 'নুসরাত জাহান তামান্না',
      phone: '01887654321',
      batch: 'প্রাইমারি শিক্ষক নিয়োগ স্পেশাল',
      joinedDate: '১৫ সেপ্টেম্বর ২০২৬',
      status: 'active',
      examsTaken: 19,
    },
    {
      id: 'std-3',
      name: 'শাকিল আহমেদ',
      phone: '01991234567',
      batch: '১৯তম NTRCA শিক্ষক নিবন্ধন',
      joinedDate: '০১ অক্টোবর ২০২৬',
      status: 'active',
      examsTaken: 14,
    },
    {
      id: 'std-4',
      name: 'ফাতিমা তুজ জোহরা',
      phone: '01619876543',
      batch: 'কম্বাইন্ড ব্যাংক অফিসার প্রিলি',
      joinedDate: '০৫ অক্টোবর ২০২৬',
      status: 'active',
      examsTaken: 22,
    },
    {
      id: 'std-5',
      name: 'মেহেদী হাসান রনি',
      phone: '01551239874',
      batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
      joinedDate: '১০ অক্টোবর ২০২৬',
      status: 'suspended',
      examsTaken: 4,
    },
  ]);
  const [studentSearch, setStudentSearch] = useState('');

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

  // Exam Actions
  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;

    const totalQ = parseInt(newExamQuestions) || 100;
    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      title: newExamTitle.trim(),
      category: newExamCategory,
      totalQuestions: totalQ,
      totalMarks: totalQ,
      durationMinutes: parseInt(newExamDuration) || 60,
      negativeMark: 0.25,
      passMarks: parseInt(newExamPassMark) || 50,
      batchName: newExamCategory === 'bcs' ? '৪৭তম বিসিএস বুলেট ব্যাচ' : 'বিশেষ প্রস্তুতি ব্যাচ',
      examDate: isBn ? 'আজ প্রকাশিত' : 'Just published',
      isLive: true,
      questions: SAMPLE_EXAMS[0].questions,
    };

    setExamsList([newExam, ...examsList]);
    setIsAddExamOpen(false);
    setNewExamTitle('');
    showToast(isBn ? 'নতুন পরীক্ষা সফলভাবে তৈরি হয়েছে!' : 'New exam created successfully!');
  };

  const handleDeleteExam = (id: string) => {
    setExamsList(examsList.filter((e) => e.id !== id));
    showToast(isBn ? 'পরীক্ষাটি সফলভাবে মুছে ফেলা হয়েছে' : 'Exam deleted successfully');
  };

  // Question Actions
  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim() || !newQOp1.trim() || !newQOp2.trim()) return;

    const newQ: AdminQuestion = {
      id: `q-${Date.now()}`,
      subject: newQSubject,
      question: newQText.trim(),
      options: [newQOp1.trim(), newQOp2.trim(), newQOp3.trim() || 'অন্যান্য', newQOp4.trim() || 'কোনটিই নয়'],
      correctAnswer: newQCorrect,
      explanation: newQExplanation.trim() || (isBn ? 'সঠিক উত্তর নির্বাচন করা হয়েছে।' : 'Correct answer marked.'),
    };

    setQuestionsList([newQ, ...questionsList]);
    setIsAddQuestionOpen(false);
    setNewQText('');
    setNewQOp1('');
    setNewQOp2('');
    setNewQOp3('');
    setNewQOp4('');
    setNewQExplanation('');
    showToast(isBn ? 'প্রশ্নব্যাংকে নতুন প্রশ্ন যুক্ত হয়েছে!' : 'Question added to question bank!');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestionsList(questionsList.filter((q) => q.id !== id));
    showToast(isBn ? 'প্রশ্নটি মুছে ফেলা হয়েছে' : 'Question removed');
  };

  // Student Actions
  const handleToggleStudentStatus = (id: string) => {
    setStudentsList(
      studentsList.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'active' ? 'suspended' : 'active';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
    showToast(isBn ? 'শিক্ষার্থীর স্ট্যাটাস আপডেট করা হয়েছে' : 'Student status updated');
  };

  // Notice Actions
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;

    const newN: AdminNotice = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle.trim(),
      category: newNoticeCategory,
      date: isBn ? 'আজ' : 'Today',
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

  // Export JSON backup
  const handleExportBackup = () => {
    const backupData = {
      exams: examsList,
      questions: questionsList,
      students: studentsList,
      notices: noticesList,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-seba-backup-${Date.now()}.json`;
    a.click();
    showToast(isBn ? 'ডাটাবেস ব্যাকআপ ডাউনলোড শুরু হয়েছে!' : 'Database backup download started!');
  };

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
            className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border border-white/20"
          >
            <FaArrowLeft className="w-3 h-3" />
            <span>{isBn ? 'মূল সাইটে ফিরুন' : 'Back to Home'}</span>
          </Link>

          <button
            onClick={toggleLang}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1 rounded-full text-xs shadow-md transition-all flex items-center gap-1.5"
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
                {t.admin.adminLoginTitle}
              </h1>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                {t.admin.adminLoginDesc}
              </p>
            </div>

            {/* 1-Click Fast Unlock Super Admin */}
            <div className="mb-5 p-3 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-2xl flex items-center justify-between text-xs">
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
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1.5 rounded-xl shadow transition-transform hover:scale-105"
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
                className="w-full py-3 bg-[#007bff] hover:bg-[#0056b3] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all"
              >
                {isBn ? 'লগইন করে প্রবেশ করুন' : 'Login & Access Console'}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
              <Link href="/login" className="text-blue-400 hover:underline font-semibold">
                {isBn ? 'শিক্ষার্থী লগইন পেজে যেতে চান?' : 'Go to Student Login'}
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto text-center text-xs text-slate-600 py-2">
          © 2026 {isBn ? 'এক্সাম সেবা' : 'Exam Seba'} Admin Console
        </div>
      </div>
    );
  }

  // ==========================================
  // LOGGED IN VIEW: Admin Panel Dashboard
  // ==========================================
  const navTabs = [
    { id: 'overview', label: t.admin.overview, icon: FaChartPie },
    { id: 'exams', label: t.admin.exams, icon: FaFileAlt, badge: examsList.length },
    { id: 'questions', label: t.admin.questions, icon: FaBookOpen, badge: questionsList.length },
    { id: 'students', label: t.admin.students, icon: FaUsers, badge: studentsList.length },
    { id: 'notices', label: t.admin.notices, icon: FaBullhorn, badge: noticesList.length },
    { id: 'settings', label: t.admin.settings, icon: FaCog },
  ];

  const filteredExams = examsList.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(examSearch.toLowerCase());
    const matchesCat = examCategoryFilter === 'all' || e.category.includes(examCategoryFilter);
    return matchesSearch && matchesCat;
  });

  const filteredQuestions = questionsList.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(questionSearch.toLowerCase());
    const matchesSub = questionSubjectFilter === 'all' || q.subject === questionSubjectFilter;
    return matchesSearch && matchesSub;
  });

  const filteredStudents = studentsList.filter((s) => {
    return s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.phone.includes(studentSearch);
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800 selection:bg-[#007bff] selection:text-white">
      
      {/* Toast Notification */}
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
              {isBn ? 'অ্যাডমিন কন্ট্রোল' : 'Admin Console'}
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live v2.0</span>
            </span>
          </div>

          {/* Nav Items */}
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
                      ? 'bg-[#007bff] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
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
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs uppercase shadow">
              {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{adminUser?.name || 'এডমিন'}</p>
              <p className="text-[10px] text-slate-400 truncate">{adminUser?.email || 'admin@examsheba.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
            <Link
              href="/"
              className="flex-1 text-center py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <FaArrowLeft className="w-3 h-3" />
              <span>{t.admin.backToSite}</span>
            </Link>

            <button
              onClick={handleAdminLogout}
              className="py-1.5 px-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
              title={t.admin.logout}
            >
              <FaSignOutAlt className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              <HiBars3 size={24} />
            </button>
            <h2 className="text-base sm:text-lg font-black text-slate-900 capitalize">
              {navTabs.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Live Badge */}
            <div className="hidden md:flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-bold">
              <FaFire className="w-3.5 h-3.5 animate-bounce" />
              <span>{isBn ? '৩টি লাইভ এক্সাম চলমান' : '3 Live Exams Ongoing'}</span>
            </div>

            {/* Language Switch */}
            <button
              onClick={toggleLang}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2.5 py-1 rounded-full text-xs shadow-sm flex items-center gap-1 transition-transform hover:scale-105"
            >
              <span>🌐</span>
              <span>{isBn ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Back to Public Site */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
            >
              <span>{isBn ? 'সাইট প্রিভিউ' : 'Site Preview'}</span>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          
          {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold">{t.admin.totalStudents}</span>
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#007bff] flex items-center justify-center">
                      <FaUsers className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">৫২,৪৩০+</div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      ↑ ১২.৫% {isBn ? 'এই মাসে বৃদ্ধি' : 'Growth this month'}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold">{t.admin.activeExams}</span>
                    <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <FaFileAlt className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">{examsList.length} টি</div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      {isBn ? 'সকল ব্যাচ কভার্ড' : 'All Batches Covered'}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold">{t.admin.questionBankCount}</span>
                    <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <FaBookOpen className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">২৫,৭৫০+</div>
                    <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      {isBn ? 'বিশুদ্ধ পুঙ্খানুপুঙ্খ ব্যাখ্যাসহ' : 'Detailed explanations'}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold">{t.admin.todayRevenue}</span>
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <FaChartPie className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">৳ ৪২,৫০০</div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      {isBn ? '৩৬টি নতুন কোর্স এনরোলমেন্ট' : '36 new enrollments today'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Shortcuts */}
              <div className="bg-gradient-to-r from-[#004085] to-[#007bff] rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black">{isBn ? 'দ্রুত অ্যাকশন গ্রহণ করুন' : 'Quick Admin Actions'}</h3>
                  <p className="text-xs text-blue-100 mt-1">
                    {isBn
                      ? 'নতুন মডেল টেস্ট তৈরি করুন, প্রশ্নব্যাংক আপডেট করুন অথবা জরুরি নোটিশ জারি করুন।'
                      : 'Launch exams, update question banks, or post urgent circulars.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      setActiveTab('exams');
                      setIsAddExamOpen(true);
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
                  >
                    <FaPlus className="w-3 h-3" />
                    <span>{t.admin.createExamBtn}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('questions');
                      setIsAddQuestionOpen(true);
                    }}
                    className="bg-white hover:bg-blue-50 text-[#007bff] font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
                  >
                    <FaPlus className="w-3 h-3" />
                    <span>{t.admin.addQuestionBtn}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('notices');
                      setIsAddNoticeOpen(true);
                    }}
                    className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <FaBullhorn className="w-3 h-3" />
                    <span>{t.admin.postNoticeBtn}</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {isBn ? 'সাম্প্রতিক লাইভ পরীক্ষা সাবমিশন (রিয়েল-টাইম)' : 'Recent Live Exam Submissions (Real-Time)'}
                  </h3>
                  <span className="text-xs text-[#007bff] font-bold">{isBn ? 'লাইভ রিফ্রেশ হচ্ছে' : 'Live Sync'}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-black border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">{isBn ? 'শিক্ষার্থী' : 'Student'}</th>
                        <th className="py-3 px-4">{isBn ? 'পরীক্ষার নাম' : 'Exam Title'}</th>
                        <th className="py-3 px-4">{isBn ? 'স্কোর' : 'Score'}</th>
                        <th className="py-3 px-4">{isBn ? 'ফলাফল' : 'Result'}</th>
                        <th className="py-3 px-4">{isBn ? 'সময়' : 'Timestamp'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">আব্দুল্লাহ আল মামুন</td>
                        <td className="py-3 px-4 text-slate-700">৪৭তম বিসিএস স্পেশাল মডেল টেস্ট - ০১</td>
                        <td className="py-3 px-4 font-black text-slate-800">৯.৫০ / ১০</td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {isBn ? 'উত্তীর্ণ' : 'Passed'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500">১০ মিনিট আগে</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">নুসরাত জাহান</td>
                        <td className="py-3 px-4 text-slate-700">প্রাইমারি শিক্ষক নিয়োগ পূর্ণাঙ্গ মডেল টেস্ট</td>
                        <td className="py-3 px-4 font-black text-slate-800">৮.৭৫ / ১০</td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {isBn ? 'উত্তীর্ণ' : 'Passed'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500">২৫ মিনিট আগে</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">শাকিল আহমেদ</td>
                        <td className="py-3 px-4 text-slate-700">ডেইলি বাংলা ব্যাকরণ কুইজ - ০৩</td>
                        <td className="py-3 px-4 font-black text-slate-800">১০.০০ / ১০</td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {isBn ? 'উত্তীর্ণ' : 'Passed'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500">৪১ মিনিট আগে</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: EXAMS MANAGEMENT ================= */}
          {activeTab === 'exams' && (
            <div className="space-y-5">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <FaSearch className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={examSearch}
                      onChange={(e) => setExamSearch(e.target.value)}
                      placeholder={isBn ? 'পরীক্ষা অনুসন্ধান করুন...' : 'Search exams...'}
                      className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                    />
                  </div>

                  <select
                    value={examCategoryFilter}
                    onChange={(e) => setExamCategoryFilter(e.target.value)}
                    className="py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  >
                    <option value="all">{isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
                    <option value="বিসিএস">{isBn ? 'বিসিএস' : 'BCS'}</option>
                    <option value="প্রাইমারি">{isBn ? 'প্রাইমারি' : 'Primary'}</option>
                    <option value="ব্যাংক">{isBn ? 'ব্যাংক' : 'Bank'}</option>
                    <option value="নিবন্ধন">{isBn ? 'নিবন্ধন' : 'NTRCA'}</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsAddExamOpen(true)}
                  className="bg-[#007bff] hover:bg-[#0056b3] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <FaPlus className="w-3 h-3" />
                  <span>{t.admin.createExamBtn}</span>
                </button>
              </div>

              {/* Exams Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-black border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">{isBn ? 'পরীক্ষার নাম' : 'Exam Title'}</th>
                        <th className="py-3 px-4">{isBn ? 'ক্যাটাগরি' : 'Category'}</th>
                        <th className="py-3 px-4">{isBn ? 'প্রশ্ন' : 'Questions'}</th>
                        <th className="py-3 px-4">{isBn ? 'সময়' : 'Duration'}</th>
                        <th className="py-3 px-4">{isBn ? 'পাস মার্ক' : 'Pass Mark'}</th>
                        <th className="py-3 px-4">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                        <th className="py-3 px-4 text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredExams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                            {exam.title}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="bg-blue-50 text-[#007bff] px-2 py-0.5 rounded-full text-[10px] font-bold">
                              {exam.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold">{exam.totalQuestions} টি</td>
                          <td className="py-3.5 px-4 font-semibold">{exam.durationMinutes} মিনিট</td>
                          <td className="py-3.5 px-4 font-semibold">{exam.passMarks}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                exam.isLive
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {exam.isLive ? (isBn ? 'সক্রিয়' : 'Active') : (isBn ? 'ড্রাফট' : 'Draft')}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteExam(exam.id)}
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title={isBn ? 'ডিলিট করুন' : 'Delete'}
                            >
                              <FaTrash className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Exam Modal */}
              {isAddExamOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="font-bold text-slate-900 text-base">{t.admin.createExamBtn}</h3>
                      <button onClick={() => setIsAddExamOpen(false)} className="text-slate-400 hover:text-slate-700">
                        <FaTimes size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleCreateExam} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'পরীক্ষার নাম / শিরোনাম *' : 'Exam Title *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={newExamTitle}
                          onChange={(e) => setNewExamTitle(e.target.value)}
                          placeholder={isBn ? 'যেমন: ৪৭তম বিসিএস ফুল মডেল টেস্ট - ০২' : 'e.g. 47th BCS Model Test 02'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            {isBn ? 'ক্যাটাগরি' : 'Category'}
                          </label>
                          <select
                            value={newExamCategory}
                            onChange={(e) => setNewExamCategory(e.target.value as 'bcs' | 'primary' | 'ntrca' | 'bank' | 'general' | 'subject')}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          >
                            <option value="bcs">{isBn ? '৪৭তম বিসিএস (BCS)' : '47th BCS'}</option>
                            <option value="primary">{isBn ? 'প্রাইমারি শিক্ষক নিয়োগ' : 'Primary Teacher'}</option>
                            <option value="ntrca">{isBn ? '১৯তম NTRCA নিবন্ধন' : '19th NTRCA'}</option>
                            <option value="bank">{isBn ? 'কম্বাইন্ড ব্যাংক অফিসার' : 'Bank Officer'}</option>
                            <option value="general">{isBn ? 'সাধারণ সরকারি চাকরি' : 'General Govt'}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            {isBn ? 'মোট প্রশ্ন' : 'Questions'}
                          </label>
                          <input
                            type="number"
                            value={newExamQuestions}
                            onChange={(e) => setNewExamQuestions(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            {isBn ? 'সময়সীমা (মিনিট)' : 'Duration (Mins)'}
                          </label>
                          <input
                            type="number"
                            value={newExamDuration}
                            onChange={(e) => setNewExamDuration(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            {isBn ? 'পাস মার্ক' : 'Pass Mark'}
                          </label>
                          <input
                            type="number"
                            value={newExamPassMark}
                            onChange={(e) => setNewExamPassMark(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddExamOpen(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                        >
                          {isBn ? 'বাতিল' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-xl text-xs font-bold shadow"
                        >
                          {isBn ? 'সংরক্ষণ করুন' : 'Save Exam'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 3: QUESTIONS MANAGEMENT ================= */}
          {activeTab === 'questions' && (
            <div className="space-y-5">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <FaSearch className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={questionSearch}
                      onChange={(e) => setQuestionSearch(e.target.value)}
                      placeholder={isBn ? 'প্রশ্ন অনুসন্ধান...' : 'Search questions...'}
                      className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                    />
                  </div>

                  <select
                    value={questionSubjectFilter}
                    onChange={(e) => setQuestionSubjectFilter(e.target.value)}
                    className="py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  >
                    <option value="all">{isBn ? 'সকল বিষয়' : 'All Subjects'}</option>
                    <option value="বাংলা সাহিত্য ও ব্যাকরণ">বাংলা সাহিত্য ও ব্যাকরণ</option>
                    <option value="ইংরেজি ব্যাকরণ ও সাহিত্য">ইংরেজি ব্যাকরণ ও সাহিত্য</option>
                    <option value="গণিত ও মানসিক দক্ষতা">গণিত ও মানসিক দক্ষতা</option>
                    <option value="বাংলাদেশ বিষয়াবলী">বাংলাদেশ বিষয়াবলী</option>
                    <option value="আন্তর্জাতিক বিষয়াবলী">আন্তর্জাতিক বিষয়াবলী</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsAddQuestionOpen(true)}
                  className="bg-[#007bff] hover:bg-[#0056b3] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <FaPlus className="w-3 h-3" />
                  <span>{t.admin.addQuestionBtn}</span>
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {filteredQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#007bff] px-2.5 py-0.5 rounded-full">
                        {q.subject}
                      </span>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                        title={isBn ? 'মুছে ফেলুন' : 'Delete'}
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="font-bold text-slate-900 text-sm mb-3">
                      {idx + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {q.options.map((op, opIdx) => (
                        <div
                          key={opIdx}
                          className={`p-2 rounded-xl text-xs flex items-center gap-2 ${
                            opIdx === q.correctAnswer
                              ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-300'
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
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <strong>{isBn ? 'ব্যাখ্যা: ' : 'Explanation: '}</strong>
                      {q.explanation}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Question Modal */}
              {isAddQuestionOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="font-bold text-slate-900 text-base">{t.admin.addQuestionBtn}</h3>
                      <button onClick={() => setIsAddQuestionOpen(false)} className="text-slate-400 hover:text-slate-700">
                        <FaTimes size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleCreateQuestion} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'বিষয় *' : 'Subject *'}
                        </label>
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
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'প্রশ্নটি লিখুন *' : 'Question text *'}
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={newQText}
                          onChange={(e) => setNewQText(e.target.value)}
                          placeholder={isBn ? 'এখানে প্রশ্ন লিখুন...' : 'Type question here...'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-700">
                          {isBn ? '৪টি বিকল্প অপশন লিখুন *' : 'Enter 4 options *'}
                        </label>
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
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'সঠিক উত্তর নির্বাচন করুন' : 'Correct option'}
                        </label>
                        <select
                          value={newQCorrect}
                          onChange={(e) => setNewQCorrect(parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900"
                        >
                          <option value={0}>{isBn ? 'অপশন ১' : 'Option 1'}</option>
                          <option value={1}>{isBn ? 'অপশন ২' : 'Option 2'}</option>
                          <option value={2}>{isBn ? 'অপশন ৩' : 'Option 3'}</option>
                          <option value={3}>{isBn ? 'অপশন ৪' : 'Option 4'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'বিস্তারিত ব্যাখ্যা ও তথ্যসূত্র' : 'Detailed Explanation'}
                        </label>
                        <textarea
                          rows={2}
                          value={newQExplanation}
                          onChange={(e) => setNewQExplanation(e.target.value)}
                          placeholder={isBn ? 'ব্যাখ্যা প্রদান করুন...' : 'Provide explanation...'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddQuestionOpen(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                        >
                          {isBn ? 'বাতিল' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-xl text-xs font-bold shadow"
                        >
                          {isBn ? 'প্রশ্ন যোগ করুন' : 'Add Question'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 4: STUDENTS MANAGEMENT ================= */}
          {activeTab === 'students' && (
            <div className="space-y-5">
              
              <div className="flex items-center justify-between gap-3">
                <div className="relative max-w-sm w-full">
                  <FaSearch className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder={isBn ? 'শিক্ষার্থীর নাম বা ফোন দিয়ে খুঁজুন...' : 'Search student by name or phone...'}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  />
                </div>

                <span className="text-xs text-slate-500 font-bold">
                  {isBn ? `মোট শিক্ষার্থী: ${studentsList.length} জন` : `Total: ${studentsList.length} Students`}
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-black border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">{isBn ? 'শিক্ষার্থীর নাম' : 'Student Name'}</th>
                        <th className="py-3 px-4">{isBn ? 'ফোন নম্বর' : 'Phone'}</th>
                        <th className="py-3 px-4">{isBn ? 'টার্গেট ব্যাচ' : 'Target Batch'}</th>
                        <th className="py-3 px-4">{isBn ? 'পরীক্ষা সম্পন্ন' : 'Exams Taken'}</th>
                        <th className="py-3 px-4">{isBn ? 'যোগদান তারিখ' : 'Joined'}</th>
                        <th className="py-3 px-4">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                        <th className="py-3 px-4 text-right">{isBn ? 'পদক্ষেপ' : 'Action'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.map((std) => (
                        <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-100 text-[#007bff] font-bold flex items-center justify-center text-xs">
                              {std.name.charAt(0)}
                            </div>
                            <span>{std.name}</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono">{std.phone}</td>
                          <td className="py-3.5 px-4 text-slate-700">{std.batch}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-800">{std.examsTaken} টি</td>
                          <td className="py-3.5 px-4 text-slate-500">{std.joinedDate}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                std.status === 'active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {std.status === 'active' ? (isBn ? 'সক্রিয়' : 'Active') : (isBn ? 'স্থগিত' : 'Suspended')}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleToggleStudentStatus(std.id)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors ${
                                std.status === 'active'
                                  ? 'text-red-600 hover:bg-red-50'
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                            >
                              {std.status === 'active' ? (isBn ? 'স্থগিত করুন' : 'Suspend') : (isBn ? 'সক্রিয় করুন' : 'Activate')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 5: NOTICES & CIRCULARS ================= */}
          {activeTab === 'notices' && (
            <div className="space-y-5">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{t.admin.notices}</h3>
                  <p className="text-xs text-slate-500">
                    {isBn ? 'ওয়েবসাইটে প্রকাশিত সকল নোটিশ ও সার্কুলার পরিচালনা করুন' : 'Manage posted notices & circulars'}
                  </p>
                </div>
                <button
                  onClick={() => setIsAddNoticeOpen(true)}
                  className="bg-[#007bff] hover:bg-[#0056b3] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <FaPlus className="w-3 h-3" />
                  <span>{t.admin.postNoticeBtn}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {noticesList.map((not) => (
                  <div
                    key={not.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold bg-blue-50 text-[#007bff] px-2.5 py-0.5 rounded-full">
                          {not.category}
                        </span>
                        {not.isUrgent && (
                          <span className="text-[10px] font-black bg-red-100 text-red-700 px-2 py-0.5 rounded-full animate-pulse">
                            {isBn ? 'জরুরি নোটিশ' : 'Urgent'}
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
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        {isBn ? 'মুছে ফেলুন' : 'Delete'}
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
                      <h3 className="font-bold text-slate-900 text-base">{t.admin.postNoticeBtn}</h3>
                      <button onClick={() => setIsAddNoticeOpen(false)} className="text-slate-400 hover:text-slate-700">
                        <FaTimes size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleCreateNotice} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'নোটিশ শিরোনাম *' : 'Notice Title *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={newNoticeTitle}
                          onChange={(e) => setNewNoticeTitle(e.target.value)}
                          placeholder={isBn ? 'যেমন: প্রাইমারি মেগা মডেল টেস্ট রুটিন' : 'Notice Title'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'ক্যাটাগরি' : 'Category'}
                        </label>
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
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'নোটিশের বিস্তারিত বিবরণ *' : 'Notice Content *'}
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={newNoticeContent}
                          onChange={(e) => setNewNoticeContent(e.target.value)}
                          placeholder={isBn ? 'এখানে বিস্তারিত নোটিশ লিখুন...' : 'Write notice text...'}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="urgentNoticeCheck"
                          checked={newNoticeUrgent}
                          onChange={(e) => setNewNoticeUrgent(e.target.checked)}
                          className="rounded text-red-600 focus:ring-red-400 w-3.5 h-3.5"
                        />
                        <label htmlFor="urgentNoticeCheck" className="text-xs font-bold text-red-600 cursor-pointer">
                          {isBn ? 'জরুরি নোটিশ হিসেবে চিহ্নিত করুন' : 'Mark as Urgent Notice'}
                        </label>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddNoticeOpen(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                        >
                          {isBn ? 'বাতিল' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-xl text-xs font-bold shadow"
                        >
                          {isBn ? 'প্রকাশ করুন' : 'Publish Notice'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 6: SETTINGS ================= */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-slate-900">{t.admin.settings}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isBn ? 'প্ল্যাটফর্মের মূল কনফিগারেশন ও ডাটাবেস পরিচালনা' : 'Platform core configs and database backups'}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? 'প্ল্যাটফর্ম নাম' : 'Platform Name'}
                  </label>
                  <input
                    type="text"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? 'সাপোর্ট হেল্পলাইন' : 'Helpline Number'}
                  </label>
                  <input
                    type="text"
                    value={helplineNumber}
                    onChange={(e) => setHelplineNumber(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? 'ডিফল্ট নেগেটিভ মার্কিং (প্রতি ভুল উত্তরে)' : 'Default Negative Marking Per Wrong Answer'}
                  </label>
                  <select
                    value={negativeMarkingValue}
                    onChange={(e) => setNegativeMarkingValue(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                  >
                    <option value="0.25">০.২৫ (বিসিএস ও প্রাইমারি স্ট্যান্ডার্ড)</option>
                    <option value="0.50">০.৫০ (ব্যাংক ও মন্ত্রণালয় স্ট্যান্ডার্ড)</option>
                    <option value="0.00">০.০০ (নো নেগেটিভ মার্কিং)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{isBn ? 'মেইনটেন্যান্স মোড' : 'Maintenance Mode'}</p>
                    <p className="text-[11px] text-slate-500">
                      {isBn ? 'চালু থাকলে সাধারণ শিক্ষার্থীরা সাইটে প্রবেশ করতে পারবে না' : 'Temporary maintenance downtime for students'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500" />
                  </label>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
                  >
                    <FaDownload className="w-3.5 h-3.5" />
                    <span>{isBn ? 'ডাটাবেস ব্যাকআপ ডাউনলোড করুন' : 'Export JSON Backup'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast(isBn ? 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' : 'Settings saved successfully!')}
                    className="px-5 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-xl text-xs font-bold shadow"
                  >
                    {isBn ? 'সেভ করুন' : 'Save Settings'}
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
