import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const imageBg = require("../assets/images/photo-bg.png");

export default function LoginScreen() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // const [isShowPassword, setIsShowPassword] = useState(true);

  const navigation = useNavigation();

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     () => {
  //       setShowKeyboard(true);
  //     }
  //   );

  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     () => {
  //       setShowKeyboard(true);
  //     }
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // });

  const onLogin = () => {
    Alert.alert("Credentials", `${mail} + ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={imageBg}
          style={{
            position: "absolute",
            resizeMode: "cover",
            width: "100%",
            height: "100%",
          }}
        />

        <View style={styles.authBlock}>
          <View style={styles.divTextAuth}>
            <Text style={styles.textAuth}>Реєстрація</Text>
          </View>

          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={styles.authInput}
                placeholder="Адреса електронної пошти"
                value={mail}
                onChangeText={setMail}
              />

              <TextInput
                style={styles.authInput}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </KeyboardAvoidingView>

            <Pressable style={styles.btnShow}>
              <Text style={styles.textShow}>Показати</Text>
            </Pressable>
          </View>

          <View>
            <Pressable style={styles.btnAuth} title="Login" onPress={onLogin}>
              <Text style={styles.txtBtnAuth}>Увійти</Text>
            </Pressable>

            <Pressable
              style={styles.reBtnReg}
              onPress={() => navigation.navigate("RegistrationScreen")}
            >
              <Text style={styles.txtBtnAuth1}>Немає акаунту?</Text>
              <Text style={styles.txtBtnAuth2}>Зареєструватися</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  authBlock: {
    position: "relative",
    top: 200,
    height: 549,
    width: "auto",
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  divTextAuth: {
    marginBottom: 33,
  },
  textAuth: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
    letterSpacing: 0.3,
  },
  authInput: {
    width: 343,
    height: 50,
    borderRadius: 8,
    borderWidth: 0.5,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  btnShow: {
    right: 16,
    bottom: 50,
  },
  textShow: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    textAlign: "right",
    color: "#1B4371",
  },
  btnAuth: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 51,
    width: 343,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  txtBtnAuth: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  reBtnReg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  txtBtnAuth1: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
    marginRight: 5,
  },
  txtBtnAuth2: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
    textDecorationLine: "underline",
  },
});
