const express = require("express");
const serviceController = require("../controllers/serviceController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post("/register", jwtAuth, authorize("company"), serviceController.registerService);
router.patch("/", jwtAuth, authorize("company"), serviceController.updateService);
router.delete("/", jwtAuth, authorize("company"), serviceController.deleteService);
router.get("/", jwtAuth, authorize("company"), serviceController.getAllService);
router.get("/detail", jwtAuth, authorize("company"), serviceController.getServiceDetail);
module.exports = router;