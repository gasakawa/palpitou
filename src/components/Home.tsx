import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, Gamepad2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { AccordionItem } from './ui/Accordion';
import Header from './Header';
import Footer from './Footer';

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleSignInNavigation = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div
              className="absolute bottom-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2" />A temporada 2026 já começou
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Palpite, ranking e resenha. <br className="hidden md:block" />
              <span className="text-emerald-500">Tudo no mesmo bolão.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Crie seu bolão de futebol em minutos, convide seus amigos e dispute rodada a rodada.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg shadow-lg shadow-emerald-500/20 w-full sm:w-auto"
                onClick={handleSignInNavigation}>
                Criar meu bolão grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {/* <p className="text-xs text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Sem pagamento
                <span className="text-slate-300">•</span>
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Sem anúncios
                <span className="text-slate-300">•</span>
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Funciona no celular
              </p> */}
            </div>
          </div>
        </section>

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
                <span className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-7 w-7" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Crie seu bolão</h3>
                <p className="text-slate-600 leading-relaxed">
                  Escolha o campeonato (Brasileirão, Champions, etc.), dê um nome criativo para o bolão e gere um código
                  de convite único.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300">
                <span className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Convide os amigos</h3>
                <p className="text-slate-600 leading-relaxed">
                  Compartilhe o link ou código no WhatsApp da galera e monte seu grupo. Cada bolão é privado e seguro.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300">
                <span className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="h-7 w-7" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Dê seus palpites</h3>
                <p className="text-slate-600 leading-relaxed">
                  Palpite por placar exato antes do jogo começar, acumule pontos e acompanhe o ranking atualizado em
                  tempo real.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="cta-final" className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-emerald-600 rounded-3xl p-8 md:p-16 text-center md:text-left relative overflow-hidden text-white shadow-2xl shadow-emerald-900/20">
              <span className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-emerald-500 opacity-50" />
              <span className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-emerald-700 opacity-50" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar o bolão?</h2>
                  <p className="text-emerald-50 opacity-90 text-lg">
                    Crie seu bolão agora e comece a disputar com seus amigos ainda hoje. É rápido, fácil e grátis.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-emerald-700 font-bold hover:bg-white h-14 px-8 text-base"
                    onClick={handleSignInNavigation}>
                    Criar bolão grátis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Perguntas Frequentes</h2>
              <p className="text-slate-600">Tiramos suas dúvidas para você focar apenas em acertar o placar.</p>
            </div>

            <div className="space-y-2">
              <AccordionItem
                title="Precisa pagar para usar o Palpitou?"
                isOpen={openAccordion === 0}
                onClick={() => toggleAccordion(0)}>
                Não. O Palpitou é 100% gratuito. Você pode criar bolões e participar sem custos de assinatura ou taxas
                ocultas.
              </AccordionItem>

              <AccordionItem
                title="Posso criar mais de um bolão?"
                isOpen={openAccordion === 1}
                onClick={() => toggleAccordion(1)}>
                Sim. Você pode criar quantos bolões quiser (um para o trabalho, um para a família, outro para os amigos
                do futebol) e participar de vários simultaneamente.
              </AccordionItem>

              <AccordionItem
                title="Tem dinheiro envolvido?"
                isOpen={openAccordion === 2}
                onClick={() => toggleAccordion(2)}>
                Isso fica totalmente combinado entre os participantes do bolão. O Palpitou cuida apenas da organização,
                pontuação e do ranking oficial. Nós não processamos pagamentos.
              </AccordionItem>

              <AccordionItem
                title="Funciona no celular?"
                isOpen={openAccordion === 3}
                onClick={() => toggleAccordion(3)}>
                Sim. O site é totalmente responsivo, desenhado pensando primeiro na experiência mobile. Você consegue
                palpitar e conferir o ranking de qualquer dispositivo.
              </AccordionItem>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export { Home };
export default Home;
