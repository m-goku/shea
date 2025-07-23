import { COLORS } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.gray.extraDeep,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="(receipts)"
        options={{
          title: "Receipts",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="receipt-outline"
              size={30}
              color={focused ? COLORS.gray.extraDeep : COLORS.gray.normal}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={30}
              color={focused ? COLORS.gray.extraDeep : COLORS.gray.normal}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={30}
              color={focused ? COLORS.gray.extraDeep : COLORS.gray.normal}
            />
          ),
        }}
      />
    </Tabs>
  );
}
