import React from "react";
import { StyleSheet, Text } from "react-native";

export default function StatusText({
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
          color:
            value == "pending"
              ? "red"
              : value == "progress"
              ? "orange"
              : "green",
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
    fontSize: 16,
    color: "black",
  },
});
