import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function LargeButton({
  prop,
  name,
  onPress,
}: {
  prop?: any;
  name: string;
  onPress: any;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor:
            prop <= 0 ? COLORS.gray.extraDeep : COLORS.green.dark,
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={prop <= 0}
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
    width: SCREEN.width * 0.9,
    height: SCREEN.height * 0.06,
    borderRadius: 25,
    marginTop: 10,
    elevation: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
