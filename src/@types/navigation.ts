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
import type { Section } from "../constants/analysis";

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
  RecordAnalysis: {
    hexagram: Hexagram;
    showChange: boolean;
  };
  RecordAnalysisSection: {
    name: string;
    sections: Section[];
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
  ToolAnalysis: {
    hexagram: Hexagram;
    showChange: boolean;
  };
  ToolAnalysisSection: {
    name: string;
    sections: Section[];
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
