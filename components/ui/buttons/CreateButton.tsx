import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CreateButton({
  isValid,
  dirty,
  onPress,
  name,
}: {
  isValid: boolean;
  dirty: boolean;
  onPress: any;
  name: string;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: COLORS.green.dark,
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!isValid || !dirty}
    >
      <Text
        allowFontScaling={false}
        style={[styles.buttonText, { fontFamily: "PoppinsSemiBold" }]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  button: {
    width: SCREEN.width * 0.85,
    height: SCREEN.height * 0.06,
    borderRadius: 25,
    marginTop: 10,
    elevation: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
