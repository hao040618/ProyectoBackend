const mongoose = require("mongoose");
const Coche = require("../../api/models/coche");
const coches = require("../../data/coches");

const lanzarSemilla = async () => {
    try {
        await mongoose.connect("mongodb://dani1234dong45678_db_user:GvK2kivViG5cM0vw@ac-yzswt7h-shard-00-00.dptknus.mongodb.net:27017,ac-yzswt7h-shard-00-01.dptknus.mongodb.net:27017,ac-yzswt7h-shard-00-02.dptknus.mongodb.net:27017/?ssl=true&replicaSet=atlas-a7f3p6-shard-0&authSource=admin&appName=PrimerBackend");

        await Coche.collection.drop();
        console.log("Datos eliminados");

        await Coche.insertMany(coches);
        console.log("Datos introducidos");

        await mongoose.disconnect;
        console.log("Desconexión de la BBDD")
    } catch (error) {
        console.log(error);
    }
};

lanzarSemilla();