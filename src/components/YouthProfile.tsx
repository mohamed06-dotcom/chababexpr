import { useState } from 'react';
import { Award, Briefcase, CheckCircle2, MapPin, Star } from 'lucide-react';
import { Lang, YouthDemoAccount } from '../types/prototype';

interface YouthProfileProps {
  lang: Lang;
  youth: YouthDemoAccount;
  onUpdatePlacement: (status: 'none' | 'stage' | 'emploi') => void;
}

export function YouthProfile({
  lang,
  youth,
  onUpdatePlacement,
}: YouthProfileProps) {
  const isFr = lang === 'fr';
  const [avatarError, setAvatarError] = useState(false);

  const avgRating =
    youth.reviews.length > 0
      ? (
          youth.reviews.reduce((sum, r) => sum + r.rating, 0) / youth.reviews.length
        ).toFixed(1)
      : '—';

  return (
    <section aria-labelledby="profile-heading" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Profile Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="h-16 bg-[#1F3A68]" aria-hidden="true" />
          <div className="px-6 pb-6 -mt-10 space-y-5">
            <div className="space-y-3">
              {!avatarError ? (
                <img
                  src="/src/assets/images/avatar_youssef_student_1794826971274.jpg"
                  alt={youth.name}
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarError(true)}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-sm bg-slate-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-[#1F3A68] text-[#C9A24B] font-bold text-xl flex items-center justify-center border-4 border-white shadow-sm">
                  YE
                </div>
              )}
              <div>
                <h1 id="profile-heading" className="text-xl font-bold text-slate-900">
                  {youth.name}
                </h1>
                <p className="text-xs text-slate-500 inline-flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  {youth.city}, Maroc
                </p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="font-semibold text-[#1F3A68]">
                {isFr ? 'Formation' : 'Education'}
              </div>
              <p className="text-slate-700 leading-relaxed">{youth.education}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="font-semibold text-[#1F3A68]">
                {isFr ? 'Présentation' : 'Bio'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isFr ? youth.bio : youth.bioEn}
              </p>
            </div>

            {/* KPI Strip with Hairline Dividers */}
            <div className="grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-3.5 text-center tabular-nums">
              <div className="px-2">
                <div className="text-[11px] text-slate-500">
                  {isFr ? 'Missions' : 'Missions'}
                </div>
                <div className="font-mono text-base font-bold text-[#1F3A68] mt-0.5">
                  {youth.reviews.length}
                </div>
              </div>
              <div className="px-2">
                <div className="text-[11px] text-slate-500">
                  {isFr ? 'Note moy.' : 'Avg rating'}
                </div>
                <div className="font-mono text-base font-bold text-[#967322] mt-0.5">
                  {avgRating === '—' ? '—' : `${avgRating}/5`}
                </div>
              </div>
              <div className="px-2">
                <div className="text-[11px] text-slate-500">
                  {isFr ? 'Revenus' : 'Earned'}
                </div>
                <div className="font-mono text-base font-bold text-emerald-700 mt-0.5">
                  {youth.totalEarnedMad} MAD
                </div>
              </div>
            </div>

            {/* Placement Milestone Toggle */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-900 inline-flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#1F3A68]" aria-hidden="true" />
                {isFr
                  ? 'J’ai obtenu un stage / un emploi'
                  : 'I obtained an internship / job'}
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: 'none', labelFr: 'En recherche', labelEn: 'Seeking' },
                    { id: 'stage', labelFr: 'Stage obtenu', labelEn: 'Internship' },
                    { id: 'emploi', labelFr: 'Emploi obtenu', labelEn: 'Job secured' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onUpdatePlacement(opt.id)}
                    className={`px-2 py-2 text-[11px] font-semibold rounded-lg border transition-colors cursor-pointer ${
                      youth.placementStatus === opt.id
                        ? 'bg-[#1F3A68] text-white border-[#1F3A68]'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isFr ? opt.labelFr : opt.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Portfolio, Skills, Badges & Reviews */}
        <div className="lg:col-span-8 space-y-6">
          {/* Acquired Skills & Badges */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <div className="space-y-3">
              <h2 className="text-base font-bold text-[#1F3A68]">
                {isFr ? 'Compétences acquises via les missions' : 'Skills Acquired via Missions'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {youth.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-3">
              <h2 className="text-base font-bold text-[#1F3A68]">
                {isFr ? 'Badges vérifiés obtenus' : 'Verified Earned Badges'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {youth.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50/70 border border-[#C9A24B]/40 text-[#8F6B1E] text-xs font-semibold"
                  >
                    <Award className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Completed Missions & Evaluations */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-[#1F3A68]">
              {isFr
                ? 'Historique des missions réalisées & évaluations'
                : 'Completed Missions & Organization Evaluations'}
            </h2>

            {youth.reviews.length === 0 ? (
              <p className="text-sm text-slate-500">
                {isFr
                  ? 'Aucune mission terminée pour le moment.'
                  : 'No completed missions yet.'}
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {youth.reviews.map((rev) => (
                  <article key={rev.id} className="py-4 first:pt-1 last:pb-1 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {rev.missionTitle}
                        </h3>
                        <p className="text-xs text-slate-500 tabular-nums">
                          {rev.orgName} · {rev.date}
                          {rev.amountMad > 0 ? ` · +${rev.amountMad} MAD net` : ''}
                        </p>
                      </div>

                      <div
                        aria-label={`Note ${rev.rating} sur 5`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50/80 border border-[#C9A24B]/30 text-[#8F6B1E] font-mono text-xs font-bold tabular-nums"
                      >
                        <Star
                          className="w-3.5 h-3.5 fill-[#C9A24B] text-[#C9A24B]"
                          aria-hidden="true"
                        />
                        {rev.rating}/5
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      “{rev.comment}”
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
