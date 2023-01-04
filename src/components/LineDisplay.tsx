import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Line } from "../logics/models";
import { useTranslation } from "react-i18next";

export function getSequenceRender(sequence: string, height: number) {
  return (
    <View style={styles.sequenceContainer}>
      <Text style={{ fontSize: height * 0.5, ...styles.sequence }}>
        {sequence}
      </Text>
    </View>
  );
}

function getChangeIconFromLine(line: Line, height: number) {
  if (line.young) {
    return <View style={styles.changeContainer} />;
  }
  return (
    <View style={styles.changeContainer}>
      <MaterialCommunityIcons
        name={line.yang ? "circle-outline" : "close-thick"}
        size={line.yang ? height * 0.8 : height}
        color={styles.changeIcon.color}
      />
    </View>
  );
}

function LineDisplay({
  line,
  height = 40,
  margin = 10,
  sequence,
  showChange = false,
}: {
  line: Line;
  height?: number;
  margin?: number;
  sequence?: number;
  showChange?: boolean;
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
      {sequence && getSequenceRender(t(sequence.toString()), height)}
      {line.yang ? (
        <View style={styles.wholeSegment} />
      ) : (
        <View style={styles.separateSegment}>
          <View style={styles.filled} />
          <View style={line.yang ? styles.filled : styles.empty} />
          <View style={styles.filled} />
        </View>
      )}
      {showChange && getChangeIconFromLine(line, height)}
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
  wholeSegment: {
    flex: 6,
    backgroundColor: "black",
  },
  separateSegment: {
    flex: 6,
    flexDirection: "row",
  },
  filled: {
    flex: 2,
    backgroundColor: "black",
  },
  empty: {
    flex: 2,
  },
  changeContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  changeIconWrapper: {
    alignSelf: "center",
  },
  changeIcon: {
    color: "black",
  },
});

export default LineDisplay;
