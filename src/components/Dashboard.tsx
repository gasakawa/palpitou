import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { LogOut } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-2xl font-bold text-emerald-400">Dashboard</h1>
          <div className="flex items-center gap-4">
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

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Meus Bolões</h2>
          <p className="text-slate-400">Você está na área logada. Aqui você poderá gerenciar seus bolões.</p>
        </div>
      </div>
    </div>
  );
};
