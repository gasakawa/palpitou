import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useDeleteLeagueMember, useLeagueMembers } from '../hooks/useLeagueMembers';
import { useAuth } from '../auth/AuthProvider';

interface LeagueMembersSectionProps {
  leagueId?: string;
  isAdmin: boolean;
}

export const LeagueMembersSection: React.FC<LeagueMembersSectionProps> = ({ leagueId, isAdmin }) => {
  const { addToast } = useToast();
  const { data: membersData, isLoading, isError } = useLeagueMembers(leagueId);
  const deleteMemberMutation = useDeleteLeagueMember(leagueId);
  const isDeletingMember = deleteMemberMutation.status === 'pending';
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null);

  const { user } = useAuth();
  const members = membersData || [];

  const handleDeleteMember = (memberId: string) => {
    if (!isAdmin) return;
    if (!leagueId) return;
    setDeletingMemberId(memberId);
    deleteMemberMutation.mutate(memberId, {
      onSuccess: () => {
        addToast('Membro removido com sucesso', 'success');
        setDeletingMemberId(null);
      },
      onError: (error) => {
        console.error('Erro removendo membro:', error);
        addToast('Não foi possível remover o membro', 'error');
        setDeletingMemberId(null);
      },
    });
  };

  const showEmptyState = !isLoading && !isError && members.length === 0;

  return (
    <div className="space-y-4 text-sm">
      {isLoading && <div className="text-slate-400">Carregando membros...</div>}
      {isError && <div className="text-rose-400">Erro ao carregar membros.</div>}
      {showEmptyState && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-slate-400">
          Nenhum membro encontrado neste bolão ainda.
        </div>
      )}

      {!isLoading && !isError && members.length > 0 && (
        <ul className="space-y-3">
          {members.map((member) => (
            <li
              key={member.user_id}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-base font-medium text-white">{member.name}</p>
              </div>
              {isAdmin && user?.id !== member.user_id && (
                <button
                  type="button"
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-rose-400 transition-colors hover:border-rose-300 disabled:border-white/10 disabled:text-slate-400"
                  disabled={isDeletingMember && deletingMemberId === member.user_id}
                  onClick={() => handleDeleteMember(member.user_id)}>
                  {isDeletingMember && deletingMemberId === member.user_id ? 'Removendo...' : 'Remover'}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {!isAdmin && members.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-xs text-slate-500">
          Somente administradores podem remover membros.
        </div>
      )}
    </div>
  );
};
