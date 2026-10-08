import { PlaygroundSection } from "@/components/playground/PlaygroundSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      <main className="flex-1 flex flex-col justify-center py-10">
        <PlaygroundSection initialLang="en" />
      </main>
    </div>
  );
}
