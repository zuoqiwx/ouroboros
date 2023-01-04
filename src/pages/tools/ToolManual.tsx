import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import type { ToolsStackScreenProps } from "../../@types/navigation";
import type { HexagramLinesOptional } from "../../logics/models";
import HexagramDisplayEditable from "../../components/HexagramDisplayEditable";

function ToolManualPage({ navigation }: ToolsStackScreenProps<"ToolsMenu">) {
  const { t } = useTranslation("ToolsStack");
  const [lines, setLines] = useState(Array(6).fill(undefined));

  return (
    <View>
      <HexagramDisplayEditable
        lines={lines as HexagramLinesOptional}
        setLines={setLines}
        lineHeight={50}
        lineMargin={5}
        showSequence={true}
        showChange={true}
      />
    </View>
  );
}

export default ToolManualPage;
