import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Hash, Users, Pin } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface Group {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isPremium?: boolean;
  lastActiveChannel?: string;
  priority: 'high' | 'normal' | 'low';
}

interface DirectMessage {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  isOnline: boolean;
  priority: 'high' | 'normal' | 'low';
}

type ConversationType = 'all' | 'unread' | 'groups' | 'dms' | 'pinned';

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ConversationType>('all');
  const [pinnedConversations] = useState<string[]>(['group-1', 'dm-1']);

  const groups: Group[] = [
    {
      id: 'group-1',
      name: 'Rolex Dealers',
      lastMessage: 'New GMT Master II available in perfect condition',
      timestamp: '2m ago',
      unreadCount: 3,
      isPremium: true,
      lastActiveChannel: 'listings',
      priority: 'high',
    },
    {
      id: 'group-2',
      name: 'Audemars Piguet',
      lastMessage: 'Call Out: Royal Oak 15400ST',
      timestamp: '15m ago',
      unreadCount: 1,
      isPremium: true,
      lastActiveChannel: 'call-out',
      priority: 'high',
    },
    {
      id: 'group-3',
      name: 'Vintage Collectors',
      lastMessage: 'Found amazing 1960s Speedmaster',
      timestamp: '1h ago',
      unreadCount: 0,
      lastActiveChannel: 'listings',
      priority: 'normal',
    },
    {
      id: 'group-4',
      name: 'Patek Philippe',
      lastMessage: 'Looking for pricing on vintage Calatrava',
      timestamp: '2h ago',
      unreadCount: 2,
      isPremium: true,
      lastActiveChannel: 'need-quote',
      priority: 'normal',
    },
    {
      id: 'group-5',
      name: 'General Discussion',
      lastMessage: 'Basel World 2024 predictions?',
      timestamp: '3h ago',
      unreadCount: 0,
      lastActiveChannel: 'general',
      priority: 'low',
    },
  ];

  const directMessages: DirectMessage[] = [
    {
      id: 'dm-1',
      name: 'Marcus Chen',
      lastMessage: 'The Submariner is still available',
      timestamp: '5m ago',
      unreadCount: 2,
      avatar: 'MC',
      isOnline: true,
      priority: 'high',
    },
    {
      id: 'dm-2',
      name: 'Sarah Williams',
      lastMessage: 'Can you send more photos?',
      timestamp: '1h ago',
      unreadCount: 0,
      avatar: 'SW',
      isOnline: false,
      priority: 'normal',
    },
    {
      id: 'dm-3',
      name: 'David Rodriguez',
      lastMessage: 'Deal confirmed. Payment incoming.',
      timestamp: '2h ago',
      unreadCount: 1,
      avatar: 'DR',
      isOnline: true,
      priority: 'high',
    },
    {
      id: 'dm-4',
      name: 'Emma Thompson',
      lastMessage: 'Thanks for the quick response',
      timestamp: '1d ago',
      unreadCount: 0,
      avatar: 'ET',
      isOnline: false,
      priority: 'low',
    },
  ];

  const filters = [
    { key: 'all', label: 'All', count: groups.length + directMessages.length },
    { key: 'unread', label: 'Unread', count: [...groups, ...directMessages].filter(c => c.unreadCount > 0).length },
    { key: 'pinned', label: 'Pinned', count: pinnedConversations.length },
    { key: 'groups', label: 'Groups', count: groups.length },
    { key: 'dms', label: 'DMs', count: directMessages.length },
  ];

  const getSmartSortedConversations = () => {
    let allConversations: Array<(Group | DirectMessage) & { type: 'group' | 'dm' }> = [
      ...groups.map(g => ({ ...g, type: 'group' as const })),
      ...directMessages.map(dm => ({ ...dm, type: 'dm' as const }))
    ];

    switch (activeFilter) {
      case 'unread':
        allConversations = allConversations.filter(c => c.unreadCount > 0);
        break;
      case 'groups':
        allConversations = allConversations.filter(c => c.type === 'group');
        break;
      case 'dms':
        allConversations = allConversations.filter(c => c.type === 'dm');
        break;
      case 'pinned':
        allConversations = allConversations.filter(c => 
          pinnedConversations.includes(`${c.type}-${c.id.split('-')[1]}`)
        );
        break;
    }

    return allConversations.sort((a, b) => {
      const aId = `${a.type}-${a.id.split('-')[1]}`;
      const bId = `${b.type}-${b.id.split('-')[1]}`;
      
      const aPinned = pinnedConversations.includes(aId);
      const bPinned = pinnedConversations.includes(bId);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      
      if (a.unreadCount > 0 && a.priority === 'high' && !(b.unreadCount > 0 && b.priority === 'high')) return -1;
      if (!(a.unreadCount > 0 && a.priority === 'high') && b.unreadCount > 0 && b.priority === 'high') return 1;
      
      if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
      if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
      
      const timeOrder = ['now', '1m ago', '2m ago', '5m ago', '15m ago', '30m ago', '45m ago', '1h ago', '2h ago', '3h ago', '1d ago'];
      const aTimeIndex = timeOrder.indexOf(a.timestamp);
      const bTimeIndex = timeOrder.indexOf(b.timestamp);
      return aTimeIndex - bTimeIndex;
    });
  };

  const handleGroupPress = (group: Group) => {
    router.push({
      pathname: '/channel/[id]',
      params: { 
        id: group.id,
        name: group.name,
        isPremium: group.isPremium ? 'true' : 'false'
      }
    });
  };

  const handleDirectMessagePress = (dm: DirectMessage) => {
    router.push({
      pathname: '/chat/[id]',
      params: { 
        id: dm.id,
        name: dm.name,
        avatar: dm.avatar,
        isOnline: dm.isOnline ? 'true' : 'false'
      }
    });
  };

  const handleSearchPress = () => {
    router.push({
      pathname: '/search/messages',
      params: { query: searchQuery }
    });
  };

  const handleCreatePress = () => {
    router.push('/create/message');
  };

  const renderConversationItem = (conversation: (Group | DirectMessage) & { type: 'group' | 'dm' }) => {
    const isGroup = conversation.type === 'group';
    const isPinned = pinnedConversations.includes(`${conversation.type}-${conversation.id.split('-')[1]}`);
    
    return (
      <TouchableOpacity 
        key={`${conversation.type}-${conversation.id}`}
        style={[
          styles.conversationItem,
          conversation.priority === 'high' && conversation.unreadCount > 0 && styles.highPriorityItem,
          isPinned && styles.pinnedItem
        ]}
        onPress={() => isGroup ? handleGroupPress(conversation as Group) : handleDirectMessagePress(conversation as DirectMessage)}
      >
        {conversation.priority === 'high' && conversation.unreadCount > 0 && (
          <View style={styles.priorityIndicator} />
        )}
        
        {isPinned && (
          <View style={styles.pinnedIndicator}>
            <Pin size={12} color="#8B7355" />
          </View>
        )}

        {isGroup ? (
          <View style={styles.groupIcon}>
            <Hash size={16} color="#8B7355" strokeWidth={1.5} />
          </View>
        ) : (
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(conversation as DirectMessage).avatar}</Text>
            </View>
            {(conversation as DirectMessage).isOnline && <View style={styles.onlineIndicator} />}
          </View>
        )}

        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <View style={styles.nameRow}>
              <Text style={styles.conversationName}>{conversation.name}</Text>
              {isGroup && (conversation as Group).lastActiveChannel && (
                <Text style={styles.channelIndicator}>
                  #{(conversation as Group).lastActiveChannel}
                </Text>
              )}
            </View>
            <Text style={styles.timestamp}>{conversation.timestamp}</Text>
          </View>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {conversation.lastMessage}
          </Text>
        </View>

        {conversation.unreadCount > 0 && (
          <View style={[
            styles.unreadBadge,
            conversation.priority === 'high' && styles.highPriorityBadge
          ]}>
            <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const sortedConversations = getSmartSortedConversations();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleSearchPress}>
            <Search size={20} color="#9CA3AF" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.directoryButton}
            onPress={() => router.push('/directory')}
          >
            <Users size={20} color="#9CA3AF" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleCreatePress}>
            <Plus size={20} color="#9CA3AF" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
        <Search size={16} color="#6B7280" style={styles.searchIcon} strokeWidth={1.5} />
        <Text style={styles.searchPlaceholder}>Search messages...</Text>
      </TouchableOpacity>

      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                activeFilter === filter.key && styles.filterTabActive
              ]}
              onPress={() => setActiveFilter(filter.key as ConversationType)}
            >
              <Text style={[
                styles.filterTabName,
                activeFilter === filter.key && styles.filterTabNameActive
              ]}>
                {filter.label}
              </Text>
              <Text style={[
                styles.filterCount,
                activeFilter === filter.key && styles.filterCountActive
              ]}>
                {filter.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sortedConversations.length > 0 ? (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsText}>
                {sortedConversations.length} conversation{sortedConversations.length !== 1 ? 's' : ''}
                {activeFilter !== 'all' && ` • ${filters.find(f => f.key === activeFilter)?.label}`}
              </Text>
              {activeFilter === 'all' && (
                <Text style={styles.resultsSubtext}>
                  Sorted by priority and recent activity
                </Text>
              )}
            </View>

            {sortedConversations.map(renderConversationItem)}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No {activeFilter === 'all' ? '' : filters.find(f => f.key === activeFilter)?.label.toLowerCase()} conversations
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
  directoryButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
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
  filtersContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterTabActive: {
    backgroundColor: '#8B7355',
    borderColor: '#8B7355',
  },
  filterTabName: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  filterTabNameActive: {
    color: '#FFFFFF',
  },
  filterCount: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#666666',
  },
  filterCountActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  resultsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  resultsSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 2,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    position: 'relative',
  },
  highPriorityItem: {
    backgroundColor: 'rgba(139, 115, 85, 0.05)',
    borderLeftWidth: 3,
    borderLeftColor: '#8B7355',
  },
  pinnedItem: {
    backgroundColor: 'rgba(139, 115, 85, 0.03)',
  },
  priorityIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#E57373',
  },
  pinnedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A8D8AD',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  conversationName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  channelIndicator: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#8B7355',
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  unreadBadge: {
    backgroundColor: '#8B7355',
    borderRadius: 12,
    minWidth: 24,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  highPriorityBadge: {
    backgroundColor: '#E57373',
  },
  unreadCount: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});