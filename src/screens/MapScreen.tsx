import BottomSheet from "@gorhom/bottom-sheet";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import CustomBottomSheet from "../components/BottomSheet";
import { RootState, setPins } from "../store";
import { Pin } from "../types/DataTypes";

export default function MapScreen() {
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pins.pins);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const initialRegion = {
    latitude: -1.67174,
    longitude: 60.798798,
    latitudeDelta: 100,
    longitudeDelta: 100,
  };

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await axios.get(
          "https://8c2b-2a01-5a8-307-cd47-3d89-d387-fad8-a4f9.ngrok-free.app/pins"
          // "http://localhost:3000/pins"
        );
        console.log("response: ", response);
        dispatch(setPins(response.data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error: ", error.message);
        } else {
          console.error("Unexpected error: ", error);
        }
      }
    };
    fetchPins();
  }, [dispatch]);

  const handleMarkerPress = (pin: Pin) => {
    setSelectedPin(pin);
    bottomSheetRef.current?.expand();
  };

  const markers = useMemo(() => {
    return pins?.map((pin) => (
      <Marker
        key={pin.id}
        pinColor="purple"
        coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
        title={pin.title}
        onPress={() => handleMarkerPress(pin)}
      />
    ));
  }, [pins]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {markers}
      </MapView>
      <CustomBottomSheet ref={bottomSheetRef} selectedPin={selectedPin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
