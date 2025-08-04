import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { deleteFarmer } from "@/db/crud";
import Farmer from "@/db/model";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { AlertModal } from "../AlertModal";

export const ManageCard = ({ data }: { data: Farmer }) => {
  async function handleDelete(id: string) {
    await deleteFarmer(id);
    router.push("/(tabs)/(admin)/list");
  }

  function handleUpdate() {
    router.push({
      pathname: "/(tabs)/(admin)/edit",
      params: {
        id: data._raw.id,
        name: data.name,
        community: data.community,
        preFinance: data.prefinance,
        ballance: data.balance,
        nationalId: data.nationalId,
      },
    });
  }

  return (
    <>
      <View style={styles.card} key={data.id}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.initials}>
            <Text
              allowFontScaling={false}
              style={[styles.initialText, { fontFamily: "PoppinsSemiBold" }]}
            >
              {data.name.split("")[0]}
            </Text>
          </View>
          <Text
            allowFontScaling={false}
            style={[styles.cardText, { fontFamily: "Poppins" }]}
          >
            {data.name.slice(0, 20).replace(/\s+/g, "  ").trim()}
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              AlertModal({
                title: "Edit",
                message: `Do you want to Edit ${data.name}'s Profile?`,
                onYes: () => handleUpdate(),
                onNo: () => {},
              });
            }}
          >
            <AntDesign name="edit" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AlertModal({
                title: "Delete",
                message: `Do you want to Delete ${data.name}'s Profile?`,
                onYes: () => handleDelete(data._raw.id),
                onNo: () => {},
              });
            }}
          >
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: SCREEN.width * 0.9,
    height: 50,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
  },

  cardText: {
    fontSize: 20,
  },
  initials: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray.extraLight,
    marginRight: 10,
  },
  initialText: {
    fontSize: 20,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
