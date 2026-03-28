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
    verifyCompany: 'Verify Company',
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
    verified: 'Verified'
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
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const [signupError, setSignupError] = useState('');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

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
    keyword: '',
    skill: '',
    category: '',
    locationType: '',
    salaryMin: ''
  });

  const [interviewDates, setInterviewDates] = useState({});
  const [interviewTypes, setInterviewTypes] = useState({});
  const [interviewLinks, setInterviewLinks] = useState({});
  const [interviewLocations, setInterviewLocations] = useState({});
  const [interviewNotes, setInterviewNotes] = useState({});
  const [questionAnswers, setQuestionAnswers] = useState({});

  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    skills: '',
    workHistory: '',
    companyWebsite: '',
    preferredLanguage: 'en'
  });
  const [profileResume, setProfileResume] = useState(null);

  const t = translations.en;
  const text = (key, fallback) => t?.[key] || fallback;

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
    const savedUser = sessionStorage.getItem('currentUser');
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

    loadNotifications();

    if (currentUser.role === 'jobSeeker') {
      if (activeTab === 'dashboard') {
        loadDashboard();
        loadJobs();
        loadApplications();
        loadModules();
        loadProgress();
        loadCertificates();
      }
      if (activeTab === 'jobs') {
        loadJobs();
        loadApplications();
      }
      if (activeTab === 'applications') loadApplications();
      if (activeTab === 'training') {
        loadModules();
        loadProgress();
      }
      if (activeTab === 'certificates') loadCertificates();
    }

    if (currentUser.role === 'employer') {
      if (activeTab === 'dashboard' || activeTab === 'employer') {
        loadDashboard();
        loadEmployerApplications();
      }
    }

    if (currentUser.role === 'admin') {
      if (activeTab === 'dashboard') loadAdminDashboard();
      if (activeTab === 'users') loadAdminUsers();
    }
  }, [activeTab, isLoggedIn, currentUser]);

  const loadJobs = async () => {
    try {
      let url = `${API}/jobs`;
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
    } catch {
      setJobs([]);
    }
  };

  const loadApplications = async () => {
    try {
      const data = await fetchJSON(`${API}/my-applications?email=${currentUser.email}`);
      setApplications(Array.isArray(data) ? data : []);
    } catch {
      setApplications([]);
    }
  };

  const loadEmployerApplications = async () => {
    try {
      const data = await fetchJSON(`${API}/applications/employer/${currentUser.email}`);
      setEmployerApplications(Array.isArray(data) ? data : []);
    } catch {
      setEmployerApplications([]);
    }
  };

  const loadModules = async () => {
    try {
      const data = await fetchJSON(`${API}/training-modules`);
      setModules(Array.isArray(data) ? data : []);
    } catch {
      setModules([]);
    }
  };

  const loadProgress = async () => {
    try {
      const data = await fetchJSON(`${API}/training-progress/${currentUser.email}`);
      setProgress(Array.isArray(data) ? data : []);
    } catch {
      setProgress([]);
    }
  };

  const loadCertificates = async () => {
    try {
      const data = await fetchJSON(`${API}/certificates/${currentUser.email}`);
      setCertificates(Array.isArray(data) ? data : []);
    } catch {
      setCertificates([]);
    }
  };

  const loadNotifications = async () => {
    try {
      const data = await fetchJSON(`${API}/notifications/${currentUser.email}`);
      setNotifications(Array.isArray(data) ? data : []);
    } catch {
      setNotifications([]);
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
    } catch {
      setDashboardData(null);
    }
  };

  const loadAdminDashboard = async () => {
    try {
      const data = await fetchJSON(`${API}/dashboard/admin`);
      setAdminStats(data);
    } catch {
      setAdminStats(null);
    }
  };

  const loadAdminUsers = async () => {
    try {
      const data = await fetchJSON(`${API}/admin/users`);
      setAdminUsers(Array.isArray(data) ? data : []);
    } catch {
      setAdminUsers([]);
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

      await fetchJSON(`${API}/signup`, { method: 'POST', body: formData });

      setSignupMessage('Signed up successfully.');
      setSignupData({
        name: '',
        email: '',
        phone: '',
        password: '',
        skills: '',
        workHistory: '',
        companyWebsite: '',
        preferredLanguage: 'en'
      });
      setSignupResume(null);
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
      sessionStorage.setItem('currentUser', JSON.stringify(data.user));
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
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveTab('join');
  };

  const handleApply = async (job) => {
    try {
      const answersForJob = (job.questions || []).map((question, index) => ({
        question,
        answer: questionAnswers[job._id]?.[index] || ''
      }));

      const missingAnswer = answersForJob.some((item) => item.question && !String(item.answer || '').trim());
      if (missingAnswer) {
        setApplyMessage('Please answer all screening questions.');
        return;
      }

      await fetchJSON(`${API}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: job._id, applicantEmail: currentUser.email, answers: answersForJob })
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
      await fetchJSON(`${API}/applications/${id}`, {
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
      await fetchJSON(`${API}/applications/${id}`, {
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
      await fetchJSON(`${API}/training-progress/complete`, {
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

      const updatedUser = await fetchJSON(`${API}/profile/${currentUser.email}`, {
        method: 'PUT',
        body: formData
      });

      setCurrentUser(updatedUser);
      sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setProfileMessage('Profile updated successfully.');
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
      sessionStorage.setItem('currentUser', JSON.stringify(data.employer));
      loadNotifications();
    } catch (error) {
      alert(error.message);
    }
  };

  const markNotificationRead = async (id) => {
    await fetchJSON(`${API}/notifications/read/${id}`, { method: 'PUT' });
    loadNotifications();
  };

  const getStatusBadgeStyle = (status) => {
    let bg = '#e2e8f0';
    let color = '#1e293b';
    if (status === 'Pending') { bg = '#fef3c7'; color = '#92400e'; }
    else if (status === 'Shortlisted') { bg = '#dbeafe'; color = '#1d4ed8'; }
    else if (status === 'Accepted') { bg = '#dcfce7'; color = '#166534'; }
    else if (status === 'Rejected') { bg = '#fee2e2'; color = '#991b1b'; }
    else if (status === 'Interview Scheduled') { bg = '#ede9fe'; color = '#6d28d9'; }

    return {
      background: bg,
      color,
      padding: '8px 12px',
      borderRadius: 999,
      fontWeight: 700,
      fontSize: '13px'
    };
  };

  const navForRole = () => {
    if (!isLoggedIn) return null;

    if (currentUser.role === 'jobSeeker') {
      return (
        <>
          <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle}>{text('jobSeekerDashboard', 'Job Seeker Dashboard')}</button>
          <button onClick={() => setActiveTab('jobs')} style={navButtonStyle}>{text('browseJobs', 'Browse Jobs')}</button>
          <button onClick={() => setActiveTab('training')} style={navButtonStyle}>{text('training', 'Training')}</button>
          <button onClick={() => setActiveTab('applications')} style={navButtonStyle}>{text('applications', 'Applications')}</button>
          <button onClick={() => setActiveTab('certificates')} style={navButtonStyle}>{text('certificates', 'Certificates')}</button>
          <button onClick={() => setActiveTab('notifications')} style={navButtonStyle}>{text('notifications', 'Notifications')}</button>
          <button onClick={() => setActiveTab('help')} style={navButtonStyle}>{text('help', 'Help Center')}</button>
          <button onClick={() => setActiveTab('profile')} style={navButtonStyle}>{text('profile', 'Profile')}</button>
        </>
      );
    }

    if (currentUser.role === 'employer') {
      return (
        <>
          <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle}>{text('employerDashboard', 'Employer Dashboard')}</button>
          <button onClick={() => setActiveTab('employer')} style={navButtonStyle}>{text('postJob', 'Post Job')}</button>
          <button onClick={() => setActiveTab('notifications')} style={navButtonStyle}>{text('notifications', 'Notifications')}</button>
          <button onClick={() => setActiveTab('profile')} style={navButtonStyle}>{text('profile', 'Profile')}</button>
        </>
      );
    }

    return (
      <>
        <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle}>{text('adminDashboard', 'Admin Dashboard')}</button>
        <button onClick={() => setActiveTab('users')} style={navButtonStyle}>{text('users', 'Users')}</button>
        <button onClick={() => setActiveTab('notifications')} style={navButtonStyle}>{text('notifications', 'Notifications')}</button>
      </>
    );
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={{ margin: 0 }}>{text('appName', 'SomTalent')}</h1>
        <p style={{ marginTop: 10 }}>{text('tagline', 'Connecting Somaliland talent to remote jobs worldwide')}</p>
        {isLoggedIn && currentUser && (
          <div style={{ marginTop: 14 }}>
            <span>{text('welcome', 'Welcome')}, {currentUser.name}</span>
            <button onClick={handleLogout} style={{ ...smallButtonStyle, marginLeft: 12 }}>{text('logout', 'Logout')}</button>
          </div>
        )}
      </header>

      <div style={navStyle}>
        {!isLoggedIn && <button onClick={() => setActiveTab('join')} style={navButtonStyle}>{text('joinLogin', 'Join / Login')}</button>}
        {navForRole()}
      </div>

      {!isLoggedIn && activeTab === 'join' && (
        <div style={centerContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('createAccount', 'Create Account')}</h2>

            <div style={{ marginBottom: 16 }}>
              <button onClick={() => setSignupRole('jobSeeker')} style={{ ...smallButtonStyle, marginRight: 10 }}>{text('asJobSeeker', 'As Job Seeker')}</button>
              <button onClick={() => setSignupRole('employer')} style={{ ...smallButtonStyle, marginRight: 10 }}>{text('asEmployer', 'As Employer')}</button>
              <button onClick={() => setSignupRole('admin')} style={smallButtonStyle}>{text('asAdmin', 'As Admin')}</button>
            </div>

            <form onSubmit={handleSignup}>
              <input name="name" value={signupData.name} onChange={handleSignupChange} placeholder={signupRole === 'jobSeeker' ? text('fullName', 'Full Name') : text('companyName', 'Company Name')} required style={inputStyle} />
              <input name="email" type="email" value={signupData.email} onChange={handleSignupChange} placeholder={text('email', 'Email')} required style={inputStyle} />
              <input name="phone" value={signupData.phone} onChange={handleSignupChange} placeholder={text('phone', 'Phone Number')} style={inputStyle} />
              <input name="password" type="password" value={signupData.password} onChange={handleSignupChange} placeholder={text('password', 'Password')} required style={inputStyle} />

              {signupRole === 'jobSeeker' && (
                <>
                  <input name="skills" value={signupData.skills} onChange={handleSignupChange} placeholder={text('skills', 'Skills')} style={inputStyle} />
                  <textarea name="workHistory" value={signupData.workHistory} onChange={handleSignupChange} placeholder={text('workHistory', 'Work History')} style={textareaStyle} />
                  <label style={labelStyle}>{text('resume', 'Resume')}</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setSignupResume(e.target.files[0])} required style={inputStyle} />
                </>
              )}

              {signupRole === 'employer' && (
                <input name="companyWebsite" value={signupData.companyWebsite} onChange={handleSignupChange} placeholder={text('companyWebsite', 'Company Website')} style={inputStyle} />
              )}

              <button type="submit" disabled={signupLoading} style={primaryButtonStyle}>
                {signupLoading ? '...' : text('signUp', 'Sign Up')}
              </button>
            </form>

            {signupMessage && <p style={{ color: 'green' }}>{signupMessage}</p>}
            {signupError && <p style={{ color: 'red' }}>{signupError}</p>}

            <hr style={{ margin: '24px 0' }} />

            <h2>{text('login', 'Login')}</h2>
            <form onSubmit={handleLogin}>
              <input name="email" type="email" value={loginData.email} onChange={handleLoginChange} placeholder={text('email', 'Email')} required style={inputStyle} />
              <input name="password" type="password" value={loginData.password} onChange={handleLoginChange} placeholder={text('password', 'Password')} required style={inputStyle} />
              <button type="submit" style={primaryButtonStyle}>{text('login', 'Login')}</button>
            </form>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          </div>
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'dashboard' && (
        <div style={contentContainerStyle}>
          <div style={statsGridStyle}>
            <div style={statCardStyle}><h4>{text('totalApplications', 'Total Applications')}</h4><p style={statNumberStyle}>{dashboardData?.totalApplications ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('accepted', 'Accepted')}</h4><p style={statNumberStyle}>{dashboardData?.accepted ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('pending', 'Pending')}</h4><p style={statNumberStyle}>{dashboardData?.pending ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('completedCourses', 'Completed Courses')}</h4><p style={statNumberStyle}>{dashboardData?.completedCourses ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('certificatesCount', 'Certificates')}</h4><p style={statNumberStyle}>{dashboardData?.certificates ?? 0}</p></div>
          </div>
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'employer' && activeTab === 'dashboard' && (
        <div style={contentContainerStyle}>
          <div style={statsGridStyle}>
            <div style={statCardStyle}><h4>{text('totalJobs', 'Total Jobs')}</h4><p style={statNumberStyle}>{dashboardData?.totalJobs ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('totalApplications', 'Total Applications')}</h4><p style={statNumberStyle}>{dashboardData?.totalApplications ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('shortlisted', 'Shortlisted')}</h4><p style={statNumberStyle}>{dashboardData?.shortlisted ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('interviews', 'Interviews')}</h4><p style={statNumberStyle}>{dashboardData?.interviews ?? 0}</p></div>
          </div>
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'admin' && activeTab === 'dashboard' && (
        <div style={contentContainerStyle}>
          <div style={statsGridStyle}>
            <div style={statCardStyle}><h4>{text('totalUsers', 'Total Users')}</h4><p style={statNumberStyle}>{adminStats?.totalUsers ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('totalJobSeekers', 'Job Seekers')}</h4><p style={statNumberStyle}>{adminStats?.totalJobSeekers ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('totalEmployers', 'Employers')}</h4><p style={statNumberStyle}>{adminStats?.totalEmployers ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('totalJobs', 'Total Jobs')}</h4><p style={statNumberStyle}>{adminStats?.totalJobs ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('totalApplications', 'Total Applications')}</h4><p style={statNumberStyle}>{adminStats?.totalApplications ?? 0}</p></div>
            <div style={statCardStyle}><h4>{text('totalCertificates', 'Certificates')}</h4><p style={statNumberStyle}>{adminStats?.totalCertificates ?? 0}</p></div>
          </div>
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'admin' && activeTab === 'users' && (
        <div style={contentContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('users', 'Users')}</h2>
            {adminUsers.map((user) => (
              <div key={user._id} style={{ padding: 12, borderBottom: '1px solid #e2e8f0' }}>
                <strong>{user.name}</strong> — {user.email} — {user.role}
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'jobs' && (
        <div style={contentContainerStyle}>
          <div style={cardStyle}>
            <h3>{text('filters', 'Filters')}</h3>
            <input name="keyword" value={filters.keyword} onChange={handleFilterChange} placeholder={text('keywordPlaceholder', 'Search title, company, description...')} style={inputStyle} />
            <input name="skill" value={filters.skill} onChange={handleFilterChange} placeholder={text('skill', 'Skill')} style={inputStyle} />
            <input name="category" value={filters.category} onChange={handleFilterChange} placeholder={text('category', 'Category')} style={inputStyle} />
            <select name="locationType" value={filters.locationType} onChange={handleFilterChange} style={inputStyle}>
              <option value="">{text('allLocations', 'All Locations')}</option>
              <option value="remote">{text('remote', 'Remote')}</option>
              <option value="onsite">{text('onsite', 'On-site')}</option>
              <option value="hybrid">{text('hybrid', 'Hybrid')}</option>
            </select>
            <input name="salaryMin" type="number" value={filters.salaryMin} onChange={handleFilterChange} placeholder={text('minimumSalary', 'Minimum Salary')} style={inputStyle} />
            <button onClick={loadJobs} style={primaryButtonStyle}>{text('applyFilters', 'Apply Filters')}</button>
          </div>

          {jobs.map((job) => {
            const existingApplication = applications.find((app) => String(app.jobId) === String(job._id));
            return (
              <div key={job._id} style={cardStyle}>
                <h3>{job.title}</h3>
                <p><strong>{text('companyName', 'Company Name')}:</strong> {job.company}</p>
                <p><strong>{text('category', 'Category')}:</strong> {job.category}</p>
                <p><strong>{text('requiredSkills', 'Required Skills')}:</strong> {(job.requiredSkills || []).join(', ')}</p>
                <p><strong>{text('matchScore', 'Match Score')}:</strong> {job.matchScore ?? 0}%</p>
                <p>{job.description}</p>

                {existingApplication ? (
                  <div style={interviewBoxStyle}>
                    <p style={{ margin: 0 }}><strong>{text('alreadyApplied', 'You have already applied for this job.')}</strong></p>
                    <p style={{ margin: '6px 0 0' }}><strong>{text('status', 'Status')}:</strong> {existingApplication.status}</p>
                  </div>
                ) : (
                  <>
                    {job.questions?.map((question, index) => (
                      <div key={index} style={{ marginBottom: 10 }}>
                        <p><strong>{question}</strong></p>
                        <textarea
                          value={questionAnswers[job._id]?.[index] || ''}
                          onChange={(e) =>
                            setQuestionAnswers((prev) => ({
                              ...prev,
                              [job._id]: { ...(prev[job._id] || {}), [index]: e.target.value }
                            }))
                          }
                          placeholder={text('answerQuestion', 'Answer the question')}
                          style={textareaStyle}
                        />
                      </div>
                    ))}
                    <button onClick={() => handleApply(job)} style={primaryButtonStyle}>{text('apply', 'Apply')}</button>
                  </>
                )}
              </div>
            );
          })}

          {applyMessage && <div style={cardStyle}>{applyMessage}</div>}
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'training' && (
        <div style={contentContainerStyle}>
          {modules.map((module) => (
            <div key={module._id} style={cardStyle}>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <p>{module.duration}</p>
              {completedModuleIds.has(module._id) ? (
                <p style={{ color: 'green', fontWeight: 'bold' }}>{text('completed', 'Completed - Certificate Issued')}</p>
              ) : (
                <button onClick={() => markModuleComplete(module._id)} style={primaryButtonStyle}>{text('completeModule', 'Complete Module')}</button>
              )}
            </div>
          ))}
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'applications' && (
        <div style={contentContainerStyle}>
          {applications.map((application) => (
            <div key={application._id} style={cardStyle}>
              <h3>{application.jobTitle}</h3>
              <p><strong>{text('status', 'Status')}:</strong> {application.status}</p>
              <p><strong>{text('applied', 'Applied')}:</strong> {new Date(application.appliedAt).toLocaleString()}</p>
              {application.interviewDate && <p><strong>{text('interviewDate', 'Interview Date')}:</strong> {application.interviewDate}</p>}
              {application.interviewType && <p><strong>{text('interviewType', 'Interview Type')}:</strong> {application.interviewType}</p>}
              {application.interviewLink && (
                <p><strong>{text('meetingLink', 'Meeting Link')}:</strong> <a href={application.interviewLink} target="_blank" rel="noreferrer">{application.interviewLink}</a></p>
              )}
              {application.interviewLocation && <p><strong>{text('meetingLocation', 'Meeting Location')}:</strong> {application.interviewLocation}</p>}
              {application.interviewNotes && <p><strong>{text('interviewNotes', 'Interview Notes')}:</strong> {application.interviewNotes}</p>}
            </div>
          ))}
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'certificates' && (
        <div style={contentContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('certificates', 'Certificates')}</h2>
            {certificates.length === 0 ? (
              <p>{text('noCertificates', 'No certificates yet.')}</p>
            ) : (
              certificates.map((cert) => (
                <div key={cert._id} style={{ padding: 12, borderBottom: '1px solid #e2e8f0' }}>
                  <strong>{cert.moduleTitle}</strong>
                  <p>{text('issuedAt', 'Issued At')}: {new Date(cert.issuedAt).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'employer' && activeTab === 'employer' && (
        <div style={contentContainerStyle}>
          <div style={cardStyle}>
            <h3>{text('postJob', 'Post Job')}</h3>
            <form onSubmit={handlePostJob}>
              <input name="title" placeholder={text('title', 'Job Title')} required style={inputStyle} />
              <input name="category" placeholder={text('category', 'Category')} required style={inputStyle} />
              <input name="requiredSkills" placeholder={text('requiredSkills', 'Required Skills')} style={inputStyle} />
              <input name="salaryMin" type="number" placeholder={text('minSalary', 'Minimum Salary')} style={inputStyle} />
              <input name="salaryMax" type="number" placeholder={text('maxSalary', 'Maximum Salary')} style={inputStyle} />
              <select name="locationType" defaultValue="remote" style={inputStyle}>
                <option value="remote">{text('remote', 'Remote')}</option>
                <option value="onsite">{text('onsite', 'On-site')}</option>
                <option value="hybrid">{text('hybrid', 'Hybrid')}</option>
              </select>
              <textarea name="description" placeholder={text('description', 'Description')} style={textareaStyle} />
              <textarea name="questions" placeholder={text('screeningPlaceholder', 'One question per line')} style={textareaStyle} />
              <button type="submit" style={primaryButtonStyle}>{text('postJob', 'Post Job')}</button>
            </form>
          </div>

          {employerApplications.map((application) => {
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
                    <p><strong>Applicant:</strong> {application.name}</p>
                    <p><strong>{text('email', 'Email')}:</strong> {application.email}</p>
                    {application.skills?.length > 0 && <p><strong>{text('skills', 'Skills')}:</strong> {application.skills.join(', ')}</p>}
                    {application.resume && (
                      <p>
                        <strong>{text('resume', 'Resume')}:</strong>{' '}
                        <a href={`http://localhost:5000/uploads/${application.resume}`} target="_blank" rel="noreferrer">
                          {text('viewResume', 'View Resume')}
                        </a>
                      </p>
                    )}
                    <p><strong>{text('verified', 'Verified')}:</strong> {currentUser.isVerified ? 'Yes' : 'No'}</p>
                  </div>
                  <div style={getStatusBadgeStyle(application.status)}>{application.status}</div>
                </div>

                {application.answers?.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <h4>{text('answers', 'Screening Answers')}</h4>
                    {application.answers.map((item, index) => (
                      <div key={index} style={{ marginBottom: 10, padding: 10, background: '#f8fafc', borderRadius: 8 }}>
                        <p><strong>{item.question}</strong></p>
                        <p>{item.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {isPending && (
                  <div style={actionRowStyle}>
                    <button onClick={() => updateApplicationStatus(application._id, 'Shortlisted')} style={secondaryButtonStyle}>{text('shortlist', 'Shortlist')}</button>
                    <button onClick={() => updateApplicationStatus(application._id, 'Accepted')} style={successButtonStyle}>{text('accept', 'Accept')}</button>
                    <button onClick={() => updateApplicationStatus(application._id, 'Rejected')} style={dangerButtonStyle}>{text('reject', 'Reject')}</button>
                  </div>
                )}

                {isShortlisted && (
                  <>
                    <div style={actionRowStyle}>
                      <button onClick={() => updateApplicationStatus(application._id, 'Accepted')} style={successButtonStyle}>{text('accept', 'Accept')}</button>
                      <button onClick={() => updateApplicationStatus(application._id, 'Rejected')} style={dangerButtonStyle}>{text('reject', 'Reject')}</button>
                    </div>

                    <input
                      type="datetime-local"
                      value={interviewDates[application._id] || ''}
                      onChange={(e) => setInterviewDates((prev) => ({ ...prev, [application._id]: e.target.value }))}
                      style={inputStyle}
                    />

                    <select
                      value={interviewTypes[application._id] || ''}
                      onChange={(e) => setInterviewTypes((prev) => ({ ...prev, [application._id]: e.target.value }))}
                      style={inputStyle}
                    >
                      <option value="">{text('interviewType', 'Interview Type')}</option>
                      <option value="online">{text('online', 'Online')}</option>
                      <option value="physical">{text('physical', 'Physical')}</option>
                    </select>

                    {interviewTypes[application._id] === 'online' && (
                      <input
                        type="text"
                        placeholder={text('meetingLink', 'Meeting Link')}
                        value={interviewLinks[application._id] || ''}
                        onChange={(e) => setInterviewLinks((prev) => ({ ...prev, [application._id]: e.target.value }))}
                        style={inputStyle}
                      />
                    )}

                    {interviewTypes[application._id] === 'physical' && (
                      <input
                        type="text"
                        placeholder={text('meetingLocation', 'Meeting Location')}
                        value={interviewLocations[application._id] || ''}
                        onChange={(e) => setInterviewLocations((prev) => ({ ...prev, [application._id]: e.target.value }))}
                        style={inputStyle}
                      />
                    )}

                    <textarea
                      placeholder={text('interviewNotes', 'Interview Notes')}
                      value={interviewNotes[application._id] || ''}
                      onChange={(e) => setInterviewNotes((prev) => ({ ...prev, [application._id]: e.target.value }))}
                      style={textareaStyle}
                    />

                    <button onClick={() => scheduleInterview(application._id)} style={primaryButtonStyle}>{text('scheduleInterview', 'Schedule Interview')}</button>
                  </>
                )}

                {isAccepted && !isInterviewScheduled && (
                  <>
                    <p style={{ color: '#166534', fontWeight: 600 }}>{text('candidateAccepted', 'Candidate accepted. You can now schedule an interview.')}</p>

                    <input
                      type="datetime-local"
                      value={interviewDates[application._id] || ''}
                      onChange={(e) => setInterviewDates((prev) => ({ ...prev, [application._id]: e.target.value }))}
                      style={inputStyle}
                    />

                    <select
                      value={interviewTypes[application._id] || ''}
                      onChange={(e) => setInterviewTypes((prev) => ({ ...prev, [application._id]: e.target.value }))}
                      style={inputStyle}
                    >
                      <option value="">{text('interviewType', 'Interview Type')}</option>
                      <option value="online">{text('online', 'Online')}</option>
                      <option value="physical">{text('physical', 'Physical')}</option>
                    </select>

                    {interviewTypes[application._id] === 'online' && (
                      <input
                        type="text"
                        placeholder={text('meetingLink', 'Meeting Link')}
                        value={interviewLinks[application._id] || ''}
                        onChange={(e) => setInterviewLinks((prev) => ({ ...prev, [application._id]: e.target.value }))}
                        style={inputStyle}
                      />
                    )}

                    {interviewTypes[application._id] === 'physical' && (
                      <input
                        type="text"
                        placeholder={text('meetingLocation', 'Meeting Location')}
                        value={interviewLocations[application._id] || ''}
                        onChange={(e) => setInterviewLocations((prev) => ({ ...prev, [application._id]: e.target.value }))}
                        style={inputStyle}
                      />
                    )}

                    <textarea
                      placeholder={text('interviewNotes', 'Interview Notes')}
                      value={interviewNotes[application._id] || ''}
                      onChange={(e) => setInterviewNotes((prev) => ({ ...prev, [application._id]: e.target.value }))}
                      style={textareaStyle}
                    />

                    <button onClick={() => scheduleInterview(application._id)} style={primaryButtonStyle}>{text('scheduleInterview', 'Schedule Interview')}</button>
                  </>
                )}

                {isRejected && <p style={{ color: '#991b1b', fontWeight: 600 }}>{text('candidateRejected', 'This application has been rejected.')}</p>}

                {isInterviewScheduled && (
                  <div style={interviewBoxStyle}>
                    <p><strong>{text('interviewScheduled', 'Interview scheduled successfully.')}</strong></p>
                    <p>{application.interviewDate}</p>
                    {application.interviewLink && <p>{application.interviewLink}</p>}
                    {application.interviewLocation && <p>{application.interviewLocation}</p>}
                    {application.interviewNotes && <p>{application.interviewNotes}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isLoggedIn && activeTab === 'notifications' && (
        <div style={contentContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('notifications', 'Notifications')} ({notifications.filter((n) => !n.isRead).length})</h2>
            {notifications.length === 0 ? (
              <p>{text('noNotifications', 'No notifications yet.')}</p>
            ) : (
              notifications.map((n) => (
                <div key={n._id} style={{ padding: 12, borderBottom: '1px solid #e2e8f0', background: n.isRead ? 'white' : '#eff6ff' }}>
                  <strong>{n.title}</strong>
                  <p>{n.message}</p>
                  <small>{new Date(n.createdAt).toLocaleString()}</small>
                  {!n.isRead && (
                    <div style={{ marginTop: 8 }}>
                      <button onClick={() => markNotificationRead(n._id)} style={smallButtonStyle}>{text('markRead', 'Mark as read')}</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {isLoggedIn && currentUser?.role === 'jobSeeker' && activeTab === 'help' && (
        <div style={contentContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('help', 'Help Center')}</h2>
            <p>{text('helpIntro', 'This platform helps job seekers apply for jobs, complete training, and track progress.')}</p>
            <h4>{text('faq1', 'How do I apply?')}</h4>
            <p>{text('faq1a', 'Open Browse Jobs, answer screening questions, then click Apply.')}</p>
            <h4>{text('faq2', 'How do I get a certificate?')}</h4>
            <p>{text('faq2a', 'Complete a training module and your certificate will appear in the Certificates tab.')}</p>
            <h4>{text('faq3', 'How does an employer review me?')}</h4>
            <p>{text('faq3a', 'The employer can review your profile, skills, resume, and your screening answers.')}</p>
          </div>
        </div>
      )}

      {isLoggedIn && activeTab === 'profile' && currentUser && (
        <div style={centerContainerStyle}>
          <div style={cardStyle}>
            <h2>{text('profile', 'Profile')}</h2>
            <form onSubmit={updateProfile}>
              <input name="name" value={profileForm.name} onChange={handleProfileChange} placeholder={currentUser.role === 'jobSeeker' ? text('fullName', 'Full Name') : text('companyName', 'Company Name')} style={inputStyle} />
              <input name="phone" value={profileForm.phone} onChange={handleProfileChange} placeholder={text('phone', 'Phone Number')} style={inputStyle} />

              {currentUser.role === 'jobSeeker' && (
                <>
                  <input name="skills" value={profileForm.skills} onChange={handleProfileChange} placeholder={text('skills', 'Skills')} style={inputStyle} />
                  <textarea name="workHistory" value={profileForm.workHistory} onChange={handleProfileChange} placeholder={text('workHistory', 'Work History')} style={textareaStyle} />
                  <label style={labelStyle}>{text('resume', 'Resume')}</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setProfileResume(e.target.files[0])} style={inputStyle} />
                </>
              )}

              {currentUser.role === 'employer' && (
                <>
                  <input name="companyWebsite" value={profileForm.companyWebsite} onChange={handleProfileChange} placeholder={text('companyWebsite', 'Company Website')} style={inputStyle} />
                  <p><strong>{text('verified', 'Verified')}:</strong> {currentUser.isVerified ? 'Yes' : 'No'}</p>
                  {!currentUser.isVerified && (
                    <button type="button" onClick={verifyEmployer} style={smallButtonStyle}>{text('verifyCompany', 'Verify Company')}</button>
                  )}
                </>
              )}

              <button type="submit" style={primaryButtonStyle}>{text('saveProfile', 'Save Profile')}</button>
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

const cardStyle = {
  background: 'white',
  padding: 24,
  borderRadius: 14,
  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
  marginBottom: 18
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
  background: '#e2e8f0',
  color: '#1e3a8a',
  cursor: 'pointer',
  fontWeight: 600
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