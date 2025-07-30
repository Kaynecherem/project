import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Users,
  MapPin,
  Star,
  Shield,
  TrendingUp,
  Crown,
  SlidersHorizontal
} from 'lucide-react-native';

interface Dealer {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  totalDeals: number;
  specialties: string[];
  vouchers: number;
  joinedDate: string;
  isVerified: boolean;
  isOnline: boolean;
  lastSeen?: string;
}

interface FilterOptions {
  rating: number;
  location: string;
  specialties: string[];
  verified: boolean;
  online: boolean;
  minDeals: number;
}

export default function DirectorySearchScreen() {
  const { query: initialQuery } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState((initialQuery as string) || '');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const [filters, setFilters] = useState<FilterOptions>({
    rating: 0,
    location: '',
    specialties: [],
    verified: false,
    online: false,
    minDeals: 0,
  });

  const quickFilters = [
    { key: 'all', label: '👥', name: 'All' },
    { key: 'verified', label: '✅', name: 'Verified' },
    { key: 'top-rated', label: '⭐', name: 'Top' },
    { key: 'local', label: '📍', name: 'Local' },
    { key: 'rolex', label: '👑', name: 'Rolex' },
    { key: 'ap', label: '🔷', name: 'AP' },
  ];

  const locations = ['New York, NY', 'Los Angeles, CA', 'Miami, FL', 'Chicago, IL', 'San Francisco, CA'];
  const specialties = ['Rolex', 'Audemars Piguet', 'Patek Philippe', 'Omega', 'Tudor', 'Vintage', 'Richard Mille'];

  const searchResults: Dealer[] = [
    {
      id: '1',
      name: 'Marcus Chen',
      location: 'New York, NY',
      avatar: 'MC',
      rating: 4.9,
      totalDeals: 147,
      specialties: ['Rolex', 'Tudor', 'Omega'],
      vouchers: 23,
      joinedDate: '2019',
      isVerified: true,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Sarah Williams',
      location: 'Los Angeles, CA',
      avatar: 'SW',
      rating: 4.8,
      totalDeals: 203,
      specialties: ['Audemars Piguet', 'Patek Philippe', 'Vacheron Constantin'],
      vouchers: 31,
      joinedDate: '2018',
      isVerified: true,
      isOnline: false,
      lastSeen: '2h ago',
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleDealerPress = (dealer: Dealer) => {
    // Navigate to dealer profile
    console.log('Navigate to dealer:', dealer.name);
  };

  const toggleSpecialty = (specialty: string) => {
    setFilters(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const renderDealer = (dealer: Dealer) => (
    <TouchableOpacity key={dealer.id} style={styles.dealerCard} onPress={() => handleDealerPress(dealer)}>
      <View style={styles.dealerHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{dealer.avatar}</Text>
          </View>
          {dealer.isOnline && <View style={styles.onlineIndicator} />}
          {dealer.isVerified && (
            <View style={styles.verifiedBadge}>
              <Shield size={12} color="#ffffff" />
            </View>
          )}
        </View>
        
        <View style={styles.dealerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.dealerName}>{dealer.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#d69e2e" fill="#d69e2e" />
              <Text style={styles.rating}>{dealer.rating}</Text>
            </View>
          </View>
          
          <View style={styles.locationRow}>
            <MapPin size={12} color="#8892b0" />
            <Text style={styles.location}>{dealer.location}</Text>
            {!dealer.isOnline && dealer.lastSeen && (
              <Text style={styles.lastSeen}>• {dealer.lastSeen}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.dealerStats}>
        <View style={styles.stat}>
          <TrendingUp size={14} color="#38a169" />
          <Text style={styles.statValue}>{dealer.totalDeals}</Text>
          <Text style={styles.statLabel}>Deals</Text>
        </View>
        <View style={styles.stat}>
          <Users size={14} color="#d69e2e" />
          <Text style={styles.statValue}>{dealer.vouchers}</Text>
          <Text style={styles.statLabel}>Vouchers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{dealer.joinedDate}</Text>
          <Text style={styles.statLabel}>Since</Text>
        </View>
      </View>

      <View style={styles.specialtiesContainer}>
        <Text style={styles.specialtiesLabel}>Specialties:</Text>
        <View style={styles.specialties}>
          {dealer.specialties.map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
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
          <Text style={styles.headerTitle}>Search Directory</Text>
          <Text style={styles.headerSubtitle}>
            {searchResults.length} dealers found
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
          placeholder="Search dealers by name or location..."
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
            {/* Rating */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Minimum Rating</Text>
              <View style={styles.ratingGrid}>
                {[4.0, 4.5, 4.8, 4.9].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    style={[
                      styles.ratingChip,
                      filters.rating === rating && styles.ratingChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, rating }))}
                  >
                    <Star size={12} color={filters.rating === rating ? "#ffffff" : "#d69e2e"} fill="#d69e2e" />
                    <Text style={[
                      styles.ratingText,
                      filters.rating === rating && styles.ratingTextActive
                    ]}>
                      {rating}+
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Location */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Location</Text>
              <View style={styles.locationGrid}>
                {locations.map((location) => (
                  <TouchableOpacity
                    key={location}
                    style={[
                      styles.locationChip,
                      filters.location === location && styles.locationChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ 
                      ...prev, 
                      location: prev.location === location ? '' : location 
                    }))}
                  >
                    <Text style={[
                      styles.locationText,
                      filters.location === location && styles.locationTextActive
                    ]}>
                      {location}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Specialties */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Specialties</Text>
              <View style={styles.specialtyGrid}>
                {specialties.map((specialty) => (
                  <TouchableOpacity
                    key={specialty}
                    style={[
                      styles.specialtyChip,
                      filters.specialties.includes(specialty) && styles.specialtyChipActive
                    ]}
                    onPress={() => toggleSpecialty(specialty)}
                  >
                    <Text style={[
                      styles.specialtyFilterText,
                      filters.specialties.includes(specialty) && styles.specialtyFilterTextActive
                    ]}>
                      {specialty}
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
            {searchResults.map(renderDealer)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Users size={48} color="#8892b0" />
            <Text style={styles.emptyTitle}>No dealers found</Text>
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
    width: 44,
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
  ratingGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d3748',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  ratingChipActive: {
    backgroundColor: '#d69e2e',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  ratingTextActive: {
    color: '#ffffff',
  },
  locationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  locationChip: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  locationChipActive: {
    backgroundColor: '#3182ce',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  locationTextActive: {
    color: '#ffffff',
  },
  specialtyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyChip: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  specialtyChipActive: {
    backgroundColor: '#38a169',
  },
  specialtyFilterText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  specialtyFilterTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  resultsContainer: {
    paddingHorizontal: 20,
    gap: 16,
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
    marginBottom: 16,
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
  dealerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dealerName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#d69e2e',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  lastSeen: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  dealerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2d3748',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  specialtiesContainer: {
    marginBottom: 0,
  },
  specialtiesLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
    marginBottom: 8,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyTag: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  specialtyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
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