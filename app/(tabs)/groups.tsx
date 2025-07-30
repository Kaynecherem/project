import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Hash, Users, Crown, Shield, Star, MessageSquare, Filter } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  activeMembers: number;
  isPremium: boolean;
  isVerified: boolean;
  isJoined: boolean;
  category: 'trading' | 'brands' | 'collecting' | 'general' | 'regional';
  tags: string[];
  recentActivity: string;
  averageRating: number;
  totalThreads: number;
  weeklyMessages: number;
  joinRequirement: 'open' | 'invite' | 'application';
  lastMessage?: string;
  lastMessageTime?: string;
}

export default function GroupsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    { key: 'All', label: '🌐', count: 8 },
    { key: 'Joined', label: '✅', count: 4 },
    { key: 'Premium', label: '👑', count: 5 },
    { key: 'Open', label: '🚪', count: 3 },
    { key: 'Brands', label: '🏷️', count: 4 },
    { key: 'Trading', label: '💰', count: 2 },
  ];

  const groups: Group[] = [
    {
      id: '1',
      name: 'Rolex Dealers',
      description: 'Premium group for verified Rolex dealers. Discuss market trends, share inventory, and connect with serious collectors.',
      memberCount: 247,
      activeMembers: 89,
      isPremium: true,
      isVerified: true,
      isJoined: true,
      category: 'brands',
      tags: ['Rolex', 'Dealers', 'Premium'],
      recentActivity: '2m ago',
      averageRating: 4.9,
      totalThreads: 1247,
      weeklyMessages: 342,
      joinRequirement: 'application',
      lastMessage: 'New GMT Master II available in perfect condition',
      lastMessageTime: '2m ago',
    },
    {
      id: '2',
      name: 'Audemars Piguet',
      description: 'Discussion for AP collectors and dealers with exclusive access to rare pieces and market insights.',
      memberCount: 189,
      activeMembers: 67,
      isPremium: true,
      isVerified: true,
      isJoined: true,
      category: 'brands',
      tags: ['AP', 'Collectors', 'Luxury'],
      recentActivity: '15m ago',
      averageRating: 4.8,
      totalThreads: 892,
      weeklyMessages: 234,
      joinRequirement: 'invite',
      lastMessage: 'Call Out: Royal Oak 15400ST',
      lastMessageTime: '15m ago',
    },
    {
      id: '3',
      name: 'Vintage Collectors',
      description: 'For vintage watch enthusiasts. Share restoration stories, find rare pieces, and learn from experts.',
      memberCount: 156,
      activeMembers: 45,
      isPremium: false,
      isVerified: true,
      isJoined: true,
      category: 'collecting',
      tags: ['Vintage', 'Restoration', 'History'],
      recentActivity: '1h ago',
      averageRating: 4.7,
      totalThreads: 567,
      weeklyMessages: 123,
      joinRequirement: 'open',
      lastMessage: 'Found amazing 1960s Speedmaster',
      lastMessageTime: '1h ago',
    },
    {
      id: '4',
      name: 'Watch Trading Hub',
      description: 'Active marketplace for buying, selling, and trading luxury watches. Verified dealers welcome.',
      memberCount: 423,
      activeMembers: 156,
      isPremium: false,
      isVerified: true,
      isJoined: true,
      category: 'trading',
      tags: ['Trading', 'Marketplace', 'Deals'],
      recentActivity: '5m ago',
      averageRating: 4.6,
      totalThreads: 2134,
      weeklyMessages: 567,
      joinRequirement: 'open',
      lastMessage: 'Basel World 2024 predictions?',
      lastMessageTime: '3h ago',
    },
    {
      id: '5',
      name: 'Patek Philippe Society',
      description: 'Exclusive community for Patek Philippe owners and serious collectors. High-end discussions only.',
      memberCount: 134,
      activeMembers: 52,
      isPremium: true,
      isVerified: true,
      isJoined: false,
      category: 'brands',
      tags: ['Patek', 'Luxury', 'Exclusive'],
      recentActivity: '30m ago',
      averageRating: 4.9,
      totalThreads: 445,
      weeklyMessages: 189,
      joinRequirement: 'application',
    },
    {
      id: '6',
      name: 'NYC Watch Collectors',
      description: 'Local community for New York City watch enthusiasts. Organize meetups and share recommendations.',
      memberCount: 89,
      activeMembers: 34,
      isPremium: false,
      isVerified: false,
      isJoined: false,
      category: 'regional',
      tags: ['NYC', 'Local', 'Meetups'],
      recentActivity: '2h ago',
      averageRating: 4.4,
      totalThreads: 234,
      weeklyMessages: 67,
      joinRequirement: 'open',
    },
    {
      id: '7',
      name: 'Omega Speedmaster Fans',
      description: 'Dedicated to the legendary Speedmaster. From moon watches to limited editions.',
      memberCount: 298,
      activeMembers: 89,
      isPremium: false,
      isVerified: true,
      isJoined: false,
      category: 'brands',
      tags: ['Omega', 'Speedmaster', 'Moon Watch'],
      recentActivity: '45m ago',
      averageRating: 4.5,
      totalThreads: 1089,
      weeklyMessages: 234,
      joinRequirement: 'open',
    },
    {
      id: '8',
      name: 'Watch Investment Club',
      description: 'Analyze market trends, discuss investment strategies, and share insights on watch values.',
      memberCount: 167,
      activeMembers: 67,
      isPremium: true,
      isVerified: true,
      isJoined: false,
      category: 'general',
      tags: ['Investment', 'Analysis', 'Trends'],
      recentActivity: '1h ago',
      averageRating: 4.8,
      totalThreads: 678,
      weeklyMessages: 145,
      joinRequirement: 'application',
    },
  ];

  const handleSearchPress = () => {
    router.push({
      pathname: '/search/groups',
      params: { query: searchQuery }
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
      handleJoinGroup(group);
    }
  };

  const handleJoinGroup = (group: Group) => {
    let message = '';
    let buttonText = '';
    
    switch (group.joinRequirement) {
      case 'open':
        message = `Join ${group.name}? You'll have immediate access to all discussions.`;
        buttonText = 'Join Group';
        break;
      case 'invite':
        message = `${group.name} is invite-only. Request an invitation from current members.`;
        buttonText = 'Request Invite';
        break;
      case 'application':
        message = `${group.name} requires an application. Your request will be reviewed by moderators.`;
        buttonText = 'Apply to Join';
        break;
    }

    Alert.alert(
      group.joinRequirement === 'open' ? 'Join Group' : 'Request Access',
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: buttonText, 
          onPress: () => {
            Alert.alert('Success', 
              group.joinRequirement === 'open' 
                ? `You've joined ${group.name}!`
                : `Your request has been sent to ${group.name} moderators.`
            );
          }
        }
      ]
    );
  };

  const getJoinRequirementColor = (requirement: string) => {
    switch (requirement) {
      case 'open': return '#38a169';
      case 'invite': return '#d69e2e';
      case 'application': return '#e53e3e';
      default: return '#8892b0';
    }
  };

  const getJoinRequirementText = (requirement: string) => {
    switch (requirement) {
      case 'open': return 'Open';
      case 'invite': return 'Invite Only';
      case 'application': return 'Application';
      default: return requirement;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trading': return '💰';
      case 'brands': return '🏷️';
      case 'collecting': return '🎯';
      case 'general': return '💬';
      case 'regional': return '📍';
      default: return '🌐';
    }
  };

  const filteredGroups = groups.filter(group => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Joined') return group.isJoined;
    if (selectedFilter === 'Premium') return group.isPremium;
    if (selectedFilter === 'Open') return group.joinRequirement === 'open';
    if (selectedFilter === 'Brands') return group.category === 'brands';
    if (selectedFilter === 'Trading') return group.category === 'trading';
    return true;
  });

  const renderGroup = (group: Group) => (
    <TouchableOpacity 
      key={group.id}
      style={[styles.groupCard, group.isJoined && styles.joinedGroupCard]}
      onPress={() => handleGroupPress(group)}
    >
      {/* Header */}
      <View style={styles.groupHeader}>
        <View style={styles.groupIconContainer}>
          <View style={styles.groupIcon}>
            <Hash size={20} color="#8B7355" />
          </View>
          {group.isPremium && (
            <Crown size={12} color="#d69e2e" style={styles.premiumIcon} />
          )}
          {group.isVerified && (
            <Shield size={12} color="#38a169" style={styles.verifiedIcon} />
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
          
          <View style={styles.groupMeta}>
            <Text style={styles.categoryText}>{getCategoryIcon(group.category)}</Text>
            <Text style={styles.memberCount}>{group.memberCount} members</Text>
            <Text style={styles.activeMembers}>{group.activeMembers} active</Text>
          </View>
        </View>
        
        <View style={styles.groupStats}>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#d69e2e" fill="#d69e2e" />
            <Text style={styles.ratingText}>{group.averageRating}</Text>
          </View>
          <Text style={styles.activityText}>{group.recentActivity}</Text>
        </View>
      </View>

      {/* Last Message (for joined groups) */}
      {group.isJoined && group.lastMessage && (
        <View style={styles.lastMessageContainer}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {group.lastMessage}
          </Text>
          <Text style={styles.lastMessageTime}>{group.lastMessageTime}</Text>
        </View>
      )}

      {/* Description (for non-joined groups) */}
      {!group.isJoined && (
        <Text style={styles.groupDescription} numberOfLines={2}>
          {group.description}
        </Text>
      )}

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {group.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {group.tags.length > 3 && (
          <Text style={styles.moreTagsText}>+{group.tags.length - 3}</Text>
        )}
      </View>

      {/* Footer */}
      <View style={styles.groupFooter}>
        <View style={styles.footerStats}>
          <View style={styles.footerStat}>
            <MessageSquare size={12} color="#9CA3AF" />
            <Text style={styles.footerStatText}>{group.totalThreads}</Text>
          </View>
          <View style={styles.footerStat}>
            <Users size={12} color="#9CA3AF" />
            <Text style={styles.footerStatText}>{group.weeklyMessages}/week</Text>
          </View>
        </View>
        
        {!group.isJoined && (
          <View style={[
            styles.joinRequirementBadge,
            { backgroundColor: `${getJoinRequirementColor(group.joinRequirement)}20` }
          ]}>
            <Text style={[
              styles.joinRequirementText,
              { color: getJoinRequirementColor(group.joinRequirement) }
            ]}>
              {getJoinRequirementText(group.joinRequirement)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Groups</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleSearchPress}>
            <Search size={20} color="#9CA3AF" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#F5F5F5" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
        <Search size={16} color="#6B7280" style={styles.searchIcon} strokeWidth={1.5} />
        <Text style={styles.searchPlaceholder}>Search groups...</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={16} color="#6B7280" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                selectedFilter === filter.key && styles.filterTabActive
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  selectedFilter === filter.key && styles.filterTabTextActive
                ]}
              >
                {filter.label}
              </Text>
              <Text
                style={[
                  styles.filterCount,
                  selectedFilter === filter.key && styles.filterCountActive
                ]}
              >
                {filter.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Groups List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsText}>
          {filteredGroups.length} groups
          {selectedFilter !== 'All' && ` • ${selectedFilter}`}
        </Text>
        {filteredGroups.map(renderGroup)}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#8B7355',
    borderRadius: 8,
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  filterButton: {
    padding: 4,
    marginLeft: 8,
  },
  filterContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 6,
  },
  filterTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterTabActive: {
    backgroundColor: '#8B7355',
    borderColor: '#8B7355',
  },
  filterTabText: {
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 2,
  },
  filterTabTextActive: {
    // Emoji doesn't need color change
  },
  filterCount: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#666666',
    lineHeight: 12,
  },
  filterCountActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  resultsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
  },
  joinedGroupCard: {
    borderColor: '#A8D8AD',
    backgroundColor: 'rgba(168, 216, 173, 0.05)',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  groupIconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumIcon: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  verifiedIcon: {
    position: 'absolute',
    bottom: -2,
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
    color: '#333333',
    flex: 1,
  },
  joinedBadge: {
    backgroundColor: '#A8D8AD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  joinedText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryText: {
    fontSize: 14,
  },
  memberCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  activeMembers: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#A8D8AD',
  },
  groupStats: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
  },
  activityText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  lastMessageContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    marginBottom: 4,
  },
  lastMessageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  groupDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  moreTagsText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    fontStyle: 'italic',
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerStats: {
    flexDirection: 'row',
    gap: 16,
  },
  footerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerStatText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  joinRequirementBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  joinRequirementText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bottomSpacing: {
    height: 20,
  },
});