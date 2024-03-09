import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FullPostScreen from "./FullPost";
import CategoriesScreen from "./Categories";
import CartItems from "./Cart/CartItems";
import SignUp from "../auth/SignUp";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

const LogoutButton = styled.TouchableOpacity`
  margin: 20px 0;
  padding: 10px;
  align-items: center;
  width: 150px;
  border-radius: 4px;
  background-color: #ff6347;
`;

const LogoutText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const Navigation = () => {
  // const handleSignOut = async () => {
  //   // Удаление токена из AsyncStorage при выходе пользователя
  //   await AsyncStorage.removeItem("token");
  //   // Вызываем функцию родителя для обновления статуса входа
  //   onSignOut();
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            title: "Категории",
            // headerRight: () => (
            //   <LogoutButton onPress={handleSignOut}>
            //     <LogoutText>Выйти</LogoutText>
            //   </LogoutButton>
            // ),
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
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Авторизация" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
