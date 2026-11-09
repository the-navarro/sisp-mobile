/* Roda os três testes, um depois do outro, e falha se qualquer um falhar. */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
let falhou = 0;
for (const [titulo, arq] of [['CASOS PRINCIPAIS', 'jogar-casos.mjs'], ['OUTROS MODOS', 'jogar-modos.mjs'], ['APP INSTALÁVEL E SEM INTERNET', 'conferir-app.mjs']]) {
  console.log('\n===== ' + titulo + ' =====');
  const r = spawnSync(process.execPath, [path.join(aqui, arq), ...process.argv.slice(2)], { stdio: 'inherit' });
  if (r.status !== 0) falhou++;
}
process.exit(falhou ? 1 : 0);
