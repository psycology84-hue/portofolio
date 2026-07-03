// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Hapus data lama (urutannya karena relasi)
  await prisma.projectTechnology.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  // Buat user
  const user = await prisma.user.create({
    data: {
      name: "Very Firmansyah",
      bio: "Full-stack developer in progress. Passionate about building useful web apps and learning modern technologies.",
      profileImage: "/images/profile.jpg", // nanti taruh gambar di folder public
      email: "very@example.com",
    },
  });

  // Buat skills
  const skills = [
    { name: "React", category: "Frontend", level: 85 },
    { name: "Next.js", category: "Frontend", level: 80 },
    { name: "TypeScript", category: "Frontend", level: 75 },
    { name: "TailwindCSS", category: "Frontend", level: 90 },
    { name: "Node.js", category: "Backend", level: 70 },
    { name: "Express", category: "Backend", level: 65 },
    { name: "Prisma", category: "Backend", level: 60 },
    { name: "PostgreSQL", category: "Database", level: 70 },
    { name: "MongoDB", category: "Database", level: 50 },
    { name: "Git", category: "Tools", level: 85 },
    { name: "Docker", category: "Tools", level: 40 },
    { name: "Figma", category: "Tools", level: 55 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Buat experiences
  const experiences = [
    {
      title: "Computer Science Student",
      description: "Pursuing degree in Informatics Engineering.",
      year: 2023,
    },
    {
      title: "Frontend Developer Intern",
      description:
        "Built internal dashboard using React and TypeScript. Learned agile workflow.",
      year: 2024,
    },
    {
      title: "Freelance Web Developer",
      description:
        "Created landing pages and simple full-stack apps for small businesses.",
      year: 2025,
    },
    {
      title: "Full-Stack Learning Journey",
      description:
        "Deep dive into Next.js, Prisma, PostgreSQL. Building this portfolio as a capstone project.",
      year: 2026,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }

  // Buat technologies untuk proyek nanti
  const techNames = [
    "Next.js",
    "React",
    "TypeScript",
    "TailwindCSS",
    "Prisma",
    "PostgreSQL",
    "Node.js",
    "Framer Motion",
  ];

  const technologies: Record<string, number> = {};
  for (const name of techNames) {
    const tech = await prisma.technology.create({ data: { name } });
    technologies[name] = tech.id;
  }

  // Buat projects beserta relasi technology (image = null agar muncul placeholder)
  const project1 = await prisma.project.create({
    data: {
      title: "E-Commerce Dashboard",
      description:
        "A modern admin dashboard for managing products and orders. Built with Next.js, Prisma, and PostgreSQL.",
      image: null, // placeholder akan muncul
      githubUrl: "https://github.com/veryfirmansyah/ecommerce-dashboard",
      userId: user.id,
      technologies: {
        create: [
          { technologyId: technologies["Next.js"] },
          { technologyId: technologies["TypeScript"] },
          { technologyId: technologies["TailwindCSS"] },
          { technologyId: technologies["Prisma"] },
          { technologyId: technologies["PostgreSQL"] },
        ],
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: "Personal Blog",
      description:
        "A minimal blog with MDX support. Focused on performance and SEO.",
      image: null,
      githubUrl: "https://github.com/veryfirmansyah/personal-blog",
      userId: user.id,
      technologies: {
        create: [
          { technologyId: technologies["Next.js"] },
          { technologyId: technologies["React"] },
          { technologyId: technologies["TailwindCSS"] },
        ],
      },
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: "Weather App",
      description:
        "Simple weather application using React and OpenWeather API. Clean UI with loading and error states.",
      image: null,
      githubUrl: "https://github.com/veryfirmansyah/weather-app",
      userId: user.id,
      technologies: {
        create: [
          { technologyId: technologies["React"] },
          { technologyId: technologies["TypeScript"] },
          { technologyId: technologies["Framer Motion"] },
        ],
      },
    },
  });

  // Buat activities
  await prisma.activity.createMany({
    data: [
      { content: "Finished learning Prisma relationships" },
      { content: "Implemented dark mode with TailwindCSS" },
      { content: "Deployed first Next.js app to Vercel" },
      { content: "Completed TypeScript advanced patterns course" },
    ],
  });

  console.log("✅ Seeding selesai!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });