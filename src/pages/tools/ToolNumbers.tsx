import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {
  NumberTriplet,
  createHexagramFromNumbers,
} from "../../logics/algorithms";

function ToolNumbersPage() {
  const navigation = useNavigation();
  const { t } = useTranslation("ToolsStack");
  const [numbers, setNumbers] = useState([NaN, NaN, NaN]);
  const [errors, setErrors] = useState([false, false, false]);

  function setErrorAt(index: number, value: boolean) {
    setErrors((curr) => curr.map((v, i) => (i === index ? value : v)));
  }

  function setNumberAt(index: number, value: number) {
    setNumbers((curr) => curr.map((v, i) => (i === index ? value : v)));
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={t("next")}
          onPress={() => {
            navigation.navigate("ToolResult", {
              hexagram: createHexagramFromNumbers(numbers as NumberTriplet),
              showSave: true,
            });
          }}
        />
      ),
    });
  }, [navigation, t, numbers]);

  return (
    <View style={styles.container}>
      {numbers.map((number, index) => (
        <TextInput
          key={index}
          value={number ? number.toString() : ""}
          onChange={({ nativeEvent }) =>
            setNumberAt(index, parseInt(nativeEvent.text))
          }
          onSubmitEditing={({ nativeEvent }) => {
            const number = parseInt(nativeEvent.text);
            if (number && 100 <= number && number < 1000) {
              setNumberAt(index, number);
              setErrorAt(index, false);
            } else {
              setErrorAt(index, true);
            }
          }}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={3}
          style={[styles.input, errors[index] && styles.error]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 2,
    width: "15%",
    height: "6%",
    fontSize: 24,
    textAlign: "center",
    backgroundColor: "white",
  },
  error: {
    borderWidth: 2,
    borderColor: "red",
  },
});

export default ToolNumbersPage;
