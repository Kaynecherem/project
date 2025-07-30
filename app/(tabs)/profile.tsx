import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Settings, 
  Bell, 
  Shield, 
  Users, 
  Star, 
  TrendingUp, 
  DollarSign,
  LogOut,
  Crown,
  Eye,
  EyeOff,
  MapPin,
  Calendar
} from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const userProfile = {
    name: 'Marcus Chen',
    avatar: 'MC',
    location: 'New York, NY',
    joinedDate: 'March 2019',
    subscription: 'Premium',
    rating: 4.9,
    totalDeals: 147,
    vouchers: 23,
    earnings: 2450000,
    isVerified: true,
    specialties: ['Rolex', 'Tudor', 'Omega', 'Vintage'],
  };

  const handleSignOut = () => {
    console.log('Sign out initiated');
    // Clear any stored authentication data here
    // For now, just navigate to login
    try {
      router.replace('/login');
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation
      router.push('/login');
    }
  };

  const handleSettingPress = (setting: string) => {
    console.log('Setting pressed:', setting);
    
    switch (setting) {
      case 'Sign Out':
        setShowSignOutConfirm(true);
        break;
      case 'Invite Dealers':
        console.log('Invite Dealers functionality would be implemented here');
        break;
      case 'My Vouchers':
        console.log('Vouchers management would be implemented here');
        break;
      case 'Billing & Subscription':
        console.log('Subscription management would be implemented here');
        break;
      case 'App Settings':
        console.log('App settings would be implemented here');
        break;
      case 'Privacy Policy':
        console.log('Privacy policy would be implemented here');
        break;
      default:
        console.log('Unknown setting:', setting);
        break;
    }
  };

  const settingSections = [
    {
      title: 'Account',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          type: 'toggle',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: profileVisible ? Eye : EyeOff,
          label: 'Profile Visibility',
          type: 'toggle',
          value: profileVisible,
          onToggle: setProfileVisible,
        },
        {
          icon: Shield,
          label: 'Read Receipts',
          type: 'toggle',
          value: readReceiptsEnabled,
          onToggle: setReadReceiptsEnabled,
        },
      ],
    },
    {
      title: 'Business',
      items: [
        {
          icon: Users,
          label: 'Invite Dealers',
          type: 'navigation',
          onPress: () => handleSettingPress('Invite Dealers'),
        },
        {
          icon: Star,
          label: 'My Vouchers',
          type: 'navigation',
          onPress: () => handleSettingPress('My Vouchers'),
        },
        {
          icon: DollarSign,
          label: 'Billing & Subscription',
          type: 'navigation',
          onPress: () => handleSettingPress('Billing & Subscription'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: Settings,
          label: 'App Settings',
          type: 'navigation',
          onPress: () => handleSettingPress('App Settings'),
        },
        {
          icon: Shield,
          label: 'Privacy Policy',
          type: 'navigation',
          onPress: () => handleSettingPress('Privacy Policy'),
        },
        {
          icon: LogOut,
          label: 'Sign Out',
          type: 'navigation',
          isDestructive: true,
          onPress: () => handleSettingPress('Sign Out'),
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => (
    <TouchableOpacity 
      key={index} 
      style={styles.settingItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, item.isDestructive && styles.destructiveIcon]}>
          <item.icon 
            size={18} 
            color={item.isDestructive ? "#e53e3e" : "#8892b0"} 
            strokeWidth={2}
          />
        </View>
        <Text style={[styles.settingLabel, item.isDestructive && styles.destructiveText]}>
          {item.label}
        </Text>
      </View>
      
      {item.type === 'toggle' && (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#2d3748', true: '#d69e2e' }}
          thumbColor={item.value ? '#ffffff' : '#8892b0'}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userProfile.avatar}</Text>
            </View>
            {userProfile.isVerified && (
              <View style={styles.verifiedBadge}>
                <Shield size={14} color="#ffffff" />
              </View>
            )}
            {userProfile.subscription === 'Premium' && (
              <View style={styles.premiumBadge}>
                <Crown size={12} color="#d69e2e" />
              </View>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#8892b0" />
              <Text style={styles.location}>{userProfile.location}</Text>
            </View>
            <View style={styles.joinedRow}>
              <Calendar size={14} color="#8892b0" />
              <Text style={styles.joinedText}>Member since {userProfile.joinedDate}</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Star size={20} color="#d69e2e" fill="#d69e2e" />
            </View>
            <Text style={styles.statValue}>{userProfile.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <TrendingUp size={20} color="#38a169" />
            </View>
            <Text style={styles.statValue}>{userProfile.totalDeals}</Text>
            <Text style={styles.statLabel}>Deals</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Users size={20} color="#d69e2e" />
            </View>
            <Text style={styles.statValue}>{userProfile.vouchers}</Text>
            <Text style={styles.statLabel}>Vouchers</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <DollarSign size={20} color="#38a169" />
            </View>
            <Text style={styles.statValue}>
              ${(userProfile.earnings / 1000000).toFixed(1)}M
            </Text>
            <Text style={styles.statLabel}>Volume</Text>
          </View>
        </View>

        {/* Specialties */}
        <View style={styles.specialtiesCard}>
          <Text style={styles.cardTitle}>Specialties</Text>
          <View style={styles.specialties}>
            {userProfile.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsList}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <LogOut size={24} color="#e53e3e" />
              <Text style={styles.modalTitle}>Sign Out</Text>
            </View>
            
            <Text style={styles.modalMessage}>
              Are you sure you want to sign out of your account?
            </Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowSignOutConfirm(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalConfirmButton}
                onPress={handleSignOut}
                activeOpacity={0.7}
              >
                <Text style={styles.modalConfirmText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E1',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#A8D8AD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F5F0E1',
  },
  premiumBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F5F0E1',
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  joinedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  joinedText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    alignItems: 'center',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  specialtiesCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 12,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyTag: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  specialtyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  settingSection: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  settingsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destructiveIcon: {
    backgroundColor: 'rgba(229, 115, 115, 0.1)',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  destructiveText: {
    color: '#E57373',
  },
  bottomSpacing: {
    height: 40,
  },
  // Modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 24,
    marginHorizontal: 40,
    minWidth: 280,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: '#E57373',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});