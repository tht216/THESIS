const express = require("express");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const pickupController = require("../controllers/pickupController");
const router = express.Router();

router.post(
  "/book",
  jwtAuth,
  authorize("customer"),
  pickupController.bookPickup
);
router.post(
  "/rating",
  jwtAuth,
  authorize("customer"),
  pickupController.ratingPickup
);
router.get(
  "/getDetailCustomer",
  jwtAuth,
  authorize("customer"),
  pickupController.getPickupDetail
);
router.get(
  "/getDetailCompany",
  jwtAuth,
  authorize("company"),
  pickupController.getPickupDetailCompany
);
router.get(
  "/getByMonthCompany",
  jwtAuth,
  authorize("company"),
  pickupController.getPickupByMonthCompany
);
router.get(
  "/getByServiceCompany",
  jwtAuth,
  authorize("company"),
  pickupController.getPickupByServiceCompany
);
router.patch("/changeStatus/:id", jwtAuth, pickupController.changeStatusPickup);
router.get("/:id", jwtAuth, pickupController.getPickup);
module.exports = router;
