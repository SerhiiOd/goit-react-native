import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

// You can import from local files

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";

// or any pure javascript modules available in npm

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto_400Regular: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto_700Bold: require("./assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  // const headerLogout = () => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.logoutBtn}
  //       onPress={() => console.log("Button pressed")}
  //     >
  //       <MaterialIcons name="logout" size={24} color="#BDBDBD" />
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          // options={{
          //   title: "Публікації",
          //   headerTitleAlign: "center",
          //   headerRight: headerLogout,
          // }}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   logoutBtn: {
//     right: 16,
//   },
// });
