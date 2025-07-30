import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  Shield, 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign,
  MapPin,
  Calendar,
  MessageCircle,
  Phone,
  Crown,
  Eye,
  Heart,
  Share,
  Flag
} from 'lucide-react-native';
import { useState } from 'react';

export default function DealerProfileScreen() {
  const { id, name, avatar } = useLocalSearchParams();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Mock dealer data - in a real app, this would be fetched based on the dealer ID
  const dealerProfile = {
    id: id as string,
    name: name as string,
    avatar: avatar as string,
    location: 'New York, NY',
    joinedDate: 'March 2019',
    isVerified: true,
    isOnline: true,
    lastSeen: null,
    
    // Stats
    rating: 4.9,
    totalDeals: 147,
    totalVolume: 2450000,
    vouchers: 23,
    followers: 89,
    
    // Business Info
    businessName: 'Chen Luxury Timepieces',
    specialties: ['Rolex', 'Tudor', 'Omega', 'Vintage'],
    languages: ['English', 'Mandarin'],
    
    // Contact
    phone: '+1 (555) 123-4567',
    email: 'marcus@chenluxury.com',
    website: 'www.chenluxury.com',
    
    // Recent Activity
    recentListings: [
      { id: '1', title: 'Submariner Date 116610LN', price: 12500, image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '2', title: 'GMT Master II 126710BLNR', price: 18500, image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '3', title: 'Daytona 116500LN', price: 28000, image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    
    // Reviews
    recentReviews: [
      {
        id: '1',
        reviewer: 'Sarah Williams',
        reviewerAvatar: 'SW',
        rating: 5,
        comment: 'Excellent communication and fast shipping. Watch arrived exactly as described.',
        date: '2 weeks ago',
        dealValue: '$15,000'
      },
      {
        id: '2',
        reviewer: 'David Rodriguez',
        reviewerAvatar: 'DR',
        rating: 5,
        comment: 'Very professional dealer. Helped me find the exact watch I was looking for.',
        date: '1 month ago',
        dealValue: '$8,500'
      },
      {
        id: '3',
        reviewer: 'Emma Thompson',
        reviewerAvatar: 'ET',
        rating: 4,
        comment: 'Great selection and fair prices. Would definitely buy from again.',
        date: '2 months ago',
        dealValue: '$22,000'
      },
    ]
  };

  const handleMessage = () => {
    router.push({
      pathname: '/chat/[id]',
      params: { 
        id: dealerProfile.id,
        name: dealerProfile.name,
        avatar: dealerProfile.avatar,
        isOnline: dealerProfile.isOnline ? 'true' : 'false'
      }
    });
  };

  const handleCall = () => {
    Alert.alert(
      'Call Dealer',
      `Call ${dealerProfile.name} at ${dealerProfile.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling dealer...') }
      ]
    );
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = () => {
    Alert.alert('Share Profile', 'Share dealer profile functionality would be implemented here');
  };

  const handleReport = () => {
    Alert.alert('Report Dealer', 'Report functionality would be implemented here');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatVolume = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dealer Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Share size={20} color="#8892b0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleReport}>
            <Flag size={20} color="#8892b0" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{dealerProfile.avatar}</Text>
            </View>
            {dealerProfile.isOnline && <View style={styles.onlineIndicator} />}
            {dealerProfile.isVerified && (
              <View style={styles.verifiedBadge}>
                <Shield size={16} color="#ffffff" />
              </View>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.dealerName}>{dealerProfile.name}</Text>
            <Text style={styles.businessName}>{dealerProfile.businessName}</Text>
            
            <View style={styles.locationRow}>
              <MapPin size={14} color="#8892b0" />
              <Text style={styles.location}>{dealerProfile.location}</Text>
            </View>
            
            <View style={styles.joinedRow}>
              <Calendar size={14} color="#8892b0" />
              <Text style={styles.joinedText}>Member since {dealerProfile.joinedDate}</Text>
            </View>
            
            <View style={styles.statusRow}>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: dealerProfile.isOnline ? '#38a169' : '#8892b0' }]} />
                <Text style={styles.statusText}>
                  {dealerProfile.isOnline ? 'Online now' : `Last seen ${dealerProfile.lastSeen}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
            <MessageCircle size={20} color="#1a2332" />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Phone size={20} color="#d69e2e" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.followButton, isFollowing && styles.followingButton]} 
            onPress={handleFollow}
          >
            <Heart 
              size={20} 
              color={isFollowing ? "#ffffff" : "#d69e2e"} 
              fill={isFollowing ? "#ffffff" : "transparent"}
            />
            <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Star size={20} color="#d69e2e" fill="#d69e2e" />
            </View>
            <Text style={styles.statValue}>{dealerProfile.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <TrendingUp size={20} color="#38a169" />
            </View>
            <Text style={styles.statValue}>{dealerProfile.totalDeals}</Text>
            <Text style={styles.statLabel}>Deals</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Users size={20} color="#d69e2e" />
            </View>
            <Text style={styles.statValue}>{dealerProfile.vouchers}</Text>
            <Text style={styles.statLabel}>Vouchers</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <DollarSign size={20} color="#38a169" />
            </View>
            <Text style={styles.statValue}>{formatVolume(dealerProfile.totalVolume)}</Text>
            <Text style={styles.statLabel}>Volume</Text>
          </View>
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <View style={styles.specialties}>
            {dealerProfile.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Listings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Listings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listingsScroll}>
            {dealerProfile.recentListings.map((listing) => (
              <TouchableOpacity key={listing.id} style={styles.listingCard}>
                <View style={styles.listingImage} />
                <Text style={styles.listingTitle} numberOfLines={2}>{listing.title}</Text>
                <Text style={styles.listingPrice}>{formatPrice(listing.price)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {dealerProfile.recentReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerAvatar}>
                  <Text style={styles.reviewerAvatarText}>{review.reviewerAvatar}</Text>
                </View>
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>{review.reviewer}</Text>
                  <View style={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        color="#d69e2e" 
                        fill={i < review.rating ? "#d69e2e" : "transparent"}
                      />
                    ))}
                  </View>
                </View>
                <View style={styles.reviewMeta}>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                  <Text style={styles.reviewDealValue}>{review.dealValue}</Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Phone size={16} color="#8892b0" />
              <Text style={styles.contactText}>{dealerProfile.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📧</Text>
              <Text style={styles.contactText}>{dealerProfile.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>🌐</Text>
              <Text style={styles.contactText}>{dealerProfile.website}</Text>
            </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 4,
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
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#A8D8AD',
    borderWidth: 3,
    borderColor: '#F5F0E1',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#A8D8AD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F5F0E1',
  },
  profileInfo: {
    alignItems: 'center',
  },
  dealerName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  businessName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  joinedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  joinedText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B7355',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  messageButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8B7355',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  callButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8B7355',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  followingButton: {
    backgroundColor: '#8B7355',
  },
  followButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
  },
  followingButtonText: {
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
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
  listingsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  listingCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
  },
  listingImage: {
    width: '100%',
    height: 80,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginBottom: 8,
  },
  listingTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
    lineHeight: 16,
  },
  listingPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#8B7355',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerAvatarText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewMeta: {
    alignItems: 'flex-end',
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 2,
  },
  reviewDealValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactIcon: {
    fontSize: 16,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  bottomSpacing: {
    height: 40,
  },
});