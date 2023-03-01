import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  Button,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
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

  return pairs.length === 0 ? (
    <View style={styles.container}>
      <Text style={styles.text}>{t("Records.empty")}</Text>
    </View>
  ) : (
    <ScrollView>
      {pairs.map(([key, { name, time, hexagram }]) => {
        return (
          <Pressable
            key={key}
            onPress={() =>
              navigation.navigate("RecordDetails", {
                hexagram: hexagram,
                showSave: false,
              })
            }
            style={styles.record}
          >
            <Text style={styles.text}>{name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  record: {
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default RecordsPage;
