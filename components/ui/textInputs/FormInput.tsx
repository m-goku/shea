import { COLORS } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function FormInput({
  label,
  onChangeText,
  onBlur,
  value,
  numeric,
}: {
  label: string;
  onChangeText: any;
  onBlur: any;
  value: string;
  numeric?: boolean;
}) {
  return (
    <View>
      <Text
        allowFontScaling={false}
        style={[styles.label, { fontFamily: "Poppins" }]}
      >
        {label}
      </Text>
      <TextInput
        keyboardType={numeric ? "numeric" : "default"}
        allowFontScaling={false}
        placeholder={label}
        style={[styles.input, { fontFamily: "Poppins" }]}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.green.dark,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: COLORS.green.dark,
  },
});
