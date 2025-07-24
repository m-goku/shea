import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import { Data } from "@/db/data";

export const ListCard = ({ data }: { data: Data }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.card}
      key={data.id}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/(home)/transaction",
          params: {
            id: data.id,
            name: data.name,
            community: data.community,
            preFinance: data.preFinance,
            ballance: data.ballance,
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
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: SCREEN.width * 0.9,
    height: 50,
    backgroundColor: COLORS.gray.light,
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
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
