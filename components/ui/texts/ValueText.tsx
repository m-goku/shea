import React from "react";
import { StyleSheet, Text } from "react-native";

export default function ValueText({
  value,
  label,
}: {
  value: string | number;
  label?: string;
}) {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.value,
        {
          color: label == "Balance (GH₵):" ? "red" : "black",
          fontFamily: "PoppinsSemiBold",
        },
      ]}
    >
      {value}{" "}
    </Text>
  );
}

const styles = StyleSheet.create({
  value: {
    fontSize: 20,
    color: "black",
  },
});
