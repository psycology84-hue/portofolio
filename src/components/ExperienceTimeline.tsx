import ScrollReveal from "./ScrollReveal";

type ExperienceData = {
  id: number;
  title: string;
  description: string;
  year: number;
};

interface ExperienceProps {
  experiences: ExperienceData[];
}

export default function ExperienceTimeline({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 px-4 bg-zinc-100/50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
        </ScrollReveal>
        <div className="relative border-l-2 border-indigo-500/30 dark:border-indigo-400/30 ml-3">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id}>
              <div className="mb-10 ml-8">
                <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-zinc-900" />
                <div className="glass p-5 ml-4">
                  <span className="text-sm font-bold text-indigo-500">
                    {exp.year}
                  </span>
                  <h3 className="text-xl font-semibold mt-1">{exp.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                    {exp.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}