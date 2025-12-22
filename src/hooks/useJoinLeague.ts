import { useRef, useCallback, useState } from 'react';
import { joinLeagueByCode } from '../lib/rpc/leagues';

interface JoinLeagueState {
  loading: boolean;
  error: string | null;
  success: boolean;
  leagueName?: string;
  leagueId?: string;
}

const STORAGE_KEY = 'palpitou_invite_code';

export const useJoinLeague = () => {
  const hasRunRef = useRef(false);
  const [state, setState] = useState<JoinLeagueState>({
    loading: false,
    error: null,
    success: false,
  });

  const persistCode = useCallback((code: string) => {
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const getPersistedCode = useCallback(() => {
    return localStorage.getItem(STORAGE_KEY);
  }, []);

  const clearPersistedCode = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const joinLeague = useCallback(
    async (code: string) => {
      // Prevent multiple executions
      if (hasRunRef.current) {
        return;
      }
      hasRunRef.current = true;

      setState({ loading: true, error: null, success: false });

      try {
        // Call the RPC function to join league by code
        const data = await joinLeagueByCode(code);

        if (!data || data.length === 0) {
          setState({
            loading: false,
            error: 'Código inválido ou expirado.',
            success: false,
          });
          return;
        }

        // Success
        setState({
          loading: false,
          error: null,
          success: true,
          leagueName: data[0].league_name,
          leagueId: data[0].league_id,
        });

        clearPersistedCode();
      } catch (err) {
        console.error('Error joining league:', err);
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro inesperado. Tente novamente.';

        // Check if it's an already member error
        if (errorMessage.toLowerCase().includes('already') || errorMessage.toLowerCase().includes('member')) {
          // Extract league info if available
          setState({
            loading: false,
            error: null,
            success: true,
            leagueName: 'Liga',
            leagueId: undefined,
          });
        } else {
          setState({
            loading: false,
            error: errorMessage || 'Erro ao entrar na liga. Código inválido?',
            success: false,
          });
        }
      }
    },
    [clearPersistedCode],
  );

  const reset = useCallback(() => {
    hasRunRef.current = false;
    setState({ loading: false, error: null, success: false });
  }, []);

  return {
    state,
    joinLeague,
    persistCode,
    getPersistedCode,
    clearPersistedCode,
    reset,
  };
};
