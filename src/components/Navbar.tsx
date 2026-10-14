import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Award, 
  Trophy, 
  Info, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown,
  Flame,
  Code2
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string, params?: Record<string, any>) => {
    onNavigate(view, params);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'dashboard', label: 'My Learning' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2DFD2] shadow-[0_4px_20px_-4px_rgba(36,54,75,0.06)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">
          
          {/* 1. Brand Logo & Tagline */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            {/* Glowing Icon Emblem */}
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#24364B] via-[#1A2838] to-[#0F1722] text-[#F4E7AE] flex items-center justify-center font-black text-lg sm:text-xl tracking-tight shadow-md border border-[#DFC974]/30 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                <span className="font-mono tracking-tighter">&lt;CQ&gt;</span>
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#F4E7AE] border-2 border-[#FFFFFF] rounded-full animate-bubble-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[#24364B] text-lg sm:text-xl tracking-tight leading-tight group-hover:text-[#000000] transition-colors">
                  CodeQuest
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#F4E7AE]/70 text-[#8B6E07] px-1.5 py-0.5 rounded-full border border-[#DFC974]/60 hidden sm:inline-block">
                  Class 10-12
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#6B7787] tracking-normal flex items-center gap-1.5">
                <span>Learn to Code. Play to Win.</span>
              </span>
            </div>
          </div>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center p-1 bg-[#FAF8F0]/80 rounded-xl border border-[#E2DFD2]/70 shadow-2xs">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-bold transition-all duration-200 rounded-lg cursor-pointer ${
                    isActive
                      ? 'text-[#24364B] bg-[#FFFFFF] shadow-xs border border-[#E2DFD2]'
                      : 'text-[#6B7787] hover:text-[#24364B] hover:bg-[#FFFFFF]/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#8B6E07] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. Right Action: Dynamic Student Profile & Stats */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center space-x-2.5">
                
                {/* Level & XP Bubble Badge */}
                <div 
                  onClick={() => handleNavClick('achievements')}
                  className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-[#FDF9E7] to-[#FAF4DC] border border-[#DFC974] hover:border-[#8B6E07] px-3 py-1.5 rounded-full shadow-2xs hover:shadow-xs transition-all hover:scale-102"
                  title="Your Current Level & Total XP"
                >
                  <div className="w-5 h-5 rounded-full bg-[#8B6E07] text-[#FFFFFF] text-[10px] font-black flex items-center justify-center shadow-xs">
                    {currentUser.level}
                  </div>
                  <span className="text-xs font-black text-[#24364B]">
                    Lvl {currentUser.level}
                  </span>
                  <span className="text-[#DFC974]">·</span>
                  <span className="text-xs font-black text-[#8B6E07] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A30B] animate-bubble-pulse" />
                    {currentUser.totalXp} XP
                  </span>
                </div>

                {/* Student Profile Chip with Avatar */}
                <button
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2.5 bg-[#FFFFFF] hover:bg-[#FAF8F0] border border-[#E2DFD2] hover:border-[#24364B]/40 pl-1.5 pr-3 py-1.5 rounded-full transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  {/* Avatar Circle with Online Dot */}
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-[#24364B] text-[#F4E7AE] font-black text-xs flex items-center justify-center uppercase shadow-2xs border border-[#DFC974]/40">
                      {currentUser.username.substring(0, 2)}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#196B36] border-2 border-[#FFFFFF] rounded-full" />
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="text-xs font-extrabold text-[#24364B] group-hover:text-[#000000] leading-tight">
                      {currentUser.username}
                    </span>
                    <span className="text-[10px] text-[#6B7787] leading-none">
                      {currentUser.userClass}
                    </span>
                  </div>

                  <ChevronDown className="w-3.5 h-3.5 text-[#6B7787] group-hover:text-[#24364B] transition-colors ml-0.5" />
                </button>

                {/* Log Out Button */}
                <button
                  onClick={() => {
                    logout();
                    handleNavClick('landing');
                  }}
                  title="Log Out"
                  className="text-[#6B7787] hover:text-[#C53030] p-2 rounded-full hover:bg-[#FDF2F2] transition-colors cursor-pointer border border-transparent hover:border-[#F8B4B4]"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-[#24364B] hover:text-[#000000] hover:bg-[#FAF8F0] rounded-lg transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="px-4 py-2 text-xs sm:text-sm font-black text-[#24364B] bg-[#F4E7AE] hover:bg-[#EBDC9A] border border-[#DFC974] rounded-lg transition-all shadow-xs hover:shadow-md cursor-pointer hover:scale-102"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#24364B] hover:bg-[#FAF8F0] border border-[#E2DFD2] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2DFD2] bg-[#FFFFFF] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-bold ${
                currentView === link.id
                  ? 'bg-[#FAF8F0] text-[#24364B] border border-[#E2DFD2]'
                  : 'text-[#6B7787] hover:text-[#24364B]'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-[#E2DFD2] space-y-2">
            {isAuthenticated && currentUser ? (
              <>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#FDF9E7] to-[#FAF4DC] border border-[#DFC974] rounded-xl">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#24364B] text-[#F4E7AE] font-black text-xs flex items-center justify-center uppercase">
                      {currentUser.username.substring(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#24364B]">{currentUser.fullName}</div>
                      <div className="text-[10px] text-[#6B7787]">@{currentUser.username} · {currentUser.userClass}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-[#8B6E07] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4A30B]" />
                      {currentUser.totalXp} XP
                    </span>
                    <span className="text-[10px] text-[#6B7787] font-semibold">Lvl {currentUser.level}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleNavClick('profile')}
                    className="w-full text-center py-2 text-xs font-bold border border-[#E2DFD2] rounded-lg text-[#24364B] bg-[#FAF8F0]"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => handleNavClick('settings')}
                    className="w-full text-center py-2 text-xs font-bold border border-[#E2DFD2] rounded-lg text-[#24364B] bg-[#FAF8F0]"
                  >
                    Settings
                  </button>
                </div>
                <button
                  onClick={() => {
                    logout();
                    handleNavClick('landing');
                  }}
                  className="w-full text-center py-2 text-xs font-bold text-[#C53030] hover:bg-[#FDF2F2] rounded-lg border border-[#F8B4B4]"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full py-2.5 text-xs font-bold text-[#24364B] border border-[#E2DFD2] rounded-lg text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="w-full py-2.5 text-xs font-black text-[#24364B] bg-[#F4E7AE] border border-[#DFC974] rounded-lg text-center shadow-xs"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
