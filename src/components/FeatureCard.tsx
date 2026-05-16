import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <article className="group rounded-2xl border border-white/15 bg-white/5 p-6 shadow-glow backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-indigo-300/40 hover:bg-white/10">
      <div className="mb-4 inline-flex rounded-xl bg-indigo-500/20 p-3 text-indigo-200">
        <Icon size={22} />
      </div>
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
    </article>
  );
}
