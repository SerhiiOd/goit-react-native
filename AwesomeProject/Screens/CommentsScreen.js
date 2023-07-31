import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen({ route }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const { photoUri } = route.params || {};

  const navigation = useNavigation();

  const addComment = () => {
    if (text.trim() !== "") {
      const newComment = {
        id: Date.now().toString(),
        text: text.trim(),
        timestamp: new Date().toISOString(),
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setText("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const months = [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day} ${month}, ${year} | ${time}`;
  };

  const btnPressBack = () => {
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerBlock}>
          <TouchableOpacity style={styles.backBlock} onPress={btnPressBack}>
            <AntDesign name="arrowleft" size={24} color="#212121" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Коментарі</Text>
        </View>
        <View style={styles.contentBlock}>
          <View style={styles.blockImages}>
            {photoUri && (
              <Image source={{ uri: photoUri }} style={styles.images} />
            )}
          </View>
          <ScrollView>
            <View style={styles.postComment}>
              {comments.map((comment) => (
                <View key={comment.id} style={styles.comment}>
                  <View style={styles.userAva}>
                    {/* 
                      Убран код, связанный с avatar
                    */}
                  </View>

                  <View style={styles.textTime}>
                    <View style={styles.commContent}>
                      <Text style={styles.commText}>{comment.text}</Text>
                    </View>
                    <View style={styles.timeContent}>
                      <Text style={styles.timestampText}>
                        {formatTimestamp(comment.timestamp)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.commentBlock}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={styles.commentText}
                value={text}
                placeholder="Коментувати..."
                onChangeText={setText}
              />
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.messageBtn} onPress={addComment}>
              <AntDesign name="arrowup" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerBlock: {
    paddingTop: 55,
    paddingBottom: 11,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#b3b3b3",
  },
  backBlock: {
    position: "absolute",
    top: 54,
    left: 16,
  },
  headerText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  contentBlock: {
    flex: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16,
  },
  blockImages: {
    marginBottom: 32,
  },
  images: {
    height: 240,
    borderRadius: 8,
  },

  postComment: {
    flex: 1,
  },
  comment: {
    flexDirection: "row",
    marginBottom: 16,
  },
  userAva: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 9999,
    // backgroundColor: "green",
    marginRight: 16,
  },
  avatarImage: {
    width: 50,
    height: 50,
  },

  textTime: {
    width: 325,
    padding: 16,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  commContent: {
    marginBottom: 8,
  },
  commText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 13,
    color: "#212121",
  },
  timeContent: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  timestampText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },

  commentBlock: {},
  commentText: {
    height: 50,
    paddingTop: 16,
    paddingRight: 45,
    paddingBottom: 16,
    paddingLeft: 16,
    borderWidth: 0.5,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  messageBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderWidth: 0.5,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ffffff",
    backgroundColor: "#FF6C00",
  },
});
