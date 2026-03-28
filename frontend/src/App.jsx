import { useEffect, useMemo, useState } from 'react';

const API = 'http://localhost:5000/api';

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
    dashboard: 'Dashboard',
    jobSeekerDashboard: 'Job Seeker Dashboard',
    employerDashboard: 'Employer Dashboard',
    browseJobs: 'Browse Jobs',
    training: 'Training Modules',
    applications: 'My Applications',
    profile: 'Profile',
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
    photo: 'Photo',
    companyLogo: 'Company Logo',
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
    apply: 'Apply',
    coverLetter: 'Optional Cover Letter',
    completeModule: 'Complete Module',
    completed: 'Completed - Certificate Issued',
    verifyCompany: 'Verify Company',
    notVerified: 'Your company is not verified yet.',
    noJobs: 'No jobs available right now.',
    noApplications: 'No applications yet.',
    noModules: 'No training modules available yet.',
    filters: 'Filters',
    applyFilters: 'Apply Filters',
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
    availableJobs: 'Available Jobs',
    companyOverview: 'Company Overview',
    manageApplicants: 'Manage Applicants',
    trainingDesc: 'Build the skills needed for remote work and improve your employability.',
    jobsDesc: 'Browse open roles, review requirements, and apply for opportunities that match your skills.',
    applicationsDesc: 'Track your submitted applications and interview updates.',
    employerDesc: 'Post jobs, manage applicants, and schedule interviews.',
    saveSuccess: 'Profile updated successfully.',
    loginWelcomeSeeker: 'Find jobs, complete training, and track your applications.',
    loginWelcomeEmployer: 'Post opportunities and manage applicants professionally.',
    candidateAccepted: 'Candidate accepted. You can now schedule an interview.',
    candidateRejected: 'This application has been rejected.',
    interviewScheduled: 'Interview scheduled successfully.'
  },
  so: {
    appName: 'SomTalent',
    tagline: 'Isku xirka hibada Somaliland iyo shaqooyinka fog ee caalamka',
    joinLogin: 'Isdiiwaangeli / Gal',
    login: 'Gal',
    signUp: 'Isdiiwaangeli',
    createAccount: 'Samee Akoon',
    asJobSeeker: 'Sida Shaqo-doon',
    asEmployer: 'Sida Loo-shaqeeye',
    dashboard: 'Dashboard',
    jobSeekerDashboard: 'Dashboard-ka Shaqo-doonka',
    employerDashboard: 'Dashboard-ka Loo-shaqeeyaha',
    browseJobs: 'Raadi Shaqooyin',
    training: 'Kooxo Tababar',
    applications: 'Codsiyadayda',
    profile: 'Xogtayda',
    logout: 'Ka bax',
    welcome: 'Ku soo dhawoow',
    fullName: 'Magaca oo Buuxa',
    companyName: 'Magaca Shirkadda',
    email: 'Iimayl',
    phone: 'Lambarka Taleefanka',
    password: 'Furaha Sirta',
    skills: 'Xirfadaha (comma kala saar)',
    workHistory: 'Khibradda Shaqo',
    companyWebsite: 'Website-ka Shirkadda',
    preferredLanguage: 'Luqadda La Doorbiday',
    english: 'Ingiriis',
    somali: 'Soomaali',
    resume: 'CV',
    photo: 'Sawir',
    companyLogo: 'Astaanta Shirkadda',
    saveProfile: 'Kaydi Xogta',
    postJob: 'Ku dhaji Shaqo',
    title: 'Magaca Shaqada',
    category: 'Qaybta',
    requiredSkills: 'Xirfadaha Loo Baahan Yahay',
    minSalary: 'Mushaharka Ugu Yar',
    maxSalary: 'Mushaharka Ugu Badan',
    locationType: 'Nooca Goobta',
    remote: 'Fog',
    onsite: 'Goobta',
    hybrid: 'Isku-dhafan',
    description: 'Sharaxaad',
    apply: 'Codso',
    coverLetter: 'Warqad Codsi Ikhtiyaari ah',
    completeModule: 'Dhammaystir Casharka',
    completed: 'Waa la dhammaystiray - Shahaado waa la bixiyey',
    verifyCompany: 'Xaqiiji Shirkadda',
    notVerified: 'Shirkaddaadu wali lama xaqiijin.',
    noJobs: 'Shaqooyin lama helin hadda.',
    noApplications: 'Wali codsiyo ma jiraan.',
    noModules: 'Wali casharro ma jiraan.',
    filters: 'Shaandheyn',
    applyFilters: 'Mari Shaandheynta',
    skill: 'Xirfad',
    allLocations: 'Dhammaan Goobaha',
    minimumSalary: 'Mushaharka Ugu Yar',
    matchScore: 'Heerka Isku Eegga',
    status: 'Xaalad',
    applied: 'La Codsaday',
    interviewDate: 'Taariikhda Wareysiga',
    shortlist: 'Liiska Gaaban',
    accept: 'Aqbal',
    reject: 'Diid',
    scheduleInterview: 'Qorshee Wareysi',
    totalJobs: 'Wadarta Shaqooyinka',
    totalApplications: 'Wadarta Codsiyada',
    shortlisted: 'Liiska Gaaban',
    interviews: 'Wareysiyada',
    accepted: 'La Aqbalay',
    pending: 'Sugaya',
    completedCourses: 'Casharrada La Dhammaystiray',
    availableJobs: 'Shaqooyinka La Heli Karo',
    companyOverview: 'Guudmarka Shirkadda',
    manageApplicants: 'Maamul Codsadayaasha',
    trainingDesc: 'Baro xirfadaha loo baahan yahay si aad ugu shaqeyso meel fog.',
    jobsDesc: 'Raadi shaqooyinka furan, eeg shuruudaha, kuna codso kuwa ku habboon xirfadahaaga.',
    applicationsDesc: 'La soco codsiyadaada iyo wararka wareysiga.',
    employerDesc: 'Ku dhaji shaqooyin, maamul codsadayaasha, oo qorshee wareysiyo.',
    saveSuccess: 'Xogta si guul leh ayaa loo cusboonaysiiyey.',
    loginWelcomeSeeker: 'Raadi shaqooyin, dhammayso tababarka, oo la soco codsiyadaada.',
    loginWelcomeEmployer: 'Ku dhaji fursado shaqo oo si xirfad leh u maamul codsadayaasha.',
    candidateAccepted: 'Codsadahan waa la aqbalay. Hadda waxaad qorshayn kartaa wareysi.',
    candidateRejected: 'Codsigan waa la diiday.',
    interviewScheduled: 'Wareysiga si guul leh ayaa loo qorsheeyey.'
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('join');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [signupRole, setSignupRole] = useState('jobSeeker');
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    skills: '',
    workHistory: '',
    companyWebsite: '',
    preferredLanguage: 'en'
  });
  const [signupResume, setSignupResume] = useState(null);
  const [signupPhoto, setSignupPhoto] = useState(null);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const [signupError, setSignupError] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [employerApplications, setEmployerApplications] = useState([]);
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  const [applyMessage, setApplyMessage] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');

  const [filters, setFilters] = useState({
    skill: '',
    category: '',
    locationType: '',
    salaryMin: ''
  });

  const [coverLetters, setCoverLetters] = useState({});
  const [interviewDates, setInterviewDates] = useState({});

  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    skills: '',
    workHistory: '',
    companyWebsite: '',
    preferredLanguage: 'en'
  });
  const [profileResume, setProfileResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const lang = currentUser?.preferredLanguage || signupData.preferredLanguage || 'en';
  const t = translations[lang];

  const completedModuleIds = useMemo(
    () => new Set(progress.filter((item) => item.completed).map((item) => item.moduleId)),
    [progress]
  );

  const fetchJSON = async (url, options = {}) => {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      setIsLoggedIn(true);
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

    if (activeTab === 'dashboard') loadDashboard();

    if (currentUser.role === 'jobSeeker') {
      if (activeTab === 'jobs') loadJobs();
      if (activeTab === 'applications') loadApplications();
      if (activeTab === 'training') {
        loadModules();
        loadProgress();
      }
      if (activeTab === 'dashboard') {
        loadJobs();
        loadApplications();
        loadModules();
        loadProgress();
      }
    }

    if (currentUser.role === 'employer') {
      if (activeTab === 'dashboard' || activeTab === 'employer') {
        loadDashboard();
        loadEmployerApplications();
      }
    }
  }, [activeTab, isLoggedIn, currentUser]);

  const loadJobs = async () => {
    try {
      let url = `${API}/jobs`;
      const params = new URLSearchParams();

      if (currentUser?.email) params.append('userEmail', currentUser.email);
      if (filters.skill) params.append('skill', filters.skill);
      if (filters.category) params.append('category', filters.category);
      if (filters.locationType) params.append('locationType', filters.locationType);
      if (filters.salaryMin) params.append('salaryMin', filters.salaryMin);

      if ([...params.keys()].length > 0) {
        url += `?${params.toString()}`;
      }

      const data = await fetchJSON(url);
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setJobs([]);
    }
  };

  const loadApplications = async () => {
    try {
      const data = await fetchJSON(`${API}/my-applications?email=${currentUser.email}`);
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setApplications([]);
    }
  };

  const loadEmployerApplications = async () => {
    try {
      const data = await fetchJSON(`${API}/applications/employer/${currentUser.email}`);
      setEmployerApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setEmployerApplications([]);
    }
  };

  const loadModules = async () => {
    try {
      const data = await fetchJSON(`${API}/training-modules`);
      setModules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setModules([]);
    }
  };

  const loadProgress = async () => {
    try {
      const data = await fetchJSON(`${API}/training-progress/${currentUser.email}`);
      setProgress(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setProgress([]);
    }
  };

  const loadDashboard = async () => {
    try {
      const url =
        currentUser.role === 'employer'
          ? `${API}/dashboard/employer/${currentUser.email}`
          : `${API}/dashboard/jobseeker/${currentUser.email}`;

      const data = await fetchJSON(url);
      setDashboardData(data);
    } catch (error) {
      console.error(error);
      setDashboardData(null);
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
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
      if (signupPhoto) formData.append('photo', signupPhoto);

      await fetchJSON(`${API}/signup`, {
        method: 'POST',
        body: formData
      });

      setSignupMessage(lang === 'so' ? 'Isdiiwaangelin guul leh.' : 'Signed up successfully.');
      setSignupData({
        name: '',
        email: '',
        phone: '',
        password: '',
        skills: '',
        workHistory: '',
        companyWebsite: '',
        preferredLanguage: signupData.preferredLanguage
      });
      setSignupResume(null);
      setSignupPhoto(null);
    } catch (error) {
      setSignupError(error.message);
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const data = await fetchJSON(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      setCurrentUser(data.user);
      setIsLoggedIn(true);
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
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveTab('join');
    setJobs([]);
    setApplications([]);
    setEmployerApplications([]);
    setModules([]);
    setProgress([]);
    setDashboardData(null);
    setApplyMessage('');
  };

  const handleApply = async (jobId) => {
    setApplyMessage('');
    try {
      await fetchJSON(`${API}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          applicantEmail: currentUser.email,
          coverLetter: coverLetters[jobId] || ''
        })
      });

      setApplyMessage(lang === 'so' ? 'Codsiga waa la diray.' : 'Application submitted successfully.');
      loadApplications();
    } catch (error) {
      setApplyMessage(error.message);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      await fetchJSON(`${API}/jobs`, {
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
          employerEmail: currentUser.email
        })
      });

      form.reset();
      alert(lang === 'so' ? 'Shaqada waa la dhajiyey.' : 'Job posted successfully.');
      loadDashboard();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await fetchJSON(`${API}/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      await loadEmployerApplications();
      await loadDashboard();
    } catch (error) {
      alert(error.message);
    }
  };

  const scheduleInterview = async (id) => {
    try {
      await fetchJSON(`${API}/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Interview Scheduled',
          interviewDate: interviewDates[id] || ''
        })
      });

      await loadEmployerApplications();
      await loadDashboard();
    } catch (error) {
      alert(error.message);
    }
  };

  const markModuleComplete = async (moduleId) => {
    try {
      await fetchJSON(`${API}/training-progress/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: currentUser.email,
          moduleId
        })
      });
      loadProgress();
      loadDashboard();
      alert(lang === 'so' ? 'Casharka waa la dhammaystiray.' : 'Module completed.');
    } catch (error) {
      alert(error.message);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setProfileMessage('');
    setProfileError('');

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

      if (profilePhoto) formData.append('photo', profilePhoto);

      const updatedUser = await fetchJSON(`${API}/profile/${currentUser.email}`, {
        method: 'PUT',
        body: formData
      });

      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setProfileMessage(translations[updatedUser.preferredLanguage || 'en'].saveSuccess);
      setProfileResume(null);
      setProfilePhoto(null);
    } catch (error) {
      setProfileError(error.message);
    }
  };

  const verifyEmployer = async () => {
    try {
      const data = await fetchJSON(`${API}/employers/${currentUser.email}/verify`, {
        method: 'PUT'
      });
      setCurrentUser(data.employer);
      localStorage.setItem('currentUser', JSON.stringify(data.employer));
      alert(lang === 'so' ? 'Shirkadda waa la xaqiijiyey.' : 'Company verified.');
    } catch (error) {
      alert(error.message);
    }
  };

  const getStatusBadgeStyle = (status) => {
    let bg = '#e2e8f0';
    let color = '#1e293b';

    if (status === 'Pending') {
      bg = '#fef3c7';
      color = '#92400e';
    } else if (status === 'Shortlisted') {
      bg = '#dbeafe';
      color = '#1d4ed8';
    } else if (status === 'Accepted') {
      bg = '#dcfce7';
      color = '#166534';
    } else if (status === 'Rejected') {
      bg = '#fee2e2';
      color = '#991b1b';
    } else if (status === 'Interview Scheduled') {
      bg = '#ede9fe';
      color = '#6d28d9';
    }

    return {
      background: bg,
      color,
      padding: '8px 12px',
      borderRadius: 999,
      fontWeight: 700,
      fontSize: '13px',
      whiteSpace: 'nowrap'
    };
  };

  const renderJobSeekerDashboard = () => (
    <div style={contentContainerStyle}>
      <h2 style={sectionTitleStyle}>{t.jobSeekerDashboard}</h2>

      {dashboardData && (
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <h4>{t.totalApplications}</h4>
            <p style={statNumberStyle}>{dashboardData.totalApplications ?? 0}</p>
          </div>
          <div style={statCardStyle}>
            <h4>{t.accepted}</h4>
            <p style={statNumberStyle}>{dashboardData.accepted ?? 0}</p>
          </div>
          <div style={statCardStyle}>
            <h4>{t.pending}</h4>
            <p style={statNumberStyle}>{dashboardData.pending ?? 0}</p>
          </div>
          <div style={statCardStyle}>
            <h4>{t.completedCourses}</h4>
            <p style={statNumberStyle}>{dashboardData.completedCourses ?? 0}</p>
          </div>
        </div>
      )}

      <div style={dashboardGridStyle}>
        <div style={cardStyle}>
          <h3>{t.availableJobs}</h3>
          <p>{t.jobsDesc}</p>
          <p><strong>{t.totalJobs}:</strong> {jobs.length}</p>
          <button onClick={() => setActiveTab('jobs')} style={primaryButtonStyle}>
            {t.browseJobs}
          </button>
        </div>

        <div style={cardStyle}>
          <h3>{t.training}</h3>
          <p>{t.trainingDesc}</p>
          <p><strong>{t.completedCourses}:</strong> {progress.filter((p) => p.completed).length}</p>
          <button onClick={() => setActiveTab('training')} style={primaryButtonStyle}>
            {t.training}
          </button>
        </div>

        <div style={cardStyle}>
          <h3>{t.applications}</h3>
          <p>{t.applicationsDesc}</p>
          <p><strong>{t.totalApplications}:</strong> {applications.length}</p>
          <button onClick={() => setActiveTab('applications')} style={primaryButtonStyle}>
            {t.applications}
          </button>
        </div>

        <div style={cardStyle}>
          <h3>{t.profile}</h3>
          <p>{t.loginWelcomeSeeker}</p>
          <button onClick={() => setActiveTab('profile')} style={primaryButtonStyle}>
            {t.profile}
          </button>
        </div>
      </div>
    </div>
  );

  const renderEmployerDashboard = () => (
    <div style={contentContainerStyle}>
      <h2 style={sectionTitleStyle}>{t.employerDashboard}</h2>

      {dashboardData && (
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <h4>{t.totalJobs}</h4>
            <p style={statNumberStyle}>{dashboardData.totalJobs ?? 0}</p>
          </div>
          <div style={statCardStyle}>
            <h4>{t.totalApplications}</h4>
            <p style={statNumberStyle}>{dashboardData.totalApplications ?? 0}</p>
          </div>
          <div style={statCardStyle}>
            <h4>{t.shortlisted}</h4>
            <p style={statNumberStyle}>{dashboardData.shortlisted ?? 0}</p>
          </div>
          <div style={statCardStyle}>
            <h4>{t.interviews}</h4>
            <p style={statNumberStyle}>{dashboardData.interviews ?? 0}</p>
          </div>
        </div>
      )}

      <div style={dashboardGridStyle}>
        <div style={cardStyle}>
          <h3>{t.companyOverview}</h3>
          <p>{t.employerDesc}</p>
          <p><strong>Verified:</strong> {currentUser?.isVerified ? 'Yes' : 'No'}</p>
          {!currentUser?.isVerified && (
            <button onClick={verifyEmployer} style={primaryButtonStyle}>
              {t.verifyCompany}
            </button>
          )}
        </div>

        <div style={cardStyle}>
          <h3>{t.postJob}</h3>
          <p>{lang === 'so' ? 'Ku dar shaqo cusub si aad u hesho codsadayaal.' : 'Create a new job opportunity for applicants.'}</p>
          <button onClick={() => setActiveTab('employer')} style={primaryButtonStyle}>
            {t.postJob}
          </button>
        </div>

        <div style={cardStyle}>
          <h3>{t.manageApplicants}</h3>
          <p>{lang === 'so' ? 'Eeg codsadayaasha oo maamul xaaladahooda.' : 'Review applicants and manage their status.'}</p>
          <p><strong>{t.totalApplications}:</strong> {employerApplications.length}</p>
          <button onClick={() => setActiveTab('employer')} style={primaryButtonStyle}>
            {t.manageApplicants}
          </button>
        </div>

        <div style={cardStyle}>
          <h3>{t.profile}</h3>
          <p>{t.loginWelcomeEmployer}</p>
          <button onClick={() => setActiveTab('profile')} style={primaryButtonStyle}>
            {t.profile}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '2.8rem' }}>{t.appName}</h1>
        <p style={{ marginTop: 10, fontSize: '1.1rem' }}>{t.tagline}</p>

        {isLoggedIn && currentUser && (
          <div style={{ marginTop: 14 }}>
            <span>{t.welcome}, {currentUser.name}</span>
            <button onClick={handleLogout} style={{ ...smallButtonStyle, marginLeft: 12 }}>
              {t.logout}
            </button>
          </div>
        )}
      </header>

      <div style={navStyle}>
        {!isLoggedIn && (
          <button onClick={() => setActiveTab('join')} style={navButtonStyle}>
            {t.joinLogin}
          </button>
        )}

        {isLoggedIn && currentUser?.role === 'jobSeeker' && (
          <>
            <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle}>{t.jobSeekerDashboard}</button>
            <button onClick={() => setActiveTab('jobs')} style={navButtonStyle}>{t.browseJobs}</button>
            <button onClick={() => setActiveTab('training')} style={navButtonStyle}>{t.training}</button>
            <button onClick={() => setActiveTab('applications')} style={navButtonStyle}>{t.applications}</button>
            <button onClick={() => setActiveTab('profile')} style={navButtonStyle}>{t.profile}</button>
          </>
        )}

        {isLoggedIn && currentUser?.role === 'employer' && (
          <>
            <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle}>{t.employerDashboard}</button>
            <button onClick={() => setActiveTab('employer')} style={navButtonStyle}>{t.manageApplicants}</button>
            <button onClick={() => setActiveTab('profile')} style={navButtonStyle}>{t.profile}</button>
          </>
        )}
      </div>

      {!isLoggedIn && activeTab === 'join' && (
        <div style={centerContainerStyle}>
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>{t.createAccount}</h2>

            <div style={{ marginBottom: 16 }}>
              <button
                onClick={() => setSignupRole('jobSeeker')}
                style={{
                  ...smallButtonStyle,
                  marginRight: 10,
                  background: signupRole === 'jobSeeker' ? '#1e3a8a' : '#e2e8f0',
                  color: signupRole === 'jobSeeker' ? 'white' : '#1e3a8a'
                }}
              >
                {t.asJobSeeker}
              </button>
              <button
                onClick={() => setSignupRole('employer')}
                style={{
                  ...smallButtonStyle,
                  background: signupRole === 'employer' ? '#1e3a8a' : '#e2e8f0',
                  color: signupRole === 'employer' ? 'white' : '#1e3a8a'
                }}
              >
                {t.asEmployer}
              </button>
            </div>

            <form onSubmit={handleSignup}>
              <input
                name="name"
                value={signupData.name}
                onChange={handleSignupChange}
                placeholder={signupRole === 'jobSeeker' ? t.fullName : t.companyName}
                required
                style={inputStyle}
              />
              <input
                name="email"
                type="email"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder={t.email}
                required
                style={inputStyle}
              />
              <input
                name="phone"
                value={signupData.phone}
                onChange={handleSignupChange}
                placeholder={t.phone}
                style={inputStyle}
              />
              <input
                name="password"
                type="password"
                value={signupData.password}
                onChange={handleSignupChange}
                placeholder={t.password}
                required
                style={inputStyle}
              />

              {signupRole === 'jobSeeker' && (
                <>
                  <input
                    name="skills"
                    value={signupData.skills}
                    onChange={handleSignupChange}
                    placeholder={t.skills}
                    style={inputStyle}
                  />
                  <textarea
                    name="workHistory"
                    value={signupData.workHistory}
                    onChange={handleSignupChange}
                    placeholder={t.workHistory}
                    style={textareaStyle}
                  />
                  <label style={labelStyle}>{t.resume} *</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setSignupResume(e.target.files[0])}
                    required
                    style={inputStyle}
                  />
                  <label style={labelStyle}>{t.photo}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSignupPhoto(e.target.files[0])}
                    style={inputStyle}
                  />
                </>
              )}

              {signupRole === 'employer' && (
                <>
                  <input
                    name="companyWebsite"
                    value={signupData.companyWebsite}
                    onChange={handleSignupChange}
                    placeholder={t.companyWebsite}
                    style={inputStyle}
                  />
                  <label style={labelStyle}>{t.companyLogo}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSignupPhoto(e.target.files[0])}
                    style={inputStyle}
                  />
                </>
              )}

              <select
                name="preferredLanguage"
                value={signupData.preferredLanguage}
                onChange={handleSignupChange}
                style={inputStyle}
              >
                <option value="en">{t.english}</option>
                <option value="so">{t.somali}</option>
              </select>

              <button type="submit" disabled={signupLoading} style={primaryButtonStyle}>
                {signupLoading ? '...' : t.signUp}
              </button>
            </form>

            {signupMessage && <p style={{ color: 'green' }}>{signupMessage}</p>}
            {signupError && <p style={{ color: 'red' }}>{signupError}</p>}

            <hr style={{ margin: '30px 0' }} />

            <h2 style={sectionTitleStyle}>{t.login}</h2>
            <form onSubmit={handleLogin}>
              <input
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder={t.email}
                required
                style={inputStyle}
              />
              <input
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder={t.password}
                required
                style={inputStyle}
              />
              <button type="submit" style={primaryButtonStyle}>
                {t.login}
              </button>
            </form>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          </div>
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'dashboard' && renderJobSeekerDashboard()}
      {isLoggedIn && currentUser?.role === 'employer' && activeTab === 'dashboard' && renderEmployerDashboard()}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'jobs' && (
        <div style={contentContainerStyle}>
          <h2 style={sectionTitleStyle}>{t.browseJobs}</h2>

          <div style={cardStyle}>
            <h3>{t.filters}</h3>
            <input name="skill" value={filters.skill} onChange={handleFilterChange} placeholder={t.skill} style={inputStyle} />
            <input name="category" value={filters.category} onChange={handleFilterChange} placeholder={t.category} style={inputStyle} />
            <select name="locationType" value={filters.locationType} onChange={handleFilterChange} style={inputStyle}>
              <option value="">{t.allLocations}</option>
              <option value="remote">{t.remote}</option>
              <option value="onsite">{t.onsite}</option>
              <option value="hybrid">{t.hybrid}</option>
            </select>
            <input
              name="salaryMin"
              type="number"
              value={filters.salaryMin}
              onChange={handleFilterChange}
              placeholder={t.minimumSalary}
              style={inputStyle}
            />
            <button onClick={loadJobs} style={primaryButtonStyle}>{t.applyFilters}</button>
          </div>

          {jobs.length === 0 ? (
            <div style={cardStyle}><p>{t.noJobs}</p></div>
          ) : (
            jobs.map((job) => (
              <div key={job._id} style={cardStyle}>
                <h3>{job.title}</h3>
                <p><strong>{t.companyName}:</strong> {job.company}</p>
                <p><strong>{t.category}:</strong> {job.category}</p>
                <p><strong>{t.requiredSkills}:</strong> {(job.requiredSkills || []).join(', ')}</p>
                <p><strong>{t.minSalary}:</strong> ${job.salaryMin} | <strong>{t.maxSalary}:</strong> ${job.salaryMax}</p>
                <p><strong>{t.locationType}:</strong> {job.locationType}</p>
                <p><strong>{t.description}:</strong> {job.description}</p>
                <p><strong>{t.matchScore}:</strong> {job.matchScore ?? 0}%</p>

                <textarea
                  placeholder={t.coverLetter}
                  value={coverLetters[job._id] || ''}
                  onChange={(e) => setCoverLetters((prev) => ({ ...prev, [job._id]: e.target.value }))}
                  style={textareaStyle}
                />

                <button onClick={() => handleApply(job._id)} style={primaryButtonStyle}>{t.apply}</button>
              </div>
            ))
          )}

          {applyMessage && <div style={cardStyle}><p>{applyMessage}</p></div>}
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'training' && (
        <div style={contentContainerStyle}>
          <h2 style={sectionTitleStyle}>{t.training}</h2>
          <p style={{ textAlign: 'center', color: '#475569', marginBottom: 24 }}>{t.trainingDesc}</p>

          {modules.length === 0 ? (
            <div style={cardStyle}><p>{t.noModules}</p></div>
          ) : (
            modules.map((module) => (
              <div key={module._id} style={cardStyle}>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <p><strong>Duration:</strong> {module.duration}</p>
                {completedModuleIds.has(module._id) ? (
                  <p style={{ color: 'green', fontWeight: 'bold' }}>{t.completed}</p>
                ) : (
                  <button onClick={() => markModuleComplete(module._id)} style={primaryButtonStyle}>
                    {t.completeModule}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'applications' && (
        <div style={contentContainerStyle}>
          <h2 style={sectionTitleStyle}>{t.applications}</h2>
          {applications.length === 0 ? (
            <div style={cardStyle}><p>{t.noApplications}</p></div>
          ) : (
            applications.map((application) => (
              <div key={application._id} style={cardStyle}>
                <h3>{application.jobTitle}</h3>
                <p><strong>{t.status}:</strong> {application.status}</p>
                <p><strong>{t.applied}:</strong> {new Date(application.appliedAt).toLocaleString()}</p>
                {application.interviewDate && <p><strong>{t.interviewDate}:</strong> {application.interviewDate}</p>}
              </div>
            ))
          )}
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'employer' && activeTab === 'employer' && (
        <div style={contentContainerStyle}>
          <h2 style={sectionTitleStyle}>{t.employerDashboard}</h2>

          <div style={cardStyle}>
            <h3>{t.postJob}</h3>
            <form onSubmit={handlePostJob}>
              <input name="title" placeholder={t.title} required style={inputStyle} />
              <input name="category" placeholder={t.category} required style={inputStyle} />
              <input name="requiredSkills" placeholder={t.requiredSkills} style={inputStyle} />
              <input name="salaryMin" type="number" placeholder={t.minSalary} style={inputStyle} />
              <input name="salaryMax" type="number" placeholder={t.maxSalary} style={inputStyle} />
              <select name="locationType" defaultValue="remote" style={inputStyle}>
                <option value="remote">{t.remote}</option>
                <option value="onsite">{t.onsite}</option>
                <option value="hybrid">{t.hybrid}</option>
              </select>
              <textarea name="description" placeholder={t.description} style={textareaStyle} />
              <button type="submit" style={primaryButtonStyle}>{t.postJob}</button>
            </form>
          </div>

          <h3 style={sectionTitleStyle}>{t.manageApplicants}</h3>

          {employerApplications.length === 0 ? (
            <div style={cardStyle}><p>{t.noApplications}</p></div>
          ) : (
            employerApplications.map((application) => {
              const isPending = application.status === 'Pending';
              const isShortlisted = application.status === 'Shortlisted';
              const isAccepted = application.status === 'Accepted';
              const isRejected = application.status === 'Rejected';
              const isInterviewScheduled = application.status === 'Interview Scheduled';

              return (
                <div key={application._id} style={professionalApplicantCardStyle}>
                  <div style={applicantTopRowStyle}>
                    <div>
                      <h3 style={{ margin: 0 }}>{application.jobTitle}</h3>
                      <p style={{ margin: '8px 0 0' }}><strong>Applicant:</strong> {application.name}</p>
                      <p style={{ margin: '4px 0 0' }}><strong>{t.email}:</strong> {application.email}</p>
                    </div>

                    <div style={getStatusBadgeStyle(application.status)}>
                      {application.status}
                    </div>
                  </div>

                  <div style={metaRowStyle}>
                    <span><strong>{t.applied}:</strong> {new Date(application.appliedAt).toLocaleString()}</span>
                    {application.interviewDate && (
                      <span><strong>{t.interviewDate}:</strong> {application.interviewDate}</span>
                    )}
                  </div>

                  {isPending && (
                    <div style={actionRowStyle}>
                      <button
                        onClick={() => updateApplicationStatus(application._id, 'Shortlisted')}
                        style={secondaryButtonStyle}
                      >
                        {t.shortlist}
                      </button>

                      <button
                        onClick={() => updateApplicationStatus(application._id, 'Accepted')}
                        style={successButtonStyle}
                      >
                        {t.accept}
                      </button>

                      <button
                        onClick={() => updateApplicationStatus(application._id, 'Rejected')}
                        style={dangerButtonStyle}
                      >
                        {t.reject}
                      </button>
                    </div>
                  )}

                  {isShortlisted && (
                    <>
                      <div style={actionRowStyle}>
                        <button
                          onClick={() => updateApplicationStatus(application._id, 'Accepted')}
                          style={successButtonStyle}
                        >
                          {t.accept}
                        </button>

                        <button
                          onClick={() => updateApplicationStatus(application._id, 'Rejected')}
                          style={dangerButtonStyle}
                        >
                          {t.reject}
                        </button>
                      </div>

                      <div style={{ marginTop: 14 }}>
                        <input
                          type="datetime-local"
                          value={interviewDates[application._id] || ''}
                          onChange={(e) =>
                            setInterviewDates((prev) => ({
                              ...prev,
                              [application._id]: e.target.value
                            }))
                          }
                          style={inputStyle}
                        />
                        <button
                          onClick={() => scheduleInterview(application._id)}
                          style={primaryButtonStyle}
                        >
                          {t.scheduleInterview}
                        </button>
                      </div>
                    </>
                  )}

                  {isAccepted && !isInterviewScheduled && (
                    <div style={{ marginTop: 14 }}>
                      <p style={{ color: '#166534', fontWeight: 600 }}>
                        {t.candidateAccepted}
                      </p>
                      <input
                        type="datetime-local"
                        value={interviewDates[application._id] || ''}
                        onChange={(e) =>
                          setInterviewDates((prev) => ({
                            ...prev,
                            [application._id]: e.target.value
                          }))
                        }
                        style={inputStyle}
                      />
                      <button
                        onClick={() => scheduleInterview(application._id)}
                        style={primaryButtonStyle}
                      >
                        {t.scheduleInterview}
                      </button>
                    </div>
                  )}

                  {isRejected && (
                    <p style={{ marginTop: 14, color: '#991b1b', fontWeight: 600 }}>
                      {t.candidateRejected}
                    </p>
                  )}

                  {isInterviewScheduled && (
                    <div style={interviewBoxStyle}>
                      <p style={{ margin: 0, fontWeight: 600 }}>
                        {t.interviewScheduled}
                      </p>
                      <p style={{ margin: '6px 0 0' }}>
                        <strong>{t.interviewDate}:</strong> {application.interviewDate}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {isLoggedIn && activeTab === 'profile' && currentUser && (
        <div style={centerContainerStyle}>
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>{t.profile}</h2>

            <form onSubmit={updateProfile}>
              <input
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                placeholder={currentUser.role === 'jobSeeker' ? t.fullName : t.companyName}
                style={inputStyle}
              />
              <input
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                placeholder={t.phone}
                style={inputStyle}
              />

              {currentUser.role === 'jobSeeker' && (
                <>
                  <input
                    name="skills"
                    value={profileForm.skills}
                    onChange={handleProfileChange}
                    placeholder={t.skills}
                    style={inputStyle}
                  />
                  <textarea
                    name="workHistory"
                    value={profileForm.workHistory}
                    onChange={handleProfileChange}
                    placeholder={t.workHistory}
                    style={textareaStyle}
                  />
                  <label style={labelStyle}>{t.resume}</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setProfileResume(e.target.files[0])} style={inputStyle} />
                  <label style={labelStyle}>{t.photo}</label>
                  <input type="file" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} style={inputStyle} />
                </>
              )}

              {currentUser.role === 'employer' && (
                <>
                  <input
                    name="companyWebsite"
                    value={profileForm.companyWebsite}
                    onChange={handleProfileChange}
                    placeholder={t.companyWebsite}
                    style={inputStyle}
                  />
                  <label style={labelStyle}>{t.companyLogo}</label>
                  <input type="file" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} style={inputStyle} />
                  <p><strong>Verified:</strong> {currentUser.isVerified ? 'Yes' : 'No'}</p>
                </>
              )}

              <select
                name="preferredLanguage"
                value={profileForm.preferredLanguage}
                onChange={handleProfileChange}
                style={inputStyle}
              >
                <option value="en">{t.english}</option>
                <option value="so">{t.somali}</option>
              </select>

              <button type="submit" style={primaryButtonStyle}>{t.saveProfile}</button>
            </form>

            {profileMessage && <p style={{ color: 'green' }}>{profileMessage}</p>}
            {profileError && <p style={{ color: 'red' }}>{profileError}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

const pageStyle = {
  minHeight: '100vh',
  background: '#f8fafc',
  padding: 20,
  fontFamily: 'Arial, sans-serif'
};

const headerStyle = {
  background: '#1e3a8a',
  color: 'white',
  padding: '30px 20px',
  borderRadius: 14,
  textAlign: 'center',
  marginBottom: 24
};

const navStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 10,
  marginBottom: 24
};

const navButtonStyle = {
  padding: '12px 18px',
  borderRadius: 8,
  border: 'none',
  background: '#e2e8f0',
  color: '#1e3a8a',
  cursor: 'pointer',
  fontWeight: 600
};

const centerContainerStyle = {
  maxWidth: 760,
  margin: '0 auto'
};

const contentContainerStyle = {
  maxWidth: 1050,
  margin: '0 auto'
};

const dashboardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
  gap: 18
};

const cardStyle = {
  background: 'white',
  padding: 24,
  borderRadius: 14,
  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
  marginBottom: 18
};

const sectionTitleStyle = {
  textAlign: 'center',
  marginBottom: 20
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  marginBottom: 12,
  borderRadius: 8,
  border: '1px solid #cbd5e1',
  fontSize: 15,
  boxSizing: 'border-box'
};

const textareaStyle = {
  width: '100%',
  minHeight: 100,
  padding: '12px 14px',
  marginBottom: 12,
  borderRadius: 8,
  border: '1px solid #cbd5e1',
  fontSize: 15,
  resize: 'vertical',
  boxSizing: 'border-box'
};

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  color: '#334155',
  fontWeight: 600
};

const primaryButtonStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: 'none',
  background: '#1e3a8a',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 600
};

const smallButtonStyle = {
  padding: '8px 14px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 16,
  marginBottom: 22
};

const statCardStyle = {
  background: 'white',
  padding: 20,
  borderRadius: 12,
  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
  textAlign: 'center'
};

const statNumberStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  margin: 0
};

const professionalApplicantCardStyle = {
  background: 'white',
  padding: 24,
  borderRadius: 14,
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  marginBottom: 18,
  border: '1px solid #e2e8f0'
};

const applicantTopRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 16,
  marginBottom: 14
};

const metaRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 18,
  marginBottom: 14,
  color: '#475569',
  fontSize: '14px'
};

const actionRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  marginTop: 12
};

const interviewBoxStyle = {
  marginTop: 14,
  padding: 14,
  borderRadius: 10,
  background: '#ecfdf5',
  border: '1px solid #bbf7d0'
};

const secondaryButtonStyle = {
  padding: '10px 14px',
  borderRadius: 8,
  border: 'none',
  background: '#f59e0b',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 600
};

const successButtonStyle = {
  padding: '10px 14px',
  borderRadius: 8,
  border: 'none',
  background: '#16a34a',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 600
};

const dangerButtonStyle = {
  padding: '10px 14px',
  borderRadius: 8,
  border: 'none',
  background: '#dc2626',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 600
};

export default App;