import { getFromLocalStore, saveToLocalStore } from "@/db/asyncStore";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, BackHandler, StyleSheet, View } from "react-native";
import LargeButton from "./buttons/LargeButton";
import FormInput from "./textInputs/FormInput";
import { PlainWrapper } from "./wrappers/PlainWrapper";

export default function NameScreen() {
  const [name, setName] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          // Block back button on this screen
          return true;
        }
      );

      return () => backHandler.remove(); // ✅ correct cleanup
    }, [])
  );

  //   async function handleSave(name: string) {
  //     try {
  //       // 1. Save to AsyncStorage
  //       await saveToLocalStore("NAME", name);

  //       // 2. Read back the value
  //       const n = await getFromLocalStore("NAME");
  //       console.log(n);
  //       // 3. Check if value is set and not empty
  //       if (typeof n === "string" && n.trim() !== "") {
  //         // Navigate to home
  //         console.log("navigate");
  //         router.navigate("/(tabs)");
  //       } else {
  //         // Show error alert
  //         Alert.alert("Sorry", "Name must be set", [{ text: "OK" }]);
  //       }
  //     } catch (error) {
  //       console.error("Error saving name:", error);
  //       Alert.alert("Error", "Something went wrong. Please try again.");
  //     }
  //   }

  async function handleSave(name: string) {
    try {
      await saveToLocalStore("NAME", name);

      const n = await getFromLocalStore("NAME");
      //console.log(n);

      if (typeof n === "string" && n.trim() !== "") {
        //console.log("navigate");
        router.replace("/(tabs)/(admin)"); // ✅ navigate to actual tab page
      } else {
        Alert.alert("Sorry", "Name must be set", [{ text: "OK" }]);
      }
    } catch (error) {
      console.error("Error saving name:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  }

  return (
    <PlainWrapper>
      <View style={styles.main}>
        <FormInput
          label="Enter Your Name To Continue"
          value={name as string}
          onChangeText={setName}
        />
        <View style={styles.container}>
          <LargeButton
            name="Save & Continue"
            onPress={() => handleSave(name)}
          />
        </View>
      </View>
    </PlainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});
