import { useState } from 'react';
import {
  ArrowRight,
  Check,
  GraduationCap,
  Minus,
  ShieldCheck,
} from 'lucide-react';
import { Lang } from '../types/prototype';

interface LandingPageProps {
  lang: Lang;
  onSeekMission: () => void;
  onPublishMission: () => void;
  onOpenPricing: () => void;
}

export function LandingPage({
  lang,
  onSeekMission,
  onPublishMission,
  onOpenPricing,
}: LandingPageProps) {
  const isFr = lang === 'fr';
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const steps = [
    {
      num: '01',
      title: isFr ? 'Jeunes' : 'Youth',
      desc: isFr
        ? 'Étudiants, jeunes diplômés et débutants sans expérience préalable.'
        : 'Students, graduates, and newcomers with zero prior experience.',
    },
    {
      num: '02',
      title: isFr ? 'Plateforme numérique' : 'Digital Platform',
      desc: isFr
        ? 'Missions courtes accessibles, suivi transparent et paiement sécurisé.'
        : 'Beginner-friendly missions, transparent tracking, and escrow pay.',
    },
    {
      num: '03',
      title: isFr ? 'Opportunités de stage & d’emploi' : 'Internships & Jobs',
      desc: isFr
        ? 'Des PME, startups et associations confient des tâches concrètes.'
        : 'SMEs, startups, and associations post scoped practical tasks.',
    },
    {
      num: '04',
      title: isFr ? 'Meilleure insertion professionnelle' : 'Career Insertion',
      desc: isFr
        ? 'Portfolio vérifié, évaluations réelles et accès au premier emploi.'
        : 'Verified portfolio, real ratings, and a bridge to a first job.',
    },
  ];

  const hcpStats = [
    {
      label: isFr ? 'Chômage national' : 'National unemployment',
      value: '9,5 %',
      numeric: 9.5,
      sub: isFr ? 'T2 2026 (10,8 % au T1 2026)' : 'Q2 2026 (10.8% in Q1 2026)',
      barColor: 'bg-[#1F3A68]',
      valueColor: 'text-[#1F3A68]',
    },
    {
      label: isFr ? 'Jeunes 15–24 ans' : 'Youth aged 15–24',
      value: '27,2 %',
      numeric: 27.2,
      sub: isFr ? 'Catégorie la plus exposée' : 'Most affected group',
      barColor: 'bg-[#B91C1C]',
      valueColor: 'text-[#B91C1C]',
    },
    {
      label: isFr ? 'Femmes' : 'Women',
      value: '14,8 %',
      numeric: 14.8,
      sub: isFr ? 'Écart structurel marqué' : 'Higher than men',
      barColor: 'bg-[#C9A24B]',
      valueColor: 'text-[#967322]',
    },
    {
      label: isFr ? 'Hommes' : 'Men',
      value: '8,1 %',
      numeric: 8.1,
      sub: 'Source : HCP Maroc',
      barColor: 'bg-slate-500',
      valueColor: 'text-slate-900',
    },
  ];

  const competitors: {
    name: string;
    highlight?: boolean;
    beginner: boolean | 'partial';
    tracking: boolean | 'partial';
    portfolio: boolean | 'partial';
    escrow: boolean | 'partial';
    ratings: boolean | 'partial';
  }[] = [
    {
      name: 'chababexper',
      highlight: true,
      beginner: true,
      tracking: true,
      portfolio: true,
      escrow: true,
      ratings: true,
    },
    {
      name: 'Stagiaires.ma',
      beginner: 'partial',
      tracking: 'partial',
      portfolio: false,
      escrow: false,
      ratings: false,
    },
    {
      name: 'Rekrute',
      beginner: false,
      tracking: 'partial',
      portfolio: false,
      escrow: false,
      ratings: false,
    },
    {
      name: 'LinkedIn',
      beginner: false,
      tracking: 'partial',
      portfolio: 'partial',
      escrow: false,
      ratings: false,
    },
    {
      name: 'StuLance',
      beginner: 'partial',
      tracking: 'partial',
      portfolio: true,
      escrow: 'partial',
      ratings: 'partial',
    },
    {
      name: isFr ? 'Candidatures directes' : 'Direct applications',
      beginner: false,
      tracking: false,
      portfolio: false,
      escrow: false,
      ratings: false,
    },
  ];

  const renderCell = (val: boolean | 'partial', isMain?: boolean) => {
    if (val === true) {
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold ${
            isMain ? 'text-emerald-700' : 'text-slate-700'
          }`}
        >
          <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
          {isFr ? 'Oui' : 'Yes'}
        </span>
      );
    }
    if (val === 'partial') {
      return (
        <span className="inline-flex items-center gap-1.5 text-amber-700 font-medium">
          <Minus className="w-4 h-4 shrink-0" aria-hidden="true" />
          {isFr ? 'Partiel' : 'Partial'}
        </span>
      );
    }
    return <span className="text-slate-400">{isFr ? 'Non' : 'No'}</span>;
  };

  return (
    <div className="space-y-14 pb-8">
      {/* 1. Editorial Hero Split */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 py-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#967322] tracking-wide">
                {isFr
                  ? 'Maroc · Étudiants, Jeunes Diplômés & PME'
                  : 'Morocco · Students, Graduates & SMEs'}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F3A68] tracking-tight leading-[1.1] [text-wrap:balance]">
                {isFr
                  ? 'Ta première expérience commence ici.'
                  : 'Your first experience starts here.'}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {isFr
                  ? 'chababexper connecte les jeunes sans expérience professionnelle aux PME, startups et associations marocaines grâce à des missions pratiques encadrées, des stages et des premiers emplois.'
                  : 'chababexper connects Moroccan youth without prior experience to SMEs, startups, and associations through practical short missions, internships, and first jobs.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onSeekMission}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1F3A68] hover:bg-[#162b4f] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {isFr ? 'Je cherche une mission' : 'Find a mission'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onPublishMission}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#1F3A68] bg-white hover:bg-amber-50/70 border border-slate-300 hover:border-[#C9A24B] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {isFr ? 'Je publie une mission' : 'Post a mission'}
              </button>
              <button
                type="button"
                onClick={onOpenPricing}
                className="px-2 py-2 text-sm font-medium text-slate-600 hover:text-[#1F3A68] underline-offset-4 hover:underline cursor-pointer whitespace-nowrap shrink-0"
              >
                {isFr ? 'Modèle & Tarifs' : 'Model & Pricing'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200 bg-[#1F3A68] min-h-[280px] sm:min-h-[360px]">
            {!heroImgFailed ? (
              <img
                src="/src/assets/images/hero_moroccan_youth_1794826971060.jpg"
                alt={
                  isFr
                    ? 'Jeunes diplômés marocains collaborant sur des missions pratiques en entreprise'
                    : 'Young Moroccan graduates collaborating on practical company missions'
                }
                referrerPolicy="no-referrer"
                onError={() => setHeroImgFailed(true)}
                className="w-full h-full object-cover lg:absolute lg:inset-0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8 text-white">
                <GraduationCap className="w-16 h-16 text-[#C9A24B]" aria-hidden="true" />
              </div>
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0F203D]/90 via-[#0F203D]/25 to-transparent"
            />
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white flex flex-wrap items-end justify-between gap-3">
              <div className="space-y-1 max-w-md">
                <p className="text-xs font-semibold text-[#E5C16C]">
                  {isFr ? 'Casablanca · Rabat · Salé · Tanger · Marrakech' : 'Casablanca · Rabat · Salé · Tangier · Marrakech'}
                </p>
                <p className="text-sm sm:text-base font-semibold leading-snug">
                  {isFr
                    ? 'Des missions de 3 à 30 jours pour bâtir un portfolio vérifié dès l’université.'
                    : '3 to 30-day missions to build a verified portfolio straight from university.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/20 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5C16C]" aria-hidden="true" />
                {isFr ? '0 MAD pour les jeunes' : '0 MAD for youth'}
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width Key Proof Strip */}
        <div className="bg-white border border-slate-200 rounded-xl grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 tabular-nums">
          <div className="p-4 sm:px-6 sm:py-5 space-y-1">
            <div className="text-xs font-medium text-slate-500">
              {isFr ? 'Accès jeunes' : 'Youth access'}
            </div>
            <div className="font-mono text-2xl font-bold text-[#1F3A68]">0 MAD</div>
            <div className="text-xs text-slate-500">
              {isFr ? 'Candidatures & portfolio gratuits' : 'Free applications & portfolio'}
            </div>
          </div>
          <div className="p-4 sm:px-6 sm:py-5 space-y-1">
            <div className="text-xs font-medium text-slate-500">
              {isFr ? 'Missions actives (démo)' : 'Active missions (demo)'}
            </div>
            <div className="font-mono text-2xl font-bold text-[#1F3A68]">13</div>
            <div className="text-xs text-slate-500">
              {isFr ? 'PME, startups & associations' : 'SMEs, startups & associations'}
            </div>
          </div>
          <div className="p-4 sm:px-6 sm:py-5 space-y-1">
            <div className="text-xs font-medium text-slate-500">
              {isFr ? 'Suivi transparent' : 'Transparent tracking'}
            </div>
            <div className="font-mono text-2xl font-bold text-[#1F3A68]">5 statuts</div>
            <div className="text-xs text-slate-500">
              {isFr ? 'Aucune candidature ignorée' : 'Zero ghosted applications'}
            </div>
          </div>
          <div className="p-4 sm:px-6 sm:py-5 space-y-1">
            <div className="text-xs font-medium text-slate-500">
              {isFr ? 'Paiement sécurisé' : 'Protected payout'}
            </div>
            <div className="font-mono text-2xl font-bold text-[#967322]">10 %</div>
            <div className="text-xs text-slate-500">
              {isFr ? 'Commission plateforme transparente' : 'Transparent platform fee'}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem & Solution Contrast */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="bg-[#1F3A68] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-4">
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-[#E5C16C]">
              {isFr ? 'Le constat terrain' : 'The Core Barrier'}
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              {isFr ? '« Pas d’expérience, pas de réponse »' : '“No experience, no reply”'}
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              {isFr
                ? 'Les offres classiques exigent 2 à 3 ans d’expérience dès la sortie d’école. Les jeunes restent bloqués dans un cercle vicieux sans première référence à présenter.'
                : 'Conventional listings demand 2–3 years of experience right out of university, trapping graduates in a catch-22 without a single verifiable reference.'}
            </p>
          </div>
          <p className="text-xs text-slate-300 border-t border-white/15 pt-4">
            {isFr
              ? 'Résultat : des milliers de candidatures envoyées sans retour et une perte de confiance dès le début de carrière.'
              : 'Result: hundreds of unanswered applications and stalled early career momentum.'}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-4">
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-[#967322]">
              {isFr ? 'La réponse chababexper' : 'The chababexper Mechanism'}
            </span>
            <h2 className="text-2xl font-bold text-[#1F3A68] tracking-tight">
              {isFr
                ? 'Des missions courtes calibrées pour débuter'
                : 'Scoped starter missions built for newcomers'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isFr
                ? 'Les PME, startups et associations marocaines confient des besoins concrets et bien délimités. Chaque mission terminée alimente le portfolio du jeune avec une note et un avis vérifié.'
                : 'Moroccan SMEs, startups, and associations delegate clearly scoped practical tasks. Every completed mission builds a rated, organization-verified portfolio.'}
            </p>
          </div>
          <p className="text-xs text-slate-500 border-t border-slate-100 pt-4">
            {isFr
              ? 'Double confirmation de réalisation · Règlement sécurisé · Badge d’insertion professionnelle'
              : 'Dual completion confirmation · Escrow protection · Job & internship placement badge'}
          </p>
        </div>
      </section>

      {/* 3. Connected 4-Step Flow */}
      <section aria-labelledby="flow-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 id="flow-heading" className="text-xl font-bold text-[#1F3A68]">
              {isFr ? 'Comment fonctionne chababexper ?' : 'How chababexper Works'}
            </h2>
            <p className="text-sm text-slate-600">
              {isFr
                ? 'Un parcours linéaire en 4 étapes pour transformer la formation en expérience vérifiée.'
                : 'A clear 4-step journey turning academic training into verified work experience.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {steps.map((step, idx) => (
            <div key={step.num} className={`${idx > 0 ? 'lg:pl-6' : ''} ${idx < 3 ? 'lg:pr-6' : ''} space-y-2.5`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#C9A24B] tabular-nums">
                  {step.num}
                </span>
                {idx < 3 && (
                  <ArrowRight className="hidden lg:inline w-4 h-4 text-slate-300" aria-hidden="true" />
                )}
              </div>
              <h3 className="text-sm font-bold text-[#1F3A68]">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HCP Stats Section (Institutional Clean Bars) */}
      <section aria-labelledby="stats-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 id="stats-heading" className="text-xl font-bold text-[#1F3A68]">
              {isFr ? 'Pourquoi agir maintenant au Maroc ?' : 'Moroccan Labor Market Reality'}
            </h2>
            <p className="text-sm text-slate-600">
              {isFr
                ? 'Le chômage des 15–24 ans dépasse près de trois fois la moyenne nationale.'
                : 'Youth unemployment (15–24) stands at nearly three times the national average.'}
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {isFr ? 'Source : Haut-Commissariat au Plan (HCP)' : 'Source: HCP Morocco'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {hcpStats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`${idx > 0 ? 'lg:pl-6' : ''} ${idx < 3 ? 'lg:pr-6' : ''} space-y-2.5 tabular-nums`}
            >
              <div className="text-xs font-semibold text-slate-600">{stat.label}</div>
              <div className={`font-mono text-3xl font-bold ${stat.valueColor}`}>{stat.value}</div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${stat.barColor}`}
                  style={{ width: `${Math.min(100, (stat.numeric / 30) * 100)}%` }}
                />
              </div>
              <div className="text-xs text-slate-500">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Competitor Comparison Table */}
      <section aria-labelledby="compare-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 overflow-x-auto">
        <div className="space-y-1">
          <h2 id="compare-heading" className="text-xl font-bold text-[#1F3A68]">
            {isFr
              ? 'Positionnement face aux solutions existantes'
              : 'Comparison with Existing Platforms'}
          </h2>
          <p className="text-sm text-slate-600">
            {isFr
              ? 'Ce qui distingue chababexper des portails d’emploi et de freelance généralistes.'
              : 'What sets chababexper apart from traditional job boards and freelance marketplaces.'}
          </p>
        </div>

        <table className="w-full text-sm border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-200 text-xs text-slate-500">
              <th className="text-left py-3 pr-4 font-semibold">
                {isFr ? 'Solution' : 'Platform'}
              </th>
              <th className="text-left py-3 pr-4 font-semibold">
                {isFr ? 'Missions débutants' : 'Beginner missions'}
              </th>
              <th className="text-left py-3 pr-4 font-semibold">
                {isFr ? 'Suivi candidatures' : 'Application tracking'}
              </th>
              <th className="text-left py-3 pr-4 font-semibold">
                {isFr ? 'Portfolio vérifié' : 'Verified portfolio'}
              </th>
              <th className="text-left py-3 pr-4 font-semibold">
                {isFr ? 'Paiement sécurisé' : 'Secure payment'}
              </th>
              <th className="text-left py-3 font-semibold">
                {isFr ? 'Évaluations' : 'Ratings'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {competitors.map((c) => (
              <tr
                key={c.name}
                className={
                  c.highlight
                    ? 'bg-[#1F3A68]/[0.05] font-semibold'
                    : 'hover:bg-slate-50/70 transition-colors'
                }
              >
                <td className="py-3.5 pr-4 font-bold text-[#1F3A68] whitespace-nowrap">
                  {c.name}
                </td>
                <td className="py-3.5 pr-4">{renderCell(c.beginner, c.highlight)}</td>
                <td className="py-3.5 pr-4">{renderCell(c.tracking, c.highlight)}</td>
                <td className="py-3.5 pr-4">{renderCell(c.portfolio, c.highlight)}</td>
                <td className="py-3.5 pr-4">{renderCell(c.escrow, c.highlight)}</td>
                <td className="py-3.5">{renderCell(c.ratings, c.highlight)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
