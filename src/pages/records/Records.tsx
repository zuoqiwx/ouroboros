import React from "react";
import { View, Button } from "react-native";
import { useTranslation } from "react-i18next";

import type { RecordsStackScreenProps } from "../../@types/navigation";
import { Line, Hexagram } from "../../logics/models";
import type { HexagramLines } from "../../logics/models";

function RecordsPage({ navigation }: RecordsStackScreenProps<"Records">) {
  const { t } = useTranslation("RecordsStack");

  const lines = [
    new Line(true, false), // --- o
    new Line(true, false), // --- o
    new Line(true, true), // ---
    new Line(false, false), // - - x
    new Line(false, true), // - -
    new Line(true, false), // - - o
  ] as HexagramLines;
  const hex = new Hexagram(lines);

  return (
    <View>
      <Button
        title="Show Details"
        onPress={() =>
          navigation.navigate("RecordDetails", {
            hexagram: hex,
            showSave: false,
          })
        }
      />
    </View>
  );
}

export default RecordsPage;
