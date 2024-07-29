import BottomSheet from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Connector, Pin } from "../types/DataTypes";

interface BottomSheetProps {
  selectedPin: Pin | null;
}

const CustomBottomSheet = forwardRef<BottomSheet, BottomSheetProps>(
  ({ selectedPin }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.expand(),
      close: () => bottomSheetRef.current?.close(),
      snapToIndex: (index: number) =>
        bottomSheetRef.current?.snapToIndex(index),
      snapToPosition: (position: number | string) =>
        bottomSheetRef.current?.snapToPosition(position),
      collapse: () => bottomSheetRef.current?.collapse(),
      forceClose: () => bottomSheetRef.current?.forceClose(),
    }));

    const snapPoints = ["25%", "50%"];

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={styles.bottomSheet}
      >
        {selectedPin && (
          <View style={styles.content}>
            <Text style={styles.title}>{selectedPin.title}</Text>
            {selectedPin.connectors.map(
              (connector: Connector, index: number) => (
                <View key={index} style={styles.connector}>
                  <Text>Type: {connector.type}</Text>
                  <Text
                    style={{
                      color: connector.status === "available" ? "green" : "red",
                    }}
                  >
                    Status: {connector.status}
                  </Text>
                  <Text>Latitude: {selectedPin.latitude}</Text>
                  <Text>Longitude: {selectedPin.longitude}</Text>
                </View>
              )
            )}
          </View>
        )}
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "white",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  connector: {
    marginTop: 10,
  },
});

export default CustomBottomSheet;
