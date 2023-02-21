import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import type { ToolsStackParamList } from "../../@types/navigation";
import ToolsPage from "./Tools";
import ToolManualPage from "./ToolManual";
import ToolTimePage from "./ToolTime";
import ToolNumbersPage from "./ToolNumbers";
import RecordDetailsPage from "../common/RecordDetail";
import RecordAnalysisPage from "../common/RecordAnalysis";
import RecordAnalysisSectionPage from "../common/RecordAnalysisSection";

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
        name="ToolTime"
        component={ToolTimePage}
        options={{
          title: t("ToolTime.title"),
        }}
      />
      <Stack.Screen
        name="ToolNumbers"
        component={ToolNumbersPage}
        options={{
          title: t("ToolNumbers.title"),
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
      <Stack.Screen
        name="ToolAnalysis"
        component={RecordAnalysisPage}
        options={{
          title: t("ToolAnalysis.title"),
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ToolAnalysisSection"
        component={RecordAnalysisSectionPage}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

export default ToolsStack;
