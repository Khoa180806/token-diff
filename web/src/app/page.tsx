'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { PlaygroundSection } from '@/components/playground/PlaygroundSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { CliDemoSection } from '@/components/sections/CliDemoSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { Language } from '@/lib/constants';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');

  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'vi' : 'en'));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      <main className="flex-1 flex flex-col">
        <HeroSection lang={lang} onExplorePlayground={scrollToPlayground} />
        <PlaygroundSection lang={lang} onToggleLang={toggleLanguage} />
        <FeaturesSection lang={lang} />
        <CliDemoSection lang={lang} />
        <UseCasesSection lang={lang} />
        <EcosystemSection lang={lang} />
      </main>
      <FooterSection lang={lang} />
    </div>
  );
}
