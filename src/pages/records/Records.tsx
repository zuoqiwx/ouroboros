import React, { useEffect } from "react";
import { View, Button } from "react-native";

import type { RecordsStackScreenProps } from "../../@types/navigation";
import { Line, Hexagram } from "../../logics/models";
import type { HexagramLines } from "../../logics/models";
import { getAllKeys, setData } from "../../logics/storage";

function RecordsPage({ navigation }: RecordsStackScreenProps<"Records">) {
  const lines = [
    new Line(true, false), // --- o
    new Line(true, false), // --- o
    new Line(true, true), // ---
    new Line(false, false), // - - x
    new Line(false, true), // - -
    new Line(true, false), // - - o
  ] as HexagramLines;
  const hex = new Hexagram(lines);
  const json = JSON.parse(JSON.stringify(hex)) as Hexagram;
  const newHex = Hexagram.fromObject(json);
  console.log(hex.toString());
  console.log(hex.change()?.toString());

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
