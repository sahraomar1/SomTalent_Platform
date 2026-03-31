import { useEffect, useMemo, useState } from 'react';

const API = 'https://somtalent-platform.onrender.com'; 

const translations = {
  en: { appName: 'SomTalent', /* ... existing translations ... */ },
  so: { appName: 'SomTalent', /* ... existing translations ... */ }
};

function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('join');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  const fetchJSON = async (url, options = {}) => {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  };

  // ─── AUTH ACTIONS ────────────────────────────────────────────────────────

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(signupData).forEach(key => formData.append(key, signupData[key]));
      formData.append('role', signupRole);
      if (signupResume) formData.append('resume', signupResume);

      // FIXED: Added /api/
      await fetchJSON(`${API}/api/signup`, { method: 'POST', body: formData });
      alert('Signup successful! Please login.');
      setActiveTab('join');
    } catch (error) { alert(error.message); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // FIXED: Added /api/
      const data = await fetchJSON(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      setActiveTab('dashboard');
    } catch (error) { alert(error.message); }
  };


  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(profileForm).forEach(key => formData.append(key, profileForm[key]));
      if (profileResume) formData.append('resume', profileResume);

      // FIXED: Added /api/
      const updatedUser = await fetchJSON(`${API}/api/profile/${currentUser.email}`, {
        method: 'PUT',
        body: formData
      });
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      alert('Profile updated!');
    } catch (error) { alert(error.message); }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      // FIXED: Added /api/
      await fetchJSON(`${API}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.value,
          category: form.category.value,
          requiredSkills: form.requiredSkills.value,
          salaryMin: form.salaryMin.value,
          salaryMax: form.salaryMax.value,
          locationType: form.locationType.value,
          description: form.description.value,
          questions: form.questions.value,
          employerEmail: currentUser.email,
          company: currentUser.name
        })
      });
      alert('Job posted!');
      form.reset();
    } catch (error) { alert(error.message); }
  };

  
  return (
    <div className="App">
       {/* Your existing JSX template */}
    </div>
  );
}

export default App;