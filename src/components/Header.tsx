import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from './ui/Button';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

type HeaderProps = {
  /** Shows only the logo without the navigation links or buttons */
  minimal?: boolean;
};

export default function Header({ minimal = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignInNavigation = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
      <div
        className={`container mx-auto px-4 h-16 flex items-center ${minimal ? 'justify-center' : 'justify-between'}`}>
        <Logo />
        {!minimal && (
          <>
            <nav className="hidden md:flex items-center space-x-8">
              <button
                type="button"
                onClick={() => scrollToSection('como-funciona')}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                Como funciona
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('faq')}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                Dúvidas
              </button>
              <button
                type="button"
                onClick={handleSignInNavigation}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                Entrar
              </button>
              <Button size="sm" onClick={handleSignInNavigation}>
                Criar bolão
              </Button>
            </nav>

            <button
              type="button"
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Alternar menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </>
        )}
      </div>

      {!minimal && isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4 absolute w-full shadow-lg animate-in slide-in-from-top-5">
          <button
            type="button"
            onClick={() => scrollToSection('como-funciona')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-600">
            Como funciona
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-600">
            Dúvidas
          </button>
          <button
            type="button"
            onClick={handleSignInNavigation}
            className="block w-full text-left py-2 text-sm font-medium text-slate-600">
            Entrar
          </button>
          <Button className="w-full" onClick={handleSignInNavigation}>
            Criar bolão
          </Button>
        </div>
      )}
    </header>
  );
}
