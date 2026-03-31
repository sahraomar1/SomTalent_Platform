import { useEffect, useMemo, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'https://somtalent-platform.onrender.com';

const translations = {
  en: {
    appName: 'SomTalent',
    tagline: 'Connecting Somaliland talent to remote jobs worldwide',
    joinLogin: 'Join / Login',
    login: 'Login',
    signUp: 'Sign Up',
    createAccount: 'Create Account',
    asJobSeeker: 'As Job Seeker',
    asEmployer: 'As Employer',
    asAdmin: 'As Admin',
    dashboard: 'Dashboard',
    jobSeekerDashboard: 'Job Seeker Dashboard',
    employerDashboard: 'Employer Dashboard',
    adminDashboard: 'Admin Dashboard',
    browseJobs: 'Browse Jobs',
    training: 'Training Modules',
    applications: 'My Applications',
    profile: 'Profile',
    notifications: 'Notifications',
    certificates: 'Certificates',
    help: 'Help Center',
    users: 'Users',
    logout: 'Logout',
    welcome: 'Welcome',
    fullName: 'Full Name',
    companyName: 'Company Name',
    email: 'Email',
    phone: 'Phone Number',
    password: 'Password',
    skills: 'Skills (comma separated)',
    workHistory: 'Work History',
    companyWebsite: 'Company Website',
    preferredLanguage: 'Preferred Language',
    english: 'English',
    somali: 'Somali',
    resume: 'Resume',
    coverLetter: 'Cover Letter',
    saveProfile: 'Save Profile',
    postJob: 'Post Job',
    title: 'Job Title',
    category: 'Category',
    requiredSkills: 'Required Skills (comma separated)',
    minSalary: 'Minimum Salary',
    maxSalary: 'Maximum Salary',
    locationType: 'Location Type',
    remote: 'Remote',
    onsite: 'On-site',
    hybrid: 'Hybrid',
    description: 'Description',
    screeningQuestions: 'Screening Questions',
    screeningPlaceholder: 'One question per line',
    apply: 'Apply',
    answerQuestion: 'Answer the question',
    completeModule: 'Complete Module',
    completed: 'Completed - Certificate Issued',
    verifyCompany: 'Request Verification',
    noJobs: 'No jobs available right now.',
    noApplications: 'No applications yet.',
    noModules: 'No training modules available yet.',
    noNotifications: 'No notifications yet.',
    noCertificates: 'No certificates yet.',
    filters: 'Filters',
    applyFilters: 'Apply Filters',
    keywordPlaceholder: 'Search title, company, description...',
    skill: 'Skill',
    allLocations: 'All Locations',
    minimumSalary: 'Minimum Salary',
    matchScore: 'Match Score',
    status: 'Status',
    applied: 'Applied',
    interviewDate: 'Interview Date',
    shortlist: 'Shortlist',
    accept: 'Accept',
    reject: 'Reject',
    scheduleInterview: 'Schedule Interview',
    totalJobs: 'Total Jobs',
    totalApplications: 'Total Applications',
    shortlisted: 'Shortlisted',
    interviews: 'Interviews',
    accepted: 'Accepted',
    pending: 'Pending',
    completedCourses: 'Completed Courses',
    certificatesCount: 'Certificates',
    saveSuccess: 'Profile updated successfully.',
    candidateAccepted: 'Candidate accepted. You can now schedule an interview.',
    candidateRejected: 'This application has been rejected.',
    interviewScheduled: 'Interview scheduled successfully.',
    alreadyApplied: 'You have already applied for this job.',
    viewResume: 'View Resume',
    answers: 'Screening Answers',
    helpIntro: 'This platform helps job seekers apply for jobs, complete training, and track progress.',
    faq1: 'How do I apply?',
    faq1a: 'Open Browse Jobs, answer screening questions, then click Apply.',
    faq2: 'How do I get a certificate?',
    faq2a: 'Complete a training module and your certificate will appear in the Certificates tab.',
    faq3: 'How does an employer review me?',
    faq3a: 'The employer can review your profile, skills, resume, and your screening answers.',
    totalUsers: 'Total Users',
    totalJobSeekers: 'Job Seekers',
    totalEmployers: 'Employers',
    totalCertificates: 'Certificates',
    issuedAt: 'Issued At',
    markRead: 'Mark as read',
    interviewType: 'Interview Type',
    online: 'Online',
    physical: 'Physical',
    meetingLink: 'Meeting Link',
    meetingLocation: 'Meeting Location',
    interviewNotes: 'Interview Notes',
    verified: 'Verified',
    verifyEmployer: 'Verify Employer',
    pendingVerification: 'Pending Verification',
    suspendUser: 'Suspend',
    activateUser: 'Activate',
    languageToggle: 'EN / SO'
  },
  so: {
    appName: 'SomTalent',
    tagline: 'Xiriirinta xirfadlayaasha Somaliland shaqooyinka fog ee adduunka',
    joinLogin: 'Biir / Gal',
    login: 'Gal',
    signUp: 'Is-diiwaan Geli',
    createAccount: 'Samee Xisaab',
    asJobSeeker: 'Shaqo Doonde',
    asEmployer: 'Shaqo Bixiye',
    asAdmin: 'Maamulaha',
    dashboard: 'Xaashida Xogta',
    jobSeekerDashboard: 'Xaashida Shaqo Doonaha',
    employerDashboard: 'Xaashida Shaqo Bixiyaha',
    adminDashboard: 'Xaashida Maamulaha',
    browseJobs: 'Raadi Shaqooyinka',
    training: 'Qeybaha Tababarka',
    applications: 'Codsiyadeeyda',
    profile: 'Macluumaadkaaga',
    notifications: 'Ogeysiisyada',
    certificates: 'Shahaadooyinka',
    help: 'Xarunta Caawimaada',
    users: 'Isticmaalayaasha',
    logout: 'Ka Bax',
    welcome: 'Soo Dhowow',
    fullName: 'Magaca Buuxa',
    companyName: 'Magaca Shirkadda',
    email: 'Iimaylka',
    phone: 'Lambarka Telefoonka',
    password: 'Furaha Sirta',
    skills: 'Xirfadaha (kala fogeey xarfaha)',
    workHistory: 'Taariikhda Shaqada',
    companyWebsite: 'Websaytka Shirkadda',
    preferredLanguage: 'Luqadda La Doorbidayo',
    english: 'Ingiriisi',
    somali: 'Soomaali',
    resume: 'Taariikh Nololeedka',
    coverLetter: 'Warqadda Xididaadka',
    saveProfile: 'Kaydi Macluumaadka',
    postJob: 'Shayac Shaqo',
    title: 'Magaca Shaqada',
    category: 'Nooca',
    requiredSkills: 'Xirfadaha Loo Baahan Yahay',
    minSalary: 'Mushaharka Ugu Yar',
    maxSalary: 'Mushaharka Ugu Badan',
    locationType: 'Nooca Goobta',
    remote: 'Fog',
    onsite: 'Goobta',
    hybrid: 'Labadaba',
    description: 'Sharaxaad',
    screeningQuestions: 'Su\'aalaha Xulashada',
    screeningPlaceholder: 'Su\'aal kasta sadar',
    apply: 'Codso',
    answerQuestion: 'Jawaab su\'aasha',
    completeModule: 'Dhamee Qeybta',
    completed: 'La Dhamaystay - Shahaado La Bixiyay',
    verifyCompany: 'Codsiga Xaqiijinta',
    noJobs: 'Ma jiraan shaqooyin hadda.',
    noApplications: 'Codsiyada ma jiraan weli.',
    noModules: 'Qeybaha tababarka ma jiraan weli.',
    noNotifications: 'Ogeysiis ma jiro weli.',
    noCertificates: 'Shahaado ma jirto weli.',
    filters: 'Shaandheeye',
    applyFilters: 'Isticmaal Shaandheeye',
    keywordPlaceholder: 'Raadi cinwaanka, shirkadda, sharaxaadda...',
    skill: 'Xirfad',
    allLocations: 'Dhammaan Goobaha',
    minimumSalary: 'Mushaharka Ugu Yar',
    matchScore: 'Dhibcaha Waafaqsan',
    status: 'Xaaladda',
    applied: 'La Codsaday',
    interviewDate: 'Taariikhda Wareysigu',
    shortlist: 'Liiska Gaaban',
    accept: 'Aqbal',
    reject: 'Diid',
    scheduleInterview: 'Jadwalayso Wareysiga',
    totalJobs: 'Wadarta Shaqooyinka',
    totalApplications: 'Wadarta Codsiyada',
    shortlisted: 'Liiska Gaaban',
    interviews: 'Wareysiyo',
    accepted: 'La Aqbalay',
    pending: 'Sugaya',
    completedCourses: 'Koorsooyin La Dhamaystay',
    certificatesCount: 'Shahaadooyinka',
    saveSuccess: 'Macluumaadka si guul ah ayaa loo cusboonaysiiyay.',
    candidateAccepted: 'Musharruuca la aqbalay. Hadda waxaad jadwalayn kartaa wareysiga.',
    candidateRejected: 'Codsigan la diiday.',
    interviewScheduled: 'Wareysiga si guul ah ayaa loo jadwalayay.',
    alreadyApplied: 'Horaan ayaad u codsatay shaqadan.',
    viewResume: 'Arag Taariikh Nololeedka',
    answers: 'Jawaabaha Xulashada',
    helpIntro: 'Barnaamijkan wuxuu caawiyaa shaqo doonayaasha in ay codsadaan shaqooyin, dhammaystaan tababar, oo raaciyaan horumarkooda.',
    faq1: 'Sideen u codsaday?',
    faq1a: 'Fur Raadi Shaqooyinka, jawaab su\'aalaha xulashada, kadibna riix Codso.',
    faq2: 'Sideen shahaado u heli karaa?',
    faq2a: 'Dhamee qeyb tababar shahaadana waxay ku muuqan doontaa tabka Shahaadooyinka.',
    faq3: 'Sidee shaqo bixiyahu ii eegi karaa?',
    faq3a: 'Shaqo bixiyaha wuxuu dib u eegi karaa macluumaadkaaga, xirfadahaaga, taariikh nololeedkaaga, iyo jawaabahaa xulashada.',
    totalUsers: 'Wadarta Isticmaalayaasha',
    totalJobSeekers: 'Shaqo Doonayaasha',
    totalEmployers: 'Shaqo Bixiyayaasha',
    totalCertificates: 'Shahaadooyinka',
    issuedAt: 'La Bixiyay',
    markRead: 'U calaamadi akhrisan',
    interviewType: 'Nooca Wareysiga',
    online: 'Online',
    physical: 'Jir ahaaneed',
    meetingLink: 'Xiriirinta Kulanka',
    meetingLocation: 'Goobta Kulanka',
    interviewNotes: 'Xusuus Qorka Wareysiga',
    verified: 'La Xaqiijiyay',
    verifyEmployer: 'Xaqiiji Shaqo Bixiyaha',
    pendingVerification: 'Xaqiijinta Sugaysa',
    suspendUser: 'Hakinta',
    activateUser: 'Firfircoonee',
    languageToggle: 'EN / SO'
  }
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (pw) => pw.length >= 6;
const validatePhone = (ph) => !ph || /^[+\d\s\-()]{6,20}$/.test(ph);

function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('join');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [signupRole, setSignupRole] = useState('jobSeeker');
  const [signupData, setSignupData] = useState({
    name: '', email: '', phone: '', password: '',
    skills: '', workHistory: '', companyWebsite: '', preferredLanguage: 'en'
  });
  const [signupResume, setSignupResume] = useState(null);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupValidationErrors, setSignupValidationErrors] = useState({});

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginValidationErrors, setLoginValidationErrors] = useState({});

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [employerApplications, setEmployerApplications] = useState([]);
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  const [applyMessage, setApplyMessage] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');

  const [filters, setFilters] = useState({
    keyword: '', skill: '', category: '', locationType: '', salaryMin: ''
  });

  const [interviewDates, setInterviewDates] = useState({});
  const [interviewTypes, setInterviewTypes] = useState({});
  const [interviewLinks, setInterviewLinks] = useState({});
  const [interviewLocations, setInterviewLocations] = useState({});
  const [interviewNotes, setInterviewNotes] = useState({});
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [coverLetters, setCoverLetters] = useState({});

  const [profileForm, setProfileForm] = useState({
    name: '', phone: '', skills: '', workHistory: '',
    companyWebsite: '', preferredLanguage: 'en'
  });
  const [profileResume, setProfileResume] = useState(null);

  const t = translations[lang];
  const text = (key, fallback) => t?.[key] || fallback || key;

  const completedModuleIds = useMemo(
    () => new Set(progress.filter((item) => item.completed).map((item) => item.moduleId)),
    [progress]
  );

  const fetchJSON = async (url, options = {}) => {
    const response = await fetch(url, options);
    const textData = await response.text();
    let data;
    try {
      data = JSON.parse(textData);
    } catch {
      throw new Error('Server error — please redeploy or check internet');
    }
    if (!response.ok) throw new Error(data.error || data.message || 'Request failed');
    return data;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      setIsLoggedIn(true);
      setLang(parsedUser.preferredLanguage || 'en');
      setProfileForm({
        name: parsedUser.name || '',
        phone: parsedUser.phone || '',
        skills: Array.isArray(parsedUser.skills) ? parsedUser.skills.join(', ') : '',
        workHistory: parsedUser.workHistory || '',
        companyWebsite: parsedUser.companyWebsite || '',
        preferredLanguage: parsedUser.preferredLanguage || 'en'
      });
      setActiveTab('dashboard');
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !currentUser) return;
    loadNotifications();
    if (currentUser.role === 'jobSeeker') {
      if (activeTab === 'dashboard') { loadDashboard(); loadJobs(); loadApplications(); loadModules(); loadProgress(); loadCertificates(); }
      if (activeTab === 'jobs') { loadJobs(); loadApplications(); }
      if (activeTab === 'applications') loadApplications();
      if (activeTab === 'training') { loadModules(); loadProgress(); }
      if (activeTab === 'certificates') loadCertificates();
    }
    if (currentUser.role === 'employer') {
      if (activeTab === 'dashboard' || activeTab === 'employer') { loadDashboard(); loadEmployerApplications(); }
    }
    if (currentUser.role === 'admin') {
      if (activeTab === 'dashboard') loadAdminDashboard();
      if (activeTab === 'users') loadAdminUsers();
    }
  }, [activeTab, isLoggedIn, currentUser]);

  const loadJobs = async () => {
    try {
      let url = `${API}/api/jobs`;
      const params = new URLSearchParams();
      if (currentUser?.email) params.append('userEmail', currentUser.email);
      if (filters.keyword) params.append('keyword', filters.keyword);
      if (filters.skill) params.append('skill', filters.skill);
      if (filters.category) params.append('category', filters.category);
      if (filters.locationType) params.append('locationType', filters.locationType);
      if (filters.salaryMin) params.append('salaryMin', filters.salaryMin);
      if ([...params.keys()].length > 0) url += `?${params.toString()}`;
      const data = await fetchJSON(url);
      setJobs(Array.isArray(data) ? data : []);
    } catch { setJobs([]); }
  };

  const loadApplications = async () => {
    try {
      const data = await fetchJSON(`${API}/api/my-applications?email=${encodeURIComponent(currentUser.email)}`);
      setApplications(Array.isArray(data) ? data : []);
    } catch { setApplications([]); }
  };

  const loadEmployerApplications = async () => {
    try {
      const data = await fetchJSON(`${API}/api/applications/employer/${encodeURIComponent(currentUser.email)}`);
      setEmployerApplications(Array.isArray(data) ? data : []);
    } catch { setEmployerApplications([]); }
  };

  const loadModules = async () => {
    try {
      const data = await fetchJSON(`${API}/api/training-modules`);
      setModules(Array.isArray(data) ? data : []);
    } catch { setModules([]); }
  };

  const loadProgress = async () => {
    try {
      const data = await fetchJSON(`${API}/api/training-progress/${encodeURIComponent(currentUser.email)}`);
      setProgress(Array.isArray(data) ? data : []);
    } catch { setProgress([]); }
  };

  const loadCertificates = async () => {
    try {
      const data = await fetchJSON(`${API}/api/certificates/${encodeURIComponent(currentUser.email)}`);
      setCertificates(Array.isArray(data) ? data : []);
    } catch { setCertificates([]); }
  };

  const loadNotifications = async () => {
    try {
      const data = await fetchJSON(`${API}/api/notifications/${encodeURIComponent(currentUser.email)}`);
      setNotifications(Array.isArray(data) ? data : []);
    } catch { setNotifications([]); }
  };

  const loadDashboard = async () => {
    try {
      const url = currentUser.role === 'employer'
        ? `${API}/api/dashboard/employer/${encodeURIComponent(currentUser.email)}`
        : `${API}/api/dashboard/jobseeker/${encodeURIComponent(currentUser.email)}`;
      const data = await fetchJSON(url);
      setDashboardData(data);
    } catch { setDashboardData(null); }
  };

  const loadAdminDashboard = async () => {
    try {
      const data = await fetchJSON(`${API}/api/dashboard/admin`);
      setAdminStats(data);
    } catch { setAdminStats(null); }
  };

  const loadAdminUsers = async () => {
    try {
      const data = await fetchJSON(`${API}/api/admin/users`);
      setAdminUsers(Array.isArray(data) ? data : []);
    } catch { setAdminUsers([]); }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    setSignupValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setLoginValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const validateSignup = () => {
    const errors = {};
    if (!signupData.name.trim()) errors.name = 'Name is required.';
    if (!validateEmail(signupData.email)) errors.email = 'Enter a valid email address.';
    if (!validatePassword(signupData.password)) errors.password = 'Password must be at least 6 characters.';
    if (signupData.phone && !validatePhone(signupData.phone)) errors.phone = 'Enter a valid phone number.';
    if (signupRole === 'jobSeeker' && !signupResume) errors.resume = 'Please upload your resume.';
    return errors;
  };

  const validateLogin = () => {
    const errors = {};
    if (!validateEmail(loginData.email)) errors.email = 'Enter a valid email address.';
    if (!loginData.password) errors.password = 'Password is required.';
    return errors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errors = validateSignup();
    if (Object.keys(errors).length > 0) { setSignupValidationErrors(errors); return; }
    setSignupLoading(true);
    setSignupMessage('');
    setSignupError('');
    try {
      const formData = new FormData();
      formData.append('role', signupRole);
      formData.append('name', signupData.name);
      formData.append('email', signupData.email);
      formData.append('phone', signupData.phone);
      formData.append('password', signupData.password);
      formData.append('skills', signupData.skills);
      formData.append('workHistory', signupData.workHistory);
      formData.append('companyWebsite', signupData.companyWebsite);
      formData.append('preferredLanguage', signupData.preferredLanguage);
      if (signupResume) formData.append('resume', signupResume);
      await fetchJSON(`${API}/api/signup`, { method: 'POST', body: formData });
      setSignupMessage('Signed up successfully. Please log in.');
      setSignupData({ name: '', email: '', phone: '', password: '', skills: '', workHistory: '', companyWebsite: '', preferredLanguage: 'en' });
      setSignupResume(null);
      setSignupValidationErrors({});
    } catch (error) {
      setSignupError(error.message);
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) { setLoginValidationErrors(errors); return; }
    setLoginError('');
    try {
      const data = await fetchJSON(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      setLang(data.user.preferredLanguage || 'en');
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      setProfileForm({
        name: data.user.name || '',
        phone: data.user.phone || '',
        skills: Array.isArray(data.user.skills) ? data.user.skills.join(', ') : '',
        workHistory: data.user.workHistory || '',
        companyWebsite: data.user.companyWebsite || '',
        preferredLanguage: data.user.preferredLanguage || 'en'
      });
      setActiveTab('dashboard');
      setLoginData({ email: '', password: '' });
      setLoginValidationErrors({});
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setLang('en');
    setActiveTab('join');
  };

  const handleApply = async (job) => {
    try {
      const answersForJob = (job.questions || []).map((question, index) => ({
        question,
        answer: questionAnswers[job._id]?.[index] || ''
      }));
      const missingAnswer = answersForJob.some((item) => item.question && !String(item.answer || '').trim());
      if (missingAnswer) { setApplyMessage('Please answer all screening questions.'); return; }
      await fetchJSON(`${API}/api/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job._id,
          applicantEmail: currentUser.email,
          answers: answersForJob,
          coverLetter: coverLetters[job._id] || ''
        })
      });
      setApplyMessage('Application submitted successfully.');
      loadApplications();
      loadJobs();
      loadNotifications();
    } catch (error) {
      setApplyMessage(error.message);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await fetchJSON(`${API}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.value,
          company: currentUser.name,
          category: form.category.value,
          requiredSkills: form.requiredSkills.value,
          salaryMin: form.salaryMin.value,
          salaryMax: form.salaryMax.value,
          locationType: form.locationType.value,
          description: form.description.value,
          questions: form.questions.value,
          employerEmail: currentUser.email
        })
      });
      form.reset();
      loadDashboard();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await fetchJSON(`${API}/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadEmployerApplications();
      loadDashboard();
    } catch (error) {
      alert(error.message);
    }
  };

  const scheduleInterview = async (id) => {
    try {
      await fetchJSON(`${API}/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Interview Scheduled',
          interviewDate: interviewDates[id] || '',
          interviewType: interviewTypes[id] || '',
          interviewLink: interviewLinks[id] || '',
          interviewLocation: interviewLocations[id] || '',
          interviewNotes: interviewNotes[id] || ''
        })
      });
      loadEmployerApplications();
      loadDashboard();
      loadNotifications();
    } catch (error) {
      alert(error.message);
    }
  };

  const markModuleComplete = async (moduleId) => {
    try {
      await fetchJSON(`${API}/api/training-progress/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: currentUser.email, moduleId })
      });
      loadProgress();
      loadCertificates();
      loadDashboard();
      loadNotifications();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setProfileMessage('');
    setProfileError('');
    if (profileForm.phone && !validatePhone(profileForm.phone)) {
      setProfileError('Enter a valid phone number.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', profileForm.name);
      formData.append('phone', profileForm.phone);
      formData.append('preferredLanguage', profileForm.preferredLanguage);
      if (currentUser.role === 'jobSeeker') {
        formData.append('skills', profileForm.skills);
        formData.append('workHistory', profileForm.workHistory);
        if (profileResume) formData.append('resume', profileResume);
      }
      if (currentUser.role === 'employer') {
        formData.append('companyWebsite', profileForm.companyWebsite);
      }
      const updatedUser = await fetchJSON(`${API}/api/profile/${encodeURIComponent(currentUser.email)}`, {
        method: 'PUT',
        body: formData
      });
      setCurrentUser(updatedUser);
      setLang(updatedUser.preferredLanguage || 'en');
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setProfileMessage(text('saveSuccess', 'Profile updated successfully.'));
    } catch (error) {
      setProfileError(error.message);
    }
  };

  const requestVerification = async () => {
    try {
      await fetchJSON(`${API}/api/employers/${encodeURIComponent(currentUser.email)}/request-verify`, { method: 'PUT' });
      alert('Verification request sent to admin.');
      loadNotifications();
    } catch (error) {
      alert(error.message);
    }
  };

  const adminVerifyEmployer = async (email) => {
    try {
      await fetchJSON(`${API}/api/employers/${encodeURIComponent(email)}/verify`, { method: 'PUT' });
      loadAdminUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  const adminToggleSuspend = async (userId, currentStatus) => {
    try {
      await fetchJSON(`${API}/api/admin/users/${userId}/suspend`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suspended: !currentStatus })
      });
      loadAdminUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  const markNotificationRead = async (id) => {
    await fetchJSON(`${API}/api/notifications/read/${id}`, { method: 'PUT' });
    loadNotifications();
  };

  const getStatusBadgeStyle = (status) => {
    let bg = '#e2e8f0', color = '#1e293b';
    if (status === 'Pending') { bg = '#fef3c7'; color = '#92400e'; }
    else if (status === 'Shortlisted') { bg = '#dbeafe'; color = '#1d4ed8'; }
    else if (status === 'Accepted') { bg = '#dcfce7'; color = '#166534'; }
    else if (status === 'Rejected') { bg = '#fee2e2'; color = '#991b1b'; }
    else if (status === 'Interview Scheduled') { bg = '#ede9fe'; color = '#6d28d9'; }
    return { background: bg, color, padding: '8px 12px', borderRadius: 999, fontWeight: 700, fontSize: '13px' };
  };

  const navForRole = () => {
    if (!isLoggedIn) return null;
    if (currentUser.role === 'jobSeeker') return (
      <>
        <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle}>{text('jobSeekerDashboard')}</button>
        <button onClick={() => setActiveTab('jobs')} style={navButtonStyle}>{text('browseJobs')}</button>
        <button onClick={() => setActiveTab('training')} style={navButtonStyle}>{text('training')}</button>
        <button onClick={() => setActiveTab('applications')} style={navButtonStyle}>{text('applications')}</button>
        <button onClick={() => setActiveTab('certificates')} style={navButtonStyle}>{text('certificates')}</button>
        <button onClick={() => setActiveTab('notifications')} style={navButtonStyle}>{text('notifications')}</button>
        <button onClick={() => setActiveTab('help')} style={navButtonStyle}>{text('help')}</button>
        <button onClick={() => setActiveTab('profile')} style={navButtonStyle}>{text('profile')}</button>
      </>
    );
    if (currentUser.role === 'employer') return (
      <>
        <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle}>{text('employerDashboard')}</button>
        <button onClick={() => setActiveTab('employer')} style={navButtonStyle}>{text('postJob')}</button>
        <button onClick={() => setActiveTab('notifications')} style={navButtonStyle}>{text('notifications')}</button>
        <button onClick={() => setActiveTab('profile')} style={navButtonStyle}>{text('profile')}</button>
      </>
    );
    return (
      <>
        <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle}>{text('adminDashboard')}</button>
        <button onClick={() => setActiveTab('users')} style={navButtonStyle}>{text('users')}</button>
        <button onClick={() => setActiveTab('notifications')} style={navButtonStyle}>{text('notifications')}</button>
      </>
    );
  };

  const fieldError = (msg) => msg ? <p style={{ color: '#dc2626', fontSize: 12, margin: '-8px 0 8px' }}>{msg}</p> : null;

  const pageStyle = { minHeight: '100vh', background: '#f8fafc', padding: 20, fontFamily: 'Arial, sans-serif' };
  const headerStyle = { background: '#1e3a8a', color: 'white', padding: '30px 20px', borderRadius: 14, textAlign: 'center', marginBottom: 24 };
  const navStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 24 };
  const navButtonStyle = { padding: '12px 18px', borderRadius: 8, border: 'none', background: '#e2e8f0', color: '#1e3a8a', cursor: 'pointer', fontWeight: 600 };
  const centerContainerStyle = { maxWidth: 760, margin: '0 auto' };
  const contentContainerStyle = { maxWidth: 1050, margin: '0 auto' };
  const statsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 22 };
  const statCardStyle = { background: 'white', padding: 20, borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', textAlign: 'center' };
  const statNumberStyle = { fontSize: '28px', fontWeight: 'bold', margin: 0 };
  const cardStyle = { background: 'white', padding: 24, borderRadius: 14, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', marginBottom: 18 };
  const inputStyle = { width: '100%', padding: '12px 14px', marginBottom: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15, boxSizing: 'border-box' };
  const textareaStyle = { width: '100%', minHeight: 100, padding: '12px 14px', marginBottom: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15, resize: 'vertical', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', marginBottom: 6, color: '#334155', fontWeight: 600 };
  const primaryButtonStyle = { width: '100%', padding: '12px 16px', borderRadius: 8, border: 'none', background: '#1e3a8a', color: 'white', cursor: 'pointer', fontWeight: 600 };
  const smallButtonStyle = { padding: '8px 14px', borderRadius: 8, border: 'none', background: '#e2e8f0', color: '#1e3a8a', cursor: 'pointer', fontWeight: 600 };
  const professionalApplicantCardStyle = { background: 'white', padding: 24, borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', marginBottom: 18, border: '1px solid #e2e8f0' };
  const applicantTopRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 14 };
  const actionRowStyle = { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 };
  const interviewBoxStyle = { marginTop: 14, padding: 14, borderRadius: 10, background: '#ecfdf5', border: '1px solid #bbf7d0' };
  const secondaryButtonStyle = { padding: '10px 14px', borderRadius: 8, border: 'none', background: '#f59e0b', color: 'white', cursor: 'pointer', fontWeight: 600 };
  const successButtonStyle = { padding: '10px 14px', borderRadius: 8, border: 'none', background: '#16a34a', color: 'white', cursor: 'pointer', fontWeight: 600 };
  const dangerButtonStyle = { padding: '10px 14px', borderRadius: 8, border: 'none', background: '#dc2626', color: 'white', cursor: 'pointer', fontWeight: 600 };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button
            onClick={() => setLang(lang === 'en' ? 'so' : 'en')}
            style={{ ...smallButtonStyle, background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}
          >
            {lang === 'en' ? '🌐 Soomaali' : '🌐 English'}
          </button>
        </div>
        <h1 style={{ margin: 0 }}>{text('appName')}</h1>
        <p style={{ marginTop: 10 }}>{text('tagline')}</p>
        {isLoggedIn && currentUser && (
          <div style={{ marginTop: 14 }}>
            <span>{text('welcome')}, {currentUser.name}</span>
            <button onClick={handleLogout} style={{ ...smallButtonStyle, marginLeft: 12 }}>{text('logout')}</button>
          </div>
        )}
      </header>

      <div style={navStyle}>
        {!isLoggedIn && <button onClick={() => setActiveTab('join')} style={navButtonStyle}>{text('joinLogin')}</button>}
        {navForRole()}
      </div>

      {/* JOIN / LOGIN */}
      {!isLoggedIn && activeTab === 'join' && (
        <div style={centerContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('createAccount')}</h2>
            <div style={{ marginBottom: 16 }}>
              <button onClick={() => setSignupRole('jobSeeker')} style={{ ...smallButtonStyle, marginRight: 10, background: signupRole === 'jobSeeker' ? '#1e3a8a' : undefined, color: signupRole === 'jobSeeker' ? 'white' : undefined }}>{text('asJobSeeker')}</button>
              <button onClick={() => setSignupRole('employer')} style={{ ...smallButtonStyle, marginRight: 10, background: signupRole === 'employer' ? '#1e3a8a' : undefined, color: signupRole === 'employer' ? 'white' : undefined }}>{text('asEmployer')}</button>
              <button onClick={() => setSignupRole('admin')} style={{ ...smallButtonStyle, background: signupRole === 'admin' ? '#1e3a8a' : undefined, color: signupRole === 'admin' ? 'white' : undefined }}>{text('asAdmin')}</button>
            </div>
            <form onSubmit={handleSignup}>
              <input name="name" value={signupData.name} onChange={handleSignupChange} placeholder={signupRole === 'jobSeeker' ? text('fullName') : text('companyName')} style={inputStyle} />
              {fieldError(signupValidationErrors.name)}
              <input name="email" type="email" value={signupData.email} onChange={handleSignupChange} placeholder={text('email')} style={inputStyle} />
              {fieldError(signupValidationErrors.email)}
              <input name="phone" value={signupData.phone} onChange={handleSignupChange} placeholder={text('phone')} style={inputStyle} />
              {fieldError(signupValidationErrors.phone)}
              <input name="password" type="password" value={signupData.password} onChange={handleSignupChange} placeholder={text('password')} style={inputStyle} />
              {fieldError(signupValidationErrors.password)}
              {signupRole === 'jobSeeker' && (
                <>
                  <input name="skills" value={signupData.skills} onChange={handleSignupChange} placeholder={text('skills')} style={inputStyle} />
                  <textarea name="workHistory" value={signupData.workHistory} onChange={handleSignupChange} placeholder={text('workHistory')} style={textareaStyle} />
                  <label style={labelStyle}>{text('resume')}</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setSignupResume(e.target.files[0])} style={inputStyle} />
                  {fieldError(signupValidationErrors.resume)}
                </>
              )}
              {signupRole === 'employer' && (
                <input name="companyWebsite" value={signupData.companyWebsite} onChange={handleSignupChange} placeholder={text('companyWebsite')} style={inputStyle} />
              )}
              <select name="preferredLanguage" value={signupData.preferredLanguage} onChange={handleSignupChange} style={inputStyle}>
                <option value="en">{text('english')}</option>
                <option value="so">{text('somali')}</option>
              </select>
              <button type="submit" disabled={signupLoading} style={primaryButtonStyle}>
                {signupLoading ? '...' : text('signUp')}
              </button>
            </form>
            {signupMessage && <p style={{ color: 'green' }}>{signupMessage}</p>}
            {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
            <hr style={{ margin: '24px 0' }} />
            <h2>{text('login')}</h2>
            <form onSubmit={handleLogin}>
              <input name="email" type="email" value={loginData.email} onChange={handleLoginChange} placeholder={text('email')} style={inputStyle} />
              {fieldError(loginValidationErrors.email)}
              <input name="password" type="password" value={loginData.password} onChange={handleLoginChange} placeholder={text('password')} style={inputStyle} />
              {fieldError(loginValidationErrors.password)}
              <button type="submit" style={primaryButtonStyle}>{text('login')}</button>
            </form>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          </div>
        </div>
      )}

      {/* JOB SEEKER DASHBOARD */}
      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'dashboard' && (
        <div style={contentContainerStyle}>
          <h2>{text('jobSeekerDashboard')}</h2>
          <div style={statsGridStyle}>
            <div style={statCardStyle}><p style={statNumberStyle}>{dashboardData?.totalApplications ?? 0}</p><p>{text('totalApplications')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{dashboardData?.accepted ?? 0}</p><p>{text('accepted')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{dashboardData?.pending ?? 0}</p><p>{text('pending')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{dashboardData?.completedCourses ?? 0}</p><p>{text('completedCourses')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{dashboardData?.certificates ?? 0}</p><p>{text('certificatesCount')}</p></div>
          </div>
          <h3>{text('browseJobs')}</h3>
          {jobs.length === 0 ? <p>{text('noJobs')}</p> : jobs.map((job) => (
            <div key={job._id} style={cardStyle}>
              <h3 style={{ margin: '0 0 6px' }}>{job.title} — {job.company}</h3>
              <p style={{ margin: '0 0 6px', color: '#64748b' }}>{job.category} | {job.locationType} | ${job.salaryMin}–${job.salaryMax}</p>
              <p style={{ margin: '0 0 10px' }}>{job.description}</p>
              <p style={{ margin: '0 0 10px', color: '#1d4ed8', fontWeight: 600 }}>{text('matchScore')}: {job.matchScore}%</p>
              {(job.questions || []).map((q, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <label style={labelStyle}>{q}</label>
                  <input
                    placeholder={text('answerQuestion')}
                    style={inputStyle}
                    value={questionAnswers[job._id]?.[i] || ''}
                    onChange={(e) => setQuestionAnswers((prev) => ({ ...prev, [job._id]: { ...prev[job._id], [i]: e.target.value } }))}
                  />
                </div>
              ))}
              <label style={labelStyle}>{text('coverLetter')}</label>
              <textarea
                placeholder={text('coverLetter')}
                style={textareaStyle}
                value={coverLetters[job._id] || ''}
                onChange={(e) => setCoverLetters((prev) => ({ ...prev, [job._id]: e.target.value }))}
              />
              <button onClick={() => handleApply(job)} style={primaryButtonStyle}>{text('apply')}</button>
            </div>
          ))}
          {applyMessage && <p style={{ color: applyMessage.includes('success') ? 'green' : 'red' }}>{applyMessage}</p>}
        </div>
      )}

      {/* BROWSE JOBS */}
      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'jobs' && (
        <div style={contentContainerStyle}>
          <h2>{text('browseJobs')}</h2>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <h3 style={{ marginTop: 0 }}>{text('filters')}</h3>
            <input name="keyword" value={filters.keyword} onChange={handleFilterChange} placeholder={text('keywordPlaceholder')} style={inputStyle} />
            <input name="skill" value={filters.skill} onChange={handleFilterChange} placeholder={text('skill')} style={inputStyle} />
            <input name="category" value={filters.category} onChange={handleFilterChange} placeholder={text('category')} style={inputStyle} />
            <select name="locationType" value={filters.locationType} onChange={handleFilterChange} style={inputStyle}>
              <option value="">{text('allLocations')}</option>
              <option value="remote">{text('remote')}</option>
              <option value="onsite">{text('onsite')}</option>
              <option value="hybrid">{text('hybrid')}</option>
            </select>
            <input name="salaryMin" type="number" value={filters.salaryMin} onChange={handleFilterChange} placeholder={text('minimumSalary')} style={inputStyle} />
            <button onClick={loadJobs} style={primaryButtonStyle}>{text('applyFilters')}</button>
          </div>
          {jobs.length === 0 ? <p>{text('noJobs')}</p> : jobs.map((job) => (
            <div key={job._id} style={cardStyle}>
              <h3 style={{ margin: '0 0 6px' }}>{job.title} — {job.company}</h3>
              <p style={{ margin: '0 0 6px', color: '#64748b' }}>{job.category} | {job.locationType} | ${job.salaryMin}–${job.salaryMax}</p>
              <p style={{ margin: '0 0 10px' }}>{job.description}</p>
              <p style={{ margin: '0 0 6px' }}><strong>{text('requiredSkills')}:</strong> {(job.requiredSkills || []).join(', ')}</p>
              <p style={{ margin: '0 0 10px', color: '#1d4ed8', fontWeight: 600 }}>{text('matchScore')}: {job.matchScore}%</p>
              {(job.questions || []).map((q, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <label style={labelStyle}>{q}</label>
                  <input
                    placeholder={text('answerQuestion')}
                    style={inputStyle}
                    value={questionAnswers[job._id]?.[i] || ''}
                    onChange={(e) => setQuestionAnswers((prev) => ({ ...prev, [job._id]: { ...prev[job._id], [i]: e.target.value } }))}
                  />
                </div>
              ))}
              <label style={labelStyle}>{text('coverLetter')}</label>
              <textarea
                placeholder={text('coverLetter')}
                style={textareaStyle}
                value={coverLetters[job._id] || ''}
                onChange={(e) => setCoverLetters((prev) => ({ ...prev, [job._id]: e.target.value }))}
              />
              <button onClick={() => handleApply(job)} style={primaryButtonStyle}>{text('apply')}</button>
            </div>
          ))}
          {applyMessage && <p style={{ color: applyMessage.includes('success') ? 'green' : 'red' }}>{applyMessage}</p>}
        </div>
      )}

      {/* MY APPLICATIONS */}
      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'applications' && (
        <div style={contentContainerStyle}>
          <h2>{text('applications')}</h2>
          {applications.length === 0 ? <p>{text('noApplications')}</p> : applications.map((app) => (
            <div key={app._id} style={cardStyle}>
              <h3 style={{ margin: '0 0 6px' }}>{app.jobTitle}</h3>
              <p style={{ margin: '0 0 8px' }}><span style={getStatusBadgeStyle(app.status)}>{app.status}</span></p>
              <p style={{ margin: '0 0 6px', color: '#64748b' }}>{text('applied')}: {new Date(app.appliedAt).toLocaleDateString()}</p>
              {app.interviewDate && (
                <p style={{ margin: '0 0 6px', color: '#6d28d9', fontWeight: 600 }}>
                  {text('interviewDate')}: {app.interviewDate}
                  {app.interviewType === 'online' && app.interviewLink && <> — <a href={app.interviewLink} target="_blank" rel="noreferrer">{text('meetingLink')}</a></>}
                  {app.interviewType === 'physical' && app.interviewLocation && <> — {app.interviewLocation}</>}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TRAINING */}
      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'training' && (
        <div style={contentContainerStyle}>
          <h2>{text('training')}</h2>
          {modules.length === 0 ? <p>{text('noModules')}</p> : modules.map((mod) => (
            <div key={mod._id} style={cardStyle}>
              <h3 style={{ margin: '0 0 6px' }}>{mod.title}</h3>
              <p style={{ margin: '0 0 6px' }}>{mod.description}</p>
              <p style={{ margin: '0 0 10px', color: '#64748b' }}>Duration: {mod.duration}</p>
              {completedModuleIds.has(String(mod._id))
                ? <span style={{ ...getStatusBadgeStyle('Accepted') }}>{text('completed')}</span>
                : <button onClick={() => markModuleComplete(mod._id)} style={primaryButtonStyle}>{text('completeModule')}</button>
              }
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATES */}
      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'certificates' && (
        <div style={contentContainerStyle}>
          <h2>{text('certificates')}</h2>
          {certificates.length === 0 ? <p>{text('noCertificates')}</p> : certificates.map((cert) => (
            <div key={cert._id} style={cardStyle}>
              <h3 style={{ margin: '0 0 6px' }}>🏆 {cert.moduleTitle}</h3>
              <p style={{ margin: 0, color: '#64748b' }}>{text('issuedAt')}: {new Date(cert.issuedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* NOTIFICATIONS */}
      {isLoggedIn && activeTab === 'notifications' && (
        <div style={contentContainerStyle}>
          <h2>{text('notifications')}</h2>
          {notifications.length === 0 ? <p>{text('noNotifications')}</p> : notifications.map((n) => (
            <div key={n._id} style={{ ...cardStyle, opacity: n.isRead ? 0.6 : 1, borderLeft: n.isRead ? '4px solid #e2e8f0' : '4px solid #1e3a8a' }}>
              <h4 style={{ margin: '0 0 4px' }}>{n.title}</h4>
              <p style={{ margin: '0 0 8px' }}>{n.message}</p>
              <p style={{ margin: '0 0 8px', color: '#94a3b8', fontSize: 13 }}>{new Date(n.createdAt).toLocaleString()}</p>
              {!n.isRead && <button onClick={() => markNotificationRead(n._id)} style={smallButtonStyle}>{text('markRead')}</button>}
            </div>
          ))}
        </div>
      )}

      {/* HELP */}
      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'help' && (
        <div style={centerContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('help')}</h2>
            <p>{text('helpIntro')}</p>
            <h4>{text('faq1')}</h4><p>{text('faq1a')}</p>
            <h4>{text('faq2')}</h4><p>{text('faq2a')}</p>
            <h4>{text('faq3')}</h4><p>{text('faq3a')}</p>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {isLoggedIn && activeTab === 'profile' && (
        <div style={centerContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('profile')}</h2>
            <form onSubmit={updateProfile}>
              <label style={labelStyle}>{text('fullName')}</label>
              <input name="name" value={profileForm.name} onChange={handleProfileChange} style={inputStyle} />
              <label style={labelStyle}>{text('phone')}</label>
              <input name="phone" value={profileForm.phone} onChange={handleProfileChange} style={inputStyle} />
              {currentUser.role === 'jobSeeker' && (
                <>
                  <label style={labelStyle}>{text('skills')}</label>
                  <input name="skills" value={profileForm.skills} onChange={handleProfileChange} style={inputStyle} />
                  <label style={labelStyle}>{text('workHistory')}</label>
                  <textarea name="workHistory" value={profileForm.workHistory} onChange={handleProfileChange} style={textareaStyle} />
                  <label style={labelStyle}>{text('resume')}</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setProfileResume(e.target.files[0])} style={inputStyle} />
                  {currentUser.resume && (
                    <p><a href={`${API}/uploads/${currentUser.resume}`} target="_blank" rel="noreferrer">{text('viewResume')}</a></p>
                  )}
                </>
              )}
              {currentUser.role === 'employer' && (
                <>
                  <label style={labelStyle}>{text('companyWebsite')}</label>
                  <input name="companyWebsite" value={profileForm.companyWebsite} onChange={handleProfileChange} style={inputStyle} />
                  <p>
                    {currentUser.isVerified
                      ? <span style={getStatusBadgeStyle('Accepted')}>✅ {text('verified')}</span>
                      : <><span style={getStatusBadgeStyle('Pending')}>{text('pendingVerification')}</span> <button type="button" onClick={requestVerification} style={{ ...smallButtonStyle, marginLeft: 10 }}>{text('verifyCompany')}</button></>
                    }
                  </p>
                </>
              )}
              <label style={labelStyle}>{text('preferredLanguage')}</label>
              <select name="preferredLanguage" value={profileForm.preferredLanguage} onChange={handleProfileChange} style={inputStyle}>
                <option value="en">{text('english')}</option>
                <option value="so">{text('somali')}</option>
              </select>
              <button type="submit" style={primaryButtonStyle}>{text('saveProfile')}</button>
            </form>
            {profileMessage && <p style={{ color: 'green' }}>{profileMessage}</p>}
            {profileError && <p style={{ color: 'red' }}>{profileError}</p>}
          </div>
        </div>
      )}

      {/* EMPLOYER DASHBOARD */}
      {isLoggedIn && currentUser?.role === 'employer' && activeTab === 'dashboard' && (
        <div style={contentContainerStyle}>
          <h2>{text('employerDashboard')}</h2>
          <div style={statsGridStyle}>
            <div style={statCardStyle}><p style={statNumberStyle}>{dashboardData?.totalJobs ?? 0}</p><p>{text('totalJobs')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{dashboardData?.totalApplications ?? 0}</p><p>{text('totalApplications')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{dashboardData?.shortlisted ?? 0}</p><p>{text('shortlisted')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{dashboardData?.interviews ?? 0}</p><p>{text('interviews')}</p></div>
          </div>
          <h3>Applicants</h3>
          {employerApplications.length === 0 ? <p>{text('noApplications')}</p> : employerApplications.map((app) => (
            <div key={app._id} style={professionalApplicantCardStyle}>
              <div style={applicantTopRowStyle}>
                <div>
                  <h3 style={{ margin: '0 0 4px' }}>{app.name}</h3>
                  <p style={{ margin: '0 0 4px', color: '#64748b' }}>{app.email}</p>
                  <p style={{ margin: '0 0 4px', color: '#64748b' }}>Applied for: <strong>{app.jobTitle}</strong></p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>{new Date(app.appliedAt).toLocaleDateString()}</p>
                </div>
                <span style={getStatusBadgeStyle(app.status)}>{app.status}</span>
              </div>
              {(app.skills || []).length > 0 && <p style={{ margin: '0 0 8px' }}><strong>{text('skills')}:</strong> {app.skills.join(', ')}</p>}
              {app.resume && <p style={{ margin: '0 0 8px' }}><a href={`${API}/uploads/${app.resume}`} target="_blank" rel="noreferrer">{text('viewResume')}</a></p>}
              {(app.answers || []).length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <strong>{text('answers')}:</strong>
                  {app.answers.map((a, i) => (
                    <div key={i} style={{ marginTop: 6, padding: 10, background: '#f8fafc', borderRadius: 8 }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 600 }}>{a.question}</p>
                      <p style={{ margin: 0 }}>{a.answer}</p>
                    </div>
                  ))}
                </div>
              )}
              <div style={actionRowStyle}>
                <button onClick={() => updateApplicationStatus(app._id, 'Shortlisted')} style={secondaryButtonStyle}>{text('shortlist')}</button>
                <button onClick={() => updateApplicationStatus(app._id, 'Accepted')} style={successButtonStyle}>{text('accept')}</button>
                <button onClick={() => updateApplicationStatus(app._id, 'Rejected')} style={dangerButtonStyle}>{text('reject')}</button>
              </div>
              {(app.status === 'Accepted' || app.status === 'Interview Scheduled') && (
                <div style={interviewBoxStyle}>
                  <h4 style={{ margin: '0 0 10px' }}>{text('scheduleInterview')}</h4>
                  <label style={labelStyle}>{text('interviewType')}</label>
                  <select style={inputStyle} value={interviewTypes[app._id] || ''} onChange={(e) => setInterviewTypes((p) => ({ ...p, [app._id]: e.target.value }))}>
                    <option value="">{text('interviewType')}</option>
                    <option value="online">{text('online')}</option>
                    <option value="physical">{text('physical')}</option>
                  </select>
                  <label style={labelStyle}>{text('interviewDate')}</label>
                  <input type="datetime-local" style={inputStyle} value={interviewDates[app._id] || ''} onChange={(e) => setInterviewDates((p) => ({ ...p, [app._id]: e.target.value }))} />
                  {interviewTypes[app._id] === 'online' && (
                    <><label style={labelStyle}>{text('meetingLink')}</label>
                    <input style={inputStyle} placeholder="https://zoom.us/..." value={interviewLinks[app._id] || ''} onChange={(e) => setInterviewLinks((p) => ({ ...p, [app._id]: e.target.value }))} /></>
                  )}
                  {interviewTypes[app._id] === 'physical' && (
                    <><label style={labelStyle}>{text('meetingLocation')}</label>
                    <input style={inputStyle} placeholder="Office address..." value={interviewLocations[app._id] || ''} onChange={(e) => setInterviewLocations((p) => ({ ...p, [app._id]: e.target.value }))} /></>
                  )}
                  <label style={labelStyle}>{text('interviewNotes')}</label>
                  <textarea style={textareaStyle} value={interviewNotes[app._id] || ''} onChange={(e) => setInterviewNotes((p) => ({ ...p, [app._id]: e.target.value }))} />
                  <button onClick={() => scheduleInterview(app._id)} style={primaryButtonStyle}>{text('scheduleInterview')}</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* POST JOB */}
      {isLoggedIn && currentUser?.role === 'employer' && activeTab === 'employer' && (
        <div style={centerContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('postJob')}</h2>
            <form onSubmit={handlePostJob}>
              <label style={labelStyle}>{text('title')}</label>
              <input name="title" style={inputStyle} required />
              <label style={labelStyle}>{text('category')}</label>
              <input name="category" style={inputStyle} />
              <label style={labelStyle}>{text('requiredSkills')}</label>
              <input name="requiredSkills" style={inputStyle} />
              <label style={labelStyle}>{text('minSalary')}</label>
              <input name="salaryMin" type="number" style={inputStyle} />
              <label style={labelStyle}>{text('maxSalary')}</label>
              <input name="salaryMax" type="number" style={inputStyle} />
              <label style={labelStyle}>{text('locationType')}</label>
              <select name="locationType" style={inputStyle}>
                <option value="remote">{text('remote')}</option>
                <option value="onsite">{text('onsite')}</option>
                <option value="hybrid">{text('hybrid')}</option>
              </select>
              <label style={labelStyle}>{text('description')}</label>
              <textarea name="description" style={textareaStyle} />
              <label style={labelStyle}>{text('screeningQuestions')}</label>
              <textarea name="questions" placeholder={text('screeningPlaceholder')} style={textareaStyle} />
              <button type="submit" style={primaryButtonStyle}>{text('postJob')}</button>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD */}
      {isLoggedIn && currentUser?.role === 'admin' && activeTab === 'dashboard' && (
        <div style={contentContainerStyle}>
          <h2>{text('adminDashboard')}</h2>
          <div style={statsGridStyle}>
            <div style={statCardStyle}><p style={statNumberStyle}>{adminStats?.totalUsers ?? 0}</p><p>{text('totalUsers')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{adminStats?.totalJobSeekers ?? 0}</p><p>{text('totalJobSeekers')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{adminStats?.totalEmployers ?? 0}</p><p>{text('totalEmployers')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{adminStats?.totalJobs ?? 0}</p><p>{text('totalJobs')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{adminStats?.totalApplications ?? 0}</p><p>{text('totalApplications')}</p></div>
            <div style={statCardStyle}><p style={statNumberStyle}>{adminStats?.totalCertificates ?? 0}</p><p>{text('totalCertificates')}</p></div>
          </div>
        </div>
      )}

      {/* ADMIN USERS */}
      {isLoggedIn && currentUser?.role === 'admin' && activeTab === 'users' && (
        <div style={contentContainerStyle}>
          <h2>{text('users')}</h2>
          {adminUsers.map((u) => (
            <div key={u._id} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ margin: '0 0 4px' }}>{u.name}</h3>
                  <p style={{ margin: '0 0 4px', color: '#64748b' }}>{u.email} — {u.role}</p>
                  {u.isVerified && <span style={getStatusBadgeStyle('Accepted')}>✅ {text('verified')}</span>}
                  {u.suspended && <span style={{ ...getStatusBadgeStyle('Rejected'), marginLeft: 8 }}>Suspended</span>}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {u.role === 'employer' && !u.isVerified && (
                    <button onClick={() => adminVerifyEmployer(u.email)} style={successButtonStyle}>{text('verifyEmployer')}</button>
                  )}
                  <button onClick={() => adminToggleSuspend(u._id, u.suspended)} style={u.suspended ? successButtonStyle : dangerButtonStyle}>
                    {u.suspended ? text('activateUser') : text('suspendUser')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default App;