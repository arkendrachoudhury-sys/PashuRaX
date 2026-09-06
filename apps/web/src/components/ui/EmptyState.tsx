import React from 'react';
import { LucideIcon } from 'lucide-react';

export const EmptyState = ({ icon: Icon, title, description, action }: { icon: LucideIcon, title: string, description: string, action?: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
      <div className="rounded-full bg-gray-100 p-3 mb-4">
        <Icon className="h-6 w-6 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 mb-6 text-sm text-gray-500 max-w-sm">{description}</p>
      {action}
    </div>
  );
};
