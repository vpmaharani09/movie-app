import { gql } from "@apollo/client";

export const GET_ALL_DATA = gql`
  query GetAllData {
    movies {
      id
      title
      sinopsis
      rating
      releasedYear
      mainImg
      genre {
        name
      }
      images {
        url
      }
    }
    series {
      id
      title
      sinopsis
      rating
      releasedYear
      mainImg
      genre {
        name
      }
      images {
        url
      }
    }
  }
`;

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      sinopsis
      rating
      releasedYear
      mainImg
      genre {
        name
      }
      images {
        url
      }
    }
  }
`;

export const GET_SERIES = gql`
  query GetSeries {
    series {
      id
      title
      sinopsis
      rating
      releasedYear
      mainImg
      genre {
        name
      }
      images {
        url
      }
    }
  }
`;

export const GET_MOVIE_ID = gql`
  query GetMovieID($id: ID) {
    movie(id: $id) {
      id
      title
      mainImg
      sinopsis
      rating
      totalEpisode
      category
      releasedYear
      trailerUrl
      genre {
        name
      }
      images {
        url
      }
      casts {
        name
        image
      }
    }
  }
`;
