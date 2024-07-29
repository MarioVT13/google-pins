import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Connector {
  type: "J1772" | "Type2" | "CCS 2" | "Type 3";
  status: "available" | "unavailable";
}

interface Pin {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  connectors: Connector[];
}

interface PinsState {
  pins: Pin[];
}

const initialState: PinsState = {
  pins: [],
};

const pinsSlice = createSlice({
  name: "pins",
  initialState,
  reducers: {
    setPins: (state, action: PayloadAction<Pin[]>) => {
      state.pins = action.payload;
    },
  },
});

export const { setPins } = pinsSlice.actions;

const store = configureStore({
  reducer: {
    pins: pinsSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
