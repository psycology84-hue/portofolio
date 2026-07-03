// src/components/AboutSection.tsx
import ScrollReveal from "./ScrollReveal";

interface AboutProps {
  bio: string;
}

export default function AboutSection({ bio }: AboutProps) {
  return (
    <section id="about" className="py-20 px-4">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto glass p-8 sm:p-10">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {bio}
          </p>
          {/* Bisa tambahkan ketertarikan & tujuan dari data lain jika ada */}
        </div>
      </ScrollReveal>
    </section>
  );
}