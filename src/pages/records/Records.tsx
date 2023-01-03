import React from "react";
import { View, Text, Button } from "react-native";
import { useTranslation } from "react-i18next";

import { RecordsStackScreenProps } from "../../@types/navigation";

function RecordsPage({ navigation }: RecordsStackScreenProps<"Records">) {
  const { t } = useTranslation("RecordsStack");
  return (
    <View>
      <Text>This is {t("Records.title")} page.</Text>
      <Button
        title="Show Details"
        onPress={() => navigation.navigate("RecordDetails")}
      />
    </View>
  );
}

export default RecordsPage;
