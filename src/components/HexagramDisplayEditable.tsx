import React from "react";
import type { Dispatch, SetStateAction } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

import { Line } from "../logics/models";
import type { HexagramLinesOptional } from "../logics/models";
import LineDisplay from "./LineDisplay";
import EmptyLineDisplay from "./EmptyLineDisplay";
import { useTranslation } from "react-i18next";

function changeTargetLine(
  targetIndex: number,
  setLines: Dispatch<SetStateAction<HexagramLinesOptional>>,
  young: boolean,
  yang: boolean
) {
  setLines(
    (curr) =>
      curr.map((line, index) => {
        if (index === targetIndex) {
          return new Line(yang, young);
        }
        return line;
      }) as HexagramLinesOptional
  );
}

type AlertInfo = {
  title: string;
  message: string;
  youngYin: string;
  youngYang: string;
  oldYin: string;
  oldYang: string;
  cancel: string;
};

function createManualLineAlert(
  index: number,
  setLines: Dispatch<SetStateAction<HexagramLinesOptional>>,
  alertInfo: AlertInfo
) {
  return () =>
    Alert.alert(
      alertInfo.title,
      alertInfo.message,
      [
        {
          text: alertInfo.youngYin,
          onPress: () => changeTargetLine(index, setLines, true, false),
        },
        {
          text: alertInfo.youngYang,
          onPress: () => changeTargetLine(index, setLines, true, true),
        },
        {
          text: alertInfo.oldYin,
          onPress: () => changeTargetLine(index, setLines, false, false),
        },
        {
          text: alertInfo.oldYang,
          onPress: () => changeTargetLine(index, setLines, false, true),
        },
        {
          text: alertInfo.cancel,
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
}

function HexagramDisplayEditable({
  lines,
  setLines,
  lineHeight = 40,
  lineMargin = 10,
  showSequence = false,
  showChange = false,
  showError = false,
}: {
  lines: HexagramLinesOptional;
  setLines: Dispatch<SetStateAction<HexagramLinesOptional>>;
  lineHeight?: number;
  lineMargin?: number;
  showSequence?: boolean;
  showChange?: boolean;
  showError?: boolean;
}) {
  const { t } = useTranslation("ToolsStack");
  const alertInfo = {
    title: t("ToolManual.alert.title"),
    message: t("ToolManual.alert.message"),
    youngYin: t("ToolManual.alert.youngYin"),
    youngYang: t("ToolManual.alert.youngYang"),
    oldYin: t("ToolManual.alert.oldYin"),
    oldYang: t("ToolManual.alert.oldYang"),
    cancel: t("cancel"),
  };

  return (
    <View style={styles.container}>
      {lines
        .map((line, index) => (
          <Pressable
            key={index}
            onPress={createManualLineAlert(index, setLines, alertInfo)}
          >
            {line ? (
              <LineDisplay
                line={line}
                height={lineHeight}
                margin={lineMargin}
                sequence={showSequence ? index + 1 : undefined}
                showChange={showChange}
              />
            ) : (
              <EmptyLineDisplay
                height={lineHeight}
                margin={lineMargin}
                sequence={showSequence ? index + 1 : undefined}
                showError={showError}
              />
            )}
          </Pressable>
        ))
        .reverse()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});

export default HexagramDisplayEditable;
