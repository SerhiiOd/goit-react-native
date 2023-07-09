import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./PostsScreen";
import ProfileScreen from "./PostsScreen";
import { StyleSheet, TouchableOpacity } from "react-native";

const Tabs = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();

  const headerLogout = () => {
    return (
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <MaterialIcons name="logout" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    );
  };

  return (
    <Tabs.Navigator
      screenOptions={() => ({
        tabBarLabelStyle: { display: "none" },
        tabBarStyle: {
          paddingTop: 9,
          paddingRight: 82,
          paddingBottom: 34,
          paddingLeft: 82,
          height: 83,
        },
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: headerLogout,
          tabBarIcon: () => (
            <AntDesign name="appstore-o" size={24} color={"#212121CC"} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          tabBarIcon: () => <AntDesign name="plus" size={13} color={"#fff"} />,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.createButton}>
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <AntDesign name="user" size={24} color={"#212121CC"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  createButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
  logoutBtn: {
    right: 16,
  },
});
