import { useState, useEffect } from 'react';

const API = 'https://somtalent-platform.onrender.com/api';

function App() {
  const [activeTab, setActiveTab] = useState('join');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Signup
  const [role, setRole] = useState('jobSeeker');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState('');
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applyMessage, setApplyMessage] = useState('');
  const [employerApplications, setEmployerApplications] = useState([]);

  // Training
  const [trainingModules, setTrainingModules] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (role === 'jobSeeker' && !resume) return setSignupError('Resume is required');

    const formData = new FormData();
    formData.append('role', role);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (role === 'jobSeeker') {
      formData.append('skills', skills);
      formData.append('resume', resume);
    }

    setSignupLoading(true);
    try {
      const res = await fetch(`${API}/signup`, { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setSignupMessage('Signed up successfully! Login now.');
        setName(''); setEmail(''); setPassword(''); setSkills(''); setResume(null); setResumeName('');
      } else setSignupError(data.error);
    } catch (err) {
      setSignupError('Cannot connect to server');
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        setActiveTab(data.user.role === 'jobSeeker' ? 'jobs' : 'employer');
      } else setLoginError(data.error);
    } catch (err) {
      setLoginError('Cannot connect to server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveTab('join');
  };

  const handleApply = async (jobTitle) => {
    if (!isLoggedIn) return;
    try {
      const res = await fetch(`${API}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentUser.name, email: currentUser.email, jobTitle })
      });
      if (res.ok) setApplyMessage(`Applied for "${jobTitle}"`);
    } catch (err) {
      setApplyMessage('Error submitting application');
    }
  };

  const loadJobs = async () => {
    try {
      const res = await fetch(`${API}/jobs`);
      const data = await res.json();
      setJobs(data);
    } catch (err) { console.error(err); }
  };

  const loadMyApplications = async () => {
    if (!currentUser?.email) return;
    setApplicationsLoading(true);
    try {
      const res = await fetch(`${API}/my-applications?email=${currentUser.email}`);
      const data = await res.json();
      setApplications(data);
    } catch (err) { console.error(err); } finally {
      setApplicationsLoading(false);
    }
  };

  const loadEmployerApplications = async () => {
    try {
      const res = await fetch(`${API}/applications/employer/${currentUser.email}`);
      const data = await res.json();
      setEmployerApplications(data);
    } catch (err) { console.error(err); }
  };

  const loadTrainingModules = async () => {
    try {
      const res = await fetch(`${API}/training-modules`);
      const data = await res.json();
      setTrainingModules(data);
    } catch (err) { console.error(err); }
  };

  const startCourse = (module) => {
    setCurrentModule(module);
    setShowTrainingModal(true);
  };

  const markAsCompleted = async (module) => {
    try {
      await fetch(`${API}/training-progress/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: currentUser.email, moduleId: module._id })
      });
      setCompletedModules([...completedModules, module]);
      setShowTrainingModal(false);
    } catch (err) { console.error(err); }
  };

  const postJob = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const salary = e.target.salary.value;
    try {
      await fetch(`${API}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, company: name || 'Your Company', salary, employerEmail: currentUser.email })
      });
      alert('Job posted!');
      e.target.reset();
    } catch (err) { alert('Failed to post job'); }
  };

  useEffect(() => {
    if (activeTab === 'jobs' && currentUser?.role === 'jobSeeker') loadJobs();
    if (activeTab === 'applications' && currentUser?.role === 'jobSeeker') loadMyApplications();
    if (activeTab === 'employer' && currentUser?.role === 'employer') loadEmployerApplications();
    if (activeTab === 'training' && currentUser?.role === 'jobSeeker') loadTrainingModules();
  }, [activeTab, currentUser]);

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ background: '#1e3a8a', color: 'white', padding: '30px 20px', textAlign: 'center', borderRadius: '8px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '2.8em' }}>SomTalent</h1>
        <p style={{ margin: '10px 0 0', fontSize: '1.2em' }}>Connecting Somaliland talent to remote jobs worldwide</p>
        {isLoggedIn && <div style={{ marginTop: '10px' }}>Welcome, {currentUser.name}! <button onClick={handleLogout} style={{ marginLeft: '15px', padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '6px' }}>Logout</button></div>}
      </header>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        {!isLoggedIn && <button onClick={() => setActiveTab('join')} style={{ padding: '12px 24px', margin: '0 8px', background: activeTab === 'join' ? '#1e3a8a' : '#e2e8f0', color: activeTab === 'join' ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Join / Login</button>}

        {isLoggedIn && currentUser.role === 'employer' && (
          <button onClick={() => setActiveTab('employer')} style={{ padding: '12px 24px', margin: '0 8px', background: activeTab === 'employer' ? '#1e3a8a' : '#e2e8f0', color: activeTab === 'employer' ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Employer Dashboard</button>
        )}

        {isLoggedIn && currentUser.role === 'jobSeeker' && (
          <>
            <button onClick={() => setActiveTab('jobs')} style={{ padding: '12px 24px', margin: '0 8px', background: activeTab === 'jobs' ? '#1e3a8a' : '#e2e8f0', color: activeTab === 'jobs' ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Browse Jobs</button>
            <button onClick={() => setActiveTab('training')} style={{ padding: '12px 24px', margin: '0 8px', background: activeTab === 'training' ? '#1e3a8a' : '#e2e8f0', color: activeTab === 'training' ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Training Modules</button>
            <button onClick={() => setActiveTab('applications')} style={{ padding: '12px 24px', margin: '0 8px', background: activeTab === 'applications' ? '#1e3a8a' : '#e2e8f0', color: activeTab === 'applications' ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>My Applications</button>
          </>
        )}

        <button onClick={() => setActiveTab('profile')} style={{ padding: '12px 24px', margin: '0 8px', background: activeTab === 'profile' ? '#1e3a8a' : '#e2e8f0', color: activeTab === 'profile' ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Profile</button>
      </div>

      {/* Join/Login */}
      {activeTab === 'join' && !isLoggedIn && (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ textAlign: 'center' }}>Join or Login</h2>
          <div style={{ marginBottom: '15px' }}>
            <button onClick={() => setRole('jobSeeker')} style={{ marginRight: '10px', padding: '10px 20px', background: role === 'jobSeeker' ? '#1e3a8a' : '#e2e8f0', color: role === 'jobSeeker' ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px' }}>Job Seeker</button>
            <button onClick={() => setRole('employer')} style={{ padding: '10px 20px', background: role === 'employer' ? '#1e3a8a' : '#e2e8f0', color: role === 'employer' ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px' }}>Employer</button>
          </div>

          <form onSubmit={handleSignup} encType="multipart/form-data">
            <input type="text" placeholder={role === 'jobSeeker' ? "Full Name" : "Company Name"} value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} required />
            {role === 'jobSeeker' && (
              <>
                <select value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }} required>
                  <option value="">Select skill</option>
                  <option value="English Speaking">English Speaking</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Writing">Writing</option>
                  <option value="Virtual Assistant">Virtual Assistant</option>
                </select>
                <div style={{ marginBottom: '20px' }}>
                  <label>Resume (PDF/Doc) <span style={{ color: 'red' }}>*</span></label><br />
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => { if (e.target.files[0]) { setResume(e.target.files[0]); setResumeName(e.target.files[0].name); } }} required />
                  {resumeName && <p style={{ color: 'green' }}>Selected: {resumeName}</p>}
                </div>
              </>
            )}
            <button type="submit" disabled={signupLoading} style={{ width: '100%', padding: '14px', background: signupLoading ? '#666' : '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px' }}>
              {signupLoading ? 'Creating...' : `Sign Up as ${role === 'jobSeeker' ? 'Job Seeker' : 'Employer'}`}
            </button>
          </form>
          {signupMessage && <p style={{ color: 'green', textAlign: 'center', marginTop: '15px' }}>{signupMessage}</p>}
          {signupError && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{signupError}</p>}

          <div style={{ marginTop: '40px' }}>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} required />
              <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }} required />
              <button type="submit" style={{ width: '100%', padding: '14px', background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px' }}>Login</button>
            </form>
            {loginError && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{loginError}</p>}
          </div>
        </div>
      )}

      {/* Employer Dashboard */}
      {isLoggedIn && currentUser.role === 'employer' && activeTab === 'employer' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Employer Dashboard</h2>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '30px' }}>
            <h3>Post a New Job</h3>
            <form onSubmit={postJob}>
              <input name="title" placeholder="Job Title" style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} required />
              <input name="salary" placeholder="Salary" style={{ width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }} required />
              <button type="submit" style={{ width: '100%', padding: '14px', background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px' }}>Post Job</button>
            </form>
          </div>

          <h3 style={{ textAlign: 'center' }}>Applications Received</h3>
          {employerApplications.length === 0 ? <p style={{ textAlign: 'center' }}>No applications yet.</p> : (
            employerApplications.map((app, i) => (
              <div key={i} style={{ background: 'white', padding: '20px', margin: '15px 0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h4>{app.jobTitle}</h4>
                <p><strong>Applicant:</strong> {app.name}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Status:</strong> <span style={{ color: app.status === 'Accepted' ? 'green' : 'orange' }}>{app.status}</span></p>
                <button onClick={() => updateApplicationStatus(app._id, 'Accepted')} style={{ marginRight: 10, padding: '8px 16px', background: 'green', color: 'white', border: 'none', borderRadius: '6px' }}>Accept</button>
                <button onClick={() => updateApplicationStatus(app._id, 'Rejected')} style={{ padding: '8px 16px', background: 'red', color: 'white', border: 'none', borderRadius: '6px' }}>Reject</button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Browse Jobs - Job Seeker */}
      {isLoggedIn && currentUser.role === 'jobSeeker' && activeTab === 'jobs' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center' }}>Available Remote Jobs</h2>
          {jobs.length === 0 ? <p style={{ textAlign: 'center' }}>No jobs posted yet.</p> : (
            jobs.map(job => (
              <div key={job._id} style={{ background: 'white', padding: '25px', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                <h3>{job.title}</h3>
                <p><strong>{job.company}</strong> • {job.salary}</p>
                <button onClick={() => handleApply(job.title)} style={{ padding: '12px 28px', background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px' }}>Apply Now</button>
              </div>
            ))
          )}
          {applyMessage && <p style={{ color: 'green', textAlign: 'center' }}>{applyMessage}</p>}
        </div>
      )}

      {/* Training Modules - Job Seeker */}
      {isLoggedIn && currentUser.role === 'jobSeeker' && activeTab === 'training' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Skill-Building Modules</h2>
          {trainingModules.map(m => (
            <div key={m._id} style={{ background: 'white', padding: '25px', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              <button onClick={() => startCourse(m)} style={{ padding: '10px 20px', background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px' }}>Start Course</button>
            </div>
          ))}
        </div>
      )}

      {/* My Applications - Job Seeker */}
      {isLoggedIn && currentUser.role === 'jobSeeker' && activeTab === 'applications' && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center' }}>My Applications</h2>
          {applicationsLoading && <p>Loading...</p>}
          {!applicationsLoading && applications.length === 0 && <p>No applications yet.</p>}
          {applications.map((app, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', margin: '15px 0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3>{app.jobTitle}</h3>
              <p><strong>Date:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span style={{ color: app.status === 'Accepted' ? 'green' : app.status === 'Rejected' ? 'red' : 'orange' }}>{app.status}</span></p>
            </div>
          ))}
        </div>
      )}

      {/* Profile */}
      {isLoggedIn && activeTab === 'profile' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ textAlign: 'center' }}>My Profile</h2>
          <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '10px' }}>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
          </div>
        </div>
      )}

      {/* Training Modal */}
      {showTrainingModal && currentModule && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', maxWidth: '600px', width: '90%', padding: '30px', borderRadius: '12px' }}>
            <h2>{currentModule.title}</h2>
            <p>{currentModule.description}</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
              <button onClick={() => setShowTrainingModal(false)} style={{ flex: 1, padding: '14px', background: '#e2e8f0', border: 'none', borderRadius: '8px' }}>Close</button>
              <button onClick={() => markAsCompleted(currentModule)} style={{ flex: 1, padding: '14px', background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px' }}>Mark as Completed</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;