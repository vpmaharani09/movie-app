import React from "react";
import { useQuery } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { Center, NativeBaseProvider } from "native-base";
import Backdrop from "../components/Backdrop";
import { GET_MOVIES } from "../graphql";
import Rating from "../components/Rating";
import Genres from "../components/Genres";
import { LoadingHandle } from "../components/LoadingHandle";
import { ErrorHandle } from "../components/Error";

const { width, height } = Dimensions.get("window");

const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

export default function MoviesPage({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { loading, data, error } = useQuery(GET_MOVIES);
  const title = "Something went wrong";

  const movies = [
    { key: "empty-left" },
    ...(data?.movies || []),
    { key: "empty-right" },
  ];

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

  return (
    <View style={styles.container}>
      <Backdrop
        data={movies}
        scrollX={scrollX}
        BACKDROP_HEIGHT={BACKDROP_HEIGHT}
        width={width}
        ITEM_SIZE={ITEM_SIZE}
        height={height}
      />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        decelerationRate={0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item?.images) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [120, 70, 120],
            extrapolate: "clamp",
          });
          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: "center",
                  transform: [{ translateY }],
                  backgroundColor: "white",
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{ uri: item?.images[0].url }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Rating rating={item.rating} />
                <Genres genre={item?.genre.name} />
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.sinopsis}
                </Text>
              </Animated.View>
              <View
                style={{ marginTop: 50, padding: 0, backgroundColor: "white" }}
              >
                <Button
                  title="Detail"
                  type="clear"
                  onPress={() => {
                    navigation.push("Details", {
                      movieId: item.id,
                    });
                  }}
                >
                  Detail
                </Button>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerText: {
    color: "#ffffff",
    fontSize: 20,
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
