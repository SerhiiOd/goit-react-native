import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const imageBg = require("../assets/images/photo-bg.png");

export default function LoginScreen() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    const re =
      /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;

    if (mail.trim() === "") {
      newErrors.mail = "Введите адрес электронной почты";
      isValid = false;
    } else if (!re.test(String(mail).toLowerCase())) {
      newErrors.mail = "Неверный формат почты";
      isValid = false;
    }

    if (password.trim() === "") {
      newErrors.password = "Введите пароль";
      isValid = false;
    } else if (password.trim().length < 7) {
      newErrors.password = "Минимум 7 символов";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = () => {
    if (validateForm()) {
      const registrationData = {
        mail,
        password,
      };

      console.log(registrationData);

      navigation.navigate("Home");
    } else {
      console.log("Форма не прошла валидацию. Пожалуйста, исправьте ошибки.");

      setPassword("");
    }
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
            <Text style={styles.textAuth}>Увійти</Text>
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
              {errors.mail && (
                <Text style={styles.errorMail}>{errors.mail}</Text>
              )}

              <TextInput
                style={styles.authInput}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              {errors.password && (
                <Text style={styles.errorPass}>{errors.password}</Text>
              )}
            </KeyboardAvoidingView>

            <TouchableOpacity
              style={styles.btnShow}
              onPress={toggleShowPassword}
            >
              <Text style={styles.textShow}>Показати</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.btnAuth}
              title="Login"
              onPress={onLogin}
            >
              <Text style={styles.txtBtnAuth}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.reBtnReg}
              onPress={() => navigation.navigate("RegistrationScreen")}
            >
              <Text style={styles.txtBtnAuth1}>Немає акаунту?</Text>
              <Text style={styles.txtBtnAuth2}>Зареєструватися</Text>
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
    fontFamily: "Roboto_500Medium",
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
    bottom: 50,
    left: 255,
    width: 72,
    height: 19,
  },
  textShow: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
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
    fontFamily: "Roboto_400Regular",
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
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
    marginRight: 5,
  },
  txtBtnAuth2: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
    textDecorationLine: "underline",
  },
  errorMail: {
    position: "absolute",
    top: 49,
    left: 16,
    color: "red",
  },
  errorPass: {
    position: "absolute",
    top: 115,
    left: 16,
    color: "red",
  },
});
