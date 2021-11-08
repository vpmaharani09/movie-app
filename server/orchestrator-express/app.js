const express = require("express");
const app = express();
const PORT = 4000;
const server = require("./apis/api");
const Redis = require("ioredis");
const redis = new Redis();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/all", async (req, res, next) => {
  try {
    const dataCache = await redis.get("allData");
    if (!dataCache) {
      let { data: movies } = await server.get("/movies");
      let { data: series } = await server.get("/series");

      const allData = { movies, series };
      await redis.set("allData", JSON.stringify(allData));
      res.status(200).json(JSON.parse(allData));
    } else {
      res.status(200).json(JSON.parse(dataCache));
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/movies", async (req, res, next) => {
  try {
    const dataCache = await redis.get("movies");
    if (!dataCache) {
      let { data: movies } = await server.get("/movies");

      const dataMovies = movies;
      await redis.set("movies", JSON.stringify(dataMovies));
      res.status(200).json(JSON.parse(dataMovies));
    } else {
      res.status(200).json(JSON.parse(dataCache));
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/series", async (req, res, next) => {
  try {
    const dataCache = await redis.get("series");

    if (!dataCache) {
      let { data: series } = await server.get("/series");

      const dataSeries = series;
      await redis.set("series", JSON.stringify(dataSeries));
      res.status(200).json(JSON.parse(dataSeries));
    } else {
      res.status(200).json(JSON.parse(dataCache));
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/add", async (req, res, next) => {
  //   console.log(req.body);
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
    let response = await server({
      method: "POST",
      url: "/movies",
      data: {
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
      },
    });

    const newData = response.data;
    await redis.del("allData");
    await redis.del("movies");
    await redis.del("series");
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await server.delete(`/movies/${id}`);

    await redis.del("allData");
    await redis.del("movies");
    await redis.del("series");
    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, (_) => {
  console.log("app is running on port", PORT);
});
