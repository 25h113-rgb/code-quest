import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, ArrowRight, UserCheck } from 'lucide-react';

interface LogInPageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const LogInPage: React.FC<LogInPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('kavya_s');
  const [password, setPassword] = useState('DemoStudent123!');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim() || !password) {
      setErrorMessage('Please enter both username/email and password.');
      return;
    }

    const res = login(identifier, password);
    if (res.success) {
      onNavigate('dashboard');
    } else {
      setErrorMessage(res.error || 'Invalid credentials.');
    }
  };

  const handleUseDemo = () => {
    setIdentifier('kavya_s');
    setPassword('DemoStudent123!');
    const res = login('kavya_s', 'DemoStudent123!');
    if (res.success) {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 sm:p-8 shadow-xs">
        
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#24364B] text-[#F4E7AE] font-black text-lg mx-auto flex items-center justify-center mb-3">
            CQ
          </div>
          <h1 className="text-2xl font-bold text-[#24364B]">Log In to CodeQuest</h1>
          <p className="text-sm text-[#6B7787] mt-1">
            Resume your learning journey and continue where you left off.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3.5 bg-[#FDF2F2] border border-[#F8B4B4] rounded-lg text-xs sm:text-sm text-[#9B1C1C] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
              Username or Email
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="kavya_s or student@school.edu.in"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B] focus:bg-[#FFFFFF]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => onNavigate('password-reset')}
                className="text-xs text-[#6B7787] hover:text-[#24364B] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B] focus:bg-[#FFFFFF]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#F4E7AE] hover:bg-[#EBDC9A] border border-[#DFC974] text-[#24364B] font-bold text-sm rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Log In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Account Quick Access */}
        <div className="mt-4 pt-4 border-t border-[#E2DFD2]">
          <button
            type="button"
            onClick={handleUseDemo}
            className="w-full py-2 px-3 bg-[#FAF8F0] hover:bg-[#F4E7AE]/40 border border-[#E2DFD2] text-[#24364B] text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#8B6E07]" />
            <span>Quick Fill Preloaded Demo Account (Kavya - Class 11)</span>
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-[#E2DFD2] text-center text-xs text-[#6B7787]">
          Don't have an account yet?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="font-bold text-[#24364B] hover:underline cursor-pointer"
          >
            Create one free
          </button>
        </div>
      </div>
    </div>
  );
};
