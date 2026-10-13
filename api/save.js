const crypto = require('crypto');
const redis = require('./_redis');

const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const newId = () => Array.from(crypto.randomBytes(7), b => ABC[b % 62]).join('');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const o = req.body;
    if (!o || typeof o !== 'object') return res.status(400).json({ error: 'bad body' });
    const json = JSON.stringify(o);
    if (json.length > 200000) return res.status(413).json({ error: 'too large' });
    const id = newId();
    await redis(['SET', 'card:' + id, json, 'EX', 60 * 60 * 24 * 365]);
    res.status(200).json({ id });
  } catch (e) {
    res.status(500).json({ error: 'server error' });
  }
};
