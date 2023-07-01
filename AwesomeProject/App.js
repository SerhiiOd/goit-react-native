import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import React from "react";

// You can import from local files

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

// or any pure javascript modules available in npm

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto: require("./assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{ title: "Registration screen", headerTitleAlign: "center" }}
        />
        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login screen", headerTitleAlign: "center" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
