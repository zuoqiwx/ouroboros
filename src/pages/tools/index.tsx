import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ToolsPage from "./Tools";

const Stack = createNativeStackNavigator();

function ToolsStack() {
  return (
    <Stack.Navigator initialRouteName="Records/Summary">
      <Stack.Screen
        name="ToolsMenu"
        component={ToolsPage}
        options={{
          title: "Toolbox",
        }}
      />
    </Stack.Navigator>
  );
}

export default ToolsStack;
