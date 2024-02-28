import React, { useEffect, useState } from "react";
import {
  Text,
  Alert,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Loading } from "../components/Loading";
import plus from "../../assets/add-button.png";
import minus from "../../assets/minus.png";

const ProdView = styled.View`
  flex-direction: row;
  padding: 15px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const PostText = styled.Text`
  font-size: 14px;
  width: 200px;
  margin-bottom: 5px;
  font-weight: 700;
`;

const PlusButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
`;

const MinusButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
`;

const OrderView = styled.View`
  align-items: center;
  margin: 10px auto;
  padding: 10px;
  background-color: #20c1b6;
  border-radius: 5px;
  width: 180px;
`;

const FullPostScreen = ({ route, navigation }) => {
  const { id, addToCart } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productStates, setProductStates] = useState([]);
  // const [quantity, setQuantity] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://192.168.0.101:4040/product`);
      const data = await res.json();
      const initialProductStates = data.map(() => ({ quantity: 0 }));
      setProductStates(initialProductStates);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Ошибка", "Не удалось получить статью");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const filteredProducts = products.filter(
    (product) => product.categoryId === id
  );

  const increaseQuantity = (index) => {
    setProductStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = { quantity: updatedStates[index].quantity + 1 };
      return updatedStates;
    });
  };

  const decreaseQuantity = (index) => {
    if (productStates[index].quantity > 0) {
      setProductStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[index] = { quantity: updatedStates[index].quantity - 1 };
        return updatedStates;
      });
    }
  };

  const addToCartWithFilter = () => {
    const itemsToAdd = filteredProducts
      .map((product, index) => ({
        ...product,
        quantity: productStates[index].quantity,
      }))
      .filter((product) => product.quantity > 0);
  
    // Проверка остатка товара перед добавлением в корзину
    const hasOutOfStockProduct = itemsToAdd.some((product) => product.left === 0);
  
    if (hasOutOfStockProduct) {
      Alert.alert("Внимание", "Товара нету в остатке!!!");
      return;
    }
  
    addToCart(itemsToAdd);
    navigation.navigate("CartItems", {
      cartItems: itemsToAdd,
      fromCategories: false,
    });
  };   

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <FlatList
        data={filteredProducts}
        renderItem={({ item, index }) => (
          <ProdView style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 10 }}
              source={{ uri: `http://192.168.0.101:4040${item.image}` }}
            />
            <View style={{ marginLeft: 10, position: "relative" }}>
              <PostText>{item.name}</PostText>
              <Text style={{ marginBottom: 5 }}>Цена: {item.price}</Text>
              {item.left === 0 ? (
                <Text style={{ color: "red" }}>Остаток: {item.left}</Text>
              ) : (
                <Text>Остаток: {item.left}</Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "absolute",
                  top: 50,
                  left: 130,
                  zIndex: 1,
                }}
              >
                <PlusButton onPress={() => increaseQuantity(index)}>
                  <Image source={plus} style={{ width: 30, height: 30 }} />
                </PlusButton>
                <Text style={{ fontSize: 18, fontWeight: 500, margin: 5 }}>
                  {productStates[index].quantity}
                </Text>
                <MinusButton onPress={() => decreaseQuantity(index)}>
                  <Image source={minus} style={{ width: 30, height: 30 }} />
                </MinusButton>
              </View>
            </View>
          </ProdView>
        )}
      />
      <OrderView>
        <TouchableOpacity onPress={addToCartWithFilter}>
          <Text style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            Добавить в корзину
          </Text>
        </TouchableOpacity>
      </OrderView>
    </View>
  );
};

export default FullPostScreen;