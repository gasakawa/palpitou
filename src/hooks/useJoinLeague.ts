import { useRef, useCallback, useState } from 'react';
import { joinLeagueByCode } from '../lib/rpc/leagues';

interface JoinLeagueState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const INVITE_STORAGE_KEY = 'palpitou_invite_code';
const STORAGE_KEY = INVITE_STORAGE_KEY;

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
        await joinLeagueByCode(code);

        setState({
          loading: false,
          error: null,
          success: true,
        });

        clearPersistedCode();
      } catch (err) {
        console.error('Error joining league:', err);
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro inesperado. Tente novamente.';

        // Treat already-member responses as success so the UI can show feedback
        if (errorMessage.toLowerCase().includes('already') || errorMessage.toLowerCase().includes('member')) {
          setState({
            loading: false,
            error: null,
            success: true,
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
