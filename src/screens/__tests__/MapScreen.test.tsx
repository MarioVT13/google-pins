import React from "react";
import {
  render,
  waitFor,
  screen,
  fireEvent,
} from "@testing-library/react-native";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import MapScreen from "../MapScreen";
import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { RootState } from "../../store";
import { ConnectorStatus, ConnectorType, Pin } from "../../types/DataTypes";

const initialState: RootState = {
  pins: {
    pins: [],
  },
};

const middlewares: ThunkMiddleware<RootState, any>[] = [thunk as any];
const mockStore = configureMockStore<
  RootState,
  ThunkMiddleware<RootState, any>
>(middlewares as any);

const mockPins: Pin[] = [
  {
    _id: "1",
    title: "Pin 1",
    latitude: 37.78825,
    longitude: -122.4324,
    connectors: [
      { type: ConnectorType.J1772, status: ConnectorStatus.available },
    ],
  },
  {
    _id: "2",
    title: "Pin 2",
    latitude: 37.75825,
    longitude: -122.4624,
    connectors: [
      { type: ConnectorType.Type2, status: ConnectorStatus.unavailable },
    ],
  },
];

describe("MapScreen", () => {
  let mockAxios: MockAdapter;
  let store: MockStoreEnhanced<RootState>;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  beforeEach(() => {
    store = mockStore(initialState);
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it("renders markers correctly when pins are fetched", async () => {
    mockAxios.onGet(/\/pins\?/).reply(200, mockPins);

    render(
      <Provider store={store}>
        <MapScreen />
      </Provider>
    );

    await waitFor(() => {
      const markers = screen.getAllByTestId("marker");
      expect(markers).toHaveLength(mockPins.length);
    });
  });

  it("expands bottom sheet when a marker is pressed", async () => {
    mockAxios.onGet(/\/pins\?/).reply(200, mockPins);

    render(
      <Provider store={store}>
        <MapScreen />
      </Provider>
    );

    await waitFor(() => {
      const marker = screen.getByTestId("marker-1");
      fireEvent.press(marker);
      const bottomSheet = screen.getByTestId("bottom-sheet");
      expect(bottomSheet).toBeTruthy();
    });
  });
});
