import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { GSTCalculation } from '../components/dashboard/GSTCalculation';

export function DashboardPage() {
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
        <DashboardStats />
        <GSTCalculation />
      </div>
    </DashboardLayout>
  );
}