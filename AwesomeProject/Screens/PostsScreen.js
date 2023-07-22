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
          <Text>{item.text}</Text>
        </View>
      )}
      <View style={styles.blockSms}>
        <TouchableOpacity>
          <Feather name="message-circle" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      {item.locationText && (
        <View style={styles.blockLoc}>
          <TouchableOpacity>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text>{item.locationText}</Text>
        </View>
      )}
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
  blockImg: {
    // marginBottom: 8,
  },
  images: {
    height: 240,
    borderRadius: 8,
  },
  blockText: {
    // marginBottom: 8,
  },
  blockLoc: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "flex-end",
  },
});
