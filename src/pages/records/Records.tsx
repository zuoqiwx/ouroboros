import React from "react";
import { View, Text, Button } from "react-native";

import { RecordsStackScreenProps } from "../../types/navigation";

function RecordsPage({ navigation }: RecordsStackScreenProps<"Records">) {
  return (
    <View>
      <Text>This is records page.</Text>
      <Button
        title="Show Details"
        onPress={() => navigation.navigate("RecordDetails")}
      />
    </View>
  );
}

export default RecordsPage;
