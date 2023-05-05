const express = require("express");
const customerController = require("../controllers/customerController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.get("/", jwtAuth, authorize("admin"), customerController.getAllCustomer);
router.get("/detail/:id", jwtAuth, authorize("admin"), customerController.getCustomer);
router.get(
  "/detail",
  jwtAuth,
  authorize("customer"),
  customerController.getCustomerDetails
);
router.patch("/:id", jwtAuth, authorize("admin"), customerController.updateCustomer);
router.delete("/:id", jwtAuth, authorize("admin"), customerController.deleteCustomer);
module.exports = router;
