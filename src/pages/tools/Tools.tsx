import React from "react";
import { View, Button } from "react-native";
import { useTranslation } from "react-i18next";

import type { ToolsStackScreenProps } from "../../@types/navigation";

const toolList = ["ToolManual", "ToolTime", "ToolNumbers"];

function ToolsPage({ navigation }: ToolsStackScreenProps<"ToolsMenu">) {
  const { t } = useTranslation("ToolsStack");
  return (
    <View>
      {toolList.map((toolName, index) => (
        <Button
          key={index}
          title={t(`${toolName}.title`)}
          onPress={() => {
            navigation.navigate(toolName);
          }}
        />
      ))}
    </View>
  );
}

export default ToolsPage;
