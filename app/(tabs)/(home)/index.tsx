import { ScreenWrapper } from "@/components/ScreenWrapper";
import { DATA } from "@/db/data";
import React, { useEffect, useState } from "react";
import { FlatList, LogBox, StyleSheet, TextInput } from "react-native";

import { ListCard } from "@/components/ui/ListCard";
import { COLORS } from "@/constants/Colors";

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
      <TextInput
        style={styles.input}
        placeholder="Search by name or community"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        style={{ flex: 1 }}
        data={filteredFarmers}
        renderItem={(item) => <ListCard data={item.item} />}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: COLORS.gray.deep,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 10,
  },
});
