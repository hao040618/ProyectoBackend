const User = require("../api/models/usuario");
const { verifyJwt } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ");

        const [, onlyToken] = token;

        const { id } = verifyJwt(onlyToken);

        const user = await User.findById(id);
        
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json("No Autorizado");
    }
};

module.exports = { isAuth };