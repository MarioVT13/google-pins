import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/store";
import MapScreen from "./src/screens/MapScreen";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <MapScreen />
      </Provider>
    </GestureHandlerRootView>
  );
}
