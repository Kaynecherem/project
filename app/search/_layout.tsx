import { Stack } from 'expo-router';

export default function SearchLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="messages" />
      <Stack.Screen name="listings" />
      <Stack.Screen name="directory" />
    </Stack>
  );
}