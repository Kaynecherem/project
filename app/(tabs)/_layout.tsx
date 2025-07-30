import { Tabs } from 'expo-router';
import { MessageCircle, Grid3x3 as Grid3X3, Hash, User, Plus } from 'lucide-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function TabLayout() {
  const handleCreatePress = () => {
    router.push('/create');
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#8B7355',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Messages',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: 'Listings',
          tabBarIcon: ({ size, color }) => (
            <Grid3X3 size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Plus size={size} color="#FFFFFF" strokeWidth={2} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={styles.createButton}
              onPress={handleCreatePress}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ size, color }) => (
            <Hash size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    height: 80,
    paddingHorizontal: 4,
  },
  tabBarLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 2,
  },
  tabBarIcon: {
    marginBottom: 2,
  },
  createButton: {
    top: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B7355',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});