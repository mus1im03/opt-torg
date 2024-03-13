// Ваш компонент SignIn
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
  padding: 15px;
  align-items: center;
  width: 150px;
  border-radius: 15px;
  background-color: #4b6cb7;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const SignIn = ({ onSignIn, onSignUpClick }) => {
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
        const { token, userData } = await response.json();

        if (token !== undefined && token !== null) {
          await AsyncStorage.setItem("token", token);
        } else {
          console.error("Error logging in: Token is undefined or null");
          return;
        }

        if (userData) {
          await AsyncStorage.setItem("user", JSON.stringify(userData));
        }

        if (onSignIn) {
          onSignIn();
        }
      } else {
        console.error("Error logging in:", response.status);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <LoginView>
      <ContainerView>
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
        <TouchableOpacity onPress={onSignUpClick}>
          <Text>Зарегистрироваться</Text>
        </TouchableOpacity>
      </ContainerView>
    </LoginView>
  );
};

export default SignIn;
