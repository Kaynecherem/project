import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star, Shield, Users, TrendingUp, X, ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import VouchModal from '@/components/VouchModal';

interface Dealer {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  totalDeals: number;
  specialties: string[];
  vouchers: number;
  maxVouchedDeal: number;
  joinedDate: string;
  isVerified: boolean;
  isOnline: boolean;
  lastSeen?: string;
  myVouch?: {
    dealSize: string;
    relationship: string;
    notes: string;
  };
}

export default function DirectoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showVouchModal, setShowVouchModal] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  const filters = [
    { key: 'All', label: '👥', count: 5 },
    { key: 'Verified', label: '✅', count: 5 },
    { key: 'Top Rated', label: '⭐', count: 3 },
    { key: 'Local', label: '📍', count: 2 },
    { key: 'Rolex', label: '👑', count: 4 },
    { key: 'AP', label: '🔷', count: 2 },
    { key: 'Patek', label: '💎', count: 2 },
  ];

  const dealers: Dealer[] = [
    {
      id: '1',
      name: 'Marcus Chen',
      location: 'New York, NY',
      avatar: 'MC',
      rating: 4.9,
      totalDeals: 147,
      specialties: ['Rolex', 'Tudor', 'Omega'],
      vouchers: 23,
      maxVouchedDeal: 250000,
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
      maxVouchedDeal: 500000,
      joinedDate: '2018',
      isVerified: true,
      isOnline: false,
      lastSeen: '2h ago',
      myVouch: {
        dealSize: '100000',
        relationship: 'Multiple successful deals',
        notes: 'Excellent communication and fast shipping.',
      },
    },
    {
      id: '3',
      name: 'David Rodriguez',
      location: 'Miami, FL',
      avatar: 'DR',
      rating: 4.7,
      totalDeals: 89,
      specialties: ['Vintage Rolex', 'Patek Philippe', 'Cartier'],
      vouchers: 18,
      maxVouchedDeal: 150000,
      joinedDate: '2020',
      isVerified: true,
      isOnline: true,
    },
    {
      id: '4',
      name: 'Emma Thompson',
      location: 'Chicago, IL',
      avatar: 'ET',
      rating: 4.6,
      totalDeals: 156,
      specialties: ['Omega', 'Breitling', 'IWC'],
      vouchers: 12,
      maxVouchedDeal: 75000,
      joinedDate: '2021',
      isVerified: true,
      isOnline: false,
      lastSeen: '1d ago',
    },
    {
      id: '5',
      name: 'Robert Kim',
      location: 'San Francisco, CA',
      avatar: 'RK',
      rating: 4.9,
      totalDeals: 278,
      specialties: ['Richard Mille', 'AP', 'Hublot'],
      vouchers: 45,
      maxVouchedDeal: 1000000,
      joinedDate: '2017',
      isVerified: true,
      isOnline: true,
    },
  ];

  const handleSearchPress = () => {
    router.push({
      pathname: '/search/directory',
      params: { query: searchQuery }
    });
  };

  const handleVouchPress = (dealer: Dealer) => {
    setSelectedDealer(dealer);
    setShowVouchModal(true);
  };

  const handleRemoveVouch = (dealer: Dealer) => {
    Alert.alert(
      'Remove Vouch',
      `Are you sure you want to remove your vouch for ${dealer.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            // In a real app, this would remove the vouch from backend
            Alert.alert('Success', 'Your vouch has been removed');
          }
        }
      ]
    );
  };

  const handleSubmitVouch = (vouchData: any) => {
    // In a real app, this would submit to backend
    Alert.alert('Success', `Your vouch for ${selectedDealer?.name} has been submitted!`);
  };

  const formatDealSize = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const renderDealer = (dealer: Dealer) => (
    <TouchableOpacity key={dealer.id} style={styles.dealerCard}>
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
          <Text style={styles.statValue}>{formatDealSize(dealer.maxVouchedDeal)}</Text>
          <Text style={styles.statLabel}>Max Deal</Text>
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

      <View style={styles.dealerActions}>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        
        {dealer.myVouch ? (
          <TouchableOpacity 
            style={styles.vouchedButton}
            onPress={() => handleRemoveVouch(dealer)}
          >
            <Text style={styles.vouchedButtonText}>Vouched</Text>
            <X size={14} color="#38a169" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.vouchButton}
            onPress={() => handleVouchPress(dealer)}
          >
            <Text style={styles.vouchButtonText}>Vouch</Text>
          </TouchableOpacity>
        )}
      </View>

      {dealer.myVouch && (
        <View style={styles.myVouchContainer}>
          <Text style={styles.myVouchTitle}>Your Vouch:</Text>
          <Text style={styles.myVouchText}>
            Max deal: {formatDealSize(parseInt(dealer.myVouch.dealSize))} • {dealer.myVouch.relationship}
          </Text>
          {dealer.myVouch.notes && (
            <Text style={styles.myVouchNotes}>"{dealer.myVouch.notes}"</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#F5F5F5" />
        </TouchableOpacity>
        <Text style={styles.title}>Directory</Text>
        <View style={styles.headerStats}>
          <Text style={styles.headerStatsText}>{dealers.length} verified dealers</Text>
        </View>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
        <Search size={16} color="#6B7280" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search dealers by name or location...</Text>
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

      {/* Dealers List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {dealers.map(renderDealer)}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Vouch Modal */}
      <VouchModal
        visible={showVouchModal}
        onClose={() => setShowVouchModal(false)}
        dealerName={selectedDealer?.name || ''}
        onSubmit={handleSubmitVouch}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#F5F5F5',
    flex: 1,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerStatsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  filterButton: {
    padding: 4,
    marginLeft: 8,
  },
  filterContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
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
    backgroundColor: '#2C2C2C',
    borderWidth: 1,
    borderColor: '#3A3A3A',
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
    color: '#6B7280',
    lineHeight: 12,
  },
  filterCountActive: {
    color: '#2C2C2C',
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  dealerCard: {
    backgroundColor: '#2C2C2C',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A3A',
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
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#F5F5F5',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#059669',
    borderWidth: 2,
    borderColor: '#2C2C2C',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#059669',
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
    color: '#F5F5F5',
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
    color: '#9CA3AF',
  },
  lastSeen: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  dealerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#3A3A3A',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#F5F5F5',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  specialtiesContainer: {
    marginBottom: 16,
  },
  specialtiesLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyTag: {
    backgroundColor: '#3A3A3A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  specialtyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  dealerActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#8B7355',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#F5F5F5',
  },
  vouchButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8B7355',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  vouchButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
  },
  vouchedButton: {
    flex: 1,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    borderWidth: 1,
    borderColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  vouchedButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#059669',
  },
  myVouchContainer: {
    backgroundColor: 'rgba(5, 150, 105, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.2)',
    padding: 12,
  },
  myVouchTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#059669',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  myVouchText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#F5F5F5',
    marginBottom: 4,
  },
  myVouchNotes: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  bottomSpacing: {
    height: 20,
  },
});