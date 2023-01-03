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

type HomeTabParamList = {
  RecordsStack: undefined;
  ToolsStack: undefined;
  SettingsStack: undefined;
};
export type HomeTabNavigationProp<T extends keyof HomeTabParamList> =
  BottomTabNavigationProp<HomeTabParamList, T>;
export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  BottomTabScreenProps<HomeTabParamList, T>;

type RecordsStackParamList = {
  Records: undefined;
  RecordDetails: undefined;
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
