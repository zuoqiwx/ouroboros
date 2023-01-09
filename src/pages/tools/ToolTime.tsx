import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { createHexagramFromDateTime } from "../../logics/algorithms";

function ToolTimePage() {
  const navigation = useNavigation();
  const { t } = useTranslation("ToolsStack");
  const [dateTime, setDateTime] = useState(new Date());
  const onDateChange = (event: DateTimePickerEvent, value?: Date) => {
    value &&
      setDateTime(
        (curr) =>
          new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate(),
            curr.getHours()
          )
      );
  };
  const onHourChange = (event: DateTimePickerEvent, value?: Date) => {
    value &&
      setDateTime(
        (curr) =>
          new Date(
            curr.getFullYear(),
            curr.getMonth(),
            curr.getDate(),
            value.getHours()
          )
      );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={t("next")}
          onPress={() => {
            navigation.navigate("ToolResult", {
              hexagram: createHexagramFromDateTime(dateTime),
              showSave: true,
            });
          }}
        />
      ),
    });
  }, [navigation, t, dateTime]);

  return (
    <View style={styles.container}>
      <DateTimePicker value={dateTime} mode="date" onChange={onDateChange} />
      <DateTimePicker value={dateTime} mode="time" onChange={onHourChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ToolTimePage;
