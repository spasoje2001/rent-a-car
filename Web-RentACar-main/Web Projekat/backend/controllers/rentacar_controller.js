const express = require("express");
const router = express.Router();
const rentacarService = require("../service/rentacar_service");

router.use(express.json());



router.get("/sortedCars", (req, res) => {
    res.json(rentacarService.getSortedCars());
});
  
router.get("/sortedAscending", (req, res) => {
    const sortingParameter = req.query.sortingParam;
    res.json(rentacarService.getSortedAsc(sortingParameter));
});
  
router.get("/sortedDescending", (req, res) => {
    const sortingParameter = req.query.sortingParam;
    res.json(rentacarService.getSortedDesc(sortingParameter));
});
  
router.get("/available", (req, res) => {
    const { dateFrom, dateTo } = req.query;
    res.json(rentacarService.getAvailable(dateFrom, dateTo));
});
  
router.get("/search", (req, res) => {
    const { name, vehichleType, locationName, grade } = req.query;
    res.json(
        rentacarService.getSearchedObjects(name, vehichleType, locationName, grade)
    );
});
  
router.get("/filter", (req, res) => {
    const { transmissionType, fuelType } = req.query;
    res.json(rentacarService.getFilteredObjects(transmissionType, fuelType));
});

router.get("/:id", (req, res) => {
    const rentacarId = parseInt(req.params.id, 10);
    try {
      res.status(200).json(rentacarService.getById(rentacarId));
    } catch {
      res.status(404).json({ error: "Rentacar object not found" });
    }
});

router.get("/", (req, res) => {
    res.json(rentacarService.getAll());
});

router.post("/", (req, res) => {
  try {
      const rentACar = rentacarService.create(req.body);
      console.log(rentACar);
      res.status(200).json({ message: "Rentacar object has been created successfully", rentACar });
  } catch (error) {
      res.status(400).json({ error: "Failure encountered while creating the rentacar object." });
  }
});


router.put("/vehicleUpdated/:idV/:idR", (req, res) => {
    const vehicleId = parseInt(req.params.idV, 10);
    const rentacarId = parseInt(req.params.idR, 10);
    const updatedData = req.body;
    try {
      res.status(200).json(rentacarService.vehicleUpdated(vehicleId, rentacarId, updatedData));
    } catch {
      res.status(404).json({ error: "Vehicle didn't update" });
    }
});
  
router.put("/vehicleAdded/:id", (req,res) => {
    console.log("usao u controller");
    const rentacarId = parseInt(req.params.id, 10);
    const vehicle = req.body;
    
    try{
      res.status(200).json(rentacarService.vehicleAdded(rentacarId,vehicle))
    } catch{
      res.status(404).json({error: "Vehicle didn't added"})
    }
})
  
router.put("/addedGrade/:id", (req,res) => {
    console.log(" usao");
    const rentacarId = parseInt(req.params.id, 10);
    const grade = req.body.grade;
    console.log("grade u controlleru:", grade);
    try{
      res.status(200).json(rentacarService.gradeAdded(rentacarId,grade))
    } catch{
      res.status(404).json({error: "Object hasn't been found"})
    }
})

router.delete("/vehicle/:idV/:idR", (req, res) => {
    const vehicleId =parseInt(req.params.idV, 10);
    const rentacarId = parseInt(req.params.idR,10);
    try {
        rentacarService.removeVehicle(vehicleId, rentacarId);
        res.status(200).json({ message: "Vehicle deleted successfully" });
      }
    catch {
      res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;