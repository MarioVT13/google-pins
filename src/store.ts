import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pin } from "./types/DataTypes";

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
