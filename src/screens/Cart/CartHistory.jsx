import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from "react-native";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../../components/Loading";

const HistoryBlock = styled.View``;

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

const Separator = styled.View`
  height: 10px;
  background-color: #f0f0f0;
`;

const CartHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

  const getUserInfo = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      console.log("User data from AsyncStorage:", user);

      if (user) {
        const userData = JSON.parse(user);
        console.log("Parsed user data:", userData);
        setUserName(userData.title);
      }
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
    }
  };

  const fetchCarts = async () => {
    try {
      await getUserInfo();
      const res = await fetch(`http://192.168.0.101:4040/cart`);
      const data = await res.json();
      console.log(data);
      const filteredOrders = data.filter((item) => item.user === userName);
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Ошибка", "Не удалось получить статьи");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [userName]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <HistoryBlock>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 50 }}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#2ca1e0",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 30,
                  borderRightColor: "black",
                  borderRightWidth: 1,
                }}
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
            {item.products.map((product, index) => (
              <View key={`${item.id}-${index}`}>
                {index > 0 && product.id !== item.products[index - 1].id && (
                  <Separator key={`separator-${item.id}-${index}`} />
                )}
                <ItemsView key={index}>
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
                    <Text>{product.productName}</Text>
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
                    <Text style={{ fontSize: 18 }}>{product.amount}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: 100,
                    }}
                  >
                    <Text style={{ marginLeft: 20 }}>{product.price}</Text>
                  </View>
                </ItemsView>
              </View>
            ))}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                borderBottomWidth: 1,
                borderBottomColor: "black",
              }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  borderColor: "black",
                  width: 231,
                }}
              >
                <Text>Общая сумма: {item.totalCash}</Text>
                <Text>Дата Заявки: {item.date}</Text>
              </View>
              <Text
                style={{
                  // marginLeft: 30,
                  marginTop: 10,
                  color: item.paid ? "green" : "red",
                }}
              >
                {item.paid ? "Оплачено" : "Не оплачено"}
              </Text>
            </View>
          </View>
        )}
      />
    </HistoryBlock>
  );
};

export default CartHistory;
