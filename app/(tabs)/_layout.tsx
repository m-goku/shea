import { COLORS } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        headerShown: false,
        animation: "none",
        tabBarActiveTintColor: COLORS.green.dark,
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
        name="index"
        options={{
          href: null,
          title: "Index",
        }}
      />
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={30}
              color={focused ? COLORS.green.dark : COLORS.gray.normal}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(receipts)"
        options={{
          title: "Receipts",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "receipt" : "receipt-outline"}
              size={30}
              color={focused ? COLORS.green.dark : COLORS.gray.normal}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(admin)"
        options={{
          title: "Admin",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={30}
              color={focused ? COLORS.green.dark : COLORS.gray.normal}
            />
          ),
        }}
      />
    </Tabs>
  );
}
