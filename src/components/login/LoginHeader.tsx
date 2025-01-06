import { Shield } from 'lucide-react';
import { BackButton } from '../ui/BackButton';

export function LoginHeader() {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-8">
        <BackButton />
        <div className="flex-1 flex flex-col items-center">
          <Shield className="w-16 h-16 text-cyan-400 mb-4" />
          <h1 className="text-4xl font-bold text-cyan-400">Staff Login</h1>
        </div>
        <div className="w-[88px]" /> {/* Spacer for alignment */}
      </div>
    </div>
  );
}