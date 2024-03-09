import { useEffect, useState } from "react";
import SignIn from "./src/auth/SignIn";
import SignUp from "./src/auth/SignUp";
import { Navigation } from "./src/screens/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Проверка наличия токена в AsyncStorage
      const token = await AsyncStorage.getItem("token");
      // Если токен существует, пользователь уже вошел
      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Ошибка при проверке входа:", error);
    }
  };

  const handleSignIn = () => {
    // Логика обработки входа пользователя
    // Может потребоваться передать функцию setIsLoggedIn в SignIn для обновления статуса входа
    // Например, <SignIn onLogin={() => setIsLoggedIn(true)} />
  };

  const handleSignOut = async () => {
    try {
      // Удаление токена из AsyncStorage при выходе пользователя
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  return (
    <>
    {isLoggedIn ? (
      // Если пользователь вошел, отображаем Navigation
      <Navigation onSignOut={handleSignOut} />
    ) : (
      // Если пользователь не вошел, отображаем SignIn
      <SignIn onSignIn={handleSignIn} />
    )}
  </>
  );
}
