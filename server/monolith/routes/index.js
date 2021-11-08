const UserController = require("../controllers/userController");

const router = require("express").Router();

router.get("/users", UserController.listUsers);
router.post("/register", UserController.registerHandler);
router.post("/login", UserController.loginHandler);

module.exports = router;
