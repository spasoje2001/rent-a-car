const express = require("express");
const router = express.Router();
const commentService = require("../service/comment_service");

router.use(express.json());

router.get("/unapproved/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      res.status(200).json(commentService.getUnapprovedByObjectId(id));
    } catch {
      res.status(404).json({ error: "Object not found" });
    }
})
  
router.get("/acceptedComments/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      res.status(200).json(commentService.getAcceptedByRentalId(id));
    } catch {
      res.status(404).json({ error: "Object not found" });
    }
});
  
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      res.status(200).json(commentService.getByRentalId(id));
    } catch {
      res.status(404).json({ error: "Object not found" });
    }
});
  
router.get("/", (req, res) => {
    res.json(commentService.getAll());
});
  
router.post("/", (req, res) => {
    const object = req.body;
    try {
        commentService.create(object);
      res.status(200).json({ message: "Comment created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create basket" });
    }
});
  
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      res.status(200).json(commentService.getById(id));
    } catch {
      res.status(404).json({ error: "Object not found" });
    }
});
  
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const comm = req.body;
    try{
      res.status(200).json(commentService.update(id,comm))
    } catch {
      res.status(404).json({ error: "Object not found" });
    }
});

module.exports = router;