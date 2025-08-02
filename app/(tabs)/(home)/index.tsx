import React, { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

import { ListCard } from "@/components/ui/ListCard";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { getAllFarmers } from "@/db/crud";
import Farmer from "@/db/model";
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Farmer[]>([]);

  // async function getData() {
  //   const farmer = await getAllFarmers();
  //   setData(farmer);
  //   //console.log(farmer);
  // }

  useFocusEffect(() => {
    //LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
      const getData = async () => {
        const farmer = await getAllFarmers();
        setData(farmer);
      };
      getData()
  });

  

  const filteredFarmers = data
    .filter(
      (farmer) =>
        farmer.name.toLowerCase().includes(search.toLowerCase()) ||
        farmer.community.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 30)
    .sort((a, b) => a.name.localeCompare(b.name));
    ;
  //const displayData = filteredFarmers.slice(0, 30);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <TextInput
        style={styles.input}
        placeholder="Search by name or community"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        data={filteredFarmers}
        renderItem={(item) => <ListCard data={item.item} />}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width : SCREEN.width * 0.9,
    height: 50,
    borderColor: COLORS.gray.deep,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 60,
  },
});
