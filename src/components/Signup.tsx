import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import logo from '../assets/images/palpitou-logo.png';
import { useToast } from '../contexts/ToastContext';

interface SignUpProps {
  onBack?: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Por favor, preencha email e senha.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        addToast(error.message, 'error');
      } else {
        addToast('Cadastro realizado! Verifique seu email para confirmar.', 'success');
        navigate('/signin');
      }
    } catch (err) {
      const msg = 'Ocorreu um erro inesperado. Tente novamente.';
      setError(msg);
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (err) {
      const msg = 'Erro ao conectar com Google.';
      setError(msg);
      addToast(msg, 'error');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] relative overflow-hidden w-full font-sans">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Voltar para home</span>
      </button>

      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Centered glass card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#ffffff10] to-[#121212] backdrop-blur-xl border border-white/10 shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 mb-6 shadow-lg shadow-emerald-500/20">
          <img src={logo} alt="Palpitou" className="rounded-lg object-cover" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Crie sua conta</h2>
        <p className="text-slate-400 text-sm mb-8 text-center">Junte-se ao Palpitou e comece a jogar</p>

        {/* Form */}
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex flex-col gap-3">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
              <input
                placeholder="Email"
                type="email"
                value={email}
                disabled={loading}
                className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
              <input
                placeholder="Senha"
                type="password"
                value={password}
                disabled={loading}
                className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
              />
            </div>

            {error && (
              <div className="text-xs text-red-400 text-left px-1 animate-in fade-in slide-in-from-top-1">{error}</div>
            )}
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 text-sm flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Cadastrar'}
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-xs text-slate-500">ou continue com</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 font-medium text-white transition-all text-sm group">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 group-hover:scale-110 transition-transform"
            />
            Google
          </button>

          <div className="w-full text-center mt-4">
            <span className="text-xs text-slate-400">
              Já tem uma conta?{' '}
              <Link to="/signin" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Entre agora
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
