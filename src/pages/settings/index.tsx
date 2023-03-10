import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsPage from "./Settings";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

function SettingsStack() {
  const { t } = useTranslation("SettingsStack");
  return (
    <Stack.Navigator initialRouteName="SettingsMenu">
      <Stack.Screen
        name="SettingsMenu"
        component={SettingsPage}
        options={{
          title: t("SettingsMenu.title"),
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingsStack;
