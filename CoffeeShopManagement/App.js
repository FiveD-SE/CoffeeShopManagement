import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
