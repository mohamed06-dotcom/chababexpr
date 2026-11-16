import { useEffect, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { MissionsMarketplace } from './components/MissionsMarketplace';
import { MyApplications } from './components/MyApplications';
import { YouthProfile } from './components/YouthProfile';
import { OrgDashboard } from './components/OrgDashboard';
import { PricingPage } from './components/PricingPage';
import {
  applyToMission,
  createInitialDemoState,
  createOrgMission,
  CreateMissionPayload,
  decideApplicationStatus,
  loadDemoState,
  markMissionCompletedAndRate,
  payMissionEscrow,
  saveDemoState,
  startAcceptedMission,
  STORAGE_KEY,
  youthConfirmCompletion,
} from './data/chababexperStore';
import { ActivePage, DemoState, Lang, OrgPlan, UserRole } from './types/prototype';

export default function App() {
  const [lang, setLang] = useState<Lang>('fr');
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [state, setState] = useState<DemoState>(() => loadDemoState());
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    saveDemoState(state);
  }, [state]);

  useEffect(() => {
    if (!toastMsg) return;
    const id = window.setTimeout(() => setToastMsg(null), 3200);
    return () => window.clearTimeout(id);
  }, [toastMsg]);

  const showToast = (fr: string, en: string) => {
    setToastMsg(lang === 'fr' ? fr : en);
  };

  const handleSwitchRole = (role: UserRole) => {
    setState((prev) => ({ ...prev, role }));
    if (role === 'youth' && activePage === 'dashboard') {
      setActivePage('missions');
    } else if (role === 'organization' && activePage !== 'pricing') {
      setActivePage('dashboard');
    }
    showToast(
      role === 'youth'
        ? 'Connecté en tant que Youssef El Amrani (Jeune)'
        : 'Connecté en tant que Atlas Digital (PME)',
      role === 'youth'
        ? 'Switched to Youssef El Amrani (Youth)'
        : 'Switched to Atlas Digital (SME)'
    );
  };

  const handleMarkAllRead = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.targetRole === prev.role ? { ...n, read: true } : n
      ),
    }));
  };

  const handleApply = (missionId: string, motivation: string): string | null => {
    const res = applyToMission(state, missionId, motivation);
    if (res.error) return res.error;
    setState(res.state);
    showToast(
      'Candidature envoyée gratuitement (0 MAD) ! Suivez son statut dans Mes candidatures.',
      'Application sent free of charge (0 MAD)!'
    );
    return null;
  };

  const handleDecide = (appId: string, decision: 'Acceptée' | 'Refusée') => {
    setState((prev) => decideApplicationStatus(prev, appId, decision));
    showToast(
      decision === 'Acceptée'
        ? 'Candidature acceptée ! Le jeune a reçu une notification.'
        : 'Candidature refusée avec notification transparente.',
      decision === 'Acceptée'
        ? 'Candidate accepted! Youth notified.'
        : 'Application refused transparently.'
    );
  };

  const handleStartMission = (appId: string) => {
    setState((prev) => startAcceptedMission(prev, appId));
    showToast('La mission est maintenant En cours.', 'Mission is now In Progress.');
  };

  const handlePayMission = (appId: string) => {
    setState((prev) => payMissionEscrow(prev, appId));
    showToast(
      'Paiement simulé effectué via chababexper (commission 10 % déduite).',
      'Simulated payment processed via chababexper (10% fee deducted).'
    );
  };

  const handleCompleteAndRate = (appId: string, rating: number, comment: string) => {
    setState((prev) => markMissionCompletedAndRate(prev, appId, rating, comment));
    showToast(
      'Mission terminée et évaluation ajoutée au portfolio du jeune !',
      'Mission completed and rating added to youth portfolio!'
    );
  };

  const handleYouthConfirm = (appId: string) => {
    setState((prev) => youthConfirmCompletion(prev, appId));
    showToast(
      'Réalisation confirmée des deux côtés !',
      'Completion confirmed by both parties!'
    );
  };

  const handlePublishMission = (payload: CreateMissionPayload): string | null => {
    const res = createOrgMission(state, payload);
    if (res.error) return res.error;
    setState(res.state);
    showToast(
      'Nouvelle mission publiée et visible par les jeunes !',
      'New mission published and visible to youth!'
    );
    return null;
  };

  const handleUpdatePlacement = (status: 'none' | 'stage' | 'emploi') => {
    setState((prev) => ({
      ...prev,
      youth: { ...prev.youth, placementStatus: status },
    }));
    showToast(
      'Statut d’insertion mis à jour sur votre profil.',
      'Career placement status updated on your profile.'
    );
  };

  const handleSelectPlan = (plan: OrgPlan) => {
    setState((prev) => ({ ...prev, orgPlan: plan }));
    showToast(
      `Forfait ${plan} activé pour Atlas Digital.`,
      `${plan} plan activated for Atlas Digital.`
    );
  };

  const handleResetDemo = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setState(createInitialDemoState());
    setActivePage('landing');
    showToast(
      'Démo réinitialisée à l’état initial.',
      'Demo reset to initial state.'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] text-slate-900">
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'fr' ? 'en' : 'fr'))}
        role={state.role}
        onSwitchRole={handleSwitchRole}
        activePage={activePage}
        onNavigate={setActivePage}
        notifications={state.notifications}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#1F3A68] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs font-semibold max-w-sm border border-white/10"
        >
          <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" aria-hidden="true" />
          <span>{toastMsg}</span>
        </div>
      )}

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-7 sm:py-9">
        {activePage === 'landing' && (
          <LandingPage
            lang={lang}
            onSeekMission={() => {
              setState((prev) => ({ ...prev, role: 'youth' }));
              setActivePage('missions');
            }}
            onPublishMission={() => {
              setState((prev) => ({ ...prev, role: 'organization' }));
              setActivePage('dashboard');
            }}
            onOpenPricing={() => setActivePage('pricing')}
          />
        )}

        {activePage === 'missions' && (
          <MissionsMarketplace
            lang={lang}
            missions={state.missions}
            applications={state.applications}
            youthId={state.youth.id}
            onApply={handleApply}
          />
        )}

        {activePage === 'applications' && (
          <MyApplications
            lang={lang}
            youthId={state.youth.id}
            missions={state.missions}
            applications={state.applications}
            onConfirmCompletion={handleYouthConfirm}
            onBrowseMissions={() => setActivePage('missions')}
          />
        )}

        {activePage === 'profile' && (
          <YouthProfile
            lang={lang}
            youth={state.youth}
            onUpdatePlacement={handleUpdatePlacement}
          />
        )}

        {activePage === 'dashboard' && (
          <OrgDashboard
            lang={lang}
            orgPlan={state.orgPlan}
            missions={state.missions}
            applications={state.applications}
            onPublishMission={handlePublishMission}
            onDecideApplication={handleDecide}
            onStartMission={handleStartMission}
            onPayMission={handlePayMission}
            onCompleteAndRate={handleCompleteAndRate}
          />
        )}

        {activePage === 'pricing' && (
          <PricingPage
            lang={lang}
            currentPlan={state.orgPlan}
            onSelectPlan={handleSelectPlan}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-700">
              <span className="text-[#1F3A68]">chabab</span>
              <span className="text-[#C9A24B]">exper</span> —{' '}
              {lang === 'fr'
                ? 'Ta première expérience commence ici.'
                : 'Your first experience starts here.'}
            </p>
            <p>
              {lang === 'fr'
                ? 'Prototype de présentation · EST Salé 2026–2027'
                : 'Presentation prototype · EST Salé 2026–2027'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            {lang === 'fr' ? 'Réinitialiser la démo' : 'Reset demo'}
          </button>
        </div>
      </footer>
    </div>
  );
}
