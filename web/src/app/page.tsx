'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { PlaygroundSection } from '@/components/playground/PlaygroundSection';
import { Language } from '@/lib/constants';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'vi' : 'en'));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      <HeroSection lang={lang} onToggleLang={toggleLanguage} />
      <main className="flex-1 flex flex-col justify-center py-6 md:py-10">
        <PlaygroundSection lang={lang} onToggleLang={toggleLanguage} />
      </main>
    </div>
  );
}
