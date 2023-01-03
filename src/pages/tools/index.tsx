import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ToolsPage from "./Tools";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

function ToolsStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="ToolsMenu">
      <Stack.Screen
        name="ToolsMenu"
        component={ToolsPage}
        options={{
          title: t("ToolsMenu.title", { ns: "ToolsStack" }),
        }}
      />
    </Stack.Navigator>
  );
}

export default ToolsStack;
