const router = require("express").Router();
const UserController = require("../controllers/userController");
const { errorHandler } = require("../errorHandlers/errorHandler");

router.get("/users", UserController.listUsers);
router.post("/register", UserController.registerHandler);
router.post("/login", UserController.loginHandler);

router.use(errorHandler);

module.exports = router;
