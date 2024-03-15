const express = require("express");
const router = express.Router();
const basketService = require("../service/basket_service");

router.use(express.json());

router.get("/user/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try {
      res.status(200).json(basketService.getByUser(userId));
    } catch {
      res.status(404).json({ error: "Object not found" });
    }
});

router.get("/:id", (req, res) => {
    const basketId = parseInt(req.params.id, 10);
    try {
      res.status(200).json(basketService.getById(basketId));
    } catch {
      res.status(404).json({ error: "Object not found" });
    }
});

router.get("/", (req, res) => {
    res.json(basketService.getAll());
});

router.post("/", (req, res) => {
    const basket = req.body;
    try {
        basketService.create(basket);
        res.status(200).json({ message: "Basket has been created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failure encountered while creating the basket." });
    }
});

router.delete("/:id", (req, res) => {
    const basketId = parseInt(req.params.id, 10);
    try {
        basketService.remove(basketId);
        res.status(200).json({ message: "Basket has been deleted successfully" });
      
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;