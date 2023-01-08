import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";

import type { RecordsStackScreenProps } from "../../@types/navigation";
import {
  Pair,
  deleteAllRecordPairs,
  getAllRecordPairs,
} from "../../logics/storage";

function RecordsPage({ navigation }: RecordsStackScreenProps<"Records">) {
  const [pairs, setPairs] = useState([] as Pair[]);

  useEffect(() => {
    getAllRecordPairs()
      .then((newPairs) => setPairs(newPairs))
      .catch((error) => console.error(error));
  });

  return (
    <View>
      <Button
        title="Clear All"
        onPress={() => {
          deleteAllRecordPairs()
            .then((success) => {
              if (success) {
                console.log("Records cleared");
              } else {
                console.error("Failed to save record");
              }
            })
            .catch((error) => console.error(error));
        }}
      />
      {pairs.length === 0 ? (
        <Text>Nothing yet</Text>
      ) : (
        pairs.map(([key, { name, time, hexagram }]) => {
          return (
            <Button
              key={key}
              title={name}
              onPress={() =>
                navigation.navigate("RecordDetails", {
                  hexagram: hexagram,
                  showSave: false,
                })
              }
            />
          );
        })
      )}
    </View>
  );
}

export default RecordsPage;
