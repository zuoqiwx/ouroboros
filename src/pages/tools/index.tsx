import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import type { ToolsStackParamList } from "../../@types/navigation";
import ToolsPage from "./Tools";
import ToolManualPage from "./ToolManual";

const Stack = createNativeStackNavigator<ToolsStackParamList>();

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
      <Stack.Screen
        name="ToolManual"
        component={ToolManualPage}
        options={{
          title: t("ToolManual.title", { ns: "ToolsStack" }),
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

export default ToolsStack;
