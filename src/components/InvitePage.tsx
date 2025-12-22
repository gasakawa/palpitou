import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, LogIn } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { useJoinLeague } from '../hooks/useJoinLeague';
import { useToast } from '../contexts/ToastContext';
import { Button } from './ui/Button';
import logo from '../assets/images/palpitou-logo.png';

export const InvitePage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const { state, joinLeague, persistCode, getPersistedCode, reset } = useJoinLeague();

  // Handle authenticated user joining the league
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      // User not authenticated, persist code for later
      if (code) {
        persistCode(code);
      }
      return;
    }

    // User is authenticated, attempt to join
    if (code) {
      joinLeague(code);
    } else {
      // Try to use persisted code if available
      const persistedCode = getPersistedCode();
      if (persistedCode) {
        joinLeague(persistedCode);
      } else {
        navigate('/');
      }
    }
  }, [user, authLoading, code, joinLeague, persistCode, getPersistedCode, navigate]);

  // Handle successful join
  useEffect(() => {
    if (state.success && state.leagueId) {
      addToast(`Bem-vindo ao bolão "${state.leagueName}"!`, 'success');
      // Redirect to league detail after a short delay
      const timer = setTimeout(() => {
        navigate(`/leagues/${state.leagueId}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, state.leagueId, state.leagueName, navigate, addToast]);

  // Handle error
  useEffect(() => {
    if (state.error) {
      addToast(state.error, 'error');
    }
  }, [state.error, addToast]);

  const handleSignIn = () => {
    navigate('/signin', { state: { from: location } });
  };

  const handleSignUp = () => {
    navigate('/signup', { state: { from: location } });
  };

  const handleGoHome = () => {
    reset();
    navigate('/');
  };

  // Loading authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 font-medium">
            ← Voltar para home
          </button>

          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <img src={logo} alt="Palpitou" className="h-20 mx-auto mb-6" />

            <h1 className="text-2xl font-bold text-slate-900 mb-2">Você foi convidado!</h1>
            <p className="text-slate-600 mb-8">Para entrar no bolão, você precisa criar uma conta ou fazer login.</p>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
                onClick={handleSignIn}>
                <LogIn className="h-5 w-5 mr-2" />
                Entrar com sua conta
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full h-12 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-medium rounded-lg transition-colors"
                onClick={handleSignUp}>
                Criar nova conta
              </Button>
            </div>

            <p className="text-xs text-slate-500 mt-6">
              Após autenticar, você será automaticamente adicionado ao bolão.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Joining league
  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Entrando no bolão...</p>
        </div>
      </div>
    );
  }

  // Success
  if (state.success && state.leagueId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-emerald-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">Sucesso!</h1>
          <p className="text-slate-600 mb-8">
            Você entrou no bolão <span className="font-semibold text-emerald-600">{state.leagueName}</span>.
            Redirecionando para a página do bolão...
          </p>

          <Loader2 className="h-6 w-6 text-emerald-500 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // Error
  if (state.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 font-medium">
            ← Voltar para home
          </button>

          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">Opa!</h1>
            <p className="text-slate-600 mb-8">{state.error}</p>

            <Button
              size="lg"
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
              onClick={handleGoHome}>
              Voltar para home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
