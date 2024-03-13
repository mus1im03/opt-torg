import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import CartHistory from "../screens/Cart/CartHistory";

const MenuBar = styled.View`
  flex: 8;
  width: 100%;
  height: 100%;
  background-color: #cecece;
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

const CartHistoryText = styled.Text`
  margin: 30px 20px;
  font-size: 16px;
  font-weight: 600;
`;

const BarContainer = styled.View``;

const SideBar = ({ onSignOut }) => {
  const [showCartHistory, setShowCartHistory] = useState(false);

  const handleCartHistoryPress = () => {
    setShowCartHistory(!showCartHistory);
  };

  return (
    <MenuBar>
      <BarContainer>
        <TouchableOpacity onPress={handleCartHistoryPress}>
          <CartHistoryText>История заказов</CartHistoryText>
        </TouchableOpacity>
        {showCartHistory && <CartHistory />}
      </BarContainer>
      <LogoutButton onPress={onSignOut}>
        <LogoutText>Выйти из аккаунта</LogoutText>
      </LogoutButton>
    </MenuBar>
  );
};

export default SideBar;