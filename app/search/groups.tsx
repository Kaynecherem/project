import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Hash,
  Users,
  Crown,
  Shield,
  TrendingUp,
  MessageSquare,
  Plus,
  SlidersHorizontal,
  Star,
  Clock
} from 'lucide-react-native';

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
  moderators: string[];
  createdDate: string;
}

interface FilterOptions {
  category: string;
  memberRange: string;
  joinRequirement: string;
  isPremium: boolean;
  isVerified: boolean;
  sortBy: string;
}

export default function GroupsSearchScreen() {
  const { query: initialQuery } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState((initialQuery as string) || '');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    memberRange: 'all',
    joinRequirement: 'all',
    isPremium: false,
    isVerified: false,
    sortBy: 'relevance',
  });

  const quickFilters = [
    { key: 'all', label: '🌐', name: 'All' },
    { key: 'popular', label: '🔥', name: 'Popular' },
    { key: 'new', label: '✨', name: 'New' },
    { key: 'premium', label: '👑', name: 'Premium' },
    { key: 'open', label: '🚪', name: 'Open' },
    { key: 'brands', label: '🏷️', name: 'Brands' },
  ];

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'trading', label: 'Trading & Deals' },
    { key: 'brands', label: 'Brand Specific' },
    { key: 'collecting', label: 'Collecting' },
    { key: 'general', label: 'General Discussion' },
    { key: 'regional', label: 'Regional' },
  ];

  const memberRanges = [
    { key: 'all', label: 'Any Size' },
    { key: 'small', label: 'Small (< 50)' },
    { key: 'medium', label: 'Medium (50-200)' },
    { key: 'large', label: 'Large (200-500)' },
    { key: 'huge', label: 'Huge (500+)' },
  ];

  const sortOptions = [
    { key: 'relevance', label: 'Relevance' },
    { key: 'members', label: 'Most Members' },
    { key: 'activity', label: 'Most Active' },
    { key: 'newest', label: 'Newest' },
    { key: 'rating', label: 'Highest Rated' },
  ];

  const searchResults: Group[] = [
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
      tags: ['Rolex', 'Dealers', 'Premium', 'Verified'],
      recentActivity: '2m ago',
      averageRating: 4.9,
      totalThreads: 1247,
      weeklyMessages: 342,
      joinRequirement: 'application',
      moderators: ['Marcus Chen', 'Sarah Williams'],
      createdDate: '2019',
    },
    {
      id: '2',
      name: 'Audemars Piguet Collectors',
      description: 'Dedicated community for AP enthusiasts. Share your collection, discuss new releases, and get expert authentication.',
      memberCount: 189,
      activeMembers: 67,
      isPremium: true,
      isVerified: true,
      isJoined: false,
      category: 'brands',
      tags: ['Audemars Piguet', 'Collectors', 'Authentication'],
      recentActivity: '15m ago',
      averageRating: 4.8,
      totalThreads: 892,
      weeklyMessages: 234,
      joinRequirement: 'invite',
      moderators: ['David Rodriguez'],
      createdDate: '2020',
    },
    {
      id: '3',
      name: 'Vintage Watch Hunters',
      description: 'For those who appreciate the classics. Find rare vintage pieces, share restoration stories, and learn from experts.',
      memberCount: 156,
      activeMembers: 45,
      isPremium: false,
      isVerified: true,
      isJoined: false,
      category: 'collecting',
      tags: ['Vintage', 'Restoration', 'Rare Finds'],
      recentActivity: '1h ago',
      averageRating: 4.7,
      totalThreads: 567,
      weeklyMessages: 123,
      joinRequirement: 'open',
      moderators: ['Emma Thompson'],
      createdDate: '2021',
    },
    {
      id: '4',
      name: 'Patek Philippe Society',
      description: 'Exclusive community for Patek Philippe owners and serious collectors. High-end discussions and rare piece showcases.',
      memberCount: 134,
      activeMembers: 52,
      isPremium: true,
      isVerified: true,
      isJoined: false,
      category: 'brands',
      tags: ['Patek Philippe', 'Luxury', 'Exclusive'],
      recentActivity: '30m ago',
      averageRating: 4.9,
      totalThreads: 445,
      weeklyMessages: 189,
      joinRequirement: 'application',
      moderators: ['Robert Kim'],
      createdDate: '2018',
    },
    {
      id: '5',
      name: 'Watch Trading Hub',
      description: 'Active marketplace for buying, selling, and trading luxury watches. Verified dealers and collectors welcome.',
      memberCount: 423,
      activeMembers: 156,
      isPremium: false,
      isVerified: true,
      isJoined: true,
      category: 'trading',
      tags: ['Trading', 'Marketplace', 'Buy/Sell'],
      recentActivity: '5m ago',
      averageRating: 4.6,
      totalThreads: 2134,
      weeklyMessages: 567,
      joinRequirement: 'open',
      moderators: ['Marcus Chen', 'David Rodriguez', 'Emma Thompson'],
      createdDate: '2019',
    },
    {
      id: '6',
      name: 'NYC Watch Collectors',
      description: 'Local community for New York City watch enthusiasts. Organize meetups, share local dealer recommendations.',
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
      moderators: ['Local Admin'],
      createdDate: '2022',
    },
    {
      id: '7',
      name: 'Omega Speedmaster Fans',
      description: 'Dedicated to the legendary Speedmaster. From moon watches to limited editions, share your passion here.',
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
      moderators: ['Sarah Williams', 'Emma Thompson'],
      createdDate: '2020',
    },
    {
      id: '8',
      name: 'Watch Investment Club',
      description: 'Analyze market trends, discuss investment strategies, and share insights on watch values and appreciation.',
      memberCount: 167,
      activeMembers: 67,
      isPremium: true,
      isVerified: true,
      isJoined: false,
      category: 'general',
      tags: ['Investment', 'Market Analysis', 'Trends'],
      recentActivity: '1h ago',
      averageRating: 4.8,
      totalThreads: 678,
      weeklyMessages: 145,
      joinRequirement: 'application',
      moderators: ['Robert Kim', 'Marcus Chen'],
      createdDate: '2021',
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleGroupPress = (group: Group) => {
    if (group.isJoined) {
      router.push({
        pathname: '/channel/[id]',
        params: { 
          id: group.id,
          name: group.name,
          isPremium: group.isPremium ? 'true' : 'false'
        }
      });
    } else {
      handleJoinGroup(group);
    }
  };

  const handleJoinGroup = (group: Group) => {
    let message = '';
    let buttonText = '';
    
    switch (group.joinRequirement) {
      case 'open':
        message = `Join ${group.name}? You'll have immediate access to all discussions and content.`;
        buttonText = 'Join Group';
        break;
      case 'invite':
        message = `${group.name} is invite-only. You can request an invitation from current members.`;
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
            <Hash size={20} color="#d69e2e" />
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
            <Text style={styles.categoryText}>{getCategoryIcon(group.category)} {group.category}</Text>
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

      {/* Description */}
      <Text style={styles.groupDescription} numberOfLines={2}>
        {group.description}
      </Text>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {group.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {group.tags.length > 3 && (
          <Text style={styles.moreTagsText}>+{group.tags.length - 3} more</Text>
        )}
      </View>

      {/* Footer */}
      <View style={styles.groupFooter}>
        <View style={styles.footerStats}>
          <View style={styles.footerStat}>
            <MessageSquare size={12} color="#8892b0" />
            <Text style={styles.footerStatText}>{group.totalThreads} threads</Text>
          </View>
          <View style={styles.footerStat}>
            <TrendingUp size={12} color="#8892b0" />
            <Text style={styles.footerStatText}>{group.weeklyMessages}/week</Text>
          </View>
        </View>
        
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
      </View>
    </TouchableOpacity>
  );

  const filteredResults = searchResults.filter(group => {
    // Apply search query filter
    if (searchQuery && !group.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !group.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    // Apply quick filters
    switch (selectedFilter) {
      case 'popular':
        return group.memberCount > 200;
      case 'new':
        return parseInt(group.createdDate) >= 2022;
      case 'premium':
        return group.isPremium;
      case 'open':
        return group.joinRequirement === 'open';
      case 'brands':
        return group.category === 'brands';
      default:
        return true;
    }
  });

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
          <Text style={styles.headerTitle}>Discover Groups</Text>
          <Text style={styles.headerSubtitle}>
            {filteredResults.length} groups found
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.advancedFilterButton}
          onPress={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <SlidersHorizontal size={20} color="#8892b0" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={16} color="#8892b0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search groups by name, description, or tags..."
          placeholderTextColor="#8892b0"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={!initialQuery}
        />
      </View>

      {/* Quick Filters */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterContent}
        >
          {quickFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                selectedFilter === filter.key && styles.filterTabActive
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === filter.key && styles.filterTabTextActive
              ]}>
                {filter.label}
              </Text>
              <Text style={[
                styles.filterTabName,
                selectedFilter === filter.key && styles.filterTabNameActive
              ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <View style={styles.advancedFilters}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      styles.categoryChip,
                      filters.category === category.key && styles.categoryChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, category: category.key }))}
                  >
                    <Text style={[
                      styles.categoryText,
                      filters.category === category.key && styles.categoryTextActive
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Member Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Group Size</Text>
              <View style={styles.memberRangeGrid}>
                {memberRanges.map((range) => (
                  <TouchableOpacity
                    key={range.key}
                    style={[
                      styles.memberRangeChip,
                      filters.memberRange === range.key && styles.memberRangeChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, memberRange: range.key }))}
                  >
                    <Text style={[
                      styles.memberRangeText,
                      filters.memberRange === range.key && styles.memberRangeTextActive
                    ]}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Results */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredResults.length > 0 ? (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsText}>
                {filteredResults.length} groups
                {selectedFilter !== 'all' && ` • ${quickFilters.find(f => f.key === selectedFilter)?.name}`}
              </Text>
              <Text style={styles.resultsSubtext}>
                Discover communities that match your interests
              </Text>
            </View>
            
            {filteredResults.map(renderGroup)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Hash size={48} color="#8892b0" />
            <Text style={styles.emptyTitle}>No groups found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search terms or filters
            </Text>
          </View>
        )}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Create Group FAB */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#1a2332" />
      </TouchableOpacity>
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
  advancedFilterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1a2332',
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
  filterContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#1a2332',
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  filterTabActive: {
    backgroundColor: '#d69e2e',
    borderColor: '#d69e2e',
  },
  filterTabText: {
    fontSize: 16,
    marginBottom: 2,
  },
  filterTabTextActive: {
    // Emoji doesn't need color change
  },
  filterTabName: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterTabNameActive: {
    color: '#1a2332',
  },
  advancedFilters: {
    backgroundColor: '#1a2332',
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
    maxHeight: 200,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  categoryChipActive: {
    backgroundColor: '#d69e2e',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  categoryTextActive: {
    color: '#1a2332',
  },
  memberRangeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  memberRangeChip: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  memberRangeChipActive: {
    backgroundColor: '#3182ce',
  },
  memberRangeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  memberRangeTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  resultsHeader: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  resultsText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  resultsSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    marginTop: 2,
  },
  groupCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
    marginBottom: 16,
  },
  joinedGroupCard: {
    borderColor: '#38a169',
    backgroundColor: 'rgba(56, 161, 105, 0.05)',
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
    backgroundColor: '#2d3748',
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
    color: '#ffffff',
    flex: 1,
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
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  activeMembers: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#38a169',
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
    color: '#d69e2e',
  },
  activityText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  groupDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
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
    backgroundColor: '#2d3748',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  moreTagsText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    fontStyle: 'italic',
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
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
    color: '#8892b0',
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#d69e2e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bottomSpacing: {
    height: 80,
  },
});