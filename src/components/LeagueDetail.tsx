import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchLeagueDetails, LeagueDetails } from '../lib/rpc/leagues';
import { LeagueDetailHeader } from './LeagueDetailHeader';
import { LeagueMatchesSection } from './LeagueMatchesSection';
import { LeagueRankingSection } from './LeagueRankingSection';
import { LeagueMyPointsSection } from './LeagueMyPointsSection';
import { LeagueTransparencyModal } from './LeagueTransparencyModal';
import { useToast } from '../contexts/ToastContext';
import type { TabType } from '../types/types';

export const LeagueDetail: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();

  // State
  const [loading, setLoading] = useState(true);
  const [leagueDetails, setLeagueDetails] = useState<LeagueDetails | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('ranking');
  const [isTransparencyModalOpen, setIsTransparencyModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Load league details
  useEffect(() => {
    if (!leagueId) return;

    const loadLeagueDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchLeagueDetails(leagueId);
        setLeagueDetails(details);
      } catch (err) {
        addToast('Erro ao carregar bolão', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadLeagueDetails();
  }, [leagueId, addToast]);

  const handleCopyCode = () => {
    if (leagueDetails) {
      const invitation = `https://palpitou.com.br/invite/${leagueDetails.join_code}`;
      navigator.clipboard.writeText(invitation);
      setCopiedCode(invitation);
      addToast('Código copiado!', 'success');
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const handlePlayerClickFromRanking = (userId: string) => {
    setSelectedUserId(userId);
    setIsTransparencyModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8 relative overflow-hidden w-full font-sans">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 flex items-center justify-center py-20">
          <div className="animate-pulse text-slate-400">Carregando bolão...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 relative overflow-hidden w-full font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar aos bolões</span>
        </button>

        {/* League Header */}
        {leagueDetails && (
          <div className="mb-8">
            <LeagueDetailHeader league={leagueDetails} copiedCode={copiedCode} onCopyCode={handleCopyCode} />
          </div>
        )}

        {/* Matches Section */}
        <div className="mb-8">
          <LeagueMatchesSection leagueId={leagueId || ''} />
        </div>

        {/* Dashboard Tabs Section */}
        <div className="bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
          {/* Tabs Navigation */}
          <div className="flex gap-4 mb-6 border-b border-white/10">
            <button
              onClick={() => setActiveTab('ranking')}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === 'ranking' ? 'text-[#10B981]' : 'text-slate-400 hover:text-white'
              }`}>
              Ranking
              {activeTab === 'ranking' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981]" />}
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === 'points' ? 'text-[#10B981]' : 'text-slate-400 hover:text-white'
              }`}>
              Meus Pontos
              {activeTab === 'points' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981]" />}
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-64">
            {activeTab === 'ranking' && (
              <LeagueRankingSection leagueId={leagueId || ''} onPlayerClick={handlePlayerClickFromRanking} />
            )}

            {activeTab === 'points' && (
              <LeagueMyPointsSection leagueId={leagueId || ''} enabled={activeTab === 'points'} />
            )}
          </div>

          {/* Transparency Button */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => setIsTransparencyModalOpen(true)}
              className="px-6 py-3 bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] rounded-lg hover:bg-[#10B981]/30 transition-colors font-medium">
              Transparência da Liga
            </button>
          </div>
        </div>

        {/* Transparency Modal */}
        <LeagueTransparencyModal
          isOpen={isTransparencyModalOpen}
          onClose={() => setIsTransparencyModalOpen(false)}
          leagueId={leagueId || ''}
          initialUserId={selectedUserId}
          onPlayerClick={setSelectedUserId}
        />
      </div>
    </div>
  );
};
