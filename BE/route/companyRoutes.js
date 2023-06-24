const express = require("express");
const companyController = require("../controllers/companyController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post("/", jwtAuth, authorize("admin"), companyController.getAllCompany);
router.post("/getFilterCompany", jwtAuth, companyController.getFilterCompany);
router.get(
  "/detail",
  jwtAuth,
  authorize("company"),
  companyController.getCompanyDetails
);
router.get(
  "/detail/:id",
  jwtAuth,
  authorize("admin"),
  companyController.getCompanyDetailByAdmin
);
router.post(
  "/create",
  jwtAuth,
  authorize("admin"),
  companyController.createCompany
);
router.delete(
  "/:id",
  jwtAuth,
  authorize("admin"),
  companyController.deleteCompany
);
router.patch(
  "/",
  jwtAuth,
  authorize("company"),
  companyController.updateCompany
);
router.patch(
  "/:id",
  jwtAuth,
  authorize("admin"),
  companyController.updateCompanyByAdmin
);
module.exports = router;
