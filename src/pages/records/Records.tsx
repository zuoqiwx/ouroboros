import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  Button,
  StyleSheet,
  View,
  Pressable,
  Alert,
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
            Alert.alert(
              t("Records.clear_all"),
              t("Records.clear_all_message"),
              [
                {
                  text: t("no"),
                  style: "cancel",
                },
                {
                  text: t("yes"),
                  onPress: () => {
                    deleteAllRecordPairs()
                      .then((success) => {
                        if (success) {
                          console.log("Records cleared");
                        } else {
                          console.error("Failed to save record");
                        }
                      })
                      .catch((error) => console.error(error));
                  },
                },
              ]
            );
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
        const date = new Date(time);
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
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{`${date.toLocaleString()}`}</Text>
            </View>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "light grey",
  },
  nameContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  timeContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  name: {
    textAlign: "left",
    fontSize: 20,
  },
  time: {
    textAlign: "right",
    fontSize: 16,
    color: "grey",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default RecordsPage;
