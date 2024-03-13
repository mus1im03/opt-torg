import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import FullPostScreen from "./FullPost";
import CategoriesScreen from "./Categories";
import CartItems from "./Cart/CartItems";
import { Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sidebar from "../../assets/free-icon-menu-bar-10233705.png";
import { useState } from "react";
import SideBar from "../components/SideBar";
import CartHistory from "./Cart/CartHistory";

const Stack = createNativeStackNavigator();

const MenuIcon = () => (
  <Image source={sidebar} style={{ width: 30, height: 30 }} />
);

export const Navigation = ({ onSignOut }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSignOut = async () => {
    await AsyncStorage.removeItem("token");
    onSignOut();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            title: "Категории",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <MenuIcon />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="FullPost"
          component={FullPostScreen}
          options={{ title: "Товары" }}
        />
        <Stack.Screen
          name="CartItems"
          component={CartItems}
          options={{ title: "Корзина" }}
        />
      </Stack.Navigator>
      {isSidebarOpen && <SideBar onSignOut={handleSignOut} onClose={() => setIsSidebarOpen(false)} />}

    </NavigationContainer>
  );
};