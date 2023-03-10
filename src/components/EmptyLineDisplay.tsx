import React from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { getSequenceRender } from "./LineDisplay";

function EmptyLineDisplay({
  height = 40,
  margin = 10,
  sequence,
  showError = false,
}: {
  height?: number;
  margin?: number;
  sequence?: number;
  showError?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <View
      style={{
        height,
        marginTop: margin,
        marginBottom: margin,
        ...styles.container,
      }}
    >
      {sequence ? (
        getSequenceRender(t(sequence.toString()), height)
      ) : (
        <View style={styles.placeholder} />
      )}
      <View style={showError ? [styles.empty, styles.error] : styles.empty} />
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
  sequenceContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  sequence: {
    fontWeight: "bold",
  },
  placeholder: {
    flex: 2,
  },
  empty: {
    flex: 6,
    borderWidth: 3,
    borderStyle: "dashed",
    borderColor: "black",
  },
  error: {
    borderColor: "red",
  },
});

export default EmptyLineDisplay;
