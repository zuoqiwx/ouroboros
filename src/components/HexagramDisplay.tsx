import React from "react";
import { StyleSheet, View } from "react-native";

import { Hexagram } from "../logics/models";
import LineDisplay from "./LineDisplay";

function HexagramDisplay({
  hexagram,
  lineHeight = 40,
  lineMargin = 10,
  showSequence = false,
  showChange = false,
}: {
  hexagram: Hexagram;
  lineHeight?: number;
  lineMargin?: number;
  showSequence?: boolean;
  showChange?: boolean;
}) {
  return (
    <View style={styles.container}>
      {hexagram.lines
        .map((line, index) => (
          <LineDisplay
            key={index}
            line={line}
            height={lineHeight}
            margin={lineMargin}
            sequence={showSequence ? index + 1 : undefined}
            showChange={showChange}
          />
        ))
        .reverse()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 3,
  },
});

export default HexagramDisplay;
