const { Movie, Genre, sequelize, Image, Cast } = require("../models");

class Controller {
  static async fetchMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        where: {
          category: "movies",
        },
        include: [
          {
            model: Genre,
            as: "genre",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Image,
            as: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(movies);
      //   console.log(movies);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getMovieId(req, res, next) {
    const { id } = req.params;
    try {
      const movies = await Movie.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Genre,
            as: "genre",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Image,
            as: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Cast,
            as: "casts",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(movies);
      //   console.log(movies);
    } catch (err) {
      next(err);
    }
  }

  static async fetchSeries(req, res, next) {
    try {
      const movies = await Movie.findAll({
        where: {
          category: "series",
        },
        include: [
          {
            model: Genre,
            as: "genre",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Image,
            as: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(movies);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createMovies(req, res, next) {
    const t = await sequelize.transaction();

    const {
      title,
      trailerUrl,
      rating,
      GenreId,
      totalEpisode,
      sinopsis,
      releasedYear,
      category,
      mainImg,
      imageUrl,
    } = req.body;
    try {
      if (!imageUrl) {
        throw {
          name: "BADREQUEST",
          msg: "image is required",
        };
      }
      const newMovie = {
        title,
        trailerUrl,
        rating: +rating,
        GenreId: +GenreId,
        totalEpisode: +totalEpisode,
        sinopsis,
        releasedYear,
        category,
        mainImg,
      };
      const movie = await Movie.create(newMovie, { transaction: t });

      // console.log(movie);

      const promises = imageUrl.map(async (item) => {
        await Image.create(
          {
            url: item,
            MovieId: movie.id,
          },
          { transaction: t }
        );
      });

      Promise.all(promises)
        .then(async (values) => {
          movie.dataValues.Image = promises.dataValues;
          await t.commit();
          res.status(201).json(movie);
        })
        .catch(() => {
          throw new Error();
        });
    } catch (err) {
      await t.rollback();
      console.log(err);
      next(err);
    }
  }

  static async addCast(req, res, next) {
    const { id } = req.params;
    const { name, role, image } = req.body; //tambahin role
    try {
      const createCast = await Cast.create({
        name,
        role,
        image,
        MovieId: id,
      });
      res.status(201).json({
        msg: `success add cast to id ${id}`,
        createCast,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async getCast(req, res, next) {
    const id = +req.params.id;
    // console.log(id);
    try {
      const findCast = await Movie.findOne({
        where: {
          id,
        },
        include: {
          model: Cast,
          as: "casts",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json({
        findCast,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async deleteMovie(req, res, next) {
    const { id } = req.params;
    try {
      const foundMovie = await Movie.findByPk(id);
      if (!foundMovie) {
        throw {
          name: "NOTFOUND",
          message: `movie with id ${id} not found`,
        };
      }
      const delMovie = await Movie.destroy({
        where: {
          id,
        },
        returning: true,
      });

      if (!delMovie) {
        throw {
          name: "NOTFOUND",
          message: `movie with id ${id} not found`,
        };
      }

      res.status(200).json({
        code: 200,
        msg: `movie with id ${id} deleted succesfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllGenres(req, res, next) {
    try {
      const genre = await Genre.findAll();
      res.status(200).json({ genre });
    } catch (err) {
      next(err);
    }
  }

  static async editMovie(req, res, next) {
    const { id } = req.params;
    const {
      title,
      trailerUrl,
      rating,
      GenreId,
      totalEpisode,
      sinopsis,
      releasedYear,
      category,
      imageUrl,
      mainImg,
    } = req.body;

    try {
      const foundMovie = await Movie.findByPk(id);
      //   console.log(foundMovie);

      if (!foundMovie) {
        throw {
          name: "NOTFOUND",
          message: `movie with id ${id} not found`,
        };
      }

      const update = await Movie.update(
        {
          title: title,
          trailerUrl: trailerUrl,
          rating: rating,
          GenreId: GenreId,
          totalEpisode: totalEpisode,
          sinopsis: sinopsis,
          releasedYear: releasedYear,
          category: category,
          mainImg: mainImg,
        },
        {
          where: {
            id: foundMovie.id,
          },
          returning: true,
        }
      );

      const result = update[1][0];
      //   console.log(result);
      const promises = imageUrl.map(async (item) => {
        await Image.update(
          {
            url: item,
          },
          {
            where: {
              MovieId: foundMovie.id,
            },
          }
        );
      });

      Promise.all(promises)
        .then(async () => {
          // await t.commit();
          console.log("image brhasil");
        })
        .catch((err) => {
          //   console.log(err);
          throw err;
        });

      res.status(200).json({
        code: 200,
        message: `succesfully updated movie with id ${id}`,
        result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
