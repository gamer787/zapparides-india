import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { DriversManagementPage } from './pages/DriversManagementPage';
import { TripsPage } from './pages/TripsPage';
import { GSTPage } from './pages/GSTPage';
import { DriversPage } from './pages/DriversPage';
import { DriverIntakePage } from './pages/DriverIntakePage';
import { SettingsPage } from './pages/SettingsPage';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/users" element={<UsersPage />} />
      <Route path="/dashboard/drivers" element={<DriversManagementPage />} />
      <Route path="/dashboard/trips" element={<TripsPage />} />
      <Route path="/dashboard/gst" element={<GSTPage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />
      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/driver-intake" element={<DriverIntakePage />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);