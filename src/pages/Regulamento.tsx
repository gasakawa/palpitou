import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Regulamento: React.FC = () => {
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
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2" />
              Regulamento oficial
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Regulamento do Palpitou
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              O Palpitou é um bolão de futebol com pontuação transparente. Aqui você entende exatamente como os pontos
              são calculados e como o ranking é formado.
            </p>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Objetivo do bolão</h2>
              <p className="text-slate-600 leading-relaxed">
                O Palpitou é um bolão online de futebol baseado em palpites por placar exato, com ranking e pontuação
                totalmente transparentes. O objetivo é somar o maior número de pontos ao longo do campeonato dentro da
                sua liga.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Como funcionam os palpites</h2>
              <ul className="space-y-3 text-slate-600 text-sm leading-relaxed list-disc list-inside">
                <li>Você informa o placar exato do jogo (ex: 2 x 1).</li>
                <li>Você pode criar ou alterar seu palpite até o horário de início do jogo.</li>
                <li>
                  Após o jogo começar, o palpite fica bloqueado e passa a ficar visível para os demais membros da liga.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Pontuação</h2>
              <p className="text-slate-600 leading-relaxed">
                A pontuação de cada jogo segue uma hierarquia. Primeiro o sistema verifica se você acertou o placar
                exato. Se não acertou, ele calcula pontos por resultado (vencedor/empate) e bônus por proximidade no
                saldo de gols. Ao final, o total é multiplicado pelo número da rodada.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Regra 1 — Placar exato</h3>
                <p className="text-slate-600 leading-relaxed">
                  Se você acertar exatamente o placar final da partida, você recebe:
                </p>
                <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                  <li>50 pontos</li>
                </ul>
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl p-5 text-sm">
                  <strong className="block text-[13px] uppercase tracking-[0.2em] text-emerald-600 mb-1">
                    Importante
                  </strong>
                  Quando o placar exato é acertado, nenhum outro critério é aplicado. Ou seja, NÃO soma pontos de
                  vencedor/empate e NÃO soma bônus por saldo. O placar exato sempre prevalece.
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  Regra 2 — Resultado correto (vencedor ou empate)
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Se você NÃO acertar o placar exato, o sistema verifica se você acertou o resultado do jogo:
                </p>
                <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                  <li>vitória do mandante</li>
                  <li>vitória do visitante</li>
                  <li>empate</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">Se acertar o resultado: 30 pontos</p>
                <p className="text-slate-500 text-xs italic">
                  Empate é tratado da mesma forma que vitória: ele conta como resultado correto apenas quando o placar
                  exato não foi acertado.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  Regra 3 — Bônus por proximidade no saldo de gols
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Além dos pontos por resultado, existe um bônus que recompensa quem chegou perto do saldo de gols
                  (diferença entre gols do mandante e do visitante).
                </p>
                <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                  <li>Bônus máximo: 20 pontos</li>
                  <li>
                    A cada 1 gol de diferença entre o saldo previsto e o saldo real, são descontados 10 pontos do bônus
                  </li>
                  <li>O bônus mínimo é 0 (nunca fica negativo)</li>
                </ul>
                <p className="text-slate-500 text-xs italic">
                  Saldo de gols = (gols do mandante) − (gols do visitante).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Cálculo final</h2>
              <pre className="bg-slate-900 text-emerald-200 p-5 rounded-3xl text-sm overflow-x-auto">
                Pontos base = Pontos por resultado + Bônus por saldo de gols Pontuação final do jogo = Pontos base ×
                Número da rodada
              </pre>
              <p className="text-slate-600 leading-relaxed">
                O multiplicador da rodada valoriza jogos mais avançados do campeonato.
              </p>
              <p className="text-slate-600 leading-relaxed">Rodadas posteriores valem mais pontos no ranking.</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Exemplos de pontuação</h2>
              <p className="text-slate-600 leading-relaxed">Abaixo alguns exemplos práticos usando as regras atuais:</p>
              <p className="text-slate-500 text-sm italic">
                Configuração atual: Placar exato = 50, Resultado = 30, Bônus máximo = 20, Penalidade por gol no saldo =
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
                    'Placar exato: 50 pontos',
                    'Outros critérios: não aplicam',
                    'Rodada 3: 50 × 3 = 150 pontos',
                  ],
                },
                {
                  title: 'Exemplo 2 — Acertou vencedor e saldo exato (não exato no placar)',
                  lines: [
                    'Resultado real: 2 x 1 (saldo +1)',
                    'Seu palpite: 3 x 2 (saldo +1)',
                    'Resultado correto: 30 pontos',
                    'Bônus saldo exato: 20 pontos',
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
                  title: 'Exemplo 4 — Errou o vencedor',
                  lines: [
                    'Resultado real: 2 x 1',
                    'Seu palpite: 1 x 2',
                    'Resultado incorreto: 0 pontos',
                    'Bônus: 0 pontos',
                    'Total: 0',
                  ],
                },
                {
                  title: 'Exemplo 5 — Empate correto (não exato)',
                  lines: [
                    'Resultado real: 1 x 1 (empate, saldo 0)',
                    'Seu palpite: 2 x 2 (empate, saldo 0)',
                    'Resultado correto (empate): 30 pontos',
                    'Saldo exato: bônus 20 pontos',
                    'Pontos base: 50',
                    'Pontuação final = 50 × número da rodada',
                  ],
                },
                {
                  title: 'Exemplo 6 — Empate exato',
                  lines: [
                    'Resultado real: 1 x 1',
                    'Seu palpite: 1 x 1',
                    'Placar exato: 50 pontos',
                    'Outros critérios: não aplicam',
                    'Pontuação final = 50 × número da rodada',
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

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl space-y-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Ranking e desempates</h2>
              <p className="text-slate-600 leading-relaxed">
                O ranking da liga é a soma dos pontos de todos os jogos finalizados.
              </p>
              <ol className="list-decimal list-inside text-slate-600 text-sm space-y-2">
                <li>Maior número de acertos de placar exato</li>
                <li>Maior número de acertos de resultado (vencedor/empate)</li>
                <li>Ordem alfabética do nome do participante</li>
              </ol>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Transparência</h2>
              <p className="text-slate-600 leading-relaxed">
                O Palpitou mostra o detalhamento completo da pontuação por jogo (placar exato, resultado, bônus por
                saldo, multiplicador da rodada e total). Não existem pontos ocultos.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Regras gerais e aceitação</h2>
              <ul className="text-slate-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>As regras são iguais para todos os participantes.</li>
                <li>No MVP, o Palpitou não gerencia apostas em dinheiro.</li>
                <li>Ao participar de uma liga, o usuário declara que leu e aceita este regulamento.</li>
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
