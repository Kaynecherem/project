import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Plus, MessageSquare, Heart, Share, Pin, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useState } from 'react';

interface Reply {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  likes: number;
  isLiked: boolean;
}

export default function ThreadScreen() {
  const { id, title, category, channelName } = useLocalSearchParams();
  const [messageText, setMessageText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  
  const originalPost = {
    id: '1',
    sender: 'Marcus Chen',
    avatar: 'MC',
    content: 'New GMT Master II available in perfect condition. Box and papers included. $13,500. Recently serviced by Rolex and keeping excellent time. Located in NYC, can meet in person or ship insured.',
    timestamp: '2 hours ago',
    likes: 12,
    category: category as string,
  };

  const replies: Reply[] = [
    {
      id: '1',
      sender: 'Sarah Williams',
      avatar: 'SW',
      content: 'Beautiful piece! Can you share some additional photos of the clasp and case back?',
      timestamp: '1h ago',
      isOwn: false,
      likes: 3,
      isLiked: false,
    },
    {
      id: '2',
      sender: 'David Rodriguez',
      avatar: 'DR',
      content: 'What year is this? And do you have the service papers from the recent service?',
      timestamp: '45m ago',
      isOwn: false,
      likes: 1,
      isLiked: false,
    },
    {
      id: '3',
      sender: 'Marcus Chen',
      avatar: 'MC',
      content: 'It\'s a 2019 model. I have all the service documentation. Let me get those photos for you Sarah.',
      timestamp: '30m ago',
      isOwn: false,
      likes: 2,
      isLiked: false,
    },
    {
      id: '4',
      sender: 'You',
      avatar: 'YO',
      content: 'Very interested! Sending you a DM now.',
      timestamp: '15m ago',
      isOwn: true,
      likes: 0,
      isLiked: false,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'listing': return '#38a169';
      case 'callout': return '#3182ce';
      case 'quote': return '#805ad5';
      case 'general': return '#8892b0';
      default: return '#8892b0';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'listing': return '💰';
      case 'callout': return '🔍';
      case 'quote': return '💬';
      case 'general': return '💭';
      default: return '💭';
    }
  };

  const handleSendReply = () => {
    if (messageText.trim()) {
      // In a real app, this would send the reply
      setMessageText('');
    }
  };

  const handleLikeReply = (replyId: string) => {
    // In a real app, this would toggle the like status
  };

  const renderReply = (reply: Reply) => (
    <View key={reply.id} style={[
      styles.replyContainer,
      reply.isOwn && styles.ownReplyContainer
    ]}>
      {!reply.isOwn && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{reply.avatar}</Text>
        </View>
      )}
      
      <View style={[
        styles.replyBubble,
        reply.isOwn && styles.ownReplyBubble
      ]}>
        {!reply.isOwn && (
          <Text style={styles.senderName}>{reply.sender}</Text>
        )}
        
        <Text style={[
          styles.replyText,
          reply.isOwn && styles.ownReplyText
        ]}>
          {reply.content}
        </Text>
        
        <View style={styles.replyFooter}>
          <Text style={[
            styles.replyTime,
            reply.isOwn && styles.ownReplyTime
          ]}>
            {reply.timestamp}
          </Text>
          
          {!reply.isOwn && (
            <TouchableOpacity 
              style={styles.likeButton}
              onPress={() => handleLikeReply(reply.id)}
            >
              <Heart 
                size={12} 
                color={reply.isLiked ? "#d69e2e" : "#8892b0"} 
                fill={reply.isLiked ? "#d69e2e" : "transparent"}
              />
              {reply.likes > 0 && (
                <Text style={styles.likeCount}>{reply.likes}</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
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
          
          <View style={styles.threadInfo}>
            <Text style={styles.channelName}>#{channelName}</Text>
            <Text style={styles.threadTitle} numberOfLines={1}>{title}</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Pin size={20} color="#8892b0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Share size={20} color="#8892b0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MoreHorizontal size={20} color="#8892b0" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Thread Content */}
        <ScrollView 
          style={styles.threadContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.threadContent}
        >
          {/* Original Post */}
          <View style={styles.originalPost}>
            <View style={styles.postHeader}>
              <View style={styles.postStarter}>
                <View style={styles.postAvatar}>
                  <Text style={styles.postAvatarText}>{originalPost.avatar}</Text>
                </View>
                <View style={styles.postMeta}>
                  <Text style={styles.postStarterName}>{originalPost.sender}</Text>
                  <Text style={styles.postTimestamp}>{originalPost.timestamp}</Text>
                </View>
              </View>
              
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryEmoji}>{getCategoryIcon(originalPost.category)}</Text>
                <Text style={[styles.categoryText, { color: getCategoryColor(originalPost.category) }]}>
                  {originalPost.category.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postContent}>{originalPost.content}</Text>

            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.likeButton}
                onPress={() => setIsLiked(!isLiked)}
              >
                <Heart 
                  size={16} 
                  color={isLiked ? "#d69e2e" : "#8892b0"} 
                  fill={isLiked ? "#d69e2e" : "transparent"}
                />
                <Text style={styles.likeCount}>{originalPost.likes + (isLiked ? 1 : 0)}</Text>
              </TouchableOpacity>
              
              <View style={styles.replyCount}>
                <MessageSquare size={16} color="#8892b0" />
                <Text style={styles.replyCountText}>{replies.length} replies</Text>
              </View>
            </View>
          </View>

          {/* Replies */}
          <View style={styles.repliesSection}>
            <Text style={styles.repliesTitle}>Replies</Text>
            {replies.map(renderReply)}
          </View>
        </ScrollView>

        {/* Reply Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Plus size={20} color="#8892b0" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.messageInput}
            placeholder="Reply to thread..."
            placeholderTextColor="#8892b0"
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              messageText.trim() && styles.sendButtonActive
            ]}
            onPress={handleSendReply}
            disabled={!messageText.trim()}
          >
            <Send size={18} color={messageText.trim() ? "#1a2332" : "#8892b0"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  threadInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 2,
  },
  threadTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  threadContainer: {
    flex: 1,
  },
  threadContent: {
    padding: 16,
  },
  originalPost: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 24,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postStarter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postAvatarText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  postMeta: {
    gap: 2,
  },
  postStarterName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  postTimestamp: {
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
  postTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 4,
  },
  likeCount: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  replyCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  replyCountText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  repliesSection: {
    gap: 16,
  },
  repliesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  ownReplyContainer: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  replyBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    maxWidth: '75%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  ownReplyBubble: {
    backgroundColor: '#8B7355',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
  },
  senderName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#8B7355',
    marginBottom: 4,
  },
  replyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    lineHeight: 20,
    marginBottom: 6,
  },
  ownReplyText: {
    color: '#FFFFFF',
  },
  replyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  replyTime: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  ownReplyTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F5F0E1',
    gap: 12,
  },
  attachButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sendButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  sendButtonActive: {
    backgroundColor: '#8B7355',
  },
});