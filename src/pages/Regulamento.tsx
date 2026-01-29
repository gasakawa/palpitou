import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Regulamento: React.FC = () => {
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
              Regulamento Oficial
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              O Palpitou é um bolão online de futebol com pontuação transparente. Aqui você entende como participar,
              como funcionam os palpites e como cada ponto é calculado no ranking.
            </p>
          </div>
        </section>

        {/* COMO PARTICIPAR */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">1. Como participar</h2>

              <p className="text-slate-600 leading-relaxed">
                Para participar do Palpitou, você precisa criar uma conta e entrar em um bolão. Os bolões são privados e
                vinculados a um campeonato.
              </p>

              <ul className="space-y-3 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                <li>Crie sua conta e acesse seu painel para participar.</li>
                <li>Você pode criar um bolão privado em um campeonato e convidar amigos.</li>
                <li>Você entra em um bolão por convite (código ou link, quando disponível).</li>
                <li>
                  Cada bolão pode ter regras sociais definidas pelo organizador (por exemplo: quem pode entrar), e o
                  Palpitou não interfere nessas decisões, salvo em casos de violação deste regulamento.
                </li>
              </ul>

              <div className="bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl p-5 text-sm">
                <strong className="block text-[13px] uppercase tracking-[0.2em] text-slate-500 mb-1">Observação</strong>
                O Palpitou é uma plataforma recreativa de bolão. Participar implica aceitar este regulamento e os termos
                aplicáveis.
              </div>
            </div>
          </div>
        </section>

        {/* PALPITES */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">2. Como funcionam os palpites</h2>

              <ul className="space-y-3 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                <li>Você informa o placar do jogo (ex.: 2 x 1).</li>
                <li>Você pode criar ou alterar seu palpite até o horário de início do jogo.</li>
                <li>Após o jogo começar, o palpite fica bloqueado (não pode ser alterado).</li>
                <li>Após o jogo começar, os palpites passam a ficar visíveis para os demais membros do bolão.</li>
              </ul>

              <p className="text-slate-500 text-xs italic">
                A pontuação considera o placar do tempo regulamentar (90 minutos). Prorrogação e pênaltis não entram no
                cálculo (quando aplicável ao campeonato).
              </p>
            </div>
          </div>
        </section>

        {/* PONTUAÇÃO */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Pontuação</h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                A pontuação do Palpitou é feita com base no seu palpite e no resultado oficial do jogo. A lógica segue
                três etapas:
              </p>

              <ol className="text-slate-600 leading-relaxed list-decimal list-inside space-y-2">
                <li>
                  O sistema primeiro verifica se você acertou o placar exato; caso positivo, a pontuação é definida e
                  aplicada.
                </li>
                <li>
                  Se o placar exato não foi acertado, ele avalia se você acertou o resultado do jogo (vitória do
                  mandante, vitória do visitante ou empate) para atribuir os pontos de resultado.
                </li>
                <li>
                  Independente de acertar ou não o resultado, o sistema calcula um bônus por proximidade no saldo de
                  gols (diferença entre gols do mandante e do visitante).
                </li>
                <li>Ao final, quando houver pontos, o total obtido no jogo é multiplicado pelo número da rodada.</li>
              </ol>

              <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl p-5 text-sm">
                <strong className="block text-[13px] uppercase tracking-[0.2em] text-emerald-600 mb-1">
                  Regra de ouro
                </strong>
                Se você acertar o <strong>placar exato</strong>, a pontuação do jogo é definida na hora e nenhuma outra
                regra é aplicada (não soma pontos de resultado e não soma bônus).
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">3.1 Regra 1 — Placar exato</h3>
                <p className="text-slate-600 leading-relaxed">
                  Se você acertar exatamente o placar final da partida, você recebe:
                </p>
                <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                  <li>
                    <strong>100 pontos</strong> (pontos de placar exato)
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">3.2 Regra 2 — Resultado correto</h3>
                <p className="text-slate-600 leading-relaxed">
                  Se você não acertar o placar exato, o sistema verifica se você acertou o resultado do jogo:
                </p>
                <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                  <li>vitória do mandante</li>
                  <li>vitória do visitante</li>
                  <li>empate</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  Se acertar o resultado (vencedor ou empate): <strong>30 pontos</strong>.
                </p>
                <p className="text-slate-500 text-xs italic">
                  Se você errar o resultado, você não recebe os pontos de resultado (30). Porém, ainda pode receber
                  pontos pelo bônus de proximidade no saldo de gols, conforme a Regra 3.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">3.3 Regra 3 — Bônus por saldo de gols</h3>
                <p className="text-slate-600 leading-relaxed">
                  Além dos pontos por resultado, existe um bônus que recompensa quem chegou perto do saldo de gols
                  (diferença entre gols do mandante e do visitante).
                </p>

                <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                  <li>
                    <strong>Bônus máximo:</strong> 20 pontos
                  </li>
                  <li>
                    <strong>Penalidade:</strong> a cada 1 gol de diferença entre o saldo previsto e o saldo real,
                    desconta 10 pontos do bônus
                  </li>
                  <li>
                    <strong>Bônus mínimo:</strong> 0 (nunca fica negativo)
                  </li>
                </ul>

                <p className="text-slate-500 text-xs italic">
                  Saldo de gols = (gols do mandante) − (gols do visitante).
                </p>

                <p className="text-slate-600 leading-relaxed">
                  O bônus é calculado sempre que você não acerta o placar exato — mesmo que o resultado
                  (vencedor/empate) esteja incorreto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CÁLCULO FINAL */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Cálculo final do jogo</h2>

              <pre className="bg-slate-900 text-emerald-200 p-5 rounded-3xl text-sm overflow-x-auto whitespace-pre-wrap">
                {`Se acertar placar exato:
  Pontos base = 100

Se NÃO acertar placar exato:
  Pontos base = Pontos de resultado (0 ou 30) + Bônus de saldo (0 a 20)

Pontuação final do jogo = Pontos base × Número da rodada`}
              </pre>

              <p className="text-slate-600 leading-relaxed mt-4">
                O multiplicador da rodada valoriza jogos mais avançados do campeonato: rodadas posteriores valem mais
                pontos no ranking.
              </p>
            </div>
          </div>
        </section>

        {/* EXEMPLOS */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Exemplos de pontuação</h2>
              <p className="text-slate-600 leading-relaxed">Abaixo alguns exemplos práticos usando as regras atuais:</p>
              <p className="text-slate-500 text-sm italic">
                Configuração atual: Placar exato = 100, Resultado = 30, Bônus máximo = 20, Penalidade por gol no saldo =
                10.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                {
                  title: 'Exemplo 1 — Placar exato',
                  lines: [
                    'Resultado real: 2 x 1',
                    'Seu palpite: 2 x 1',
                    'Placar exato: 100 pontos',
                    'Outros critérios: não aplicam',
                    'Rodada 3: 100 × 3 = 300 pontos',
                  ],
                },
                {
                  title: 'Exemplo 2 — Acertou vencedor e saldo exato (não exato no placar)',
                  lines: [
                    'Resultado real: 2 x 1 (saldo +1)',
                    'Seu palpite: 3 x 2 (saldo +1)',
                    'Resultado correto: 30 pontos',
                    'Bônus saldo de gols exato: 20 pontos',
                    'Pontos base: 30 + 20 = 50',
                    'Rodada 3: 50 × 3 = 150 pontos',
                  ],
                },
                {
                  title: 'Exemplo 3 — Acertou vencedor, saldo próximo',
                  lines: [
                    'Resultado real: 2 x 1 (saldo +1)',
                    'Seu palpite: 2 x 0 (saldo +2)',
                    'Resultado correto: 30 pontos',
                    'Erro de 1 no saldo: bônus 20 − 10 = 10 pontos',
                    'Pontos base: 30 + 10 = 40',
                    'Rodada 3: 40 × 3 = 120 pontos',
                  ],
                },
                {
                  title: 'Exemplo 4 — Errou o vencedor, mas ganhou bônus de saldo',
                  lines: [
                    'Resultado real: 2 x 2 (saldo 0)',
                    'Seu palpite: 1 x 2 (saldo -1)',
                    'Resultado incorreto: 0 pontos de resultado',
                    'Erro de 1 no saldo: bônus 20 − 10 = 10 pontos',
                    'Pontos base: 10',
                    'Rodada 1: 10 × 1 = 10 pontos',
                  ],
                },
                {
                  title: 'Exemplo 5 — Empate correto (não exato)',
                  lines: [
                    'Resultado real: 1 x 1 (empate, saldo 0)',
                    'Seu palpite: 2 x 2 (empate, saldo 0)',
                    'Resultado correto: 30 pontos',
                    'Saldo exato: bônus 20 pontos',
                    'Pontos base: 50',
                    'Rodada 4: 50 × 4 = 200 pontos',
                  ],
                },
                {
                  title: 'Exemplo 6 — Empate exato',
                  lines: [
                    'Resultado real: 1 x 1',
                    'Seu palpite: 1 x 1',
                    'Placar exato: 100 pontos',
                    'Outros critérios: não aplicam',
                    'Rodada 4: 100 × 4 = 400 pontos',
                  ],
                },
              ].map((example) => (
                <div
                  key={example.title}
                  className="bg-white p-6 rounded-3xl border border-slate-100 space-y-2 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{example.title}</h3>
                  {example.lines.map((line) => (
                    <p key={line} className="text-slate-600 text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RANKING / DESEMPATE / TRANSPARÊNCIA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl space-y-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Ranking e critérios de desempate</h2>
              <p className="text-slate-600 leading-relaxed">
                O ranking do bolão é a soma das pontuações de todos os jogos finalizados.
              </p>
              <ol className="list-decimal list-inside text-slate-600 text-sm space-y-2 mt-3">
                <li>Maior número de acertos de placar exato</li>
                <li>Maior número de acertos de resultado (vencedor/empate)</li>
              </ol>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Transparência</h2>
              <p className="text-slate-600 leading-relaxed">
                O Palpitou mostra o detalhamento da pontuação por jogo (placar exato, resultado, bônus por saldo,
                multiplicador da rodada e total). Não existem pontos ocultos.
              </p>
            </div>
          </div>
        </section>

        {/* PREMIAÇÃO / RESPONSABILIDADES / DISPOSIÇÕES GERAIS */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Premiação</h2>
              <ul className="text-slate-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>
                  O Palpitou não incentiva apostas e não oferece premiação material ou financeira por padrão. A
                  finalidade da plataforma é recreativa.
                </li>
                <li>
                  Se um bolão definir prêmios entre participantes (fora da plataforma), isso é de responsabilidade
                  exclusiva dos organizadores e participantes.
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Disposições gerais</h2>
              <ul className="text-slate-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>
                  Problemas de conexão do usuário, falhas locais e instabilidades podem ocorrer e fogem ao controle da
                  plataforma.
                </li>
                <li>
                  Fraudes, tentativas de burlar regras ou qualquer abuso podem resultar em bloqueio de conta e/ou
                  exclusão.
                </li>
                <li>O regulamento pode ser atualizado para melhorias e correções de produto.</li>
                <li>Ao participar de um bolão, o usuário declara que leu e aceita este regulamento.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Regulamento;
