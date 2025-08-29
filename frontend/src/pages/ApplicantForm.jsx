import { useState } from "react";

export default function ApplicantForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [qualification, setQualification] = useState("");
  const [college, setCollege] = useState("");
  const [experience, setExperience] = useState("");
  const [passoutyear, setPassoutyear] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("qualification", qualification);
      formData.append("college", college);
      formData.append("experience", experience);
      formData.append("passoutyear", passoutyear);
      formData.append("skills", skills);
      formData.append("resume", resume);

      const res = await fetch(`${import.meta.env.VITE_API_BASE}/students`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("❌ Backend error:", err);
        setMessage({ type: "error", text: "Error: " + err.message });
        setLoading(false);
        return;
      }

      setMessage({
        type: "success",
        text: "✅ Application submitted successfully!",
      });

      // Reset form
      setName("");
      setEmail("");
      setMobile("");
      setQualification("");
      setCollege("");
      setExperience("");
      setPassoutyear("");
      setSkills("");
      setResume(null);
    } catch (error) {
      console.error("❌ Network/JS error:", error);
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-4 relative"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Applicant Form
        </h2>

        {/* ✅ Message Banner */}
        {message.text && (
          <div
            className={`p-3 rounded-lg text-center mb-4 ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Mobile</label>
          <input
            type="tel"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Qualification</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">College</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Experience (Years)</label>
          <input
            type="number"
            step="0.1"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Pass Out Year</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={passoutyear}
            onChange={(e) => setPassoutyear(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Skills</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>

        {/* ✅ Submit Button with Loader */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold p-3 rounded-lg transition ${
            loading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
