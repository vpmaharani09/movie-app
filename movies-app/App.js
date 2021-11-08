import React from "react";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import MoviesPage from "./screens/MoviesPage";
import client from "./config/apollo";
import SeriesPage from "./screens/SeriesPage";
import { StatusBar } from "expo-status-bar";

import "./polyfills";
import DetailPage from "./screens/DetailPage";
const Stack = createNativeStackNavigator();

const THEME_COLOR = "#191932";
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#c6cbef",
          width: 280,
        },
        drawerHideStatusBarOnOpen: false,
        drawerStatusBarAnimation: "fade",
        headerStyle: {
          backgroundColor: "#191932",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
        headerTransparent: true,
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen
        name="Home"
        colorTheme={THEME_COLOR}
        component={Home}
        options={{
          title: "Hackflix",
        }}
      />
      <Drawer.Screen name="Movies" component={MoviesPage} />
      <Drawer.Screen name="Series" component={SeriesPage} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={THEME_COLOR} />
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailPage}
            options={{
              headerShown: false,
              headerTransparent: true,
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
