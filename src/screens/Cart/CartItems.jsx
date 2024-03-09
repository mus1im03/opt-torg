import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import styled from "styled-components";
import plus from "../../../assets/free-icon-add-button-5495006.png";
import minus from "../../../assets/free-icon-minus-9351477.png";
import remove from "../../../assets/free-icon-delete-3625005.png";

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

const Minus = styled.Image`
  width: 20px;
  height: 20px;
`;

const Plus = styled.Image`
  width: 20px;
  height: 20px;
`;

const Remove = styled.Image`
  width: 25px;
  height: 25px;
  margin-left: 30px;
`;

const Summa = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: 700;
`;

const SummaView = styled.View`
  align-items: center;
  margin: 20px 0;
`;

const calculateTotalCash = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity * parseFloat(item.price);
  }, 0);
};

const CartItems = ({ route }) => {
  const [cartItems, setCartItems] = useState([]);
  const fromCategories = route.params.fromCategories || false;
  const clearCartItems = route.params.clearCartItems;
  const userName = route.params.userName;

  useEffect(() => {
    setCartItems(
      route.params.cartItems.map((item) => ({
        ...item,
        quantity: item.quantity,
      }))
    );

    return () => {
      setCartItems([]);
    };
  }, [route.params.cartItems]);

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

  const handleRemoveItem = (index) => {
    const removedItem = cartItems[index];
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);

    // Передача обновленных данных в CategoriesScreen
    const updateCategories = route.params.updateCategories;
    if (updateCategories) {
      updateCategories(updatedCartItems);
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
        body: JSON.stringify({ totalCash, products: formattedCartItems, user: userName }),
      });

      if (response.ok) {
        setCartItems([]);
        clearCartItems();
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
            width: 130,
            borderRightColor: "black",
            borderRightWidth: 1,
            marginLeft: 10,
          }}
        >
          <ItemsText>Товар</ItemsText>
        </View>
        <View
          style={{
            width: 70,
            borderRightColor: "black",
            borderRightWidth: 1,
            marginLeft: 10,
          }}
        >
          <ItemsText>Кол-во</ItemsText>
        </View>
        <View style={{ width: 100, marginLeft: 10 }}>
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{index + 1}</Text>
            </View>
            <View
              style={{
                width: 130,
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
                width: 80,
                borderRightColor: "black",
                borderRightWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity onPress={() => handleDecrement(index)}>
                <Minus source={minus} />
              </TouchableOpacity>
              <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrement(index)}>
                <Plus source={plus} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: 100,
              }}
            >
              <Text style={{ marginLeft: 20 }}>{item.price}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                <Remove source={remove} />
              </TouchableOpacity>
            </View>
          </ItemsView>
        )}
      />
      <SummaView>
        <Summa>Cумма: {calculateTotalCash(cartItems)}</Summa>
      </SummaView>
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
