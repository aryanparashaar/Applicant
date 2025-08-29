import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String, required: true },
mobile: String,
qualification: String,
college: String,
experience: String,
passOutYear: String,
skills: String,
resumeUrl: String, // Cloudinary URL
resumePublicId: String // for later deletion if needed
},
{ timestamps: true }
);


export default mongoose.model('Student', studentSchema);