import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Line } from "../logics/models";
import { useTranslation } from "react-i18next";

export function getSequenceRender(
  sequence: string | undefined,
  height: number
) {
  return (
    <View style={styles.sequenceContainer}>
      {sequence && (
        <Text style={{ fontSize: height * 0.5, ...styles.sequence }}>
          {sequence}
        </Text>
      )}
    </View>
  );
}

function getChangeIconFromLine(line: Line | undefined, height: number) {
  if (!line || (line.young && !line.changed)) {
    return <View style={styles.changeContainer} />;
  }
  const isCross =
    (line.young && line.yang && line.changed) || (!line.young && !line.yang);
  return (
    <View style={styles.changeContainer}>
      <MaterialCommunityIcons
        name={isCross ? "close-thick" : "circle-outline"}
        size={isCross ? height : height * 0.8}
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
      {getSequenceRender(
        sequence ? (t(sequence.toString()) as string | undefined) : undefined,
        height
      )}
      {line.yang ? (
        <View style={styles.wholeSegment} />
      ) : (
        <View style={styles.separateSegment}>
          <View style={styles.filled} />
          <View style={line.yang ? styles.filled : styles.empty} />
          <View style={styles.filled} />
        </View>
      )}
      {getChangeIconFromLine(showChange ? line : undefined, height)}
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
