const express = require("express");
const router = express.Router();
const locationService = require("../service/location_service.js");

router.get("/", (req, res) => {
  console.log("EVO OVDE")
  try {
    console.log("backend loc")
    res.status(200).json(locationService.getAll());
  } catch (error) {
    res.status(404).json({ error: "Locations not found" });
  }});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      res.status(200).json(locationService.getById(id));
    } catch {
      res.status(404).json({ error: "Locations not found" });
    }
  });
  
module.exports = router;