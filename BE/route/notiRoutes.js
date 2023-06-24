const express = require("express");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const notiController = require("../controllers/notiController");
const router = express.Router();

router.get("/", jwtAuth, notiController.getNotification);
router.patch("/reset", jwtAuth, notiController.resetNotification);
module.exports = router;
