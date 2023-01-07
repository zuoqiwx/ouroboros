import React, { useEffect } from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import HexagramDisplay from "../../components/HexagramDisplay";
import {
  RecordsStackParamList,
  ToolsStackParamList,
} from "../../@types/navigation";
import { Hexagram } from "../../logics/models";

type PromptInfo = {
  title: string;
  message: string;
  save: string;
  cancel: string;
};

function createHexagramSavePrompt(hexagram: Hexagram, promptInfo: PromptInfo) {
  return () => {
    const now = new Date();
    const key = `record-${now.getTime().toString()}`;
    Alert.prompt(
      promptInfo.title,
      promptInfo.message,
      [
        {
          text: promptInfo.save,
          onPress: (name) => {
            console.log(key);
            console.log(name);
            console.log(hexagram);
          },
        },
        {
          text: promptInfo.cancel,
          style: "cancel",
        },
      ],
      "plain-text",
      now.toLocaleString()
    );
  };
}

function DetailPage({
  route,
}: {
  route:
    | RouteProp<RecordsStackParamList, "RecordDetails">
    | RouteProp<ToolsStackParamList, "ToolResult">;
}) {
  const navigation = useNavigation();
  const { hexagram, showSave } = route.params;
  const { original, mutual, change, complementary, reverse } =
    Hexagram.getTransforms(hexagram);
  const { t } = useTranslation();
  const promptInfo = {
    title: t("Details.prompt.title"),
    message: t("Details.prompt.message"),
    save: t("save"),
    cancel: t("cancel"),
  };
  const lineHeight = 20;
  const lineMargin = 2;

  useEffect(() => {
    showSave &&
      navigation.setOptions({
        headerRight: () => (
          <Button
            title={t("save")}
            onPress={createHexagramSavePrompt(hexagram, promptInfo)}
          />
        ),
      });
  }, [navigation, showSave, hexagram]);
  console.log(change);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.smallSpace} />
        <View style={styles.smallContent}>
          <HexagramDisplay
            hexagram={original}
            lineHeight={lineHeight}
            lineMargin={lineMargin}
            showSequence={false}
            showChange={true}
          />
        </View>
        <View style={styles.smallSpace} />
        <View style={styles.smallContent}>
          <HexagramDisplay
            hexagram={mutual as Hexagram}
            lineHeight={lineHeight}
            lineMargin={lineMargin}
            showSequence={false}
            showChange={false}
          />
        </View>
        <View style={styles.smallSpace} />
      </View>
      <View style={styles.container}>
        <View style={styles.largeSpace} />
        <View style={styles.largeContent}>
          <HexagramDisplay
            hexagram={change as Hexagram}
            lineHeight={lineHeight}
            lineMargin={lineMargin}
            showSequence={false}
            showChange={true}
          />
        </View>
        <View style={styles.largeSpace} />
      </View>
      <View style={styles.container}>
        <View style={styles.smallSpace} />
        <View style={styles.smallContent}>
          <HexagramDisplay
            hexagram={complementary as Hexagram}
            lineHeight={lineHeight}
            lineMargin={lineMargin}
            showSequence={false}
            showChange={false}
          />
        </View>
        <View style={styles.smallSpace} />
        <View style={styles.smallContent}>
          <HexagramDisplay
            hexagram={reverse as Hexagram}
            lineHeight={lineHeight}
            lineMargin={lineMargin}
            showSequence={false}
            showChange={false}
          />
        </View>
        <View style={styles.smallSpace} />
      </View>
    </>
  );
}

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
  smallContent: {
    flex: 4,
  },
  largeContent: {
    flex: 8,
  },
  smallSpace: {
    flex: 1,
  },
  largeSpace: {
    flex: 7,
  },
});
