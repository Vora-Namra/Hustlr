import { Divider } from "@mantine/core";
import Profile from "../Profile/Profile";

export const ProfilePage = () => {
  const mockData = {
    name: "John Doe",
    role: "Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    about: "Passionate developer with 5+ years of experience.",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [
      { id: 1, title: "Frontend Developer", company: "WebTech", years: "2020-2023" },
      { id: 2, title: "Backend Developer", company: "CodeBase", years: "2018-2020" },
    ],
    certifications: [
      { id: 1, name: "AWS Certified Developer", date: "2023" },
      { id: 2, name: "Scrum Master Certification", date: "2022" },
    ],
  };

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      <Divider mx="md" mb="xl" />
      <Profile {...mockData} />
    </div>
  );
};
