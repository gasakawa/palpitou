import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from './components/ui/Button';
import { AccordionItem } from './components/ui/Accordion';
import { SignIn1 } from './components/ui/modern-stunning-sign-in';
import { 
  Trophy, 
  Users, 
  Gamepad2, 
  Menu, 
  X, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSignInNavigation = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Palpitando</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('como-funciona')} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
              Como funciona
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
              Dúvidas
            </button>
            <button onClick={handleSignInNavigation} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
              Entrar
            </button>
            <Button size="sm" onClick={handleSignInNavigation}>
              Criar bolão
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4 absolute w-full shadow-lg animate-in slide-in-from-top-5">
            <button onClick={() => scrollToSection('como-funciona')} className="block w-full text-left py-2 text-sm font-medium text-slate-600">
              Como funciona
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-sm font-medium text-slate-600">
              Dúvidas
            </button>
            <button onClick={handleSignInNavigation} className="block w-full text-left py-2 text-sm font-medium text-slate-600">
              Entrar
            </button>
            <Button className="w-full" onClick={handleSignInNavigation}>
              Criar bolão
            </Button>
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
           {/* Background decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
              A temporada 2025 já começou
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Palpite, ranking e zoeira. <br className="hidden md:block"/>
              <span className="text-emerald-500">Tudo no mesmo bolão.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Crie seu bolão de futebol em minutos, convide seus amigos e dispute rodada a rodada com pontuação transparente.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg shadow-lg shadow-emerald-500/20 w-full sm:w-auto" onClick={handleSignInNavigation}>
                Criar meu bolão grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Sem pagamento
                <span className="text-slate-300">•</span>
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Sem anúncios
                <span className="text-slate-300">•</span>
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Funciona no celular
              </p>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Como funciona o Palpitando</h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Simplicidade é nosso lema. Em menos de 2 minutos seu grupo está pronto para começar a palpitar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Crie sua liga</h3>
                <p className="text-slate-600 leading-relaxed">
                  Escolha o campeonato (Brasileirão, Champions, etc.), dê um nome criativo para a liga e gere um código de convite único.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Convide os amigos</h3>
                <p className="text-slate-600 leading-relaxed">
                  Compartilhe o link ou código no WhatsApp da galera e monte seu grupo. Cada liga é privada e segura.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Dê seus palpites</h3>
                <p className="text-slate-600 leading-relaxed">
                  Palpite por placar exato antes do jogo começar, acumule pontos e acompanhe o ranking atualizado em tempo real.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA INTERMEDIÁRIA */}
        <section id="cta-final" className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-emerald-600 rounded-3xl p-8 md:p-16 text-center md:text-left relative overflow-hidden text-white shadow-2xl shadow-emerald-900/20">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-emerald-500 opacity-50"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-emerald-700 opacity-50"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar o bolão?</h2>
                  <p className="text-emerald-50 opacity-90 text-lg">
                    Crie sua liga agora e comece a disputar com seus amigos ainda hoje. É rápido, fácil e grátis.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button size="lg" variant="secondary" className="text-emerald-700 font-bold hover:bg-white h-14 px-8 text-base" onClick={handleSignInNavigation}>
                    Criar bolão grátis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Perguntas Frequentes</h2>
              <p className="text-slate-600">Tiramos suas dúvidas para você focar apenas em acertar o placar.</p>
            </div>

            <div className="space-y-2">
              <AccordionItem 
                title="Precisa pagar para usar o Palpitando?" 
                isOpen={openAccordion === 0} 
                onClick={() => toggleAccordion(0)}
              >
                Não. O Palpitando é 100% gratuito. Você pode criar ligas e participar sem custos de assinatura ou taxas ocultas.
              </AccordionItem>

              <AccordionItem 
                title="Posso criar mais de uma liga?" 
                isOpen={openAccordion === 1} 
                onClick={() => toggleAccordion(1)}
              >
                Sim. Você pode criar quantas ligas quiser (uma para o trabalho, uma para a família, outra para os amigos do futebol) e participar de várias simultaneamente.
              </AccordionItem>

              <AccordionItem 
                title="Tem dinheiro envolvido?" 
                isOpen={openAccordion === 2} 
                onClick={() => toggleAccordion(2)}
              >
                Isso fica totalmente combinado entre os participantes da liga (off-app). O Palpitando cuida apenas da organização, pontuação e do ranking oficial. Nós não processamos pagamentos.
              </AccordionItem>

              <AccordionItem 
                title="Funciona no celular?" 
                isOpen={openAccordion === 3} 
                onClick={() => toggleAccordion(3)}
              >
                Sim. O site é totalmente responsivo, desenhado pensando primeiro na experiência mobile. Você consegue palpitar e conferir o ranking de qualquer dispositivo.
              </AccordionItem>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="bg-slate-200 p-1.5 rounded-lg">
                <Trophy className="h-4 w-4 text-slate-600" />
              </div>
              <span className="text-lg font-bold text-slate-800">Palpitando</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
              <a href="#" className="hover:text-emerald-600 transition-colors">Termos de uso</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Política de privacidade</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Requisitos técnicos</a>
            </div>

            <div className="text-sm text-slate-500">
              © 2025 Palpitando
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn1 onBack={() => navigate('/')} />} />
    </Routes>
  );
}