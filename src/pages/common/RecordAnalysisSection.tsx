import React, { useEffect } from "react";
import { ScrollView, Text, Button, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import {
  RecordsStackScreenProps,
  ToolsStackScreenProps,
  CatalogStackScreenProps,
} from "../../@types/navigation";

function RecordAnalysisSectionPage({
  route,
  navigation,
}:
  | RecordsStackScreenProps<"RecordAnalysisSection">
  | ToolsStackScreenProps<"ToolAnalysisSection">
  | CatalogStackScreenProps<"CatalogAnalysisSection">) {
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
