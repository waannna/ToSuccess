const { createClient } = require('redis');

let client;
async function getClient() {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL });
    client.on('error', function (e) { console.error('Redis error:', e.message); });
  }
  if (!client.isOpen) await client.connect();
  return client;
}

module.exports = async function redis(cmd) {
  if (!process.env.REDIS_URL) throw new Error('REDIS_URL kosong');
  const c = await getClient();
  return c.sendCommand(cmd.map(String));
};