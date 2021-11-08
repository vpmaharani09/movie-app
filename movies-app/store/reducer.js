import {
  SET_MOVIES,
  SET_MOVIE,
  SET_LOADING_MOVIES,
  SET_ISERROR_MOVIES,
  SET_ERROR_MOVIES,
  SET_SERIES,
  SET_LOADING_SERIES,
  SET_ALL,
  SET_LOADING,
} from "./actionType";

const initialState = {
  all: [],
  isLoading: false,
  movies: [],
  series: [],
  movie: {},
  isLoadingMovies: false,
  isLoadingSeries: false,
  isError: false,
  errMsg: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL:
      return { ...state, all: action.payload };

    case SET_MOVIES:
      return { ...state, movies: action.payload };

    case SET_MOVIE:
      return { ...state, movie: action.payload };

    case SET_SERIES:
      return { ...state, series: action.payload };

    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_LOADING_MOVIES:
      return { ...state, isLoadingMovies: action.payload };

    case SET_LOADING_SERIES:
      return { ...state, isLoadingSeries: action.payload };

    case SET_ISERROR_MOVIES:
      return { ...state, isError: action.payload };

    case SET_ERROR_MOVIES:
      return { ...state, errMsg: action.payload };

    default:
      return state;
  }
}
