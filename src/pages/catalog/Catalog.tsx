import React, { useRef } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import HexagramDisplay from "../../components/HexagramDisplay";
import { Hexagram } from "../../logics/models";

import analysisList from "../../constants/analysis";
import type { CatalogStackScreenProps } from "../../@types/navigation";

function CatalogPage({ navigation }: CatalogStackScreenProps<"Catalog">) {
  const hexagrams = useRef(
    [...Array(64).keys()].map((index) => Hexagram.fromIndex(index))
  );
  return (
    <ScrollView style={styles.container}>
      {[...Array(64).keys()].map((index) => (
        <Pressable
          key={index}
          style={styles.row}
          onPress={() =>
            navigation.navigate("CatalogAnalysis", {
              hexagram: hexagrams.current[index],
              showChange: true,
              showChangeSection: true,
            })
          }
        >
          <View style={styles.hexagramContainer}>
            <HexagramDisplay
              hexagram={hexagrams.current[index]}
              lineHeight={5}
              lineMargin={1}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{analysisList[index].name}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    flexDirection: "column",
  },
  row: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 50,
    marginVertical: 4,
  },
  hexagramContainer: {
    flex: 2,
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 30,
  },
  textContainer: {
    flex: 4,
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 30,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
  },
});

export default CatalogPage;
