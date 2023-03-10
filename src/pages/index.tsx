import React from "react";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

import RecordsStack from "./records";
import ToolsStack from "./tools";
import CatalogStack from "./catalog";
// import SettingsStack from "./settings";

function getTabIconByRoute(
  this: { route: RouteProp<ParamListBase> },
  {
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }
) {
  let iconName;
  if (this.route.name === "RecordsStack") {
    // iconName = focused ? "ios-bookmarks" : "ios-bookmarks-outline";
    iconName = focused ? "ios-journal-sharp" : "ios-journal-outline";
  } else if (this.route.name === "ToolsStack") {
    iconName = focused ? "ios-map" : "ios-map-outline";
  } else if (this.route.name === "SettingsStack") {
    iconName = focused ? "ios-settings" : "ios-settings-outline";
  } else if (this.route.name === "CatalogStack") {
    iconName = focused ? "ios-library" : "ios-library-outline";
  }
  return <Ionicons name={iconName} size={size} color={color} />;
}

const Tab = createBottomTabNavigator();

function HomeTab() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="ToolsStack"
      screenOptions={(props) => ({
        tabBarIcon: getTabIconByRoute.bind(props),
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="RecordsStack"
        component={RecordsStack}
        options={{
          title: t("tabName", { ns: "RecordsStack" }),
        }}
      />
      <Tab.Screen
        name="ToolsStack"
        component={ToolsStack}
        options={{
          title: t("tabName", { ns: "ToolsStack" }),
        }}
      />
      <Tab.Screen
        name="CatalogStack"
        component={CatalogStack}
        options={{
          title: t("tabName", { ns: "CatalogStack" }),
        }}
      />
      {/* <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: t("tabName", { ns: "SettingsStack" }),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default HomeTab;
