import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../contexts/ToastContext';
import { LeagueCard } from './LeagueCard';

interface League {
  league_id: string;
  league_name: string;
  join_code: string;
  role: string;
  championship_id: string;
  championship_name: string;
  created_at: string;
}

export const LeaguesList: React.FC<{ onCreateNew: () => void }> = ({ onCreateNew }) => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('list_my_leagues_rpc');

      if (error) throw error;
      setLeagues(data || []);
    } catch (err) {
      addToast('Erro ao carregar bolões', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast('Código copiado!', 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-400">Carregando bolões...</div>
      </div>
    );
  }

  if (leagues.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 mb-6">Você não tem nenhum bolão ainda.</p>
        <button
          onClick={onCreateNew}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm">
          Criar bolão
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Meus Bolões</h2>
        <button
          onClick={onCreateNew}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-4 py-2 rounded-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm">
          Criar bolão
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <LeagueCard
            key={league.league_id}
            league_id={league.league_id}
            league_name={league.league_name}
            join_code={league.join_code}
            role={league.role}
            championship_name={league.championship_name}
            created_at={league.created_at}
            copiedCode={copiedCode}
            onCopyToClipboard={copyToClipboard}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
};
