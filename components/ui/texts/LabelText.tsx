import React from "react";
import { StyleSheet, Text } from "react-native";

export default function LabelText({ label }: { label: string }) {
  return (
    <Text
      allowFontScaling={false}
      style={[styles.label, { fontFamily: "Poppins" }]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    color: "black",
  },
});
