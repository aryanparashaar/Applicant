import { useEffect, useState } from "react";
import { fetchApplicants } from "../api";

export default function Dashboard() {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchApplicants().then((res) => setApplicants(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
      {applicants.map((app) => (
        <div key={app._id} className="p-4 bg-white shadow-lg rounded-2xl">
          <h3 className="text-lg font-bold">{app.name}</h3>
          <p>Email: {app.email}</p>
          <p>Mobile: {app.mobile}</p>
          <p>Qualification: {app.qualification}</p>
          <p>College: {app.college}</p>
          <p>Experience: {app.experience}</p>
          <p>Pass Out Year: {app.passOutYear}</p>
          <p>Skills: {app.skills}</p>
          <a
            href={app.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            View Resume
          </a>
        </div>
      ))}
    </div>
  );
}
