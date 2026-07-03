import ScrollReveal from "./ScrollReveal";

type ActivityData = {
  id: number;
  content: string;
  createdAt: string;
};

interface ActivityProps {
  activities: ActivityData[];
}

export default function ActivitySection({ activities }: ActivityProps) {
  return (
    <section id="activity" className="py-20 px-4 bg-zinc-100/50 dark:bg-zinc-900/50">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-12">
            Recent Activity
          </h2>
        </ScrollReveal>
        <div className="space-y-4">
          {activities.map((activity) => (
            <ScrollReveal key={activity.id}>
              <div className="glass p-4 flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shrink-0" />
                <div>
                  <p className="text-zinc-800 dark:text-zinc-200">
                    {activity.content}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {new Date(activity.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
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