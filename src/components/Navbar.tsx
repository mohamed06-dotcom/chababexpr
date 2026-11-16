import { useState } from 'react';
import { Bell, Building2, GraduationCap, User } from 'lucide-react';
import { ActivePage, AppNotification, Lang, UserRole } from '../types/prototype';

interface NavbarProps {
  lang: Lang;
  onToggleLang: () => void;
  role: UserRole;
  onSwitchRole: (role: UserRole) => void;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
}

export function Navbar({
  lang,
  onToggleLang,
  role,
  onSwitchRole,
  activePage,
  onNavigate,
  notifications,
  onMarkAllRead,
}: NavbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const roleNotifs = notifications.filter((n) => n.targetRole === role);
  const unreadCount = roleNotifs.filter((n) => !n.read).length;

  const navItems: { id: ActivePage; labelFr: string; labelEn: string }[] =
    role === 'youth'
      ? [
          { id: 'landing', labelFr: 'Accueil', labelEn: 'Home' },
          { id: 'missions', labelFr: 'Missions', labelEn: 'Missions' },
          { id: 'applications', labelFr: 'Mes candidatures', labelEn: 'Applications' },
          { id: 'profile', labelFr: 'Mon profil', labelEn: 'Profile' },
          { id: 'pricing', labelFr: 'Tarifs', labelEn: 'Pricing' },
        ]
      : [
          { id: 'landing', labelFr: 'Accueil', labelEn: 'Home' },
          { id: 'dashboard', labelFr: 'Tableau de bord', labelEn: 'Dashboard' },
          { id: 'missions', labelFr: 'Missions', labelEn: 'Missions' },
          { id: 'pricing', labelFr: 'Tarifs', labelEn: 'Pricing' },
        ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 h-[68px] flex items-center justify-between gap-2 sm:gap-6">
        {/* Brand Wordmark + Graduation Cap */}
        <button
          type="button"
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center gap-2 text-lg sm:text-[21px] font-extrabold tracking-tight whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F3A68] rounded-md"
        >
          <span className="w-8 h-8 rounded-lg bg-[#1F3A68] text-[#C9A24B] inline-flex items-center justify-center shrink-0 shadow-xs">
            <GraduationCap className="w-4.5 h-4.5" aria-hidden="true" />
          </span>
          <span className="font-display">
            <span className="text-[#1F3A68]">chabab</span>
            <span className="text-[#C9A24B]">exper</span>
          </span>
        </button>

        {/* Center Nav Links */}
        <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#1F3A68] font-semibold'
                    : 'text-slate-600 hover:text-[#1F3A68]'
                }`}
              >
                {lang === 'fr' ? item.labelFr : item.labelEn}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-[#1F3A68] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Role Switcher + Notifications Bell + FR/EN */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Role Switcher */}
          <div
            role="group"
            aria-label={lang === 'fr' ? 'Choix du rôle' : 'Role switcher'}
            className="flex items-center p-0.5 sm:p-1 bg-slate-100 rounded-lg border border-slate-200/80"
          >
            <button
              type="button"
              onClick={() => onSwitchRole('youth')}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                role === 'youth'
                  ? 'bg-[#1F3A68] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="hidden sm:inline w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">
                {lang === 'fr' ? 'Je suis un jeune' : 'Youth (Youssef)'}
              </span>
              <span className="sm:hidden">Youssef</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchRole('organization')}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                role === 'organization'
                  ? 'bg-[#1F3A68] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="hidden sm:inline w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">
                {lang === 'fr' ? 'Je suis une organisation' : 'Org (Atlas Digital)'}
              </span>
              <span className="sm:hidden">Atlas</span>
            </button>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              type="button"
              aria-label={lang === 'fr' ? 'Notifications' : 'Notifications'}
              aria-expanded={notifOpen}
              onClick={() => {
                setNotifOpen((prev) => !prev);
                if (!notifOpen && unreadCount > 0) onMarkAllRead();
              }}
              className="relative p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C9A24B] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-3.5 z-50 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-[#1F3A68]">
                    {lang === 'fr'
                      ? `Notifications · ${role === 'youth' ? 'Youssef' : 'Atlas Digital'}`
                      : `Notifications · ${role === 'youth' ? 'Youssef' : 'Atlas Digital'}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-medium text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    {lang === 'fr' ? 'Fermer' : 'Close'}
                  </button>
                </div>

                {roleNotifs.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    {lang === 'fr' ? 'Aucune notification.' : 'No notifications.'}
                  </p>
                ) : (
                  <ul className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                    {roleNotifs.slice(0, 6).map((n) => (
                      <li key={n.id} className="py-2.5 first:pt-1 last:pb-1 space-y-0.5 text-xs">
                        <p className="text-slate-800 leading-snug">
                          {lang === 'fr' ? n.messageFr : n.messageEn}
                        </p>
                        <span className="text-[11px] text-slate-400">{n.createdAt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* FR / EN Toggle */}
          <button
            type="button"
            onClick={onToggleLang}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </div>

      {/* Mobile Nav Strip */}
      <nav
        aria-label="Navigation mobile"
        className="flex lg:hidden items-center gap-4 px-4 pb-2 overflow-x-auto border-t border-slate-100"
      >
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`pt-2 pb-1 text-xs font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                isActive
                  ? 'border-[#1F3A68] text-[#1F3A68] font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              {lang === 'fr' ? item.labelFr : item.labelEn}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
