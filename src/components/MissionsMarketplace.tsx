import { useState } from 'react';
import { Clock, MapPin, Search, Sparkles, X } from 'lucide-react';
import {
  Lang,
  MissionApplication,
  MissionCategory,
  MissionItem,
  MissionType,
} from '../types/prototype';

interface MissionsMarketplaceProps {
  lang: Lang;
  missions: MissionItem[];
  applications: MissionApplication[];
  youthId: string;
  onApply: (missionId: string, motivation: string) => string | null;
}

const CATEGORIES: ('Toutes' | MissionCategory)[] = [
  'Toutes',
  'Design',
  'Développement',
  'Marketing',
  'Rédaction',
  'Traduction',
  'Saisie/Admin',
];

const TYPES: ('Tous' | MissionType)[] = [
  'Tous',
  'Mission courte',
  'Stage',
  'Premier emploi',
];

export function MissionsMarketplace({
  lang,
  missions,
  applications,
  youthId,
  onApply,
}: MissionsMarketplaceProps) {
  const isFr = lang === 'fr';
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'Toutes' | MissionCategory>('Toutes');
  const [missionType, setMissionType] = useState<'Tous' | MissionType>('Tous');
  const [paidFilter, setPaidFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [cityFilter, setCityFilter] = useState<string>('Toutes');
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'medium' | 'long'>('all');

  const [selectedMission, setSelectedMission] = useState<MissionItem | null>(null);
  const [motivation, setMotivation] = useState('');
  const [modalError, setModalError] = useState<string | null>(null);

  const cities = ['Toutes', ...Array.from(new Set(missions.map((m) => m.city)))];

  const filtered = missions.filter((m) => {
    if (category !== 'Toutes' && m.category !== category) return false;
    if (missionType !== 'Tous' && m.type !== missionType) return false;
    if (paidFilter === 'paid' && !m.paid) return false;
    if (paidFilter === 'unpaid' && m.paid) return false;
    if (cityFilter !== 'Toutes' && m.city !== cityFilter) return false;
    if (durationFilter === 'short' && m.durationDays > 7) return false;
    if (durationFilter === 'medium' && (m.durationDays <= 7 || m.durationDays > 21))
      return false;
    if (durationFilter === 'long' && m.durationDays <= 21) return false;

    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      m.titleEn.toLowerCase().includes(q) ||
      m.orgName.toLowerCase().includes(q) ||
      m.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  const handleOpenModal = (m: MissionItem) => {
    setSelectedMission(m);
    setMotivation(
      isFr
        ? 'Bonjour, je suis étudiant(e) motivé(e) et prêt(e) à m’investir sérieusement sur cette mission pour acquérir une première expérience.'
        : 'Hello, I am a motivated student eager to deliver quality work on this starter mission.'
    );
    setModalError(null);
  };

  const handleSubmitApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMission) return;
    const err = onApply(selectedMission.id, motivation);
    if (err) {
      setModalError(err);
      return;
    }
    setSelectedMission(null);
    setMotivation('');
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('Toutes');
    setMissionType('Tous');
    setPaidFilter('all');
    setCityFilter('Toutes');
    setDurationFilter('all');
  };

  const getOrgInitials = (orgName: string) =>
    orgName
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();

  return (
    <section aria-labelledby="marketplace-title" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#967322] tracking-wide">
            {isFr ? 'Espace Jeune · Toujours gratuit (0 MAD)' : 'Youth Workspace · Always free (0 MAD)'}
          </p>
          <h1 id="marketplace-title" className="text-2xl sm:text-3xl font-extrabold text-[#1F3A68] tracking-tight">
            {isFr
              ? 'Opportunités accessibles aux débutants'
              : 'Beginner-Accessible Opportunities'}
          </h1>
          <p className="text-sm text-slate-600">
            {isFr
              ? 'Missions courtes, stages et premiers emplois publiés par des PME, startups et associations marocaines.'
              : 'Short practical missions, internships, and first jobs posted by Moroccan SMEs, startups, and associations.'}
          </p>
        </div>

        <div className="text-right tabular-nums">
          <div className="font-mono text-2xl font-bold text-[#1F3A68]">{filtered.length}</div>
          <div className="text-xs text-slate-500">
            {isFr ? 'opportunités affichées' : 'opportunities shown'}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4 relative">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label={isFr ? 'Rechercher une mission' : 'Search missions'}
              placeholder={
                isFr
                  ? 'Rechercher par titre, entreprise ou compétence...'
                  : 'Search by title, company, or skill...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-sm border border-slate-200 rounded-lg bg-slate-50/50 focus:bg-white focus-visible:outline-2 focus-visible:outline-[#1F3A68]"
            />
          </div>

          <div className="md:col-span-2">
            <select
              aria-label={isFr ? 'Type d’opportunité' : 'Opportunity type'}
              value={missionType}
              onChange={(e) => setMissionType(e.target.value as 'Tous' | MissionType)}
              className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white text-slate-800"
            >
              {TYPES.map((tp) => (
                <option key={tp} value={tp}>
                  {tp === 'Tous' ? (isFr ? 'Tous types' : 'All types') : tp}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              aria-label={isFr ? 'Rémunération' : 'Compensation'}
              value={paidFilter}
              onChange={(e) => setPaidFilter(e.target.value as 'all' | 'paid' | 'unpaid')}
              className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white text-slate-800"
            >
              <option value="all">{isFr ? 'Rémunération : Toutes' : 'All compensation'}</option>
              <option value="paid">{isFr ? 'Rémunérée (MAD)' : 'Paid (MAD)'}</option>
              <option value="unpaid">{isFr ? 'Non rémunérée' : 'Unpaid'}</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              aria-label={isFr ? 'Ville' : 'City'}
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full h-10 px-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-800"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === 'Toutes' ? (isFr ? 'Villes' : 'Cities') : c}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              aria-label={isFr ? 'Durée' : 'Duration'}
              value={durationFilter}
              onChange={(e) =>
                setDurationFilter(e.target.value as 'all' | 'short' | 'medium' | 'long')
              }
              className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white text-slate-800"
            >
              <option value="all">{isFr ? 'Toute durée' : 'Any duration'}</option>
              <option value="short">{isFr ? '≤ 7 jours' : '≤ 7 days'}</option>
              <option value="medium">{isFr ? '8 à 21 jours' : '8–21 days'}</option>
              <option value="long">{isFr ? '22+ jours' : '22+ days'}</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-slate-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                category === cat
                  ? 'bg-[#1F3A68] text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat === 'Toutes' && !isFr ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mission Cards Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
          <p className="text-sm font-medium text-slate-700">
            {isFr
              ? 'Aucune mission ne correspond à vos critères actuels.'
              : 'No missions match your selected filters.'}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3A68] rounded-lg cursor-pointer"
          >
            {isFr ? 'Réinitialiser les filtres' : 'Reset filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((mission) => {
            const existingApp = applications.find(
              (a) =>
                a.missionId === mission.id &&
                a.applicantId === youthId &&
                a.status !== 'Refusée'
            );

            return (
              <article
                key={mission.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-[#1F3A68]/35 hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-9 h-9 rounded-lg bg-[#1F3A68]/8 text-[#1F3A68] font-display text-xs font-bold flex items-center justify-center shrink-0">
                        {getOrgInitials(mission.orgName)}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#1F3A68] truncate">
                          {mission.orgName}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {mission.orgKind} · {mission.category}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 whitespace-nowrap shrink-0">
                      {mission.type}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="text-base font-bold text-slate-900 leading-snug">
                      {isFr ? mission.title : mission.titleEn}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {isFr ? mission.description : mission.descriptionEn}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                        {mission.city}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                        {mission.durationDays} {isFr ? 'jours' : 'days'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3" aria-hidden="true" />
                        {isFr ? 'Débutants acceptés' : 'Beginners accepted'}
                      </span>
                      <span className="text-slate-400 truncate">
                        {mission.skills.slice(0, 2).join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="font-mono text-sm font-bold text-[#1F3A68] tabular-nums">
                    {mission.paid
                      ? `${mission.budgetMad.toLocaleString('fr-FR')} MAD`
                      : isFr
                        ? 'Non rémunérée'
                        : 'Unpaid'}
                  </div>

                  {existingApp ? (
                    <span className="text-xs font-semibold text-emerald-700">
                      {existingApp.status}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenModal(mission)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3A68] hover:bg-[#162b4f] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isFr ? 'Postuler' : 'Apply'}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Mission Detail & Apply Modal */}
      {selectedMission && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-mission-title"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#967322]">
                  {selectedMission.orgName} · {selectedMission.orgKind} · {selectedMission.city}
                </p>
                <h2 id="modal-mission-title" className="text-lg font-bold text-[#1F3A68]">
                  {isFr ? selectedMission.title : selectedMission.titleEn}
                </h2>
              </div>
              <button
                type="button"
                aria-label={isFr ? 'Fermer' : 'Close'}
                onClick={() => setSelectedMission(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {isFr ? selectedMission.description : selectedMission.descriptionEn}
            </p>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200/70 rounded-xl p-3.5 text-xs tabular-nums">
              <div>
                <span className="text-slate-500 block">
                  {isFr ? 'Rémunération' : 'Budget'}
                </span>
                <span className="font-mono font-bold text-[#1F3A68]">
                  {selectedMission.paid
                    ? `${selectedMission.budgetMad} MAD`
                    : isFr
                      ? 'Non rémunérée'
                      : 'Unpaid'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{isFr ? 'Durée' : 'Duration'}</span>
                <span className="font-mono font-bold text-slate-900">
                  {selectedMission.durationDays} {isFr ? 'jours' : 'days'}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200/70">
                <span className="text-slate-500 block">
                  {isFr ? 'Compétences pratiquées' : 'Skills practiced'}
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedMission.skills.join(' · ')}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmitApply} className="space-y-3">
              <div>
                <label
                  htmlFor="motivation-input"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {isFr ? 'Message de motivation (court)' : 'Short motivation message'}
                </label>
                <textarea
                  id="motivation-input"
                  rows={3}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-[#1F3A68]"
                />
              </div>

              {modalError && (
                <p role="alert" className="text-xs font-medium text-red-700 bg-red-50 rounded-lg px-3 py-2">
                  {modalError}
                </p>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedMission(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  {isFr ? 'Annuler' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3A68] hover:bg-[#162b4f] rounded-lg cursor-pointer"
                >
                  {isFr ? 'Envoyer ma candidature (0 MAD)' : 'Submit application (0 MAD)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
