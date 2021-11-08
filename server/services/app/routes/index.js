const router = require("express").Router();

const Controller = require("../controllers/controller");

const moviesRouter = require("./moviesRouter");

const { errorHandler } = require("../errorHandlers/errorHandler");

router.get("/detail/:id", Controller.getMovieId);
router.use("/movies", moviesRouter);
router.get("/series", Controller.fetchSeries);
router.get("/genres", Controller.getAllGenres);
router.get("/:id/cast", Controller.getCast);
router.post("/:id/cast", Controller.addCast);
router.use(errorHandler);

module.exports = router;
