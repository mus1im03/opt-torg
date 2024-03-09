// SignIn.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";

const LoginView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const ContainerView = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 250px;
  border-radius: 10px;
`;

const InputInfo = styled.TextInput`
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const CustomButton = styled(TouchableOpacity)`
  margin: 20px 0;
  padding: 10px;
  align-items: center;
  width: 150px;
  border-radius: 4px;
  background-color: #4b6cb7;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://192.168.0.101:4040/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.json();
        // Сохраняем токен в AsyncStorage
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(userData));

        // Вызываем функцию onSignIn, переданную через пропсы
        onSignIn();
      } else {
        // Обработка ошибки входа
        console.error("Ошибка при входе:", response.status);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  return (
    <LoginView>
      <ContainerView>
        <Text style={{ color: "black", fontSize: 32, marginBottom: 50 }}>
          Вход
        </Text>
        <InputInfo
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputInfo
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <CustomButton onPress={handleSignIn}>
          <ButtonText>Войти</ButtonText>
        </CustomButton>
        <Text>
          Зарегистрируйтесь
          {/* Здесь должен быть ваш навигатор для перехода на экран регистрации */}
        </Text>
      </ContainerView>
    </LoginView>
  );
};

export default SignIn;