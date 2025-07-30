import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  Grid3x3 as Grid3X3, 
  Users,
  Hash,
  Clock,
  TrendingUp,
  Star,
  Filter
} from 'lucide-react-native';

interface SearchCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  route: string;
  count: number;
}

interface RecentSearch {
  id: string;
  query: string;
  category: string;
  timestamp: string;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const searchCategories: SearchCategory[] = [
    {
      id: 'messages',
      title: 'Messages',
      description: 'Search conversations and channels',
      icon: MessageCircle,
      color: '#3182ce',
      route: '/search/messages',
      count: 1247,
    },
    {
      id: 'listings',
      title: 'Listings',
      description: 'Find watches for sale',
      icon: Grid3X3,
      color: '#38a169',
      route: '/search/listings',
      count: 856,
    },
    {
      id: 'groups',
      title: 'Groups',
      description: 'Discover communities to join',
      icon: Hash,
      color: '#d69e2e',
      route: '/search/groups',
      count: 127,
    },
    {
      id: 'directory',
      title: 'Directory',
      description: 'Search verified dealers',
      icon: Users,
      color: '#805ad5',
      route: '/search/directory',
      count: 247,
    },
  ];

  const recentSearches: RecentSearch[] = [
    { id: '1', query: 'Submariner', category: 'listings', timestamp: '2h ago' },
    { id: '2', query: 'Marcus Chen', category: 'directory', timestamp: '1d ago' },
    { id: '3', query: 'Rolex Dealers', category: 'groups', timestamp: '2d ago' },
    { id: '4', query: 'Royal Oak', category: 'messages', timestamp: '2d ago' },
    { id: '5', query: 'GMT Master', category: 'listings', timestamp: '3d ago' },
  ];

  const trendingSearches = [
    'Submariner Date',
    'Royal Oak 15400',
    'GMT Master II',
    'Speedmaster',
    'Nautilus',
    'Daytona',
    'Vintage Rolex',
    'Patek Philippe',
  ];

  const handleCategoryPress = (category: SearchCategory) => {
    router.push({
      pathname: category.route as any,
      params: { query: searchQuery }
    });
  };

  const handleRecentSearchPress = (search: RecentSearch) => {
    const route = `/search/${search.category}`;
    router.push({
      pathname: route as any,
      params: { query: search.query }
    });
  };

  const handleTrendingSearchPress = (query: string) => {
    setSearchQuery(query);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const renderSearchCategory = (category: SearchCategory) => (
    <TouchableOpacity 
      key={category.id}
      style={[styles.categoryCard, { borderLeftColor: category.color }]}
      onPress={() => handleCategoryPress(category)}
    >
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
          <category.icon size={24} color={category.color} strokeWidth={2} />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
        <View style={styles.categoryCount}>
          <Text style={styles.countText}>{category.count.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearch = (search: RecentSearch) => (
    <TouchableOpacity 
      key={search.id}
      style={styles.recentSearchItem}
      onPress={() => handleRecentSearchPress(search)}
    >
      <View style={styles.recentSearchIcon}>
        <Clock size={16} color="#8892b0" />
      </View>
      <View style={styles.recentSearchContent}>
        <Text style={styles.recentSearchQuery}>{search.query}</Text>
        <Text style={styles.recentSearchMeta}>
          in {search.category} • {search.timestamp}
        </Text>
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
          <Text style={styles.headerTitle}>Search</Text>
          <Text style={styles.headerSubtitle}>Find anything across WatchDealer</Text>
        </View>
      </View>

      {/* Global Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#8892b0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages, listings, groups, dealers..."
          placeholderTextColor="#8892b0"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search In</Text>
          <View style={styles.categoriesGrid}>
            {searchCategories.map(renderSearchCategory)}
          </View>
        </View>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.recentSearches}>
              {recentSearches.map(renderRecentSearch)}
            </View>
          </View>
        )}

        {/* Trending Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Trending</Text>
          </View>
          <View style={styles.trendingGrid}>
            {trendingSearches.map((query, index) => (
              <TouchableOpacity
                key={index}
                style={styles.trendingChip}
                onPress={() => handleTrendingSearchPress(query)}
              >
                <Text style={styles.trendingText}>{query}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Search Tips</Text>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Use quotes for exact phrases: "GMT Master II"</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Search by reference number: 116610LN</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Filter by price range: $10000-$15000</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Use brand shortcuts: AP, PP, VC</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Find groups by category: #trading, #vintage</Text>
          </View>
        </View>

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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearText: {
    fontSize: 20,
    color: '#666666',
    fontFamily: 'Inter-Regular',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginLeft: 8,
  },
  clearAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderLeftWidth: 4,
    padding: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  categoryCount: {
    alignItems: 'flex-end',
  },
  countText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#8B7355',
  },
  recentSearches: {
    gap: 8,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  recentSearchIcon: {
    marginRight: 12,
  },
  recentSearchContent: {
    flex: 1,
  },
  recentSearchQuery: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 2,
  },
  recentSearchMeta: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trendingChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  trendingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  tipsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 12,
  },
  tip: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});