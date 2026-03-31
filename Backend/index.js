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

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`)
});
const upload = multer({ storage });

// Schemas
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['jobSeeker', 'employer', 'admin'], required: true },
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  skills: [String],
  resume: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  salary: String,
  employerEmail: String,
  createdAt: { type: Date, default: Date.now }
});
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  jobTitle: String,
  status: { type: String, default: 'Pending' },
  appliedAt: { type: Date, default: Date.now }
});
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

const trainingModuleSchema = new mongoose.Schema({
  title: String,
  description: String
});
const TrainingModule = mongoose.models.TrainingModule || mongoose.model('TrainingModule', trainingModuleSchema);

// Signup
app.post('/api/signup', upload.single('resume'), async (req, res) => {
  try {
    const { role, name, email, password, skills } = req.body;
    if (!role || !name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      role,
      name,
      email,
      password: hashed,
      skills: role === 'jobSeeker' ? skills : undefined,
      resume: req.file ? req.file.filename : undefined
    });
    await user.save();
    res.json({ message: 'Signed up successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    res.json({ user: { role: user.role, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get all jobs
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// Post job
app.post('/api/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json({ message: 'Job posted' });
});

// Apply
app.post('/api/apply', async (req, res) => {
  const app = new Application(req.body);
  await app.save();
  res.json({ message: 'Application submitted' });
});

// My applications (job seeker)
app.get('/api/my-applications', async (req, res) => {
  const apps = await Application.find({ email: req.query.email }).sort({ appliedAt: -1 });
  res.json(apps);
});

// Employer applications
app.get('/api/applications/employer/:email', async (req, res) => {
  const apps = await Application.find({ employerEmail: req.params.email }).sort({ appliedAt: -1 });
  res.json(apps);
});

// Update status
app.put('/api/applications/:id', async (req, res) => {
  await Application.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json({ message: 'Status updated' });
});

// Training modules
app.get('/api/training-modules', async (req, res) => {
  const modules = await TrainingModule.find();
  if (modules.length === 0) {
    await TrainingModule.insertMany([
      { title: 'English Communication for Remote Work', description: 'Learn professional English for global jobs.' },
      { title: 'Virtual Assistant 101', description: 'Master tools for remote work.' }
    ]);
  }
  res.json(await TrainingModule.find());
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));