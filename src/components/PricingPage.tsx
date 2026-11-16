import { CheckCircle2, Coins, CreditCard, FileText, Sparkles } from 'lucide-react';
import { Lang, OrgPlan } from '../types/prototype';

interface PricingPageProps {
  lang: Lang;
  currentPlan: OrgPlan;
  onSelectPlan: (plan: OrgPlan) => void;
}

export function PricingPage({ lang, currentPlan, onSelectPlan }: PricingPageProps) {
  const isFr = lang === 'fr';

  const plans: {
    id: OrgPlan;
    price: string;
    audienceFr: string;
    audienceEn: string;
    featuresFr: string[];
    featuresEn: string[];
  }[] = [
    {
      id: 'Free',
      price: '0 MAD / mois',
      audienceFr: 'Pour tester ponctuellement',
      audienceEn: 'For occasional needs',
      featuresFr: [
        '150 MAD par offre rémunérée publiée',
        'Gratuit pour les offres associatives non rémunérées',
        'Suivi des candidatures et évaluations',
      ],
      featuresEn: [
        '150 MAD per paid mission published',
        'Free for unpaid association offers',
        'Applicant tracking and ratings',
      ],
    },
    {
      id: 'Pro',
      price: '490 MAD / mois',
      audienceFr: 'Pour PME et startups actives',
      audienceEn: 'For growing SMEs & startups',
      featuresFr: [
        'Publications illimitées incluses (0 MAD/offre)',
        'Mise en avant des missions auprès des débutants',
        'Outils de présélection et gestion des candidatures',
      ],
      featuresEn: [
        'Unlimited mission posts included (0 MAD/post)',
        'Featured placement for beginner talent',
        'Applicant shortlisting and workflow tools',
      ],
    },
    {
      id: 'Business',
      price: '1 190 MAD / mois',
      audienceFr: 'Pour recrutements récurrents & écoles',
      audienceEn: 'For recurring hiring & institutes',
      featuresFr: [
        'Multi-comptes équipe & publications illimitées',
        'Accès prioritaire aux portfolios vérifiés 5★',
        'Accompagnement dédié et facturation mensuelle',
      ],
      featuresEn: [
        'Multi-seat team access & unlimited posts',
        'Priority access to 5★ verified portfolios',
        'Dedicated support and monthly invoicing',
      ],
    },
  ];

  return (
    <section aria-labelledby="pricing-heading" className="space-y-8">
      <div className="space-y-1 border-b border-slate-200/80 pb-5">
        <p className="text-xs font-semibold text-[#967322] tracking-wide">
          {isFr ? 'Modèle économique durable' : 'Sustainable Business Model'}
        </p>
        <h1 id="pricing-heading" className="text-2xl sm:text-3xl font-extrabold text-[#1F3A68] tracking-tight">
          {isFr ? 'Comment ça marche / Tarifs' : 'How It Works / Pricing'}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          {isFr
            ? 'Un modèle économique à 3 leviers côté organisations, tout en garantissant la gratuité totale pour les jeunes.'
            : 'A 3-pillar revenue model on the organization side while keeping youth access 100% free.'}
        </p>
      </div>

      {/* Highlighted Youth Banner */}
      <div className="bg-[#1F3A68] text-white rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-white/10 text-[#E5C16C] inline-flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
          </span>
          <div className="space-y-0.5">
            <h2 className="text-base sm:text-lg font-bold">
              {isFr ? 'Toujours gratuit pour les jeunes.' : 'Always free for youth.'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200">
              {isFr
                ? 'Consultation des offres, candidatures et création du portfolio vérifié à 0 MAD pour les étudiants et jeunes diplômés.'
                : 'Browsing missions, applying, and building a verified portfolio cost 0 MAD for students and graduates.'}
            </p>
          </div>
        </div>
        <span className="font-mono text-xl font-bold text-[#E5C16C] tabular-nums">0 MAD</span>
      </div>

      {/* 3 Revenue Stream Cards */}
      <div className="bg-white border border-slate-200 rounded-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#C9A24B]">01</span>
            <Coins className="w-4.5 h-4.5 text-[#1F3A68]" aria-hidden="true" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {isFr ? 'Commissions sur les missions' : 'Mission Commissions'}
          </h3>
          <div className="font-mono text-2xl font-bold text-[#1F3A68] tabular-nums">10 %</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isFr
              ? 'Commission prélevée automatiquement lors du paiement sécurisé des missions rémunérées réalisées via chababexper.'
              : 'Automatically deducted during escrow checkout on paid missions completed via chababexper.'}
          </p>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#C9A24B]">02</span>
            <FileText className="w-4.5 h-4.5 text-[#967322]" aria-hidden="true" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {isFr ? 'Frais de publication' : 'Publication Fees'}
          </h3>
          <div className="font-mono text-2xl font-bold text-[#967322] tabular-nums">150 MAD</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isFr
              ? 'Frais unitaires payés par les organisations sans abonnement pour publier une offre rémunérée ciblant les débutants.'
              : 'Per-post fee paid by pay-as-you-go organizations publishing paid beginner missions.'}
          </p>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#C9A24B]">03</span>
            <CreditCard className="w-4.5 h-4.5 text-emerald-700" aria-hidden="true" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {isFr ? 'Abonnements professionnels' : 'Pro Subscriptions'}
          </h3>
          <div className="font-mono text-2xl font-bold text-emerald-700 tabular-nums">490–1 190 MAD</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isFr
              ? 'Formules mensuelles donnant accès aux publications illimitées, à la mise en avant et aux outils de gestion.'
              : 'Monthly plans unlocking unlimited mission posts, featured visibility, and applicant tools.'}
          </p>
        </div>
      </div>

      {/* Interactive Subscription Plans for Atlas Digital */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-[#1F3A68]">
            {isFr
              ? 'Abonnements professionnels (Atlas Digital)'
              : 'Organization Plans (Atlas Digital)'}
          </h2>
          <span className="text-xs font-medium text-slate-500">
            {isFr ? `Forfait actuel : ${currentPlan}` : `Active plan: ${currentPlan}`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const isSelected = currentPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between gap-5 transition-colors ${
                  isSelected
                    ? 'bg-[#1F3A68] text-white border-[#1F3A68]'
                    : 'bg-white text-slate-900 border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold">{plan.id}</span>
                    {plan.id === 'Pro' && (
                      <span className="text-[11px] font-semibold text-[#C9A24B]">
                        {isFr ? 'Recommandé' : 'Recommended'}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-2xl font-bold tabular-nums">{plan.price}</div>
                  <p className={`text-xs ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                    {isFr ? plan.audienceFr : plan.audienceEn}
                  </p>
                  <ul className="space-y-2.5 pt-3 border-t border-current/10 text-xs">
                    {(isFr ? plan.featuresFr : plan.featuresEn).map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSelected ? 'text-[#E5C16C]' : 'text-emerald-600'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-2.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#C9A24B] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-[#1F3A68]'
                  }`}
                >
                  {isSelected
                    ? isFr
                      ? 'Forfait actif'
                      : 'Active plan'
                    : isFr
                      ? `Tester le forfait ${plan.id}`
                      : `Switch to ${plan.id}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
