import React from "react";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import RecordsStack from "./records";
import ToolsStack from "./tools";
import SettingsStack from "./settings";

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
    iconName = focused ? "ios-bookmarks" : "ios-bookmarks-outline";
  } else if (this.route.name === "ToolsStack") {
    iconName = focused ? "ios-map" : "ios-map-outline";
  } else if (this.route.name === "SettingsStack") {
    iconName = focused ? "ios-settings" : "ios-settings-outline";
  }
  return <Ionicons name={iconName} size={size} color={color} />;
}

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator
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
          title: "Records",
        }}
      />
      <Tab.Screen
        name="ToolsStack"
        component={ToolsStack}
        options={{
          title: "Tools",
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTab;
