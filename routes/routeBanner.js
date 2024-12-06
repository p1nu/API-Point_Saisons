const express = require("express");
const routerBanner = express.Router();

const {
  getBanners,
  getBannerId,
  getBannerByCompany,
  getBannerByService,
  getBannerPreviews,
  getValueBanners,
  getMissionBanners,
  getVisionBanners,
  getBackgroundBanners,
  getPreview1Banners,
  getPreview2Banners,
  getPreview3Banners,
  createBanner,
  deleteBanner,
  updateBannerShowInSlider,
  updateBannerBackground,
  getFeatureBanners,
  updateBannerShowInMission,
  updateBannerShowInValue,
  updateBannerShowInVision,
  updateBannerPreview1,
  updateBannerPreview2,
  updateBannerPreview3,
} = require("../controller/controllerBanner.js");

// ===================== Static Routes =====================

// Get all banners
routerBanner.get("/all", getBanners);

// Get feature banners
routerBanner.get("/featured", getFeatureBanners);

// Get banners from company id
routerBanner.get("/company/:id", getBannerByCompany);

// Get banners from service id
routerBanner.get("/service/:id", getBannerByService);

// Get banners preview from service id
routerBanner.get("/service/:id/previews", getBannerPreviews);

// Create a new banner
routerBanner.post("/new", createBanner);

// Delete a banner
routerBanner.delete("/delete/:id", deleteBanner);

// ===================== Nested Dynamic Routes =====================

// Get value banners
routerBanner.get("/:id/value", getValueBanners);

// Get mission banners
routerBanner.get("/:id/mission", getMissionBanners);

// Get vision banners
routerBanner.get("/:id/vision", getVisionBanners);

// Get preview 1 banners
routerBanner.get("/:id/preview1", getPreview1Banners);

// Get preview 2 banners
routerBanner.get("/:id/preview2", getPreview2Banners);

// Get preview 3 banners
routerBanner.get("/:id/preview3", getPreview3Banners);

// Get background banners
routerBanner.get("/:id/background", getBackgroundBanners);

// ===================== Update Routes =====================

// Update a banner to show in slider
routerBanner.put("/:id/add-to-slider", updateBannerShowInSlider);

// Update a banner to show in value
routerBanner.put("/:id/add-to-value", updateBannerShowInValue);

// Update a banner to show in mission
routerBanner.put("/:id/add-to-mission", updateBannerShowInMission);

// Update a banner to show in vision
routerBanner.put("/:id/add-to-vision", updateBannerShowInVision);

// Update a banner background
routerBanner.put("/:id/add-to-background", updateBannerBackground);

// Update a banner preview 1
routerBanner.put("/:id/add-to-preview1", updateBannerPreview1);

// Update a banner preview 2
routerBanner.put("/:id/add-to-preview2", updateBannerPreview2);

// Update a banner preview 3
routerBanner.put("/:id/add-to-preview3", updateBannerPreview3);

// ===================== Catch-All Route =====================

// Get a banner by id (placed last to catch all other specific `/:id` routes)
routerBanner.get("/:id", getBannerId);

module.exports = routerBanner;
