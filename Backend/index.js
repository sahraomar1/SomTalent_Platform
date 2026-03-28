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
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`);
  }
});
const upload = multer({ storage });

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['jobSeeker', 'employer'], required: true },
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
  preferredLanguage: { type: String, default: 'en' }
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
  answers: [
    {
      question: String,
      answer: String
    }
  ],
  status: { type: String, default: 'Pending' },
  interviewDate: String,
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

const parseSkills = (skills) =>
  skills ? String(skills).split(',').map((s) => s.trim()).filter(Boolean) : [];

const parseQuestions = (questions) => {
  if (!questions) return [];
  return String(questions)
    .split('\n')
    .map((q) => q.trim())
    .filter(Boolean);
};

const calculateMatchScore = (userSkills = [], requiredSkills = [], workHistory = '') => {
  if (!requiredSkills.length) return 50;

  const normalizedUserSkills = userSkills.map((s) => String(s).toLowerCase().trim());
  const historyText = String(workHistory || '').toLowerCase();

  const normalizedRequiredSkills = requiredSkills.map((s) => String(s).toLowerCase().trim());

  const matches = normalizedRequiredSkills.filter((required) => {
    const skillMatch = normalizedUserSkills.some(
      (userSkill) => userSkill.includes(required) || required.includes(userSkill)
    );

    const historyMatch = historyText.includes(required);

    return skillMatch || historyMatch;
  });

  return Math.round((matches.length / normalizedRequiredSkills.length) * 100);
};

async function seedModules() {
  const count = await TrainingModule.countDocuments();
  if (count === 0) {
    await TrainingModule.insertMany([
      {
        title: 'English Communication for Remote Work',
        description: 'Improve English speaking, writing, and client communication.',
        duration: '2 hours'
      },
      {
        title: 'Virtual Assistant 101',
        description: 'Learn scheduling, inbox handling, and remote office tools.',
        duration: '1.5 hours'
      },
      {
        title: 'Basic Digital Skills for Freelancing',
        description: 'Build practical digital work skills for remote jobs.',
        duration: '2 hours'
      }
    ]);
  }
}

app.get('/', (req, res) => res.send('Backend running ✅'));

app.post('/api/signup', upload.fields([{ name: 'resume' }, { name: 'photo' }]), async (req, res) => {
  try {
    const role = String(req.body.role || '').trim();
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!role || !name || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      role,
      name,
      email,
      password: hashed,
      phone: String(req.body.phone || ''),
      skills: role === 'jobSeeker' ? parseSkills(req.body.skills) : [],
      workHistory: String(req.body.workHistory || ''),
      companyWebsite: String(req.body.companyWebsite || ''),
      preferredLanguage: String(req.body.preferredLanguage || 'en'),
      resume: req.files?.resume?.[0]?.filename || '',
      photo: req.files?.photo?.[0]?.filename || '',
      isVerified: role === 'jobSeeker'
    });

    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const storedPassword = typeof user.password === 'string' ? user.password : '';
    let match = false;

    if (
      storedPassword.startsWith('$2a$') ||
      storedPassword.startsWith('$2b$') ||
      storedPassword.startsWith('$2y$')
    ) {
      match = await bcrypt.compare(password, storedPassword);
    } else {
      match = storedPassword === password;
    }

    if (!match) return res.status(400).json({ error: 'Invalid email or password' });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        skills: user.skills || [],
        workHistory: user.workHistory || '',
        resume: user.resume || '',
        photo: user.photo || '',
        companyWebsite: user.companyWebsite || '',
        isVerified: user.isVerified,
        preferredLanguage: user.preferredLanguage || 'en'
      }
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.put('/api/profile/:email', upload.fields([{ name: 'resume' }, { name: 'photo' }]), async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updates = {
      name: req.body.name ?? user.name,
      phone: req.body.phone ?? user.phone,
      preferredLanguage: req.body.preferredLanguage ?? user.preferredLanguage
    };

    if (user.role === 'jobSeeker') {
      updates.skills = req.body.skills ? parseSkills(req.body.skills) : user.skills;
      updates.workHistory = req.body.workHistory ?? user.workHistory;
      if (req.files?.resume?.[0]?.filename) updates.resume = req.files.resume[0].filename;
    }

    if (user.role === 'employer') {
      updates.companyWebsite = req.body.companyWebsite ?? user.companyWebsite;
    }

    if (req.files?.photo?.[0]?.filename) updates.photo = req.files.photo[0].filename;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      updates,
      { returnDocument: 'after' }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error('PROFILE UPDATE ERROR:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.put('/api/employers/:email/verify', async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { email: req.params.email.toLowerCase(), role: 'employer' },
      { isVerified: true },
      { returnDocument: 'after' }
    ).select('-password');

    if (!updated) return res.status(404).json({ error: 'Employer not found' });
    res.json({ employer: updated });
  } catch (err) {
    console.error('VERIFY ERROR:', err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const job = new Job({
      title: req.body.title,
      company: req.body.company,
      category: req.body.category,
      requiredSkills: parseSkills(req.body.requiredSkills),
      salaryMin: Number(req.body.salaryMin) || 0,
      salaryMax: Number(req.body.salaryMax) || 0,
      locationType: req.body.locationType || 'remote',
      description: req.body.description || '',
      employerEmail: String(req.body.employerEmail || '').toLowerCase(),
      questions: parseQuestions(req.body.questions)
    });

    await job.save();
    res.json({ message: 'Job posted' });
  } catch (err) {
    console.error('POST JOB ERROR:', err);
    res.status(500).json({ error: 'Failed to post job' });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const { skill, category, locationType, salaryMin, userEmail, keyword } = req.query;
    let jobs = await Job.find().sort({ createdAt: -1 });

    if (keyword) {
      const q = String(keyword).toLowerCase().trim();
      jobs = jobs.filter((job) => {
        const title = String(job.title || '').toLowerCase();
        const company = String(job.company || '').toLowerCase();
        const cat = String(job.category || '').toLowerCase();
        const desc = String(job.description || '').toLowerCase();
        const skills = (job.requiredSkills || []).join(' ').toLowerCase();
        return title.includes(q) || company.includes(q) || cat.includes(q) || desc.includes(q) || skills.includes(q);
      });
    }

    if (skill) {
      const q = String(skill).toLowerCase().trim();
      jobs = jobs.filter((job) =>
        (job.requiredSkills || []).some((s) => String(s).toLowerCase().includes(q))
      );
    }

    if (category) {
      const q = String(category).toLowerCase().trim();
      jobs = jobs.filter((job) => String(job.category || '').toLowerCase().includes(q));
    }

    if (locationType) {
      const q = String(locationType).toLowerCase().trim();
      jobs = jobs.filter((job) => String(job.locationType || '').toLowerCase() === q);
    }

    if (salaryMin) {
      jobs = jobs.filter((job) => Number(job.salaryMax || 0) >= Number(salaryMin));
    }

    let user = null;
    if (userEmail) user = await User.findOne({ email: String(userEmail).toLowerCase() });

    const jobsWithMatch = jobs.map((job) => ({
      ...job.toObject(),
      matchScore: user
        ? calculateMatchScore(user.skills || [], job.requiredSkills || [], user.workHistory || '')
        : 0
    }));

    res.json(jobsWithMatch);
  } catch (err) {
    console.error('GET JOBS ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/api/apply', async (req, res) => {
  try {
    const { jobId, applicantEmail, answers } = req.body;
    const user = await User.findOne({ email: String(applicantEmail).toLowerCase() });
    if (!user) return res.status(404).json({ error: 'Applicant not found' });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const existing = await Application.findOne({ jobId: job._id, email: user.email });
    if (existing) return res.status(400).json({ error: 'You already applied for this job' });

    await new Application({
      jobId: job._id,
      jobTitle: job.title,
      employerEmail: job.employerEmail,
      name: user.name,
      email: user.email,
      resume: user.resume || '',
      skills: user.skills || [],
      answers: Array.isArray(answers) ? answers : [],
      status: 'Pending'
    }).save();

    res.json({ message: 'Applied successfully' });
  } catch (err) {
    console.error('APPLY ERROR:', err);
    res.status(500).json({ error: 'Failed to apply' });
  }
});

app.get('/api/my-applications', async (req, res) => {
  try {
    const email = String(req.query.email || '').toLowerCase();
    const apps = await Application.find({ email }).sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) {
    console.error('MY APPLICATIONS ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

app.get('/api/applications/employer/:email', async (req, res) => {
  try {
    const apps = await Application.find({
      employerEmail: String(req.params.email || '').toLowerCase()
    }).sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) {
    console.error('EMPLOYER APPLICATIONS ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

app.put('/api/applications/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.status) updates.status = req.body.status;
    if (req.body.interviewDate) updates.interviewDate = req.body.interviewDate;

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      updates,
      { returnDocument: 'after' }
    );

    if (!updated) return res.status(404).json({ error: 'Application not found' });
    res.json({ message: 'Application updated', application: updated });
  } catch (err) {
    console.error('UPDATE APPLICATION ERROR:', err);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

app.get('/api/training-modules', async (req, res) => {
  try {
    await seedModules();
    res.json(await TrainingModule.find());
  } catch (err) {
    console.error('TRAINING MODULES ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch modules' });
  }
});

app.get('/api/training-progress/:email', async (req, res) => {
  try {
    const progress = await TrainingProgress.find({
      userEmail: String(req.params.email || '').toLowerCase()
    });
    res.json(progress);
  } catch (err) {
    console.error('TRAINING PROGRESS ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

app.post('/api/training-progress/complete', async (req, res) => {
  try {
    const { userEmail, moduleId } = req.body;
    const email = String(userEmail).toLowerCase();

    const existing = await TrainingProgress.findOne({ userEmail: email, moduleId });
    if (existing) {
      existing.completed = true;
      existing.completedAt = new Date();
      await existing.save();
      return res.json({ message: 'Completed', progress: existing });
    }

    const progress = new TrainingProgress({
      userEmail: email,
      moduleId,
      completed: true,
      completedAt: new Date()
    });

    await progress.save();
    res.json({ message: 'Completed', progress });
  } catch (err) {
    console.error('COMPLETE MODULE ERROR:', err);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

app.get('/api/dashboard/jobseeker/:email', async (req, res) => {
  try {
    const email = String(req.params.email || '').toLowerCase();
    const totalApplications = await Application.countDocuments({ email });
    const accepted = await Application.countDocuments({ email, status: 'Accepted' });
    const pending = await Application.countDocuments({ email, status: 'Pending' });
    const completedCourses = await TrainingProgress.countDocuments({ userEmail: email, completed: true });
    res.json({ totalApplications, accepted, pending, completedCourses });
  } catch (err) {
    console.error('JOB SEEKER DASHBOARD ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
});

app.get('/api/dashboard/employer/:email', async (req, res) => {
  try {
    const email = String(req.params.email || '').toLowerCase();
    const totalJobs = await Job.countDocuments({ employerEmail: email });
    const totalApplications = await Application.countDocuments({ employerEmail: email });
    const shortlisted = await Application.countDocuments({ employerEmail: email, status: 'Shortlisted' });
    const interviews = await Application.countDocuments({ employerEmail: email, status: 'Interview Scheduled' });
    res.json({ totalJobs, totalApplications, shortlisted, interviews });
  } catch (err) {
    console.error('EMPLOYER DASHBOARD ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await seedModules();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err));