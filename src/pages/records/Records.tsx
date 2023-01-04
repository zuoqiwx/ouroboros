import React from "react";
import { View, Text, Button } from "react-native";
import { useTranslation } from "react-i18next";

import type { RecordsStackScreenProps } from "../../@types/navigation";
import HexagramDisplay from "../../components/HexagramDisplay";
import { Line, Hexagram } from "../../logics/models";
import type { HexagramLines } from "../../logics/models";

const lines = [
  new Line(true, false), // --- o
  new Line(true, false), // --- o
  new Line(true, true), // ---
  new Line(false, false), // - - x
  new Line(false, true), // - -
  new Line(true, false), // - - o
] as HexagramLines;
const hex = new Hexagram(lines);

function RecordsPage({ navigation }: RecordsStackScreenProps<"Records">) {
  const { t } = useTranslation("RecordsStack");
  return (
    <View>
      <Text>This is {t("Records.title")} page.</Text>
      <Button
        title="Show Details"
        onPress={() => navigation.navigate("RecordDetails")}
      />
      <HexagramDisplay
        hexagram={hex}
        lineHeight={50}
        lineMargin={5}
        showSequence={true}
        showChange={true}
      />
    </View>
  );
}

export default RecordsPage;
