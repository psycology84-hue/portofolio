import ScrollReveal from "./ScrollReveal";

// Tipe data sederhana
type SkillData = {
  id: number;
  name: string;
  category: string;
  level: number;
};

interface SkillsProps {
  skills: SkillData[];
}

export default function SkillsSection({ skills }: SkillsProps) {
  // Group by category
  const grouped = skills.reduce<Record<string, SkillData[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-12">
            Skills & Technologies
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(grouped).map(([category, skillsInCat]) => (
            <ScrollReveal key={category} className="h-full">
              <div className="glass p-6 h-full">
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {skillsInCat.map((skill) => (
                    <li key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}