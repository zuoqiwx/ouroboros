import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import type { ToolsStackParamList } from "../../@types/navigation";
import ToolsPage from "./Tools";
import ToolManualPage from "./ToolManual";
import RecordDetailsPage from "../common/RecordDetail";

const Stack = createNativeStackNavigator<ToolsStackParamList>();

function ToolsStack() {
  const { t } = useTranslation("ToolsStack");
  return (
    <Stack.Navigator initialRouteName="ToolsMenu">
      <Stack.Screen
        name="ToolsMenu"
        component={ToolsPage}
        options={{
          title: t("ToolsMenu.title"),
        }}
      />
      <Stack.Screen
        name="ToolManual"
        component={ToolManualPage}
        options={{
          title: t("ToolManual.title"),
        }}
      />
      <Stack.Screen
        name="ToolResult"
        component={RecordDetailsPage}
        options={{
          title: t("ToolResult.title"),
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

export default ToolsStack;
