import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';

export default function CreateTabScreen() {
  // This tab should redirect to the create modal
  return <Redirect href="/create" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
    justifyContent: 'center',
    alignItems: 'center',
  },
});