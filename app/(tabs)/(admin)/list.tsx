import { ManageCard } from "@/components/ui/ManageList";
import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { getAllFarmers } from "@/db/crud";
import Farmer from "@/db/model";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";



export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Farmer[]>([]);

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
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
       
      }}
    >
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
        contentContainerStyle={{ alignItems: "center" }}
        data={filteredFarmers}
        renderItem={(item) => <ManageCard data={item.item} />}
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
    marginTop:40
  },
});
