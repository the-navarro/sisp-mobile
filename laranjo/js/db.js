import cfg from './firebase-config.js';

export const isConfigured = () => cfg.apiKey && !String(cfg.apiKey).startsWith('COLE');

// Interface única de dados: { uid, serverNow, get, set, update, remove, push,
// on, onChild, onConnect, disconnectSet, cancelDisconnect, transaction }
export async function initDb() {
  if (new URLSearchParams(location.search).has('local')) {
    return (await import('./db-local.js')).create();
  }
  if (!isConfigured()) throw new Error('NO_CONFIG');
  return (await import('./db-firebase.js')).create(cfg);
}
