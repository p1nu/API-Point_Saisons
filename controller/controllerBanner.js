const db = require("../data/db.js");
const { get } = require("../routes/routeService.js");
const { getImagePath } = require("./shared.js"); // Use shared module

// Get all banners
const getBanners = async (req, res) => {
  try {
    const [banners] = await db.query("SELECT * FROM banners");
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a banner by id
const getBannerId = async (req, res) => {
  try {
    const id = req.params.id;
    const [banner] = await db.query(
      "SELECT * FROM banners WHERE banner_id = ?",
      [id]
    );
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get banners from company id
const getBannerByCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const banners = await db.query(
      `SELECT 
         banners.banner_id, 
         banners.banner_company_id, 
         banners.banner_name,
         image_library.il_id AS image_id, 
         image_library.il_path AS image_path
       FROM 
         banners
       JOIN 
         image_library ON banners.banner_image_id = image_library.il_id
       WHERE 
         banners.banner_company_id = ?`,
      [id]
    );
    res.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ message: "Failed to load banners." });
  }
};

// Get banners from service id
const getBannerByService = async (req, res) => {
  const id = req.params.id;
  try {
    const banners = await db.query(
      `SELECT 
        banners.banner_id, 
        banners.banner_service_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.banner_service_id = ?`,
      [id]
    );
    res.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ message: "Failed to load banners." });
  }
};

// Get banner previews from service id 
const getBannerPreviews = async (req, res) => {
  const id = req.params.id;
  try {
    const [banners] = await db.query(
      `SELECT 
        banners.banner_id, 
        banners.banner_service_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.banner_service_id = ? AND (banners.preview1 = 1 OR banners.preview2 = 1 OR banners.preview3 = 1)`,
      [id]
    );
    res.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ message: "Failed to load banners." });
  }
}

// Get feature banners
const getFeatureBanners = async (req, res) => {
  try {
    const [banners] = await db.query(
      `SELECT 
        banners.banner_id, 
        banners.banner_company_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.show_in_slider = 1`
    );

    if (banners.length === 0) {
      return res.status(404).json({ message: "No featured banners found" });
    }

    res.status(200).json(banners);
  } catch (error) {
    console.error("Error fetching feature banners:", error);
    res.status(500).json({
      message: "An error occurred while fetching feature banners",
      error: error.message,
    });
  }
};

// Get value banners
const getValueBanners = async (req, res) => {
  try {
    const [banners] = await db.query(
      `SELECT
        banners.banner_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.value = 1 AND banners.banner_company_id = ?`, [req.params.id]
    );
    res.status(200).json(banners[0]);
  } catch (error) {
    console.error("Error fetching value banners:", error);
    res.status(500).json({ message: "Failed to load value banners." });
  }
};

// Get mission banners
const getMissionBanners = async (req, res) => {
  try {
    const [banners] = await db.query(
      `SELECT
        banners.banner_id,
        banners.banner_company_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.mission = 1 AND banners.banner_company_id = ?`, [req.params.id]
    );
    res.status(200).json(banners[0]);
  } catch (error) {
    console.error("Error fetching mission banners:", error);
    res.status(500).json({ message: "Failed to load mission banners." });
  }
};

// Get vision banners
const getVisionBanners = async (req, res) => {
  try {
    const [banners] = await db.query(
      `SELECT
        banners.banner_id,
        banners.banner_company_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.vision = 1 AND banners.banner_company_id = ?`, [req.params.id]
    );
    res.status(200).json(banners[0]);
  } catch (error) {
    console.error("Error fetching vision banners:", error);
    res.status(500).json({ message: "Failed to load vision banners." });
  }
};

// Get background banners
const getBackgroundBanners = async (req, res) => {
  try {
    const [banners] = await db.query(
      `SELECT
        banners.banner_id,
        banners.banner_company_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.background = 1 AND banners.banner_company_id = ?`, [req.params.id]
    );
    res.status(200).json(banners[0]);
  } catch (error) {
    console.error("Error fetching background banners:", error);
    res.status(500).json({ message: "Failed to load background banners." });
  }
};

// Get preview1 banners
const getPreview1Banners = async (req, res) => {
  try {
    const [banners] = await db.query(
      `SELECT
        banners.banner_id,
        banners.banner_company_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.preview1 = 1 AND banners.banner_company_id = ?`, [req.params.id]
    );
    res.status(200).json(banners[0]);
  } catch (error) {
    console.error("Error fetching preview1 banners:", error);
    res.status(500).json({ message: "Failed to load preview1 banners." });
  }
};

// Get preview2 banners
const getPreview2Banners = async (req, res) => {
  try {
    const [banners] = await db.query(
      `SELECT
        banners.banner_id,
        banners.banner_company_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.preview2 = 1 AND banners.banner_company_id = ?`, [req.params.id]
    );
    res.status(200).json(banners[0]);
  } catch (error) {
    console.error("Error fetching preview2 banners:", error);
    res.status(500).json({ message: "Failed to load preview2 banners." });
  }
};

// Get preview3 banners
const getPreview3Banners = async (req, res) => {
  try {
    const [banners] = await db.query(
      `SELECT
        banners.banner_id,
        banners.banner_company_id,
        banners.banner_name,
        image_library.il_id AS image_id,
        image_library.il_path AS image_path
      FROM
        banners
      JOIN
        image_library ON banners.banner_image_id = image_library.il_id
      WHERE
        banners.preview3 = 1 AND banners.banner_company_id = ?`, [req.params.id]
    );
    res.status(200).json(banners[0]);
  } catch (error) {
    console.error("Error fetching preview3 banners:", error);
    res.status(500).json({ message: "Failed to load preview3 banners." });
  }
};

// Create a new banner
const createBanner = async (req, res) => {
  try {
    const {
      banner_name,
      banner_company_id,
      banner_service_id,
      banner_image_id,
    } = req.body;
    const show_in_slider = 0;

    // Validate that only one of banner_company_id or banner_service_id is provided
    if (banner_company_id && banner_service_id) {
      return res.status(400).json({
        message:
          "Provide either banner_company_id or banner_service_id, not both.",
      });
    }

    // Optionally, enforce that at least one ID is provided
    if (!banner_company_id && !banner_service_id) {
      return res.status(400).json({
        message:
          "Either banner_company_id or banner_service_id must be provided.",
      });
    }

    // Set the unused ID to null
    const final_company_id = banner_company_id || null;
    const final_service_id = banner_service_id || null;

    await db.query(
      "INSERT INTO banners (banner_name, banner_company_id, banner_service_id, banner_image_id, show_in_slider) VALUES (?, ?, ?, ?, ?)",
      [
        banner_name,
        final_company_id,
        final_service_id,
        banner_image_id,
        show_in_slider,
      ]
    );

    res.status(201).json({ message: "Banner created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update banner show in slider
const updateBannerShowInSlider = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve the company ID of the selected banner
    const [bannerResult] = await db.query(
      "SELECT banner_company_id FROM banners WHERE banner_id = ?",
      [id]
    );
    if (bannerResult.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    const companyId = bannerResult[0].banner_company_id;

    // Set show_in_slider to false for all banners of the company
    await db.query(
      "UPDATE banners SET show_in_slider = false WHERE banner_company_id = ?",
      [companyId]
    );

    // Set show_in_slider to true for the selected banner
    await db.query(
      "UPDATE banners SET show_in_slider = true WHERE banner_id = ?",
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// Update banner to background
const updateBannerBackground = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve the company ID of the selected banner
    const [bannerResult] = await db.query(
      "SELECT banner_company_id FROM banners WHERE banner_id = ?",
      [id]
    );
    if (bannerResult.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    const companyId = bannerResult[0].banner_company_id;
    
    // Set background to false for all banners of the company
    await db.query(
      "UPDATE banners SET background = false WHERE banner_company_id = ?",
      [companyId]
    );

    // Set background to true for the selected banner
    await db.query(
      "UPDATE banners SET background = true WHERE banner_id = ?",
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// Update banner to show in value
const updateBannerShowInValue = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve the company ID of the selected banner
    const [bannerResult] = await db.query(
      "SELECT banner_company_id FROM banners WHERE banner_id = ?",
      [id]
    );
    if (bannerResult.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    const companyId = bannerResult[0].banner_company_id;

    // Set value to false for all banners of the company
    await db.query(
      "UPDATE banners SET value = false WHERE banner_company_id = ?",
      [companyId]
    );

    // Set value to true for the selected banner
    await db.query(
      "UPDATE banners SET value = true WHERE banner_id = ?",
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// Update banner to show in mission
const updateBannerShowInMission = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve the company ID of the selected banner
    const [bannerResult] = await db.query(
      "SELECT banner_company_id FROM banners WHERE banner_id = ?",
      [id]
    );
    if (bannerResult.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    const companyId = bannerResult[0].banner_company_id;

    // Set mission to false for all banners of the company
    await db.query(
      "UPDATE banners SET mission = false WHERE banner_company_id = ?",
      [companyId]
    );

    // Set mission to true for the selected banner
    await db.query(
      "UPDATE banners SET mission = true WHERE banner_id = ?",
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// Update banner to show in vision
const updateBannerShowInVision = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve the company ID of the selected banner
    const [bannerResult] = await db.query(
      "SELECT banner_company_id FROM banners WHERE banner_id = ?",
      [id]
    );
    if (bannerResult.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    const companyId = bannerResult[0].banner_company_id;

    // Set vision to false for all banners of the company
    await db.query(
      "UPDATE banners SET vision = false WHERE banner_company_id = ?",
      [companyId]
    );

    // Set vision to true for the selected banner
    await db.query(
      "UPDATE banners SET vision = true WHERE banner_id = ?",
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// Update banner to show in preview2
const updateBannerPreview2 = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve the service ID of the selected banner
    const [bannerResult] = await db.query(
      "SELECT banner_service_id FROM banners WHERE banner_id = ?",
      [id]
    );
    if (bannerResult.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    const serviceId = bannerResult[0].banner_service_id;

    // Set preview2 to false for all banners of the service
    await db.query(
      "UPDATE banners SET preview2 = false WHERE banner_service_id = ?",
      [serviceId]
    );

    // Set preview2 to true for the selected banner
    await db.query(
      "UPDATE banners SET preview2 = true WHERE banner_id = ?",
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// Update banner to show in preview3
const updateBannerPreview3 = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve the service ID of the selected banner
    const [bannerResult] = await db.query(
      "SELECT banner_service_id FROM banners WHERE banner_id = ?",
      [id]
    );
    if (bannerResult.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    const serviceId = bannerResult[0].banner_service_id;

    // Set preview3 to false for all banners of the service
    await db.query(
      "UPDATE banners SET preview3 = false WHERE banner_service_id = ?",
      [serviceId]
    );

    // Set preview3 to true for the selected banner
    await db.query(
      "UPDATE banners SET preview3 = true WHERE banner_id = ?",
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// Update banner to show in preview1
const updateBannerPreview1 = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve the service ID of the selected banner
    const [bannerResult] = await db.query(
      "SELECT banner_service_id FROM banners WHERE banner_id = ?",
      [id]
    );
    if (bannerResult.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    const serviceId = bannerResult[0].banner_service_id;

    // Set preview1 to false for all banners of the service
    await db.query(
      "UPDATE banners SET preview1 = false WHERE banner_service_id = ?",
      [serviceId]
    );

    // Set preview1 to true for the selected banner
    await db.query(
      "UPDATE banners SET preview1 = true WHERE banner_id = ?",
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// Delete banner
const deleteBanner = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM banners WHERE banner_id = ?", [id]);
    res.status(200).json({ message: "Banner deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBanners,
  getBannerId,
  getFeatureBanners,
  getBannerByCompany,
  getBannerByService,
  getBannerPreviews,
  createBanner,
  updateBannerShowInSlider,
  updateBannerBackground,
  deleteBanner,
  updateBannerShowInValue,
  updateBannerShowInMission,
  updateBannerShowInVision,
  updateBannerPreview2,
  updateBannerPreview3,
  updateBannerPreview1,
  getValueBanners,
  getMissionBanners,
  getVisionBanners,
  getBackgroundBanners,
  getPreview1Banners,
  getPreview2Banners,
  getPreview3Banners,
};
