import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";

export default function MapScreen({ route }) {
  const { locationText, locationCoords } = route.params || {};
  const [location, setLocation] = useState(locationCoords || null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (locationCoords) {
        // Если переданы координаты, используйте их для установки начального местоположения карты
        setLocation(locationCoords);
      } else if (locationText) {
        // Если передан текстовый адрес, выполните обратное геокодирование для получения координат
        try {
          const geocode = await Location.geocodeAsync(locationText);
          if (geocode && geocode.length > 0) {
            const coords = {
              latitude: geocode[0].latitude,
              longitude: geocode[0].longitude,
            };
            setLocation(coords);
          }
        } catch (error) {
          console.error("Ошибка при обратном геокодировании:", error);
        }
      } else {
        // Если координаты и текстовый адрес не переданы, запросите разрешение на доступ к местоположению
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Отказано в доступе к местоположению");
        }

        // Затем получите текущее местоположение и используйте его для установки начального местоположения карты
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      }
    })();
  }, []);

  const btnPressBack = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <TouchableOpacity style={styles.backBlock} onPress={btnPressBack}>
          <AntDesign name="arrowleft" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Карта</Text>
      </View>
      <View style={styles.mapBlock}>
        <MapView
          style={styles.mapStyle}
          region={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {location && (
            <Marker
              title={locationText || "Место из поста"}
              coordinate={location}
              description="Привет"
            />
          )}
        </MapView>
      </View>
    </View>
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
  mapBlock: {
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16,
  },
  mapStyle: {
    width: "auto",
    height: 750,
  },
});
