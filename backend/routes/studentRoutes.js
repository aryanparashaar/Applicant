import express from 'express';
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import Student from '../models/Student.js';
import { upload } from '../middleware/upload.js';


const router = express.Router();


// Create applicant (with résumé upload)
router.post('/', upload.single('resume'), async (req, res) => {
try {
const body = req.body;


// Upload file to Cloudinary as raw (so PDF/DOC/DOCX are supported)
let resumeUrl = '';
let resumePublicId = '';


if (req.file) {
const uploaded = await cloudinary.uploader.upload(req.file.path, {
folder: 'applicants/resumes',
resource_type: 'raw' // important for non-images
});
resumeUrl = uploaded.secure_url;
resumePublicId = uploaded.public_id;
fs.unlinkSync(req.file.path); // cleanup local temp file
}


const student = await Student.create({
name: body.name,
email: body.email,
mobile: body.mobile,
qualification: body.qualification,
college: body.college,
experience: body.experience,
passOutYear: body.passOutYear,
skills: body.skills,
resumeUrl,
resumePublicId
});


res.status(201).json(student);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});


// Get all applicants
router.get('/', async (_, res) => {
try {
const students = await Student.find().sort({ createdAt: -1 });
res.json(students);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


export default router;