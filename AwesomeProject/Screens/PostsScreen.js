import React from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";

export default function PostsScreen({ route }) {
  const { posts } = route.params || [];

  const renderPost = ({ item }) => (
    <View>
      {item.photoUri && (
        <View>
          <Text>Фотография:</Text>
          <Image
            source={{ uri: item.photoUri }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}
      {item.text && (
        <View>
          <Text>Текст:</Text>
          <Text>{item.text}</Text>
        </View>
      )}
      {item.locationText && (
        <View>
          <Text>Локация:</Text>
          <Text>{item.locationText}</Text>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
