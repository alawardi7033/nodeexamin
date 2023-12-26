const Serveur = require("../model/serveur");
const Plat = require("../model/plat");

async function add(req, res, next) {
    try {
        console.log("body :" + JSON.stringify(req.body));
        const serveur = new Serveur(req.body);
        await serveur.save();
        res.send("le serveur a été ajouté avec succés : " + req.body.nom);
    } catch (err) {
        console.log(err);
    }
}

async function show(req, res, next) {
    try {
        const data = await Serveur.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}


async function getserveur(req, res, next) {
    try {
        const data = await Serveur.findById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}

async function deleteserveur(req, res, next) {
    try {
        const data = await Serveur.findByIdAndDelete(req.params.id);
        //res.json(data);
        res.send("le serveur a été suprimé avec succés ");
    } catch (err) {
        console.log(err);
    }
}

async function servir(req, res, next) {
    try {

        const plat = await Plat.findByIdAndUpdate(req.params.id2, {
            id_serveur: req.params.id1,
            etat: "servi",
        });
        res.send(plat + "a été servir");
    } catch (err) {
        console.log(err);
    }
}

async function servirsocket(data) {
    try {
        console.log("a7777" + JSON.stringify(data));
        const plat = await Plat.findByIdAndUpdate(data.id, {
            id_serveur: data.id_serveur,
            etat: "servi",
        });
        return plat; // Assurez-vous de renvoyer la valeur correcte
    } catch (err) {
        console.log(err);
    }
}

async function affichesocket(data) {
    try {
        console.log("kkkk" + JSON.stringify(data));
        const j1 = await Plat.findById(data.id);
        return j1; // Assurez-vous de renvoyer la valeur correcte
    } catch (err) {
        console.log(err);
    }
}


module.exports = { add, show, getserveur, deleteserveur, servir, servirsocket, affichesocket };