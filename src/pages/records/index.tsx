import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import RecordsPage from "./Records";
import RecordDetailsPage from "./RecordDetail";

const Stack = createNativeStackNavigator();

function RecordsStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="Records">
      <Stack.Screen
        name="Records"
        component={RecordsPage}
        options={{
          title: t("Records.title", { ns: "RecordsStack" }),
        }}
      />
      <Stack.Screen
        name="RecordDetails"
        component={RecordDetailsPage}
        options={{
          title: t("RecordDetails.title", { ns: "RecordsStack" }),
        }}
      />
    </Stack.Navigator>
  );
}

export default RecordsStack;
