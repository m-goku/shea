import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import WeightInput from "@/components/ui/textInputs/WeightInput";
import LabelText from "@/components/ui/texts/LabelText";
import ValueText from "@/components/ui/texts/ValueText";
import { PlainWrapper } from "@/components/ui/wrappers/PlainWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function weight() {
  const [input, setInput] = useState("");
  const [price, setPrice] = useState(0);

  async function handleGet() {
    const num = await getNumber();

    if (!isNaN(num)) {
      setPrice(num); // Replace this with your calculation
    } else {
      setPrice(0);
    }
  }

  const handleChange = async (text: string) => {
    setInput(text);
  };

  async function handleSave() {
    try {
      await saveNumber(parseFloat(input));
    } finally {
      Alert.alert("Saved", "Price has been updated!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  useEffect(() => {
    handleGet();
  }, [input]);

  const STORAGE_KEY = "MY_NUMBER_VALUE";

  const saveNumber = async (value: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value.toString());
      console.log("saved to storage");
    } catch (error) {
      console.error("Failed to save number:", error);
    }
  };

  const getNumber = async (): Promise<number> => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      return value ? parseFloat(value) : 0;
    } catch (error) {
      console.error("Failed to get number:", error);
      return 0;
    }
  };

  return (
    <PlainWrapper>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <View style={styles.container2}>
          <View style={[styles.kg, { gap: 30 }]}>
            <LabelText label="Price Per Kg (GH₵):" />
            <ValueText value={price} />
          </View>
          <View style={[styles.kg, { marginTop: 20 }]}>
            <LabelText label="New Price (GH₵):" />
            <WeightInput handleChange={handleChange} value={input} />
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => handleSave()}
          >
            <Text allowFontScaling={false} style={styles.buttonText}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </PlainWrapper>
  );
}

const styles = StyleSheet.create({
  container2: {
    width: SCREEN.width * 0.9,
    //height: SCREEN.height * 0.2,
    backgroundColor: COLORS.gray.light,
    borderRadius: 10,
    marginTop: 150,
    elevation: 1,
    padding: 25,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    color: "black",
  },
  value: {
    fontSize: 23,
    color: "black",
  },
  input: {
    width: 100,
    backgroundColor: "white",
    fontSize: 25,
    marginLeft: 10,
    borderRadius: 10,
    color: "black",
  },
  inputView: {
    // height: 60,
    width: 130,
    backgroundColor: "white",
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  kg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "600",
    color: "white",
  },
  button: {
    width: SCREEN.width * 0.5,
    height: SCREEN.height * 0.06,
    borderRadius: 15,
    marginTop: 10,
    elevation: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.green.dark,
  },
});
