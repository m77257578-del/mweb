/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Upload,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings,
  Lock,
  RefreshCw,
  CreditCard,
  BookOpen,
  Briefcase,
  Scale,
  Building2,
  HelpCircle,
  Send,
  Download,
  Trash2,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Activity,
  DollarSign,
  Layers,
  Globe,
  Menu,
  LogOut,
  Key,
  Sparkles,
  Bell,
  CheckSquare
} from 'lucide-react';

// --- INITIAL DEMO DATA ---
interface Consultation {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  caseType: string;
  description: string;
  fileName?: string;
  fileSize?: string;
  status: 'قيد المراجعة' | 'تم الرد' | 'أرشيف' | 'موعد مؤكد';
  date: string;
}

interface Booking {
  id: string;
  clientName: string;
  phone: string;
  date: string;
  timeSlot: string;
  consultationType: string;
  status: 'مؤكد' | 'مكتمل' | 'ملغي';
}

interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  author: string;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 'c1',
    clientName: 'أحمد بن محمد الروقي',
    phone: '+966 50 123 4567',
    email: 'ahmed@example.com',
    caseType: 'قانون الشركات',
    description: 'استشارة عاجلة حول صياغة عقد تأسيس شركة ذات مسؤولية محدودة وشراكة تجارية.',
    fileName: 'contract_draft_v1.pdf',
    fileSize: '1.4 MB',
    status: 'قيد المراجعة',
    date: '2026-11-05'
  },
  {
    id: 'c2',
    clientName: 'سارة خالد الدوسري',
    phone: '+966 55 987 6543',
    email: 'sara@example.com',
    caseType: 'القضايا العمالية',
    description: 'نزاع عمالي بشأن مستحقات نهاية الخدمة والتعويض عن الفصل التعسفي.',
    fileName: 'employment_contract.pdf',
    fileSize: '850 KB',
    status: 'تم الرد',
    date: '2026-11-04'
  },
  {
    id: 'c3',
    clientName: 'شركة النخبة العقارية',
    phone: '+966 56 444 3322',
    email: 'info@elite-realestate.com',
    caseType: 'القضايا المدنية',
    description: 'نزاع عقاري على ملكية أرض تجارية في شمال المدينة.',
    fileName: 'deed_document.jpg',
    fileSize: '1.9 MB',
    status: 'موعد مؤكد',
    date: '2026-11-03'
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    clientName: 'فيصل عبد الله القحطاني',
    phone: '+966 50 777 8899',
    date: '2026-11-06',
    timeSlot: '10:00 صباحاً - 11:00 صباحاً',
    consultationType: 'استشارة قانونية جنائية',
    status: 'مؤكد'
  },
  {
    id: 'b2',
    clientName: 'منال تركي العتيبي',
    phone: '+966 54 111 2233',
    date: '2026-11-06',
    timeSlot: '01:00 ظهراً - 02:00 ظهراً',
    consultationType: 'ملكية فكرية وعلامات تجارية',
    status: 'مؤكد'
  }
];

const INITIAL_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'دليلك القانوني لتأسيس الشركات الناشئة في المملكة لعام 2026',
    category: 'قانون الشركات',
    summary: 'أبرز الاشتراطات القانونية والتراخيص المطلوبة لإطلاق شركتك الناشئة بنجاح وحماية حقوق الشركاء.',
    content: 'تعتبر الشركات الناشئة عصب الاقتصاد الحديث. يتطلب تأسيس شركة ناجحة فهماً عميقاً لأنظمة الشركات واللوائح التنفيذية الجديدة، بما يشمل صياغة عقود التأسيس، حماية الملكية الفكرية، وتنظيم العلاقة بين المؤسسين والمستثمرين...',
    date: '2026-11-01',
    author: 'المحامي المستشار / طارق الحكيم'
  },
  {
    id: 'a2',
    title: 'أهم حقوق الموظف والمميزات الإلزامية في نظام العمل الجديد',
    category: 'القضايا العمالية',
    summary: 'تعرف على إجازاتك، ساعات العمل الإضافية، وحقوق التعويض عند إنهاء العقد بحسب النظام.',
    content: 'يحفظ نظام العمل السعودي حقوق الطرفين بوضوح. ومن أهم الجوانب التي يجب على كل عامل الإمام بها هي آلية احتساب مكافأة نهاية الخدمة، حالات الفصل المشروع وغير المشروع، والإجراءات النظامية لتقديم الشكاوى العمالية...',
    date: '2026-10-28',
    author: 'المحامية / ريم الشهري'
  },
  {
    id: 'a3',
    title: 'خطوات حماية العلامة التجارية والملكية الفكرية لمشروعك',
    category: 'الملكية الفكرية',
    summary: 'كيف توثق علامتك التجارية وتمنع المنافسين من تقليد منتجاتك أو خدماتك الرقمية.',
    content: 'العلامة التجارية هي الهوية الأهم لأي مشروع تجاري ناجح. يوضح هذا المقال الخطوات العملية لتسجيل العلامة لدى الجهات المختصة وحمايتها قانونياً ضد التعدي أو الاستخدام غير المرخص...',
    date: '2026-10-20',
    author: 'المحامي / فهد السبيعي'
  }
];

const TIME_SLOTS = [
  '09:00 صباحاً - 10:00 صباحاً',
  '10:00 صباحاً - 11:00 صباحاً',
  '11:00 صباحاً - 12:00 ظهراً',
  '01:00 ظهراً - 02:00 ظهراً',
  '02:00 ظهراً - 03:00 عصراً',
  '03:00 عصراً - 04:00 عصراً',
  '04:00 عصراً - 05:00 مساءً'
];

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'blog' | 'booking' | 'contact' | 'admin'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App Data State (LocalStorage persistence with demo fallback)
  const [consultations, setConsultations] = useState<Consultation[]>(() => {
    const saved = localStorage.getItem('law_consultations');
    return saved ? JSON.parse(saved) : INITIAL_CONSULTATIONS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('law_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('law_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 'n1', title: 'استشارة جديدة', message: 'تم استلام طلب استشارة من أحمد الروقي', time: 'منذ 10 دقائق', read: false },
    { id: 'n2', title: 'حجز موعد جديد', message: 'حجز موعد استشارة لقضية جنائية غداً', time: 'منذ ساعة', read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('law_consultations', JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem('law_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('law_articles', JSON.stringify(articles));
  }, [articles]);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // --- CONSULTATION FORM STATE ---
  const [consultationForm, setConsultationForm] = useState({
    clientName: '',
    phone: '',
    email: '',
    caseType: 'قانون الشركات',
    description: '',
    file: null as File | null,
    fileName: ''
  });
  const [isSubmittingConsultation, setIsSubmittingConsultation] = useState(false);
  const [consultationSuccess, setConsultationSuccess] = useState(false);

  // --- BOOKING FORM STATE ---
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingForm, setBookingForm] = useState({
    clientName: '',
    phone: '',
    consultationType: 'استشارة قانونية عامة'
  });
  const [bookingSuccessModal, setBookingSuccessModal] = useState(false);

  // --- PAYMENT SANDBOX STATE ---
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'success'>('form');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/28',
    cvc: '123',
    cardholder: ''
  });
  const [pendingBookingData, setPendingBookingData] = useState<any>(null);

  // --- ADMIN AUTH STATE ---
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@lawdemo.com');
  const [adminPassword, setAdminPassword] = useState('Admin@2026!');
  const [adminTab, setAdminTab] = useState<'stats' | 'consultations' | 'bookings' | 'cms' | 'sandbox'>('stats');

  // --- CMS NEW ARTICLE STATE ---
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'قانون الشركات',
    summary: '',
    content: '',
    author: 'المحامي المستشار / طارق الحكيم'
  });

  // Handle consultation submit
  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationForm.clientName || !consultationForm.phone || !consultationForm.description) {
      showToast('يرجى تعبئة الحقول الإجبارية', 'info');
      return;
    }

    setIsSubmittingConsultation(true);
    setTimeout(() => {
      const newC: Consultation = {
        id: 'c_' + Date.now(),
        clientName: consultationForm.clientName,
        phone: consultationForm.phone,
        email: consultationForm.email || 'client@example.com',
        caseType: consultationForm.caseType,
        description: consultationForm.description,
        fileName: consultationForm.fileName || undefined,
        fileSize: consultationForm.fileName ? '1.2 MB' : undefined,
        status: 'قيد المراجعة',
        date: new Date().toISOString().split('T')[0]
      };

      setConsultations([newC, ...consultations]);
      setNotifications([
        {
          id: 'n_' + Date.now(),
          title: 'استشارة قانونية جديدة',
          message: `استشارة جديدة من العميل: ${consultationForm.clientName}`,
          time: 'الآن',
          read: false
        },
        ...notifications
      ]);

      setIsSubmittingConsultation(false);
      setConsultationSuccess(true);
      showToast('تم إرسال طلب الاستشارة بنجاح وإشعار لوحة التحكم!');
      setConsultationForm({
        clientName: '',
        phone: '',
        email: '',
        caseType: 'قانون الشركات',
        description: '',
        file: null,
        fileName: ''
      });
    }, 1000);
  };

  // Handle Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !bookingForm.clientName || !bookingForm.phone) {
      showToast('الرجاء اختيار الوقت وتعبئة البيانات الشخصية للحجز', 'info');
      return;
    }

    // Open Payment Sandbox for booking
    setPendingBookingData({
      clientName: bookingForm.clientName,
      phone: bookingForm.phone,
      date: selectedDate,
      timeSlot: selectedSlot,
      consultationType: bookingForm.consultationType
    });
    setShowPaymentModal(true);
  };

  // Confirm Payment and Finalize Booking
  const handlePaymentComplete = () => {
    setPaymentStep('success');
    setTimeout(() => {
      if (pendingBookingData) {
        const newB: Booking = {
          id: 'b_' + Date.now(),
          ...pendingBookingData,
          status: 'مؤكد'
        };
        setBookings([newB, ...bookings]);
        setNotifications([
          {
            id: 'n_' + Date.now(),
            title: 'حجز موعد مؤكد ودفع ناجح',
            message: `موعد جديد مؤكد للعميل: ${pendingBookingData.clientName} في ${pendingBookingData.date}`,
            time: 'الآن',
            read: false
          },
          ...notifications
        ]);
      }
      setShowPaymentModal(false);
      setPaymentStep('form');
      setBookingSuccessModal(true);
      showToast('تم حجز الموعد وتأكيد الدفع بنجاح!');
      // reset booking form
      setBookingForm({ clientName: '', phone: '', consultationType: 'استشارة قانونية عامة' });
      setSelectedSlot('');
    }, 1500);
  };

  // Reset demo database
  const handleResetDatabase = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط قاعدة البيانات التجريبية إلى حالتها الافتراضية؟')) {
      setConsultations(INITIAL_CONSULTATIONS);
      setBookings(INITIAL_BOOKINGS);
      setArticles(INITIAL_ARTICLES);
      localStorage.clear();
      showToast('تم إعادة تعيين النسخة التجريبية بنجاح!');
    }
  };

  // Check if slot is booked
  const isSlotBooked = (date: string, slot: string) => {
    return bookings.some(b => b.date === date && b.timeSlot === slot && b.status !== 'ملغي');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Cairo',sans-serif]" dir="rtl">
      
      {/* SOFTWARE AGENCY TRIAL HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white text-xs sm:text-sm py-2 px-4 shadow-inner flex flex-wrap items-center justify-between gap-2 z-50">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="font-bold">نسخة تجريبية حصرية (Trial Demo)</span>
          <span className="hidden md:inline opacity-80">| نظام إدارة مكاتب المحاماة والاستشارات القانونية المتطور</span>
        </div>
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <span className="bg-amber-950/60 px-2.5 py-1 rounded-full text-xs border border-amber-500/40">
            ⏳ تصفير تلقائي للبيانات كل 24 ساعة
          </span>
          <button
            onClick={() => setCurrentView('admin')}
            className="bg-white text-amber-900 font-bold px-3 py-1 rounded shadow text-xs hover:bg-amber-100 transition flex items-center gap-1.5"
          >
            <Key className="w-3.5 h-3.5" />
            دخول لوحة التحكم التجريبية
          </button>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* LOGO & BRAND */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/20 text-white">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                العدالة الذكية <span className="text-amber-400 text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">بريميوم</span>
              </h1>
              <p className="text-xs text-slate-400">نظام إدارة المحاماة والاستشارات الاحترافي</p>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                currentView === 'home' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                currentView === 'about' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              من نحن والتخصصات
            </button>
            <button
              onClick={() => setCurrentView('blog')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                currentView === 'blog' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              المدونة القانونية
            </button>
            <button
              onClick={() => setCurrentView('booking')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                currentView === 'booking' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              حجز المواعيد
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                currentView === 'contact' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              اتصل بنا
            </button>
          </nav>

          {/* ACTIONS & NOTIFICATIONS */}
          <div className="flex items-center gap-3">
            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 relative transition border border-slate-700"
                title="الإشعارات الفورية"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {/* Notifications Popup */}
              {showNotifications && (
                <div className="absolute left-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-3 px-4 z-50 text-right">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-amber-400" /> الإشعارات الفورية (Live)
                    </h4>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      تحديد الكل مقروء
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">لا توجد إشعارات جديدة</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-2.5 rounded-xl text-xs border ${n.read ? 'bg-slate-800/40 border-slate-800 text-slate-400' : 'bg-slate-800 border-amber-500/40 text-slate-200'}`}>
                          <div className="flex justify-between items-start font-bold mb-1">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-amber-400 font-normal">{n.time}</span>
                          </div>
                          <p className="leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentView('admin')}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 transition text-sm"
            >
              <BarChart3 className="w-4 h-4" />
              لوحة التحكم
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN NAV */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2">
            <button
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className={`w-full text-right px-4 py-2.5 rounded-lg font-semibold text-sm ${currentView === 'home' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => { setCurrentView('about'); setMobileMenuOpen(false); }}
              className={`w-full text-right px-4 py-2.5 rounded-lg font-semibold text-sm ${currentView === 'about' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              من نحن والتخصصات
            </button>
            <button
              onClick={() => { setCurrentView('blog'); setMobileMenuOpen(false); }}
              className={`w-full text-right px-4 py-2.5 rounded-lg font-semibold text-sm ${currentView === 'blog' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              المدونة القانونية
            </button>
            <button
              onClick={() => { setCurrentView('booking'); setMobileMenuOpen(false); }}
              className={`w-full text-right px-4 py-2.5 rounded-lg font-semibold text-sm ${currentView === 'booking' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              حجز المواعيد
            </button>
            <button
              onClick={() => { setCurrentView('contact'); setMobileMenuOpen(false); }}
              className={`w-full text-right px-4 py-2.5 rounded-lg font-semibold text-sm ${currentView === 'contact' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              اتصل بنا
            </button>
            <button
              onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
              className={`w-full text-right px-4 py-2.5 rounded-lg font-semibold text-sm bg-amber-600 text-white`}
            >
              لوحة التحكم التجريبية
            </button>
          </div>
        )}
      </header>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-500/50 flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-bold">{toast.message}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW: HOME */}
      {/* ========================================================= */}
      {currentView === 'home' && (
        <main className="flex-1">
          {/* HERO SECTION */}
          <section className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6 text-right">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" /> معتمدون رسمياً من وزارة العدل والهيئة السعودية للمحامين
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  العدالة والاحترافية <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                    في حماية حقوقك القانونية
                  </span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  نخبة من أفضل المستشارين والمحامين المرخصين لتقديم الدعم القانوني الشامل، صياغة العقود، وتمثيل الشركات والأفراد بأعلى معايير الكفاءة والدقة.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setCurrentView('booking')}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 transition flex items-center gap-2 text-base"
                  >
                    <Calendar className="w-5 h-5" />
                    احجز موعد استشارة فورية
                  </button>
                  <button
                    onClick={() => setCurrentView('contact')}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-2xl border border-slate-700 transition flex items-center gap-2 text-base"
                  >
                    <Send className="w-5 h-5 text-amber-400" />
                    اطلب استشارة قانونية مكتوبة
                  </button>
                </div>

                {/* STATS COUNTER */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800">
                  <div>
                    <h3 className="text-3xl font-black text-amber-400">+1,500</h3>
                    <p className="text-xs text-slate-400 mt-1">قضية ناجحة</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-amber-400">98%</h3>
                    <p className="text-xs text-slate-400 mt-1">نسبة رضا العملاء</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-amber-400">+15 سنة</h3>
                    <p className="text-xs text-slate-400 mt-1">خبرة قانونية رائدة</p>
                  </div>
                </div>
              </div>

              {/* QUICK CONSULTATION FORM WIDGET */}
              <div className="bg-slate-900/90 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">نموذج الاستشارات الفورية</h3>
                    <p className="text-xs text-slate-400">أرسل مشكلتك القانونية وسيرد عليك المختصون خلال ساعات</p>
                  </div>
                </div>

                {consultationSuccess ? (
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="font-bold text-emerald-300 text-lg">تم إرسال استشارتك بنجاح!</h4>
                    <p className="text-xs text-slate-300">تم تسجيل طلبك وإرسال إشعار فوري إلى لوحة التحكم التجريبية.</p>
                    <button
                      onClick={() => setConsultationSuccess(false)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-500 transition"
                    >
                      إرسال استشارة أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConsultationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكامل *</label>
                      <input
                        type="text"
                        required
                        placeholder="أدخل اسمك الكريم"
                        value={consultationForm.clientName}
                        onChange={e => setConsultationForm({ ...consultationForm, clientName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الجوال *</label>
                        <input
                          type="text"
                          required
                          placeholder="05xxxxxxxx"
                          value={consultationForm.phone}
                          onChange={e => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">نوع القضية</label>
                        <select
                          value={consultationForm.caseType}
                          onChange={e => setConsultationForm({ ...consultationForm, caseType: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="قانون الشركات">قانون الشركات والتجارة</option>
                          <option value="القضايا العمالية">القضايا العمالية</option>
                          <option value="القضايا المدنية">القضايا المدنية والعقارات</option>
                          <option value="القضايا الجنائية">القضايا الجنائية</option>
                          <option value="الملكية الفكرية">الملكية الفكرية</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">وصف المشكلة القانونية *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="اكتب تفاصيل الاستشارة بإيجاز..."
                        value={consultationForm.description}
                        onChange={e => setConsultationForm({ ...consultationForm, description: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>

                    {/* File Upload Simulation */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">رفع مستندات أو صور (PDF, JPG - حد أقصى 2MB)</label>
                      <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-xl p-3 text-center cursor-pointer transition bg-slate-950/50">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              const f = e.target.files[0];
                              if (f.size > 2 * 1024 * 1024) {
                                showToast('حجم الملف يتجاوز الحد الأقصى (2MB)', 'info');
                                return;
                              }
                              setConsultationForm({ ...consultationForm, file: f, fileName: f.name });
                            }
                          }}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center gap-2 text-xs text-slate-400">
                          <Upload className="w-4 h-4 text-amber-400" />
                          <span>{consultationForm.fileName ? `تم إرفاق: ${consultationForm.fileName}` : 'اضغط هنا لرفع الملفات (PDF / صور)'}</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingConsultation}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 text-sm"
                    >
                      {isSubmittingConsultation ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          إرسال الاستشارة الآن
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* PRACTICE AREAS */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-xs font-bold text-amber-600 tracking-wider uppercase">تخصصاتنا القانونية</h2>
              <h3 className="text-3xl font-black text-slate-900">خبرة متكاملة في كافة فروع القانون</h3>
              <p className="text-slate-600 text-sm">نقدم خدمات قانونية استثنائية مدعومة بفريق من المستشارين المعتمدين</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Building2,
                  title: 'قانون الشركات والتجارة',
                  desc: 'تأسيس الشركات، صياغة عقود الشراكة، حل النزاعات التجارية، وتسجيل العلامات التجارية.'
                },
                {
                  icon: Scale,
                  title: 'القضايا العمالية',
                  desc: 'الدفاع عن حقوق العمال وأصحاب العمل، تسوية النزاعات العمالية، ومتابعة قضايا مكتب العمل.'
                },
                {
                  icon: Briefcase,
                  title: 'القضايا المدنية والعقارية',
                  desc: 'فض نزاعات العقارات، قضايا الملكية، التعويضات، وتنفيذ الأحكام القضائية بكفاءة عالية.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition group">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition shadow-sm">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <button
                    onClick={() => setCurrentView('about')}
                    className="text-amber-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition"
                  >
                    <span>اعرف المزيد</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ========================================================= */}
      {/* VIEW: ABOUT & SPECIALIZATIONS */}
      {/* ========================================================= */}
      {currentView === 'about' && (
        <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-amber-500/10 text-amber-700 font-bold text-xs px-3.5 py-1.5 rounded-full border border-amber-500/20">
              من نحن
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">مكتب المحامي والمستشار القانوني المعتمد</h2>
            <p className="text-slate-600 leading-relaxed">
              نحن مؤسسة قانونية رائدة تأسست على قيم العدالة والنزاهة والاحترافية العالية. نهدف إلى تقديم حلول قانونية مبتكرة وموثوقة تحمي مصالح عملائنا من الأفراد والشركات الكبرى.
            </p>
          </div>

          {/* DETAILED CATEGORIES */}
          <div className="space-y-12">
            <h3 className="text-2xl font-black text-slate-900 text-center">أبرز تخصصاتنا وتصنيفاتنا القانونية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'القضايا الجنائية',
                  desc: 'الدفاع في قضايا الجنايات والجنح، تمثيل الموكلين أمام النيابة العامة والمحاكم الجنائية بمهنية وصرامة.',
                  image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600'
                },
                {
                  title: 'قانون الشركات والاندماج',
                  desc: 'هيكلة الشركات، الاستحواذ والاندماج، وصياغة العقود التجارية المعقدة وحل منازعات الشركاء.',
                  image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600'
                },
                {
                  title: 'القضايا العمالية',
                  desc: 'تسوية النزاعات العمالية، صياغة لوائح العمل الداخلية، ومرافعة ومتابعة قضايا مكتب العمل والمحاكم العمالية.',
                  image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600'
                },
                {
                  title: 'الملكية الفكرية والعلامات',
                  desc: 'تسجيل براءات الاختراع، حماية العلامات التجارية، وملاحقة قضايا التقليد والقرصنة الرقمية.',
                  image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600'
                },
                {
                  title: 'النزاعات العقارية والمدنية',
                  desc: 'فض نزاعات الملكية العقارية، دعاوى الإخلاء، التحكيم العقاري، وتوثيق العقود الإنشائية الكبرى.',
                  image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600'
                },
                {
                  title: 'التحكيم وفض النزاعات',
                  desc: 'تقديم خدمات التحكيم التجاري والدولي كبديل سريع وفعال عن التقاضي التقليدي لفض النزاعات.',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    <button
                      onClick={() => setCurrentView('booking')}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <span>استشر في هذا التخصص</span>
                      <ChevronLeft className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW: BLOG */}
      {/* ========================================================= */}
      {currentView === 'blog' && (
        <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-amber-500/10 text-amber-700 font-bold text-xs px-3.5 py-1.5 rounded-full border border-amber-500/20">
              المدونة والمعرفة القانونية
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">أحدث المقالات والنشرات القانونية</h2>
            <p className="text-slate-600 text-sm">ابق على اطلاع بأحدث التعديلات والأنظمة القانونية في المملكة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <div key={art.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="bg-amber-500/10 text-amber-700 font-bold px-2.5 py-1 rounded-full">{art.category}</span>
                    <span>{art.date}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">{art.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{art.summary}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{art.author}</span>
                  <button
                    onClick={() => alert(`محتوى المقال كاملاً:\n\n${art.content}`)}
                    className="text-amber-600 font-bold text-xs flex items-center gap-1 hover:underline"
                  >
                    <span>قراءة المقال</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW: BOOKING & INTERACTIVE CALENDAR */}
      {/* ========================================================= */}
      {currentView === 'booking' && (
        <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-amber-500/10 text-amber-700 font-bold text-xs px-3.5 py-1.5 rounded-full border border-amber-500/20">
              حجز المواعيد والاستشارات
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">نظام حجز المواعيد والتقويم التفاعلي</h2>
            <p className="text-slate-600 text-sm">اختر اليوم والوقت المناسب لك لاستشارة محاميك المعتمد (الساعات المحجوزة مسبقاً تظهر باللون الرمادي)</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* CALENDAR & TIME SLOTS PICKER */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  اختر تاريخ الموعد
                </h3>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  الأوقات المتاحة ليوم ({selectedDate}):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot, idx) => {
                    const booked = isSlotBooked(selectedDate, slot);
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={idx}
                        disabled={booked}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 rounded-2xl text-sm font-bold transition flex items-center justify-between border ${
                          booked
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-400/30'
                            : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${booked ? 'text-slate-400' : isSelected ? 'text-slate-950' : 'text-amber-600'}`} />
                          {slot}
                        </span>
                        <span className="text-xs">
                          {booked ? 'محجوز' : isSelected ? 'مختار' : 'متاح'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* BOOKING FORM & SUBMISSION */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-600" />
                  بيانات حجز الاستشارة
                </h3>
                <p className="text-xs text-slate-500 mt-1">الرجاء إدخال بياناتك لتأكيد الموعد عبر بوابة الدفع التجريبية</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسمك الكريم"
                    value={bookingForm.clientName}
                    onChange={e => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">رقم الجوال *</label>
                  <input
                    type="text"
                    required
                    placeholder="05xxxxxxxx"
                    value={bookingForm.phone}
                    onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">نوع الاستشارة</label>
                  <select
                    value={bookingForm.consultationType}
                    onChange={e => setBookingForm({ ...bookingForm, consultationType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="استشارة قانونية عامة">استشارة قانونية عامة (300 ر.س)</option>
                    <option value="استشارة عقارية متقدمة">استشارة عقارية متقدمة (500 ر.س)</option>
                    <option value="مراجعة عقود تجارية">مراجعة وصياغة عقود (750 ر.س)</option>
                    <option value="تأسيس شركات">تأسيس شركات واستشارات تجارية (1000 ر.س)</option>
                  </select>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs space-y-1 text-amber-900">
                  <p className="font-bold">الموعد المحدد:</p>
                  <p>التاريخ: {selectedDate}</p>
                  <p>الوقت: {selectedSlot || 'لم يتم اختيار الوقت بعد'}</p>
                </div>

                <button
                  type="submit"
                  disabled={!selectedSlot}
                  className={`w-full py-4 rounded-xl font-black text-sm shadow-lg transition flex items-center justify-center gap-2 ${
                    !selectedSlot
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-amber-500/25'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  تأكيد الحجز والانتقال للدفع التجريبي
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW: CONTACT US */}
      {/* ========================================================= */}
      {currentView === 'contact' && (
        <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-amber-500/10 text-amber-700 font-bold text-xs px-3.5 py-1.5 rounded-full border border-amber-500/20">
              تواصل معنا
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">نحن هنا للإجابة عن كافة استفساراتك القانونية</h2>
            <p className="text-slate-600 text-sm">تواصل مع مكتبنا عبر القنوات الرسمية أو زر مقرنا الرئيسي</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">أرسل رسالة مباشرة</h3>
              <form onSubmit={e => { e.preventDefault(); showToast('تم إرسال رسالتك بنجاح وسيتواصل معك فريق خدمة العملاء قريباً!'); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الاسم الكريم</label>
                  <input type="text" required placeholder="الاسم الكامل" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">البريد الإلكتروني</label>
                    <input type="email" required placeholder="name@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">رقم الهاتف</label>
                    <input type="text" required placeholder="05xxxxxxxx" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الرسالة أو الاستفسار</label>
                  <textarea rows={4} required placeholder="اكتب تفاصيل رسالتك هنا..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm">
                  <Send className="w-4 h-4 text-amber-400" />
                  إرسال الرسالة
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                <h3 className="text-xl font-bold text-slate-900">معلومات الاتصال والمقر</h3>
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center"><MapPin className="w-5 h-5" /></div>
                    <span>المملكة العربية السعودية، الرياض، برج الملك فهد، الطابق 14</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                    <span>+966 11 234 5678 / +966 50 000 1122</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                    <span>info@smartlaw-demo.com</span>
                  </div>
                </div>
              </div>

              {/* MOCK MAP */}
              <div className="bg-slate-200 rounded-3xl h-64 overflow-hidden relative border border-slate-300 shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px] opacity-60"></div>
                <div className="relative z-10 text-center bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border border-slate-300">
                  <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-2 animate-bounce" />
                  <p className="font-bold text-slate-900 text-sm">مقر مكتب المحاماة - الرياض</p>
                  <p className="text-xs text-slate-500 mt-1">خريطة تفاعلية افتراضية لمعاينة العملاء</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW: ADMIN DASHBOARD DEMO */}
      {/* ========================================================= */}
      {currentView === 'admin' && (
        <div className="flex-1 bg-slate-950 text-white min-h-[85vh] p-4 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {!isAdminLoggedIn ? (
              /* ADMIN LOGIN SCREEN */
              <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 mt-12">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-white">لوحة التحكم التجريبية</h2>
                  <p className="text-xs text-slate-400">سجل الدخول بصلاحيات (Super Admin) لمعاينة إدارة المكتشفات والطلبات</p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl text-xs text-amber-300 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Key className="w-4 h-4" /> بيانات الدخول الافتراضية معبأة تلقائياً:
                  </p>
                  <p>البريد: {adminEmail}</p>
                  <p>كلمة المرور: {adminPassword}</p>
                </div>

                <form onSubmit={e => { e.preventDefault(); setIsAdminLoggedIn(true); showToast('تم تسجيل الدخول بنجاح إلى لوحة التحكم!'); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإداري</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={e => setAdminEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">كلمة المرور</label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    تسجيل الدخول بضغطة زر
                  </button>
                </form>
              </div>
            ) : (
              /* ADMIN DASHBOARD MAIN PANEL */
              <div className="space-y-8">
                
                {/* ADMIN TOP BAR */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        لوحة تحكم النظام التجريبي
                        <span className="text-xs bg-amber-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full">Super Admin</span>
                      </h2>
                      <p className="text-xs text-slate-400">إدارة الاستشارات، حجز المواعيد، وإعدادات النظام والمدونة</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleResetDatabase}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-4 h-4" />
                      إعادة تعيين البيانات (Reset Demo)
                    </button>
                    <button
                      onClick={() => setIsAdminLoggedIn(false)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <LogOut className="w-4 h-4 text-amber-400" />
                      تسجيل الخروج
                    </button>
                  </div>
                </div>

                {/* ADMIN TABS */}
                <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
                  <button
                    onClick={() => setAdminTab('stats')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      adminTab === 'stats' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    الإحصائيات والرسوم
                  </button>
                  <button
                    onClick={() => setAdminTab('consultations')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      adminTab === 'consultations' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    طلبات الاستشارة ({consultations.length})
                  </button>
                  <button
                    onClick={() => setAdminTab('bookings')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      adminTab === 'bookings' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    المواعيد المحجوزة ({bookings.length})
                  </button>
                  <button
                    onClick={() => setAdminTab('cms')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      adminTab === 'cms' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    إدارة المحتوى (CMS)
                  </button>
                  <button
                    onClick={() => setAdminTab('sandbox')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      adminTab === 'sandbox' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    إعدادات الأمان والحماية
                  </button>
                </div>

                {/* TAB CONTENT: STATS */}
                {adminTab === 'stats' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-xs">إجمالي الاستشارات</span>
                          <FileText className="w-5 h-5 text-amber-400" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{consultations.length}</h3>
                        <p className="text-xs text-emerald-400 font-semibold">+12% عن الأسبوع الماضي</p>
                      </div>

                      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-xs">المواعيد المحجوزة</span>
                          <Calendar className="w-5 h-5 text-amber-400" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{bookings.length}</h3>
                        <p className="text-xs text-emerald-400 font-semibold">مواعيد مؤكدة عبر التقويم</p>
                      </div>

                      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-xs">المدفوعات الوهمية (Sandbox)</span>
                          <DollarSign className="w-5 h-5 text-amber-400" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{(bookings.length * 450).toLocaleString()} ر.س</h3>
                        <p className="text-xs text-emerald-400 font-semibold">محاكاة ناجحة بنسبة 100%</p>
                      </div>

                      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-xs">حالة النسخة التجريبية</span>
                          <Activity className="w-5 h-5 text-amber-400" />
                        </div>
                        <h3 className="text-3xl font-black text-emerald-400">نشط</h3>
                        <p className="text-xs text-slate-400">تصفير تلقائي خلال 18 ساعة</p>
                      </div>
                    </div>

                    {/* FAKE CHART VISUALIZATION */}
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
                      <h3 className="text-lg font-bold text-white">إحصائيات الإيرادات والاستشارات (آخر 6 أشهر)</h3>
                      <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4 border-b border-slate-800">
                        {[
                          { month: 'يونيو', height: '40%', amount: '12,000 ر.س' },
                          { month: 'يوليو', height: '65%', amount: '24,500 ر.س' },
                          { month: 'أغسطس', height: '50%', amount: '18,200 ر.س' },
                          { month: 'سبتمبر', height: '80%', amount: '32,000 ر.س' },
                          { month: 'أكتوبر', height: '90%', amount: '41,000 ر.س' },
                          { month: 'نوفمبر', height: '100%', amount: '48,500 ر.س' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                            <span className="text-[10px] text-amber-400 opacity-0 group-hover:opacity-100 transition">{item.amount}</span>
                            <div
                              style={{ height: item.height }}
                              className="w-full max-w-[48px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-xl group-hover:brightness-125 transition"
                            ></div>
                            <span className="text-xs text-slate-400 font-semibold">{item.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: CONSULTATIONS */}
                {adminTab === 'consultations' && (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">إدارة طلبات الاستشارات الواردة</h3>
                      <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
                        {consultations.length} طلبات مسجلة
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-sm">
                        <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                          <tr>
                            <th className="p-4">العميل</th>
                            <th className="p-4">التصنيف</th>
                            <th className="p-4">التفاصيل</th>
                            <th className="p-4">المرفق</th>
                            <th className="p-4">الحالة</th>
                            <th className="p-4">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {consultations.map(c => (
                            <tr key={c.id} className="hover:bg-slate-800/50 transition">
                              <td className="p-4 font-bold text-white">
                                {c.clientName}
                                <div className="text-xs text-slate-400 font-normal">{c.phone}</div>
                              </td>
                              <td className="p-4 text-amber-400">{c.caseType}</td>
                              <td className="p-4 text-slate-300 max-w-xs truncate">{c.description}</td>
                              <td className="p-4">
                                {c.fileName ? (
                                  <button
                                    onClick={() => alert(`تحميل الملف المرفق: ${c.fileName}`)}
                                    className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-1.5 rounded-lg flex items-center gap-1 border border-slate-700"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    {c.fileName} ({c.fileSize})
                                  </button>
                                ) : (
                                  <span className="text-xs text-slate-500">لا يوجد</span>
                                )}
                              </td>
                              <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  c.status === 'قيد المراجعة' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                                  c.status === 'تم الرد' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                                  'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                }`}>
                                  {c.status}
                                </span>
                              </td>
                              <td className="p-4 flex items-center gap-2">
                                <select
                                  value={c.status}
                                  onChange={e => {
                                    const updated = consultations.map(item => item.id === c.id ? { ...item, status: e.target.value as any } : item);
                                    setConsultations(updated);
                                    showToast('تم تحديث حالة الطلب بنجاح');
                                  }}
                                  className="bg-slate-950 text-xs border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none"
                                >
                                  <option value="قيد المراجعة">قيد المراجعة</option>
                                  <option value="تم الرد">تم الرد</option>
                                  <option value="موعد مؤكد">موعد مؤكد</option>
                                  <option value="أرشيف">أرشيف</option>
                                </select>
                                <button
                                  onClick={() => {
                                    setConsultations(consultations.filter(item => item.id !== c.id));
                                    showToast('تم حذف الطلب');
                                  }}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: BOOKINGS */}
                {adminTab === 'bookings' && (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">إدارة المواعيد المحجوزة عبر التقويم</h3>
                      <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
                        {bookings.length} موعد مؤكد
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-sm">
                        <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                          <tr>
                            <th className="p-4">العميل</th>
                            <th className="p-4">نوع الاستشارة</th>
                            <th className="p-4">التاريخ</th>
                            <th className="p-4">الفترة الزمنية</th>
                            <th className="p-4">الحالة</th>
                            <th className="p-4">الإجراء</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {bookings.map(b => (
                            <tr key={b.id} className="hover:bg-slate-800/50 transition">
                              <td className="p-4 font-bold text-white">
                                {b.clientName}
                                <div className="text-xs text-slate-400 font-normal">{b.phone}</div>
                              </td>
                              <td className="p-4 text-amber-400">{b.consultationType}</td>
                              <td className="p-4 text-slate-300">{b.date}</td>
                              <td className="p-4 text-slate-300">{b.timeSlot}</td>
                              <td className="p-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                  {b.status}
                                </span>
                              </td>
                              <td className="p-4">
                                <button
                                  onClick={() => {
                                    setBookings(bookings.filter(item => item.id !== b.id));
                                    showToast('تم إلغاء وحذف الموعد');
                                  }}
                                  className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/30"
                                >
                                  إلغاء الموعد
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: CMS */}
                {adminTab === 'cms' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* ADD NEW ARTICLE */}
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                        إضافة مقال جديد للمدونة القانونية
                      </h3>
                      <form onSubmit={e => {
                        e.preventDefault();
                        if (!newArticle.title || !newArticle.summary) return;
                        const art: Article = {
                          id: 'art_' + Date.now(),
                          ...newArticle,
                          date: new Date().toISOString().split('T')[0]
                        };
                        setArticles([art, ...articles]);
                        setNewArticle({ title: '', category: 'قانون الشركات', summary: '', content: '', author: 'المحامي / طارق الحكيم' });
                        showToast('تم نشر المقال بنجاح في الموقع!');
                      }} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان المقال</label>
                          <input
                            type="text"
                            required
                            placeholder="عنوان المقال القانوني..."
                            value={newArticle.title}
                            onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">التصنيف</label>
                            <select
                              value={newArticle.category}
                              onChange={e => setNewArticle({ ...newArticle, category: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                            >
                              <option value="قانون الشركات">قانون الشركات</option>
                              <option value="القضايا العمالية">القضايا العمالية</option>
                              <option value="الملكية الفكرية">الملكية الفكرية</option>
                              <option value="القضايا الجنائية">القضايا الجنائية</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">الكاتب</label>
                            <input
                              type="text"
                              value={newArticle.author}
                              onChange={e => setNewArticle({ ...newArticle, author: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">ملخص قصير</label>
                          <input
                            type="text"
                            required
                            placeholder="ملخص يظهر في بطاقة المقال..."
                            value={newArticle.summary}
                            onChange={e => setNewArticle({ ...newArticle, summary: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">محتوى المقال التفصيلي</label>
                          <textarea
                            rows={3}
                            required
                            placeholder="اكتب المحتوى القانوني هنا..."
                            value={newArticle.content}
                            onChange={e => setNewArticle({ ...newArticle, content: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                          />
                        </div>
                        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl transition text-sm">
                          نشر المقال فوراً
                        </button>
                      </form>
                    </div>

                    {/* EXISTING ARTICLES LIST */}
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
                      <h3 className="text-lg font-bold text-white">المقالات المنشورة حالياً ({articles.length})</h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {articles.map(a => (
                          <div key={a.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                            <div>
                              <h4 className="font-bold text-sm text-white">{a.title}</h4>
                              <p className="text-xs text-slate-400 mt-1">{a.category} • {a.date}</p>
                            </div>
                            <button
                              onClick={() => {
                                setArticles(articles.filter(item => item.id !== a.id));
                                showToast('تم حذف المقال');
                              }}
                              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: SECURITY & SANDBOX SETTINGS */}
                {adminTab === 'sandbox' && (
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Lock className="w-5 h-5 text-amber-400" />
                      إعدادات الأمان وحماية النسخة التجريبية (Protected Settings)
                    </h3>
                    <div className="space-y-4 text-sm text-slate-300">
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between font-bold text-amber-400">
                          <span>بوابة الدفع (Payment Sandbox)</span>
                          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded">مفعل للاختبار</span>
                        </div>
                        <p className="text-xs text-slate-400">جميع المعاملات المالية تستخدم بطاقة اختبار وهمية مع إصدار فاتورة فورية لتجربة العميل.</p>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between font-bold text-amber-400">
                          <span>إعدادات النظام المحمية (Protected Config)</span>
                          <span className="bg-red-500/10 text-red-400 text-xs px-2.5 py-0.5 rounded">معطل في النسخة التجريبية</span>
                        </div>
                        <p className="text-xs text-slate-400">تم حجب تعديل مفاتيح API الخاصة بشركة البرمجيات، وتغيير روابط الخادم الأساسية لحماية السيرفر التجريبي.</p>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between font-bold text-amber-400">
                          <span>التصفير التلقائي (Auto-Reset Database)</span>
                          <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-0.5 rounded">نشط كل 24 ساعة</span>
                        </div>
                        <p className="text-xs text-slate-400">تقوم القاعدة بمسح البيانات الوهمية والمقالات المضافة وإعادة تعيين النظام افتراضياً بشكل دوري.</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PAYMENT SANDBOX MODAL */}
      {/* ========================================================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-right">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                بوابة الدفع التجريبية (Sandbox)
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentStep === 'form' ? (
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-300">
                  <p className="font-bold">وضع الاختبار مفعل (Test Mode)</p>
                  <p>استخدم رقم البطاقة الافتراضي أدناه لمعاينة نجاح الدفع وإصدار الفاتورة.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رقم البطاقة الائتمانية</label>
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={e => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      value={paymentDetails.expiry}
                      onChange={e => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">رمز الأمان CVC</label>
                    <input
                      type="text"
                      value={paymentDetails.cvc}
                      onChange={e => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-white">
                  <span>المبلغ الإجمالي للاستشارة:</span>
                  <span className="text-amber-400 text-lg">450 ر.س</span>
                </div>

                <button
                  onClick={handlePaymentComplete}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  إتمام الدفع وتأكيد الحجز
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-white">تمت العملية بنجاح!</h4>
                <p className="text-xs text-slate-400">تم خصم المبلغ وهمياً وإصدار الفاتورة الضريبية وتأكيد موعد استشارتك.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* BOOKING SUCCESS MODAL */}
      {/* ========================================================= */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">تم حجز موعدك بنجاح!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              تم إرسال تفاصيل الموعد ورابط الحضور إلى هاتفك المحمول، كما تم تسجيل الحجز في لوحة التحكم الإدارية تلقائياً.
            </p>
            <button
              onClick={() => { setBookingSuccessModal(false); setCurrentView('home'); }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl transition text-sm"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-white font-black text-base">العدالة الذكية</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              منصة برمجية متكاملة لإدارة مكاتب المحاماة، حجز المواعيد، وتقديم الاستشارات القانونية بكفاءة عالية.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentView('home')} className="hover:text-amber-400 transition">الرئيسية</button></li>
              <li><button onClick={() => setCurrentView('about')} className="hover:text-amber-400 transition">من نحن والتخصصات</button></li>
              <li><button onClick={() => setCurrentView('blog')} className="hover:text-amber-400 transition">المدونة القانونية</button></li>
              <li><button onClick={() => setCurrentView('booking')} className="hover:text-amber-400 transition">حجز المواعيد</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">التخصصات القانونية</h4>
            <ul className="space-y-2 text-xs">
              <li>قانون الشركات والتجارة</li>
              <li>القضايا العمالية</li>
              <li>القضايا الجنائية والعقارية</li>
              <li>الملكية الفكرية والتحكيم</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">معلومات النسخة التجريبية</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              هذه النسخة مخصصة لمعاينة عملاء شركات البرمجيات. جميع الحقوق محفوظة لنظام المحامي الذكي © 2026.
            </p>
            <button
              onClick={() => setCurrentView('admin')}
              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" />
              دخول لوحة التحكم التجريبية
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
