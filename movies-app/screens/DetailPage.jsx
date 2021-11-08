import { useQuery } from "@apollo/client";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  FlatList,
} from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { NativeBaseProvider, Center } from "native-base";
import { LoadingHandle } from "../components/LoadingHandle";
import { ErrorHandle } from "../components/Error";
import { LinearGradient } from "expo-linear-gradient";
import { GET_MOVIE_ID } from "../graphql";
import { TouchableOpacity } from "react-native";
import CastCard from "../components/CastCard";
const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

export default function DetailPage({ navigation, route }) {
  const { movieId } = route.params;
  // console.log(movieId, "iddd");

  const { loading, data, error } = useQuery(GET_MOVIE_ID, {
    variables: {
      id: movieId,
    },
  });

  const title = "Something went wrong";

  const movie = data?.movie;

  if (loading) {
    return (
      <NativeBaseProvider>
        <Center flex={1} px="3" py="64">
          <LoadingHandle />
        </Center>
      </NativeBaseProvider>
    );
  }

  if (error) {
    return (
      <NativeBaseProvider>
        <Center flex={1} px="3" py="64">
          <ErrorHandle title={title} />
        </Center>
      </NativeBaseProvider>
    );
  }

  const yellow = "#FFC107";

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
        start={[0, 0.3]}
        style={styles.gradient}
      />
      <View style={styles.movieContainer}>
        <Image
          style={styles.movieContent}
          resizeMode="cover"
          source={{ uri: movie?.mainImg }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={35} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Share</Text>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(movie?.trailerUrl)}
      >
        <Feather name="play-circle" size={70} color={"white"} />
      </TouchableOpacity>
      <View height={setHeight(37)}></View>
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie?.title}
        </Text>
        <View style={styles.row}>
          <Ionicons name="star" size={22} color={yellow} />
          <Text style={styles.ratingText}>{movie?.rating}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genre?.name} | {movie?.releasedYear}
        {movie?.totalEpisode !== 0 ? (
          <Text> | Total Episode : {movie?.totalEpisode}</Text>
        ) : null}
      </Text>
      <Text style={styles.genreText}>{movie?.category}</Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Sinopsis</Text>
        <Text style={styles.overviewText}>{movie?.sinopsis}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <FlatList
          data={movie?.casts}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <View width={20} />}
          ItemSeparatorComponent={() => <View width={20} />}
          ListFooterComponent={() => <View width={20} />}
          renderItem={({ item }) => (
            <CastCard name={item?.name} image={item?.image} />
          )}
        ></FlatList>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    // paddingTop: 100,
  },
  innerText: {
    color: "#333",
  },
  movieContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth(100 - 145) / 2,
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  movieContent: {
    height: setHeight(35),
    width: setWidth(145),
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
  },
  gradient: {
    height: setHeight(6),
    width: setWidth(100),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: "white",
    // fontFamily: "Bold",
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: "black",
    fontSize: 18,
    width: setWidth(60),
    fontWeight: "bold",
  },
  ratingText: {
    marginLeft: 5,
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genreText: {
    color: "#969696",
    paddingHorizontal: 20,
    paddingTop: 5,
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitle: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  overviewText: {
    color: "#969696",
    paddingVertical: 5,
    fontSize: 13,
    textAlign: "justify",
  },
  castTitle: {
    marginLeft: 20,
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: "#333",
    fontSize: 13,
  },
  extraListTitle: {
    marginLeft: 20,
    color: "#333",
    fontSize: 18,
    marginVertical: 8,
  },
});
