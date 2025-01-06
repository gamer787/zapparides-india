import { useState } from 'react';
import { LoginHeader } from '../components/login/LoginHeader';
import { LoginTabs } from '../components/login/LoginTabs';
import { LoginForm } from '../components/login/LoginForm';

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'support' | 'employee'>('admin');

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <LoginHeader />
      
      <div className="w-full max-w-md">
        <LoginTabs selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
        <LoginForm role={selectedRole} />
      </div>
    </div>
  );
}