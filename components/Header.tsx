import { COLORS } from "@/constants/Colors";
import { SCREEN } from "@/constants/Screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Header({
  title,
  allowBack,
}: {
  title: string;
  allowBack?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: COLORS.green.dark,
      }}
    >
      <View style={styles.main}>
        {allowBack && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
        )}
        <Image
          source={require("../assets/images/gwi.png")}
          style={{ height: 60, width: 70 }}
        />
        <Text style={[styles.title, { fontFamily: "Poppins" }]}>{title}</Text>
        <StatusBar
          backgroundColor={COLORS.green.dark}
          barStyle={"light-content"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: COLORS.green.dark,
    flexDirection: "row",
    width: SCREEN.width,
    height: SCREEN.height * 0.08,
    alignItems: "center",
    paddingHorizontal: 10,
    //marginTop: StatusBar.currentHeight,
    //flex: 1,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
});
