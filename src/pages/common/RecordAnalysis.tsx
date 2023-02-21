import React, { useEffect, useRef } from "react";
import { Button, Text, StyleSheet, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {
  RecordsStackParamList,
  ToolsStackParamList,
} from "../../@types/navigation";
import { HexagramTypes } from "../../logics/models";
import HexagramDisplay from "../../components/HexagramDisplay";
import analysisInfo from "../../../assets/analysis/map.json";
import analysisList from "../../constants/analysis";

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
  const analysis = useRef(analysisList[hexagram.getIndex()]);
  const lineHeight = 35;
  const lineMargin = 5;

  useEffect(() => {
    analysis.current = analysisList[hexagram.getIndex()];
  }, [hexagram]);

  useEffect(() => {
    route.name === "ToolAnalysis" &&
      navigation.setOptions({
        headerLeft: () => (
          <Button title={t("back")} onPress={() => navigation.goBack()} />
        ),
      });
  }, [navigation, t, route.name]);

  return (
    <View>
      <HexagramDisplay
        hexagram={hexagram}
        lineHeight={lineHeight}
        lineMargin={lineMargin}
        showSequence={true}
        showChange={showChange}
      />
      <Text style={styles.text}>{t(hexagram.type)}</Text>
      <Text style={styles.text}>{analysisInfo[hexagram.getIndex()].name}</Text>
      <Button
        title={t("summary")}
        onPress={() =>
          navigation.navigate(`${route.name}Section`, {
            name: `${analysis.current.name} ${t("summary")}`,
            sections: analysis.current.overall,
            isYoung: false,
          })
        }
      />
      {[...Array(6).keys()].reverse().map((idx) => (
        <Button
          key={idx}
          title={t(`yao${idx + 1}`)}
          onPress={() => {
            const showChange =
              hexagram.type === HexagramTypes.Original &&
              !hexagram.isYoungAt(idx);
            navigation.navigate(`${route.name}Section`, {
              name: `${analysis.current.name} - ${t(`yao${idx + 1}`)}`,
              sections: analysis.current.yaos[idx].filter((section) =>
                showChange ? true : !section.title.includes(t("change"))
              ),
            });
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    alignSelf: "center",
  },
});

export default RecordAnalysisPage;
