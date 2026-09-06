import React from 'react';
import { Card, CardContent } from './Card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export const KPICard = ({ title, value, icon: Icon, trend, trendValue }: { title: string, value: string | number, icon: LucideIcon, trend?: 'up' | 'down', trendValue?: string }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex flex-col">
          <div className="text-2xl font-bold">{value}</div>
          {trend && trendValue && (
            <p className="text-xs flex items-center mt-1">
              {trend === 'up' ? <TrendingUp className="h-3 w-3 text-danger mr-1" /> : <TrendingDown className="h-3 w-3 text-success mr-1" />}
              <span className={trend === 'up' ? "text-danger" : "text-success"}>{trendValue}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
