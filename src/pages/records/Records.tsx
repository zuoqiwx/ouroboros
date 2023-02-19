import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { useTranslation } from "react-i18next";

import type { RecordsStackScreenProps } from "../../@types/navigation";
import {
  Pair,
  deleteAllRecordPairs,
  getAllRecordPairs,
} from "../../logics/storage";

function RecordsPage({ navigation }: RecordsStackScreenProps<"Records">) {
  const { t } = useTranslation("RecordsStack");
  const [pairs, setPairs] = useState([] as Pair[]);

  useEffect(() => {
    getAllRecordPairs()
      .then((newPairs) => setPairs(newPairs))
      .catch((error) => console.error(error));
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={t("Records.clear_all")}
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
      ),
    });
  }, [navigation, t]);

  return (
    <View>
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
