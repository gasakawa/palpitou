import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, LogIn } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { INVITE_STORAGE_KEY } from '../hooks/useJoinLeague';
import { Button } from './ui/Button';
import logo from '../assets/images/palpitou-logo.png';

export const InvitePage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!code) return;
    localStorage.setItem(INVITE_STORAGE_KEY, code);
  }, [code]);

  useEffect(() => {
    if (user && code) {
      navigate('/dashboard');
    }
  }, [user, code, navigate]);

  const handleSignIn = () => {
    navigate('/signin', { state: { from: location } });
  };

  const handleSignUp = () => {
    navigate('/signup', { state: { from: location } });
  };

  const handleGoHome = () => {
    navigate('/');
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mx-auto mb-4" />
        <p className="text-slate-600">Preparando o bolão...</p>
      </div>
    </div>
  );
};
