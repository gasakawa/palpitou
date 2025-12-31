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

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Variáveis de ambiente não encontradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function listData() {
  try {
    console.log('\n📋 LISTANDO CHAMPIONSHIPS E TEAMS');
    console.log('==================================================\n');

    // 1. Listar Championships
    console.log('1️⃣  CHAMPIONSHIPS');
    console.log('--------------------------------------------------');
    const { data: championships, error: champError } = await supabase
      .from('championships')
      .select('id, name, created_at')
      .order('created_at', { ascending: false });

    if (champError) {
      console.log(`   ❌ Erro: ${champError.message}`);
      process.exit(1);
    }

    if (!championships || championships.length === 0) {
      console.log('   ❌ Nenhum championship encontrado!');
      console.log('   💡 Crie um championship primeiro no dashboard ou via script');
      process.exit(1);
    }

    console.log(`   ✅ ${championships.length} championship(s) disponível(is):\n`);
    championships.forEach((c, index) => {
      console.log(`      [${index}] ${c.name}`);
      console.log(`          ID: ${c.id}`);
      console.log(`          Data: ${new Date(c.created_at).toLocaleDateString()}\n`);
    });

    // 2. Listar Teams
    console.log('2️⃣  TEAMS (TIMES)');
    console.log('--------------------------------------------------');
    const { data: teams, error: teamsError } = await supabase.from('teams').select('id, name').order('name');

    if (teamsError) {
      console.log(`   ❌ Erro: ${teamsError.message}`);
      process.exit(1);
    }

    if (!teams || teams.length < 12) {
      console.log(`   ⚠️  Apenas ${teams?.length || 0} time(s) encontrado(s)`);
      console.log('   💡 Você precisa de pelo menos 12 times para criar 6 jogos por rodada');
      process.exit(1);
    }

    console.log(`   ✅ ${teams.length} time(s) disponível(is):\n`);
    teams.slice(0, 12).forEach((t, index) => {
      console.log(`      [${index}] ${t.name}`);
      console.log(`          ID: ${t.id}\n`);
    });

    console.log('==================================================');
    console.log('\n📝 INSTRUÇÕES PARA O PASSO 2:\n');
    console.log('Para criar 30 matches, execute:\n');
    console.log('   node seed-create-matches.js <CHAMPIONSHIP_ID>\n');
    console.log('Exemplo:');
    console.log(`   node seed-create-matches.js ${championships[0].id}\n`);
    console.log('Isso vai criar:');
    console.log('   • 30 partidas no total');
    console.log('   • 5 rodadas (1-5)');
    console.log('   • 6 jogos por rodada');
    console.log('   • Primeiras 2 rodadas: finished (com scores)');
    console.log('   • Últimas 3 rodadas: scheduled (sem scores)');
    console.log('   • Datas espalhadas (15 dias antes até 15 dias depois)');
    console.log('==================================================\n');
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
  }
}

listData();
