import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserClass, CourseId, LanguagePreference } from '../../types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Trash2, 
  Save, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const { currentUser, updateProfile, deleteAccount, logout } = useAuth();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [userClass, setUserClass] = useState<UserClass>(currentUser?.userClass || 'Class 11');
  const [preferredCourse, setPreferredCourse] = useState<CourseId>(currentUser?.preferredCourse || 'python');
  const [explanationPreference, setExplanationPreference] = useState<LanguagePreference>(
    currentUser?.explanationPreference || 'English'
  );

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <h2 className="text-xl font-bold text-[#24364B] mb-2">No Active Session</h2>
        <button
          onClick={() => onNavigate('login')}
          className="px-4 py-2 bg-[#24364B] text-[#FFFFFF] rounded-md text-xs font-bold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!fullName.trim()) {
      setFeedback({ type: 'error', message: 'Full name cannot be empty.' });
      return;
    }

    updateProfile({
      fullName: fullName.trim(),
      userClass,
      preferredCourse,
      explanationPreference,
    });

    setFeedback({ type: 'success', message: 'Profile preferences updated successfully!' });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!newPassword || newPassword.length < 6) {
      setFeedback({ type: 'error', message: 'New password must be at least 6 characters.' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setFeedback({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    setFeedback({ type: 'success', message: 'Password updated successfully!' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleDeleteAccount = () => {
    if (confirmDelete) {
      deleteAccount();
      onNavigate('landing');
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <div>
        <button
          onClick={() => onNavigate('profile')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7787] hover:text-[#24364B] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Profile</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-black text-[#24364B] mt-2">
          Account Settings & Preferences
        </h1>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-lg text-xs sm:text-sm flex items-start gap-2 border ${
            feedback.type === 'success'
              ? 'bg-[#DEF7EC] border-[#BCF0DA] text-[#03543F]'
              : 'bg-[#FDF2F2] border-[#F8B4B4] text-[#9B1C1C]'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* 1. GENERAL INFORMATION FORM */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#24364B] mb-4">
          Personal Information
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
                Username (Fixed)
              </label>
              <input
                type="text"
                disabled
                value={currentUser.username}
                className="w-full px-3 py-2 bg-[#FAF8F0]/50 border border-[#E2DFD2] rounded-md text-sm text-[#6B7787] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
                Email (Fixed)
              </label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full px-3 py-2 bg-[#FAF8F0]/50 border border-[#E2DFD2] rounded-md text-sm text-[#6B7787] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
                Current School Grade
              </label>
              <select
                value={userClass}
                onChange={(e) => setUserClass(e.target.value as UserClass)}
                className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
              >
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
                Preferred Focus Course
              </label>
              <select
                value={preferredCourse}
                onChange={(e) => setPreferredCourse(e.target.value as CourseId)}
                className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
              >
                <option value="python">Python (100 Topics)</option>
                <option value="java">Java (100 Topics)</option>
                <option value="cpp">C++ (100 Topics)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
              Default Explanation Language
            </label>
            <div className="flex gap-3">
              {[
                { id: 'English', label: 'Standard English' },
                { id: 'Tamil/Tanglish', label: 'Tamil / Tanglish (Bilingual)' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setExplanationPreference(item.id as LanguagePreference)}
                  className={`px-3 py-2 text-xs font-semibold rounded-md border cursor-pointer ${
                    explanationPreference === item.id
                      ? 'bg-[#24364B] text-[#FFFFFF] border-[#24364B]'
                      : 'bg-[#FAF8F0] text-[#6B7787] border-[#E2DFD2]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F4E7AE] hover:bg-[#EBDC9A] border border-[#DFC974] text-[#24364B] font-bold text-xs rounded-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. PASSWORD CHANGE SECTION */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-xl p-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#24364B] mb-4">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Repeat new password"
              className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-[#FAF8F0] hover:bg-[#E2DFD2] border border-[#E2DFD2] text-[#24364B] font-bold text-xs rounded-md transition-colors cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* 3. DANGER ZONE: LOGOUT & ACCOUNT DELETION */}
      <div className="bg-[#FFFFFF] border border-[#F8B4B4] rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#9B1C1C]">
          Account Session & Deletion
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#F8B4B4]/50">
          <div>
            <div className="text-sm font-bold text-[#24364B]">Sign Out</div>
            <div className="text-xs text-[#6B7787]">Safely terminate active browser session.</div>
          </div>
          <button
            onClick={() => {
              logout();
              onNavigate('landing');
            }}
            className="px-4 py-2 bg-[#FAF8F0] border border-[#E2DFD2] hover:bg-[#FDF2F2] hover:text-[#C53030] text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#F8B4B4]/50">
          <div>
            <div className="text-sm font-bold text-[#9B1C1C]">Delete Student Account</div>
            <div className="text-xs text-[#6B7787]">Permanently removes your learning history, XP, and badges.</div>
          </div>

          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-[#C53030] hover:bg-[#9B1C1C] text-[#FFFFFF] text-xs font-bold rounded-md cursor-pointer"
              >
                Confirm Delete Forever
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-3 py-2 bg-[#FAF8F0] text-xs font-semibold rounded-md border border-[#E2DFD2] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="px-4 py-2 bg-[#FDF2F2] hover:bg-[#FDE8E8] text-[#9B1C1C] border border-[#F8B4B4] text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
