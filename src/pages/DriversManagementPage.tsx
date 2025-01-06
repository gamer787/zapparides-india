import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DriversManagement } from '../components/dashboard/drivers/DriversManagement';
import { DriverEarnings } from '../components/dashboard/drivers/DriverEarnings';

export function DriversManagementPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DriversManagement />
        <DriverEarnings />
      </div>
    </DashboardLayout>
  );
}