import { Stack } from "expo-router";

import React from "react";

export default function AdminRoutes() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="list" options={{ headerShown: false }} />
        <Stack.Screen name="add" options={{ headerShown: false }} />
        <Stack.Screen name="edit" options={{ headerShown: false }} />
        <Stack.Screen name="weight" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
