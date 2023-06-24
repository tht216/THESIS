const express = require("express");
const serviceController = require("../controllers/serviceController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post(
  "/register",
  jwtAuth,
  authorize("company"),
  serviceController.registerService
);
router.post(
  "/create/admin",
  jwtAuth,
  authorize("admin"),
  serviceController.registerServiceAdmin
);
router.patch(
  "/admin/:id",
  jwtAuth,
  authorize("admin"),
  serviceController.updateService
);
router.delete(
  "/",
  jwtAuth,
  authorize("company"),
  serviceController.deleteService
);
router.delete(
  "/admin/:id",
  jwtAuth,
  authorize("admin"),
  serviceController.deleteServiceByAdmin
);
router.get("/", jwtAuth, authorize("company"), serviceController.getAllService);
router.post(
  "/admin",
  jwtAuth,
  authorize("admin"),
  serviceController.getAllServiceByAdmin
);
router.get(
  "/detail",
  jwtAuth,
  authorize("company"),
  serviceController.getServiceDetail
);
router.get(
  "/detail/admin/:id",
  jwtAuth,
  authorize("admin"),
  serviceController.getServiceDetailByAdmin
);
module.exports = router;
