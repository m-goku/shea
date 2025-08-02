import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import Farmer from "@/db/model";

export const ListCard = ({ data }: { data: Farmer }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.card}
      key={data.id}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/(home)/transaction",
          params: {
            id: data._raw.id,
            name: data.name,
            community: data.community,
            preFinance: data.prefinance,
            ballance: data.balance,
            nationalId: data.nationalId,
          },
        })
      }
    >
      <View style={styles.initials}>
        <Text style={[styles.initialText, { fontFamily: "PoppinsSemiBold" }]}>
          {data.name.split("")[0]}
        </Text>
      </View>
      <Text style={[styles.cardText, { fontFamily: "Poppins" }]}>
        {data.name.replace(/\s+/g, "    ").trim()}
      </Text>
    </TouchableOpacity>
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
    elevation:1
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
});
