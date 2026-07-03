import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsSection from "@/components/ProjectsSection";
import ActivitySection from "@/components/ActivitySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || `https://${process.env.VERCEL_URL}`;

async function getProfile() {
  const res = await fetch(`${API_BASE}/api/profile`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

async function getSkills() {
  const res = await fetch(`${API_BASE}/api/skills`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

async function getExperiences() {
  const res = await fetch(`${API_BASE}/api/experiences`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}

async function getProjects() {
  const res = await fetch(`${API_BASE}/api/projects`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

async function getActivities() {
  const res = await fetch(`${API_BASE}/api/activities`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch activities");
  return res.json();
}

export default async function Home() {
  const [profile, skills, experiences, projects, activities] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getExperiences(),
      getProjects(),
      getActivities(),
    ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero
          name={profile.name}
          bio={profile.bio}
          profileImage={
            profile.profileImage ||
            "/images/profile-placeholder.jpg"
          }
        />
        <AboutSection bio={profile.bio} />
        <SkillsSection skills={skills} />
        <ExperienceTimeline experiences={experiences} />
        <ProjectsSection projects={projects} />
        <ActivitySection activities={activities} />
        <ContactSection
          email={profile.email}
          github="https://github.com/adiveryfirmansyah"
          linkedin="#"
        />
      </main>
      <Footer />
    </>
  );
}