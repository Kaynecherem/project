import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  MessageCircle,
  Hash,
  Users,
  Clock,
  Crown
} from 'lucide-react-native';

interface SearchResult {
  id: string;
  type: 'group' | 'dm' | 'message';
  title: string;
  content: string;
  author?: string;
  avatar?: string;
  timestamp: string;
  group?: string;
  channel?: string;
  isPremium?: boolean;
  isOnline?: boolean;
}

export default function MessagesSearchScreen() {
  const { query: initialQuery } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState((initialQuery as string) || '');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { key: 'all', label: '📱', name: 'All' },
    { key: 'groups', label: '#️⃣', name: 'Groups' },
    { key: 'dms', label: '👤', name: 'DMs' },
    { key: 'messages', label: '💬', name: 'Messages' },
  ];

  const searchResults: SearchResult[] = [
    {
      id: '1',
      type: 'group',
      title: 'Rolex Dealers',
      content: 'Premium group for verified Rolex dealers with 5 channels',
      timestamp: '247 members',
      isPremium: true,
    },
    {
      id: '2',
      type: 'group',
      title: 'Audemars Piguet',
      content: 'Discussion group for AP collectors and dealers with 5 channels',
      timestamp: '189 members',
      isPremium: true,
    },
    {
      id: '3',
      type: 'group',
      title: 'Vintage Collectors',
      content: 'For vintage watch enthusiasts with 5 channels',
      timestamp: '156 members',
      isPremium: false,
    },
    {
      id: '4',
      type: 'group',
      title: 'General Discussion',
      content: 'Open discussion for all members with 5 channels',
      timestamp: '423 members',
      isPremium: false,
    },
    {
      id: '5',
      type: 'dm',
      title: 'Marcus Chen',
      content: 'The Submariner is still available',
      timestamp: '5m ago',
      avatar: 'MC',
      isOnline: true,
    },
    {
      id: '6',
      type: 'message',
      title: 'GMT Master II Discussion',
      content: 'New GMT Master II available in perfect condition. Box and papers included.',
      author: 'Sarah Williams',
      timestamp: '2h ago',
      group: 'Rolex Dealers',
      channel: 'listings',
    },
    {
      id: '7',
      type: 'message',
      title: 'Call Out: Royal Oak Search',
      content: 'Looking for Royal Oak 15400ST in good condition. Budget up to $28k.',
      author: 'David Rodriguez',
      timestamp: '1d ago',
      group: 'Audemars Piguet',
      channel: 'call-out',
    },
    {
      id: '8',
      type: 'message',
      title: 'Need Quote: Vintage Daytona',
      content: 'Looking for pricing on a 1970s Daytona ref 6263. Multiple dealers welcome to quote.',
      author: 'Emma Thompson',
      timestamp: '2d ago',
      group: 'Vintage Collectors',
      channel: 'need-quote',
    },
  ];

  const filteredResults = searchResults.filter(result => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'groups') return result.type === 'group';
    if (selectedFilter === 'dms') return result.type === 'dm';
    if (selectedFilter === 'messages') return result.type === 'message';
    return true;
  });

  const handleBack = () => {
    router.back();
  };

  const handleResultPress = (result: SearchResult) => {
    if (result.type === 'group') {
      router.push({
        pathname: '/channel/[id]',
        params: { 
          id: result.id,
          name: result.title,
          isPremium: result.isPremium ? 'true' : 'false'
        }
      });
    } else if (result.type === 'dm') {
      router.push({
        pathname: '/chat/[id]',
        params: { 
          id: result.id,
          name: result.title,
          avatar: result.avatar,
          isOnline: result.isOnline ? 'true' : 'false'
        }
      });
    }
  };

  const renderSearchResult = (result: SearchResult) => (
    <TouchableOpacity 
      key={result.id}
      style={styles.resultCard}
      onPress={() => handleResultPress(result)}
    >
      <View style={styles.resultHeader}>
        <View style={styles.resultIcon}>
          {result.type === 'group' && (
            <View style={styles.groupIcon}>
              <Hash size={16} color="#d69e2e" />
              {result.isPremium && (
                <Crown size={12} color="#d69e2e" style={styles.premiumIcon} />
              )}
            </View>
          )}
          {result.type === 'dm' && (
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{result.avatar}</Text>
              </View>
              {result.isOnline && <View style={styles.onlineIndicator} />}
            </View>
          )}
          {result.type === 'message' && (
            <View style={styles.messageIcon}>
              <MessageCircle size={16} color="#3182ce" />
            </View>
          )}
        </View>
        
        <View style={styles.resultContent}>
          <Text style={styles.resultTitle}>{result.title}</Text>
          <Text style={styles.resultText} numberOfLines={2}>
            {result.content}
          </Text>
          {result.author && result.group && (
            <Text style={styles.resultAuthor}>
              by {result.author} in #{result.group}
              {result.channel && ` → #{result.channel}`}
            </Text>
          )}
        </View>
        
        <View style={styles.resultMeta}>
          <Text style={styles.resultTimestamp}>{result.timestamp}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Search Messages</Text>
          <Text style={styles.headerSubtitle}>
            {filteredResults.length} results found
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={16} color="#8892b0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations and messages..."
          placeholderTextColor="#8892b0"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={!initialQuery}
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} color="#8892b0" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
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
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredResults.length > 0 ? (
          <View style={styles.resultsContainer}>
            {filteredResults.map(renderSearchResult)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MessageCircle size={48} color="#8892b0" />
            <Text style={styles.emptyTitle}>No messages found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search terms or filters
            </Text>
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
  filterButton: {
    padding: 4,
    marginLeft: 8,
  },
  filterContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 6,
  },
  filterTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 44,
    borderRadius: 8,
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
    lineHeight: 18,
    marginBottom: 2,
  },
  filterTabTextActive: {
    // Emoji doesn't need color change
  },
  filterCount: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#8892b0',
    lineHeight: 10,
  },
  filterCountActive: {
    color: '#1a2332',
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  resultsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  resultCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  resultIcon: {
    marginRight: 12,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2d3748',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  premiumIcon: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d69e2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#1a2332',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#38a169',
    borderWidth: 2,
    borderColor: '#1a2332',
  },
  messageIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2d3748',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
    marginBottom: 4,
  },
  resultAuthor: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  resultMeta: {
    alignItems: 'flex-end',
  },
  resultTimestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
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
  bottomSpacing: {
    height: 40,
  },
});