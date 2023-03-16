import React, { useEffect, useRef } from "react";
import { Button, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import {
  RecordsStackScreenProps,
  ToolsStackScreenProps,
  CatalogStackScreenProps,
} from "../../@types/navigation";
import { HexagramTypes } from "../../logics/models";
import HexagramDisplay from "../../components/HexagramDisplay";
import analysisInfo from "../../../assets/analysis/map.json";
import analysisList from "../../constants/analysis";

function RecordAnalysisPage({
  route,
}:
  | RecordsStackScreenProps<"RecordAnalysis">
  | ToolsStackScreenProps<"ToolAnalysis">
  | CatalogStackScreenProps<"CatalogAnalysis">) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { hexagram, showChange, showChangeSection } = route.params;
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

    route.name === "CatalogAnalysis" &&
      navigation.setOptions({
        headerRight: () => (
          <Button
            title={t("solve")}
            onPress={() =>
              navigation.navigate("ToolsStack", {
                screen: "ToolManual",
                params: { hexagram },
              })
            }
          />
        ),
      });
  }, [navigation, t, route.name, hexagram]);

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
      <Button
        title={t("summary")}
        onPress={() =>
          navigation.navigate(`${route.name}Section`, {
            name: `${analysis.current.name} ${t("summary")}`,
            sections: analysis.current.overall,
          })
        }
      />
      {[...Array(6).keys()].reverse().map((idx) => {
        const yaoName = t(
          `yao${idx + 1}.${hexagram.lines[idx].yang ? "yang" : "yin"}`
        );
        return (
          <Button
            key={idx}
            title={yaoName}
            onPress={() => {
              const showChange =
                hexagram.type === HexagramTypes.Original &&
                !hexagram.isYoungAt(idx);
              navigation.navigate(`${route.name}Section`, {
                name: `${analysis.current.name} ${yaoName}`,
                sections: analysis.current.yaos[idx].filter((section) =>
                  showChange || showChangeSection
                    ? true
                    : !section.title.includes(t("change"))
                ),
              });
            }}
          />
        );
      })}
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
