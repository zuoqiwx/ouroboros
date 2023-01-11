import React, { useEffect, useState } from "react";
import { Button, ScrollView, Dimensions, Text, StyleSheet } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import RenderHTML from "react-native-render-html";
import { useTranslation } from "react-i18next";

import {
  RecordsStackParamList,
  ToolsStackParamList,
} from "../../@types/navigation";
import { fetchAnalysisForHexagram } from "../../network/api";
import HexagramDisplay from "../../components/HexagramDisplay";
import analysisInfo from "../../network/analysis_urls.json";

function RecordAnalysisPage({
  route,
}: {
  route:
    | RouteProp<RecordsStackParamList, "RecordAnalysis">
    | RouteProp<ToolsStackParamList, "ToolAnalysis">;
}) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { hexagram, showChange } = route.params;
  const [body, setBody] = useState("");
  const window = Dimensions.get("window");
  const lineHeight = 40;
  const lineMargin = 5;

  useEffect(() => {
    fetchAnalysisForHexagram(hexagram)
      .then((text) => setBody(text))
      .catch((error) => console.error(error));
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title={t("back")} onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation, t]);

  return (
    <ScrollView>
      <HexagramDisplay
        hexagram={hexagram}
        lineHeight={lineHeight}
        lineMargin={lineMargin}
        showSequence={true}
        showChange={showChange}
      />
      <Text style={styles.text}>{t(hexagram.type)}</Text>
      <Text style={styles.text}>{analysisInfo[hexagram.getIndex()].name}</Text>
      <RenderHTML source={{ html: body }} contentWidth={window.width} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    alignSelf: "center",
  },
});

export default RecordAnalysisPage;
