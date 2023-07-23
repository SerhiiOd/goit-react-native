import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PostsScreen({ route }) {
  const { posts } = route.params || [];

  const renderPost = ({ item }) => (
    <View style={styles.container}>
      {item.photoUri && (
        <View style={styles.blockImg}>
          <Image source={{ uri: item.photoUri }} style={styles.images} />
        </View>
      )}
      {item.text && (
        <View style={styles.blockText}>
          <Text style={styles.textName}>{item.text}</Text>
        </View>
      )}
      <View style={styles.smsLoc}>
        <View style={styles.blockSms}>
          <TouchableOpacity style={styles.btnSms}>
            <Feather name="message-circle" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.numSms}>0</Text>
        </View>
        {item.locationText && (
          <View style={styles.blockLoc}>
            <TouchableOpacity style={styles.btnLoc}>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.textLoc}>{item.locationText}</Text>
          </View>
        )}
      </View>
    </View>
  );
  // console.log(posts);

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 34,
    paddingRight: 16,
    paddingLeft: 16,
  },
  images: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  blockText: {
    marginBottom: 8,
  },
  textName: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    color: "#212121",
  },
  smsLoc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  blockSms: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnSms: {
    marginRight: 6,
  },
  numSms: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  blockLoc: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnLoc: {
    marginRight: 6,
  },
  textLoc: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
