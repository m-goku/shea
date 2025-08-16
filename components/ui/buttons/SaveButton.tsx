import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SaveButton({
  handleSave,
  isSaving,
}: {
  handleSave: any;
  isSaving?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={handleSave}
      disabled={isSaving}
    >
      {isSaving ? (
        <Text allowFontScaling={false} style={styles.buttonText}>
          Saving...
        </Text>
      ) : (
        <Text allowFontScaling={false} style={styles.buttonText}>
          Save Receipt
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
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
    backgroundColor: COLORS.green.dark,
  },
});
