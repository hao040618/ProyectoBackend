const upload = require("../../middlewares/file");
const { isAuth } = require("../../middlewares/isAuth");
const { postCar, deleteCar, getCars, updateCar } = require("../controllers/coche");

const cochesRouter = require("express").Router();

cochesRouter.post("/CreateCar", isAuth, upload.single("img"), postCar);
cochesRouter.delete("/:id", isAuth, deleteCar);
cochesRouter.get("/", getCars);
cochesRouter.put("/:id", isAuth, updateCar);

module.exports = cochesRouter;