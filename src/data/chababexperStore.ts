import {
  AppNotification,
  ApplicationStatus,
  DemoState,
  MissionCategory,
  MissionItem,
  MissionType,
  OrgPlan,
} from '../types/prototype';

export const STORAGE_KEY = 'chababexper_demo_state_v1';
export const COMMISSION_RATE = 0.1; // 10% commission chababexper

export function calculatePaymentBreakdown(budgetMad: number) {
  const gross = Math.max(0, Math.round(budgetMad));
  const commission = Math.round(gross * COMMISSION_RATE);
  const net = Math.max(0, gross - commission);
  return { gross, commission, net };
}

export function getPublicationFeeForPlan(plan: OrgPlan, paid: boolean): number {
  if (!paid) return 0; // Missions non rémunérées / associatives gratuites à publier sur le plan de base
  if (plan === 'Business' || plan === 'Pro') return 0;
  return 150;
}

export const INITIAL_MISSIONS: MissionItem[] = [
  {
    id: 'm-atlas-1',
    orgId: 'org-atlas',
    orgName: 'Atlas Digital',
    orgKind: 'PME',
    title: 'Création de visuels réseaux sociaux pour lancement PME',
    titleEn: 'Social media visual pack for SME product launch',
    description:
      'Concevoir 8 visuels Instagram/LinkedIn et une bannière de couverture pour accompagner le lancement d’une nouvelle gamme de produits artisanaux marocains.',
    descriptionEn:
      'Design 8 Instagram/LinkedIn visuals and a cover banner for the launch of a new Moroccan craft product line.',
    category: 'Design',
    type: 'Mission courte',
    city: 'Casablanca',
    durationDays: 7,
    paid: true,
    budgetMad: 1200,
    skills: ['Canva', 'Identité visuelle', 'Formats sociaux'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Aujourd’hui',
  },
  {
    id: 'm-atlas-2',
    orgId: 'org-atlas',
    orgName: 'Atlas Digital',
    orgKind: 'PME',
    title: 'Intégration page vitrine responsive (HTML/Tailwind)',
    titleEn: 'Responsive showcase landing page build (HTML/Tailwind)',
    description:
      'Mettre en page une landing page de présentation à partir d’une maquette Figma simple, avec formulaire de contact et adaptation mobile.',
    descriptionEn:
      'Build a clean showcase landing page from a simple Figma mockup, including a contact form and mobile responsiveness.',
    category: 'Développement',
    type: 'Stage',
    city: 'Rabat',
    durationDays: 30,
    paid: true,
    budgetMad: 2200,
    skills: ['HTML/CSS', 'Tailwind CSS', 'Responsive'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Hier',
  },
  {
    id: 'm-darija-1',
    orgId: 'org-darija',
    orgName: 'Darija Studio',
    orgKind: 'Startup',
    title: 'Rédaction de 6 fiches produits bilingues FR/AR',
    titleEn: 'Write 6 bilingual FR/AR e-commerce product sheets',
    description:
      'Rédiger des descriptions claires, engageantes et optimisées SEO pour une jeune boutique en ligne de cosmétiques naturels.',
    descriptionEn:
      'Write clear, engaging, SEO-friendly descriptions for a young natural cosmetics online store.',
    category: 'Rédaction',
    type: 'Mission courte',
    city: 'Rabat',
    durationDays: 5,
    paid: true,
    budgetMad: 650,
    skills: ['Rédaction web', 'SEO débutant', 'Orthographe FR'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Il y a 2 jours',
  },
  {
    id: 'm-amal-1',
    orgId: 'org-amal',
    orgName: 'Association Al Amal',
    orgKind: 'Association',
    title: 'Traduction FR/EN du guide d’orientation scolaire',
    titleEn: 'FR/EN translation of student orientation handbook',
    description:
      'Traduire un livret pratique de 12 pages destiné aux lycéens et jeunes diplômés participant aux forums d’insertion.',
    descriptionEn:
      'Translate a 12-page practical booklet for high schoolers and young graduates attending career fairs.',
    category: 'Traduction',
    type: 'Mission courte',
    city: 'Marrakech',
    durationDays: 6,
    paid: false,
    budgetMad: 0,
    skills: ['Traduction FR/EN', 'Relecture'],
    beginnersAccepted: true,
    publicationFeeMad: 0,
    createdAt: 'Il y a 2 jours',
  },
  {
    id: 'm-tanger-1',
    orgId: 'org-tanger',
    orgName: 'Tanger Logistique PME',
    orgKind: 'PME',
    title: 'Saisie et nettoyage de base fournisseurs sur Excel',
    titleEn: 'Supplier database entry & cleanup in Excel',
    description:
      'Vérifier 250 fiches fournisseurs, supprimer les doublons et classer les factures du trimestre par catégorie.',
    descriptionEn:
      'Review 250 supplier entries, remove duplicates, and organize quarterly invoices by category.',
    category: 'Saisie/Admin',
    type: 'Mission courte',
    city: 'Tanger',
    durationDays: 5,
    paid: true,
    budgetMad: 800,
    skills: ['Excel', 'Organisation', 'Rigueur'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Il y a 3 jours',
  },
  {
    id: 'm-kech-1',
    orgId: 'org-kech',
    orgName: 'Kech Crafts Coopérative',
    orgKind: 'Association',
    title: 'Campagne de lancement Instagram & calendrier éditorial',
    titleEn: 'Instagram launch campaign & editorial calendar',
    description:
      'Planifier 15 jours de publications, proposer des légendes adaptées et suivre les premiers indicateurs d’engagement.',
    descriptionEn:
      'Plan 15 days of posts, write engaging captions, and track initial engagement metrics.',
    category: 'Marketing',
    type: 'Mission courte',
    city: 'Marrakech',
    durationDays: 10,
    paid: true,
    budgetMad: 950,
    skills: ['Instagram', 'Planification', 'Copywriting'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Il y a 3 jours',
  },
  {
    id: 'm-casa-dev',
    orgId: 'org-casafin',
    orgName: 'CasaPay Startup',
    orgKind: 'Startup',
    title: 'Tests QA et rapport de bugs sur application mobile',
    titleEn: 'QA testing & bug report on mobile web app',
    description:
      'Tester le parcours d’inscription sur smartphone et documenter clairement les anomalies visuelles ou fonctionnelles.',
    descriptionEn:
      'Test the mobile onboarding flow and document visual or functional issues clearly.',
    category: 'Développement',
    type: 'Mission courte',
    city: 'Casablanca',
    durationDays: 4,
    paid: true,
    budgetMad: 700,
    skills: ['Tests manuels', 'Rédaction technique', 'Attention aux détails'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Il y a 4 jours',
  },
  {
    id: 'm-rabat-design',
    orgId: 'org-bouregreg',
    orgName: 'Éditions Bouregreg',
    orgKind: 'PME',
    title: 'Mise en page d’une brochure événementielle (16 pages)',
    titleEn: 'Layout design for a 16-page event brochure',
    description:
      'Assembler textes et photos fournis dans un gabarit propre prêt pour l’impression et l’export PDF web.',
    descriptionEn:
      'Assemble provided text and photos into a clean print-ready and web-PDF brochure template.',
    category: 'Design',
    type: 'Mission courte',
    city: 'Rabat',
    durationDays: 8,
    paid: true,
    budgetMad: 1100,
    skills: ['Canva / InDesign', 'Typographie', 'Export PDF'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Il y a 4 jours',
  },
  {
    id: 'm-tanger-mkt',
    orgId: 'org-nord',
    orgName: 'Nord Eco Mobilité',
    orgKind: 'Startup',
    title: 'Assistant(e) marketing digital & veille concurrentielle',
    titleEn: 'Digital marketing assistant & competitive benchmark',
    description:
      'Réaliser un benchmark de 10 acteurs locaux et préparer une présentation synthétique sous PowerPoint.',
    descriptionEn:
      'Conduct a benchmark of 10 local players and prepare a clear slide summary.',
    category: 'Marketing',
    type: 'Stage',
    city: 'Tanger',
    durationDays: 30,
    paid: true,
    budgetMad: 1800,
    skills: ['Veille marché', 'PowerPoint', 'Analyse'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Il y a 5 jours',
  },
  {
    id: 'm-casa-admin',
    orgId: 'org-anfaco',
    orgName: 'Cabinet Anfa Conseil',
    orgKind: 'PME',
    title: 'Classement numérique et suivi des dossiers clients',
    titleEn: 'Digital archiving & client folder tracking',
    description:
      'Numériser, renommer selon la nomenclature interne et indexer les pièces justificatives comptables.',
    descriptionEn:
      'Digitize, rename by internal conventions, and index accounting supporting documents.',
    category: 'Saisie/Admin',
    type: 'Premier emploi',
    city: 'Casablanca',
    durationDays: 60,
    paid: true,
    budgetMad: 3200,
    skills: ['Bureautique', 'Classement', 'Discrétion'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Il y a 5 jours',
  },
  {
    id: 'm-rabat-trad',
    orgId: 'org-medina',
    orgName: 'Fondation Médina Culture',
    orgKind: 'Association',
    title: 'Sous-titrage et traduction de 4 interviews vidéo',
    titleEn: 'Subtitling & translation of 4 video interviews',
    description:
      'Transcrire et traduire de courtes capsules vidéo (3 min chacune) d’artisans marocains du français vers l’anglais.',
    descriptionEn:
      'Transcribe and translate short 3-minute artisan video stories from French to English.',
    category: 'Traduction',
    type: 'Mission courte',
    city: 'Rabat',
    durationDays: 5,
    paid: false,
    budgetMad: 0,
    skills: ['Traduction FR/EN', 'Sous-titrage'],
    beginnersAccepted: true,
    publicationFeeMad: 0,
    createdAt: 'Il y a 6 jours',
  },
  {
    id: 'm-kech-dev',
    orgId: 'org-palmeraie',
    orgName: 'Palmeraie Tech',
    orgKind: 'Startup',
    title: 'Développement d’un composant tableau filtrable React',
    titleEn: 'Build a filterable React data table component',
    description:
      'Créer un tableau réactif avec recherche instantanée et pagination simple pour un outil interne de suivi de stocks.',
    descriptionEn:
      'Create a responsive table with instant search and pagination for an internal inventory tool.',
    category: 'Développement',
    type: 'Mission courte',
    city: 'Marrakech',
    durationDays: 9,
    paid: true,
    budgetMad: 1500,
    skills: ['React', 'JavaScript', 'Tailwind'],
    beginnersAccepted: true,
    publicationFeeMad: 150,
    createdAt: 'Il y a 1 semaine',
  },
  {
    id: 'm-casa-redac',
    orgId: 'org-green',
    orgName: 'GreenMaroc Initiative',
    orgKind: 'Association',
    title: 'Rédaction d’articles de sensibilisation environnementale',
    titleEn: 'Write environmental awareness blog articles',
    description:
      'Rédiger 4 articles vulgarisés (600 mots) sur le recyclage urbain et l’économie circulaire au Maroc.',
    descriptionEn:
      'Write 4 accessible 600-word articles on urban recycling and circular economy in Morocco.',
    category: 'Rédaction',
    type: 'Stage',
    city: 'Casablanca',
    durationDays: 21,
    paid: false,
    budgetMad: 0,
    skills: ['Rédaction', 'Recherche documentaire'],
    beginnersAccepted: true,
    publicationFeeMad: 0,
    createdAt: 'Il y a 1 semaine',
  },
];

export function createInitialDemoState(): DemoState {
  return {
    role: 'youth',
    orgPlan: 'Free',
    missions: INITIAL_MISSIONS,
    applications: [
      {
        id: 'app-salma-atlas',
        missionId: 'm-atlas-2',
        applicantId: 'y-salma',
        applicantName: 'Salma Benali',
        applicantSchool: 'Licence Pro Web · Salé',
        motivation:
          'Motivée pour réaliser ma première intégration professionnelle sous Tailwind CSS.',
        status: 'En attente',
        youthConfirmed: false,
        orgConfirmed: false,
        paidThroughPlatform: false,
        commissionMad: 220,
        netYouthMad: 1980,
        rating: null,
        orgComment: '',
        appliedAt: 'Hier',
      },
      {
        id: 'app-youssef-darija',
        missionId: 'm-darija-1',
        applicantId: 'y-youssef',
        applicantName: 'Youssef El Amrani',
        applicantSchool: 'Étudiant L3 Management & Digital · Rabat',
        motivation:
          'Je souhaite mettre en pratique mes cours de marketing digital sur des fiches produits réelles.',
        status: 'Terminée',
        youthConfirmed: true,
        orgConfirmed: true,
        paidThroughPlatform: true,
        commissionMad: 65,
        netYouthMad: 585,
        rating: 5,
        orgComment:
          'Très sérieux, réactif et force de proposition dès sa première mission.',
        appliedAt: 'Il y a 6 jours',
      },
    ],
    youth: {
      id: 'y-youssef',
      name: 'Youssef El Amrani',
      city: 'Rabat',
      education: 'Étudiant L3 · Management & Marketing Digital (EST / Université Mohammed V)',
      bio: 'Jeune étudiant motivé à la recherche d’opportunités pratiques pour transformer mes connaissances académiques en réalisations concrètes.',
      bioEn:
        'Motivated undergraduate looking for practical starter missions to turn classroom theory into verified experience.',
      skills: ['Rédaction web', 'Canva', 'Bureautique'],
      badges: ['Première mission réussie'],
      placementStatus: 'none',
      totalEarnedMad: 585,
      reviews: [
        {
          id: 'rev-init-youssef',
          missionTitle: 'Rédaction de 6 fiches produits bilingues FR/AR',
          orgName: 'Darija Studio',
          rating: 5,
          comment: 'Très sérieux, réactif et force de proposition dès sa première mission.',
          skillsAdded: ['Rédaction web', 'SEO débutant'],
          date: 'Il y a 2 jours',
          amountMad: 585,
        },
      ],
    },
    notifications: [
      {
        id: 'notif-1',
        targetRole: 'youth',
        messageFr: 'Darija Studio a évalué votre mission (5/5) et ajouté 2 compétences à votre portfolio.',
        messageEn: 'Darija Studio rated your mission (5/5) and added 2 skills to your portfolio.',
        read: false,
        createdAt: 'Il y a 2 jours',
      },
      {
        id: 'notif-2',
        targetRole: 'organization',
        messageFr: 'Nouvelle candidature reçue de Salma Benali pour « Intégration page vitrine ».',
        messageEn: 'New application from Salma Benali for "Responsive showcase landing page".',
        read: false,
        createdAt: 'Hier',
      },
    ],
  };
}

export function loadDemoState(): DemoState {
  if (typeof window === 'undefined') return createInitialDemoState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialDemoState();
    const parsed = JSON.parse(raw) as DemoState;
    if (!parsed || !Array.isArray(parsed.missions) || !parsed.youth) {
      return createInitialDemoState();
    }
    return parsed;
  } catch {
    return createInitialDemoState();
  }
}

export function saveDemoState(state: DemoState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function applyToMission(
  state: DemoState,
  missionId: string,
  motivation: string
): { state: DemoState; error: string | null } {
  const mission = state.missions.find((m) => m.id === missionId);
  if (!mission) return { state, error: 'Mission introuvable.' };
  if (motivation.trim().length < 5) {
    return {
      state,
      error: 'Veuillez saisir un court message de motivation (5 caractères minimum).',
    };
  }

  const already = state.applications.find(
    (a) =>
      a.missionId === missionId &&
      a.applicantId === state.youth.id &&
      a.status !== 'Refusée'
  );
  if (already) {
    return { state, error: 'Vous avez déjà postulé à cette mission.' };
  }

  const { commission, net } = calculatePaymentBreakdown(
    mission.paid ? mission.budgetMad : 0
  );

  const newApp = {
    id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    missionId: mission.id,
    applicantId: state.youth.id,
    applicantName: state.youth.name,
    applicantSchool: state.youth.education,
    motivation: motivation.trim(),
    status: 'En attente' as ApplicationStatus,
    youthConfirmed: false,
    orgConfirmed: false,
    paidThroughPlatform: false,
    commissionMad: commission,
    netYouthMad: net,
    rating: null,
    orgComment: '',
    appliedAt: 'À l’instant',
  };

  const notif: AppNotification = {
    id: `notif-${Date.now()}`,
    targetRole: 'organization',
    messageFr: `${state.youth.name} a postulé à « ${mission.title} » !`,
    messageEn: `${state.youth.name} applied to "${mission.titleEn}"!`,
    read: false,
    createdAt: 'À l’instant',
  };

  return {
    error: null,
    state: {
      ...state,
      applications: [newApp, ...state.applications],
      notifications: [notif, ...state.notifications],
    },
  };
}

export function decideApplicationStatus(
  state: DemoState,
  applicationId: string,
  decision: 'Acceptée' | 'Refusée'
): DemoState {
  const app = state.applications.find((a) => a.id === applicationId);
  if (!app || app.status !== 'En attente') return state;
  const mission = state.missions.find((m) => m.id === app.missionId);

  const updatedApps = state.applications.map((a) =>
    a.id === applicationId ? { ...a, status: decision } : a
  );

  const notif: AppNotification = {
    id: `notif-${Date.now()}`,
    targetRole: 'youth',
    messageFr:
      decision === 'Acceptée'
        ? `Ta candidature pour « ${mission?.title ?? 'la mission'} » a été acceptée !`
        : `Ta candidature pour « ${mission?.title ?? 'la mission'} » n’a pas été retenue.`,
    messageEn:
      decision === 'Acceptée'
        ? `Your application for "${mission?.titleEn ?? 'the mission'}" was accepted!`
        : `Your application for "${mission?.titleEn ?? 'the mission'}" was not selected.`,
    read: false,
    createdAt: 'À l’instant',
  };

  return {
    ...state,
    applications: updatedApps,
    notifications: [notif, ...state.notifications],
  };
}

export function startAcceptedMission(state: DemoState, applicationId: string): DemoState {
  const app = state.applications.find((a) => a.id === applicationId);
  if (!app || app.status !== 'Acceptée') return state;
  const mission = state.missions.find((m) => m.id === app.missionId);

  const notif: AppNotification = {
    id: `notif-${Date.now()}`,
    targetRole: 'youth',
    messageFr: `La mission « ${mission?.title ?? ''} » est maintenant En cours.`,
    messageEn: `Mission "${mission?.titleEn ?? ''}" is now In Progress.`,
    read: false,
    createdAt: 'À l’instant',
  };

  return {
    ...state,
    applications: state.applications.map((a) =>
      a.id === applicationId ? { ...a, status: 'En cours' } : a
    ),
    notifications: [notif, ...state.notifications],
  };
}

export function payMissionEscrow(state: DemoState, applicationId: string): DemoState {
  const app = state.applications.find((a) => a.id === applicationId);
  if (!app || app.paidThroughPlatform) return state;
  const mission = state.missions.find((m) => m.id === app.missionId);
  if (!mission || !mission.paid || mission.budgetMad <= 0) return state;

  const { commission, net } = calculatePaymentBreakdown(mission.budgetMad);

  const updatedApps = state.applications.map((a) =>
    a.id === applicationId
      ? {
          ...a,
          paidThroughPlatform: true,
          commissionMad: commission,
          netYouthMad: net,
        }
      : a
  );

  const isYoussef = app.applicantId === state.youth.id;
  const updatedYouth = isYoussef
    ? { ...state.youth, totalEarnedMad: state.youth.totalEarnedMad + net }
    : state.youth;

  const notif: AppNotification = {
    id: `notif-${Date.now()}`,
    targetRole: 'youth',
    messageFr: `Paiement sécurisé reçu : +${net} MAD net pour « ${mission.title} » (commission 10 % : ${commission} MAD).`,
    messageEn: `Simulated payment received: +${net} MAD net for "${mission.titleEn}".`,
    read: false,
    createdAt: 'À l’instant',
  };

  return {
    ...state,
    applications: updatedApps,
    youth: updatedYouth,
    notifications: [notif, ...state.notifications],
  };
}

export function markMissionCompletedAndRate(
  state: DemoState,
  applicationId: string,
  rating: number,
  comment: string
): DemoState {
  const app = state.applications.find((a) => a.id === applicationId);
  if (!app) return state;
  const mission = state.missions.find((m) => m.id === app.missionId);
  if (!mission) return state;

  const clampedRating = Math.min(5, Math.max(1, Math.round(rating)));
  const cleanComment =
    comment.trim() || 'Excellent travail pour une première expérience !';

  const updatedApps = state.applications.map((a) =>
    a.id === applicationId
      ? {
          ...a,
          status: 'Terminée' as ApplicationStatus,
          orgConfirmed: true,
          rating: clampedRating,
          orgComment: cleanComment,
        }
      : a
  );

  let updatedYouth = state.youth;
  if (app.applicantId === state.youth.id) {
    const mergedSkills = Array.from(new Set([...state.youth.skills, ...mission.skills]));
    const newBadges = [...state.youth.badges];
    if (!newBadges.includes('Profil vérifié') && state.youth.reviews.length >= 1) {
      newBadges.push('Profil vérifié');
    }
    if (clampedRating === 5 && !newBadges.includes('Top évaluation 5★')) {
      newBadges.push('Top évaluation 5★');
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      missionTitle: mission.title,
      orgName: mission.orgName,
      rating: clampedRating,
      comment: cleanComment,
      skillsAdded: mission.skills,
      date: 'À l’instant',
      amountMad: app.paidThroughPlatform ? app.netYouthMad : 0,
    };

    updatedYouth = {
      ...state.youth,
      skills: mergedSkills,
      badges: newBadges,
      reviews: [newReview, ...state.youth.reviews],
    };
  }

  const notif: AppNotification = {
    id: `notif-${Date.now()}`,
    targetRole: 'youth',
    messageFr: `${mission.orgName} a marqué « ${mission.title} » comme terminée (${clampedRating}/5 ★).`,
    messageEn: `${mission.orgName} marked "${mission.titleEn}" as completed (${clampedRating}/5 ★).`,
    read: false,
    createdAt: 'À l’instant',
  };

  return {
    ...state,
    applications: updatedApps,
    youth: updatedYouth,
    notifications: [notif, ...state.notifications],
  };
}

export function youthConfirmCompletion(state: DemoState, applicationId: string): DemoState {
  return {
    ...state,
    applications: state.applications.map((a) =>
      a.id === applicationId ? { ...a, youthConfirmed: true } : a
    ),
  };
}

export interface CreateMissionPayload {
  title: string;
  description: string;
  category: MissionCategory;
  type: MissionType;
  city: string;
  durationDays: number;
  paid: boolean;
  budgetMad: number;
  skillsText: string;
}

export function createOrgMission(
  state: DemoState,
  payload: CreateMissionPayload
): { state: DemoState; error: string | null } {
  if (payload.title.trim().length < 4) {
    return { state, error: 'Le titre doit contenir au moins 4 caractères.' };
  }
  if (payload.description.trim().length < 10) {
    return { state, error: 'Décrivez la mission en quelques mots (10 caractères min).' };
  }
  if (payload.paid && (Number.isNaN(payload.budgetMad) || payload.budgetMad < 100)) {
    return { state, error: 'Indiquez un budget d’au moins 100 MAD pour une mission rémunérée.' };
  }
  if (Number.isNaN(payload.durationDays) || payload.durationDays < 1) {
    return { state, error: 'La durée doit être d’au moins 1 jour.' };
  }

  const skills = payload.skillsText
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const fee = getPublicationFeeForPlan(state.orgPlan, payload.paid);
  const newMission: MissionItem = {
    id: `m-org-${Date.now()}`,
    orgId: 'org-atlas',
    orgName: 'Atlas Digital',
    orgKind: 'PME',
    title: payload.title.trim(),
    titleEn: payload.title.trim(),
    description: payload.description.trim(),
    descriptionEn: payload.description.trim(),
    category: payload.category,
    type: payload.type,
    city: payload.city,
    durationDays: Math.round(payload.durationDays),
    paid: payload.paid,
    budgetMad: payload.paid ? Math.round(payload.budgetMad) : 0,
    skills: skills.length > 0 ? skills : ['Motivation', 'Première expérience'],
    beginnersAccepted: true,
    publicationFeeMad: fee,
    createdAt: 'À l’instant',
  };

  return {
    error: null,
    state: {
      ...state,
      missions: [newMission, ...state.missions],
    },
  };
}
