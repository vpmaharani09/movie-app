import React from "react";
import { Spinner, HStack, Heading } from "native-base";
export const LoadingHandle = () => {
  return (
    <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack>
  );
};
