import { useState } from 'react';
import { Award, CheckCircle2, Clock, Play, Star, XCircle } from 'lucide-react';
import {
  ApplicationStatus,
  Lang,
  MissionApplication,
  MissionItem,
} from '../types/prototype';

interface MyApplicationsProps {
  lang: Lang;
  youthId: string;
  missions: MissionItem[];
  applications: MissionApplication[];
  onConfirmCompletion: (appId: string) => void;
  onBrowseMissions: () => void;
}

const ALL_STATUSES: ('Toutes' | ApplicationStatus)[] = [
  'Toutes',
  'En attente',
  'Acceptée',
  'En cours',
  'Terminée',
  'Refusée',
];

const TRACKER_STEPS: ApplicationStatus[] = [
  'En attente',
  'Acceptée',
  'En cours',
  'Terminée',
];

export function MyApplications({
  lang,
  youthId,
  missions,
  applications,
  onConfirmCompletion,
  onBrowseMissions,
}: MyApplicationsProps) {
  const isFr = lang === 'fr';
  const [statusFilter, setStatusFilter] = useState<'Toutes' | ApplicationStatus>('Toutes');

  const myApps = applications.filter((a) => a.applicantId === youthId);
  const filtered =
    statusFilter === 'Toutes'
      ? myApps
      : myApps.filter((a) => a.status === statusFilter);

  const getChipClass = (status: ApplicationStatus) => {
    switch (status) {
      case 'En attente':
        return 'bg-amber-50 text-amber-800 border-amber-300'; // orange
      case 'Acceptée':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300'; // green
      case 'Refusée':
        return 'bg-red-50 text-red-800 border-red-300'; // red
      case 'En cours':
        return 'bg-sky-50 text-sky-800 border-sky-300'; // blue
      case 'Terminée':
        return 'bg-amber-100/80 text-[#8F6B1E] border-[#C9A24B]'; // gold
    }
  };

  const getChipIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'En attente':
        return <Clock className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'Acceptée':
        return <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'Refusée':
        return <XCircle className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'En cours':
        return <Play className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'Terminée':
        return <Award className="w-3.5 h-3.5" aria-hidden="true" />;
    }
  };

  return (
    <section aria-labelledby="apps-heading" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#967322] tracking-wide">
            {isFr ? 'Suivi en temps réel · 5 statuts' : 'Real-time Tracking · 5 Statuses'}
          </p>
          <h1 id="apps-heading" className="text-2xl sm:text-3xl font-extrabold text-[#1F3A68] tracking-tight">
            {isFr ? 'Mes candidatures & suivi' : 'My Applications & Tracking'}
          </h1>
          <p className="text-sm text-slate-600">
            {isFr
              ? 'Suivez chaque étape en toute transparence, sans candidatures laissées sans réponse.'
              : 'Follow every stage transparently with real-time status updates.'}
          </p>
        </div>

        {/* Status Filter Segmented Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200/80 rounded-xl flex-wrap">
          {ALL_STATUSES.map((st) => {
            const count =
              st === 'Toutes'
                ? myApps.length
                : myApps.filter((a) => a.status === st).length;
            const active = statusFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap tabular-nums ${
                  active
                    ? 'bg-white text-[#1F3A68] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'Toutes' && !isFr ? 'All' : st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
          <p className="text-sm font-medium text-slate-700">
            {isFr
              ? 'Aucune candidature dans cette catégorie pour le moment.'
              : 'No applications in this status yet.'}
          </p>
          <button
            type="button"
            onClick={onBrowseMissions}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3A68] rounded-lg cursor-pointer"
          >
            {isFr ? 'Découvrir les missions' : 'Browse missions'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => {
            const mission = missions.find((m) => m.id === app.missionId);
            if (!mission) return null;
            const currentStepIdx = TRACKER_STEPS.indexOf(app.status);

            return (
              <article
                key={app.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#967322]">
                      {mission.orgName} · {mission.city} · {mission.type}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {isFr ? mission.title : mission.titleEn}
                    </h2>
                    <p className="text-xs text-slate-500 tabular-nums">
                      {isFr ? `Postulé : ${app.appliedAt}` : `Applied: ${app.appliedAt}`} ·{' '}
                      {mission.paid
                        ? `${mission.budgetMad} MAD`
                        : isFr
                          ? 'Non rémunérée'
                          : 'Unpaid'}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold transition-all ${getChipClass(
                      app.status
                    )}`}
                  >
                    {getChipIcon(app.status)}
                    {app.status}
                  </span>
                </div>

                {/* Connected Progress Stepper */}
                {app.status !== 'Refusée' ? (
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-1">
                    {TRACKER_STEPS.map((step, idx) => {
                      const reached = currentStepIdx >= idx;
                      const isFinal = step === 'Terminée';
                      return (
                        <div key={step} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-5 h-5 rounded-full text-[11px] font-mono font-bold flex items-center justify-center shrink-0 transition-colors ${
                                reached
                                  ? isFinal
                                    ? 'bg-[#C9A24B] text-white'
                                    : 'bg-[#1F3A68] text-white'
                                  : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <div
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                reached
                                  ? isFinal
                                    ? 'bg-[#C9A24B]'
                                    : 'bg-[#1F3A68]'
                                  : 'bg-slate-200'
                              }`}
                            />
                          </div>
                          <div
                            className={`text-xs font-medium ${
                              reached ? 'text-slate-900 font-semibold' : 'text-slate-400'
                            }`}
                          >
                            {step}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-red-700 bg-red-50 border border-red-200/70 rounded-xl px-4 py-2.5">
                    {isFr
                      ? 'Cette candidature n’a pas été retenue. Vous pouvez postuler gratuitement à d’autres missions.'
                      : 'Application not selected. Feel free to apply to other beginner missions.'}
                  </p>
                )}

                {/* Bottom Actions & Payment / Evaluation Summary */}
                <div className="pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="space-y-1 text-slate-600 tabular-nums">
                    {app.paidThroughPlatform && (
                      <p className="font-semibold text-emerald-700">
                        {isFr
                          ? `Paiement reçu via chababexper : +${app.netYouthMad} MAD net (commission 10 % : ${app.commissionMad} MAD)`
                          : `Paid via chababexper: +${app.netYouthMad} MAD net`}
                      </p>
                    )}
                    {app.rating !== null && (
                      <p className="inline-flex items-center gap-1.5 text-slate-800 font-medium">
                        <Star
                          className="w-3.5 h-3.5 fill-[#C9A24B] text-[#C9A24B]"
                          aria-hidden="true"
                        />
                        <span className="font-mono font-bold">{app.rating}/5</span> — “{app.orgComment}”
                      </p>
                    )}
                  </div>

                  {(app.status === 'Terminée' || app.status === 'En cours') && (
                    <div>
                      {app.youthConfirmed ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          {isFr ? 'Réalisation confirmée par vous' : 'Completion confirmed'}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onConfirmCompletion(app.id)}
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3A68] hover:bg-[#162b4f] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          {isFr ? 'Confirmer la réalisation' : 'Confirm completion'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
