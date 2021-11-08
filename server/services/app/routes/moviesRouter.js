const Controller = require("../controllers/controller");

const router = require("express").Router();

router.get("/", Controller.fetchMovies);
router.post("/", Controller.createMovies);
// router.get("/:id", Controller.getMovieId);
router.put("/:id", Controller.editMovie);
router.delete("/:id", Controller.deleteMovie);

module.exports = router;
