const redis = require('./_redis');

module.exports = async (req, res) => {
  const id = String(req.query.id || '');
  if (!/^[A-Za-z0-9]{6,12}$/.test(id)) return res.status(400).end();
  try {
    const v = await redis(['GET', 'card:' + id]);
    if (!v) return res.status(404).end();
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    res.status(200).json(JSON.parse(v));
  } catch (e) {
    res.status(500).end();
  }
};
