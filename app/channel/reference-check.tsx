import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Plus, Users, Star, Shield, MessageSquare, ExternalLink } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface ReferenceRequest {
  id: string;
  requester: string;
  requesterAvatar: string;
  dealerName: string;
  dealerAvatar: string;
  dealSize: string;
  description: string;
  timestamp: string;
  responses: number;
  isUrgent?: boolean;
}

export default function ReferenceCheckScreen() {
  const [messageText, setMessageText] = useState('');
  
  const referenceRequests: ReferenceRequest[] = [
    {
      id: '1',
      requester: 'Michael Johnson',
      requesterAvatar: 'MJ',
      dealerName: 'Marcus Chen',
      dealerAvatar: 'MC',
      dealSize: '$150K',
      description: 'Looking for additional references for a high-value Patek Philippe transaction. Need to verify reliability for deals over $100K.',
      timestamp: '2h ago',
      responses: 8,
      isUrgent: true,
    },
    {
      id: '2',
      requester: 'Sarah Williams',
      requesterAvatar: 'SW',
      dealerName: 'David Rodriguez',
      dealerAvatar: 'DR',
      dealSize: '$75K',
      description: 'First time working with this dealer. Looking for vouches on communication and shipping reliability.',
      timestamp: '5h ago',
      responses: 12,
    },
    {
      id: '3',
      requester: 'Emma Thompson',
      requesterAvatar: 'ET',
      dealerName: 'Robert Kim',
      dealerAvatar: 'RK',
      dealSize: '$300K',
      description: 'Considering a significant Richard Mille purchase. Need references from dealers who have done similar high-value transactions.',
      timestamp: '1d ago',
      responses: 15,
    },
  ];

  const handleCreateRequest = () => {
    router.push('/create/reference-check');
  };

  const handleRequestPress = (request: ReferenceRequest) => {
    router.push({
      pathname: '/thread/[id]',
      params: { 
        id: request.id,
        title: `Reference Check: ${request.dealerName}`,
        category: 'reference-check',
        channelName: 'Reference Check'
      }
    });
  };

  const handleViewProfile = (dealerName: string) => {
    // In a real app, this would navigate to dealer profile
    Alert.alert('View Profile', `Navigate to ${dealerName}'s profile`);
  };

  const renderReferenceRequest = (request: ReferenceRequest) => (
    <TouchableOpacity 
      key={request.id} 
      style={[styles.requestCard, request.isUrgent && styles.urgentRequest]}
      onPress={() => handleRequestPress(request)}
    >
      {request.isUrgent && (
        <View style={styles.urgentBadge}>
          <Text style={styles.urgentText}>🚨 URGENT</Text>
        </View>
      )}
      
      <View style={styles.requestHeader}>
        <View style={styles.requesterInfo}>
          <View style={styles.requesterAvatar}>
            <Text style={styles.requesterAvatarText}>{request.requesterAvatar}</Text>
          </View>
          <View style={styles.requesterDetails}>
            <Text style={styles.requesterName}>{request.requester}</Text>
            <Text style={styles.requestTimestamp}>{request.timestamp}</Text>
          </View>
        </View>
        
        <View style={styles.dealSizeBadge}>
          <Text style={styles.dealSizeText}>{request.dealSize}</Text>
        </View>
      </View>

      <View style={styles.dealerSection}>
        <Text style={styles.sectionLabel}>Reference Check For:</Text>
        <View style={styles.dealerInfo}>
          <View style={styles.dealerAvatar}>
            <Text style={styles.dealerAvatarText}>{request.dealerAvatar}</Text>
          </View>
          <Text style={styles.dealerName}>{request.dealerName}</Text>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => handleViewProfile(request.dealerName)}
          >
            <ExternalLink size={14} color="#d69e2e" />
            <Text style={styles.profileButtonText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.requestDescription}>{request.description}</Text>

      <View style={styles.requestFooter}>
        <View style={styles.responseCount}>
          <MessageSquare size={16} color="#8892b0" />
          <Text style={styles.responseCountText}>{request.responses} responses</Text>
        </View>
        
        <TouchableOpacity style={styles.respondButton}>
          <Text style={styles.respondButtonText}>Respond</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <View style={styles.channelInfo}>
            <Text style={styles.channelName}>#reference-check</Text>
            <Text style={styles.channelDescription}>Community reference verification</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.headerButton} onPress={handleCreateRequest}>
          <Plus size={20} color="#d69e2e" />
        </TouchableOpacity>
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Shield size={16} color="#d69e2e" />
        <Text style={styles.infoBannerText}>
          Request additional vouches from the community for high-value deals
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Active Requests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Active Reference Requests</Text>
          </View>
          
          {referenceRequests.map(renderReferenceRequest)}
        </View>

        {/* Guidelines */}
        <View style={styles.guidelinesSection}>
          <Text style={styles.guidelinesTitle}>📋 Reference Check Guidelines</Text>
          <View style={styles.guideline}>
            <Text style={styles.guidelineText}>• Use for deals over $50K or first-time transactions</Text>
          </View>
          <View style={styles.guideline}>
            <Text style={styles.guidelineText}>• Include deal size and specific concerns</Text>
          </View>
          <View style={styles.guideline}>
            <Text style={styles.guidelineText}>• Responses should be honest and factual</Text>
          </View>
          <View style={styles.guideline}>
            <Text style={styles.guidelineText}>• Mark urgent for time-sensitive deals</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateRequest}>
        <Plus size={24} color="#1a2332" />
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  channelDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1a2332',
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(214, 158, 46, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(214, 158, 46, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 8,
    gap: 8,
  },
  infoBannerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  requestCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
    marginBottom: 16,
  },
  urgentRequest: {
    borderColor: '#e53e3e',
    borderWidth: 1.5,
  },
  urgentBadge: {
    backgroundColor: '#e53e3e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  urgentText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  requesterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  requesterAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d69e2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  requesterAvatarText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#1a2332',
  },
  requesterDetails: {
    flex: 1,
  },
  requesterName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  requestTimestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  dealSizeBadge: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dealSizeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#d69e2e',
  },
  dealerSection: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  dealerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dealerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#d69e2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dealerAvatarText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#1a2332',
  },
  dealerName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    flex: 1,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d69e2e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  profileButtonText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#d69e2e',
  },
  requestDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
    marginBottom: 16,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
  },
  responseCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  responseCountText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  respondButton: {
    backgroundColor: '#d69e2e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  respondButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1a2332',
  },
  guidelinesSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#1a2332',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  guidelinesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  guideline: {
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#d69e2e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});