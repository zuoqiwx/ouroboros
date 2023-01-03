import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RecordsPage from "./Records";
import RecordDetailsPage from "./RecordDetail";

const Stack = createNativeStackNavigator();

function RecordsStack() {
  return (
    <Stack.Navigator initialRouteName="Records/Summary">
      <Stack.Screen
        name="Records"
        component={RecordsPage}
        options={{
          title: "Saved Records",
        }}
      />
      <Stack.Screen
        name="RecordDetails"
        component={RecordDetailsPage}
        options={{
          title: "Record Details",
        }}
      />
    </Stack.Navigator>
  );
}

export default RecordsStack;
