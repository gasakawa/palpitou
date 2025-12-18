import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { LogOut } from 'lucide-react';
import { LeaguesList } from './LeaguesList';
import { CreateLeagueForm } from './CreateLeagueForm';
import Logo from './Logo';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 relative overflow-hidden w-full font-sans">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-0 mb-8 border-b border-white/10 pb-4">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto">
            <span className="text-sm text-slate-400">
              Logado como: <span className="text-white">{user?.email}</span>
            </span>
            <button
              onClick={signOut}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors text-sm">
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </header>

        <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {showCreateForm ? (
            <CreateLeagueForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreateForm(false)} />
          ) : (
            <LeaguesList key={refreshTrigger} onCreateNew={() => setShowCreateForm(true)} />
          )}
        </div>
      </div>
    </div>
  );
};
