const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure Uploads Directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`)
});
const upload = multer({ storage });

// ─── DATABASE SCHEMAS ──────────────────────────────────────────────────────

const userSchema = new mongoose.Schema({
    role: { type: String, enum: ['jobSeeker', 'employer', 'admin'], required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
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
    employerEmail: { type: String, lowercase: true },
    questions: [String],
    createdAt: { type: Date, default: Date.now }
});
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

const applicationSchema = new mongoose.Schema({
    jobId: mongoose.Schema.Types.ObjectId,
    jobTitle: String,
    employerEmail: { type: String, lowercase: true },
    name: String,
    email: { type: String, lowercase: true },
    resume: String,
    skills: [String],
    answers: [{ question: String, answer: String }],
    coverLetter: { type: String, default: '' },
    status: { type: String, default: 'Pending' },
    appliedAt: { type: Date, default: Date.now }
});
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

const trainingModuleSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: String
});
const TrainingModule = mongoose.models.TrainingModule || mongoose.model('TrainingModule', trainingModuleSchema);

const certificateSchema = new mongoose.Schema({
    userEmail: { type: String, lowercase: true },
    moduleId: mongoose.Schema.Types.ObjectId,
    moduleTitle: String,
    issuedAt: { type: Date, default: Date.now }
});
const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);

const notificationSchema = new mongoose.Schema({
    userEmail: { type: String, lowercase: true },
    title: String,
    message: String,
    type: { type: String, default: 'info' },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

// ─── HELPERS ───────────────────────────────────────────────────────────────

const parseSkills = (skills) => 
    skills ? String(skills).split(',').map(s => s.trim()).filter(Boolean) : [];

const parseQuestions = (questions) => 
    questions ? String(questions).split('\n').map(q => q.trim()).filter(Boolean) : [];

async function createNotification(userEmail, title, message, type = 'info') {
    await Notification.create({ userEmail: String(userEmail).toLowerCase(), title, message, type });
}

async function seedModules() {
    const count = await TrainingModule.countDocuments();
    if (count === 0) {
        await TrainingModule.insertMany([
            { title: 'English Communication for Remote Work', description: 'Improve English speaking and client communication.', duration: '2 hours' },
            { title: 'Virtual Assistant 101', description: 'Learn scheduling and remote office tools.', duration: '1.5 hours' },
            { title: 'Basic Digital Skills', description: 'Build practical digital work skills.', duration: '2 hours' }
        ]);
    }
}

// ─── ROUTES ────────────────────────────────────────────────────────────────

// IMPORTANT: Ensure your Frontend calls https://YOUR-URL.onrender.com/api/signup
app.post('/api/signup', upload.fields([{ name: 'resume' }, { name: 'photo' }]), async (req, res) => {
    try {
        const { role, name, email, password } = req.body;
        const lowerEmail = email.toLowerCase();
        
        const existing = await User.findOne({ email: lowerEmail });
        if (existing) return res.status(400).json({ error: 'Email already exists' });
        
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({
            role, 
            name, 
            email: lowerEmail, 
            password: hashed,
            phone: req.body.phone,
            skills: role === 'jobSeeker' ? parseSkills(req.body.skills) : [],
            workHistory: req.body.workHistory,
            companyWebsite: req.body.companyWebsite,
            resume: req.files?.resume?.[0]?.filename || '',
            photo: req.files?.photo?.[0]?.filename || '',
            isVerified: role === 'jobSeeker' || role === 'admin'
        });

        await user.save();
        await createNotification(lowerEmail, 'Welcome', 'Account created successfully.', 'success');
        res.json({ message: 'Signup successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Signup failed' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user || user.suspended) {
            return res.status(400).json({ error: 'Invalid credentials or account suspended' });
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });
        
        const userData = user.toObject();
        delete userData.password;
        res.json({ user: userData });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Job Routes
app.get('/api/jobs', async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
});

app.post('/api/jobs', async (req, res) => {
    const job = new Job({ 
        ...req.body, 
        requiredSkills: parseSkills(req.body.requiredSkills), 
        questions: parseQuestions(req.body.questions) 
    });
    await job.save();
    res.json({ message: 'Job posted' });
});

// Training & Notifications
app.get('/api/training-modules', async (req, res) => {
    await seedModules();
    const modules = await TrainingModule.find();
    res.json(modules);
});

app.get('/api/notifications/:email', async (req, res) => {
    const notes = await Notification.find({ userEmail: req.params.email.toLowerCase() }).sort({ createdAt: -1 });
    res.json(notes);
});

// Admin Routes
app.get('/api/admin/users', async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

// Root Route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
    res.send("SomTalent API is Running Successfully");
});

// ─── START SERVER ──────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected to Atlas');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("Database connection error:", err));