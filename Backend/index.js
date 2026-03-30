const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto'); // Added for Password Reset Tokens

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`)
});
const upload = multer({ storage });

// ─── Schemas ───────────────────────────────────────────────────────────────

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['jobSeeker', 'employer', 'admin'], required: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  skills: [String],
  workHistory: String,
  resume: String,
  photo: String,
  companyWebsite: String,
  isVerified: { type: Boolean, default: false },
  verificationRequested: { type: Boolean, default: false },
  suspended: { type: Boolean, default: false },
  preferredLanguage: { type: String, default: 'en' },
  // Added for Forgot Password Feature
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  category: String,
  requiredSkills: [String],
  salaryMin: Number,
  salaryMax: Number,
  locationType: String,
  description: String,
  employerEmail: String,
  questions: [String],
  createdAt: { type: Date, default: Date.now }
});
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

const applicationSchema = new mongoose.Schema({
  jobId: mongoose.Schema.Types.ObjectId,
  jobTitle: String,
  employerEmail: String,
  name: String,
  email: String,
  resume: String,
  skills: [String],
  answers: [{ question: String, answer: String }],
  coverLetter: { type: String, default: '' },
  status: { type: String, default: 'Pending' },
  interviewDate: String,
  interviewType: String,
  interviewLink: String,
  interviewLocation: String,
  appliedAt: { type: Date, default: Date.now }
});
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

const trainingModuleSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String
});
const TrainingModule = mongoose.models.TrainingModule || mongoose.model('TrainingModule', trainingModuleSchema);

const progressSchema = new mongoose.Schema({
  userEmail: String,
  moduleId: mongoose.Schema.Types.ObjectId,
  completed: Boolean,
  completedAt: Date
});
const TrainingProgress = mongoose.models.TrainingProgress || mongoose.model('TrainingProgress', progressSchema);

const certificateSchema = new mongoose.Schema({
  userEmail: String,
  moduleId: mongoose.Schema.Types.ObjectId,
  moduleTitle: String,
  issuedAt: { type: Date, default: Date.now }
});
const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);

const notificationSchema = new mongoose.Schema({
  userEmail: String,
  title: String,
  message: String,
  type: { type: String, default: 'info' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

// ─── Helpers ───────────────────────────────────────────────────────────────

const parseSkills = (skills) =>
  skills ? String(skills).split(',').map((s) => s.trim()).filter(Boolean) : [];

const parseQuestions = (questions) =>
  questions ? String(questions).split('\n').map((q) => q.trim()).filter(Boolean) : [];

const calculateMatchScore = (userSkills = [], requiredSkills = [], workHistory = '') => {
  if (!requiredSkills.length) return 50;
  const normalizedUserSkills = userSkills.map((s) => String(s).toLowerCase().trim());
  const historyText = String(workHistory || '').toLowerCase();
  const normalizedRequired = requiredSkills.map((s) => String(s).toLowerCase().trim());
  const matches = normalizedRequired.filter((required) => {
    const skillMatch = normalizedUserSkills.some((userSkill) => userSkill.includes(required) || required.includes(userSkill));
    return skillMatch || historyText.includes(required);
  });
  return Math.round((matches.length / normalizedRequired.length) * 100);
};

async function seedModules() {
  const count = await TrainingModule.countDocuments();
  if (count === 0) {
    await TrainingModule.insertMany([
      { title: 'English Communication for Remote Work', description: 'Improve English speaking, writing, and client communication.', duration: '2 hours' },
      { title: 'Virtual Assistant 101', description: 'Learn scheduling, inbox handling, and remote office tools.', duration: '1.5 hours' },
      { title: 'Basic Digital Skills for Freelancing', description: 'Build practical digital work skills for remote jobs.', duration: '2 hours' }
    ]);
  }
}

async function createNotification(userEmail, title, message, type = 'info') {
  await Notification.create({ userEmail: String(userEmail).toLowerCase(), title, message, type });
}

// ─── Auth Routes (Login, Signup, Reset) ────────────────────────────────────

app.post('/api/signup', upload.fields([{ name: 'resume' }, { name: 'photo' }]), async (req, res) => {
  try {
    const { role, name, email, password } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ error: 'Email already exists' });
    
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      role, name, email: email.toLowerCase(), password: hashed,
      phone: req.body.phone,
      skills: role === 'jobSeeker' ? parseSkills(req.body.skills) : [],
      workHistory: req.body.workHistory,
      companyWebsite: req.body.companyWebsite,
      resume: req.files?.resume?.[0]?.filename || '',
      photo: req.files?.photo?.[0]?.filename || '',
      isVerified: role === 'jobSeeker' || role === 'admin'
    });
    await user.save();
    await createNotification(email, 'Welcome', 'Account created successfully.', 'success');
    res.json({ message: 'Signup successful' });
  } catch (err) { res.status(500).json({ error: 'Signup failed' }); }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.suspended) return res.status(400).json({ error: 'Invalid credentials or account suspended' });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    
    const userData = user.toObject();
    delete userData.password;
    res.json({ user: userData });
  } catch (err) { res.status(500).json({ error: 'Login failed' }); }
});

// Forgot Password - Step 1: Generate Token
app.post('/api/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "Email not found" });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // In a real app, you'd email this. For your demo, we return it.
    res.json({ message: "Recovery token generated", resetToken: token });
  } catch (err) { res.status(500).json({ error: "Error generating token" }); }
});

// Reset Password - Step 2: Use Token
app.post('/api/reset-password/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) { res.status(500).json({ error: "Reset failed" }); }
});

// ─── Admin Routes ───────────────────────────────────────────────────────────

app.get('/api/admin/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

app.put('/api/employers/:email/verify', async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.params.email.toLowerCase(), role: 'employer' },
    { isVerified: true, verificationRequested: false },
    { new: true }
  );
  if (user) await createNotification(user.email, 'Verified', 'Your account is now verified.', 'success');
  res.json(user);
});

app.put('/api/admin/users/:id/suspend', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { suspended: req.body.suspended }, { new: true });
  res.json(user);
});

// ─── Job & Application Routes ───────────────────────────────────────────────

app.post('/api/jobs', async (req, res) => {
  const job = new Job({ ...req.body, requiredSkills: parseSkills(req.body.requiredSkills), questions: parseQuestions(req.body.questions) });
  await job.save();
  res.json({ message: 'Job posted' });
});

app.get('/api/jobs', async (req, res) => {
  const { userEmail } = req.query;
  const jobs = await Job.find().sort({ createdAt: -1 });
  let user = userEmail ? await User.findOne({ email: userEmail.toLowerCase() }) : null;
  
  const jobsWithScore = jobs.map(job => ({
    ...job.toObject(),
    matchScore: user ? calculateMatchScore(user.skills, job.requiredSkills, user.workHistory) : 0
  }));
  res.json(jobsWithScore);
});

app.post('/api/apply', async (req, res) => {
  const { jobId, applicantEmail, answers, coverLetter } = req.body;
  const user = await User.findOne({ email: applicantEmail.toLowerCase() });
  const job = await Job.findById(jobId);
  
  const appln = await Application.create({
    jobId, jobTitle: job.title, employerEmail: job.employerEmail,
    name: user.name, email: user.email, resume: user.resume, skills: user.skills,
    answers, coverLetter, status: 'Pending'
  });
  await createNotification(job.employerEmail, 'New Applicant', `${user.name} applied for ${job.title}`);
  res.json(appln);
});

// ─── Training & Certificates ───────────────────────────────────────────────

app.get('/api/training-modules', async (req, res) => {
  await seedModules();
  res.json(await TrainingModule.find());
});

app.post('/api/training-progress/complete', async (req, res) => {
  const { userEmail, moduleId } = req.body;
  const module = await TrainingModule.findById(moduleId);
  await TrainingProgress.findOneAndUpdate(
    { userEmail: userEmail.toLowerCase(), moduleId },
    { completed: true, completedAt: new Date() },
    { upsert: true }
  );
  await Certificate.create({ userEmail: userEmail.toLowerCase(), moduleId, moduleTitle: module.title });
  await createNotification(userEmail, 'Certificate Issued', `Completed: ${module.title}`, 'success');
  res.json({ message: 'Completed' });
});

app.get('/api/certificates/:email', async (req, res) => {
  const certs = await Certificate.find({ userEmail: req.params.email.toLowerCase() });
  res.json(certs);
});

app.get('/api/notifications/:email', async (req, res) => {
  const notes = await Notification.find({ userEmail: req.params.email.toLowerCase() }).sort({ createdAt: -1 });
  res.json(notes);
});

// ─── Start Server ───────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/somtalent')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });