export type Language = 'bn' | 'en';

export interface Translations {
  nav: {
    topNotice: string;
    liveUpdate: string;
    helpline: string;
    hours: string;
    home: string;
    exams: string;
    courses: string;
    studyroom: string;
    job_alert: string;
    leaderboard: string;
    routine: string;
    books: string;
    liveExamBtn: string;
    dashboardBtn: string;
    login: string;
    signup: string;
    logout: string;
    switchLang: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    titlePart2: string;
    desc: string;
    startFreeExam: string;
    demoTest: string;
    registerFree: string;
    featQuestionBank: string;
    featNegativeMarking: string;
    featInstantSolutions: string;
  };
  stats: {
    title: string;
    students: string;
    studentsCount: string;
    examsTaken: string;
    examsCount: string;
    questionBank: string;
    questionCount: string;
    passRate: string;
    passRateCount: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    card4Title: string;
    card4Desc: string;
    card5Title: string;
    card5Desc: string;
    card6Title: string;
    card6Desc: string;
  };
  batches: {
    badge: string;
    title: string;
    subtitle: string;
    catAll: string;
    catBcs: string;
    catPrimary: string;
    catBank: string;
    catNtrca: string;
    catOther: string;
    questions: string;
    duration: string;
    passMark: string;
    examinees: string;
    startBtn: string;
    minutes: string;
  };
  courses: {
    badge: string;
    title: string;
    subtitle: string;
    classes: string;
    mentor: string;
    enrollBtn: string;
    enrolledToast: string;
  };
  dailyExam: {
    badge: string;
    title: string;
    subtitle: string;
    topic: string;
    totalMarks: string;
    passMarks: string;
    duration: string;
    startNow: string;
    remainingTime: string;
  };
  leaderboard: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterBcs: string;
    filterPrimary: string;
    filterBank: string;
    filterNtrca: string;
    rankCol: string;
    nameCol: string;
    batchCol: string;
    scoreCol: string;
    accuracyCol: string;
    timeCol: string;
    firstPlace: string;
  };
  jobAlert: {
    badge: string;
    title: string;
    subtitle: string;
    vacancy: string;
    deadline: string;
    applyBtn: string;
  };
  routine: {
    badge: string;
    title: string;
    subtitle: string;
    upcomingRoutine: string;
    realtimeUpdate: string;
    noticeBoard: string;
    goToExam: string;
    noticeTitle: string;
    closeBtn: string;
  };
  books: {
    badge: string;
    title: string;
    subtitle: string;
    buyNow: string;
    inStock: string;
  };
  cta: {
    title: string;
    subtitle: string;
    btnSignup: string;
    btnExam: string;
  };
  footer: {
    about: string;
    quickLinks: string;
    categories: string;
    contact: string;
    bcsExam: string;
    primaryExam: string;
    ntrcaExam: string;
    bankExam: string;
    allJobs: string;
    helplineText: string;
    privacy: string;
    terms: string;
    refund: string;
    copyright: string;
  };
  auth: {
    loginTitle: string;
    signupTitle: string;
    loginSub: string;
    signupSub: string;
    demoText: string;
    demoBtn: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    batchLabel: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submitLogin: string;
    submitSignup: string;
    noAccount: string;
    hasAccount: string;
    validationPhone: string;
    validationPassword: string;
    validationName: string;
  };
  dashboard: {
    title: string;
    totalExams: string;
    avgScore: string;
    topRank: string;
    streak: string;
    badgeTitle: string;
    badgeDesc: string;
    verified: string;
    historyTitle: string;
    logout: string;
    newExam: string;
    passed: string;
  };
  liveExam: {
    negativeMarkText: string;
    timeText: string;
    reviewMarked: string;
    reviewBtn: string;
    questionOf: string;
    clearAnswer: string;
    prevBtn: string;
    nextBtn: string;
    finishBtn: string;
    passedCongrats: string;
    examCompleted: string;
    passMarkText: string;
    obtainedScore: string;
    correctAnswers: string;
    wrongAnswers: string;
    accuracyRate: string;
    retakeBtn: string;
    viewLeaderboard: string;
    solutionTitle: string;
    explanationLabel: string;
    confirmTitle: string;
    confirmText: string;
    continueExam: string;
    confirmSubmit: string;
  };
  admin: {
    portalTitle: string;
    superAdmin: string;
    overview: string;
    exams: string;
    questions: string;
    students: string;
    notices: string;
    settings: string;
    totalStudents: string;
    activeExams: string;
    questionBankCount: string;
    dailySubmissions: string;
    todayRevenue: string;
    createExamBtn: string;
    addQuestionBtn: string;
    postNoticeBtn: string;
    backToSite: string;
    logout: string;
    adminLoginTitle: string;
    adminLoginDesc: string;
  };
}

export const translations: Record<Language, Translations> = {
  bn: {
    nav: {
      topNotice: '⚡ ৪৭তম বিসিএস ও প্রাইমারি ৩য় ধাপের পূর্ণাঙ্গ লাইভ মডেল টেস্ট চলছে! ফ্রি অংশ নিন।',
      liveUpdate: 'লাইভ আপডেট',
      helpline: 'হেল্পলাইন: ০৯৬১-২০০৩০০',
      hours: 'সকাল ৯টা - রাত ১০টা',
      home: 'হোম',
      exams: 'পরীক্ষাসমূহ',
      courses: 'কোর্সসমূহ',
      studyroom: 'ফ্রি স্টাডি রুম',
      job_alert: 'চাকরির খবর',
      leaderboard: 'লিডারবোর্ড',
      routine: 'রুটিন ও নোটিশ',
      books: 'বই সম্ভার',
      liveExamBtn: 'লাইভ পরীক্ষা',
      dashboardBtn: 'ড্যাশবোর্ড',
      login: 'লগইন',
      signup: 'অ্যাকাউন্ট খুলুন',
      logout: 'লগআউট',
      switchLang: 'English',
    },
    hero: {
      badge: 'লাইভ মডেল টেস্ট ও চাকরি প্রস্তুতি প্ল্যাটফর্ম',
      titlePart1: 'বিসিএস, প্রাইমারি ও সরকারি চাকরির',
      titleHighlight: 'নির্ভুল লাইভ পরীক্ষা',
      titlePart2: 'ও পূর্ণাঙ্গ প্রস্তুতি',
      desc: 'হাজারো পরীক্ষার্থীর সাথে রিয়েল-টাইম মেধা তালিকায় অংশ নিন। প্রতিটি প্রশ্নের পুঙ্খানুপুঙ্খ ব্যাখ্যা ও নেগেটিভ মার্কিং সম্বলিত স্মার্ট টেস্ট প্ল্যাটফর্ম।',
      startFreeExam: 'ফ্রি লাইভ পরীক্ষা দিন',
      demoTest: 'ডেমো পরীক্ষা দেখুন',
      registerFree: 'রেজিস্ট্রেশন করুন',
      featQuestionBank: '২০,০০০+ প্রশ্নব্যাংক',
      featNegativeMarking: 'রিয়েল-টাইম নেগেটিভ মার্কিং',
      featInstantSolutions: 'তাত্ক্ষণিক পুঙ্খানুপুঙ্খ সমাধান',
    },
    stats: {
      title: 'আমাদের অর্জন ও সক্রিয় পরীক্ষার্থীদের পরিসংখ্যান',
      students: 'সক্রিয় পরীক্ষার্থী',
      studentsCount: '৫০,০০০+',
      examsTaken: 'মডেল টেস্ট সম্পন্ন',
      examsCount: '২,৫০,০০০+',
      questionBank: 'বিশুদ্ধ প্রশ্নব্যাংক',
      questionCount: '২৫,০০০+',
      passRate: 'সফলতার হার',
      passRateCount: '৯৪.৫%',
    },
    features: {
      badge: 'কেন এক্সাম সেবা সেরা',
      title: 'স্মার্ট প্রস্তুতির জন্য সর্বাধুনিক প্রযুক্তি',
      subtitle: 'আমরা সাধারণ কুইজের বাইরে গিয়ে প্রতিটি শিক্ষার্থীর দুর্বলতা চিহ্নিত করি।',
      card1Title: 'রিয়েল-টাইম লাইভ র‍্যাঙ্কিং',
      card1Desc: 'সারা দেশের হাজারো পরীক্ষার্থীর সাথে একযোগে পরীক্ষা দিয়ে মেধা তালিকায় নিজের সঠিক অবস্থান জানুন।',
      card2Title: 'পুঙ্খানুপুঙ্খ প্রশ্ন সমাধান',
      card2Desc: 'পরীক্ষা শেষে প্রতিটি প্রশ্নের বিস্তারিত ব্যাখ্যা, রেফারেন্স ও শর্টকাট টেকনিক দেখে নিন।',
      card3Title: 'সময় নিয়ন্ত্রিত পরীক্ষা পরিবেশ',
      card3Desc: 'আসল পরীক্ষার হলের মতোই স্ট্রিক্ট টাইমার ও কাউন্টডাউনের মাধ্যমে সময় ব্যবস্থাপনা উন্নত করুন।',
      card4Title: 'নেগেটিভ মার্কিং ক্যালকুলেশন',
      card4Desc: 'ভুল উত্তরের জন্য সঠিক নেগেটিভ মার্কিং কাটা হয়, যা আপনাকে সতর্ক ও নিখুঁত হতে সাহায্য করে।',
      card5Title: 'বিষয়ভিত্তিক পারফরম্যান্স অ্যানালিটিক্স',
      card5Desc: 'বাংলা, ইংরেজি, গণিত ও সাধারণ জ্ঞানের কোন অংশে আপনার দুর্বলতা তা গ্রাফের মাধ্যমে জানুন।',
      card6Title: 'যেকোনো ডিভাইস থেকে পরীক্ষা',
      card6Desc: 'মোবাইল, ট্যাবলেট কিংবা ল্যাপটপ — যেকোনো ডিভাইসে স্মুথ ও আধুনিক ইন্টারফেসে পরীক্ষা দিন।',
    },
    batches: {
      badge: 'সকল লাইভ এক্সাম ব্যাচ',
      title: 'আপনার পছন্দের চাকরি প্রস্তুতি ব্যাচ বেছে নিন',
      subtitle: 'নিয়মিত বিষয়ভিত্তিক ও পূর্ণাঙ্গ মডেল টেস্টে অংশ নিয়ে মেধা যাচাই করুন।',
      catAll: 'সকল ব্যাচ',
      catBcs: '৪৭তম বিসিএস',
      catPrimary: 'প্রাইমারি শিক্ষক',
      catBank: 'ব্যাংক অফিসার',
      catNtrca: '১৯তম NTRCA',
      catOther: 'অন্যান্য সরকারি',
      questions: 'প্রশ্ন',
      duration: 'সময়',
      passMark: 'পাস মার্ক',
      examinees: 'পরীক্ষার্থী',
      startBtn: 'পরীক্ষা শুরু করুন',
      minutes: 'মিনিট',
    },
    courses: {
      badge: 'লাইভ কোর্স ও ক্লাস',
      title: 'শীর্ষ মেন্টরদের পরিচালিত লাইভ ও রেকর্ডেড কোর্স',
      subtitle: 'বিসিএস ও সরকারি চাকরির অভিজ্ঞ মেন্টরদের সাথে সরাসরি ক্লাসে অংশ নিন।',
      classes: 'টি লাইভ ক্লাস ও নোট',
      mentor: 'ইন্সট্রাক্টর:',
      enrollBtn: 'কোর্সে ভর্তি হন',
      enrolledToast: 'কোর্সে সফলভাবে এনরোলমেন্ট রিকুয়েস্ট গ্রহণ করা হয়েছে!',
    },
    dailyExam: {
      badge: 'ডেইলি ফ্রি স্পেশাল টেস্ট',
      title: 'আজকের উন্মুক্ত লাইভ মডেল টেস্ট',
      subtitle: 'প্রতিদিন নতুন নতুন টপিকের ওপর সবার জন্য সম্পূর্ণ ফ্রি পরীক্ষা।',
      topic: 'আজকের সিলেবাস / টপিক:',
      totalMarks: 'পূর্ণমান:',
      passMarks: 'পাস মার্ক:',
      duration: 'সময়কাল:',
      startNow: 'এখনই ফ্রি পরীক্ষা দিন',
      remainingTime: 'পরীক্ষা শেষ হতে বাকি সময়:',
    },
    leaderboard: {
      badge: 'রিয়েল-টাইম র‍্যাঙ্কিং',
      title: 'লাইভ লিডারবোর্ড ও মেধা তালিকা',
      subtitle: 'মডেল টেস্টে শীর্ষস্থান অধিকারী শিক্ষার্থীদের তালিকা। আপনার প্রস্তুতি মূল্যায়ন করুন অন্যদের সাথে।',
      filterAll: 'সকল মেধা তালিকা',
      filterBcs: '৪৭তম বিসিএস',
      filterPrimary: 'প্রাইমারি স্পেশাল',
      filterBank: 'ব্যাংক অফিসার',
      filterNtrca: '১৯তম NTRCA',
      rankCol: 'র‍্যাঙ্ক',
      nameCol: 'শিক্ষার্থীর নাম',
      batchCol: 'ব্যাচ ও পরীক্ষা',
      scoreCol: 'স্কোর',
      accuracyCol: 'এক্যুরেসি',
      timeCol: 'গৃহীত সময়',
      firstPlace: '১ম স্থান (টপার)',
    },
    jobAlert: {
      badge: 'নিয়োগ বিজ্ঞপ্তি',
      title: 'চলমান সকল সরকারি ও স্বায়ত্তশাসিত চাকরির খবর',
      subtitle: 'সর্বশেষ সরকারি সার্কুলার, আবেদনের সময়সীমা ও প্রয়োজনীয় তথ্য এক নজরে জানুন।',
      vacancy: 'পদসংখ্যা:',
      deadline: 'আবেদনের শেষ তারিখ:',
      applyBtn: 'বিজ্ঞপ্তি দেখুন ও আবেদন করুন',
    },
    routine: {
      badge: 'সাপ্তাহিক ও মাসিক শিডিউল',
      title: 'পরীক্ষার রুটিন ও নোটিশ বোর্ড',
      subtitle: 'সকল ব্যাচের পরীক্ষার সময়সূচি এবং জরুরি ঘোষণা এক সাথে জানুন।',
      upcomingRoutine: 'আসন্ন মডেল টেস্টের রুটিন',
      realtimeUpdate: 'রিয়েল-টাইম আপডেট',
      noticeBoard: 'জরুরি নোটিশ বোর্ড',
      goToExam: 'পরীক্ষায় যান',
      noticeTitle: 'নোটিশ বিজ্ঞপ্তি',
      closeBtn: 'বন্ধ করুন',
    },
    books: {
      badge: 'সহায়ক বই সম্ভার',
      title: 'সেরা লেখকদের চাকরির প্রস্তুতিমূলক বই',
      subtitle: 'বিষয়ভিত্তিক প্রস্তুতি ও মডেল টেস্টের জন্য নির্ভরযোগ্য প্রকাশনীর বই সরাসরি অর্ডার করুন।',
      buyNow: 'অর্ডার করুন',
      inStock: 'স্টকে আছে',
    },
    cta: {
      title: 'চাকরি পরীক্ষার শতভাগ সেরা প্রস্তুতি শুরু করুন আজই!',
      subtitle: 'হাজারো পরীক্ষার্থীর সাথে মেধা যাচাই করুন এবং নিজের স্বপ্নের ক্যারিয়ার নিশ্চিত করুন।',
      btnSignup: 'ফ্রি অ্যাকাউন্ট খুলুন',
      btnExam: 'আজকের লাইভ পরীক্ষা দিন',
    },
    footer: {
      about: 'বাংলাদেশের প্রথম সারির চাকরি পরীক্ষা প্রস্তুতি ও মডেল টেস্ট প্ল্যাটফর্ম। বিসিএস, প্রাথমিক শিক্ষক নিয়োগ ও ব্যাংকের নির্ভুল মূল্যায়ন।',
      quickLinks: 'গুরুত্বপূর্ণ লিংকসমূহ',
      categories: 'পরীক্ষা ক্যাটাগরি',
      contact: 'যোগাযোগ ও হেল্পডেস্ক',
      bcsExam: 'বিসিএস প্রিলিমিনারি পরীক্ষা',
      primaryExam: 'প্রাথমিক সহকারী শিক্ষক নিয়োগ',
      ntrcaExam: '১৯তম শিক্ষক নিবন্ধন (NTRCA)',
      bankExam: 'কম্বাইন্ড ব্যাংক অফিসার পরীক্ষা',
      allJobs: 'চলমান সকল চাকরির খবর',
      helplineText: '(সকাল ৯টা হতে রাত ১০টা)',
      privacy: 'গোপনীয়তা নীতি',
      terms: 'ব্যবহারের শর্তাবলী',
      refund: 'রিফান্ড পলিসি',
      copyright: '© ২০২৬ এক্সাম সেবা (Exam Seba) প্ল্যাটফর্ম। সর্বস্বত্ব সংরক্ষিত।',
    },
    auth: {
      loginTitle: 'শিক্ষার্থী লগইন',
      signupTitle: 'নতুন অ্যাকাউন্ট তৈরি করুন',
      loginSub: 'আপনার অ্যাকাউন্টে প্রবেশ করে লাইভ পরীক্ষায় অংশ নিন',
      signupSub: 'আজই রেজিস্ট্রেশন করে ফ্রি মডেল টেস্ট দিন',
      demoText: 'দ্রুত ডেমো অ্যাকাউন্টে প্রবেশ করতে চান?',
      demoBtn: '১-ক্লিকে ডেমো লগইন করুন',
      nameLabel: 'আপনার পূর্ণ নাম',
      namePlaceholder: 'উদা: মোঃ আব্দুল্লাহ',
      phoneLabel: 'মোবাইল নম্বর',
      phonePlaceholder: '০১৭XXXXXXXX',
      batchLabel: 'প্রস্তুতির মূল লক্ষ্য',
      passwordLabel: 'পাসওয়ার্ড',
      passwordPlaceholder: 'কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড দিন',
      submitLogin: 'লগইন করুন',
      submitSignup: 'অ্যাকাউন্ট খুলুন',
      noAccount: 'কোনো অ্যাকাউন্ট নেই? রেজিস্ট্রেশন করুন',
      hasAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন',
      validationPhone: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন',
      validationPassword: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
      validationName: 'আপনার পূর্ণ নাম লিখুন',
    },
    dashboard: {
      title: 'শিক্ষার্থী ড্যাশবোর্ড',
      totalExams: 'মোট পরীক্ষা',
      avgScore: 'গড় স্কোর',
      topRank: 'সর্বোচ্চ অবস্থান',
      streak: 'স্টাডি স্ট্রিক',
      badgeTitle: 'টপ স্কিল পারফর্মার ব্যাজ অর্জন',
      badgeDesc: 'ধারাবাহিক ৩টি মডেল টেস্টে ৯০%+ নম্বর পাওয়ার স্বীকৃতি।',
      verified: 'ভেরিফাইড',
      historyTitle: 'সাম্প্রতিক পরীক্ষার ইতিহাস ও ফলাফল',
      logout: 'লগআউট করুন',
      newExam: 'নতুন লাইভ পরীক্ষা দিন',
      passed: 'উত্তীর্ণ',
    },
    liveExam: {
      negativeMarkText: 'নেগেটিভ মার্কিং',
      timeText: 'অবশিষ্ট সময়',
      reviewMarked: 'রিভিউ মার্কড',
      reviewBtn: 'রিভিউ করুন',
      questionOf: 'প্রশ্ন',
      clearAnswer: 'উত্তর মুছুন (Clear)',
      prevBtn: 'পূর্ববর্তী',
      nextBtn: 'পরবর্তী',
      finishBtn: 'পরীক্ষা সমাপ্ত করুন',
      passedCongrats: 'অভিনন্দন! আপনি উত্তীর্ণ হয়েছেন',
      examCompleted: 'পরীক্ষা সম্পন্ন হয়েছে',
      passMarkText: 'পাস মার্ক',
      obtainedScore: 'প্রাপ্ত নম্বর',
      correctAnswers: 'সঠিক উত্তর',
      wrongAnswers: 'ভুল উত্তর',
      accuracyRate: 'নির্ভুলতার হার',
      retakeBtn: 'পুনরায় পরীক্ষা দিন',
      viewLeaderboard: 'মেধা তালিকা (Leaderboard) দেখুন',
      solutionTitle: 'বিস্তারিত প্রশ্ন সমাধান ও ব্যাখ্যা',
      explanationLabel: 'ব্যাখ্যা ও রেফারেন্স:',
      confirmTitle: 'আপনি কি পরীক্ষা সমাপ্ত করতে চান?',
      confirmText: 'টি প্রশ্নের উত্তর দিয়েছেন। এখনো বাকি রয়েছে',
      continueExam: 'পরীক্ষা চালিয়ে যান',
      confirmSubmit: 'হ্যাঁ, নিশ্চিত জমা দিন',
    },
    admin: {
      portalTitle: 'এক্সাম সেবা অ্যাডমিন কন্ট্রোল',
      superAdmin: 'সুপার অ্যাডমিনিস্ট্রেটর',
      overview: 'ওভারভিউ',
      exams: 'পরীক্ষা ব্যবস্থাপনা',
      questions: 'প্রশ্নব্যাংক',
      students: 'শিক্ষার্থী ও এনরোলমেন্ট',
      notices: 'নোটিশ ও সার্কুলার',
      settings: 'সিস্টেম সেটিংস',
      totalStudents: 'মোট পরীক্ষার্থী',
      activeExams: 'সক্রিয় লাইভ এক্সাম',
      questionBankCount: 'প্রশ্নব্যাংক সংখ্যা',
      dailySubmissions: 'দৈনিক পরীক্ষা সাবমিশন',
      todayRevenue: 'আজকের রেভিনিউ',
      createExamBtn: 'নতুন পরীক্ষা তৈরি করুন',
      addQuestionBtn: 'প্রশ্ন যুক্ত করুন',
      postNoticeBtn: 'জরুরি নোটিশ দিন',
      backToSite: 'মূল সাইটে যান',
      logout: 'লগআউট',
      adminLoginTitle: 'এক্সাম সেবা অ্যাডমিন পোর্টাল',
      adminLoginDesc: 'নিরাপদ অ্যাডমিন অ্যাক্সেসের জন্য আপনার ক্রেডেনশিয়াল প্রদান করুন',
    },
  },
  en: {
    nav: {
      topNotice: '⚡ 47th BCS & Primary 3rd Phase Full Live Model Test is Ongoing! Join Free.',
      liveUpdate: 'Live Update',
      helpline: 'Helpline: 0961-200300',
      hours: '9:00 AM - 10:00 PM',
      home: 'Home',
      exams: 'Exams',
      courses: 'Courses',
      studyroom: 'Free Study Room',
      job_alert: 'Job Alerts',
      leaderboard: 'Leaderboard',
      routine: 'Routine & Notices',
      books: 'Book Store',
      liveExamBtn: 'Live Exam',
      dashboardBtn: 'Dashboard',
      login: 'Login',
      signup: 'Register',
      logout: 'Logout',
      switchLang: 'বাংলা',
    },
    hero: {
      badge: 'Live Model Test & Job Prep Platform',
      titlePart1: 'Prepare for BCS, Primary & Govt Jobs with',
      titleHighlight: 'Real-Time Live Exams',
      titlePart2: '& Full Guidance',
      desc: 'Compete on real-time merit lists with thousands of examinees. Smart test platform featuring detailed explanations and authentic negative marking.',
      startFreeExam: 'Start Free Live Exam',
      demoTest: 'Try Demo Test',
      registerFree: 'Register Now',
      featQuestionBank: '20,000+ Question Bank',
      featNegativeMarking: 'Real-Time Negative Marking',
      featInstantSolutions: 'Instant In-Depth Solutions',
    },
    stats: {
      title: 'Our Achievements & Active Examinees Statistics',
      students: 'Active Students',
      studentsCount: '50,000+',
      examsTaken: 'Model Tests Completed',
      examsCount: '250,000+',
      questionBank: 'Authentic Question Bank',
      questionCount: '25,000+',
      passRate: 'Success Rate',
      passRateCount: '94.5%',
    },
    features: {
      badge: 'Why Exam Seba is Best',
      title: 'Cutting-Edge Technology for Smart Prep',
      subtitle: 'Going beyond simple quizzes to identify each student\'s weak areas.',
      card1Title: 'Real-Time Live Ranking',
      card1Desc: 'Compete simultaneously with thousands across the nation to discover your precise standing on the merit list.',
      card2Title: 'In-Depth Question Solutions',
      card2Desc: 'Access detailed explanations, authoritative references, and shortcut techniques right after every test.',
      card3Title: 'Strict Timed Environment',
      card3Desc: 'Improve exam pacing with authentic time limits and live countdown clocks matching real exam halls.',
      card4Title: 'Authentic Negative Marking',
      card4Desc: 'Accurate negative mark deductions train you to avoid guesswork and build surgical accuracy.',
      card5Title: 'Subject-wise Analytics',
      card5Desc: 'Identify whether you need improvement in Bengali, English, Math, or General Knowledge with visual charts.',
      card6Title: 'Seamless on Any Device',
      card6Desc: 'Take exams smoothly on smartphones, tablets, or laptops with our lightning-fast responsive interface.',
    },
    batches: {
      badge: 'All Live Exam Batches',
      title: 'Choose Your Preferred Job Preparation Batch',
      subtitle: 'Regular subject-wise and full-length model tests to assess your competitive readiness.',
      catAll: 'All Batches',
      catBcs: '47th BCS',
      catPrimary: 'Primary Teacher',
      catBank: 'Bank Officer',
      catNtrca: '19th NTRCA',
      catOther: 'Other Govt Jobs',
      questions: 'Questions',
      duration: 'Duration',
      passMark: 'Pass Mark',
      examinees: 'Candidates',
      startBtn: 'Start Exam',
      minutes: 'Mins',
    },
    courses: {
      badge: 'Live Courses & Classes',
      title: 'Live & Recorded Courses by Premier Mentors',
      subtitle: 'Join interactive online classes led by seasoned BCS and career mentors.',
      classes: 'Live Classes & Notes',
      mentor: 'Instructor:',
      enrollBtn: 'Enroll Now',
      enrolledToast: 'Enrollment request submitted successfully!',
    },
    dailyExam: {
      badge: 'Daily Free Special Test',
      title: 'Today\'s Open Live Model Test',
      subtitle: 'Fresh exam topics every single day, 100% free for everyone.',
      topic: 'Today\'s Syllabus / Topic:',
      totalMarks: 'Total Marks:',
      passMarks: 'Pass Mark:',
      duration: 'Duration:',
      startNow: 'Start Free Exam Now',
      remainingTime: 'Time remaining to participate:',
    },
    leaderboard: {
      badge: 'Real-Time Ranking',
      title: 'Live Leaderboard & National Merit List',
      subtitle: 'Top-performing students in recent model tests. Compare your preparation against peers.',
      filterAll: 'All Batches',
      filterBcs: '47th BCS',
      filterPrimary: 'Primary Special',
      filterBank: 'Bank Officer',
      filterNtrca: '19th NTRCA',
      rankCol: 'Rank',
      nameCol: 'Student Name',
      batchCol: 'Batch & Exam',
      scoreCol: 'Score',
      accuracyCol: 'Accuracy',
      timeCol: 'Time Taken',
      firstPlace: '1st Place (Topper)',
    },
    jobAlert: {
      badge: 'Job Circulars',
      title: 'Ongoing Government & Autonomous Job Openings',
      subtitle: 'Latest circulars, deadlines, and key recruitment information at a glance.',
      vacancy: 'Vacancies:',
      deadline: 'Deadline:',
      applyBtn: 'View Circular & Apply',
    },
    routine: {
      badge: 'Weekly & Monthly Schedule',
      title: 'Exam Routine & Notice Board',
      subtitle: 'Upcoming exam schedule and critical announcements across all batches.',
      upcomingRoutine: 'Upcoming Model Test Routine',
      realtimeUpdate: 'Real-Time Updates',
      noticeBoard: 'Emergency Notice Board',
      goToExam: 'Take Exam',
      noticeTitle: 'Notice Bulletin',
      closeBtn: 'Close',
    },
    books: {
      badge: 'Publication Store',
      title: 'Top Job Preparation Publications & Books',
      subtitle: 'Order authoritative guides and question banks delivered directly to your doorstep.',
      buyNow: 'Order Now',
      inStock: 'In Stock',
    },
    cta: {
      title: 'Begin Your Top-Tier Govt Job Preparation Today!',
      subtitle: 'Benchmark your knowledge with 100,000+ examinees and secure your dream career.',
      btnSignup: 'Create Free Account',
      btnExam: 'Take Today\'s Exam',
    },
    footer: {
      about: 'Bangladesh\'s leading government job preparation and live model test platform for BCS, Primary, Bank, and NTRCA exams.',
      quickLinks: 'Quick Links',
      categories: 'Exam Categories',
      contact: 'Helpline & Support',
      bcsExam: 'BCS Preliminary Test',
      primaryExam: 'Primary Assistant Teacher',
      ntrcaExam: '19th NTRCA Teachers Reg',
      bankExam: 'Combined Bank Officer',
      allJobs: 'All Current Job Circulars',
      helplineText: '(9:00 AM to 10:00 PM)',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      refund: 'Refund Policy',
      copyright: '© 2026 Exam Seba Platform. All rights reserved.',
    },
    auth: {
      loginTitle: 'Student Login',
      signupTitle: 'Create New Account',
      loginSub: 'Sign in to your account and take live exams',
      signupSub: 'Sign up today and take free model tests',
      demoText: 'Want instant demo access?',
      demoBtn: '1-Click Demo Login',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Md. Abdullah',
      phoneLabel: 'Mobile Number',
      phonePlaceholder: '017XXXXXXXX',
      batchLabel: 'Primary Target Goal',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Minimum 6 characters',
      submitLogin: 'Log In',
      submitSignup: 'Sign Up',
      noAccount: 'Don\'t have an account? Sign Up',
      hasAccount: 'Already have an account? Log In',
      validationPhone: 'Please provide a valid 11-digit mobile number',
      validationPassword: 'Password must be at least 6 characters',
      validationName: 'Please enter your full name',
    },
    dashboard: {
      title: 'Student Dashboard',
      totalExams: 'Total Exams',
      avgScore: 'Average Score',
      topRank: 'Top Position',
      streak: 'Study Streak',
      badgeTitle: 'Top Performer Badge Earned',
      badgeDesc: 'Recognized for achieving 90%+ scores in 3 consecutive tests.',
      verified: 'Verified',
      historyTitle: 'Recent Exam History & Results',
      logout: 'Log Out',
      newExam: 'Start New Live Exam',
      passed: 'Passed',
    },
    liveExam: {
      negativeMarkText: 'Negative Marking',
      timeText: 'Time Remaining',
      reviewMarked: 'Marked for Review',
      reviewBtn: 'Review Later',
      questionOf: 'Question',
      clearAnswer: 'Clear Answer',
      prevBtn: 'Previous',
      nextBtn: 'Next',
      finishBtn: 'Submit Exam',
      passedCongrats: 'Congratulations! You Passed',
      examCompleted: 'Exam Completed',
      passMarkText: 'Pass Mark',
      obtainedScore: 'Score Obtained',
      correctAnswers: 'Correct',
      wrongAnswers: 'Wrong',
      accuracyRate: 'Accuracy Rate',
      retakeBtn: 'Retake Exam',
      viewLeaderboard: 'View Leaderboard',
      solutionTitle: 'Detailed Solutions & Explanations',
      explanationLabel: 'Explanation & Reference:',
      confirmTitle: 'Do you want to submit your exam?',
      confirmText: 'questions answered. Questions remaining:',
      continueExam: 'Continue Exam',
      confirmSubmit: 'Yes, Submit Exam',
    },
    admin: {
      portalTitle: 'Exam Seba Admin Control',
      superAdmin: 'Super Administrator',
      overview: 'Overview',
      exams: 'Exam Management',
      questions: 'Question Bank',
      students: 'Students & Enrolments',
      notices: 'Notices & Circulars',
      settings: 'System Settings',
      totalStudents: 'Total Students',
      activeExams: 'Active Live Exams',
      questionBankCount: 'Questions in Bank',
      dailySubmissions: 'Daily Submissions',
      todayRevenue: "Today's Revenue",
      createExamBtn: 'Create New Exam',
      addQuestionBtn: 'Add Question',
      postNoticeBtn: 'Post Notice',
      backToSite: 'View Public Site',
      logout: 'Logout',
      adminLoginTitle: 'Exam Seba Admin Portal',
      adminLoginDesc: 'Enter your credentials to securely access the management console',
    },
  },
};
