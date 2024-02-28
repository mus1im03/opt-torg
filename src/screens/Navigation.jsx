import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FullPostScreen from "./FullPost";
import CategoriesScreen from "./Categories";
import CartItems from "./Cart/CartItems";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: "Категории" }}
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
    </NavigationContainer>
  );
};
