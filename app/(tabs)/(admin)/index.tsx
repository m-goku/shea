import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DATA } from "@/db/data";
import { database } from "@/db/db";
import { writeManyFarmers } from "@/db/loadData";
import { resetFarmers } from "@/db/reset";
import { syncDatabase } from "@/db/syncData";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";



 //await createFarmer(prepared);
    
    

export default function SettingsPage() {
  async function handleSync() {
    console.log("syncing..");
    await syncDatabase(database);
  }

  async function handleLoad() {
    try {
      await writeManyFarmers(DATA);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("DATA LOADED SUCCESSFULLY");
    }
  }
  async function handleDelete() {
    try {
     await resetFarmers();
    } catch (err) {
      console.log(err);
    } finally {
      console.log("DATA DELETED SUCCESSFULLY");
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <TouchableOpacity
          style={styles.options}
          activeOpacity={0.8}
          onPress={() => handleSync()}
        >
          <FontAwesome5 name="sync-alt" size={24} color="black" />
          <Text style={[styles.text, { fontFamily: "Poppins" }]}>
            Sync with Database
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.options}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/(admin)/list")}
        >
          <Feather name="users" size={24} color="black" />
          <Text style={[styles.text, { fontFamily: "Poppins" }]}>
            Manage Data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.options}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/(admin)/weight")}
        >
          <FontAwesome6 name="weight-scale" size={24} color="black" />
          <Text style={[styles.text, { fontFamily: "Poppins" }]}>
            Set Weight (Kg)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.options}
          activeOpacity={0.8}
          onPress={() => handleLoad()}
        >
       
          <Text style={[styles.text, { fontFamily: "Poppins" }]}>
            Load
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.options}
          activeOpacity={0.8}
          onPress={() => handleDelete()}
        >
        
          <Text style={[styles.text, { fontFamily: "Poppins" }]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: "white",
  },
  options: {
    flexDirection: "row",
    width: SCREEN.width * 0.9,
    height: 70,
    backgroundColor: COLORS.gray.extraLight,
    alignItems: "center",
    gap: 20,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
  },
});
