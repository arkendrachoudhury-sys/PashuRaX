import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Cat, Stethoscope, AlertTriangle, Syringe, Map as MapIcon, BellRing, FlaskConical, Users, Settings } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { cn } from '../ui/Button';

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const links = [
    { to: '/', icon: LayoutDashboard, label: 'nav.dashboard' },
    { to: '/animals', icon: Cat, label: 'nav.animals' },
    { to: '/health-records', icon: Stethoscope, label: 'nav.healthRecords' },
    { to: '/disease-reports', icon: AlertTriangle, label: 'nav.diseaseReports' },
    { to: '/vaccinations', icon: Syringe, label: 'nav.vaccinations' },
    { to: '/surveillance-map', icon: MapIcon, label: 'nav.surveillanceMap' },
    { to: '/alerts', icon: BellRing, label: 'nav.alerts' },
    { to: '/lab', icon: FlaskConical, label: 'nav.lab' },
    ...(user?.role === 'ADMIN' ? [{ to: '/users', icon: Users, label: 'nav.users' }] : []),
    { to: '/settings', icon: Settings, label: 'nav.settings' },
  ];

  return (
    <aside className={cn("fixed left-0 top-0 z-40 h-screen w-64 transform bg-white border-r border-gray-200 transition-transform md:translate-x-0", !isOpen && "-translate-x-full")}>
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <span className="text-2xl font-bold text-primary">PashuRaX</span>
      </div>
      <div className="px-6 py-4">
        <div className="text-sm font-medium text-gray-500 mb-2">{user?.role}</div>
      </div>
      <nav className="space-y-1 px-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => cn("flex items-center rounded-md px-3 py-2 text-sm font-medium", isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100")}
          >
            <link.icon className="mr-3 h-5 w-5" />
            {t(link.label)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
