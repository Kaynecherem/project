import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  DollarSign,
  MapPin,
  Clock,
  SlidersHorizontal
} from 'lucide-react-native';
import ListingCard from '@/components/ListingCard';

interface FilterOptions {
  priceRange: [number, number];
  condition: string[];
  brands: string[];
  location: string;
  datePosted: string;
}

export default function ListingsSearchScreen() {
  const { query: initialQuery } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState((initialQuery as string) || '');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 100000],
    condition: [],
    brands: [],
    location: '',
    datePosted: 'any',
  });

  const quickFilters = [
    { key: 'all', label: '📱', name: 'All' },
    { key: 'rolex', label: '👑', name: 'Rolex' },
    { key: 'ap', label: '🔷', name: 'AP' },
    { key: 'patek', label: '💎', name: 'Patek' },
    { key: 'omega', label: '🌙', name: 'Omega' },
    { key: 'vintage', label: '⏰', name: 'Vintage' },
  ];

  const priceRanges = [
    { label: 'Under $5K', min: 0, max: 5000 },
    { label: '$5K - $10K', min: 5000, max: 10000 },
    { label: '$10K - $25K', min: 10000, max: 25000 },
    { label: '$25K - $50K', min: 25000, max: 50000 },
    { label: '$50K+', min: 50000, max: 1000000 },
  ];

  const conditions = ['New', 'Like New', 'Excellent', 'Very Good', 'Good'];
  const brands = ['Rolex', 'Audemars Piguet', 'Patek Philippe', 'Omega', 'Tudor', 'Cartier'];

  const searchResults = [
    {
      id: '1',
      brand: 'Rolex',
      model: 'Submariner Date 116610LN',
      nickname: 'Black Sub',
      price: 12500,
      condition: 'Excellent',
      location: 'New York, NY',
      dealer: 'Marcus Chen',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '2h ago',
      views: 47,
      saves: 12,
      verified: true,
    },
    {
      id: '2',
      brand: 'Audemars Piguet',
      model: 'Royal Oak 15400ST.OO.1220ST.03',
      price: 28000,
      condition: 'Like New',
      location: 'Los Angeles, CA',
      dealer: 'Sarah Williams',
      image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '4h ago',
      views: 89,
      saves: 23,
      verified: true,
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleListingPress = (listing: any) => {
    router.push({
      pathname: '/listing/[id]',
      params: { 
        id: listing.id,
        listing: JSON.stringify(listing)
      }
    });
  };

  const handlePriceRangeSelect = (range: any) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [range.min, range.max]
    }));
  };

  const toggleCondition = (condition: string) => {
    setFilters(prev => ({
      ...prev,
      condition: prev.condition.includes(condition)
        ? prev.condition.filter(c => c !== condition)
        : [...prev.condition, condition]
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
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
          <Text style={styles.headerTitle}>Search Listings</Text>
          <Text style={styles.headerSubtitle}>
            {searchResults.length} listings found
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
          placeholder="Search brand, model, reference..."
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

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <View style={styles.advancedFilters}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.priceRangeGrid}>
                {priceRanges.map((range, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.priceRangeChip,
                      filters.priceRange[0] === range.min && filters.priceRange[1] === range.max && styles.priceRangeChipActive
                    ]}
                    onPress={() => handlePriceRangeSelect(range)}
                  >
                    <Text style={[
                      styles.priceRangeText,
                      filters.priceRange[0] === range.min && filters.priceRange[1] === range.max && styles.priceRangeTextActive
                    ]}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Condition */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Condition</Text>
              <View style={styles.conditionGrid}>
                {conditions.map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={[
                      styles.conditionChip,
                      filters.condition.includes(condition) && styles.conditionChipActive
                    ]}
                    onPress={() => toggleCondition(condition)}
                  >
                    <Text style={[
                      styles.conditionText,
                      filters.condition.includes(condition) && styles.conditionTextActive
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Brands */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Brands</Text>
              <View style={styles.brandGrid}>
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    style={[
                      styles.brandChip,
                      filters.brands.includes(brand) && styles.brandChipActive
                    ]}
                    onPress={() => toggleBrand(brand)}
                  >
                    <Text style={[
                      styles.brandText,
                      filters.brands.includes(brand) && styles.brandTextActive
                    ]}>
                      {brand}
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
        {searchResults.length > 0 ? (
          <View style={styles.resultsContainer}>
            {searchResults.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onPress={handleListingPress}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <DollarSign size={48} color="#8892b0" />
            <Text style={styles.emptyTitle}>No listings found</Text>
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
    gap: 6,
  },
  filterTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
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
  advancedFilters: {
    backgroundColor: '#1a2332',
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
    maxHeight: 300,
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
  priceRangeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  priceRangeChip: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  priceRangeChipActive: {
    backgroundColor: '#d69e2e',
    borderColor: '#d69e2e',
  },
  priceRangeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  priceRangeTextActive: {
    color: '#1a2332',
  },
  conditionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionChip: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  conditionChipActive: {
    backgroundColor: '#38a169',
    borderColor: '#38a169',
  },
  conditionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  conditionTextActive: {
    color: '#ffffff',
  },
  brandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  brandChip: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  brandChipActive: {
    backgroundColor: '#3182ce',
    borderColor: '#3182ce',
  },
  brandText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  brandTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  resultsContainer: {
    gap: 0,
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