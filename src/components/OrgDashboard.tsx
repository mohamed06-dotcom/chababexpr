import { useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Star,
  Users,
  X,
} from 'lucide-react';
import {
  calculatePaymentBreakdown,
  CreateMissionPayload,
  getPublicationFeeForPlan,
} from '../data/chababexperStore';
import {
  Lang,
  MissionApplication,
  MissionCategory,
  MissionItem,
  MissionType,
  OrgPlan,
} from '../types/prototype';

interface OrgDashboardProps {
  lang: Lang;
  orgPlan: OrgPlan;
  missions: MissionItem[];
  applications: MissionApplication[];
  onPublishMission: (payload: CreateMissionPayload) => string | null;
  onDecideApplication: (appId: string, decision: 'Acceptée' | 'Refusée') => void;
  onStartMission: (appId: string) => void;
  onPayMission: (appId: string) => void;
  onCompleteAndRate: (appId: string, rating: number, comment: string) => void;
}

export function OrgDashboard({
  lang,
  orgPlan,
  missions,
  applications,
  onPublishMission,
  onDecideApplication,
  onStartMission,
  onPayMission,
  onCompleteAndRate,
}: OrgDashboardProps) {
  const isFr = lang === 'fr';

  // Publish Mission Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MissionCategory>('Marketing');
  const [type, setType] = useState<MissionType>('Mission courte');
  const [city, setCity] = useState('Casablanca');
  const [durationDays, setDurationDays] = useState(7);
  const [paid, setPaid] = useState(true);
  const [budgetMad, setBudgetMad] = useState(1000);
  const [skillsText, setSkillsText] = useState('Canva, Rédaction');
  const [formError, setFormError] = useState<string | null>(null);

  // Payment Checkout Modal State
  const [checkoutApp, setCheckoutApp] = useState<MissionApplication | null>(null);

  // Rating Form State per application
  const [ratingTargetId, setRatingTargetId] = useState<string | null>(null);
  const [ratingScore, setRatingScore] = useState<number>(5);
  const [ratingComment, setRatingComment] = useState<string>('');

  const orgMissions = missions.filter((m) => m.orgName === 'Atlas Digital');
  const orgMissionIds = new Set(orgMissions.map((m) => m.id));
  const orgApps = applications.filter((a) => orgMissionIds.has(a.missionId));
  const activeOrDoneApps = orgApps.filter(
    (a) => a.status === 'En cours' || a.status === 'Terminée'
  ).length;
  const liveFee = getPublicationFeeForPlan(orgPlan, paid);

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const err = onPublishMission({
      title,
      description,
      category,
      type,
      city,
      durationDays: Number(durationDays),
      paid,
      budgetMad: Number(budgetMad),
      skillsText,
    });
    if (err) {
      setFormError(err);
      return;
    }
    setTitle('');
    setDescription('');
  };

  const checkoutMission = checkoutApp
    ? missions.find((m) => m.id === checkoutApp.missionId)
    : null;
  const checkoutBreakdown = checkoutMission
    ? calculatePaymentBreakdown(checkoutMission.budgetMad)
    : null;

  const getInitials = (name: string) =>
    name
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();

  return (
    <section aria-labelledby="org-dash-heading" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#967322] tracking-wide">
            {isFr ? 'Espace Organisation · PME' : 'Organization Workspace · SME'}
          </p>
          <h1 id="org-dash-heading" className="text-2xl sm:text-3xl font-extrabold text-[#1F3A68] tracking-tight">
            {isFr ? 'Tableau de bord — Atlas Digital' : 'Organization Dashboard — Atlas Digital'}
          </h1>
          <p className="text-sm text-slate-600">
            {isFr
              ? 'Publiez vos besoins pratiques, sélectionnez un jeune débutant et réglez via chababexper.'
              : 'Publish starter missions, accept candidates, and settle escrow payments via chababexper.'}
          </p>
        </div>
      </div>

      {/* Organization Summary Strip */}
      <div className="bg-white border border-slate-200 rounded-xl grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 tabular-nums">
        <div className="p-4 sm:px-6 sm:py-4 space-y-0.5">
          <div className="text-xs text-slate-500">
            {isFr ? 'Missions publiées' : 'Published missions'}
          </div>
          <div className="font-mono text-2xl font-bold text-[#1F3A68]">{orgMissions.length}</div>
        </div>
        <div className="p-4 sm:px-6 sm:py-4 space-y-0.5">
          <div className="text-xs text-slate-500">
            {isFr ? 'Candidatures reçues' : 'Applicants received'}
          </div>
          <div className="font-mono text-2xl font-bold text-[#1F3A68]">{orgApps.length}</div>
        </div>
        <div className="p-4 sm:px-6 sm:py-4 space-y-0.5">
          <div className="text-xs text-slate-500">
            {isFr ? 'En cours / Terminées' : 'Active / Completed'}
          </div>
          <div className="font-mono text-2xl font-bold text-emerald-700">{activeOrDoneApps}</div>
        </div>
        <div className="p-4 sm:px-6 sm:py-4 space-y-0.5">
          <div className="text-xs text-slate-500">
            {isFr ? 'Forfait actif' : 'Active plan'}
          </div>
          <div className="font-mono text-2xl font-bold text-[#967322]">{orgPlan}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Publish Mission Form */}
        <form
          onSubmit={handleCreateMission}
          className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4"
        >
          <h2 className="text-base font-bold text-[#1F3A68] border-b border-slate-100 pb-3">
            {isFr ? 'Publier une mission' : 'Publish a Mission'}
          </h2>

          <div>
            <label htmlFor="pub-title" className="block text-xs font-semibold text-slate-700 mb-1">
              {isFr ? 'Titre de la mission' : 'Mission title'}
            </label>
            <input
              id="pub-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                isFr ? 'Ex : Maquette landing page produit' : 'e.g., Product landing page mockup'
              }
              className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm focus-visible:outline-2 focus-visible:outline-[#1F3A68]"
            />
          </div>

          <div>
            <label htmlFor="pub-desc" className="block text-xs font-semibold text-slate-700 mb-1">
              {isFr ? 'Description des tâches' : 'Description'}
            </label>
            <textarea
              id="pub-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                isFr
                  ? 'Décrivez la tâche de manière claire pour un profil débutant...'
                  : 'Describe the scoped task clearly for a beginner...'
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-[#1F3A68]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="pub-cat" className="block text-xs font-semibold text-slate-700 mb-1">
                {isFr ? 'Catégorie' : 'Category'}
              </label>
              <select
                id="pub-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value as MissionCategory)}
                className="w-full h-10 rounded-lg border border-slate-200 px-2.5 text-sm bg-white"
              >
                <option value="Design">Design</option>
                <option value="Développement">Développement</option>
                <option value="Marketing">Marketing</option>
                <option value="Rédaction">Rédaction</option>
                <option value="Traduction">Traduction</option>
                <option value="Saisie/Admin">Saisie/Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="pub-type" className="block text-xs font-semibold text-slate-700 mb-1">
                {isFr ? 'Type' : 'Type'}
              </label>
              <select
                id="pub-type"
                value={type}
                onChange={(e) => setType(e.target.value as MissionType)}
                className="w-full h-10 rounded-lg border border-slate-200 px-2.5 text-sm bg-white"
              >
                <option value="Mission courte">Mission courte</option>
                <option value="Stage">Stage</option>
                <option value="Premier emploi">Premier emploi</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="pub-city" className="block text-xs font-semibold text-slate-700 mb-1">
                {isFr ? 'Ville' : 'City'}
              </label>
              <select
                id="pub-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-200 px-2.5 text-sm bg-white"
              >
                <option value="Casablanca">Casablanca</option>
                <option value="Rabat">Rabat</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Tanger">Tanger</option>
                <option value="Salé">Salé</option>
              </select>
            </div>
            <div>
              <label htmlFor="pub-days" className="block text-xs font-semibold text-slate-700 mb-1">
                {isFr ? 'Durée (jours)' : 'Duration (days)'}
              </label>
              <input
                id="pub-days"
                type="number"
                min={1}
                max={120}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm font-mono tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1">
                {isFr ? 'Rémunération' : 'Compensation'}
              </span>
              <div className="flex items-center p-1 bg-slate-100 border border-slate-200/80 rounded-lg h-10">
                <button
                  type="button"
                  onClick={() => setPaid(true)}
                  className={`flex-1 py-1 text-xs font-semibold rounded-md cursor-pointer transition-all ${
                    paid ? 'bg-white text-[#1F3A68] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {isFr ? 'Rémunérée' : 'Paid'}
                </button>
                <button
                  type="button"
                  onClick={() => setPaid(false)}
                  className={`flex-1 py-1 text-xs font-semibold rounded-md cursor-pointer transition-all ${
                    !paid ? 'bg-white text-[#1F3A68] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {isFr ? 'Non rémun.' : 'Unpaid'}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="pub-budget" className="block text-xs font-semibold text-slate-700 mb-1">
                {isFr ? 'Budget (MAD)' : 'Budget (MAD)'}
              </label>
              <input
                id="pub-budget"
                type="number"
                min={0}
                step={50}
                disabled={!paid}
                value={paid ? budgetMad : 0}
                onChange={(e) => setBudgetMad(Number(e.target.value))}
                className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm font-mono tabular-nums disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="pub-skills" className="block text-xs font-semibold text-slate-700 mb-1">
              {isFr ? 'Compétences (séparées par virgule)' : 'Skills (comma-separated)'}
            </label>
            <input
              id="pub-skills"
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm"
            />
          </div>

          {/* Live Publication Fee Preview */}
          <div className="border-t border-b border-slate-200 py-3 flex items-center justify-between text-xs tabular-nums">
            <span className="text-slate-600 font-medium">
              {isFr
                ? `Aperçu frais de publication (${orgPlan})`
                : `Live publication fee (${orgPlan})`}
            </span>
            <span
              data-testid="live-pub-fee"
              className="font-mono font-bold text-[#1F3A68] text-sm"
            >
              {liveFee === 0 ? '0 MAD (Inclus)' : `${liveFee} MAD`}
            </span>
          </div>

          {formError && (
            <p role="alert" className="text-xs font-medium text-red-700 bg-red-50 rounded-lg px-3 py-2">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#1F3A68] hover:bg-[#162b4f] rounded-xl transition-colors cursor-pointer"
          >
            {isFr ? 'Publier la mission' : 'Publish mission'}
          </button>
        </form>

        {/* Right: Published Missions & Applicant Management */}
        <div className="lg:col-span-7 space-y-5">
          {orgMissions.map((mission) => {
            const missionApps = applications.filter((a) => a.missionId === mission.id);
            return (
              <div
                key={mission.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#967322]">
                      {mission.category} · {mission.type} · {mission.city} · {mission.durationDays}j
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {isFr ? mission.title : mission.titleEn}
                    </h3>
                  </div>

                  <div className="text-right tabular-nums">
                    <span className="font-mono text-sm font-bold text-[#1F3A68] block">
                      {mission.paid ? `${mission.budgetMad} MAD` : isFr ? 'Non rémunérée' : 'Unpaid'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Users className="w-3.5 h-3.5" aria-hidden="true" />
                      {missionApps.length}{' '}
                      {isFr ? 'candidature(s)' : 'applicant(s)'}
                    </span>
                  </div>
                </div>

                {missionApps.length === 0 ? (
                  <p className="text-xs text-slate-500 py-2">
                    {isFr
                      ? 'Aucune candidature reçue pour cette offre pour le moment.'
                      : 'No applicants yet for this mission.'}
                  </p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {missionApps.map((app) => (
                      <div
                        key={app.id}
                        className="py-4 first:pt-1 last:pb-1 space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-full bg-[#1F3A68]/10 text-[#1F3A68] text-xs font-bold flex items-center justify-center shrink-0">
                              {getInitials(app.applicantName)}
                            </span>
                            <div>
                              <div className="text-sm font-bold text-slate-900">
                                {app.applicantName}
                              </div>
                              <div className="text-xs text-slate-500">{app.applicantSchool}</div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#1F3A68]">
                            {app.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed pl-12">
                          “{app.motivation}”
                        </p>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center gap-2 pl-12">
                          {app.status === 'En attente' && (
                            <>
                              <button
                                type="button"
                                onClick={() => onDecideApplication(app.id, 'Acceptée')}
                                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
                              >
                                {isFr ? 'Accepter' : 'Accept'}
                              </button>
                              <button
                                type="button"
                                onClick={() => onDecideApplication(app.id, 'Refusée')}
                                className="px-3.5 py-1.5 text-xs font-semibold text-red-700 bg-white border border-red-200 hover:bg-red-50 rounded-lg cursor-pointer"
                              >
                                {isFr ? 'Refuser' : 'Refuse'}
                              </button>
                            </>
                          )}

                          {app.status === 'Acceptée' && (
                            <button
                              type="button"
                              onClick={() => onStartMission(app.id)}
                              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1F3A68] hover:bg-[#162b4f] rounded-lg cursor-pointer"
                            >
                              {isFr ? 'Démarrer la mission (En cours)' : 'Start mission'}
                            </button>
                          )}

                          {mission.paid &&
                            (app.status === 'Acceptée' ||
                              app.status === 'En cours' ||
                              app.status === 'Terminée') &&
                            !app.paidThroughPlatform && (
                              <button
                                type="button"
                                onClick={() => setCheckoutApp(app)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#1F3A68] bg-amber-100/90 hover:bg-amber-200 border border-[#C9A24B]/50 rounded-lg cursor-pointer"
                              >
                                <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />
                                {isFr ? 'Payer via chababexper' : 'Pay via chababexper'}
                              </button>
                            )}

                          {app.paidThroughPlatform && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                              {isFr
                                ? `Payée (${app.netYouthMad} MAD net au jeune)`
                                : `Paid (${app.netYouthMad} MAD net)`}
                            </span>
                          )}

                          {app.status === 'En cours' && ratingTargetId !== app.id && (
                            <button
                              type="button"
                              onClick={() => {
                                setRatingTargetId(app.id);
                                setRatingScore(5);
                                setRatingComment(
                                  isFr
                                    ? 'Excellent travail, jeune très impliqué et réactif.'
                                    : 'Great deliverable and strong commitment.'
                                );
                              }}
                              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
                            >
                              {isFr ? 'Marquer comme terminée' : 'Mark as completed'}
                            </button>
                          )}
                        </div>

                        {/* Rating Form */}
                        {ratingTargetId === app.id && (
                          <div className="ml-12 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 mt-2">
                            <div className="text-xs font-bold text-[#1F3A68]">
                              {isFr
                                ? `Évaluer ${app.applicantName} (1 à 5 étoiles)`
                                : `Rate ${app.applicantName} (1–5 stars)`}
                            </div>

                            <div className="flex items-center gap-1.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  aria-label={`${star} étoiles`}
                                  onClick={() => setRatingScore(star)}
                                  className="p-1 cursor-pointer"
                                >
                                  <Star
                                    className={`w-5 h-5 ${
                                      star <= ratingScore
                                        ? 'fill-[#C9A24B] text-[#C9A24B]'
                                        : 'text-slate-300'
                                    }`}
                                    aria-hidden="true"
                                  />
                                </button>
                              ))}
                              <span className="font-mono text-xs font-bold text-slate-700 ml-2">
                                {ratingScore}/5
                              </span>
                            </div>

                            <input
                              type="text"
                              aria-label={isFr ? 'Commentaire d’évaluation' : 'Evaluation comment'}
                              value={ratingComment}
                              onChange={(e) => setRatingComment(e.target.value)}
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
                            />

                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setRatingTargetId(null)}
                                className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer"
                              >
                                {isFr ? 'Annuler' : 'Cancel'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  onCompleteAndRate(app.id, ratingScore, ratingComment);
                                  setRatingTargetId(null);
                                }}
                                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
                              >
                                {isFr ? 'Valider et publier l’avis' : 'Confirm & publish rating'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Payment Checkout Modal */}
      {checkoutApp && checkoutMission && checkoutBreakdown && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#967322]">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  {isFr ? 'Paiement sécurisé chababexper' : 'chababexper Simulated Checkout'}
                </span>
                <h2 id="checkout-title" className="text-lg font-bold text-[#1F3A68]">
                  {isFr ? 'Règlement de mission' : 'Mission Escrow Payment'}
                </h2>
              </div>
              <button
                type="button"
                aria-label={isFr ? 'Fermer' : 'Close'}
                onClick={() => setCheckoutApp(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-0.5">
              <p className="font-semibold text-slate-900">{checkoutMission.title}</p>
              <p>
                {isFr ? 'Bénéficiaire :' : 'Recipient:'} {checkoutApp.applicantName}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 text-sm tabular-nums">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">
                  {isFr ? 'Montant de la mission' : 'Mission amount'}
                </span>
                <span className="font-mono font-semibold text-slate-900">
                  {checkoutBreakdown.gross} MAD
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">
                  {isFr ? 'Commission chababexper (10 %)' : 'chababexper fee (10%)'}
                </span>
                <span className="font-mono font-semibold text-[#967322]">
                  -{checkoutBreakdown.commission} MAD
                </span>
              </div>
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-200">
                <span className="font-bold text-[#1F3A68]">
                  {isFr ? 'Montant net reçu par le jeune' : 'Net received by youth'}
                </span>
                <span className="font-mono text-base font-bold text-emerald-700">
                  {checkoutBreakdown.net} MAD
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 bg-amber-50/70 border border-amber-200 rounded-lg px-3 py-2">
              {isFr
                ? 'Simulation de démonstration : aucune transaction bancaire réelle n’est exécutée.'
                : 'Demo simulation notice: no real financial transaction is processed.'}
            </p>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setCheckoutApp(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
              >
                {isFr ? 'Annuler' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onPayMission(checkoutApp.id);
                  setCheckoutApp(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3A68] hover:bg-[#162b4f] rounded-lg cursor-pointer"
              >
                {isFr ? 'Confirmer le paiement simulé' : 'Confirm simulated payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
