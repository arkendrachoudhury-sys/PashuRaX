import React from 'react';
import { Badge } from './Badge';

export const StatusBadge = ({ status }: { status: string }) => {
  const getVariant = () => {
    switch(status.toUpperCase()) {
      case 'CONFIRMED':
      case 'DEAD':
      case 'CRITICAL':
        return 'danger';
      case 'SUSPECTED':
      case 'TESTING':
      case 'SICK':
      case 'HIGH':
        return 'warning';
      case 'HEALTHY':
      case 'RESOLVED':
      case 'COMPLETED':
        return 'success';
      case 'IN_TRANSIT':
      case 'COLLECTED':
        return 'primary';
      default:
        return 'default';
    }
  };
  return <Badge variant={getVariant()}>{status}</Badge>;
};
