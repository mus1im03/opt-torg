import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import CartHistory from "../screens/Cart/CartHistory";

const MenuBar = styled.View`
  flex: 8;
  width: 100%;
  height: 100%;
`;

const LogoutButton = styled.TouchableOpacity`
  margin: 20px 0;
  padding: 15px;
  align-items: center;
  width: 200px;
  border-radius: 4px;
  background-color: #ff6347;
  position: absolute;
  bottom: 3%;
  left: 23%;
`;

const LogoutText = styled.Text`
  color: white;
  font-size: 16px;
`;

const BarContainer = styled.View``;

const SideBar = ({ onSignOut }) => {
  return (
    <MenuBar>
      <BarContainer>
        <CartHistory />
      </BarContainer>
      <LogoutButton onPress={onSignOut}>
        <LogoutText>Выйти из аккаунта</LogoutText>
      </LogoutButton>
    </MenuBar>
  );
};

export default SideBar;