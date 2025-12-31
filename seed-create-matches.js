import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

const envVars = {};
envContent.split('\n').forEach((line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const serviceKey = envVars.SUPABASE_SERVICE_KEY;
const championshipId = process.argv[2];

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Variáveis de ambiente não encontradas');
  process.exit(1);
}

if (!championshipId) {
  console.error('❌ CHAMPIONSHIP_ID não fornecido');
  console.error('Uso: node seed-create-matches.js <CHAMPIONSHIP_ID>');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

// Função auxiliar para gerar matches de uma rodada
function generateMatchesForRound(roundNumber, teams, startDate, isFinished) {
  const matches = [];
  const usedPairs = new Set();

  // 6 jogos por rodada
  for (let i = 0; i < 6; i++) {
    let homeTeam, awayTeam;
    let attempts = 0;
    const maxAttempts = 50;

    // Evita repetir confrontos na mesma rodada
    do {
      homeTeam = teams[Math.floor(Math.random() * teams.length)];
      awayTeam = teams[Math.floor(Math.random() * teams.length)];
      attempts++;
    } while (
      (homeTeam.id === awayTeam.id ||
        usedPairs.has(`${homeTeam.id}-${awayTeam.id}`) ||
        usedPairs.has(`${awayTeam.id}-${homeTeam.id}`)) &&
      attempts < maxAttempts
    );

    if (attempts >= maxAttempts) {
      console.warn(`⚠️  Não foi possível gerar jogo ${i + 1} da rodada ${roundNumber} sem repetição`);
      continue;
    }

    usedPairs.add(`${homeTeam.id}-${awayTeam.id}`);

    const matchDate = new Date(startDate);
    matchDate.setHours(matchDate.getHours() + i * 2); // Espaçar 2 horas entre jogos

    const match = {
      championship_id: championshipId,
      round: `round_${roundNumber}`,
      round_number: roundNumber,
      starts_at: matchDate.toISOString(),
      home_team_id: homeTeam.id,
      away_team_id: awayTeam.id,
      status: isFinished ? 'finished' : 'scheduled',
      home_score: isFinished ? Math.floor(Math.random() * 4) : null,
      away_score: isFinished ? Math.floor(Math.random() * 4) : null,
    };

    matches.push(match);
  }

  return matches;
}

async function createMatches() {
  try {
    console.log('\n🎮 CRIANDO 30 MATCHES DE FUTEBOL');
    console.log('==================================================\n');

    // 1. Buscar championship
    const { data: championship, error: champError } = await supabase
      .from('championships')
      .select('id, name')
      .eq('id', championshipId)
      .single();

    if (champError || !championship) {
      console.error(`❌ Championship ${championshipId} não encontrado`);
      process.exit(1);
    }

    console.log(`✅ Championship: ${championship.name}`);
    console.log(`   ID: ${championshipId}\n`);

    // 2. Buscar 12 teams
    const { data: teams, error: teamsError } = await supabase.from('teams').select('id, name').limit(12);

    if (teamsError || !teams || teams.length < 12) {
      console.error(`❌ Erro ao buscar times: ${teamsError?.message || 'menos de 12 times'}`);
      process.exit(1);
    }

    console.log(`✅ ${teams.length} times carregados\n`);

    // 3. Gerar 30 matches (5 rodadas × 6 jogos)
    const matches = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Rodada 1 e 2: finished (12 jogos)
    // Rodada 3, 4 e 5: scheduled (18 jogos)
    for (let roundNum = 1; roundNum <= 5; roundNum++) {
      const isFinished = roundNum <= 2;
      const daysOffset = -15 + (roundNum - 1) * 7.5; // Espalha entre -15 e +15 dias
      const roundStartDate = new Date(today);
      roundStartDate.setDate(roundStartDate.getDate() + daysOffset);

      const roundMatches = generateMatchesForRound(roundNum, teams, roundStartDate, isFinished);
      matches.push(...roundMatches);
    }

    console.log(`📝 Inserindo ${matches.length} matches no banco...\n`);

    // 4. Inserir matches no banco
    const { data: insertedMatches, error: insertError } = await supabase
      .from('matches')
      .insert(matches)
      .select('id, round_number, status');

    if (insertError) {
      console.error(`❌ Erro ao inserir matches: ${insertError.message}`);
      console.error('Detalhes:', insertError);
      process.exit(1);
    }

    // 5. Exibir resumo por rodada
    console.log('==================================================');
    console.log('📊 RESUMO POR RODADA');
    console.log('==================================================\n');

    for (let roundNum = 1; roundNum <= 5; roundNum++) {
      const roundMatches = insertedMatches.filter((m) => m.round_number === roundNum);
      const finishedCount = roundMatches.filter((m) => m.status === 'finished').length;

      console.log(
        `Rodada ${roundNum}: ${roundMatches.length} jogos | ${finishedCount} finished | ${
          roundMatches.length - finishedCount
        } scheduled`,
      );
    }

    console.log('\n==================================================');
    console.log(`✅ ${insertedMatches.length} matches criados com sucesso!`);
    console.log('==================================================\n');

    // Exibir algumas matches como exemplo
    console.log('📋 Exemplos de matches criadas:\n');
    const examples = insertedMatches.slice(0, 3);
    const matchesWithTeamNames = [];

    for (const match of matches.slice(0, 3)) {
      const homeTeam = teams.find((t) => t.id === match.home_team_id);
      const awayTeam = teams.find((t) => t.id === match.away_team_id);

      console.log(`   Rodada ${match.round_number}: ${homeTeam.name} vs ${awayTeam.name}`);
      console.log(`     Status: ${match.status}`);
      if (match.status === 'finished') {
        console.log(`     Placar: ${match.home_score}x${match.away_score}`);
      }
      console.log(`     Data: ${new Date(match.starts_at).toLocaleString()}\n`);
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
    console.error(error);
  }
}

createMatches();
