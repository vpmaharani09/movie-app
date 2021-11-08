import {
  SET_MOVIES,
  SET_LOADING_MOVIES,
  SET_ISERROR_MOVIES,
  SET_ERROR_MOVIES,
  SET_MOVIE,
  SET_SERIES,
  SET_LOADING_SERIES,
  SET_ALL,
  SET_LOADING,
} from "./actionType";

const baseUrl = "https://react-hackflix.herokuapp.com";

export function setAll(payload) {
  return {
    type: SET_ALL,
    payload: payload,
  };
}

export function setMovies(movies) {
  return {
    type: SET_MOVIES,
    payload: movies,
  };
}

export function setSeries(series) {
  return {
    type: SET_SERIES,
    payload: series,
  };
}

export function setMovie(movie) {
  return {
    type: SET_MOVIE,
    payload: movie,
  };
}

export function setLoadingMovies(isLoading) {
  return {
    type: SET_LOADING_MOVIES,
    payload: isLoading,
  };
}

export function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
}

export function setLoadingSeries(isLoading) {
  return {
    type: SET_LOADING_SERIES,
    payload: isLoading,
  };
}

export function setIsErrorMovies(isError) {
  return {
    type: SET_ISERROR_MOVIES,
    payload: isError,
  };
}

export function setErrorMovies(errMsg) {
  return {
    type: SET_ERROR_MOVIES,
    payload: errMsg,
  };
}

export function fetchAllAsync() {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(`${baseUrl}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAll(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(setLoading(false)));
  };
}

export function setMoviesAsync() {
  return function (dispatch) {
    dispatch(setLoadingMovies(true));
    fetch(`${baseUrl}/movies`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMovies(data));
      })
      .catch((err) => {
        dispatch(setIsErrorMovies(true));
        dispatch(setErrorMovies(err));
      })
      .finally(() => dispatch(setLoadingMovies(false)));
  };
}

export function setSeriesAsync() {
  return function (dispatch) {
    dispatch(setLoadingSeries(true));
    fetch(`${baseUrl}/series`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setSeries(data));
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(setLoadingSeries(false)));
  };
}

export function getMovieId(id) {
  return function (dispatch) {
    dispatch(setLoadingMovies(true));
    fetch(`${baseUrl}/detail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMovie(data));
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(setLoadingMovies(false)));
  };
}
