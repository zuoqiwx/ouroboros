import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import "./src/i18n/i18n";
import HomeTab from "./src/pages";
// import { fetchAnalysisURLs } from "./src/network/api";

export default function App() {
  // useEffect(() => fetchAnalysisURLs(), []);
  return (
    <NavigationContainer>
      <HomeTab />
    </NavigationContainer>
  );
}
