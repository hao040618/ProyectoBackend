const { isAuth } = require("../../middlewares/isAuth");
const { register, login, getUsers, updateUser, deleteUser,} = require("../controllers/usuario");

const usersRouter = require("express").Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", getUsers);
usersRouter.put("/:id", isAuth, updateUser);
usersRouter.delete("/:id", isAuth, deleteUser);

module.exports = usersRouter;