import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const imageBg = require("../assets/images/photo-bg.png");

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
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

  const onRegistration = () => {
    console.log("Login:", `${login}`);
    console.log("E-mail:", `${mail}`);
    console.log("Password:", `${password}`);
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
        <View style={styles.blockReg}>
          <View style={styles.avatar}></View>

          <View style={styles.divTextReg}>
            <Text style={styles.textReg}>Реєстрація</Text>
          </View>
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={styles.keyboardInp}
            >
              <TextInput
                style={styles.regInput}
                placeholder="Логін"
                value={login}
                onChangeText={setLogin}
              />

              <TextInput
                style={styles.regInput}
                placeholder="Адреса електронної пошти"
                value={mail}
                onChangeText={setMail}
              />

              <TextInput
                style={styles.regInput}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </KeyboardAvoidingView>

            <TouchableOpacity style={styles.btnShow}>
              <Text style={styles.textShow}>Показати</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.btnReg}
              title="Registration"
              onPress={onRegistration}
            >
              <Text style={styles.txtBtnReg}>Зареєстуватися</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.txtBtnAuth}>Вже є акаунт? Увійти</Text>
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
    justifyContent: "center",
  },
  blockReg: {
    position: "relative",
    top: 200,
    height: 549,
    width: "auto",
    // paddingTop: 92,
    paddingRight: 16,
    paddingBottom: 45,
    paddingLeft: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatar: {
    top: -55,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  divTextReg: {
    top: -33,
  },
  textReg: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
    letterSpacing: 0.3,
  },
  regInput: {
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
  btnReg: {
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
  txtBtnReg: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  txtBtnAuth: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
