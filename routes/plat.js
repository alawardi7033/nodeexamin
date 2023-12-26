const express = require("express");
const router = express.Router();
const platcontroller = require("../controller/platcontroller");
router.post("/addplat",platcontroller.addplat);
router.get("/getAllPlat",platcontroller.showplat);


module.exports = router;