const express = require("express");
const router = express.Router();
const orderService = require("../service/order_service");

router.use(express.json());

function handleNotFound(res, errorMessage) {
  return res.status(404).json({ error: errorMessage || "Not found" });
}

function handleServerError(res, errorMessage) {
  console.error("An error occurred:", errorMessage);
  return res.status(500).json({ error: "Internal server error" });
}

router.get("/filtered", (req, res) => {
  const { rentacarId, priceFrom, priceTo, dateFrom, dateTo } = req.query;
  const id = parseInt(rentacarId);
  res.json(orderService.getFiltered(id, priceFrom, priceTo, dateFrom, dateTo));
});

router.get("/sortedAscending", (req, res) => {
  const { sortingParameter, rentacarId } = req.query;
  res.json(orderService.getSortedAscending(sortingParameter, rentacarId));
});

router.get("/sortedDescending", (req, res) => {
  const { sortingParameter, rentacarId } = req.query;
  res.json(orderService.getSortedDescending(sortingParameter, rentacarId));
});

router.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    res.json(orderService.getByUser(id));
  } catch (error) {
    handleServerError(res, "Failed to find past orders from this user.");
  }
});

router.get("/rentacar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const orders = orderService.getByRentacar(id);
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    handleNotFound(res, "Failed to find past orders from this Rent-A-Car.");
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const order = orderService.getById(id);
    res.status(200).json(order);
  } catch (error) {
    handleNotFound(res, "Failed to find this order.");
  }
});

router.post("/", (req, res) => {
  const order = req.body;
  try {
    orderService.create(order);
    res.status(201).json({ message: "Order has been created successfully." });
  } catch (error) {
    handleServerError(res, "Failure encountered while creating your order.");
  }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const order = req.body;
  console.log("usli u put");
  try {
    const updatedOrder = orderService.update(id, order);
    res.status(200).json(updatedOrder);
  } catch (error) {
    handleNotFound(res, "Failure encountered while updating your order.");
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    orderService.remove(id);
    res.status(204).json(); // No content
  } catch (error) {
    handleServerError(res, "Failed to cancel the order.");
  }
});

module.exports = router;