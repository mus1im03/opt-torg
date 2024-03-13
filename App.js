import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navigation } from "./src/screens/Navigation";
import SignIn from "./src/auth/SignIn";
import SignUp from "./src/auth/SignUp";
import { Loading } from "./src/components/Loading";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Ошибка при проверке входа:", error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const handleSignUpClick = (show) => {
    setShowSignUp(show);
  };

  if (isCheckingAuth) {
    return <Loading />;
  }

  return isLoggedIn ? (
    <Navigation onSignOut={handleSignOut} />
  ) : (
    showSignUp ? (
      <SignUp onSignInClick={() => handleSignUpClick(false)} />
    ) : (
      <SignIn onSignIn={handleSignIn} onSignUpClick={() => handleSignUpClick(true)} />
    )
  );
}
