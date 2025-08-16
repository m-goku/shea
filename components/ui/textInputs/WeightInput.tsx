import { COLORS } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function WeightInput({
  value,
  handleChange,
}: {
  value: any;
  handleChange: any;
}) {
  return (
    <View style={styles.inputView}>
      <TextInput
        allowFontScaling={false}
        style={[styles.input, { fontFamily: "PoppinsSemiBold" }]}
        //keyboardType="numeric"
        value={value}
        onChangeText={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    // height: 50,
    width: 100,
    backgroundColor: COLORS.gray.extraLight,
    fontSize: 20,
    marginLeft: 10,
    borderRadius: 10,
    color: "black",
  },
  inputView: {
    // height: 60,
    width: 130,
    backgroundColor: COLORS.gray.extraLight,
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
