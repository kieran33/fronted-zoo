const mongoose = require("mongoose");

const SchemaAnimal = new mongoose.Schema({
    prenom: String,
    nombreVues: Number
});

const AnimalModel = mongoose.model("animaux_populaires", SchemaAnimal);
module.exports = AnimalModel;