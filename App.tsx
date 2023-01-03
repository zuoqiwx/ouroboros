import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeTab from "./src/pages";

export default function App() {
  return (
    <NavigationContainer>
      <HomeTab />
    </NavigationContainer>
  );
}
