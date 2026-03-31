const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Ensure Uploads Directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`)
});
const upload = multer({ storage });

// --- Mongoose Schemas ---
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['jobSeeker', 'employer', 'admin'], required: true },
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  phone: String,
  skills: [String],
  workHistory: String,
  resume: String,
  companyWebsite: String,
  preferredLanguage: { type: String, default: 'en' }
});
const User = mongoose.model('User', userSchema);

const jobSchema = new mongoose.Schema({
  title: String, company: String, category: String,
  requiredSkills: [String], salaryMin: Number, salaryMax: Number,
  locationType: String, description: String, employerEmail: String,
  questions: [String], createdAt: { type: Date, default: Date.now }
});
const Job = mongoose.model('Job', jobSchema);

// --- Helpers ---
const parseSkills = (s) => s ? String(s).split(',').map(x => x.trim()).filter(Boolean) : [];
const parseQuestions = (q) => q ? String(q).split('\n').map(x => x.trim()).filter(Boolean) : [];

// --- API ROUTES ---

// 1. Signup
app.post('/api/signup', upload.single('resume'), async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      ...req.body,
      email: email.toLowerCase(),
      password: hashed,
      skills: parseSkills(req.body.skills),
      resume: req.file ? req.file.filename : ''
    });
    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (err) { res.status(500).json({ error: 'Signup failed: ' + err.message }); }
});

// 2. Login
app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const userData = user.toObject(); delete userData.password;
    res.json({ user: userData });
  } catch (err) { res.status(500).json({ error: 'Login error' }); }
});

// 3. Post Job
app.post('/api/jobs', async (req, res) => {
  try {
    const job = new Job({ 
      ...req.body, 
      requiredSkills: parseSkills(req.body.requiredSkills),
      questions: parseQuestions(req.body.questions)
    });
    await job.save();
    res.json({ message: 'Job posted successfully' });
  } catch (err) { res.status(500).json({ error: 'Failed to post job' }); }
});

// 4. Update Profile
app.put('/api/profile/:email', upload.single('resume'), async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const updateData = { ...req.body };
    if (req.body.skills) updateData.skills = parseSkills(req.body.skills);
    if (req.file) updateData.resume = req.file.filename;

    const user = await User.findOneAndUpdate({ email }, { $set: updateData }, { new: true }).select('-password');
    res.json(user);
  } catch (err) { res.status(500).json({ error: 'Update failed' }); }
});

// 5. Get Jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) { res.json([]); }
});

app.get('/', (req, res) => res.send("SomTalent API is Running"));

// Start Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error("Database connection failed:", err));