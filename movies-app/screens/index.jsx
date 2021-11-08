import React from "react";
import Screen from "./Screen";

export const MoviesScreen = ({ navigation }) => (
  <Screen navigation={navigation} name={movies}></Screen>
);

export const SeriesScreen = ({ navigation }) => (
  <Screen navigation={navigation} name={series}></Screen>
);
