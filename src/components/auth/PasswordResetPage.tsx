import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface PasswordResetPageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ onNavigate }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !newPassword || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    const res = resetPassword(email, newPassword);
    if (res.success) {
      setSuccessMessage('Password has been successfully updated! You can now log in.');
    } else {
      setErrorMessage(res.error || 'Failed to update password.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 sm:p-8 shadow-xs">
        
        <button
          onClick={() => onNavigate('login')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7787] hover:text-[#24364B] mb-5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>

        <h1 className="text-2xl font-bold text-[#24364B] mb-2">Reset Password</h1>
        <p className="text-xs text-[#6B7787] mb-6">
          Enter your registered school/personal email and choose a new password.
        </p>

        {errorMessage && (
          <div className="mb-5 p-3.5 bg-[#FDF2F2] border border-[#F8B4B4] rounded-lg text-xs text-[#9B1C1C] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3.5 bg-[#DEF7EC] border border-[#BCF0DA] rounded-lg text-xs text-[#03543F] flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <p>{successMessage}</p>
              <button
                onClick={() => onNavigate('login')}
                className="mt-2 font-bold underline cursor-pointer"
              >
                Proceed to Login
              </button>
            </div>
          </div>
        )}

        {!successMessage && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
                Registered Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kavya@school.edu.in"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#F4E7AE] hover:bg-[#EBDC9A] border border-[#DFC974] text-[#24364B] font-bold text-sm rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
