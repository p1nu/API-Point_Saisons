const db = require('../data/db.js');

const getImagePath = async (imageId) => {
  const query = 'SELECT il_path FROM image_library WHERE il_id = ?';
  const [result] = await db.query(query, [imageId]);
  return result.length > 0 ? result[0].il_path : null;
};

module.exports = { getImagePath };