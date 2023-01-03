import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import "./src/i18n/i18n";
import HomeTab from "./src/pages";

export default function App() {
  return (
    <NavigationContainer>
      <HomeTab />
    </NavigationContainer>
  );
}
