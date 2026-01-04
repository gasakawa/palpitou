import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermosDeUso: React.FC = () => {
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
              Termos de Uso
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Estes Termos definem as regras, responsabilidades e condições para uso do Palpitou. Ao acessar ou utilizar
              a plataforma, você concorda com o que está descrito aqui.
            </p>
          </div>
        </section>

        {/* BEM-VINDO */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">Bem-vindo ao Palpitou</h2>
              <p className="text-slate-600 leading-relaxed">
                Ao acessar e/ou utilizar o Palpitou (“Plataforma”), você concorda integralmente com estes Termos de Uso
                e com quaisquer atualizações futuras. Se você não concordar, não utilize a Plataforma.
              </p>
            </div>
          </div>
        </section>

        {/* 1. ACEITAÇÃO */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">1. Aceitação dos Termos</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">1.1</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ao navegar e usar o Palpitou, você pode criar uma conta e se tornar um usuário registrado. Ao se
                  registrar, você declara que leu, entendeu e concorda com estes Termos.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">1.2</h3>
                <p className="text-slate-600 leading-relaxed">
                  O Palpitou pode alterar estes Termos a qualquer momento. A versão atualizada será publicada na
                  Plataforma e, quando aplicável, poderá haver notificação por e-mail. É sua responsabilidade revisar
                  estes Termos periodicamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CADASTRO */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">2. Cadastro e elegibilidade</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">2.1</h3>
                <p className="text-slate-600 leading-relaxed">
                  Algumas áreas exigem cadastro (como criação/participação em bolões). Ao se cadastrar, você declara
                  que:
                </p>
                <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                  <li>é elegível para criar uma conta; e</li>
                  <li>forneceu informações verdadeiras, atuais e completas.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">2.2</h3>
                <p className="text-slate-600 leading-relaxed">
                  Você concorda em manter seus dados atualizados. Se houver suspeita razoável de dados falsos ou
                  incompletos, o Palpitou poderá suspender ou encerrar sua conta e/ou restringir o acesso.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">2.3</h3>
                <p className="text-slate-600 leading-relaxed">
                  É proibido usar a Plataforma para fins ilegais, fraudulentos, abusivos ou que violem direitos de
                  terceiros. Você se compromete a utilizar o Palpitou de forma responsável e em conformidade com estes
                  Termos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SEGURANÇA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">3. Conta, senha e segurança</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">3.1</h3>
                <p className="text-slate-600 leading-relaxed">
                  Você é responsável por manter a confidencialidade do seu acesso e por toda atividade realizada na sua
                  conta.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">3.2</h3>
                <p className="text-slate-600 leading-relaxed">Você concorda em:</p>
                <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                  <li>notificar o Palpitou imediatamente sobre uso não autorizado; e</li>
                  <li>encerrar sua sessão ao final do uso (especialmente em dispositivos compartilhados).</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. NATUREZA RECREATIVA */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">4. Natureza recreativa e prêmios</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">4.1</h3>
                <p className="text-slate-600 leading-relaxed">
                  O Palpitou não incentiva apostas e não se responsabiliza por prêmios, valores, pagamentos ou
                  recompensas combinadas entre participantes. Qualquer premiação acordada em um bolão é de
                  responsabilidade exclusiva dos organizadores e participantes.
                </p>

                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl p-5 text-sm">
                  <strong className="block text-[13px] uppercase tracking-[0.2em] text-emerald-600 mb-1">
                    Importante
                  </strong>
                  O Palpitou é uma plataforma recreativa. Se um bolão definir regras sociais ou premiações fora da
                  plataforma, isso não é gerenciado nem garantido pelo Palpitou.
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">4.2</h3>
                <p className="text-slate-600 leading-relaxed">
                  A finalidade da Plataforma é recreativa, com recursos de ranking e pontuação transparente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CONTEÚDO */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">5. Conteúdo na Plataforma</h2>

              <p className="text-slate-600 leading-relaxed">
                A Plataforma pode conter conteúdo produzido pelo Palpitou, conteúdo enviado por usuários (ex.: nome,
                avatar, descrições de bolão e outras informações) e conteúdo de terceiros (ex.: links externos).
              </p>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">5.1 Conteúdo do Palpitou</h3>
                <p className="text-slate-600 leading-relaxed">
                  Todo o conteúdo do Palpitou (layout, textos, marca, código, interface e funcionalidades) é protegido e
                  não pode ser copiado, redistribuído ou explorado para fins comerciais sem autorização.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">5.2 Conteúdo do usuário</h3>
                <p className="text-slate-600 leading-relaxed">
                  Você é responsável pelo que publica. Você declara que não irá publicar conteúdo que:
                </p>
                <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                  <li>viole direitos autorais, marca, privacidade ou outros direitos de terceiros;</li>
                  <li>seja ilegal, difamatório, ofensivo, discriminatório ou que incentive violência;</li>
                  <li>contenha malware, scripts maliciosos ou tentativa de exploração de vulnerabilidades.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">5.3 Moderação</h3>
                <p className="text-slate-600 leading-relaxed">
                  O Palpitou pode remover conteúdo e/ou suspender contas, a seu critério, caso entenda que houve
                  violação destes Termos ou risco à Plataforma e aos usuários.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">5.4 Licença do conteúdo do usuário (limitada)</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ao enviar conteúdo para a Plataforma, você concede ao Palpitou uma licença não exclusiva para
                  armazenar, exibir e processar esse conteúdo apenas para operar e melhorar a Plataforma (por exemplo:
                  mostrar seu nome no ranking, exibir o bolão e exibir seus palpites nos momentos permitidos).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PI */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">6. Propriedade intelectual e marca</h2>
              <p className="text-slate-600 leading-relaxed">
                “Palpitou” e seus elementos visuais são protegidos. Você concorda em não usar nome, marca, identidade
                visual ou materiais do Palpitou sem autorização prévia.
              </p>
            </div>
          </div>
        </section>

        {/* 7. TERCEIROS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">7. Links e serviços de terceiros</h2>
              <p className="text-slate-600 leading-relaxed">
                A Plataforma pode conter links para sites e serviços de terceiros. O Palpitou não controla esses sites e
                não se responsabiliza por seus conteúdos, políticas ou práticas.
              </p>
            </div>
          </div>
        </section>

        {/* 8. DISPONIBILIDADE */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">8. Modificações e disponibilidade do serviço</h2>
              <p className="text-slate-600 leading-relaxed">
                O Palpitou pode modificar, suspender ou descontinuar recursos (temporária ou permanentemente), com ou
                sem aviso, e não será responsabilizado por impactos decorrentes dessas mudanças.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Embora o Palpitou busque manter informações atualizadas, alguns conteúdos podem ficar desatualizados.
              </p>
            </div>
          </div>
        </section>

        {/* 9. PALPITES */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">9. Regras de palpites e apuração</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">9.1 Janela de palpite</h3>
                <p className="text-slate-600 leading-relaxed">
                  Os palpites são feitos jogo a jogo e podem ser criados/alterados até o horário de início da partida.
                  Após esse momento, o palpite fica bloqueado.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">9.2 Integridade</h3>
                <p className="text-slate-600 leading-relaxed">
                  Tentativas de burlar bloqueios, manipular resultados, explorar falhas ou obter vantagem indevida podem
                  resultar em suspensão ou banimento.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">9.3 Horários e resultados</h3>
                <p className="text-slate-600 leading-relaxed">
                  O Palpitou depende de dados cadastrados e do calendário do campeonato. Eventuais divergências
                  operacionais serão tratadas com base nas regras da Plataforma e na necessidade de garantir integridade
                  e consistência (por exemplo: correção de horários cadastrados e reprocessamento de apurações).
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">9.4 Publicação e tempo de processamento</h3>
                <p className="text-slate-600 leading-relaxed">
                  A apuração e a atualização do ranking podem levar algum tempo após o término do jogo (por exemplo:
                  processamento e atualização do bolão).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 10. ISENÇÕES */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">10. Isenções (disclaimers)</h2>
              <p className="text-slate-600 leading-relaxed">
                Você usa a Plataforma por sua conta e risco. O Palpitou não garante que o serviço será ininterrupto,
                livre de erros ou sempre disponível, nem que eventuais falhas serão corrigidas imediatamente.
              </p>
            </div>
          </div>
        </section>

        {/* 11. LIMITAÇÃO */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">11. Limitação de responsabilidade</h2>
              <p className="text-slate-600 leading-relaxed">
                Na extensão permitida pela lei, o Palpitou não se responsabiliza por danos diretos ou indiretos
                decorrentes do uso (ou incapacidade de uso) da Plataforma, acesso não autorizado, falhas de terceiros,
                perda de dados, instabilidades, ou decisões tomadas com base em conteúdo disponibilizado.
              </p>
            </div>
          </div>
        </section>

        {/* 12. RESCISÃO */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">12. Rescisão e encerramento de conta</h2>
              <p className="text-slate-600 leading-relaxed">
                O Palpitou pode suspender ou encerrar o acesso e/ou a conta, com ou sem aviso, em caso de violação
                destes Termos, risco de segurança, fraude, abuso, ou por necessidade operacional.
              </p>
            </div>
          </div>
        </section>

        {/* 13. AVISOS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">13. Avisos e comunicações</h2>
              <p className="text-slate-600 leading-relaxed">
                Notificações podem ser enviadas para o e-mail vinculado à sua conta e/ou exibidas na Plataforma.
              </p>
            </div>
          </div>
        </section>

        {/* 14. DISPOSIÇÕES */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">14. Disposições gerais</h2>
              <p className="text-slate-600 leading-relaxed">
                Se alguma cláusula for considerada inválida, as demais permanecem em vigor. Você não pode ceder seus
                direitos e obrigações destes Termos sem autorização. O Palpitou pode ceder ou transferir direitos e
                obrigações para operação do serviço.
              </p>
            </div>
          </div>
        </section>

        {/* 15. CONTATO */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">15. Contato</h2>
              <p className="text-slate-600 leading-relaxed">
                Para dúvidas, solicitações ou denúncias de violação destes Termos, utilize os canais informados na
                Plataforma.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermosDeUso;
