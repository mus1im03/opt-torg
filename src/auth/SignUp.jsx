import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";

const AuthView = styled.View`
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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://192.168.0.101:4040/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, title, phone }),
      });

      if (response.ok) {
        const token = await response.json();

        // Сохраняем токен в AsyncStorage
        await AsyncStorage.setItem("token", token);

        // Обработайте токен по вашему усмотрению, например, переход на другой экран
        console.log("Успешная регистрация:", token);
      } else {
        console.error("Ошибка при регистрации:", response.status);
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };

  return (
    <AuthView>
      <ContainerView>
        <Text style={{ color: "black", fontSize: 32, marginBottom: 50 }}>Авторизация</Text>
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
        <InputInfo
          placeholder="Name"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <InputInfo
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <CustomButton onPress={handleSignUp}>
          <ButtonText>Зарегистрироваться</ButtonText>
        </CustomButton>
        <Text>Уже есть аккаунт? Войдите</Text>
      </ContainerView>
    </AuthView>
  );
};

export default SignUp;
