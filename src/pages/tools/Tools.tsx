import React from "react";
import { View, Button } from "react-native";
import { useTranslation } from "react-i18next";

import type {
  ToolsStackParamList,
  ToolsStackScreenProps,
} from "../../@types/navigation";

const toolList = ["ToolManual", "ToolTime", "ToolNumber"];

function ToolsPage({ navigation }: ToolsStackScreenProps<"ToolsMenu">) {
  const { t } = useTranslation("ToolsStack");
  return (
    <View>
      {toolList.map((toolName, index) => (
        <Button
          key={index}
          title={t(`${toolName}.title`)}
          onPress={() => {
            navigation.navigate(toolName as keyof ToolsStackParamList);
          }}
        />
      ))}
    </View>
  );
}

export default ToolsPage;
