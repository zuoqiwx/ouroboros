import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import RecordsPage from "./Records";
import RecordDetailsPage from "../common/RecordDetail";
import RecordAnalysisPage from "../common/RecordAnalysis";
import RecordAnalysisSectionPage from "../common/RecordAnalysisSection";

const Stack = createNativeStackNavigator();

function RecordsStack() {
  const { t } = useTranslation("RecordsStack");

  return (
    <Stack.Navigator initialRouteName="Records">
      <Stack.Screen
        name="Records"
        component={RecordsPage}
        options={{
          title: t("Records.title"),
        }}
      />
      <Stack.Screen
        name="RecordDetails"
        component={RecordDetailsPage}
        options={{
          title: t("RecordDetails.title"),
        }}
      />
      <Stack.Screen
        name="RecordAnalysis"
        component={RecordAnalysisPage}
        options={{
          title: t("RecordAnalysis.title"),
        }}
      />
      <Stack.Screen
        name="RecordAnalysisSection"
        component={RecordAnalysisSectionPage}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

export default RecordsStack;
