import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsPage from "./Settings";

const Stack = createNativeStackNavigator();

function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="Records/Summary">
      <Stack.Screen
        name="SettingsMenu"
        component={SettingsPage}
        options={{
          title: "Settings",
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingsStack;
