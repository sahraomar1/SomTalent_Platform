import { useEffect, useState } from 'react';

// Use your BACKEND URL from Render here
const API = 'https://somtalent-platform.onrender.com'; 

function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('join');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Login/Signup States
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', role: 'jobSeeker' });

  // Standard JSON Fetcher
  const fetchJSON = async (url, options = {}) => {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
       throw new Error("Server sent HTML instead of JSON. Check your API URL.");
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      setActiveTab('dashboard');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(signupData).forEach(key => formData.append(key, signupData[key]));
      
      await fetchJSON(`${API}/api/signup`, { method: 'POST', body: formData });
      alert("Signup successful! Please login.");
      setActiveTab('join');
    } catch (error) { alert(error.message); }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveTab('join');
  };

  return (
    <div style={{ backgroundColor: '#111827', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #374151', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1>SomTalent Platform</h1>
        {isLoggedIn && <button onClick={handleLogout} style={btnStyle}>Logout</button>}
      </header>

      {!isLoggedIn ? (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" required style={inputStyle} 
              onChange={e => setLoginData({...loginData, email: e.target.value})} />
            <input type="password" placeholder="Password" required style={inputStyle} 
              onChange={e => setLoginData({...loginData, password: e.target.value})} />
            <button type="submit" style={btnStyle}>Enter Dashboard</button>
          </form>
          
          <hr style={{ margin: '30px 0' }}/>
          
          <h2>Or Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input type="text" placeholder="Full Name" required style={inputStyle} 
              onChange={e => setSignupData({...signupData, name: e.target.value})} />
            <input type="email" placeholder="Email" required style={inputStyle} 
              onChange={e => setSignupData({...signupData, email: e.target.value})} />
            <input type="password" placeholder="Password" required style={inputStyle} 
              onChange={e => setSignupData({...signupData, password: e.target.value})} />
            <select style={inputStyle} onChange={e => setSignupData({...signupData, role: e.target.value})}>
              <option value="jobSeeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
            <button type="submit" style={{...btnStyle, backgroundColor: '#059669'}}>Create Account</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Welcome back, {currentUser.name}!</h2>
          <p>Role: {currentUser.role}</p>
          <div style={{ background: '#1f2937', padding: '20px', borderRadius: '8px' }}>
            <p>You are now connected to the SomTalent Backend.</p>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  display: 'block', width: '100%', padding: '12px', marginBottom: '15px',
  borderRadius: '4px', border: '1px solid #4b5563', backgroundColor: '#374151', color: 'white'
};

const btnStyle = {
  padding: '12px 24px', backgroundColor: '#2563eb', color: 'white',
  border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
};

export default App;