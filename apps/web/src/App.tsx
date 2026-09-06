import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Animals from './pages/Animals';
import AnimalDetail from './pages/AnimalDetail';
import HealthRecords from './pages/HealthRecords';
import DiseaseReports from './pages/DiseaseReports';
import Vaccinations from './pages/Vaccinations';
import SurveillanceMap from './pages/SurveillanceMap';
import Alerts from './pages/Alerts';
import LabManagement from './pages/LabManagement';
import Users from './pages/Users';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (requireAdmin && user?.role !== 'ADMIN') return <Navigate to="/" />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="animals" element={<Animals />} />
        <Route path="animals/:id" element={<AnimalDetail />} />
        <Route path="health-records" element={<HealthRecords />} />
        <Route path="disease-reports" element={<DiseaseReports />} />
        <Route path="vaccinations" element={<Vaccinations />} />
        <Route path="surveillance-map" element={<SurveillanceMap />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="lab" element={<LabManagement />} />
        <Route path="users" element={<ProtectedRoute requireAdmin><Users /></ProtectedRoute>} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
