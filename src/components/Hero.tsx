// src/components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  name: string;
  bio: string;
  profileImage: string;
}

export default function Hero({ name, bio, profileImage }: HeroProps) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <Image
            src={profileImage || "/images/profile-placeholder.jpg"}
            alt={name}
            fill
            className="rounded-full object-cover border-4 border-indigo-500/50 shadow-xl"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
          {bio}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="#projects"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-all hover:scale-105 shadow-lg shadow-indigo-500/25"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}