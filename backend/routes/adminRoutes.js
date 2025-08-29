import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();


router.post('/login', async (req, res) => {
const { username, password } = req.body;
if (username !== process.env.ADMIN_USER)
return res.status(400).json({ msg: 'Invalid credentials' });


const ok = await bcrypt.compare(password, process.env.ADMIN_PASS_HASH);
if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });


const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
res.json({ token });
});


export default router;