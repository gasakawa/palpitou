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
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente não encontradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function explore() {
  try {
    console.log('\n📊 EXPLORAÇÃO DO BANCO DE DADOS SUPABASE');
    console.log('=' + '='.repeat(49));

    // 1. Listar championships
    console.log('\n1️⃣  TABELA: public.championships (Campeonatos)');
    console.log('-' + '-'.repeat(49));
    const { data: championships, error: champError } = await supabase
      .from('championships')
      .select('id, name, created_at')
      .limit(5);

    if (champError) {
      console.log(`   ✗ Erro: ${champError.message}`);
    } else if (championships && championships.length > 0) {
      console.log(`   ✓ Encontrados ${championships.length} championships:`);
      console.table(championships);
    } else {
      console.log('   ✗ Nenhum championship encontrado');
    }

    // 2. Listar leagues
    console.log('\n2️⃣  TABELA: public.leagues (Ligões/Bolões)');
    console.log('-' + '-'.repeat(49));
    const { data: leagues, error: leaguesError } = await supabase
      .from('leagues')
      .select('id, name, championship_id, created_at')
      .limit(5);

    if (leaguesError) {
      console.log(`   ✗ Erro: ${leaguesError.message}`);
    } else if (leagues && leagues.length > 0) {
      console.log(`   ✓ Encontradas ${leagues.length} leagues:`);
      console.table(leagues);
    } else {
      console.log('   ✗ Nenhuma league encontrada');
    }

    // 3. Membros da league (se houver league)
    if (leagues && leagues.length > 0) {
      const mostRecentLeague = leagues[0];
      console.log(`\n3️⃣  TABELA: public.league_members (Membros da League)`);
      console.log(`   League selecionada: "${mostRecentLeague.name}" (${mostRecentLeague.id})`);
      console.log('-' + '-'.repeat(49));

      const { data: members, error: membersError } = await supabase
        .from('league_members')
        .select('league_id, user_id, role, created_at')
        .eq('league_id', mostRecentLeague.id)
        .limit(10);

      if (membersError) {
        console.log(`   ✗ Erro: ${membersError.message}`);
      } else if (members && members.length > 0) {
        console.log(`   ✓ Encontrados ${members.length} membros:`);
        console.table(members);
      } else {
        console.log('   ✗ Nenhum membro encontrado nesta league');
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Exploração concluída!');
    console.log('\n📋 RESUMO:');
    if (!championships || championships.length === 0) {
      console.log('   • ❌ Nenhum championship cadastrado');
    }
    if (!leagues || leagues.length === 0) {
      console.log('   • ❌ Nenhuma league cadastrada');
      console.log('   • 💡 Crie uma league via dashboard ou use um seed script');
    } else {
      console.log(`   • ✅ ${leagues.length} league(s) disponível(is)`);
    }
    console.log('');
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

explore();
