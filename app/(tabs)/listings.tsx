import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import ListingCard from '@/components/ListingCard';
import SearchHeader from '@/components/SearchHeader';
import FilterTabs from '@/components/FilterTabs';

interface Listing {
  id: string;
  brand: string;
  model: string;
  nickname?: string;
  price: number;
  condition: string;
  location: string;
  dealer: string;
  image: string;
  postedTime: string;
  views: number;
  saves: number;
  verified: boolean;
}

export default function ListingsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Rolex', 'AP', 'Patek Philippe', 'Omega', 'Vintage'];

  const listings: Listing[] = [
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
    {
      id: '3',
      brand: 'Patek Philippe',
      model: 'Nautilus 5711/1A-010',
      price: 85000,
      condition: 'Excellent',
      location: 'Miami, FL',
      dealer: 'David Rodriguez',
      image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '1d ago',
      views: 156,
      saves: 67,
      verified: true,
    },
    {
      id: '4',
      brand: 'Omega',
      model: 'Speedmaster Professional 310.30.42.50.01.001',
      nickname: 'Moonwatch',
      price: 4200,
      condition: 'Very Good',
      location: 'Chicago, IL',
      dealer: 'Emma Thompson',
      image: 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '2d ago',
      views: 34,
      saves: 8,
      verified: true,
    },
  ];

  const handleListingPress = (listing: Listing) => {
    router.push({
      pathname: '/listing/[id]',
      params: { 
        id: listing.id,
        listing: JSON.stringify(listing)
      }
    });
  };

  const handleSearchPress = () => {
    router.push({
      pathname: '/search/listings',
      params: { query: searchQuery }
    });
  };

  const handleCreatePress = () => {
    router.push('/create/listing');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listings</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleSearchPress}>
            <Search size={20} color="#9CA3AF" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleCreatePress}>
            <Plus size={20} color="#F5F5F5" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
        <Search size={16} color="#6B7280" style={styles.searchIcon} strokeWidth={1.5} />
        <Text style={styles.searchPlaceholder}>Search brand, model, or nickname...</Text>
      </TouchableOpacity>

      <FilterTabs
        filters={filters}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsText}>
          {listings.length} listings found
        </Text>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onPress={handleListingPress}
          />
        ))}
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
    marginTop: 16,
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
  bottomSpacing: {
    height: 20,
  },
});