const Plat = require("../model/plat");

async function addplat(req, res, next) {
  try {
    console.log("body :" + JSON.stringify(req.body));
    const plat = new Plat({
        nom: req.body.nom,
        id_serveur: null,
        prix: req.body.prix,
        etat: "non servi",
        description : req.body.description
    });
    await plat.save();
    res.send("le plat a été ajouté avec succés : " + req.body.nom);
  } catch (err) {
    console.log(err);
  }
}

async function showplat(req, res, next) {
    try {
      const data = await Plat.find();
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }


  




module.exports = { addplat, showplat };