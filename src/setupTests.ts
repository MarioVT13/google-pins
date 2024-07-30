import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";
import * as redux from "react-redux";

let useDispatchSpy: jest.SpyInstance;
let useSelectorSpy: jest.SpyInstance;
let mockDispatch: jest.Mock;

beforeAll(() => {
  mockDispatch = jest.fn();
  if (!useDispatchSpy) {
    useDispatchSpy = jest
      .spyOn(redux, "useDispatch")
      .mockReturnValue(mockDispatch);
  }
  if (!useSelectorSpy) {
    useSelectorSpy = jest
      .spyOn(redux, "useSelector")
      .mockImplementation((selectorFn) =>
        selectorFn({
          pins: {
            pins: [],
          },
        })
      );
  }
});

afterEach(() => {
  useDispatchSpy.mockClear();
  useSelectorSpy.mockClear();
  mockDispatch.mockClear();
});

afterAll(() => {
  useDispatchSpy.mockRestore();
  useSelectorSpy.mockRestore();
});
