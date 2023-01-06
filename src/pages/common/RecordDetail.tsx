import React, { useEffect } from "react";
import { View, Button, Alert } from "react-native";
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
    const uid = now.getTime();
    Alert.prompt(
      promptInfo.title,
      promptInfo.message,
      [
        {
          text: promptInfo.save,
          onPress: (text) => {
            console.log(uid);
            console.log(text);
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
  const { t } = useTranslation();
  const promptInfo = {
    title: t("Details.prompt.title"),
    message: t("Details.prompt.message"),
    save: t("save"),
    cancel: t("cancel"),
  };

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

  return (
    <View>
      <HexagramDisplay
        hexagram={hexagram}
        lineHeight={50}
        lineMargin={5}
        showSequence={true}
        showChange={true}
      />
    </View>
  );
}

export default DetailPage;
