import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, Eye, Clock, MapPin } from 'lucide-react-native';

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

interface ListingCardProps {
  listing: Listing;
  onPress: (listing: Listing) => void;
}

export default function ListingCard({ listing, onPress }: ListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <TouchableOpacity 
      style={styles.listingCard}
      onPress={() => onPress(listing)}
    >
      <Image source={{ uri: listing.image }} style={styles.listingImage} />
      <View style={styles.listingContent}>
        <View style={styles.listingHeader}>
          <View style={styles.brandInfo}>
            <Text style={styles.brand}>{listing.brand}</Text>
            {listing.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Heart size={18} color="#9CA3AF" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.model} numberOfLines={1}>
          {listing.model}
        </Text>
        
        {listing.nickname && (
          <Text style={styles.nickname}>"{listing.nickname}"</Text>
        )}
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(listing.price)}</Text>
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>{listing.condition}</Text>
          </View>
        </View>
        
        <View style={styles.listingFooter}>
          <View style={styles.dealerInfo}>
            <Text style={styles.dealer}>{listing.dealer}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={12} color="#9CA3AF" strokeWidth={1.5} />
              <Text style={styles.location}>{listing.location}</Text>
            </View>
          </View>
          
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Eye size={12} color="#9CA3AF" strokeWidth={1.5} />
              <Text style={styles.statText}>{listing.views}</Text>
            </View>
            <View style={styles.stat}>
              <Heart size={12} color="#9CA3AF" strokeWidth={1.5} />
              <Text style={styles.statText}>{listing.saves}</Text>
            </View>
            <View style={styles.stat}>
              <Clock size={12} color="#9CA3AF" strokeWidth={1.5} />
              <Text style={styles.statText}>{listing.postedTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listingCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  listingImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  listingContent: {
    padding: 16,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brand: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verifiedBadge: {
    backgroundColor: '#A8D8AD',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  saveButton: {
    padding: 4,
  },
  model: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  nickname: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  conditionBadge: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  conditionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  listingFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  dealerInfo: {
    marginBottom: 8,
  },
  dealer: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});