import React, { useCallback, useState } from "react";
import {
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Header from "@/components/Header";
import { ListCard } from "@/components/ui/ListCard";
import { PlainWrapper } from "@/components/ui/wrappers/PlainWrapper";
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
    getData();
  });

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

  const filteredFarmers = data
    .filter(
      (farmer) =>
        farmer.name.toLowerCase().includes(search.toLowerCase()) ||
        farmer.community.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 30)
    .sort((a, b) => a.name.localeCompare(b.name));
  //const displayData = filteredFarmers.slice(0, 30);
  return (
    <PlainWrapper>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: COLORS.gray.extraLight,
        }}
      >
        <Header title="Home" />
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          placeholder="Search by name or community"
          value={search}
          onChangeText={setSearch}
        />
        {filteredFarmers.length == 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins",
                fontSize: 20,
                color: COLORS.gray.deep,
              }}
            >
              No Data{" "}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins",
                fontSize: 20,
                color: COLORS.gray.deep,
              }}
            >
              Go To Admin & Sync With Database
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
            data={filteredFarmers}
            renderItem={(item) => <ListCard data={item.item} />}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        )}
      </View>
    </PlainWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    width: SCREEN.width * 0.9,
    height: 50,
    borderColor: COLORS.green.dark,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 5,
    backgroundColor: "white",
  },
});
