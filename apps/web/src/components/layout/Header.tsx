import React from 'react';
import { Menu, Bell, User as UserIcon, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { logout, user } = useAuthStore();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 sm:px-6">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="mr-4 md:hidden text-gray-500 hover:text-gray-700">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'HI' : 'EN'}
        </Button>
        <button className="text-gray-500 hover:text-gray-700 relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-white" />
        </button>
        <div className="flex items-center space-x-2 border-l pl-4 ml-4">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <UserIcon className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
          <Button variant="ghost" size="sm" onClick={logout}><LogOut className="h-4 w-4" /></Button>
        </div>
      </div>
    </header>
  );
};
