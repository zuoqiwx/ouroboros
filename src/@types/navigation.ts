import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import type {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import type {
  CompositeNavigationProp,
  CompositeScreenProps,
} from "@react-navigation/native";

import type { Hexagram } from "../logics/models";

export type HomeTabParamList = {
  RecordsStack: undefined;
  ToolsStack: undefined;
  SettingsStack: undefined;
};
export type HomeTabNavigationProp<T extends keyof HomeTabParamList> =
  BottomTabNavigationProp<HomeTabParamList, T>;
export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  BottomTabScreenProps<HomeTabParamList, T>;

export type RecordsStackParamList = {
  Records: undefined;
  RecordDetails: {
    hexagram: Hexagram;
    showSave: boolean;
  };
};
export type RecordsStackNavigationProp<T extends keyof RecordsStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<RecordsStackParamList, T>,
    HomeTabNavigationProp<"RecordsStack">
  >;
export type RecordsStackScreenProps<T extends keyof RecordsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RecordsStackParamList, T>,
    HomeTabScreenProps<"RecordsStack">
  >;

export type ToolsStackParamList = {
  ToolsMenu: undefined;
  ToolManual: undefined;
  ToolResult: {
    hexagram: Hexagram;
    showSave: boolean;
  };
};
export type ToolsStackNavigationProp<T extends keyof ToolsStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<ToolsStackParamList, T>,
    HomeTabNavigationProp<"ToolsStack">
  >;
export type ToolsStackScreenProps<T extends keyof ToolsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ToolsStackParamList, T>,
    HomeTabScreenProps<"ToolsStack">
  >;
