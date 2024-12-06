const db = require("../data/db.js");

// Get all news
const getNews = async (req, res) => {
  try {
    const [news] = await db.query(
      "SELECT news.*, image_library.il_path AS image_path FROM news LEFT JOIN image_library ON news.news_image_id = image_library.il_id"
    );
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a news
const getNew = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `
      SELECT 
        news.*, 
        image_library.il_path AS image_path 
      FROM 
        news 
      LEFT JOIN 
        image_library 
      ON 
        news.news_image_id = image_library.il_id 
      WHERE 
        news.news_id = ?
    `;
    const [news] = await db.query(query, [id]);

    if (news.length === 0) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(news[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new news
const createNews = async (req, res) => {
  try {
    const news_create_date = new Date();
    const {
      news_title,
      news_article,
      news_date,
      news_image_id,
      news_desc,
      news_status_id,
      news_created_by_user_id,
    } = req.body;

    if (
      !news_title ||
      !news_article ||
      !news_date ||
      !news_image_id ||
      !news_desc ||
      !news_status_id ||
      !news_created_by_user_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await db.query(
      "INSERT INTO news (news_title, news_article, news_date, news_image_id, news_desc, news_status_id, news_create_date, news_created_by_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        news_title,
        news_article,
        news_date,
        news_image_id,
        news_desc,
        news_status_id,
        news_create_date,
        news_created_by_user_id,
      ]
    );
    res.status(201).json({ message: "News created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a news
const updateNews = async (req, res) => {
  try {
    const id = req.params.id;
    const news_update_date = new Date();
    const {
      news_title,
      news_article,
      news_date,
      news_image_id,
      news_desc,
      news_updated_by_user_id,
    } = req.body;

    await db.query(
      "UPDATE news SET news_title = ?, news_article = ?, news_date = ?, news_image_id = ?, news_desc = ?, news_update_date = ?, news_updated_by_user_id = ? WHERE news_id = ?",
      [
        news_title,
        news_article,
        news_date,
        news_image_id,
        news_desc,
        news_update_date,
        news_updated_by_user_id,
        id,
      ]
    );
    res.status(200).json({ message: "News updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a news
const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM news WHERE news_id = ?", [id]);
    res.status(200).json({ message: "News deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getNews, getNew, createNews, updateNews, deleteNews };
