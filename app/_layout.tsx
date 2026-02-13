import { initDatabase } from "@/app/database/db";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    initDatabase();
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen */}
      {/* name="create-exercise-page" */}
      {/* options={{ headerShown: false }} */}
      {/* /> */}
    </Stack>
  );
}
