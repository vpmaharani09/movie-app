import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function CastCard({ name, image }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: 80,
    borderRadius: 10,
  },
  name: {
    width: 80,
    color: "#333",
    fontWeight: "bold",
    fontSize: 10,
  },
});
