'use client';

import React from 'react';
import { ShieldCheck, Cpu, Braces, Zap } from 'lucide-react';
import { I18N_STRINGS, Language } from '@/lib/constants';

interface FeaturesSectionProps {
  lang: Language;
}

export function FeaturesSection({ lang }: FeaturesSectionProps) {
  const t = I18N_STRINGS[lang];

  const features = [
    {
      icon: ShieldCheck,
      title: t.featurePrivacyTitle,
      description: t.featurePrivacyDesc,
      tag: t.featureTag1,
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    },
    {
      icon: Cpu,
      title: t.featureAddonTitle,
      description: t.featureAddonDesc,
      tag: t.featureTag2,
      badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    },
    {
      icon: Braces,
      title: t.featureEnvelopeTitle,
      description: t.featureEnvelopeDesc,
      tag: t.featureTag3,
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    },
    {
      icon: Zap,
      title: t.featureSpeedTitle,
      description: t.featureSpeedDesc,
      tag: t.featureTag4,
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    },
  ];

  return (
    <section id="features" className="py-20 border-b border-zinc-800/80 bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-zinc-700 bg-zinc-900/80 text-zinc-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {t.featuresBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
            {t.featuresHeading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            {t.featuresSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-black/40"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-emerald-400 group-hover:border-emerald-500/40 group-hover:scale-105 transition-all">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span
                    className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${feature.badgeColor}`}
                  >
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2 group-hover:text-emerald-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
