import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  MessageCircle, 
  Shield, 
  MapPin, 
  Clock, 
  Eye,
  Star,
  TrendingUp,
  Send,
  Phone,
  Calendar
} from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function ListingDetailScreen() {
  const { id, listing: listingParam } = useLocalSearchParams();
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Parse the listing data from params - with error handling
  let listing;
  try {
    listing = JSON.parse(listingParam as string);
  } catch (error) {
    console.error('Error parsing listing data:', error);
    // Fallback listing data
    listing = {
      id: '1',
      brand: 'Rolex',
      model: 'Submariner Date 116610LN',
      nickname: 'Black Sub',
      price: 12500,
      condition: 'Excellent',
      location: 'New York, NY',
      dealer: 'Marcus Chen',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
      postedTime: '2h ago',
      views: 47,
      saves: 12,
      verified: true,
    };
  }

  // Demo images for the listing - Multiple photos with different watches
  const listingImages = [
    'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  const quickActions = [
    {
      id: 'available',
      text: 'Is this still available?',
      icon: Clock,
      color: '#3182ce',
    },
    {
      id: 'condition',
      text: 'Can you tell me more about the condition?',
      icon: Shield,
      color: '#38a169',
    },
    {
      id: 'photos',
      text: 'Can you send more photos?',
      icon: Eye,
      color: '#805ad5',
    },
    {
      id: 'meetup',
      text: 'Can we arrange a meetup?',
      icon: MapPin,
      color: '#d69e2e',
    },
    {
      id: 'service',
      text: 'When was it last serviced?',
      icon: Calendar,
      color: '#e53e3e',
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const dealerProfile = {
    name: listing.dealer,
    avatar: listing.dealer.split(' ').map((n: string) => n[0]).join(''),
    rating: 4.9,
    totalDeals: 147,
    joinedDate: '2019',
    isVerified: true,
    specialties: ['Rolex', 'Tudor', 'Omega'],
  };

  const handleQuickAction = (action: any) => {
    console.log('Quick action pressed:', action.text);
    // Navigate to chat with pre-filled message
    router.push({
      pathname: '/chat/[id]',
      params: { 
        id: 'dealer-1',
        name: dealerProfile.name,
        avatar: dealerProfile.avatar,
        isOnline: 'true',
        quickMessage: action.text
      }
    });
  };

  const handleDirectMessage = () => {
    console.log('Direct message pressed');
    router.push({
      pathname: '/chat/[id]',
      params: { 
        id: 'dealer-1',
        name: dealerProfile.name,
        avatar: dealerProfile.avatar,
        isOnline: 'true'
      }
    });
  };

  const handleMakeOffer = () => {
    Alert.alert(
      'Make Offer',
      'This would open a form to submit an offer for this watch.',
      [{ text: 'OK' }]
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share Listing',
      'This would open sharing options for this listing.',
      [{ text: 'OK' }]
    );
  };

  const handleCall = () => {
    Alert.alert(
      'Call Dealer',
      'This would initiate a phone call to the dealer.',
      [{ text: 'OK' }]
    );
  };

  const handleImageScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentImageIndex(index);
  };

  console.log('Rendering listing detail with:', {
    listingId: id,
    imagesCount: listingImages.length,
    quickActionsCount: quickActions.length,
    currentImageIndex
  });

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
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsSaved(!isSaved)}
          >
            <Heart 
              size={24} 
              color={isSaved ? "#d69e2e" : "#8892b0"} 
              fill={isSaved ? "#d69e2e" : "transparent"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Share size={24} color="#8892b0" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 🖼️ PHOTO GALLERY - This should be visible! */}
        <View style={styles.imageGallery}>
          <Text style={styles.debugText}>📸 Photo Gallery ({listingImages.length} images)</Text>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleImageScroll}
            style={styles.imageScrollView}
          >
            {listingImages.map((imageUrl, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image 
                  source={{ uri: imageUrl }} 
                  style={styles.mainImage}
                  onError={(error) => console.log('Image load error:', error)}
                  onLoad={() => console.log('Image loaded:', index)}
                />
              </View>
            ))}
          </ScrollView>
          
          {/* Image Indicator Dots */}
          <View style={styles.imageIndicator}>
            {listingImages.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.indicatorDot,
                  currentImageIndex === index && styles.indicatorDotActive
                ]} 
              />
            ))}
          </View>
          
          {/* Image Counter */}
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {currentImageIndex + 1} / {listingImages.length}
            </Text>
          </View>
        </View>

        {/* Listing Info */}
        <View style={styles.listingInfo}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>{listing.brand}</Text>
            {listing.verified && (
              <View style={styles.verifiedBadge}>
                <Shield size={16} color="#ffffff" />
              </View>
            )}
          </View>
          
          <Text style={styles.model}>{listing.model}</Text>
          
          {listing.nickname && (
            <Text style={styles.nickname}>"{listing.nickname}"</Text>
          )}

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(listing.price)}</Text>
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionText}>{listing.condition}</Text>
            </View>
          </View>

          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <MapPin size={16} color="#8892b0" />
              <Text style={styles.metaText}>{listing.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={16} color="#8892b0" />
              <Text style={styles.metaText}>Posted {listing.postedTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Eye size={16} color="#8892b0" />
              <Text style={styles.metaText}>{listing.views} views</Text>
            </View>
          </View>
        </View>

        {/* Dealer Profile */}
        <View style={styles.dealerSection}>
          <Text style={styles.sectionTitle}>Dealer</Text>
          <View style={styles.dealerCard}>
            <View style={styles.dealerHeader}>
              <View style={styles.dealerAvatarContainer}>
                <View style={styles.dealerAvatar}>
                  <Text style={styles.dealerAvatarText}>{dealerProfile.avatar}</Text>
                </View>
                {dealerProfile.isVerified && (
                  <View style={styles.dealerVerifiedBadge}>
                    <Shield size={12} color="#ffffff" />
                  </View>
                )}
              </View>
              
              <View style={styles.dealerInfo}>
                <Text style={styles.dealerName}>{dealerProfile.name}</Text>
                <View style={styles.dealerRating}>
                  <Star size={14} color="#d69e2e" fill="#d69e2e" />
                  <Text style={styles.ratingText}>{dealerProfile.rating}</Text>
                  <Text style={styles.dealCountText}>• {dealerProfile.totalDeals} deals</Text>
                </View>
                <Text style={styles.memberSince}>Member since {dealerProfile.joinedDate}</Text>
              </View>
              
              <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                <Phone size={16} color="#d69e2e" />
              </TouchableOpacity>
            </View>

            <View style={styles.specialties}>
              <Text style={styles.specialtiesLabel}>Specialties:</Text>
              <View style={styles.specialtyTags}>
                {dealerProfile.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            Excellent condition {listing.brand} {listing.model}. This timepiece has been carefully maintained and shows minimal signs of wear. All original components including box and papers. Recently serviced and keeping excellent time.
            
            {'\n\n'}Features:
            {'\n'}• Automatic movement
            {'\n'}• Water resistant to 300m
            {'\n'}• Ceramic bezel
            {'\n'}• Stainless steel case and bracelet
            {'\n'}• Box and papers included
            {'\n'}• Recently serviced by authorized dealer
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* ⚡ QUICK ACTIONS - This should be visible above bottom buttons! */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.quickActionsTitle}>⚡ Quick Messages ({quickActions.length})</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsContent}
        >
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionButton, { borderColor: action.color }]}
              onPress={() => handleQuickAction(action)}
            >
              <action.icon size={16} color={action.color} />
              <Text style={styles.quickActionText}>{action.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.messageButton} onPress={handleDirectMessage}>
          <MessageCircle size={20} color="#1a2332" />
          <Text style={styles.messageButtonText}>Message Dealer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.offerButton} onPress={handleMakeOffer}>
          <Text style={styles.offerButtonText}>Make Offer</Text>
        </TouchableOpacity>
      </View>
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
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  // 🖼️ PHOTO GALLERY STYLES
  imageGallery: {
    position: 'relative',
    backgroundColor: '#FFFFFF', // Added background to make it visible
    borderBottomWidth: 2,
    borderBottomColor: '#8B7355', // Added border to make it obvious
  },
  debugText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#8B7355',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  imageScrollView: {
    height: width * 0.75, // Fixed height
  },
  imageContainer: {
    width: width,
    height: width * 0.75,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
    resizeMode: 'cover',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  indicatorDotActive: {
    backgroundColor: '#8B7355',
  },
  imageCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageCounterText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  listingInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verifiedBadge: {
    backgroundColor: '#A8D8AD',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  model: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
    lineHeight: 32,
  },
  nickname: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  conditionBadge: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  conditionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  metaInfo: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  dealerSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 16,
  },
  dealerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
  },
  dealerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dealerAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  dealerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dealerAvatarText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  dealerVerifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#A8D8AD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  dealerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
  },
  dealCountText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  memberSince: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialties: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  specialtiesLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
    marginBottom: 8,
  },
  specialtyTags: {
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
  descriptionSection: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 24,
  },
  // ⚡ QUICK ACTIONS STYLES
  quickActionsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2, // Made more prominent
    borderTopColor: '#8B7355', // Made it brown to be obvious
    paddingVertical: 16, // Increased padding
    minHeight: 80, // Added minimum height
  },
  quickActionsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold', // Made bold
    color: '#8B7355', // Made it brown
    paddingHorizontal: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickActionsContent: {
    paddingHorizontal: 20,
    gap: 12, // Increased gap
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16, // Increased padding
    paddingVertical: 12, // Increased padding
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    minWidth: 140, // Added minimum width
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#333333', // Made dark for better visibility
    maxWidth: 120,
  },
  bottomSpacing: {
    height: 20,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
    backgroundColor: '#F5F0E1',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B7355',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  messageButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  offerButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8B7355',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  offerButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
  },
});