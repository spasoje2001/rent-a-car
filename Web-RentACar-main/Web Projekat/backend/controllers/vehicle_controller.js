const express = require("express");
const router = express.Router();
const vehicleService = require("../service/vehicle_service.js");

router.use(express.json());

function handleNotFound(res, errorMessage) {
  return res.status(404).json({ error: errorMessage || "Not found" });
}

function handleServerError(res, errorMessage) {
  console.error("An error occurred:", errorMessage);
  return res.status(500).json({ error: "Internal server error" });
}

router.get("/orderedVehicles/:id", (req, res) => {
  const rentacarId = parseInt(req.params.id, 10);
  try {
    const orderedVehicles = vehicleService.getOrderedVehiclesForRentacar(rentacarId);
    res.status(200).json(orderedVehicles);
  } catch (error) {
    handleNotFound(res, "Ordered vehicles not found");
  }
});

router.get("/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id, 10);
  try {
    const vehicle = vehicleService.getVehicleById(vehicleId);
    if (!vehicle) {
      return handleNotFound(res, "Vehicle not found");
    }
    res.status(200).json(vehicle);
  } catch (error) {
    handleServerError(res, error.message);
  }
});

router.get("/", (req, res) => {
  const vehicles = vehicleService.getAll();
  res.json(vehicles);
});

router.post("/:id", (req, res) => {
  const vehicle = req.body;
  const vehicleId = parseInt(req.params.id, 10);
  try {
    vehicleService.create(vehicle, vehicleId);
    res.status(200).json({ message: "Vehicle has been created successfully!" });
  } catch (error) {
    handleServerError(res, "Failure encountered while creating the vehicle.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id, 10);
    const updatedData = req.body;
    const updatedVehicle = await vehicleService.update(vehicleId, updatedData);

    if (!updatedVehicle) {
      return handleNotFound(res, "Vehicle not found");
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    handleServerError(res, error.message);
  }
});

router.delete("/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id, 10);
  try {
    const vehicle = vehicleService.getById(vehicleId);
    if (!vehicle) {
      return handleNotFound(res, "Vehicle not found");
    }
    vehicleService.remove(vehicleId);
    res.status(200).json({ message: "Vehicle has been deleted successfully" });
  } catch (error) {
    handleServerError(res, error.message);
  }
});



module.exports = router;