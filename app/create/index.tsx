import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  X, 
  DollarSign, 
  MessageSquare, 
  Search, 
  Users,
  Crown,
  TrendingUp,
  Clock,
  Star,
  Quote
} from 'lucide-react-native';

interface CreateOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  route: string;
  premium?: boolean;
}

export default function CreateScreen() {
  const createOptions: CreateOption[] = [
    {
      id: 'listing',
      title: 'Create Listing',
      description: 'List a watch for sale with photos and details',
      icon: DollarSign,
      color: '#38a169',
      route: '/create/listing',
    },
    {
      id: 'thread',
      title: 'Start Thread',
      description: 'Begin a discussion in a channel',
      icon: MessageSquare,
      color: '#3182ce',
      route: '/create/thread',
    },
    {
      id: 'callout',
      title: 'Call Out',
      description: 'Post what you\'re looking to buy',
      icon: Search,
      color: '#d69e2e',
      route: '/create/thread?type=callout',
    },
    {
      id: 'quote',
      title: 'Need a Quote',
      description: 'Request pricing from dealers',
      icon: Quote,
      color: '#805ad5',
      route: '/create/thread?type=quote',
    },
    {
      id: 'invite',
      title: 'Invite Dealer',
      description: 'Invite a verified dealer to join',
      icon: Users,
      color: '#805ad5',
      route: '/create/invite',
      premium: true,
    },
  ];

  const quickStats = [
    { label: 'Active Listings', value: '1,247', icon: TrendingUp, color: '#38a169' },
    { label: 'This Week', value: '89', icon: Clock, color: '#d69e2e' },
    { label: 'Your Rating', value: '4.9', icon: Star, color: '#d69e2e' },
  ];

  const handleOptionPress = (option: CreateOption) => {
    router.push(option.route as any);
  };

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const renderCreateOption = (option: CreateOption) => (
    <TouchableOpacity 
      key={option.id}
      style={[styles.optionCard, { borderLeftColor: option.color }]}
      onPress={() => handleOptionPress(option)}
    >
      <View style={styles.optionHeader}>
        <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
          <option.icon size={24} color={option.color} strokeWidth={2} />
        </View>
        {option.premium && (
          <View style={styles.premiumBadge}>
            <Crown size={12} color="#d69e2e" />
          </View>
        )}
      </View>
      
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{option.title}</Text>
        <Text style={styles.optionDescription}>{option.description}</Text>
      </View>
      
      <View style={styles.optionArrow}>
        <Text style={styles.arrowText}>→</Text>
      </View>
    </TouchableOpacity>
  );

  const renderQuickStat = (stat: any, index: number) => (
    <View key={index} style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
        <stat.icon size={16} color={stat.color} />
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Create</Text>
          <Text style={styles.subtitle}>What would you like to create?</Text>
        </View>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={handleClose}
        >
          <X size={24} color="#8892b0" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            {quickStats.map(renderQuickStat)}
          </View>
        </View>

        {/* Create Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Create New</Text>
          <View style={styles.optionsGrid}>
            {createOptions.map(renderCreateOption)}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Listed Submariner Date</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
              <Text style={styles.activityStatus}>Active</Text>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#3182ce' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Started thread in Rolex Dealers</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
              <Text style={styles.activityStatus}>12 replies</Text>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#d69e2e' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Call Out: Royal Oak 15400ST</Text>
                <Text style={styles.activityTime}>3 days ago</Text>
              </View>
              <Text style={styles.activityStatus}>Found</Text>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Pro Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 Listing Success</Text>
            <Text style={styles.tipText}>
              Listings with 5+ high-quality photos get 3x more inquiries than those with fewer images.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>🎯 Thread Engagement</Text>
            <Text style={styles.tipText}>
              Ask specific questions in your threads to encourage more meaningful discussions.
            </Text>
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  content: {
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  optionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  optionsGrid: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderLeftWidth: 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionHeader: {
    position: 'relative',
    marginRight: 16,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  optionArrow: {
    marginLeft: 12,
  },
  arrowText: {
    fontSize: 18,
    color: '#666666',
    fontFamily: 'Inter-Regular',
  },
  activitySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A8D8AD',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  activityStatus: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
  },
  tipsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#333333',
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