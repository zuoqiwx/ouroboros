import React from "react";
import { View, Button } from "react-native";
import { useTranslation } from "react-i18next";

import type { ToolsStackParamList } from "../../@types/navigation";
import { useNavigation } from "@react-navigation/native";

const toolList = ["ToolManual", "ToolTime", "ToolNumbers"];

function ToolsPage() {
  const navigation = useNavigation();
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
