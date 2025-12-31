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
// Use SERVICE_KEY para contornar RLS - adicione em seu .env como SUPABASE_SERVICE_KEY
const serviceKey = envVars.SUPABASE_SERVICE_KEY;
const anonKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL não encontrada');
  process.exit(1);
}

if (!serviceKey && !anonKey) {
  console.error('❌ Nenhuma chave encontrada. Adicione SUPABASE_SERVICE_KEY ao .env');
  process.exit(1);
}

// Usa service key se disponível (ignora RLS), senão usa anon key
const keyType = serviceKey ? 'service_role' : 'anon (pode estar bloqueado por RLS)';
const supabaseKey = serviceKey || anonKey;

console.log(`\n🔑 Usando chave: ${keyType}`);
const supabase = createClient(supabaseUrl, supabaseKey);

async function explore() {
  try {
    console.log('\n📊 EXPLORAÇÃO DO BANCO DE DADOS SUPABASE');
    console.log('==================================================\n');

    // 1. Championships
    console.log('1️⃣  TABELA: public.championships (Campeonatos)');
    console.log('--------------------------------------------------');
    const { data: championships, error: champError } = await supabase
      .from('championships')
      .select('id, name, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (champError) {
      console.log(`   ✗ Erro: ${champError.message}`);
    } else if (!championships || championships.length === 0) {
      console.log('   ✗ Nenhum championship encontrado');
    } else {
      console.log(`   ✅ ${championships.length} championship(s) encontrado(s):`);
      championships.forEach((c) => {
        console.log(`      • ${c.name} (ID: ${c.id}) - ${new Date(c.created_at).toLocaleDateString()}`);
      });
    }

    // 2. Leagues
    console.log('\n2️⃣  TABELA: public.leagues (Ligões/Bolões)');
    console.log('--------------------------------------------------');
    const { data: leagues, error: leaguesError } = await supabase
      .from('leagues')
      .select('id, name, join_code, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (leaguesError) {
      console.log(`   ✗ Erro: ${leaguesError.message}`);
    } else if (!leagues || leagues.length === 0) {
      console.log('   ✗ Nenhuma league encontrada');
    } else {
      console.log(`   ✅ ${leagues.length} league(s) encontrada(s):`);
      leagues.forEach((l) => {
        console.log(`      • ${l.name} (ID: ${l.id}) - Código: ${l.join_code}`);
      });
    }

    // 3. League Members (se houver leagues)
    if (leagues && leagues.length > 0) {
      console.log('\n3️⃣  TABELA: public.league_members (Membros da League)');
      console.log('--------------------------------------------------');
      const leagueId = leagues[0].id;
      const { data: members, error: membersError } = await supabase
        .from('league_members')
        .select('*')
        .eq('league_id', leagueId)
        .limit(10);

      if (membersError) {
        console.log(`   ✗ Erro: ${membersError.message}`);
      } else if (!members || members.length === 0) {
        console.log(`   ✗ Nenhum membro encontrado na league "${leagues[0].name}"`);
      } else {
        console.log(`   ✅ ${members.length} membro(s) encontrado(s):`);
        members.forEach((m) => {
          console.log(`      • User ID: ${m.user_id} - Role: ${m.role}`);
        });
      }
    }

    console.log('\n==================================================');
    console.log('✅ Exploração concluída!');
    console.log('==================================================');

    if (!serviceKey) {
      console.log('\n💡 DICA: Se os dados não aparecerem, pode ser RLS.');
      console.log('   Para contornar, adicione ao .env:');
      console.log('   SUPABASE_SERVICE_KEY=<sua_service_role_key>');
      console.log('\n   Pegue em: Supabase Console > Settings > API > Service Role Key');
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error.message);
  }
}

explore();
