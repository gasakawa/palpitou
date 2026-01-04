import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PoliticaDePrivacidade: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100">
      <Header minimal />

      <main className="pt-16">
        {/* HERO */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div
              className="absolute bottom-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Política de Privacidade
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Aqui a ideia é simples: coletamos o mínimo possível e usamos seus dados apenas para fazer o Palpitou
              funcionar.
            </p>
          </div>
        </section>

        {/* 1. O QUE COLETAMOS */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">1. Quais dados coletamos</h2>
              <p className="text-slate-600 leading-relaxed">
                O Palpitou coleta apenas o necessário para criar sua conta e identificar você no bolão:
              </p>
              <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                <li>
                  <strong>Nome</strong>
                </li>
                <li>
                  <strong>E-mail</strong>
                </li>
              </ul>

              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl p-5 text-sm">
                <strong className="block text-[13px] uppercase tracking-[0.2em] text-emerald-600 mb-1">
                  Sem excesso
                </strong>
                A gente não pede telefone, CPF, endereço nem nada do tipo.
              </div>
            </div>
          </div>
        </section>

        {/* 2. COMO USAMOS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">2. Como usamos seus dados</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">2.1 Para mostrar seu nome no bolão</h3>
                <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                  <li>
                    Exibir seu <strong>nome</strong> no ranking do bolão.
                  </li>
                  <li>
                    Exibir seu <strong>nome</strong> nos palpites quando eles estiverem visíveis aos demais
                    participantes (por exemplo, após o início do jogo, conforme o Regulamento).
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">2.2 Para notificações importantes</h3>
                <p className="text-slate-600 leading-relaxed">
                  Usamos seu <strong>e-mail</strong> para enviar notificações quando necessário — por exemplo, avisos
                  importantes sobre sua conta, segurança e mudanças relevantes no funcionamento do Palpitou.
                </p>
                <p className="text-slate-500 text-xs italic">
                  Não usamos seu e-mail para spam e não fazemos publicidade de terceiros.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COMPARTILHAMENTO */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">3. Compartilhamento</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">3.1 Com outros participantes</h3>
                <p className="text-slate-600 leading-relaxed">
                  O seu <strong>nome</strong> pode aparecer para outros participantes do mesmo bolão no ranking e nos
                  palpites, conforme as regras da Plataforma.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">3.2 Com provedores de tecnologia</h3>
                <p className="text-slate-600 leading-relaxed">
                  Para o Palpitou funcionar, usamos serviços de infraestrutura (por exemplo, autenticação e banco de
                  dados). Esses serviços podem processar os dados somente para viabilizar a operação da Plataforma.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">3.3 O que a gente NÃO faz</h3>
                <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                  <li>Não vendemos seus dados.</li>
                  <li>Não alugamos seus dados.</li>
                  <li>Não compartilhamos seus dados para marketing de terceiros.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SEGURANÇA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">4. Segurança</h2>
              <p className="text-slate-600 leading-relaxed">
                A gente toma medidas razoáveis para proteger seus dados. Mesmo assim, nenhum sistema é 100% infalível —
                então sempre é bom manter sua conta segura e não compartilhar acesso com ninguém.
              </p>
            </div>
          </div>
        </section>

        {/* 5. SEUS CONTROLES */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">5. Seus controles</h2>
              <p className="text-slate-600 leading-relaxed">
                Você pode solicitar correção ou exclusão da sua conta e dos seus dados pelos{' '}
                <strong>canais informados na Plataforma</strong>.
              </p>
              <p className="text-slate-500 text-xs italic">
                Em alguns casos, pode existir retenção mínima por segurança e integridade (por exemplo, para lidar com
                abuso ou fraudes).
              </p>
            </div>
          </div>
        </section>

        {/* 6. ALTERAÇÕES */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">6. Alterações nesta política</h2>
              <p className="text-slate-600 leading-relaxed">
                Podemos atualizar esta política para refletir melhorias do produto. A versão mais recente sempre estará
                disponível aqui.
              </p>
            </div>
          </div>
        </section>

        {/* 7. CONTATO */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">7. Contato</h2>
              <p className="text-slate-600 leading-relaxed">
                Se tiver dúvidas sobre privacidade e dados, fale com a gente pelos{' '}
                <strong>canais informados na Plataforma</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaDePrivacidade;
