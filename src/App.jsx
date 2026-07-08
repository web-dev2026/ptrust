import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import logo from './assets/logo.png';
import {
  Heart,
  BookOpen,
  HeartPulse,
  Leaf,
  Users,
  Phone,
  Mail,
  MapPin,
  Globe,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import './App.css';

const FacebookIcon = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, className, fill = "none" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

const translations = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navProjects: "Our Services",
    navDonate: "Donate",
    navUpdates: "Updates",
    navContact: "Contact",
    toggleLang: "ಕನ್ನಡ",
    emailUs: "Email Us",
    heroTitle: "ಪ್ರಜ್ವಲ ಟ್ರಸ್ಟ್ (ರಿ)",
    heroSub: "ಪ್ರಜ್ವಾಲಿತೋ ಜ್ಞಾನಮಯಃ ಪ್ರದೀಪಃ",
    heroDesc: "Prajwal Trust (R) is dedicated to the upliftment of rural communities through quality education, healthcare, and sustainable environmental initiatives.",
    btnDonate: "Donate Now",
    btnLearn: "Learn More",
    mottoTitle: "Our Motto",
    mottoDesc: "The Lamp of Knowledge is Lit",
    aboutTitle: "About Prajwal Trust",
    aboutText1: "Prajwal Trust (R) is a registered public charitable social work trust established with the noble objective of serving the underprivileged sections of society. Our core philosophy is anchored in the belief that education, health, and environment are the fundamental pillars of a progressive, equitable nation.",
    aboutText2: "With Sirsi as our center, we work untiringly to remove the darkness of ignorance and poverty from rural communities. We implement modern educational aid for rural youth, organize free medical camps, support afforestation, and run skill-development programs to foster self-reliance.",
    addressVal: `Shivaraya Smruti
Near Vatsalya Hospital
Lions Nagar
Sirsi – 581402`,
    projectsTitle: "Our Services",
    projectsSub: "We design and execute sustainable, impactful initiatives addressing critical community needs.",
    projEduTitle: "Education (Vidya Prakasha)",
    projEduDesc: "Providing scholarships, books, bags, and digital learning tools to underprivileged rural students to ensure financial barriers do not halt learning.",
    projHealthTitle: "Healthcare (Arogya Sanjeevini)",
    projHealthDesc: "Conducting diagnostic camps, eye screenings, and distributing free essential medicines in remote, underserved villages.",
    projEnvTitle: "Environment (Hasiru Kranti)",
    projEnvDesc: "Promoting afforestation, sustainable organic farming, and water harvesting to create green, resilient rural ecosystems.",
    projEmpTitle: "Empowerment (Swavalambane)",
    projEmpDesc: "Offering vocational skill training in tailoring, computer literacy, and entrepreneurship to help rural women and youth achieve self-reliance.",
    impactTitle: "Our Cumulative Impact",
    statLives: "1,000+",
    statLivesLabel: "Lives Touched",
    statScholarships: "20+",
    statScholarshipsLabel: "Scholarships",
    statHealth: "15+",
    statHealthLabel: "Health Camps Conducted",
    statTrees: "2,000+",
    statTreesLabel: "Saplings Planted",
    donateTitle: "Support Our Mission",
    donateSub: "Your generosity directly powers our grassroots efforts. Join us in bringing meaningful change.",
    bankTitle: "Direct Bank Transfer Details",
    accName: "Account Name",
    accNumber: "Account Number",
    bankName: "Bank Name",
    ifscCode: "IFSC Code",
    branchName: "Branch",
    taxExempt: "All contributions to Prajwal Trust (R) are tax-exempt under Section 80G of the Income Tax Act.",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    contactTitle: "Get in Touch / Join Us",
    contactSub: "Have questions or want to volunteer? Send us a message and we'll respond shortly.",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formMsg: "Your Message",
    formSubmit: "Send Message",
    formSuccess: "Thank you! Your message has been sent successfully. We will get back to you soon.",
    formSubmitting: "Sending...",
    footerAbout: "Prajwal Trust (R) is a registered public charitable trust. We strive to light up lives and foster self-reliant rural communities.",
    footerContact: "Contact Details",
    footerQuick: "Quick Links",
    copyright: "All Rights Reserved.",
    mediaTitle: "News & Media Updates",
    mediaSub: "Stay informed with the latest updates, stories, and video coverages from our community service.",
    tabArticles: "Articles & News",
    tabVideos: "Videos & Clips",
    readMore: "Read More",
    closeModal: "Close",
    publishedOn: "Published on",
    noContent: "No updates uploaded yet."
  },
  kn: {
    navHome: "ಮುಖಪುಟ",
    navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
    navProjects: "ನಮ್ಮ ಸೇವೆಗಳು",
    navDonate: "ದೇಣಿಗೆ",
    navUpdates: "ಅಪ್‌ಡೇಟ್‌ಗಳು",
    navContact: "ಸಂಪರ್ಕಿಸಿ",
    toggleLang: "English",
    emailUs: "ಇಮೇಲ್ ಕಳುಹಿಸಿ",
    heroTitle: "ಪ್ರಜ್ವಲ ಟ್ರಸ್ಟ್ (ರಿ)",
    heroSub: "ಪ್ರಜ್ವಾಲಿತೋ ಜ್ಞಾನಮಯಃ ಪ್ರದೀಪಃ",
    heroDesc: "ಪ್ರಜ್ವಲ ಟ್ರಸ್ಟ್ (ರಿ) ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ, ಆರೋಗ್ಯ ಸೇವೆಗಳು ಮತ್ತು ಸುಸ್ಥಿರ ಪರಿಸರ ಉಪಕ್ರಮಗಳ ಮೂಲಕ ಗ್ರಾಮೀಣ ಸಮಾಜದ ಅಭಿವೃದ್ಧಿಗೆ ಶ್ರಮಿಸುತ್ತಿದೆ.",
    btnDonate: "ಈಗಲೇ ದೇಣಿಗೆ ನೀಡಿ",
    btnLearn: "ಹೆಚ್ಚು ತಿಳಿಯಿರಿ",
    mottoTitle: "ನಮ್ಮ ಧ್ಯೇಯವಾಕ್ಯ",
    mottoDesc: "ಜ್ಞಾನದ ದೀಪವು ಬೆಳಗಿದೆ",
    aboutTitle: "ಪ್ರಜ್ವಲ ಟ್ರಸ್ಟ್ ಬಗ್ಗೆ",
    aboutText1: "ಪ್ರಜ್ವಲ ಟ್ರಸ್ಟ್ (ರಿ) ಸಮಾಜದ ಹಿಂದುಳಿದ ವರ್ಗಗಳಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುವ ಉದಾತ್ತ ಉದ್ದೇಶದೊಂದಿಗೆ ಸ್ಥಾಪಿಸಲಾದ ನೋಂದಾಯಿತ ಸಾರ್ವಜನಿಕ ಧರ್ಮಾರ್ಥ ಸಾಮಾಜಿಕ ಸೇವಾ ಸಂಸ್ಥೆಯಾಗಿದೆ. ಶಿಕ್ಷಣ, ಆರೋಗ್ಯ ಮತ್ತು ಪರಿಸರವು ಪ್ರಗತಿಪರ ಹಾಗೂ ಸಮಾನತೆಯ ದೇಶದ ಮೂಲಭೂತ ಸ್ತಂಭಗಳಾಗಿವೆ ಎಂಬ ನಂಬಿಕೆಯಲ್ಲಿ ನಮ್ಮ ಪ್ರಮುಖ ಸಿದ್ಧಾಂತವು ನೆಲೆಗೊಂಡಿದೆ.",
    aboutText2: "ಶಿರಸಿಯನ್ನು ಕೇಂದ್ರವಾಗಿಟ್ಟುಕೊಂಡು, ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಲ್ಲಿ ಅಜ್ಞಾನ ಮತ್ತು ಬಡತನದ ಕತ್ತಲೆಯನ್ನು ಹೋಗಲಾಡಿಸಲು ನಾವು ದಣಿವರಿಯಿಲ್ಲದೆ ಶ್ರಮಿಸುತ್ತಿದ್ದೇವೆ. ಗ್ರಾಮೀಣ ಯುವಕರಿಗೆ ಶೈಕ್ಷಣಿಕ ನೆರವು, ಗ್ರಾಮಗಳಿಗೆ ಉಚಿತ ವೈದ್ಯಕೀಯ ಶಿಬಿರಗಳು, ಅರಣ್ಯೀಕರಣ ಅಭಿಯಾನಗಳು ಮತ್ತು ಸ್ವಾವಲಂಬನೆ ಸಾಧಿಸಲು ವೃತ್ತಿಪರ ಕೌಶಲ್ಯ ತರಬೇತಿಗಳನ್ನು ನೀಡುತ್ತಿದ್ದೇವೆ.",
    addressVal: `ಶಿವರಾಯಸ್ಮೃತಿ,
ವಾತ್ಸಲ್ಯ ಆಸ್ಪತ್ರೆ ಪಕ್ಕ
ಲಯನ್ಸ್ ನಗರ
ಶಿರಸಿ - 581402`,
    projectsTitle: "ನಮ್ಮ ಸೇವೆಗಳು",
    projectsSub: "ನಾವು ವಿವಿಧ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಸುಸ್ಥಿರ ಮತ್ತು ಧನಾತ್ಮಕ ಬದಲಾವಣೆ ತರಲು ಬದ್ಧರಾಗಿದ್ದೇವೆ.",
    projEduTitle: "ಶಿಕ್ಷಣ (ವಿದ್ಯಾ ಪ್ರಕಾಶ)",
    projEduDesc: "ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡಲು ಪಠ್ಯಪುಸ್ತಕಗಳು, ಬ್ಯಾಗ್‌ಗಳು, ಕಲಿಕಾ ಉಪಕರಣಗಳು ಮತ್ತು ಶೈಕ್ಷಣಿಕ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಒದಗಿಸುವುದು.",
    projHealthTitle: "ಆರೋಗ್ಯ ಸೇವೆ (ಆರೋಗ್ಯ ಸಂಜೀವಿನಿ)",
    projHealthDesc: "ಉನ್ನತ ವೈದ್ಯಕೀಯ ಸೌಲಭ್ಯಗಳಿಲ್ಲದ ಗ್ರಾಮೀಣ ಕುಟುಂಬಗಳಿಗೆ ಉಚಿತ ರೋಗ ತಪಾಸಣೆ, ಕಣ್ಣಿನ ತಪಾಸಣೆ ಶಿಬಿರಗಳು ಮತ್ತು ಉಚಿತ ಔಷಧಿಗಳನ್ನು ವಿತರಿಸುವುದು.",
    projEnvTitle: "ಪರಿಸರ ಸಂರಕ್ಷಣೆ (ಹಸಿರು ಕ್ರಾಂತಿ)",
    projEnvDesc: "ಕಾಡುಗಳ ನಾಶ ತಡೆಯಲು ಮತ್ತು ಸ್ಥಳೀಯ ಪರಿಸರ ಮರುಸ್ಥಾಪಿಸಲು ಅರಣ್ಯೀಕರಣ, ಸಾವಯವ ಕೃಷಿ ಪದ್ಧತಿಗಳು ಮತ್ತು ಸಸಿಗಳನ್ನು ನೆಡುವ ಅಭಿಯಾನಗಳನ್ನು ಆಯೋಜಿಸುವುದು.",
    projEmpTitle: "ಸ್ವಾವಲಂಬನೆ (ಸಬಲೀಕರಣ)",
    projEmpDesc: "ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರು ಮತ್ತು ಯುವಕರು ಸ್ವಾವಲಂಬನೆ ಸಾಧಿಸಲು ಹೊಲಿಗೆ, ಕಂಪ್ಯೂಟರ್ ಮತ್ತು ಕರಕುಶಲ ತರಬೇತಿ ನೀಡಿ ಉದ್ಯಮಶೀಲತೆಯನ್ನು ಉತ್ತೇಜಿಸುವುದು.",
    impactTitle: "ನಮ್ಮ ಸಾಧನೆಗಳು",
    statLives: "5,000+",
    statLivesLabel: "ತಲುಪಿದ ಜೀವಗಳು",
    statScholarships: "150+",
    statScholarshipsLabel: "ಶೈಕ್ಷಣಿಕ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು",
    statHealth: "35+",
    statHealthLabel: "ನಡೆಸಿದ ಆರೋಗ್ಯ ಶಿಬಿರಗಳು",
    statTrees: "8,000+",
    statTreesLabel: "ನೆಟ್ಟ ಸಸಿಗಳು",
    donateTitle: "ನಮ್ಮ ಸೇವೆಗೆ ಕೈಜೋಡಿಸಿ",
    donateSub: "ನಿಮ್ಮ ಧನಸಹಾಯವು ನೇರವಾಗಿ ಗ್ರಾಮೀಣ ಸೇವಾ ಕಾರ್ಯಗಳಿಗೆ ತಲುಪುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಕೊಡುಗೆಯೂ ಅಮೂಲ್ಯವಾಗಿದೆ.",
    bankTitle: "ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ ವಿವರಗಳು",
    accName: "ಖಾತೆದಾರರ ಹೆಸರು",
    accNumber: "ಖಾತೆಯ ಸಂಖ್ಯೆ",
    bankName: "ಬ್ಯಾಂಕ್ ಹೆಸರು",
    ifscCode: "IFSC ಕೋಡ್",
    branchName: "ಶಾಖೆ",
    taxExempt: "ಪ್ರಜ್ವಲ ಟ್ರಸ್ಟ್ (ರಿ) ಗೆ ನೀಡುವ ಎಲ್ಲಾ ದೇಣಿಗೆಗಳಿಗೆ ಆದಾಯ ತೆರಿಗೆ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 80ಜಿ ಅಡಿಯಲ್ಲಿ ತೆರಿಗೆ ವಿನಾಯಿತಿ ಇದೆ.",
    copyBtn: "ನಕಲಿಸಿ",
    copiedBtn: "ನಕಲಿಸಲಾಗಿದೆ!",
    contactTitle: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ / ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ",
    contactSub: "ಪ್ರಶ್ನೆಗಳಿವೆಯೇ ಅಥವಾ ಸ್ವಯಂಸೇವಕರಾಗಲು ಆಸಕ್ತಿ ಹೊಂದಿದ್ದೀರಾ? ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ, ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಉತ್ತರಿಸುತ್ತೇವೆ.",
    formName: "ಪೂರ್ಣ ಹೆಸರು",
    formEmail: "ಇಮೇಲ್ ವಿಳಾಸ",
    formPhone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    formMsg: "ನಿಮ್ಮ ಸಂದೇಶ",
    formSubmit: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    formSuccess: "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.",
    formSubmitting: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
    footerAbout: "ಪ್ರಜ್ವಲ ಟ್ರಸ್ಟ್ (ರಿ) ಒಂದು ನೋಂದಾಯಿತ ಸಾರ್ವಜನಿಕ ಧರ್ಮಾರ್ಥ ಸಂಸ್ಥೆಯಾಗಿದೆ. ನಾವು ಗ್ರಾಮೀಣ ಸಮಾಜದಲ್ಲಿ ಧನಾತ್ಮಕ ಮತ್ತು ಹೊಸ ಬದಲಾವಣೆ ತರಲು ಶ್ರಮಿಸುತ್ತಿದ್ದೇವೆ.",
    footerContact: "ಸಂಪರ್ಕ ವಿವರಗಳು",
    footerQuick: "ತ್ವರಿತ ಕೊಂಡಿಗಳು",
    copyright: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    mediaTitle: "ಸುದ್ದಿ ಮತ್ತು ಮಾಧ್ಯಮ ಅಪ್‌ಡೇಟ್‌ಗಳು",
    mediaSub: "ನಮ್ಮ ಸಮಾಜ ಸೇವಾ ಕಾರ್ಯಕ್ರಮಗಳ ಇತ್ತೀಚಿನ ಸುದ್ದಿಗಳು ಮತ್ತು ವೀಡಿಯೊಗಳ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ವೀಕ್ಷಿಸಿ.",
    tabArticles: "ಲೇಖನಗಳು ಮತ್ತು ಸುದ್ದಿ",
    tabVideos: "ವೀಡಿಯೊಗಳು",
    readMore: "ಹೆಚ್ಚು ಓದಿ",
    closeModal: "ಮುಚ್ಚಿ",
    publishedOn: "ಪ್ರಕಟಿಸಲಾಗಿದೆ",
    noContent: "ಯಾವುದೇ ಅಪ್‌ಡೇಟ್‌ಗಳನ್ನು ಇನ್ನೂ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿಲ್ಲ."
  }
};

const BANK_DETAILS = {
  name: "PRAJWAL TRUST (R)",
  account: "122006518491",
  bank: "KDCC Bank (Kanara DCC Bank)",
  ifsc: "KSCB0016001",
  branch: "Sirsi (Uttara Kannada)"
};

const DEFAULT_ARTICLES = [];
const DEFAULT_VIDEOS = [];

function App() {
  const [lang, setLang] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedField, setCopiedField] = useState(null); // 'account' or 'ifsc'

  // Contact Form State
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Admin & Content Routing State
  const [isAdminMode, setIsAdminMode] = useState(window.location.hash === '#admin');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('prajwal_admin_session') === 'true';
  });
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState('articles'); // 'articles' | 'videos' | 'manage'

  // Articles & Videos State
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Fetch articles and videos from DB on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const artRes = await fetch('/api/articles');
        if (artRes.ok) {
          const data = await artRes.json();
          setArticles(data);
        }
        const vidRes = await fetch('/api/videos');
        if (vidRes.ok) {
          const data = await vidRes.json();
          setVideos(data);
        }
      } catch (error) {
        console.error("Failed to fetch initial content:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminMode(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Public display states
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'videos'
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Upload Form States
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Education',
    summary: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    url: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleImageFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingImage(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Data = reader.result;
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data })
        });
        if (res.ok) {
          const data = await res.json();
          setArticleForm(prev => ({ ...prev, image: data.url }));
        } else {
          alert('Failed to upload image to Cloudinary.');
        }
      } catch (err) {
        console.error('Error uploading image:', err);
        alert('Error uploading image.');
      } finally {
        setIsUploadingImage(false);
      }
    };
  };

  // Monitor scroll for adding shadows to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[lang];

  const handleLangToggle = () => {
    setLang(lang === 'en' ? 'kn' : 'en');
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || '',
          message: form.message
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        alert(lang === 'en' ? 'Failed to send message. Please try again.' : 'ಸಂದೇಶ ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      alert(lang === 'en' ? 'Failed to send message. Please check your network or try again.' : 'ಸಂದೇಶ ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ನೆಟ್‌ವರ್ಕ್ ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasscode === 'prajwal@admin') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('prajwal_admin_session', 'true');
      setAdminPasscode('');
      setAdminError('');
    } else {
      setAdminError(lang === 'en' ? 'Invalid Passcode. Please try again.' : 'ತಪ್ಪಾದ ಪ್ರವೇಶ ಕೋಡ್. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('prajwal_admin_session');
    window.location.hash = '';
  };

  const handleArticleFormChange = (e) => {
    const { name, value } = e.target;
    setArticleForm(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoFormChange = (e) => {
    const { name, value } = e.target;
    setVideoForm(prev => ({ ...prev, [name]: value }));
  };

  const handleArticleUpload = async (e) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.summary || !articleForm.content) {
      alert(lang === 'en' ? 'Please fill in all required fields.' : 'ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.');
      return;
    }

    const newArticle = {
      title: articleForm.title,
      category: articleForm.category,
      summary: articleForm.summary,
      content: articleForm.content,
      image: articleForm.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      date: articleForm.date || new Date().toISOString().split('T')[0]
    };

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      });
      if (res.ok) {
        const saved = await res.json();
        setArticles(prev => [saved, ...prev]);
        setArticleForm({
          title: '',
          category: 'Education',
          summary: '',
          content: '',
          image: '',
          date: new Date().toISOString().split('T')[0]
        });
        alert(lang === 'en' ? 'Article uploaded successfully!' : 'ಲೇಖನವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ!');
        setActiveAdminTab('manage');
      } else {
        alert('Failed to save article to database.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading article.');
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.url) {
      alert(lang === 'en' ? 'Please fill in all required fields.' : 'ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.');
      return;
    }

    // Embed URL extraction for YouTube
    let embedUrl = videoForm.url;
    const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = videoForm.url.match(ytRegExp);
    if (match && match[2].length === 11) {
      embedUrl = `https://www.youtube.com/embed/${match[2]}`;
    }

    const newVideo = {
      title: videoForm.title,
      description: videoForm.description,
      url: embedUrl,
      date: videoForm.date || new Date().toISOString().split('T')[0]
    };

    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVideo)
      });
      if (res.ok) {
        const saved = await res.json();
        setVideos(prev => [saved, ...prev]);
        setVideoForm({
          title: '',
          description: '',
          url: '',
          date: new Date().toISOString().split('T')[0]
        });
        alert(lang === 'en' ? 'Video uploaded successfully!' : 'ವೀಡಿಯೊವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ!');
        setActiveAdminTab('manage');
      } else {
        alert('Failed to save video to database.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading video.');
    }
  };

  const handleDeleteArticle = async (id) => {
    if (confirm(lang === 'en' ? 'Are you sure you want to delete this article?' : 'ಈ ಲೇಖನವನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?')) {
      try {
        const res = await fetch(`/api/articles/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setArticles(prev => prev.filter(a => a._id !== id));
        } else {
          alert('Failed to delete article.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteVideo = async (id) => {
    if (confirm(lang === 'en' ? 'Are you sure you want to delete this video?' : 'ಈ ವೀಡಿಯೊವನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?')) {
      try {
        const res = await fetch(`/api/videos/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setVideos(prev => prev.filter(v => v._id !== id));
        } else {
          alert('Failed to delete video.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isAdminMode) {
    return (
      <div className="admin-portal-container">
        {!isAdminLoggedIn ? (
          <div className="admin-login-card">
            <div className="admin-login-header">
              <img src={logo} alt="Prajwal Trust Logo" className="admin-login-logo" />
              <h2>Prajwal Trust Admin</h2>
              <p>Enter passcode to access dashboard</p>
            </div>
            <form onSubmit={handleAdminLogin} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="passcode">Admin Passcode</label>
                <input
                  type="password"
                  id="passcode"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              {adminError && <div className="admin-error-msg">{adminError}</div>}
              <button type="submit" className="btn btn-primary btn-block">Access Dashboard</button>
            </form>
            <div className="admin-login-footer">
              <a href="#" className="back-link">← Back to Main Website</a>
            </div>
          </div>
        ) : (
          <div className="admin-dashboard">
            <aside className="admin-sidebar">
              <div className="admin-brand">
                <img src={logo} alt="Logo" className="admin-sidebar-logo" />
                <div>
                  <h4>Prajwal Trust</h4>
                  <span>Admin Panel</span>
                </div>
              </div>
              <nav className="admin-sidebar-nav">
                <button
                  className={`admin-nav-btn ${activeAdminTab === 'articles' ? 'active' : ''}`}
                  onClick={() => setActiveAdminTab('articles')}
                >
                  Upload Article
                </button>
                <button
                  className={`admin-nav-btn ${activeAdminTab === 'videos' ? 'active' : ''}`}
                  onClick={() => setActiveAdminTab('videos')}
                >
                  Upload Video
                </button>
                <button
                  className={`admin-nav-btn ${activeAdminTab === 'manage' ? 'active' : ''}`}
                  onClick={() => setActiveAdminTab('manage')}
                >
                  Manage Content ({articles.length + videos.length})
                </button>
              </nav>
              <div className="admin-sidebar-footer">
                <button onClick={handleAdminLogout} className="admin-logout-btn">
                  Logout
                </button>
              </div>
            </aside>
            <main className="admin-main-content">
              <header className="admin-content-header">
                <h2>{activeAdminTab === 'articles' ? 'Upload Article' : activeAdminTab === 'videos' ? 'Upload Video' : 'Manage Content'}</h2>
                <a href="#" className="btn btn-outline" style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>View Website</a>
              </header>

              {activeAdminTab === 'articles' && (
                <div className="admin-form-container">
                  <form onSubmit={handleArticleUpload} className="admin-upload-form">
                    <div className="form-group">
                      <label>Article Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={articleForm.title}
                        onChange={handleArticleFormChange}
                        placeholder="e.g. Health Camp at Sirsi"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Category *</label>
                        <select name="category" value={articleForm.category} onChange={handleArticleFormChange}>
                          <option value="Education">Education</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Environment">Environment</option>
                          <option value="Empowerment">Empowerment</option>
                          <option value="General">General</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Publish Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={articleForm.date}
                          onChange={handleArticleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Image Upload or Image URL</label>
                      <div className="upload-input-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="file-input"
                        />
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>- OR -</span>
                        <input
                          type="url"
                          name="image"
                          value={articleForm.image}
                          onChange={handleArticleFormChange}
                          placeholder="e.g. https://images.unsplash.com/... or leave blank for default"
                        />
                      </div>
                      {isUploadingImage && <div className="upload-loader" style={{ fontSize: '13px', color: 'var(--primary-color)', fontWeight: '600', marginTop: '6px' }}>Uploading to Cloudinary...</div>}
                      {articleForm.image && !isUploadingImage && (
                        <div className="upload-preview" style={{ marginTop: '10px' }}>
                          <img src={articleForm.image} alt="Preview" style={{ height: '80px', borderRadius: '4px', objectFit: 'cover' }} />
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Brief Summary *</label>
                      <input
                        type="text"
                        name="summary"
                        value={articleForm.summary}
                        onChange={handleArticleFormChange}
                        placeholder="e.g. Quick overview of the camp..."
                        maxLength="150"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Full Content *</label>
                      <textarea
                        name="content"
                        value={articleForm.content}
                        onChange={handleArticleFormChange}
                        placeholder="Write your article content here..."
                        rows="8"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Upload Article</button>
                  </form>
                </div>
              )}

              {activeAdminTab === 'videos' && (
                <div className="admin-form-container">
                  <form onSubmit={handleVideoUpload} className="admin-upload-form">
                    <div className="form-group">
                      <label>Video Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={videoForm.title}
                        onChange={handleVideoFormChange}
                        placeholder="e.g. Tree Plantation Drive"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Video Link (YouTube URL) *</label>
                        <input
                          type="url"
                          name="url"
                          value={videoForm.url}
                          onChange={handleVideoFormChange}
                          placeholder="e.g. https://www.youtube.com/watch?v=..."
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Publish Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={videoForm.date}
                          onChange={handleVideoFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description (Optional)</label>
                      <textarea
                        name="description"
                        value={videoForm.description}
                        onChange={handleVideoFormChange}
                        placeholder="e.g. Brief overview of the video..."
                        rows="4"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Upload Video</button>
                  </form>
                </div>
              )}

              {activeAdminTab === 'manage' && (
                <div className="admin-manage-container">
                  <div className="admin-manage-section">
                    <h3>Articles ({articles.length})</h3>
                    {articles.length === 0 ? (
                      <p className="no-items-msg">No articles uploaded.</p>
                    ) : (
                      <div className="admin-items-list">
                        {articles.map(art => (
                          <div className="admin-item-row" key={art._id}>
                            <div className="admin-item-info">
                              <span className="admin-item-cat">{art.category}</span>
                              <span className="admin-item-date">{art.date}</span>
                              <h4>{art.title}</h4>
                            </div>
                            <button onClick={() => handleDeleteArticle(art._id)} className="delete-btn">Delete</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="admin-manage-section" style={{ marginTop: '40px' }}>
                    <h3>Videos ({videos.length})</h3>
                    {videos.length === 0 ? (
                      <p className="no-items-msg">No videos uploaded.</p>
                    ) : (
                      <div className="admin-items-list">
                        {videos.map(vid => (
                          <div className="admin-item-row" key={vid._id}>
                            <div className="admin-item-info">
                              <span className="admin-item-date">{vid.date}</span>
                              <h4>{vid.title}</h4>
                            </div>
                            <button onClick={() => handleDeleteVideo(vid._id)} className="delete-btn">Delete</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* HEADER / NAVIGATION */}
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo & Contact details on Left */}
          <div className="navbar-left">
            <a href="#home" className="logo-link">
              <img src={logo} alt="Prajwal Trust Logo" className="trust-logo" />
              <div className="logo-text">
                <span className="logo-title-main">PRAJWAL TRUST (R)</span>
                <span className="logo-title-sub">ಪ್ರಜ್ವಲ ಟ್ರಸ್ಟ್ (ರಿ)</span>
              </div>
            </a>
            <div className="header-email-badge">
              <Mail size={14} className="icon-mail" />
              <a href="mailto:prajwaltrust21@gmail.com" className="email-link">
                prajwaltrust21@gmail.com
              </a>
            </div>
          </div>

          {/* Desktop Nav Links & Toggle on Right */}
          <div className="navbar-right">
            <nav className="desktop-nav">
              <a href="#home" className="nav-item">{t.navHome}</a>
              <a href="#about" className="nav-item">{t.navAbout}</a>
              <a href="#projects" className="nav-item">{t.navProjects}</a>
              <a href="#donate" className="nav-item">{t.navDonate}</a>
              <a href="#media" className="nav-item">{t.navUpdates}</a>
              <a href="#contact" className="nav-item">{t.navContact}</a>
            </nav>

            <button
              className="lang-toggle-btn"
              onClick={handleLangToggle}
              aria-label="Toggle Language"
            >
              <Globe size={16} />
              <span>{t.toggleLang}</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-menu">
          <a
            href="#home"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.navHome}
          </a>
          <a
            href="#about"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.navAbout}
          </a>
          <a
            href="#projects"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.navProjects}
          </a>
          <a
            href="#donate"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.navDonate}
          </a>
          <a
            href="#media"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.navUpdates}
          </a>
          <a
            href="#contact"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.navContact}
          </a>
          <div className="mobile-menu-footer">
            <Mail size={16} />
            <a href="mailto:prajwaltrust21@gmail.com">prajwaltrust21@gmail.com</a>
          </div>
          <div className="mobile-menu-socials">
            <a href="https://wa.me/919482111131" target="_blank" rel="noopener noreferrer" className="mobile-social-link whatsapp">
              <WhatsAppIcon size={18} />
              <span>WhatsApp</span>
            </a>
            <a href="https://www.facebook.com/share/17vpcLHms1/" target="_blank" rel="noopener noreferrer" className="mobile-social-link facebook">
              <FacebookIcon size={18} />
              <span>Facebook</span>
            </a>
          </div>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSub}</p>
          <p className="hero-desc">{t.heroDesc}</p>
          <div className="hero-actions">
            <a href="#donate" className="btn btn-primary">{t.btnDonate}</a>
            <a href="#about" className="btn btn-outline">{t.btnLearn}</a>
          </div>
        </div>
        <div className="hero-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35C121.81,35.58,208.8,67.38,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-card">
              <div className="logo-glow-wrapper">
                <img src={logo} alt="Prajwal Trust Logo" className="about-logo" />
              </div>
              <div className="sanskrit-card">
                <h4 className="sanskrit-tag">{t.mottoTitle}</h4>
                <p className="sanskrit-phrase">“ಪ್ರಜ್ವಾಲಿತೋ ಜ್ಞಾನಮಯಃ ಪ್ರದೀಪಃ”</p>
                <div className="sanskrit-divider"></div>
                <p className="sanskrit-translation">“The Lamp of Knowledge is Lit”</p>
              </div>
            </div>

            <div className="about-info-card">
              <span className="section-badge">{t.navAbout}</span>
              <h2 className="section-title">{t.aboutTitle}</h2>
              <div className="section-divider"></div>
              <p className="about-paragraph">{t.aboutText1}</p>
              <p className="about-paragraph">{t.aboutText2}</p>

              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon"><CheckCircle2 size={16} /></div>
                  <span>Integrity & Transparency</span>
                </div>
                <div className="value-item">
                  <div className="value-icon"><CheckCircle2 size={16} /></div>
                  <span>Rural Upliftment Focus</span>
                </div>
                <div className="value-item">
                  <div className="value-icon"><CheckCircle2 size={16} /></div>
                  <span>Empowerment & Education</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.navProjects}</span>
            <h2 className="section-title text-white">{t.projectsTitle}</h2>
            <div className="section-divider center"></div>
            <p className="section-subtitle">{t.projectsSub}</p>
          </div>

          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card">
              <div className="project-icon-box bg-edu">
                <BookOpen size={28} className="project-icon" />
              </div>
              <h3 className="project-card-title">{t.projEduTitle}</h3>
              <p className="project-card-desc">{t.projEduDesc}</p>
              <div className="card-hover-indicator"></div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-icon-box bg-health">
                <HeartPulse size={28} className="project-icon" />
              </div>
              <h3 className="project-card-title">{t.projHealthTitle}</h3>
              <p className="project-card-desc">{t.projHealthDesc}</p>
              <div className="card-hover-indicator"></div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="project-icon-box bg-env">
                <Leaf size={28} className="project-icon" />
              </div>
              <h3 className="project-card-title">{t.projEnvTitle}</h3>
              <p className="project-card-desc">{t.projEnvDesc}</p>
              <div className="card-hover-indicator"></div>
            </div>

            {/* Project 4 */}
            <div className="project-card">
              <div className="project-icon-box bg-emp">
                <Users size={28} className="project-icon" />
              </div>
              <h3 className="project-card-title">{t.projEmpTitle}</h3>
              <p className="project-card-desc">{t.projEmpDesc}</p>
              <div className="card-hover-indicator"></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-number">{t.statLives}</h3>
              <p className="stat-label">{t.statLivesLabel}</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">{t.statScholarships}</h3>
              <p className="stat-label">{t.statScholarshipsLabel}</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">{t.statHealth}</h3>
              <p className="stat-label">{t.statHealthLabel}</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">{t.statTrees}</h3>
              <p className="stat-label">{t.statTreesLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS & MEDIA SECTION */}
      <section id="media" className="media-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Updates</span>
            <h2 className="section-title">{t.mediaTitle}</h2>
            <div className="section-divider center"></div>
            <p className="section-subtitle color-dark">{t.mediaSub}</p>
          </div>

          <div className="media-tabs-container">
            <button
              className={`media-tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={() => setActiveTab('articles')}
            >
              {t.tabArticles}
            </button>
            <button
              className={`media-tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              {t.tabVideos}
            </button>
          </div>

          {activeTab === 'articles' ? (
            articles.length === 0 ? (
              <p className="no-content-msg">{t.noContent}</p>
            ) : (
              <div className="articles-grid">
                {articles.map((art) => (
                  <div className="article-card" key={art._id}>
                    <div className="article-image-box">
                      <img src={art.image} alt={art.title} className="article-img" />
                      <span className="article-badge">{art.category}</span>
                    </div>
                    <div className="article-info">
                      <span className="article-date">{t.publishedOn}: {art.date}</span>
                      <h3 className="article-title">{art.title}</h3>
                      <p className="article-summary">{art.summary}</p>
                      <button onClick={() => setSelectedArticle(art)} className="read-more-btn">
                        {t.readMore} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            videos.length === 0 ? (
              <p className="no-content-msg">{t.noContent}</p>
            ) : (
              <div className="videos-grid">
                {videos.map((vid) => (
                  <div className="video-card" key={vid._id}>
                    <div className="video-iframe-box">
                      <iframe
                        src={vid.url}
                        title={vid.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="video-info">
                      <span className="video-date">{t.publishedOn}: {vid.date}</span>
                      <h3 className="video-title">{vid.title}</h3>
                      {vid.description && <p className="video-desc">{vid.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* DONATE SECTION */}
      <section id="donate" className="donate-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.navDonate}</span>
            <h2 className="section-title">{t.donateTitle}</h2>
            <div className="section-divider center"></div>
            <p className="section-subtitle color-dark">{t.donateSub}</p>
          </div>

          <div className="donate-grid">
            <div className="donate-bank-card">
              <div className="bank-card-header">
                <Heart className="heart-icon-glow" fill="currentColor" size={24} />
                <h3>{t.bankTitle}</h3>
              </div>
              <div className="bank-card-body">
                <div className="bank-detail-item">
                  <span className="detail-label">{t.accName}</span>
                  <div className="detail-value-wrapper">
                    <span className="detail-value">{BANK_DETAILS.name}</span>
                  </div>
                </div>

                <div className="bank-detail-item">
                  <span className="detail-label">{t.accNumber}</span>
                  <div className="detail-value-wrapper">
                    <code className="detail-code">{BANK_DETAILS.account}</code>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(BANK_DETAILS.account, 'account')}
                      aria-label="Copy Account Number"
                    >
                      {copiedField === 'account' ? <Check size={14} className="copied" /> : <Copy size={14} />}
                      <span>{copiedField === 'account' ? t.copiedBtn : t.copyBtn}</span>
                    </button>
                  </div>
                </div>

                <div className="bank-detail-item">
                  <span className="detail-label">{t.bankName}</span>
                  <div className="detail-value-wrapper">
                    <span className="detail-value">{BANK_DETAILS.bank}</span>
                  </div>
                </div>

                <div className="bank-detail-item">
                  <span className="detail-label">{t.ifscCode}</span>
                  <div className="detail-value-wrapper">
                    <code className="detail-code">{BANK_DETAILS.ifsc}</code>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(BANK_DETAILS.ifsc, 'ifsc')}
                      aria-label="Copy IFSC Code"
                    >
                      {copiedField === 'ifsc' ? <Check size={14} className="copied" /> : <Copy size={14} />}
                      <span>{copiedField === 'ifsc' ? t.copiedBtn : t.copyBtn}</span>
                    </button>
                  </div>
                </div>

                <div className="bank-detail-item">
                  <span className="detail-label">{t.branchName}</span>
                  <div className="detail-value-wrapper">
                    <span className="detail-value">{BANK_DETAILS.branch}</span>
                  </div>
                </div>
              </div>
              <div className="bank-card-footer">
                <p>{t.taxExempt}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE DETAILS MODAL */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedArticle(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="modal-body">
              <div className="modal-header-img-box">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="modal-img" />
                <span className="modal-badge">{selectedArticle.category}</span>
              </div>
              <div className="modal-details">
                <span className="modal-date">{t.publishedOn}: {selectedArticle.date}</span>
                <h2 className="modal-title">{selectedArticle.title}</h2>
                <div className="modal-divider"></div>
                <div className="modal-body-text">
                  {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="modal-paragraph">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT & VOLUNTEER SECTION */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-card">
              <span className="section-badge">{t.navContact}</span>
              <h2 className="section-title text-white">{t.contactTitle}</h2>
              <div className="section-divider"></div>
              <p className="contact-sub-text">{t.contactSub}</p>

              <div className="contact-methods">
                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-method-details">
                    <h4>Email</h4>
                    <a href="mailto:prajwaltrust21@gmail.com">prajwaltrust21@gmail.com</a>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <Phone size={20} />
                  </div>
                  <div className="contact-method-details">
                    <h4>Phone & WhatsApp</h4>
                    <div className="phone-links" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <a href="tel:+919482111131">+91 94821 11131</a>
                      <a href="tel:+917338498524">+91 73384 98524</a>
                      <a href="https://wa.me/919482111131" target="_blank" rel="noopener noreferrer" className="whatsapp-contact-link">
                        <WhatsAppIcon size={14} fill="currentColor" />
                        <span>WhatsApp Chat</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-method-details">
                    <h4>Address</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{t.addressVal}</p>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <FacebookIcon size={20} />
                  </div>
                  <div className="contact-method-details">
                    <h4>Facebook</h4>
                    <a href="https://www.facebook.com/share/17vpcLHms1/" target="_blank" rel="noopener noreferrer" className="social-contact-link">
                      <span>Visit Facebook Page</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              {submitSuccess ? (
                <div className="form-success-message">
                  <CheckCircle2 size={48} className="success-icon" />
                  <p>{t.formSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">{t.formName} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">{t.formEmail} *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        required
                        placeholder="Your email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">{t.formPhone}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
                        placeholder="Your phone"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">{t.formMsg} *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      value={form.message}
                      onChange={handleFormChange}
                      required
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t.formSubmitting : t.formSubmit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo-row">
                <img src={logo} alt="Prajwal Trust Logo" className="footer-logo" />
                <h3>PRAJWAL TRUST (R)</h3>
              </div>
              <p className="footer-desc">{t.footerAbout}</p>
              <div className="footer-social-links">
                <a href="https://wa.me/919482111131" target="_blank" rel="noopener noreferrer" className="social-icon-btn whatsapp" aria-label="WhatsApp">
                  <WhatsAppIcon size={18} />
                </a>
                <a href="https://www.facebook.com/share/17vpcLHms1/" target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook" aria-label="Facebook">
                  <FacebookIcon size={18} />
                </a>
              </div>
            </div>

            <div className="footer-links-col">
              <h4>{t.footerQuick}</h4>
              <ul className="footer-links">
                <li><ChevronRight size={14} /><a href="#home">{t.navHome}</a></li>
                <li><ChevronRight size={14} /><a href="#about">{t.navAbout}</a></li>
                <li><ChevronRight size={14} /><a href="#projects">{t.navProjects}</a></li>
                <li><ChevronRight size={14} /><a href="#donate">{t.navDonate}</a></li>
                <li><ChevronRight size={14} /><a href="#media">{t.navUpdates}</a></li>
                <li><ChevronRight size={14} /><a href="#contact">{t.navContact}</a></li>
              </ul>
            </div>

            <div className="footer-contact-col">
              <h4>{t.footerContact}</h4>
              <ul className="footer-contact-list">
                <li>
                  <MapPin size={16} style={{ marginTop: '4px' }} />
                  <span style={{ whiteSpace: 'pre-line' }}>{t.addressVal}</span>
                </li>
                <li>
                  <Phone size={16} style={{ marginTop: '4px' }} />
                  <div className="footer-phones" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <a href="tel:+919482111131">+91 94821 11131</a>
                    <a href="tel:+917338498524">+91 73384 98524</a>
                  </div>
                </li>
                <li>
                  <Mail size={16} />
                  <a href="mailto:prajwaltrust21@gmail.com">prajwaltrust21@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Prajwal Trust (R). {t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
