import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Hash,
  Users,
  Search,
  Crown,
  Plus,
  UserPlus,
  Settings
} from 'lucide-react-native';

interface CreateOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  action: () => void;
  premium?: boolean;
}

interface Dealer {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  isVerified: boolean;
  lastSeen?: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPremium: boolean;
  isJoined: boolean;
}

export default function CreateMessageScreen() {
  const [activeTab, setActiveTab] = useState<'options' | 'dealers' | 'groups'>('options');
  const [searchQuery, setSearchQuery] = useState('');

  const dealers: Dealer[] = [
    {
      id: '1',
      name: 'Marcus Chen',
      avatar: 'MC',
      isOnline: true,
      isVerified: true,
    },
    {
      id: '2',
      name: 'Sarah Williams',
      avatar: 'SW',
      isOnline: false,
      isVerified: true,
      lastSeen: '2h ago',
    },
    {
      id: '3',
      name: 'David Rodriguez',
      avatar: 'DR',
      isOnline: true,
      isVerified: true,
    },
    {
      id: '4',
      name: 'Emma Thompson',
      avatar: 'ET',
      isOnline: false,
      isVerified: true,
      lastSeen: '1d ago',
    },
  ];

  const groups: Group[] = [
    {
      id: '1',
      name: 'Rolex Dealers',
      description: 'Premium group for verified Rolex dealers',
      memberCount: 247,
      isPremium: true,
      isJoined: true,
    },
    {
      id: '2',
      name: 'Audemars Piguet',
      description: 'Discussion for AP collectors and dealers',
      memberCount: 189,
      isPremium: true,
      isJoined: true,
    },
    {
      id: '3',
      name: 'Vintage Collectors',
      description: 'For vintage watch enthusiasts',
      memberCount: 156,
      isPremium: false,
      isJoined: false,
    },
    {
      id: '4',
      name: 'General Discussion',
      description: 'Open discussion for all members',
      memberCount: 423,
      isPremium: false,
      isJoined: true,
    },
    {
      id: '5',
      name: 'Reference Check',
      description: 'Community verification for high-value deals',
      memberCount: 156,
      isPremium: false,
      isJoined: true,
    },
  ];

  const createOptions: CreateOption[] = [
    {
      id: 'new-dm',
      title: 'New Direct Message',
      description: 'Start a private conversation with a dealer',
      icon: MessageCircle,
      color: '#3182ce',
      action: () => setActiveTab('dealers'),
    },
    {
      id: 'join-group',
      title: 'Join Group',
      description: 'Browse and join existing groups',
      icon: Hash,
      color: '#38a169',
      action: () => setActiveTab('groups'),
    },
    {
      id: 'create-group',
      title: 'Create Group',
      description: 'Start a new group for discussions',
      icon: Plus,
      color: '#d69e2e',
      action: () => handleCreateGroup(),
      premium: true,
    },
    {
      id: 'invite-dealer',
      title: 'Invite Dealer',
      description: 'Invite a verified dealer to join',
      icon: UserPlus,
      color: '#805ad5',
      action: () => handleInviteDealer(),
      premium: true,
    },
  ];

  const handleBack = () => {
    if (activeTab !== 'options') {
      setActiveTab('options');
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/(tabs)');
      }
    }
  };

  const handleCreateGroup = () => {
    Alert.alert('Create Group', 'Group creation functionality would be implemented here');
  };

  const handleInviteDealer = () => {
    Alert.alert('Invite Dealer', 'Dealer invitation functionality would be implemented here');
  };

  const handleDealerPress = (dealer: Dealer) => {
    router.push({
      pathname: '/chat/[id]',
      params: { 
        id: dealer.id,
        name: dealer.name,
        avatar: dealer.avatar,
        isOnline: dealer.isOnline ? 'true' : 'false'
      }
    });
  };

  const handleGroupPress = (group: Group) => {
    if (group.isJoined) {
      if (group.name === 'Reference Check') {
        router.push('/channel/reference-check');
      } else {
        router.push({
          pathname: '/channel/[id]',
          params: { 
            id: group.id,
            name: group.name,
            isPremium: group.isPremium ? 'true' : 'false'
          }
        });
      }
    } else {
      Alert.alert('Join Group', `Would you like to join ${group.name}?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Join', onPress: () => console.log('Joining group...') }
      ]);
    }
  };

  const filteredDealers = dealers.filter(dealer =>
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCreateOption = (option: CreateOption) => (
    <TouchableOpacity 
      key={option.id}
      style={[styles.optionCard, { borderLeftColor: option.color }]}
      onPress={option.action}
    >
      <View style={styles.optionHeader}>
        <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
          <option.icon size={24} color={option.color} strokeWidth={2} />
        </View>
        {option.premium && (
          <View style={styles.premiumBadge}>
            <Crown size={12} color="#d69e2e" />
          </View>
        )}
      </View>
      
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{option.title}</Text>
        <Text style={styles.optionDescription}>{option.description}</Text>
      </View>
      
      <View style={styles.optionArrow}>
        <Text style={styles.arrowText}>→</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDealer = (dealer: Dealer) => (
    <TouchableOpacity 
      key={dealer.id}
      style={styles.dealerCard}
      onPress={() => handleDealerPress(dealer)}
    >
      <View style={styles.dealerHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{dealer.avatar}</Text>
          </View>
          {dealer.isOnline && <View style={styles.onlineIndicator} />}
          {dealer.isVerified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓</Text>
            </View>
          )}
        </View>
        
        <View style={styles.dealerInfo}>
          <Text style={styles.dealerName}>{dealer.name}</Text>
          <Text style={styles.dealerStatus}>
            {dealer.isOnline ? 'Online' : `Last seen ${dealer.lastSeen}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGroup = (group: Group) => (
    <TouchableOpacity 
      key={group.id}
      style={styles.groupCard}
      onPress={() => handleGroupPress(group)}
    >
      <View style={styles.groupHeader}>
        <View style={styles.groupIcon}>
          <Hash size={20} color="#d69e2e" />
          {group.isPremium && (
            <Crown size={12} color="#d69e2e" style={styles.groupPremiumIcon} />
          )}
        </View>
        
        <View style={styles.groupInfo}>
          <View style={styles.groupNameRow}>
            <Text style={styles.groupName}>{group.name}</Text>
            {group.isJoined && (
              <View style={styles.joinedBadge}>
                <Text style={styles.joinedText}>Joined</Text>
              </View>
            )}
          </View>
          <Text style={styles.groupDescription}>{group.description}</Text>
          <View style={styles.groupMeta}>
            <Users size={12} color="#8892b0" />
            <Text style={styles.memberCount}>{group.memberCount} members</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'dealers': return 'Start Conversation';
      case 'groups': return 'Browse Groups';
      default: return 'New Message';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
          <Text style={styles.headerSubtitle}>
            {activeTab === 'options' && 'Choose how to start messaging'}
            {activeTab === 'dealers' && 'Select a dealer to message'}
            {activeTab === 'groups' && 'Find groups to join'}
          </Text>
        </View>
      </View>

      {/* Search Bar (for dealers and groups) */}
      {(activeTab === 'dealers' || activeTab === 'groups') && (
        <View style={styles.searchContainer}>
          <Search size={16} color="#8892b0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={
              activeTab === 'dealers' ? 'Search dealers...' : 'Search groups...'
            }
            placeholderTextColor="#8892b0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'options' && (
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Message Options</Text>
            <View style={styles.optionsGrid}>
              {createOptions.map(renderCreateOption)}
            </View>
          </View>
        )}

        {activeTab === 'dealers' && (
          <View style={styles.dealersSection}>
            <Text style={styles.sectionTitle}>
              {filteredDealers.length} dealers available
            </Text>
            <View style={styles.dealersGrid}>
              {filteredDealers.map(renderDealer)}
            </View>
          </View>
        )}

        {activeTab === 'groups' && (
          <View style={styles.groupsSection}>
            <Text style={styles.sectionTitle}>
              {filteredGroups.length} groups found
            </Text>
            <View style={styles.groupsGrid}>
              {filteredGroups.map(renderGroup)}
            </View>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2332',
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  optionsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  optionsGrid: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    borderLeftWidth: 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionHeader: {
    position: 'relative',
    marginRight: 16,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2d3748',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a2332',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
  },
  optionArrow: {
    marginLeft: 12,
  },
  arrowText: {
    fontSize: 18,
    color: '#8892b0',
    fontFamily: 'Inter-Regular',
  },
  dealersSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dealersGrid: {
    gap: 12,
  },
  dealerCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
  },
  dealerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d69e2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1a2332',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#38a169',
    borderWidth: 2,
    borderColor: '#1a2332',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#38a169',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  dealerStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  groupsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  groupsGrid: {
    gap: 12,
  },
  groupCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2d3748',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  groupPremiumIcon: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  groupInfo: {
    flex: 1,
  },
  groupNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  groupName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  joinedBadge: {
    backgroundColor: '#38a169',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  joinedText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    marginBottom: 8,
    lineHeight: 20,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  memberCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  bottomSpacing: {
    height: 40,
  },
});