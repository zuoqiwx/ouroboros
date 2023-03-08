import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import type { CatalogStackParamList } from "../../@types/navigation";
import CatalogPage from "./Catalog";
import RecordAnalysisPage from "../common/RecordAnalysis";
import RecordAnalysisSectionPage from "../common/RecordAnalysisSection";

const Stack = createNativeStackNavigator<CatalogStackParamList>();

function CatalogStack() {
  const { t } = useTranslation("CatalogStack");
  return (
    <Stack.Navigator initialRouteName="Catalog">
      <Stack.Screen
        name="Catalog"
        component={CatalogPage}
        options={{
          title: t("Catalog.title"),
        }}
      />
      <Stack.Screen
        name="CatalogAnalysis"
        component={RecordAnalysisPage}
        options={{
          title: t("CatalogAnalysis.title"),
        }}
      />
      <Stack.Screen
        name="CatalogAnalysisSection"
        component={RecordAnalysisSectionPage}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

export default CatalogStack;
