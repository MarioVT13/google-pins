import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-gesture-handler", () => {
  const {
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
  } = require("react-native");

  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView,
    TextInput,
    TouchableOpacity,
    // and any other mocks you need
  };
});
