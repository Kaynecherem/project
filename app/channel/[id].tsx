import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Plus, Crown, Users, Pin, Hash, Search, MessageSquare } from 'lucide-react-native';
import { useState } from 'react';

interface Thread {
  id: string;
  title: string;
  starter: string;
  starterAvatar: string;
  content: string;
  timestamp: string;
  replyCount: number;
  lastReply: string;
  isPinned?: boolean;
  category: 'listing' | 'callout' | 'quote' | 'general' | 'reference-check';
}

export default function GroupScreen() {
  const { id, name, isPremium } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'listing' | 'callout' | 'quote' | 'general' | 'reference-check'>('all');
  
  const threads: Thread[] = [
    {
      id: '1',
      title: 'GMT Master II - Perfect Condition',
      starter: 'Marcus Chen',
      starterAvatar: 'MC',
      content: 'New GMT Master II available in perfect condition. Box and papers included. $13,500.',
      timestamp: '2m ago',
      replyCount: 8,
      lastReply: '1m ago',
      isPinned: true,
      category: 'listing',
    },
    {
      id: '2',
      title: 'Call Out: Royal Oak 15400ST',
      starter: 'Sarah Williams',
      starterAvatar: 'SW',
      content: 'Looking for Royal Oak 15400ST in good condition. Budget up to $28k. Prefer with box and papers.',
      timestamp: '15m ago',
      replyCount: 12,
      lastReply: '3m ago',
      category: 'callout',
    },
    {
      id: '3',
      title: 'Need Quote: Vintage Daytona',
      starter: 'David Rodriguez',
      starterAvatar: 'DR',
      content: 'Looking for pricing on a 1970s Daytona ref 6263. Condition flexible, need quotes from multiple dealers.',
      timestamp: '45m ago',
      replyCount: 6,
      lastReply: '20m ago',
      category: 'quote',
    },
    {
      id: '4',
      title: 'Basel World 2024 Predictions',
      starter: 'Emma Thompson',
      starterAvatar: 'ET',
      content: 'What do you think we\'ll see at Basel World this year? I\'m expecting some interesting releases from Omega.',
      timestamp: '1h ago',
      replyCount: 24,
      lastReply: '12m ago',
      category: 'general',
    },
    {
      id: '5',
      title: 'Reference Check: High-Value Patek Deal',
      starter: 'Robert Kim',
      starterAvatar: 'RK',
      content: 'Need additional vouches for a $150K Patek Philippe transaction. Looking for community verification.',
      timestamp: '2h ago',
      replyCount: 8,
      lastReply: '45m ago',
      category: 'reference-check',
    },
    {
      id: '6',
      title: 'Vintage Speedmaster Find',
      starter: 'David Rodriguez',
      starterAvatar: 'DR',
      content: 'Found an amazing 1960s Speedmaster at an estate sale. Completely original with tropical dial.',
      timestamp: '3h ago',
      replyCount: 15,
      lastReply: '1h ago',
      category: 'listing',
    },
    {
      id: '7',
      title: 'Call Out: Patek Philippe Calatrava',
      starter: 'Robert Kim',
      starterAvatar: 'RK',
      content: 'Looking for a clean Calatrava ref 5196 or similar. White gold preferred. Budget flexible for the right piece.',
      timestamp: '4h ago',
      replyCount: 6,
      lastReply: '2h ago',
      category: 'callout',
    },
    {
      id: '8',
      title: 'Market Analysis: Q1 2024 Trends',
      starter: 'Emma Thompson',
      starterAvatar: 'ET',
      content: 'Interesting trends emerging in the luxury watch market this quarter. Sports models continue to dominate.',
      timestamp: '6h ago',
      replyCount: 18,
      lastReply: '3h ago',
      category: 'general',
    },
  ];

  const categories = [
    { key: 'all', label: 'All', emoji: '💬', count: threads.length },
    { key: 'listing', label: 'Listings', emoji: '💰', count: threads.filter(t => t.category === 'listing').length },
    { key: 'callout', label: 'Call Outs', emoji: '🔍', count: threads.filter(t => t.category === 'callout').length },
    { key: 'quote', label: 'Quotes', emoji: '💬', count: threads.filter(t => t.category === 'quote').length },
    { key: 'general', label: 'General', emoji: '💭', count: threads.filter(t => t.category === 'general').length },
    { key: 'reference-check', label: 'Reference', emoji: '🛡️', count: threads.filter(t => t.category === 'reference-check').length },
  ];

  const filteredThreads = selectedCategory === 'all' 
    ? threads 
    : threads.filter(thread => thread.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'listing': return '#38a169';
      case 'callout': return '#3182ce';
      case 'quote': return '#805ad5';
      case 'general': return '#8892b0';
      case 'reference-check': return '#e53e3e';
      default: return '#8892b0';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'listing': return '💰';
      case 'callout': return '🔍';
      case 'quote': return '💬';
      case 'general': return '💭';
      case 'reference-check': return '🛡️';
      default: return '💭';
    }
  };

  const handleThreadPress = (thread: Thread) => {
    router.push({
      pathname: '/thread/[id]',
      params: { 
        id: thread.id,
        title: thread.title,
        category: thread.category,
        groupName: name
      }
    });
  };

  const renderThread = (thread: Thread) => (
    <TouchableOpacity 
      key={thread.id} 
      style={[styles.threadCard, thread.isPinned && styles.pinnedThread]}
      onPress={() => handleThreadPress(thread)}
    >
      {thread.isPinned && (
        <View style={styles.pinnedIndicator}>
          <Pin size={12} color="#d69e2e" />
          <Text style={styles.pinnedText}>Pinned</Text>
        </View>
      )}
      
      <View style={styles.threadHeader}>
        <View style={styles.threadStarter}>
          <View style={styles.threadAvatar}>
            <Text style={styles.threadAvatarText}>{thread.starterAvatar}</Text>
          </View>
          <View style={styles.threadMeta}>
            <Text style={styles.threadStarterName}>{thread.starter}</Text>
            <Text style={styles.threadTimestamp}>{thread.timestamp}</Text>
          </View>
        </View>
        
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryEmoji}>{getCategoryIcon(thread.category)}</Text>
          <Text style={[styles.categoryText, { color: getCategoryColor(thread.category) }]}>
            {thread.category.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.threadTitle}>{thread.title}</Text>
      <Text style={styles.threadContent} numberOfLines={2}>{thread.content}</Text>

      <View style={styles.threadFooter}>
        <View style={styles.threadReplies}>
          <MessageSquare size={14} color="#8892b0" />
          <Text style={styles.threadReplyCount}>{thread.replyCount} replies</Text>
        </View>
        <Text style={styles.threadLastReply}>Last reply {thread.lastReply}</Text>
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
          
          <View style={styles.groupInfo}>
            <View style={styles.groupTitleRow}>
              <Text style={styles.groupName}>#{name}</Text>
              {isPremium === 'true' && (
                <Crown size={16} color="#d69e2e" />
              )}
            </View>
            <View style={styles.memberCount}>
              <Users size={12} color="#8892b0" />
              <Text style={styles.memberCountText}>247 members • {filteredThreads.length} threads</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.headerButton}>
          <Search size={20} color="#8892b0" />
        </TouchableOpacity>
      </View>

      {/* Category Filters */}
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryTab,
                selectedCategory === category.key && styles.activeCategoryTab
              ]}
              onPress={() => setSelectedCategory(category.key as any)}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text style={[
                styles.categoryLabel,
                selectedCategory === category.key && styles.activeCategoryLabel
              ]}>
                {category.label}
              </Text>
              <Text style={[
                styles.categoryCount,
                selectedCategory === category.key && styles.activeCategoryCount
              ]}>
                {category.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Threads List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.threadsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {filteredThreads.length} threads
              {selectedCategory !== 'all' && ` • ${categories.find(c => c.key === selectedCategory)?.label}`}
            </Text>
            <Text style={styles.resultsSubtext}>
              Organized by category for easy browsing
            </Text>
          </View>
          
          {filteredThreads.map(renderThread)}
        </View>
        
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#1a2332" />
      </TouchableOpacity>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  groupName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  memberCountText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  headerButton: {
    padding: 8,
  },
  categoryContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeCategoryTab: {
    backgroundColor: '#8B7355',
    borderColor: '#8B7355',
  },
  categoryEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  activeCategoryLabel: {
    color: '#FFFFFF',
  },
  categoryCount: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#666666',
  },
  activeCategoryCount: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  threadsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  resultsHeader: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  resultsText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  resultsSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 2,
  },
  threadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 12,
  },
  pinnedThread: {
    borderColor: '#8B7355',
    borderWidth: 1.5,
  },
  pinnedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  pinnedText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  threadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  threadStarter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  threadAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  threadAvatarText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  threadMeta: {
    gap: 2,
  },
  threadStarterName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  threadTimestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryEmoji: {
    fontSize: 12,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  threadTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  threadContent: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  threadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  threadReplies: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  threadReplyCount: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  threadLastReply: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bottomSpacing: {
    height: 80,
  },
});