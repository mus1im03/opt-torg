import React, { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

const ItemsText = styled.Text`
  color: white;
  margin: 5px;
`;

const ItemsView = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: black;
  border-bottom-style: solid;
`;

const OrderView = styled.View`
  align-items: center;
  margin: 0 auto;
  padding: 10px;
  background-color: #20c1b6;
  border-radius: 5px;
  width: 180px;
  margin-bottom: 30px;
`;

const calculateTotalCash = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity * parseFloat(item.price);
  }, 0);
};

const CartItems = ({ route }) => {
  const [cartItems, setCartItems] = useState(route.params.cartItems.map((item) => ({ ...item, quantity: item.quantity })));
  const fromCategories = route.params.fromCategories || false;

  const handleIncrement = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };

  const sendCartToDatabase = async () => {
    try {
      if (cartItems.length === 0) {
        Alert.alert("Error", "Cart is empty");
        return;
      }

      const formattedCartItems = cartItems.map(({ name, quantity, price }) => ({
        productName: name,
        amount: (quantity || 1).toString(),
      }));

      const totalCash = calculateTotalCash(cartItems);

      const response = await fetch(`http://192.168.0.101:4040/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalCash, products: formattedCartItems }),
      });

      if (response.ok) {
        setCartItems([]);  // Reset cart after successful submission
        Alert.alert("Успешно", "Заявка отправлена");
      } else {
        Alert.alert("Error", "Failed to send cart items to the database");
      }
    } catch (error) {
      console.error("Error sending cart items:", error);
      Alert.alert("Error", "Failed to send cart items to the database");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#2ca1e0",
          alignItems: "center",
        }}
      >
        <View
          style={{ width: 30, borderRightColor: "black", borderRightWidth: 1 }}
        >
          <ItemsText>№</ItemsText>
        </View>
        <View
          style={{
            width: 150,
            borderRightColor: "black",
            borderRightWidth: 1,
            marginLeft: 10,
          }}
        >
          <ItemsText>Товар</ItemsText>
        </View>
        <View
          style={{
            width: 100,
            borderRightColor: "black",
            borderRightWidth: 1,
            marginLeft: 10,
          }}
        >
          <ItemsText>Кол-во</ItemsText>
        </View>
        <View style={{ width: 50, marginLeft: 10 }}>
          <ItemsText>Цена</ItemsText>
        </View>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemsView key={index} style={{ flexDirection: "row" }}>
            <View
              style={{
                width: 30,
                borderRightColor: "black",
                borderRightWidth: 1,
              }}
            >
              <Text>{index + 1}</Text>
            </View>
            <View
              style={{
                width: 150,
                borderRightColor: "black",
                borderRightWidth: 1,
                marginLeft: 10,
                fontSize: 12,
              }}
            >
              <Text>{item.name}</Text>
            </View>
            <View
              style={{
                width: 100,
                borderRightColor: "black",
                borderRightWidth: 1,
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => handleDecrement(index)}>
                <Text style={{ color: "red" }}>-</Text>
              </TouchableOpacity>
              <Text>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrement(index)}>
                <Text style={{ color: "green" }}>+</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
              }}
            >
              <Text>{item.price}</Text>
            </View>
          </ItemsView>
        )}
      />
      {fromCategories && (
        <OrderView>
          <TouchableOpacity onPress={sendCartToDatabase}>
            <Text style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
              Отправить заявку
            </Text>
          </TouchableOpacity>
        </OrderView>
      )}
    </View>
  );
};

export default CartItems;
