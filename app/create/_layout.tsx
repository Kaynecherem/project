import { Stack } from 'expo-router';

export default function CreateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="listing" />
      <Stack.Screen name="thread" />
      <Stack.Screen name="message" />
    </Stack>
  );
}