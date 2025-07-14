import { Stack } from "expo-router";

import React from "react";

export default function HomeRoutes() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="transaction" options={{ headerShown: false }} />
        <Stack.Screen name="receipt" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
