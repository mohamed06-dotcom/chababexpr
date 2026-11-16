export type Lang = 'fr' | 'en';

export type UserRole = 'youth' | 'organization';

export type ActivePage =
  | 'landing'
  | 'missions'
  | 'applications'
  | 'profile'
  | 'dashboard'
  | 'pricing';

export type MissionCategory =
  | 'Design'
  | 'Développement'
  | 'Marketing'
  | 'Rédaction'
  | 'Traduction'
  | 'Saisie/Admin';

export type MissionType = 'Mission courte' | 'Stage' | 'Premier emploi';

export type ApplicationStatus =
  | 'En attente'
  | 'Acceptée'
  | 'Refusée'
  | 'En cours'
  | 'Terminée';

export type OrgPlan = 'Free' | 'Pro' | 'Business';

export interface MissionItem {
  id: string;
  orgId: string;
  orgName: string;
  orgKind: 'PME' | 'Startup' | 'Association';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: MissionCategory;
  type: MissionType;
  city: string;
  durationDays: number;
  paid: boolean;
  budgetMad: number;
  skills: string[];
  beginnersAccepted: boolean;
  publicationFeeMad: number;
  createdAt: string;
}

export interface MissionApplication {
  id: string;
  missionId: string;
  applicantId: string;
  applicantName: string;
  applicantSchool: string;
  motivation: string;
  status: ApplicationStatus;
  youthConfirmed: boolean;
  orgConfirmed: boolean;
  paidThroughPlatform: boolean;
  commissionMad: number;
  netYouthMad: number;
  rating: number | null;
  orgComment: string;
  appliedAt: string;
}

export interface PortfolioReview {
  id: string;
  missionTitle: string;
  orgName: string;
  rating: number;
  comment: string;
  skillsAdded: string[];
  date: string;
  amountMad: number;
}

export interface YouthDemoAccount {
  id: string;
  name: string;
  city: string;
  education: string;
  bio: string;
  bioEn: string;
  skills: string[];
  badges: string[];
  placementStatus: 'none' | 'stage' | 'emploi';
  totalEarnedMad: number;
  reviews: PortfolioReview[];
}

export interface AppNotification {
  id: string;
  targetRole: UserRole;
  messageFr: string;
  messageEn: string;
  read: boolean;
  createdAt: string;
}

export interface DemoState {
  role: UserRole;
  orgPlan: OrgPlan;
  missions: MissionItem[];
  applications: MissionApplication[];
  youth: YouthDemoAccount;
  notifications: AppNotification[];
}
