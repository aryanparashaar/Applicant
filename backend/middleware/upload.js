import multer from 'multer';
import fs from 'fs';
import path from 'path';


const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });


const storage = multer.diskStorage({
destination: (_, __, cb) => cb(null, uploadDir),
filename: (_, file, cb) => {
const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
const ext = path.extname(file.originalname);
cb(null, unique + ext);
}
});


const allowed = new Set([
'application/pdf',
'application/msword',
'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);


const fileFilter = (_, file, cb) => {
if (allowed.has(file.mimetype)) cb(null, true);
else cb(new Error('Only PDF/DOC/DOCX allowed'));
};


export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });