const express = require("express");
const customerController = require("../controllers/customerController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post(
  "/",
  jwtAuth,
  authorize("admin"),
  customerController.getAllCustomer
);
router.post(
  "/create",
  jwtAuth,
  authorize("admin"),
  customerController.createCustomer
);
router.get(
  "/detail/:id",
  jwtAuth,
  authorize("admin"),
  customerController.getCustomer
);
router.get(
  "/detail",
  jwtAuth,
  authorize("customer"),
  customerController.getCustomerDetails
);
router.patch(
  "/detail",
  jwtAuth,
  authorize("customer"),
  customerController.updateCustomerDetail
);
router.patch(
  "/:id",
  jwtAuth,
  authorize("admin"),
  customerController.updateCustomer
);
router.delete(
  "/:id",
  jwtAuth,
  authorize("admin"),
  customerController.deleteCustomer
);
module.exports = router;
