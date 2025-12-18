import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../contexts/ToastContext';
import { Loader2 } from 'lucide-react';

interface Championship {
  id: string;
  name: string;
}

interface CreateLeagueFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateLeagueForm: React.FC<CreateLeagueFormProps> = ({ onSuccess, onCancel }) => {
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [leagueName, setLeagueName] = useState('');
  const [championshipId, setChampionshipId] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingChampionships, setLoadingChampionships] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    fetchChampionships();
  }, []);

  const fetchChampionships = async () => {
    try {
      setLoadingChampionships(true);
      const { data, error } = await supabase
        .from('championships')
        .select('id, name')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setChampionships(data || []);
      if (data && data.length > 0) {
        setChampionshipId(data[0].id);
      }
    } catch (err) {
      addToast('Erro ao carregar campeonatos', 'error');
    } finally {
      setLoadingChampionships(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leagueName.trim()) {
      addToast('Digite um nome para o bolão', 'warning');
      return;
    }

    if (!championshipId) {
      addToast('Selecione um campeonato', 'warning');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.rpc('create_league_rpc', {
        p_championship_id: championshipId,
        p_name: leagueName.trim(),
      });

      if (error) throw error;

      addToast('Bolão criado com sucesso!', 'success');
      onSuccess();
    } catch (err) {
      addToast('Erro ao criar bolão', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Criar novo bolão</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Campeonato</label>
          <select
            value={championshipId}
            onChange={(e) => setChampionshipId(e.target.value)}
            disabled={loadingChampionships || loading}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {loadingChampionships ? (
              <option>Carregando...</option>
            ) : championships.length === 0 ? (
              <option>Nenhum campeonato disponível</option>
            ) : (
              championships.map((championship) => (
                <option key={championship.id} value={championship.id}>
                  {championship.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Nome do bolão</label>
          <input
            type="text"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            placeholder="Ex: Bolão com os amigos"
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || loadingChampionships}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Criar bolão'}
          </button>
        </div>
      </form>
    </div>
  );
};
