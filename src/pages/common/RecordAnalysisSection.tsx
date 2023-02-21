import React, { useEffect } from "react";
import { ScrollView, Text, Button, View, StyleSheet } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {
  RecordsStackParamList,
  ToolsStackParamList,
} from "../../@types/navigation";

function RecordAnalysisSectionPage({
  route,
}: {
  route:
    | RouteProp<RecordsStackParamList, "RecordAnalysisSection">
    | RouteProp<ToolsStackParamList, "ToolAnalysisSection">;
}) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { name, sections } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerLeft: () => (
        <Button title={t("back")} onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation, t, name]);

  return (
    <ScrollView>
      {sections.map((section, sidx) => (
        <View key={sidx} style={styles.section}>
          <Text style={styles.title}>{section.title}</Text>
          {section.lines.map((line, lidx) => (
            <Text key={lidx} style={styles.line}>
              {line}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    margin: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  line: {
    fontSize: 16,
  },
});

export default RecordAnalysisSectionPage;
