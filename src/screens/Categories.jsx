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
import Post from "../components/Post";
import { Loading } from "../components/Loading";
import cart from "../../assets/cart.png";

const CartIcon = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  top: 450px;
  right: 20px;
`;

export default function CategoriesScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://192.168.0.101:4040/category");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Ошибка", "Не удалось получить статьи");
    } finally {
      setIsLoading(false);
    }
  };

  const clearCartItems = () => {
    setCartItems([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (items, isRemoving = false) => {
    console.log(`${isRemoving ? "Removing from" : "Adding to"} cart in CategoriesScreen:`, items);
  
    if (isRemoving) {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => !items.find((cartItem) => cartItem._id === item._id))
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, ...items]);
    }
  };

  const updateCategories = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FullPost", { id: item._id, addToCart })
            }
          >
            <Post title={item.title} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("CartItems", { cartItems, fromCategories: true, clearCartItems, updateCategories })}
      >
        <CartIcon source={cart} />
      </TouchableOpacity>
    </View>
  );
}