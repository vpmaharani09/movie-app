import React from "react";
import { View } from "react-native";

const ItemSeparator = ({ height, width }) => {
  return <View style={{ width, height }} />;
};

ItemSeparator.defaultProps = {
  width: 50,
  height: 50,
};

export default ItemSeparator;
