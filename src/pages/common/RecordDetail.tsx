import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Text, View, Button, Alert, StyleSheet, Pressable } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import HexagramDisplay from "../../components/HexagramDisplay";
import {
  RecordsStackParamList,
  ToolsStackParamList,
} from "../../@types/navigation";
import { Hexagram } from "../../logics/models";
import { setRecord } from "../../logics/storage";
import analysisInfo from "../../../assets/analysis/map.json";

type PromptInfo = {
  title: string;
  message: string;
  save: string;
  cancel: string;
};

function createHexagramSavePrompt(
  hexagram: Hexagram,
  promptInfo: PromptInfo,
  setSaved: Dispatch<SetStateAction<boolean>>
) {
  return () => {
    const now = new Date();
    Alert.prompt(
      promptInfo.title,
      promptInfo.message,
      [
        {
          text: promptInfo.save,
          onPress: (name) => {
            const record = {
              name: name as string,
              time: now,
              hexagram: hexagram,
            };
            setRecord(record)
              .then((success) => {
                if (success) {
                  setSaved(true);
                } else {
                  console.error("Failed to save record");
                }
              })
              .catch((error) => console.error(error));
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
  const [saved, setSaved] = useState(false);
  const lineHeight = 18;
  const lineMargin = 2;

  function goToAnalysis(hexagram: Hexagram, showChange = false) {
    const param = {
      hexagram,
      showChange,
    };
    return () =>
      showSave
        ? navigation.navigate("ToolAnalysis", param)
        : navigation.navigate("RecordAnalysis", param);
  }

  useEffect(() => {
    if (saved) {
      navigation.navigate("ToolsMenu");
    }
  }, [navigation, saved]);

  useEffect(() => {
    const promptInfo = {
      title: t("Details.prompt.title"),
      message: t("Details.prompt.message"),
      save: t("save"),
      cancel: t("cancel"),
    };
    showSave &&
      navigation.setOptions({
        headerRight: () => (
          <Button
            title={t("save")}
            onPress={createHexagramSavePrompt(hexagram, promptInfo, setSaved)}
          />
        ),
      });
  }, [navigation, showSave, t, hexagram]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.smallSpace} />
        <View style={styles.smallContent}>
          <Pressable onPress={goToAnalysis(original, true)}>
            <HexagramDisplay
              hexagram={original}
              lineHeight={lineHeight}
              lineMargin={lineMargin}
              showSequence={false}
              showChange={true}
            />
            <Text style={styles.text}>{t(original.type)}</Text>
            <Text style={styles.text}>
              {analysisInfo[original.getIndex()].name}
            </Text>
          </Pressable>
        </View>
        <View style={styles.smallSpace} />
        <View style={styles.smallContent}>
          <Pressable onPress={goToAnalysis(mutual as Hexagram)}>
            <HexagramDisplay
              hexagram={mutual as Hexagram}
              lineHeight={lineHeight}
              lineMargin={lineMargin}
              showSequence={false}
              showChange={false}
            />
          </Pressable>
          <Text style={styles.text}>{t((mutual as Hexagram).type)}</Text>
          <Text style={styles.text}>
            {analysisInfo[(mutual as Hexagram).getIndex()].name}
          </Text>
        </View>
        <View style={styles.smallSpace} />
      </View>
      <View style={styles.container}>
        <View style={styles.largeSpace} />
        <View style={styles.largeContent}>
          <Pressable onPress={goToAnalysis(change as Hexagram)}>
            <HexagramDisplay
              hexagram={change as Hexagram}
              lineHeight={lineHeight}
              lineMargin={lineMargin}
              showSequence={false}
              showChange={true}
            />
          </Pressable>
          <Text style={styles.text}>{t((change as Hexagram).type)}</Text>
          <Text style={styles.text}>
            {analysisInfo[(change as Hexagram).getIndex()].name}
          </Text>
        </View>
        <View style={styles.largeSpace} />
      </View>
      <View style={styles.container}>
        <View style={styles.smallSpace} />
        <View style={styles.smallContent}>
          <Pressable onPress={goToAnalysis(complementary as Hexagram)}>
            <HexagramDisplay
              hexagram={complementary as Hexagram}
              lineHeight={lineHeight}
              lineMargin={lineMargin}
              showSequence={false}
              showChange={false}
            />
          </Pressable>
          <Text style={styles.text}>{t((complementary as Hexagram).type)}</Text>
          <Text style={styles.text}>
            {analysisInfo[(complementary as Hexagram).getIndex()].name}
          </Text>
        </View>
        <View style={styles.smallSpace} />
        <View style={styles.smallContent}>
          <Pressable onPress={goToAnalysis(reverse as Hexagram)}>
            <HexagramDisplay
              hexagram={reverse as Hexagram}
              lineHeight={lineHeight}
              lineMargin={lineMargin}
              showSequence={false}
              showChange={false}
            />
          </Pressable>
          <Text style={styles.text}>{t((reverse as Hexagram).type)}</Text>
          <Text style={styles.text}>
            {analysisInfo[(reverse as Hexagram).getIndex()].name}
          </Text>
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
  text: {
    fontSize: 18,
    alignSelf: "center",
  },
});
