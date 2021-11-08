const { ApolloServer, gql } = require("apollo-server");
const { serverApp, serverUser } = require("./apis/api");
const Redis = require("ioredis");
const redis = new Redis({
  host:
    process.env.REDIS_HOST ||
    "redis-10977.c1.us-west-2-2.ec2.cloud.redislabs.com",
  port: process.env.REDIS_PORT || 10977,
  password: process.env.REDIS_PASSWORD || "UMzBypnj5QKNtlM1sY0P9jNZqcM6gFVl",
});

const typeDefs = gql`
  type Genre {
    name: String
  }

  type Image {
    url: String
  }

  type Cast {
    name: String
    image: String
  }

  type Movie {
    id: String
    title: String
    mainImg: String
    sinopsis: String
    trailerUrl: String
    category: String
    rating: Int
    totalEpisode: Int
    releasedYear: Int
    genre: Genre
    images: [Image]
    casts: [Cast]
  }

  type Serie {
    id: String
    title: String
    mainImg: String
    sinopsis: String
    trailerUrl: String
    rating: Int
    totalEpisode: Int
    releasedYear: Int
    genre: Genre
    images: [Image]
    cast: [Cast]
  }

  type User {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    movies: [Movie]
    series: [Serie]
    users: [User]
    movie(id: ID): Movie
    serie(id: ID): Serie
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    phoneNumber: String!
    address: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Token {
    access_token: String
  }

  type Mutation {
    registerUser(user: RegisterInput): User
    loginHandler(user: LoginInput): Token
  }
`;

const resolvers = {
  Query: {
    async movies() {
      try {
        const movies = await redis.get("movies");
        // console.log(movies, "iniredis");
        if (!movies) {
          const { data } = await serverApp.get("/movies");
          await redis.set("movies", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(movies);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async series() {
      try {
        const series = await redis.get("series");
        // console.log(series, "iniredis");
        if (!series) {
          const { data } = await serverApp.get("/series");
          await redis.set("series", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(series);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async users() {
      try {
        const users = await redis.get("users");
        // console.log(users, "iniredis");
        if (!users) {
          const { data } = await serverUser.get("/users");
          await redis.set("users", JSON.stringify(data?.listUsers));
          return data.listUsers;
        } else {
          return JSON.parse(users);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async movie(_, args) {
      const { id } = args;
      try {
        const movie = await redis.get("movie");
        // console.log(movie, "iniredis");
        if (!movie || movie.id !== id) {
          const { data } = await serverApp.get(`/detail/${id}`);
          await redis.set("movie", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(movie);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async serie(_, args) {
      const { id } = args;
      try {
        const serie = await redis.get("serie");
        console.log(serie, "iniredis");
        if (!serie || serie.id !== id) {
          const { data } = await serverApp.get(`/detail/${id}`);
          // console.log(data);

          await redis.set("serie", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(serie);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async registerUser(_, args) {
      const { data } = await serverUser.post(`/register`, args.user);
      return data;
    },
    async loginHandler(_, args) {
      // console.log(args);
      const { data } = await serverUser.post(`/login`, args.user);
      // console.log(data);
      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
// console.log(server);

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log("server running, url", url);
});
