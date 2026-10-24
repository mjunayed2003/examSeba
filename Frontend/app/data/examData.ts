export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0-indexed
  explanation: string;
  subject: string;
}

export interface Exam {
  id: string;
  title: string;
  category: 'bcs' | 'primary' | 'ntrca' | 'bank' | 'general' | 'subject';
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMark: number;
  passMarks: number;
  batchName: string;
  examDate: string;
  isLive: boolean;
  isFree?: boolean;
  questions: Question[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  tag: string;
  badge: string;
  price: number;
  originalPrice: number;
  enrolledStudents: number;
  totalClasses: number;
  totalExams: number;
  mentor: string;
  mentorDesignation: string;
  features: string[];
  bannerImage: string;
  routine: { date: string; topic: string; instructor: string }[];
}

export interface JobCircular {
  id: string;
  title: string;
  organization: string;
  vacancies: string;
  deadline: string;
  qualification: string;
  salaryScale: string;
  category: string;
  circularPdfUrl?: string;
  applicationLink?: string;
}

export interface LeaderboardEntry {
  rank: number;
  studentName: string;
  avatar: string;
  batch: string;
  examTitle: string;
  score: number;
  accuracy: string;
  timeSpent: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  originalPrice: number;
  coverImage: string;
  pages: number;
  edition: string;
  inStock: boolean;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  isImportant: boolean;
  content: string;
}

export const SAMPLE_EXAMS: Exam[] = [
  {
    id: 'primary-mock-1',
    title: 'প্রাইমারি শিক্ষক নিয়োগ মডেল টেস্ট - ০১',
    category: 'primary',
    totalQuestions: 10,
    totalMarks: 10,
    durationMinutes: 10,
    negativeMark: 0.25,
    passMarks: 6,
    batchName: 'প্রাইমারি স্পেশাল গোল্ড ব্যাচ',
    examDate: 'আজকে লাইভ চলছে',
    isLive: true,
    isFree: true,
    questions: [
      {
        id: 1,
        question: '‘সূর্য’ শব্দের সমার্থক শব্দ কোনটি?',
        options: ['সুধাকর', 'শশাঙ্ক', 'অর্ক', 'বিধু'],
        correctAnswer: 2,
        explanation: '‘অর্ক’, ‘মার্তণ্ড’, ‘রবি’, ‘ভানু’, ‘সবিতা’ ইত্যাদি সূর্য শব্দের সমার্থক শব্দ। পক্ষান্তরে সুধাকর, শশাঙ্ক ও বিধু হলো চন্দ্রের সমার্থক শব্দ।',
        subject: 'বাংলা'
      },
      {
        id: 2,
        question: 'Which one is the correct spelling?',
        options: ['Lieutenant', 'Leutenant', 'Lieutennant', 'Lietenant'],
        correctAnswer: 0,
        explanation: 'লেফটেন্যান্ট বানানের সঠিক ইংরেজি রূপ হলো Lieutenant (Lie-u-ten-ant: মিথ্যা-তুমি-দশ-পিঁপড়া মনে রাখার সহজ কৌশল)।',
        subject: 'English'
      },
      {
        id: 3,
        question: 'একটি সংখ্যার ৩ গুণের সাথে দ্বিগুণ যোগ করলে ৯০ হয়। সংখ্যাটি কত?',
        options: ['১৫', '১৮', '২০', '১২'],
        correctAnswer: 1,
        explanation: 'ধরি সংখ্যাটি x। প্রশ্নমতে, ৩x + ২x = ৯০ => ৫x = ৯০ => x = ৯০/৫ = ১৮।',
        subject: 'গণিত'
      },
      {
        id: 4,
        question: 'মুক্তিযুদ্ধকালীন সময়ে বাংলাদেশকে কয়টি সেক্টরে বিভক্ত করা হয়েছিল?',
        options: ['৭টি', '৮টি', '১১টি', '৬৪টি'],
        correctAnswer: 2,
        explanation: '১৯৭১ সালের মহান মুক্তিযুদ্ধ সুষ্ঠুভাবে পরিচালনার সুবিধার্থে সমগ্র দেশকে ১১টি সেক্টর এবং ৬৪টি সাব-সেক্টরে বিভক্ত করা হয়েছিল।',
        subject: 'বাংলাদেশ বিষয়াবলী'
      },
      {
        id: 5,
        question: 'কোন ভিটামিনের অভাবে রক্ত জমাট বাঁধে না?',
        options: ['ভিটামিন A', 'ভিটামিন C', 'ভিটামিন D', 'ভিটামিন K'],
        correctAnswer: 3,
        explanation: 'ভিটামিন K যকৃতে প্রোথ্রম্বিন তৈরি করে যা রক্ত জমাট বাঁধতে (blood clotting) সরাসরি সাহায্য করে। এর অভাবে অতিরিক্ত রক্তক্ষরণ হতে পারে।',
        subject: 'সাধারণ বিজ্ঞান'
      },
      {
        id: 6,
        question: '‘পদ্মা নদীর মাঝি’ উপন্যাসের রচয়িতা কে?',
        options: ['মানিক বন্দ্যোপাধ্যায়', 'শরৎচন্দ্র চট্টোপাধ্যায়', 'তারাশঙ্কর বন্দ্যোপাধ্যায়', 'বিভূতিভূষণ বন্দ্যোপাধ্যায়'],
        correctAnswer: 0,
        explanation: '‘পদ্মা নদীর মাঝি’ (১৯৩৬) বিখ্যাত কথাশিল্পী মানিক বন্দ্যোপাধ্যায়ের অন্যতম কালজয়ী উপন্যাস। কপিলা ও কুবের এর প্রধান চরিত্র।',
        subject: 'বাংলা'
      },
      {
        id: 7,
        question: 'Choose the correct preposition: He is devoid ____ common sense.',
        options: ['with', 'of', 'from', 'in'],
        correctAnswer: 1,
        explanation: 'Devoid এর সাথে সর্বদা preposition "of" বসে (Devoid of = বর্জিত বা শূন্য)।',
        subject: 'English'
      },
      {
        id: 8,
        question: 'টাকায় ৩টি করে লেবু কিনে টাকায় ২টি করে বিক্রি করলে শতকরা কত লাভ হবে?',
        options: ['২০%', '২৫%', '৫০%', '৩৩.৩৩%'],
        correctAnswer: 2,
        explanation: '৩টির ক্রয়মূল্য ১ টাকা => ১টির ক্রয়মূল্য ১/৩ টাকা। ২টির বিক্রয়মূল্য ১ টাকা => ১টির বিক্রয়মূল্য ১/২ টাকা। লাভ = (১/২ - ১/৩) = ১/৬ টাকা। শতকরা লাভ = (১/৬ ÷ ১/৩) × ১০০% = ৫০%।',
        subject: 'গণিত'
      },
      {
        id: 9,
        question: 'কম্পিউটারের মস্তিষ্ক হিসেবে কাজ করে কোনটি?',
        options: ['RAM', 'CPU', 'Hard Disk', 'Motherboard'],
        correctAnswer: 1,
        explanation: 'CPU (Central Processing Unit)-কে কম্পিউটারের মস্তিষ্ক বা ব্রেইন বলা হয়, যা সমস্ত গাণিতিক ও যৌক্তিক প্রক্রিয়া নিয়ন্ত্রণ করে।',
        subject: 'আইসিটি'
      },
      {
        id: 10,
        question: 'আন্তর্জাতিক মাতৃভাষা দিবস কত তারিখে পালিত হয়?',
        options: ['২১ ফেব্রুয়ারি', '২৬ মার্চ', '১৬ ডিসেম্বর', '৭ মার্চ'],
        correctAnswer: 0,
        explanation: '১৯৯৯ সালের ১৭ নভেম্বর ইউনেস্কো ২১ ফেব্রুয়ারিকে আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে ঘোষণা করে এবং ২০০০ সাল থেকে বিশ্বব্যাপী তা উদযাপিত হয়ে আসছে।',
        subject: 'আন্তর্জাতিক বিষয়াবলী'
      }
    ]
  },
  {
    id: 'bcs-preli-1',
    title: '৪৭তম বিসিএস প্রিলিমিনারি পূর্ণাঙ্গ লাইভ এক্সাম',
    category: 'bcs',
    totalQuestions: 10,
    totalMarks: 10,
    durationMinutes: 10,
    negativeMark: 0.5,
    passMarks: 5,
    batchName: '৪৭তম বিসিএস বুলেট লাইভ ব্যাচ',
    examDate: 'আজ রাত ৯:০০ টায়',
    isLive: true,
    isFree: false,
    questions: [
      {
        id: 101,
        question: 'চর্যাপদ কোন ছন্দে রচিত?',
        options: ['অক্ষরবৃত্ত ছন্দ', 'মাত্রাবৃত্ত ছন্দ', 'স্বরবৃত্ত ছন্দ', 'পয়ার ছন্দ'],
        correctAnswer: 1,
        explanation: 'চর্যাপদের পদগুলো প্রধানত মাত্রাবৃত্ত (পাদাকুলক) ছন্দে রচিত। ড. প্রবোধচন্দ্র সেন ও সুনীতিকুমার চট্টোপাধ্যায়ের মতে এটি অন্ত্যমিলযুক্ত মাত্রাবৃত্ত ছন্দ।',
        subject: 'বাংলা সাহিত্য'
      },
      {
        id: 102,
        question: 'Identify the word that remains unchanged in its plural form:',
        options: ['Datum', 'Index', 'Deer', 'Criterion'],
        correctAnswer: 2,
        explanation: 'Deer, Sheep, Species, Series ইত্যাদির singular ও plural উভয় রূপ একই থাকে।',
        subject: 'English Language'
      },
      {
        id: 103,
        question: 'বঙ্গভঙ্গ রদ হয় কত সালে?',
        options: ['১৯০৫ সালে', '১৯০৬ সালে', '১৯১১ সালে', '১৯১৯ সালে'],
        correctAnswer: 2,
        explanation: '১৯০৫ সালের ১৬ অক্টোবর বঙ্গভঙ্গ কার্যকর হয়েছিল এবং প্রবল আন্দোলনের মুখে ১৯১১ সালের ১২ ডিসেম্বর সম্রাট পঞ্চম জর্জ দিল্লির দরবারে বঙ্গভঙ্গ রদ ঘোষণা করেন।',
        subject: 'বাংলাদেশ বিষয়াবলী'
      },
      {
        id: 104,
        question: 'SDG (Sustainable Development Goals) এর মোট লক্ষ্যমাত্রা কয়টি?',
        options: ['৮টি', '১৫টি', '১৭টি', '১৬৯টি'],
        correctAnswer: 2,
        explanation: 'টেকসই উন্নয়ন লক্ষ্যমাত্রা (SDG)-তে মোট ১৭টি গোল বা লক্ষ্যমাত্রা এবং ১৬৯টি সুনির্দিষ্ট টার্গেট রয়েছে (মেয়াদকাল: ২০১৬-২০৩০)।',
        subject: 'আন্তর্জাতিক বিষয়াবলী'
      },
      {
        id: 105,
        question: 'বায়ুমণ্ডলে সবচেয়ে বেশি পরিমাণে কোন গ্যাস পাওয়া যায়?',
        options: ['অক্সিজেন', 'নাইট্রোজেন', 'কার্বন ডাই অক্সাইড', 'আর্গন'],
        correctAnswer: 1,
        explanation: 'বায়ুমণ্ডলে শুষ্ক বাতাসের প্রায় ৭৮.০৮% হলো নাইট্রোজেন (N2) এবং প্রায় ২০.৯৫% অক্সিজেন।',
        subject: 'ভূগোল ও বিজ্ঞান'
      },
      {
        id: 106,
        question: 'log₂ 64 এর মান কত?',
        options: ['৪', '৫', '৬', '৮'],
        correctAnswer: 2,
        explanation: '৬৪ = ২⁶, সুতরাং log₂ (২⁶) = ৬ × log₂ ২ = ৬ × ১ = ৬।',
        subject: 'গাণিতিক যুক্তি'
      },
      {
        id: 107,
        question: '‘ঘটিরাম’ বাগধারাটির সঠিক অর্থ কোনটি?',
        options: ['অকর্মণ্য ব্যক্তি', 'ভণ্ড তপস্বী', 'সৌভাগ্যবান', 'অতিরিক্ত কৃপণ'],
        correctAnswer: 0,
        explanation: '‘ঘটিরাম’ বাগধারার অর্থ অকর্মণ্য ব্যক্তি বা অপদার্থ লোক।',
        subject: 'বাংলা ব্যাকরণ'
      },
      {
        id: 108,
        question: 'The synonym of the word "PERSPICACIOUS" is:',
        options: ['Dull', 'Shrewd / Insightful', 'Vague', 'Obstinate'],
        correctAnswer: 1,
        explanation: 'Perspicacious অর্থ সূক্ষ্মদর্শী বা বিচক্ষণ (having keen mental perception and understanding)। এর সমার্থক হলো Shrewd, Insightful বা Discerning।',
        subject: 'English Vocabulary'
      },
      {
        id: 109,
        question: 'বাংলাদেশে প্রথম ডিজিটাল জনশুমারি কবে অনুষ্ঠিত হয়?',
        options: ['২০২১ সালে', '২০২২ সালে', '২০২০ সালে', '২০২৩ সালে'],
        correctAnswer: 1,
        explanation: '১৫-২১ জুন ২০২২ তারিখে বাংলাদেশে ষষ্ঠ জনশুমারি ও গৃহগণনা সম্পূর্ণ ডিজিটাল ট্যাবের মাধ্যমে প্রথম পরিচালিত হয়।',
        subject: 'সাম্প্রতিক বাংলাদেশ'
      },
      {
        id: 110,
        question: 'IPv4 অ্যাড্রেসে কতটি বিট থাকে?',
        options: ['১৬ বিট', '৩২ বিট', '৬৪ বিট', '১২৮ বিট'],
        correctAnswer: 1,
        explanation: 'IPv4 অ্যাড্রেস ৩২ বিটের (৪ বাইট) হয়ে থাকে এবং IPv6 অ্যাড্রেস ১২৮ বিটের হয়ে থাকে।',
        subject: 'কম্পিউটার ও আইসিটি'
      }
    ]
  },
  {
    id: 'ntrca-mock-1',
    title: '১৯তম শিক্ষক নিবন্ধন (NTRCA) স্কুল ও কলেজ প্রিলি পরীক্ষা',
    category: 'ntrca',
    totalQuestions: 10,
    totalMarks: 10,
    durationMinutes: 10,
    negativeMark: 0.25,
    passMarks: 4,
    batchName: '১৯তম শিক্ষক নিবন্ধন টার্গেট লাইভ ব্যাচ',
    examDate: 'আগামীকাল সকাল ১০:০০ টায়',
    isLive: false,
    isFree: true,
    questions: [
      {
        id: 201,
        question: 'কোনটি খাঁটি বাংলা উপসর্গ?',
        options: ['প্র', 'পরা', 'অঘা', 'অপ'],
        correctAnswer: 2,
        explanation: 'খাঁটি বাংলা উপসর্গ ২১টি (অ, অঘা, অজ, অনা, আ, আড়, আন, আব, ইতি, ঊন, কদ, কু, নি, পাতি, বি, ভর, রাম, স, সা, সু, হা)। অঘা খাঁটি বাংলা। প্র, পরা, অপ তৎসম উপসর্গ।',
        subject: 'বাংলা'
      },
      {
        id: 202,
        question: 'Look forward to এর পর ক্রিয়াপদের কোন রূপ বসে?',
        options: ['Base form', 'Past participle', 'V + ing', 'To infinitive'],
        correctAnswer: 2,
        explanation: 'With a view to, look forward to, get used to, be accustomed to ইত্যাদির পর মূল verb এর সাথে "ing" যুক্ত হয়।',
        subject: 'English'
      },
      {
        id: 203,
        question: 'বৃত্তের ব্যাস তিনগুণ বৃদ্ধি পেলে ক্ষেত্রফল কতগুণ বৃদ্ধি পাবে?',
        options: ['৩ গুণ', '৬ গুণ', '৯ গুণ', '১২ গুণ'],
        correctAnswer: 2,
        explanation: 'বৃত্তের ক্ষেত্রফল ব্যাস বা ব্যাসার্ধের বর্গের সমানুপাতিক। তাই ব্যাস ৩ গুণ বাড়লে ক্ষেত্রফল ৩² = ৯ গুণ বৃদ্ধি পাবে।',
        subject: 'গণিত'
      },
      {
        id: 204,
        question: 'ইউরোপের ককপিট (Cockpit of Europe) বলা হয় কোন দেশকে?',
        options: ['সুইজারল্যান্ড', 'বেলজিয়াম', 'নরওয়ে', 'তুরস্ক'],
        correctAnswer: 1,
        explanation: 'বেলজিয়ামকে ইউরোপের ককপিট বা রণক্ষেত্র বলা হয় কারণ ঐতিহাসিকভাবে ইউরোপের বহু গুরুত্বপূর্ণ রক্তক্ষয়ী যুদ্ধ (যেমন ওয়াটারলু যুদ্ধ) বেলজিয়ামে সংঘটিত হয়েছিল।',
        subject: 'সাধারণ জ্ঞান'
      },
      {
        id: 205,
        question: 'শব্দ তরঙ্গের বেগ সবচেয়ে বেশি কোন মাধ্যমে?',
        options: ['বায়বীয়', 'তরল', 'কঠিন', 'শূন্য মাধ্যম'],
        correctAnswer: 2,
        explanation: 'কঠিন মাধ্যমে অণুগুলোর ঘনত্ব সবচেয়ে বেশি থাকায় কঠিন মাধ্যমে শব্দ সবচেয়ে দ্রুত চলে। শূন্য মাধ্যমে শব্দ চলাচল করতে পারে না।',
        subject: 'বিজ্ঞান'
      },
      {
        id: 206,
        question: '‘অনিল’ শব্দের অর্থ কি?',
        options: ['বাতাস', 'আগুন', 'পানি', 'মাটি'],
        correctAnswer: 0,
        explanation: '‘অনিল’ অর্থ বাতাস/বায়ু/সমীরণ। পক্ষান্তরে ‘অনল’ অর্থ আগুন।',
        subject: 'বাংলা'
      },
      {
        id: 207,
        question: 'He died ____ cancer.',
        options: ['by', 'from', 'of', 'for'],
        correctAnswer: 2,
        explanation: 'রোগে মারা গেলে Die of বসে (Die of disease)। দুর্ঘটনায় মারা গেলে Die by accident বসে।',
        subject: 'English'
      },
      {
        id: 208,
        question: 'পিতা ও পুত্রের বয়সের সমষ্টি ৬০ বছর। মাতার বয়স পুত্রের চেয়ে ২০ বছর বেশি। তাদের গড় বয়স কত?',
        options: ['২৫ বছর', '২৮ বছর', '৩০ বছর', '৩৫ বছর'],
        correctAnswer: 0,
        explanation: 'পিতা + পুত্র = ৬০ বছর। পিতা-পুত্রের বয়সের সাথে মাতার বয়স যোগ করার জন্য অনুপাত জানা দরকার, এই জাতীয় গাণিতিক যুক্তি পরীক্ষায় বারবার আসে।',
        subject: 'গণিত'
      },
      {
        id: 209,
        question: 'মুজিবনগর সরকার কবে শপথ গ্রহণ করে?',
        options: ['১০ এপ্রিল ১৯৭১', '১৭ এপ্রিল ১৯৭১', '২৫ মার্চ ১৯৭১', '২৬ মার্চ ১৯৭১'],
        correctAnswer: 1,
        explanation: 'মুজিবনগর সরকার গঠিত হয় ১০ এপ্রিল ১৯৭১ এবং মেহেরপুরের বৈদ্যনাথতলার ভবেরপাড়ায় আনুষ্ঠানিকভাবে শপথ গ্রহণ করে ১৭ এপ্রিল ১৯৭১।',
        subject: 'বাংলাদেশ বিষয়াবলী'
      },
      {
        id: 210,
        question: 'বাংলাদেশের জাতীয় বৃক্ষ কোনটি?',
        options: ['আম গাছ', 'বট গাছ', 'শাল গাছ', 'মেহগনি'],
        correctAnswer: 0,
        explanation: '২০১০ সালে বাংলাদেশ সরকার আনুষ্ঠানিকভাবে ‘আম গাছ’ (Mangifera indica)-কে বাংলাদেশের জাতীয় বৃক্ষ হিসেবে স্বীকৃতি দেয়।',
        subject: 'সাধারণ জ্ঞান'
      }
    ]
  },
  {
    id: 'bank-job-1',
    title: 'কম্বাইন্ড ব্যাংক অফিসার ও ক্যাশ প্রিলিমিনারি পরীক্ষা',
    category: 'bank',
    totalQuestions: 10,
    totalMarks: 10,
    durationMinutes: 10,
    negativeMark: 0.25,
    passMarks: 5,
    batchName: 'ব্যাংক জব টার্গেট কম্বাইন্ড লাইভ ব্যাচ',
    examDate: 'আজ দুপুর ১২:০০ টায়',
    isLive: true,
    isFree: false,
    questions: [
      {
        id: 301,
        question: 'If the price of sugar increases by 25%, by what percent must a family reduce consumption to keep expenditure constant?',
        options: ['20%', '25%', '16.66%', '30%'],
        correctAnswer: 0,
        explanation: 'Formula: [R / (100 + R)] × 100% = [25 / 125] × 100% = (1/5) × 100% = 20%.',
        subject: 'Quantitative Aptitude'
      },
      {
        id: 302,
        question: 'What is the full form of SWIFT code in international banking?',
        options: [
          'Society for Worldwide Interbank Financial Telecommunication',
          'Standard Worldwide Interbank Funds Transfer',
          'System Wide International Financial Technology',
          'Secure Worldwide Internet Financial Terminal'
        ],
        correctAnswer: 0,
        explanation: 'SWIFT stands for Society for Worldwide Interbank Financial Telecommunication.',
        subject: 'Banking Awareness'
      },
      {
        id: 303,
        question: 'Choose the antonym of "AMELIORATE":',
        options: ['Improve', 'Worsen', 'Assemble', 'Mitigate'],
        correctAnswer: 1,
        explanation: 'Ameliorate means to make something better or improve. Its exact antonym is Worsen or Deteriorate.',
        subject: 'English Language'
      },
      {
        id: 304,
        question: 'The Central Bank of Bangladesh was established on:',
        options: ['16 December 1971', '1 January 1972', '26 March 1971', '4 November 1972'],
        correctAnswer: 0,
        explanation: 'Bangladesh Bank was established on 16 December 1971 under the Bangladesh Bank Order, 1972 (acting retrospectively).',
        subject: 'Bangladesh Economy'
      },
      {
        id: 305,
        question: 'A train 120m long passes a pole in 6 seconds. What is its speed in km/h?',
        options: ['60 km/h', '72 km/h', '80 km/h', '90 km/h'],
        correctAnswer: 1,
        explanation: 'Speed = Distance / Time = 120 / 6 = 20 m/s. In km/h: 20 × (18 / 5) = 72 km/h.',
        subject: 'Quantitative Aptitude'
      },
      {
        id: 306,
        question: '‘একাদশে বৃহস্পতি’ বাগধারাটির অর্থ কি?',
        options: ['শুভ সময় / পরম সৌভাগ্য', 'বিপদের আশঙ্কা', 'শত্রুভাবাপন্ন', 'অল্প সময়ের সুখ'],
        correctAnswer: 0,
        explanation: '‘একাদশে বৃহস্পতি’ বাগধারার অর্থ সুসময় বা পরম সৌভাগ্য।',
        subject: 'বাংলা'
      },
      {
        id: 307,
        question: 'Find the odd one out: Apple, Mango, Carrot, Banana',
        options: ['Apple', 'Mango', 'Carrot', 'Banana'],
        correctAnswer: 2,
        explanation: 'Carrot is a root vegetable, whereas Apple, Mango, and Banana are fruits.',
        subject: 'Logical Reasoning'
      },
      {
        id: 308,
        question: 'What is the present Repo rate announced by Bangladesh Bank called?',
        options: ['Reverse repo', 'Policy Rate', 'Bank rate', 'Treasury bond rate'],
        correctAnswer: 1,
        explanation: 'The repo rate is currently referred to as the benchmark Policy Rate by Bangladesh Bank in monetary policy.',
        subject: 'Banking Affairs'
      },
      {
        id: 309,
        question: 'The headquarter of World Bank is situated in:',
        options: ['Geneva', 'New York', 'Washington, D.C.', 'London'],
        correctAnswer: 2,
        explanation: 'Both the World Bank and International Monetary Fund (IMF) are headquartered in Washington, D.C., USA.',
        subject: 'International Affairs'
      },
      {
        id: 310,
        question: 'Which shortcut key is used to save a document in MS Word?',
        options: ['Ctrl + P', 'Ctrl + S', 'Ctrl + V', 'Ctrl + Z'],
        correctAnswer: 1,
        explanation: 'Ctrl + S is the universal keyboard shortcut for saving files across Windows applications.',
        subject: 'Computer & Banking IT'
      }
    ]
  }
];

export const SAMPLE_COURSES: Course[] = [
  {
    id: 'course-primary-gold',
    title: 'প্রাইমারি শিক্ষক নিয়োগ স্পেশাল গোল্ড লাইভ ব্যাচ-৭',
    category: 'primary',
    tag: 'সর্বোচ্চ সফল ব্যাচ',
    badge: 'ভর্তি চলছে',
    price: 1850,
    originalPrice: 3500,
    enrolledStudents: 3420,
    totalClasses: 85,
    totalExams: 40,
    mentor: 'এম. আই. প্রধান ও এক্সপার্ট প্যানেল',
    mentorDesignation: 'প্রতিষ্ঠাতা ও প্রধান পরামর্শক, বিদ্যাবাড়ি',
    features: [
      '৮৫টি মেগা ইন্টারেক্টিভ লাইভ জুম ক্লাস',
      '৪০টি স্পেশাল অধ্যায়ভিত্তিক ও পূর্ণাঙ্গ মডেল টেস্ট',
      'প্রতিটি ক্লাসের এইচডি রেকর্ডিং ও PDF লেকচার শিট',
      'স্পেশাল প্রাইমারি বুলেট সাজেশন্স ও সমাধান'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    routine: [
      { date: 'প্রতি শনি, সোম, বুধ', topic: 'বাংলা ব্যাকরণ ও সাহিত্য', instructor: 'মাকসুদুর রহমান স্যার' },
      { date: 'প্রতি রবি, মঙ্গল, বৃহস্পতি', topic: 'বেসিক টু অ্যাডভান্সড ম্যাথ', instructor: 'ইঞ্জি. মো. তানভীর আহমেদ' },
      { date: 'প্রতি শুক্রবার', topic: 'স্পেশাল উইকলি মেগা এক্সাম', instructor: 'অনলাইন এক্সাম পোর্টাল' }
    ]
  },
  {
    id: 'course-bcs-bullet',
    title: '৪৭তম বিসিএস প্রিলিমিনারি বুলেট লাইভ ব্যাচ-২',
    category: 'bcs',
    tag: 'বিসিএস ক্যাডারদের দিকনির্দেশনা',
    badge: 'সীমিত আসন',
    price: 3200,
    originalPrice: 6000,
    enrolledStudents: 2890,
    totalClasses: 140,
    totalExams: 65,
    mentor: 'বিসিএস প্রশাসন ও পুলিশ ক্যাডার প্যানেল',
    mentorDesignation: 'সাবেক প্রশাসন ক্যাডার ও বিদ্যাবাড়ি শিক্ষক মণ্ডলী',
    features: [
      '২০০ নম্বরের বিসিএস সিলেবাসের সম্পূর্ণ কভারেজ',
      '৬৫টি রিয়েল টাইম টাইমার ভিত্তিক ওএমআর এক্সাম',
      'ক্যাডারদের সাথে প্রতি সপ্তাহে বিশেষ জুম কাউন্সেলিং',
      'বিসিএস প্রিলি বুলেট ডাইজেস্ট ও ফ্রি ডেলিভারি'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    routine: [
      { date: 'শনি ও সোম (সন্ধ্যা ৭টা)', topic: 'বাংলাদেশ বিষয়াবলী ও আন্তর্জাতিক', instructor: 'ড. মোস্তাফিজুর রহমান' },
      { date: 'রবি ও বুধ (রাত ৮:৩০)', topic: 'ইংলিশ ল্যাঙ্গুয়েজ ও লিটারেচার', instructor: 'হাসান মাহমুদ (বিসিএস শিক্ষা)' },
      { date: 'শুক্রবার (সকাল ১০টা)', topic: 'পূর্ণাঙ্গ ২০০ মার্কস মডেল টেস্ট', instructor: 'লাইভ সফটওয়্যার' }
    ]
  },
  {
    id: 'course-ntrca-live',
    title: '১৯তম শিক্ষক নিবন্ধন (NTRCA) স্পেশাল লাইভ ব্যাচ',
    category: 'ntrca',
    tag: '১০০% পাস স্ট্র্যাটেজি',
    badge: 'নতুন ব্যাচ',
    price: 1550,
    originalPrice: 2800,
    enrolledStudents: 1950,
    totalClasses: 65,
    totalExams: 30,
    mentor: 'প্রভাষক আহসান হাবীব',
    mentorDesignation: 'শিক্ষক নিবন্ধন বিশেষজ্ঞ ট্রেইনার',
    features: [
      'স্কুল ও কলেজ উভয় পর্যায়ের কমন ১০০ মার্কস প্রস্তুতি',
      'বিগত ১০ বছরের প্রশ্ন ব্যাংকের পুঙ্খানুপুঙ্খ সমাধান',
      '৩০টি পূর্ণাঙ্গ নিবন্ধন স্ট্যান্ডার্ড ওএমআর টেস্ট',
      'পাস মার্ক (৪০+) নিশ্চিত করার সহজ শর্টকাট টেকনিক'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    routine: [
      { date: 'শনি, সোম, বুধ (সন্ধ্যা ৬টা)', topic: 'বাংলা ও সাধারণ জ্ঞান', instructor: 'প্রভাষক আহসান হাবীব' },
      { date: 'রবি, মঙ্গল (রাত ৮টা)', topic: 'ইংরেজি ও সাধারণ গণিত', instructor: 'শরিফুল ইসলাম স্যার' }
    ]
  },
  {
    id: 'course-bank-target',
    title: 'কম্বাইন্ড ব্যাংক অফিসার ও ক্যাশ টার্গেট ব্যাচ-৩',
    category: 'bank',
    tag: 'ম্যাথ ও ইংলিশ স্পেশাল',
    badge: 'জনপ্রিয়',
    price: 2450,
    originalPrice: 4500,
    enrolledStudents: 1420,
    totalClasses: 90,
    totalExams: 45,
    mentor: 'সিনিয়র অফিসার্স প্যানেল (বাংলাদেশ ব্যাংক)',
    mentorDesignation: 'সেন্ট্রাল ব্যাংক ট্রেইনার্স',
    features: [
      'ব্যাংক গণিত শর্টকাট ও বেসিক ক্লিয়ারিং ক্লাস',
      'আইবিএ (IBA) ও বিআইবিএম (BIBM) প্যাটার্ন বিশ্লেষণ',
      'ব্যাংকিং জিকে ও কারেন্ট অ্যাফেয়ার্স ক্যাপসুল',
      '৪৫টি লাইভ টাইমার ভিত্তিক প্রিলি মক টেস্ট'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    routine: [
      { date: 'প্রতি মঙ্গল ও বৃহস্পতি', topic: 'IBA Pattern Math Solution', instructor: 'সাকিব আল হাসান (AD, BB)' },
      { date: 'প্রতি শনি ও সোম', topic: 'Bank Standard English Vocab & Grammar', instructor: 'ফারহানা ইসলাম' }
    ]
  }
];

export const SAMPLE_JOBS: JobCircular[] = [
  {
    id: 'job-1',
    title: 'প্রাথমিক সহকারী শিক্ষক নিয়োগ ২০২৬ (৩য় ধাপ)',
    organization: 'প্রাথমিক শিক্ষা অধিদপ্তর (DPE)',
    vacancies: '১৩,৭২০ জন',
    deadline: '১৫ নভেম্বর ২০২৬',
    qualification: 'যেকোনো স্বীকৃত বিশ্ববিদ্যালয় থেকে স্নাতক/সমমান (ন্যূনতম ২য় শ্রেণি বা সমমানের CGPA)',
    salaryScale: 'গ্রেড ১৩ (১১,০০০ - ২৬,৫৯০ টাকা)',
    category: 'প্রাইমারি',
    applicationLink: 'http://dpe.teletalk.com.bd'
  },
  {
    id: 'job-2',
    title: '৪৭তম বিসিএস পরীক্ষার বিজ্ঞপ্তি',
    organization: 'বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)',
    vacancies: '৩,১৪০ জন (ক্যাডার পদ)',
    deadline: '৩০ নভেম্বর ২০২৬',
    qualification: '৪ বছর মেয়াদি স্নাতক ডিগ্রি বা সমমান (বয়স ২১ থেকে ৩২ বছর)',
    salaryScale: 'গ্রেড ৯ (২২,০০০ - ৫৩,০৬০ টাকা)',
    category: 'বিসিএস',
    applicationLink: 'http://bpsc.teletalk.com.bd'
  },
  {
    id: 'job-3',
    title: 'সমন্বিত ১০ ব্যাংক ও আর্থিক প্রতিষ্ঠানে অফিসার (জেনারেল)',
    organization: 'ব্যাংকার্স সিলেকশন কমিটি (বাংলাদেশ ব্যাংক)',
    vacancies: '২,৮৫০ জন',
    deadline: '২০ ডিসেম্বর ২০২৬',
    qualification: 'স্নাতক/স্নাতকোত্তর বা ৪ বছর মেয়াদি ডিগ্রি',
    salaryScale: 'গ্রেড ১০ (১৬,০০০ - ৩৮,৬৪০ টাকা)',
    category: 'ব্যাংক',
    applicationLink: 'https://erecruitment.bb.org.bd'
  },
  {
    id: 'job-4',
    title: '১৯তম শিক্ষক নিবন্ধন পরীক্ষার গণবিজ্ঞপ্তি (NTRCA)',
    organization: 'বেসরকারি শিক্ষক নিবন্ধন ও প্রত্যয়ন কর্তৃপক্ষ',
    vacancies: '৬০,০০০+ সম্ভাব্য শিক্ষক পদ',
    deadline: '২৫ নভেম্বর ২০২৬',
    qualification: 'সংশ্লিষ্ট বিষয়ে স্নাতক/স্নাতকোত্তর ডিগ্রি',
    salaryScale: 'এমপিও নীতিমালা অনুযায়ী স্কেল',
    category: 'শিক্ষক নিবন্ধন',
    applicationLink: 'http://ntrca.teletalk.com.bd'
  }
];

export const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    studentName: 'তানজিলা তাসনিম',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
    examTitle: '৪৭তম বিসিএস পূর্ণাঙ্গ মডেল টেস্ট',
    score: 9.75,
    accuracy: '100%',
    timeSpent: '০৫ মিনিট ১২ সেকেন্ড',
    date: '২৪ অক্টোবর ২০২৬'
  },
  {
    rank: 2,
    studentName: 'রাকিবুল হাসান রাফি',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    batch: 'প্রাইমারি স্পেশাল গোল্ড ব্যাচ',
    examTitle: 'প্রাইমারি স্পেশাল মডেল টেস্ট - ০১',
    score: 9.50,
    accuracy: '95%',
    timeSpent: '০৬ মিনিট ০৫ সেকেন্ড',
    date: '২৪ অক্টোবর ২০২৬'
  },
  {
    rank: 3,
    studentName: 'নুসরাত জাহান মিম',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    batch: 'ব্যাংক অফিসার কম্বাইন্ড ব্যাচ',
    examTitle: 'কম্বাইন্ড ব্যাংক অফিসার প্রিলি',
    score: 9.25,
    accuracy: '92.5%',
    timeSpent: '০৬ মিনিট ৪০ সেকেন্ড',
    date: '২৩ অক্টোবর ২০২৬'
  },
  {
    rank: 4,
    studentName: 'মেহেদী হাসান জাহিদ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    batch: '১৯তম NTRCA টার্গেট ব্যাচ',
    examTitle: 'শিক্ষক নিবন্ধন মডেল টেস্ট',
    score: 9.00,
    accuracy: '90%',
    timeSpent: '০৭ মিনিট ১০ সেকেন্ড',
    date: '২৩ অক্টোবর ২০২৬'
  },
  {
    rank: 5,
    studentName: 'ফারজানা আক্তার ইতি',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    batch: '৪৭তম বিসিএস বুলেট ব্যাচ',
    examTitle: '৪৭তম বিসিএস পূর্ণাঙ্গ মডেল টেস্ট',
    score: 8.75,
    accuracy: '88%',
    timeSpent: '০৭ মিনিট ৪৫ সেকেন্ড',
    date: '২২ অক্টোবর ২০২৬'
  }
];

export const SAMPLE_BOOKS: Book[] = [
  {
    id: 'book-1',
    title: 'বিসিএস প্রিলিমিনারি বুলেট ডাইজেস্ট (৪৭তম স্পেশাল)',
    author: 'বিদ্যাবাড়ি একাডেমি টিম',
    category: 'বিসিএস',
    price: 520,
    originalPrice: 750,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    pages: 680,
    edition: '২০২৬最新 সংস্করণ',
    inStock: true
  },
  {
    id: 'book-2',
    title: 'প্রাইমারি শিক্ষক নিয়োগ বুলেট সমাধান ও মডেল টেস্ট',
    author: 'এম. আই. প্রধান ও রিসার্চ উইং',
    category: 'প্রাইমারি',
    price: 430,
    originalPrice: 600,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80',
    pages: 540,
    edition: '২০২৬ মেগা সংস্করণ',
    inStock: true
  },
  {
    id: 'book-3',
    title: 'ব্যাংক জব প্রিলিমিনারি ম্যাথ ও অ্যানালিটিক্যাল ডাইজেস্ট',
    author: 'ইঞ্জি. মো. তানভীর আহমেদ',
    category: 'ব্যাংক',
    price: 480,
    originalPrice: 700,
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=400&auto=format&fit=crop&q=80',
    pages: 590,
    edition: '৭ম সংস্করণ',
    inStock: true
  },
  {
    id: 'book-4',
    title: '১৯তম শিক্ষক নিবন্ধন (NTRCA) স্পেশাল গাইড',
    author: 'বিদ্যাবাড়ি রিসার্চ ফ্যাকাল্টি',
    category: 'শিক্ষক নিবন্ধন',
    price: 390,
    originalPrice: 550,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80',
    pages: 460,
    edition: '২০২৬ সংস্করণ',
    inStock: true
  }
];

export const SAMPLE_NOTICES: Notice[] = [
  {
    id: 'n-1',
    title: 'আজকের লাইভ প্রাইমারি ও বিসিএস মডেল টেস্টের ফলাফল ও মেধা তালিকা প্রকাশ প্রসঙ্গে।',
    date: '২৪ অক্টোবর ২০২৬',
    category: 'পরীক্ষা',
    isImportant: true,
    content: 'আজকের লাইভ পরীক্ষায় অংশগ্রহণকারী সকল শিক্ষার্থীদের মেধা তালিকা এবং প্রতিটি প্রশ্নের ব্যাখ্যা সম্বলিত সমাধান শীট প্রোফাইল ড্যাশবোর্ডে উন্মুক্ত করা হয়েছে।'
  },
  {
    id: 'n-2',
    title: 'আগামীকাল সকাল ১০টায় অনুষ্ঠিত হবে ১৯তম শিক্ষক নিবন্ধন স্পেশাল ওপেন ফ্রি এক্সাম।',
    date: '২৩ অক্টোবর ২০২৬',
    category: 'রুটিন',
    isImportant: false,
    content: 'সকল নিবন্ধনে আবেদনকারী শিক্ষার্থীদের জন্য সম্পূর্ণ ফ্রিতে এই পরীক্ষাটি উন্মুক্ত থাকবে। শীর্ষ ৫০ জনকে দেওয়া হবে আকর্ষণীয় কোর্স ছাড়।'
  },
  {
    id: 'n-3',
    title: 'প্রাথমিক শিক্ষক নিয়োগ ৩য় ধাপের নতুন পরীক্ষার সিলেবাস ও ওএমআর নির্দেশনা প্রকাশিত।',
    date: '২২ অক্টোবর ২০২৬',
    category: 'সার্কুলার',
    isImportant: true,
    content: 'ডিপিই কর্তৃক প্রকাশিত নতুন মানবণ্টন অনুযায়ী বাংলা ২০, ইংরেজি ২০, গণিত ২০ ও সাধারণ জ্ঞান ২০ নম্বরে ৮০ নম্বরের পরীক্ষা গৃহীত হবে।'
  }
];

export const FREE_STUDY_MATERIALS = [
  {
    id: 'mat-1',
    title: 'বিসিএস ও প্রাইমারি বাংলা ব্যাকরণ স্পেশাল হ্যান্ডনোট (PDF)',
    subject: 'বাংলা ব্যাকরণ',
    downloads: '14,250',
    size: '4.8 MB',
    fileType: 'PDF Document'
  },
  {
    id: 'mat-2',
    title: 'চাকরি পরীক্ষার বিগত ১৫ বছরের ইংরেজি ১০০টি কমন ইডিয়ম ও ফ্রেজ',
    subject: 'English Vocabulary',
    downloads: '19,800',
    size: '3.2 MB',
    fileType: 'PDF Document'
  },
  {
    id: 'mat-3',
    title: 'ঐতিহাসিক মুক্তিযুদ্ধ ও সংবিধানের গুরুত্বপূর্ণ অনুচ্ছেদ তালিকা',
    subject: 'বাংলাদেশ বিষয়াবলী',
    downloads: '22,400',
    size: '5.1 MB',
    fileType: 'PDF Document'
  },
  {
    id: 'mat-4',
    title: 'পাটিগণিত ও বীজগণিতের ২৫টি দ্রুত সমাধানের ম্যাজিক ট্রিকস',
    subject: 'গণিত শর্টকাট',
    downloads: '28,100',
    size: '6.4 MB',
    fileType: 'PDF Document'
  }
];
