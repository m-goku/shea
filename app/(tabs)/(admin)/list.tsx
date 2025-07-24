import { ScreenWrapper } from "@/components/ScreenWrapper";
import { DATA } from "@/db/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  LogBox,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ManageCard } from "@/components/ui/ManageList";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { router } from "expo-router";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const filteredFarmers = DATA.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(search.toLowerCase()) ||
      farmer.community.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <ScreenWrapper>
      <View style={styles.searchView}>
        <TextInput
          style={styles.input}
          placeholder="Search by name or community"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/(admin)/add")}
        >
          <AntDesign name="adduser" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={filteredFarmers}
        renderItem={(item) => <ManageCard data={item.item} />}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: SCREEN.width * 0.7,
    borderColor: COLORS.gray.deep,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  addText: {
    fontSize: 20,
  },
  addButton: {
    height: 50,
    width: SCREEN.width * 0.2,
    backgroundColor: COLORS.green.light,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
});
