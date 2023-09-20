import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import { Home } from "./Home";

const Stack = createNativeStackNavigator();
function App() {
  const ui = (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
}

const styles = StyleSheet.create(
  {
   
  }
);

export default App;