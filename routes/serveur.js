const express = require("express");
const router = express.Router();
const serveurController = require("../controller/serveurcontroller");
const validate = require("../middle/validate");
router.post("/nouveauserveur",validate ,serveurController.add);
router.get("/getAllServeur",serveurController.show);
router.get("/getserveur/:id",serveurController.getserveur);
router.delete("/deleteserveur/:id",serveurController.deleteserveur);
router.put("/servir/:id1/:id2", serveurController.servir);
router.get("/servir", (req, res, next) => {
    res.render("plat");
  });

module.exports = router;
