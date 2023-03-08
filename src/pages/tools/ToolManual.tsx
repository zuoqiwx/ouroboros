import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { useTranslation } from "react-i18next";

import type { ToolsStackScreenProps } from "../../@types/navigation";
import {
  Hexagram,
  HexagramLines,
  HexagramLinesOptional,
} from "../../logics/models";
import HexagramDisplayEditable from "../../components/HexagramDisplayEditable";

function isValidLines(lines: HexagramLinesOptional): boolean {
  return lines.every((line) => line);
}

function ToolManualPage({
  route,
  navigation,
}: ToolsStackScreenProps<"ToolManual">) {
  const { t } = useTranslation("ToolsStack");
  const [lines, setLines] = useState(
    Array(6).fill(undefined) as HexagramLinesOptional
  );
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={t("next")}
          onPress={() => {
            if (!isValidLines(lines)) {
              setShowError(true);
              return;
            }
            navigation.navigate("ToolResult", {
              hexagram: new Hexagram(lines as HexagramLines),
              showSave: true,
            });
          }}
        />
      ),
    });
  }, [navigation, t, lines]);

  useEffect(() => {
    if (route.params) {
      const { hexagram } = route.params;
      hexagram && setLines(hexagram.lines);
    }
  }, [route.params]);

  return (
    <View>
      <HexagramDisplayEditable
        lines={lines}
        setLines={setLines}
        lineHeight={50}
        lineMargin={5}
        showSequence={true}
        showChange={true}
        showError={showError}
      />
    </View>
  );
}

export default ToolManualPage;
