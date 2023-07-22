import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  Dimensions,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");
const CAMERA_SIZE = 240;

export default function CreatePostsScreen() {
  const [text, setText] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [locationText, setLocationText] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);
  const [posts, setPosts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [textError, setTextError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const navigation = useNavigation();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Извлечение города и области (если доступно) из ответа геокодирования
      let city = geocode[0].city;
      let region = geocode[0].region;

      // Объединение города и области в текст локации
      let address = city;
      if (region) {
        address += `, ${region}`;
      }

      setLocationText(address);
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);
      setPhotoUri(photo.uri);
      setIsTakingPhoto(false);
      setIsPhotoSelected(true);
    }
  };

  const uploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
      setIsTakingPhoto(false);
      setIsPhotoSelected(true);
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null);
    setIsTakingPhoto(true);
    setIsPhotoSelected(false);
  };

  const handleCameraButtonPress = async () => {
    if (isPhotoSelected) {
      setIsPhotoSelected(false);
      setIsTakingPhoto(true);
    } else {
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePictureAsync();
          await MediaLibrary.createAssetAsync(photo.uri);
          setPhotoUri(photo.uri);
          setIsTakingPhoto(false);
          setIsPhotoSelected(true);
        } catch (error) {
          console.error("Ошибка при съемке фотографии:", error);
        }
      }
    }
  };

  const handleDeleteAllFields = () => {
    setText("");
    setPhotoUri(null);
    setLocationText("");
    setIsPhotoSelected(false);
    setIsTakingPhoto(false);
  };

  const handleLocationIconPress = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Извлечение города и области (если доступно) из ответа геокодирования
      let city = geocode[0].city;
      let region = geocode[0].region;

      // Объединение города и области в текст локации
      let address = city;
      if (region) {
        address += `, ${region}`;
      }

      setLocationText(address);
    } catch (error) {
      console.error("Ошибка при получении локации:", error);
    }
  };

  const handlePublishButtonPress = () => {
    if (!text) {
      setTextError(true);
    } else {
      setTextError(false);
    }

    if (!locationText) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }

    if (photoUri && text && locationText) {
      const newPost = {
        photoUri,
        text,
        locationText,
      };

      setPosts([...posts, newPost]);

      setText("");
      setPhotoUri(null);
      setLocationText("");
      setIsPhotoSelected(false);
      setIsTakingPhoto(false);

      navigation.navigate("PostsScreen", { posts: [...posts, newPost] });
    } else {
      setNotification("Пожалуйста, заполните все поля перед публикацией.");
    }
  };

  const handleBackButtonPress = () => {
    // Сбрасываем состояние формы и фото
    setText("");
    setPhotoUri(null);
    setLocationText("");
    setIsPhotoSelected(false);
    setIsTakingPhoto(false);

    // Выполняем переход на нужный экран
    navigation.dispatch(
      CommonActions.navigate("PostsScreen", { posts: [...posts] })
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerBlock}>
          <TouchableOpacity
            style={styles.backBlock}
            onPress={handleBackButtonPress}
          >
            <AntDesign name="arrowleft" size={24} color="#212121" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Створити публікацію</Text>
        </View>
        <View style={styles.photoBlock}>
          {!isPhotoSelected ? (
            <View style={styles.cameraBlock}>
              <Camera
                style={styles.camera}
                type={cameraType}
                ref={cameraRef}
              ></Camera>
              <View style={styles.photoView}>
                <TouchableOpacity
                  style={styles.buttonCam}
                  onPress={handleCameraButtonPress}
                >
                  <FontAwesome name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photoUri }} style={styles.photo} />
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={retakePhoto}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          )}
          {isPhotoSelected ? (
            <TouchableOpacity style={styles.btnLoad} onPress={uploadPhoto}>
              <Text style={styles.textLoad}>Редагувати фото</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btnLoad} onPress={uploadPhoto}>
              <Text style={styles.textLoad}>Завантажте фото</Text>
            </TouchableOpacity>
          )}
          <View style={styles.namePhotoBlock}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={styles.keyboardInp}
            >
              <TextInput
                style={styles.namePhoto}
                value={text}
                placeholder="Назва..."
                onChangeText={setText}
              />
              {textError && (
                <Text style={styles.errorText}>Поле должно быть заполнено</Text>
              )}
            </KeyboardAvoidingView>
          </View>
          <View style={styles.nameLocBlock}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={styles.keyboardInp}
            >
              <TextInput
                style={styles.nameLoc}
                value={locationText}
                placeholder="Локація..."
                onChangeText={setLocationText}
              />
              {locationError && (
                <Text style={styles.errorText}>Поле должно быть заполнено</Text>
              )}
              <TouchableOpacity
                style={styles.iconLocBtn}
                onPress={handleLocationIconPress}
              >
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={styles.iconLoc}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
          <TouchableOpacity
            style={styles.loadBtn}
            onPress={handlePublishButtonPress}
          >
            <Text style={styles.loadText}>Опубліковати</Text>
          </TouchableOpacity>
          <View style={styles.delBlock}>
            <TouchableOpacity
              style={styles.delBtn}
              onPress={handleDeleteAllFields}
            >
              <Feather
                name="trash-2"
                size={24}
                color="#BDBDBD"
                style={styles.delIcon}
              />
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
  photoBlock: {
    flex: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
  },
  cameraBlock: {
    height: CAMERA_SIZE,
    marginBottom: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  photoContainer: {
    height: CAMERA_SIZE,
    marginBottom: 8,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  photoView: {
    position: "absolute",
    top: 95,
    left: 170,
    borderRadius: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
  },
  buttonCam: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#BDBDBD",
  },
  btnLoad: {
    width: 121,
    marginBottom: 32,
    alignItems: "center",
  },
  textLoad: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  namePhotoBlock: {
    marginBottom: 16,
  },
  namePhoto: {
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: "#E8E8E8",
  },
  nameLocBlock: {
    marginBottom: 32,
  },
  nameLoc: {
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 28,
    borderBottomWidth: 0.5,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
  iconLocBtn: {
    position: "absolute",
    top: 18,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "red",
  },
  loadBtn: {
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
    marginBottom: 120,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
  loadText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  delBlock: {
    alignItems: "center",
    justifyContent: "center",
  },
  delBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  retakeButton: {
    position: "absolute",
    top: 95,
    left: 170,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    borderRadius: 9999,
  },
});
