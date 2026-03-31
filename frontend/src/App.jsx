import React, { useState, useEffect, useMemo } from 'react';

// --- Configuration ---
const API = 'http://localhost:5000'; // Replace with your actual backend URL

const translations = {
  en: {
    appName: "Somali Job Portal",
    tagline: "Connecting Somali Talent with Opportunity",
    welcome: "Welcome",
    logout: "Log Out",
    joinLogin: "Join / Login",
    createAccount: "Create Account",
    asJobSeeker: "As Job Seeker",
    asEmployer: "As Employer",
    asAdmin: "As Admin",
    fullName: "Full Name",
    companyName: "Company Name",
    email: "Email",
    phone: "Phone Number",
    password: "Password",
    skills: "Skills (comma separated)",
    workHistory: "Work History",
    resume: "Upload Resume (PDF/Doc)",
    companyWebsite: "Company Website",
    english: "English",
    somali: "Soomaali",
    signUp: "Sign Up",
    login: "Log In",
    jobSeekerDashboard: "Job Seeker Dashboard",
    employerDashboard: "Employer Dashboard",
    adminDashboard: "Admin Dashboard",
    browseJobs: "Browse Jobs",
    training: "Training",
    applications: "My Applications",
    certificates: "Certificates",
    notifications: "Notifications",
    help: "Help / Support",
    profile: "My Profile",
    postJob: "Post a Job",
    users: "Manage Users",
    totalApplications: "Total Applications",
    accepted: "Accepted",
    pending: "Pending",
    completedCourses: "Completed Courses",
    certificatesCount: "Certificates",
    totalJobs: "Total Jobs",
    shortlisted: "Shortlisted",
    interviews: "Interviews",
    totalUsers: "Total Users",
    totalJobSeekers: "Job Seekers",
    totalEmployers: "Employers",
    totalCertificates: "Total Certificates",
    verified: "Verified",
    pendingVerification: "Pending Verification",
    verifyEmployer: "Verify Employer",
    activateUser: "Activate",
    suspendUser: "Suspend",
    filters: "Filters",
    keywordPlaceholder: "Search by title...",
    skill: "Skill",
    category: "Category",
    allLocations: "All Locations",
    remote: "Remote",
    onsite: "On-site",
    hybrid: "Hybrid",
    minimumSalary: "Min Salary",
    applyFilters: "Apply Filters",
    noJobs: "No jobs found.",
    matchScore: "Match Score",
    alreadyApplied: "Already Applied",
    status: "Status",
    answerQuestion: "Your answer...",
    coverLetter: "Cover Letter",
    apply: "Apply Now",
    noModules: "No training modules available.",
    completed: "Completed",
    completeModule: "Mark as Complete",
    noApplications: "You haven't applied to any jobs yet.",
    applied: "Applied on",
    interviewDate: "Interview Date",
    interviewType: "Type",
    meetingLink: "Meeting Link",
    meetingLocation: "Location",
    interviewNotes: "Notes",
    noCertificates: "No certificates earned yet.",
    issuedAt: "Issued at",
    title: "Job Title",
    minSalary: "Min Salary",
    maxSalary: "Max Salary",
    requiredSkills: "Required Skills",
    saveSuccess: "Profile updated successfully.",
  },
  so: {
    appName: "Bogga Shaqada Soomaaliya",
    tagline: "Isku xirka hibooyinka Soomaaliyeed iyo fursadaha",
    welcome: "Ku soo dhawaaw",
    logout: "Ka bax",
    joinLogin: "Ku biir / Soo gal",
    createAccount: "Abuur Akoon",
    asJobSeeker: "Shaqo doon ahaan",
    asEmployer: "Shaqo bixiye ahaan",
    asAdmin: "Maamule ahaan",
    fullName: "Magaca oo buuxa",
    companyName: "Magaca Shirkadda",
    email: "Iimayl",
    phone: "Lambarka Taleefanka",
    password: "Ereyga sirta ah",
    skills: "Xirfadaha (ku kala saar kooma)",
    workHistory: "Khibradda shaqada",
    resume: "Soo geli CV-ga",
    companyWebsite: "Websaytka Shirkadda",
    english: "Ingiriis",
    somali: "Soomaali",
    signUp: "Isku diiwaangeli",
    login: "Soo gal",
    jobSeekerDashboard: "Dashboard-ka Shaqo doonka",
    employerDashboard: "Dashboard-ka Shaqo bixiyaha",
    adminDashboard: "Dashboard-ka Maamulaha",
    browseJobs: "Eeg Shaqooyinka",
    training: "Tababar",
    applications: "Codsiyadeeyda",
    certificates: "Shahaadooyinka",
    notifications: "Ogeysiisyada",
    help: "Caawinaad",
    profile: "Profile-kayga",
    postJob: "Geli Shaqo",
    users: "Maaree Isticmaalayaasha",
    totalApplications: "Wadarta Codsiyada",
    accepted: "La aqbalay",
    pending: "Wali socda",
    completedCourses: "Koorsooyinka dhammaaday",
    certificatesCount: "Shahaadooyin",
    totalJobs: "Wadarta Shaqooyinka",
    shortlisted: "Liiska gaaban",
    interviews: "Wareysiyo",
    totalUsers: "Wadarta Isticmaalayaasha",
    totalJobSeekers: "Shaqo doonayaal",
    totalEmployers: "Shaqo bixiyayaal",
    totalCertificates: "Wadarta Shahaadooyinka",
    verified: "La xaqiijiyay",
    pendingVerification: "Xaqiijin sugaya",
    verifyEmployer: "Xaqiiji Shaqo bixiyaha",
    activateUser: "Dhaqaaji",
    suspendUser: "Xanib",
    filters: "Miirayaasha",
    keywordPlaceholder: "Ku raadi magac...",
    skill: "Xirfad",
    category: "Nooca",
    allLocations: "Meel kasta",
    remote: "Fogaan",
    onsite: "Xafiiska",
    hybrid: "Isku dhaf",
    minimumSalary: "Mushaharka ugu hooseeya",
    applyFilters: "Isticmaal Miirayaasha",
    noJobs: "Wax shaqo ah lama helin.",
    matchScore: "Heerka isku xirka",
    alreadyApplied: "Horey ayaad u codsatay",
    status: "Heerka",
    answerQuestion: "Jawaabtaada...",
    coverLetter: "Warqadda Codsiga",
    apply: "Codso Hadda",
    noModules: "Ma jiraan cutubyo tababar.",
    completed: "Wuu dhammaaday",
    completeModule: "Calaamadee inuu dhammaaday",
    noApplications: "Wali ma aadan codsan shaqo.",
    applied: "La codsaday",
    interviewDate: "Taariikhda Wareysiga",
    interviewType: "Nooca",
    meetingLink: "Xiriirka kulanka",
    meetingLocation: "Goobta",
    interviewNotes: "Xusuusin",
    noCertificates: "Wali wax shahaado ah ma helin.",
    issuedAt: "La soo saaray",
    title: "Cinwaanka Shaqada",
    minSalary: "Mushaharka ugu hooseeya",
    maxSalary: "Mushaharka ugu sarreeya",
    requiredSkills: "Xirfadaha loo baahan yahay",
    saveSuccess: "Profile-ka si guul leh ayaa loo cusbooneysiiyay.",
  }
};

// --- Utilities ---
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (pass) => pass.length >= 6;
const validatePhone = (phone) => /^\+?[0-9]{7,15}$/.test(phone);

const fetchJSON = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API Error');
  }
  return response.json();
};

const App = () => {
  // --- States ---
  const [lang, setLang] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('join');

  // Forms
  const [signupRole, setSignupRole] = useState('jobSeeker');
  const [signupData, setSignupData] = useState({ name: '', email: '', phone: '', password: '', skills: '', workHistory: '', companyWebsite: '', preferredLanguage: 'en' });
  const [signupResume, setSignupResume] = useState(null);
  const [signupValidationErrors, setSignupValidationErrors] = useState({});
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const [signupError, setSignupError] = useState('');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginValidationErrors, setLoginValidationErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const [profileForm, setProfileForm] = useState({});
  const [profileResume, setProfileResume] = useState(null);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');

  // Data
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ keyword: '', skill: '', category: '', locationType: '', salaryMin: '' });
  const [applications, setApplications] = useState([]);
  const [employerApplications, setEmployerApplications] = useState([]);
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);

  // Interactions
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [coverLetters, setCoverLetters] = useState({});
  const [applyMessage, setApplyMessage] = useState('');
  
  // Interview fields
  const [interviewDates, setInterviewDates] = useState({});
  const [interviewTypes, setInterviewTypes] = useState({});
  const [interviewLinks, setInterviewLinks] = useState({});
  const [interviewLocations, setInterviewLocations] = useState({});
  const [interviewNotes, setInterviewNotes] = useState({});

  const text = (key, fallback) => translations[lang][key] || fallback;
  const completedModuleIds = useMemo(() => new Set(progress.map(p => p.moduleId)), [progress]);

  // --- Effects ---
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLang(user.preferredLanguage || 'en');
      setActiveTab('dashboard');
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      loadDashboard();
      loadNotifications();
      if (currentUser.role === 'jobSeeker') {
        loadJobs();
        loadApplications();
        loadModules();
        loadProgress();
        loadCertificates();
      } else if (currentUser.role === 'employer') {
        loadEmployerApplications();
      } else if (currentUser.role === 'admin') {
        loadAdminDashboard();
        loadAdminUsers();
      }
    }
  }, [isLoggedIn, currentUser]);

  // --- Data Loading Functions ---
  const loadJobs = async () => {
    try {
      const query = new URLSearchParams({ ...filters, userEmail: currentUser?.email || '' }).toString();
      const data = await fetchJSON(`${API}/jobs?${query}`);
      setJobs(Array.isArray(data) ? data : []);
    } catch { setJobs([]); }
  };

  const loadApplications = async () => {
    try {
      const data = await fetchJSON(`${API}/applications/user/${currentUser.email}`);
      setApplications(Array.isArray(data) ? data : []);
    } catch { setApplications([]); }
  };

  const loadEmployerApplications = async () => {
    try {
      const data = await fetchJSON(`${API}/applications/employer/${currentUser.email}`);
      setEmployerApplications(Array.isArray(data) ? data : []);
    } catch { setEmployerApplications([]); }
  };

  const loadModules = async () => {
    try {
      const data = await fetchJSON(`${API}/training-modules`);
      setModules(Array.isArray(data) ? data : []);
    } catch { setModules([]); }
  };

  const loadProgress = async () => {
    try {
      const data = await fetchJSON(`${API}/training-progress/${currentUser.email}`);
      setProgress(Array.isArray(data) ? data : []);
    } catch { setProgress([]); }
  };

  const loadCertificates = async () => {
    try {
      const data = await fetchJSON(`${API}/certificates/${currentUser.email}`);
      setCertificates(Array.isArray(data) ? data : []);
    } catch { setCertificates([]); }
  };

  const loadNotifications = async () => {
    try {
      const data = await fetchJSON(`${API}/notifications/${currentUser.email}`);
      setNotifications(Array.isArray(data) ? data : []);
    } catch { setNotifications([]); }
  };

  const loadDashboard = async () => {
    try {
      if (!currentUser) return;
      const url = currentUser.role === 'employer'
        ? `${API}/dashboard/employer/${currentUser.email}`
        : `${API}/dashboard/jobseeker/${currentUser.email}`;
      const data = await fetchJSON(url);
      setDashboardData(data);
    } catch { setDashboardData(null); }
  };

  const loadAdminDashboard = async () => {
    try {
      const data = await fetchJSON(`${API}/dashboard/admin`);
      setAdminStats(data);
    } catch { setAdminStats(null); }
  };

  const loadAdminUsers = async () => {
    try {
      const data = await fetchJSON(`${API}/admin/users`);
      setAdminUsers(Array.isArray(data) ? data : []);
    } catch { setAdminUsers([]); }
  };

  // --- Form Handlers ---
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
    if (!validatePassword(signupData.password)) errors.password = 'Min 6 characters.';
    if (signupRole === 'jobSeeker' && !signupResume) errors.resume = 'Please upload resume.';
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
      Object.keys(signupData).forEach(key => formData.append(key, signupData[key]));
      formData.append('role', signupRole);
      if (signupResume) formData.append('resume', signupResume);
      
      await fetchJSON(`${API}/api/signup`, { method: 'POST', body: formData });
      setSignupMessage('Success! Please log in.');
      setSignupData({ name: '', email: '', phone: '', password: '', skills: '', workHistory: '', companyWebsite: '', preferredLanguage: 'en' });
      setSignupResume(null);
    } catch (error) { setSignupError(error.message); } 
    finally { setSignupLoading(false); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
      setProfileForm({ ...data.user, skills: data.user.skills?.join(', ') || '' });
      setActiveTab('dashboard');
    } catch (error) { setLoginError(error.message); }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveTab('join');
  };

  // --- Logic Handlers ---
  const handleApply = async (job) => {
    try {
      const answersForJob = (job.questions || []).map((q, idx) => ({
        question: q,
        answer: questionAnswers[job._id]?.[idx] || ''
      }));
      if (answersForJob.some(a => !a.answer.trim())) {
        setApplyMessage('Please answer all questions.');
        return;
      }
      await fetchJSON(`${API}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job._id,
          applicantEmail: currentUser.email,
          answers: answersForJob,
          coverLetter: coverLetters[job._id] || ''
        })
      });
      setApplyMessage('Application sent!');
      loadApplications();
    } catch (error) { setApplyMessage(error.message); }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      await fetchJSON(`${API}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: fd.get('title'),
          company: currentUser.name,
          category: fd.get('category'),
          requiredSkills: fd.get('requiredSkills'),
          salaryMin: fd.get('salaryMin'),
          salaryMax: fd.get('salaryMax'),
          locationType: fd.get('locationType'),
          description: fd.get('description'),
          employerEmail: currentUser.email
        })
      });
      e.target.reset();
      loadDashboard();
      setActiveTab('dashboard');
    } catch (error) { alert(error.message); }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await fetchJSON(`${API}/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadEmployerApplications();
    } catch (error) { alert(error.message); }
  };

  const markModuleComplete = async (moduleId) => {
    try {
      await fetchJSON(`${API}/training-progress/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: currentUser.email, moduleId })
      });
      loadProgress();
      loadCertificates();
    } catch (error) { alert(error.message); }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(profileForm).forEach(k => formData.append(k, profileForm[k]));
      if (profileResume) formData.append('resume', profileResume);
      
      const updatedUser = await fetchJSON(`${API}/api/profile/${currentUser.email}`, {
        method: 'PUT',
        body: formData
      });
      setCurrentUser(updatedUser);
      setProfileMessage(text('saveSuccess', 'Profile Updated!'));
    } catch (error) { setProfileError(error.message); }
  };

  const adminToggleSuspend = async (userId, currentStatus) => {
    try {
      await fetchJSON(`${API}/admin/users/${userId}/suspend`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suspended: !currentStatus })
      });
      loadAdminUsers();
    } catch (error) { alert(error.message); }
  };

  const markNotificationRead = async (id) => {
    await fetchJSON(`${API}/notifications/read/${id}`, { method: 'PUT' });
    loadNotifications();
  };

  // --- Render Helpers ---
  const getStatusBadgeStyle = (status) => {
    let bg = '#e2e8f0', color = '#1e293b';
    if (status === 'Pending') { bg = '#fef3c7'; color = '#92400e'; }
    else if (status === 'Accepted') { bg = '#dcfce7'; color = '#166534'; }
    else if (status === 'Rejected') { bg = '#fee2e2'; color = '#991b1b'; }
    else if (status === 'Interview Scheduled') { bg = '#ede9fe'; color = '#6d28d9'; }
    return { background: bg, color, padding: '6px 12px', borderRadius: 99, fontWeight: 700, fontSize: '12px' };
  };

  const fieldError = (msg) => msg ? <p style={{ color: '#dc2626', fontSize: 11, margin: '-8px 0 8px' }}>{msg}</p> : null;

  // --- Styles ---
  const pageStyle = { fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' };
  const headerStyle = { backgroundColor: '#1e3a8a', color: 'white', padding: '20px', textAlign: 'center' };
  const navStyle = { display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '10px', gap: '10px', borderBottom: '1px solid #e2e8f0' };
  const navButtonStyle = { padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600, color: '#475569' };
  const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' };
  const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #cbd5e1' };
  const textareaStyle = { ...inputStyle, minHeight: '80px' };
  const primaryButtonStyle = { width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' };
  const smallButtonStyle = { padding: '5px 10px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  const statsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={{ textAlign: 'right' }}>
           <button onClick={() => setLang(lang === 'en' ? 'so' : 'en')} style={{...smallButtonStyle, background: '#334155'}}>
             {lang === 'en' ? 'Soomaali' : 'English'}
           </button>
        </div>
        <h1>{text('appName')}</h1>
        <p>{text('tagline')}</p>
        {isLoggedIn && <div>{text('welcome')}, {currentUser.name} <button onClick={handleLogout} style={smallButtonStyle}>{text('logout')}</button></div>}
      </header>

      <nav style={navStyle}>
        {!isLoggedIn ? (
          <button onClick={() => setActiveTab('join')} style={navButtonStyle}>{text('joinLogin')}</button>
        ) : (
          <>
            <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle}>Dashboard</button>
            {currentUser.role === 'jobSeeker' && (
              <>
                <button onClick={() => setActiveTab('jobs')} style={navButtonStyle}>{text('browseJobs')}</button>
                <button onClick={() => setActiveTab('training')} style={navButtonStyle}>{text('training')}</button>
                <button onClick={() => setActiveTab('applications')} style={navButtonStyle}>{text('applications')}</button>
              </>
            )}
            {currentUser.role === 'employer' && (
              <button onClick={() => setActiveTab('employer')} style={navButtonStyle}>{text('postJob')}</button>
            )}
            {currentUser.role === 'admin' && (
              <button onClick={() => setActiveTab('users')} style={navButtonStyle}>{text('users')}</button>
            )}
            <button onClick={() => setActiveTab('notifications')} style={navButtonStyle}>{text('notifications')}</button>
            <button onClick={() => setActiveTab('profile')} style={navButtonStyle}>{text('profile')}</button>
          </>
        )}
      </nav>

      <main style={{ maxWidth: '900px', margin: '20px auto', padding: '0 15px' }}>
        
        {/* Auth View */}
        {!isLoggedIn && activeTab === 'join' && (
          <div style={cardStyle}>
            <h2>{text('createAccount')}</h2>
            <div style={{marginBottom: 10}}>
              <button onClick={() => setSignupRole('jobSeeker')} style={{...smallButtonStyle, background: signupRole === 'jobSeeker' ? '#1e3a8a' : '#94a3b8', marginRight: 5}}>{text('asJobSeeker')}</button>
              <button onClick={() => setSignupRole('employer')} style={{...smallButtonStyle, background: signupRole === 'employer' ? '#1e3a8a' : '#94a3b8'}}>{text('asEmployer')}</button>
            </div>
            <form onSubmit={handleSignup}>
              <input name="name" value={signupData.name} onChange={handleSignupChange} placeholder={text('fullName')} style={inputStyle} />
              {fieldError(signupValidationErrors.name)}
              <input name="email" value={signupData.email} onChange={handleSignupChange} placeholder={text('email')} style={inputStyle} />
              {fieldError(signupValidationErrors.email)}
              <input name="password" type="password" value={signupData.password} onChange={handleSignupChange} placeholder={text('password')} style={inputStyle} />
              {fieldError(signupValidationErrors.password)}
              {signupRole === 'jobSeeker' && (
                <div style={{marginTop: 10}}>
                  <label>{text('resume')}</label>
                  <input type="file" onChange={(e) => setSignupResume(e.target.files[0])} style={inputStyle} />
                </div>
              )}
              <button type="submit" style={primaryButtonStyle} disabled={signupLoading}>{signupLoading ? '...' : text('signUp')}</button>
            </form>
            <hr style={{margin: '20px 0'}} />
            <h2>{text('login')}</h2>
            <form onSubmit={handleLogin}>
              <input name="email" value={loginData.email} onChange={handleLoginChange} placeholder={text('email')} style={inputStyle} />
              <input name="password" type="password" value={loginData.password} onChange={handleLoginChange} placeholder={text('password')} style={inputStyle} />
              <button type="submit" style={primaryButtonStyle}>{text('login')}</button>
            </form>
          </div>
        )}

        {/* Dashboard View */}
        {isLoggedIn && activeTab === 'dashboard' && (
          <div style={statsGridStyle}>
            <div style={cardStyle}><h4>Applications</h4><p style={{fontSize: 24, fontWeight: 800}}>{dashboardData?.totalApplications || 0}</p></div>
            {currentUser.role === 'jobSeeker' && <div style={cardStyle}><h4>Courses Done</h4><p style={{fontSize: 24, fontWeight: 800}}>{dashboardData?.completedCourses || 0}</p></div>}
            {currentUser.role === 'employer' && <div style={cardStyle}><h4>Jobs Posted</h4><p style={{fontSize: 24, fontWeight: 800}}>{dashboardData?.totalJobs || 0}</p></div>}
          </div>
        )}

        {/* Browse Jobs View */}
        {isLoggedIn && activeTab === 'jobs' && (
          <div>
            <div style={cardStyle}>
              <h3>{text('filters')}</h3>
              <input name="keyword" onChange={handleFilterChange} placeholder={text('keywordPlaceholder')} style={inputStyle} />
              <button onClick={loadJobs} style={primaryButtonStyle}>{text('applyFilters')}</button>
            </div>
            {jobs.map(job => (
              <div key={job._id} style={cardStyle}>
                <h3>{job.title}</h3>
                <p><strong>{job.company}</strong> | Match: {job.matchScore}%</p>
                <p>{job.description}</p>
                <button onClick={() => handleApply(job)} style={primaryButtonStyle}>{text('apply')}</button>
              </div>
            ))}
          </div>
        )}

        {/* Post Job View (Employer) */}
        {isLoggedIn && activeTab === 'employer' && (
          <div style={cardStyle}>
            <h3>{text('postJob')}</h3>
            <form onSubmit={handlePostJob}>
              <input name="title" placeholder={text('title')} required style={inputStyle} />
              <input name="category" placeholder={text('category')} required style={inputStyle} />
              <textarea name="description" placeholder="Description" style={textareaStyle} />
              <button type="submit" style={primaryButtonStyle}>Submit Job</button>
            </form>
          </div>
        )}

        {/* Notifications View */}
        {isLoggedIn && activeTab === 'notifications' && (
          <div>
            {notifications.length === 0 && <p>No notifications.</p>}
            {notifications.map(n => (
              <div key={n._id} style={{...cardStyle, opacity: n.read ? 0.6 : 1}}>
                <p>{n.message}</p>
                {!n.read && <button onClick={() => markNotificationRead(n._id)} style={smallButtonStyle}>Mark Read</button>}
              </div>
            ))}
          </div>
        )}

        {/* Profile View */}
        {isLoggedIn && activeTab === 'profile' && (
          <div style={cardStyle}>
            <h3>{text('profile')}</h3>
            <form onSubmit={updateProfile}>
              <input name="name" value={profileForm.name || ''} onChange={handleProfileChange} style={inputStyle} />
              <input name="phone" value={profileForm.phone || ''} onChange={handleProfileChange} style={inputStyle} />
              <button type="submit" style={primaryButtonStyle}>Save Profile</button>
            </form>
            {profileMessage && <p style={{color: 'green'}}>{profileMessage}</p>}
          </div>
        )}

      </main>
    </div>
  );
};

export default App;