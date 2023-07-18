import React from "react";
import { View, Text, Image } from "react-native";

export default function PostsScreen({ route }) {
  const { photoUri, text, locationText } = route.params || {};

  return (
    <View>
      {photoUri && (
        <View>
          <Text>Фотография:</Text>
          <Image
            source={{ uri: photoUri }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}
      {text && (
        <View>
          <Text>Текст:</Text>
          <Text>{text}</Text>
        </View>
      )}
      {locationText && (
        <View>
          <Text>Локация:</Text>
          <Text>{locationText}</Text>
        </View>
      )}
    </View>
  );
}
