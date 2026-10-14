import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CourseId, LanguagePreference, UserClass } from '../../types';
import { AlertCircle, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface SignUpPageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userClass, setUserClass] = useState<UserClass>('Class 11');
  const [preferredCourse, setPreferredCourse] = useState<CourseId>('python');
  const [explanationPreference, setExplanationPreference] = useState<LanguagePreference>('English');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !username.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (username.length < 3) {
      setErrorMessage('Username must be at least 3 characters long.');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setErrorMessage('Username may only contain letters, numbers, and underscores.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid school or personal email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the applicable terms and privacy policy.');
      return;
    }

    const res = register({
      fullName,
      username,
      email,
      password,
      userClass,
      preferredCourse,
      explanationPreference,
    });

    if (res.success) {
      onNavigate('dashboard');
    } else {
      setErrorMessage(res.error || 'Failed to complete registration.');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 sm:p-8 shadow-xs">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#24364B] text-[#F4E7AE] font-black text-lg mx-auto flex items-center justify-center mb-3">
            CQ
          </div>
          <h1 className="text-2xl font-bold text-[#24364B]">Create Student Account</h1>
          <p className="text-sm text-[#6B7787] mt-1">
            Start tracking your progress, achievements, and XP across 300 topics.
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
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Arun Kumar"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B] focus:bg-[#FFFFFF]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
                Username *
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. arun_coder"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B] focus:bg-[#FFFFFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@school.edu.in"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B] focus:bg-[#FFFFFF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B] focus:bg-[#FFFFFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B] focus:bg-[#FFFFFF]"
              />
            </div>
          </div>

          {/* Student Class Selection */}
          <div>
            <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
              Current Grade / Class *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Class 10', 'Class 11', 'Class 12', 'Other'] as UserClass[]).map((cls) => (
                <button
                  type="button"
                  key={cls}
                  onClick={() => setUserClass(cls)}
                  className={`py-2 text-xs font-bold rounded-md border text-center transition-colors cursor-pointer ${
                    userClass === cls
                      ? 'bg-[#24364B] text-[#FFFFFF] border-[#24364B]'
                      : 'bg-[#FAF8F0] text-[#6B7787] border-[#E2DFD2] hover:text-[#24364B]'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Course */}
          <div>
            <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
              Primary Focus Language *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'python', label: 'Python (100)' },
                { id: 'java', label: 'Java (100)' },
                { id: 'cpp', label: 'C++ (100)' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setPreferredCourse(c.id as CourseId)}
                  className={`py-2 text-xs font-bold rounded-md border text-center transition-colors cursor-pointer ${
                    preferredCourse === c.id
                      ? 'bg-[#F4E7AE] text-[#24364B] border-[#DFC974]'
                      : 'bg-[#FAF8F0] text-[#6B7787] border-[#E2DFD2] hover:text-[#24364B]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Explanation preference */}
          <div>
            <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1.5">
              Explanation Language Preference *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'English', label: 'Standard English' },
                { id: 'Tamil/Tanglish', label: 'Bilingual (English + Tamil)' },
              ].map((pref) => (
                <button
                  type="button"
                  key={pref.id}
                  onClick={() => setExplanationPreference(pref.id as LanguagePreference)}
                  className={`py-2 text-xs font-bold rounded-md border text-center transition-colors cursor-pointer ${
                    explanationPreference === pref.id
                      ? 'bg-[#DCEBFA] text-[#24364B] border-[#B0D3F5]'
                      : 'bg-[#FAF8F0] text-[#6B7787] border-[#E2DFD2] hover:text-[#24364B]'
                  }`}
                >
                  {pref.label}
                </button>
              ))}
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="pt-2 flex items-start gap-2.5">
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-[#E2DFD2] text-[#24364B] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-[#6B7787] leading-relaxed cursor-pointer">
              I agree to the CodeQuest educational terms of use and student privacy guidelines.
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-[#F4E7AE] hover:bg-[#EBDC9A] border border-[#DFC974] text-[#24364B] font-bold text-sm rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create Student Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E2DFD2] text-center text-xs text-[#6B7787]">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-[#24364B] hover:underline cursor-pointer"
          >
            Log In here
          </button>
        </div>
      </div>
    </div>
  );
};
