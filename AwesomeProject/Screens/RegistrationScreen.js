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
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const imageBg = require("../assets/images/photo-bg.png");

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
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

    if (login.trim() === "") {
      newErrors.login = "Введите логин";
      isValid = false;
    }

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

  const onRegistration = () => {
    if (validateForm()) {
      const registrationData = {
        login,
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
        <View style={styles.blockReg}>
          <View style={styles.avatar}>
            <TouchableOpacity style={styles.avaBtn}>
              <AntDesign
                style={styles.avaBtnSvg}
                name="pluscircleo"
                size={24}
                color="#FF6C00"
              />
            </TouchableOpacity>
          </View>

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
              {errors.login && (
                <Text style={styles.errorLogin}>{errors.login}</Text>
              )}

              <TextInput
                style={styles.regInput}
                placeholder="Адреса електронної пошти"
                value={mail}
                onChangeText={setMail}
              />
              {errors.mail && (
                <Text style={styles.errorMail}>{errors.mail}</Text>
              )}

              <TextInput
                style={styles.regInput}
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
  avaBtn: {
    position: "absolute",
    top: 70,
    left: 105,
    width: 30,
    height: 30,
    justifyContent: "center",
  },
  avaBtnSvg: {
    textAlign: "center",
  },
  divTextReg: {
    top: -33,
  },
  textReg: {
    fontFamily: "Roboto_500Medium",
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
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  txtBtnAuth: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
  errorLogin: {
    position: "absolute",
    top: 49,
    left: 16,
    color: "red",
  },
  errorMail: {
    position: "absolute",
    top: 115,
    left: 16,
    color: "red",
  },
  errorPass: {
    position: "absolute",
    top: 180,
    left: 16,
    color: "red",
  },
});
