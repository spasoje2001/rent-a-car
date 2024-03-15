const express = require("express");
const router = express.Router();
const userService = require("../service/user_service.js");

router.get("/sortedAsc", (req, res) => {
  const sortingParam = req.query.sortingParam;
  res.json(userService.getSortedAsc(sortingParam));
});

router.get("/sortedDesc", (req, res) => {
  const sortingParam = req.query.sortingParam;
  res.json(userService.getSortedDesc(sortingParam));
});

router.get("/filter", (req, res) => {
  const { userRole, tierName } = req.query;
  res.json(userService.getFilteredObjects(userRole, tierName));
});

router.get("/allCustomers/:id", (req, res) => {
  const id = req.user.id;
  try {
    res.status(200).json(userService.getCustomersByManagerId(id));
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/allUsers", (req, res) => {
  try {
    res.status(200).json(userService.getAll());
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/orders", (req, res) => {
  const id = req.user.id;
  console.log("id:", id);
  try {
    res.status(200).json(userService.getOrdersByUserId(id));
  } catch (error) {
    res.status(404).json({ error: "Orders not found" });
  }
});

router.get("/availableManagers", (req, res) => {
  try {
    res.status(200).json(userService.getAvailableManagers());
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});


router.get("/suspisiousCustomers", (req, res) => {
  try {
    res.status(200).json(userService.getSuspisiousCustomers());
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/", (req, res) => {
  const id = parseInt(req.user.id, 10);
  try {
    res.status(200).json(userService.getById(id));
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

router.put("/updateManager", (req, res) => {
  const manager = req.body;
  try{
      res.status(200).json(userService.update(manager.id, manager));
    } 
  catch {
      res.status(404).json({ error: "Manager not found to update" });
    }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { profile } = req.body;
  try{
    res.status(200).json(userService.update(id,profile))
  } catch{
    res.status(404).json({error: "Order didn't updated"})
  }
})

router.put("/", (req, res) => {
  const user = userService.getById(req.body.id);

  try {
      if (user) {
        if (req.body.username) {
          user.username = req.body.username;
        }      
        if (req.body.password) {
          user.password = req.body.password;
        }
        if (req.body.name) {
          user.name = req.body.name;
        }
        if (req.body.surname) {
          user.surname = req.body.surname;
        }
        if (req.body.gender) {
          user.gender = req.body.gender;
        }
        if (req.body.birthDate) {
          user.birthDate = req.body.birthDate;
        }
        if (req.body.myRentals) {
          user.myRentals = req.body.myRentals;
        }
        if (req.body.numberOfPoints) {
          user.numberOfPoints = req.body.numberOfPoints;
        }
        if (req.body.customerTier) {
          user.customerTier = req.body.customerTier;
        }
        if (req.body.currentBasket) {
          user.currentBasket = req.body.currentBasket;
        }
        if (req.body.myRentACars) {
          user.myRentACars = req.body.myRentACars;
        }
        if (req.body.numberOfCancelledRentals) {
          user.numberOfCancelledRentals = req.body.numberOfCancelledRentals;
        }      
        if (req.body.isBlocked) {
          user.isBlocked = req.body.isBlocked;
        }

        userService.update(user.id, user);
        res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found to update" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
