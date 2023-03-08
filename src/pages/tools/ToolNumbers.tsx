import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { useTranslation } from "react-i18next";

import type { ToolsStackScreenProps } from "../../@types/navigation";
import {
  NumberTriplet,
  createHexagramFromNumbers,
} from "../../logics/algorithms";

function ToolNumbersPage({ navigation }: ToolsStackScreenProps<"ToolNumbers">) {
  const { t } = useTranslation("ToolsStack");
  const [numbers, setNumbers] = useState([NaN, NaN, NaN]);
  const [errors, setErrors] = useState([false, false, false]);
  const inputsRef = useRef([null, null, null] as [
    TextInput | null,
    TextInput | null,
    TextInput | null
  ]);

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
              hexagram: createHexagramFromNumbers(
                numbers.slice().reverse() as NumberTriplet
              ),
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
          ref={(input) => (inputsRef.current[index] = input)}
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
            if (index > 0) {
              inputsRef.current[index - 1]?.focus();
            }
          }}
          keyboardType="number-pad"
          returnKeyType="done"
          autoFocus={index === 2}
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
