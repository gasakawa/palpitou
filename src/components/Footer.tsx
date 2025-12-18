import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Termos de uso
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Política de privacidade
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Requisitos técnicos
            </a>
          </div>

          <span className="text-sm text-slate-500">© 2025 Palpitando</span>
        </div>
      </div>
    </footer>
  );
}
