import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Plus, Phone, Video, MoveVertical as MoreVertical, User } from 'lucide-react-native';
import { useState } from 'react';
import AttachmentMenu from '@/components/AttachmentMenu';
import WireInstructionsModal from '@/components/WireInstructionsModal';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'wire_instructions' | 'wire_request' | 'payment_request';
  attachmentData?: any;
}

interface WireInstructions {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountName: string;
  swiftCode?: string;
  reference: string;
  amount?: string;
  notes?: string;
}

export default function ChatScreen() {
  const { id, name, avatar, isOnline, quickMessage } = useLocalSearchParams();
  const [messageText, setMessageText] = useState((quickMessage as string) || '');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showWireInstructionsModal, setShowWireInstructionsModal] = useState(false);
  
  const messages: Message[] = [
    {
      id: '1',
      content: 'Hi! I saw your Submariner listing. Is it still available?',
      timestamp: '10:30 AM',
      isOwn: true,
      status: 'read',
    },
    {
      id: '2',
      content: 'Yes, it\'s still available! It\'s in excellent condition with box and papers.',
      timestamp: '10:32 AM',
      isOwn: false,
    },
    {
      id: '3',
      content: 'Great! Can you send me some additional photos? Particularly of the clasp and case back?',
      timestamp: '10:35 AM',
      isOwn: true,
      status: 'read',
    },
    {
      id: '4',
      content: 'Of course! Let me take some detailed shots for you.',
      timestamp: '10:37 AM',
      isOwn: false,
    },
    {
      id: '5',
      content: 'The Submariner is still available',
      timestamp: '5m ago',
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message
      setMessageText('');
    }
  };

  const handleAttachmentPress = () => {
    setShowAttachmentMenu(true);
  };

  const handleCameraPress = () => {
    Alert.alert('Camera', 'Camera functionality would be implemented here');
  };

  const handleGalleryPress = () => {
    Alert.alert('Gallery', 'Photo gallery functionality would be implemented here');
  };

  const handleDocumentPress = () => {
    Alert.alert('Documents', 'Document picker functionality would be implemented here');
  };

  const handleLocationPress = () => {
    Alert.alert('Location', 'Location sharing functionality would be implemented here');
  };

  const handleWireInstructionsPress = () => {
    setShowWireInstructionsModal(true);
  };

  const handleWireFundsPress = () => {
    Alert.alert('Wire Funds', 'Wire transfer initiation functionality would be implemented here');
  };

  const handleRequestFundsPress = () => {
    Alert.alert('Request Funds', 'Payment request functionality would be implemented here');
  };

  const handleViewProfile = () => {
    // Navigate to dealer profile with proper parameters
    router.push({
      pathname: '/dealer/[id]',
      params: { 
        id: id,
        name: name,
        avatar: avatar
      }
    });
  };

  const handleSendWireInstructions = (instructions: WireInstructions) => {
    // In a real app, this would send the wire instructions as a special message
    console.log('Sending wire instructions:', instructions);
    Alert.alert('Success', 'Wire instructions sent successfully!');
  };

  const renderWireInstructionsMessage = (message: Message) => (
    <View style={[styles.messageContainer, styles.wireInstructionsContainer]}>
      <View style={styles.wireInstructionsCard}>
        <View style={styles.wireInstructionsHeader}>
          <Text style={styles.wireInstructionsTitle}>🏦 Wire Instructions</Text>
          <Text style={styles.wireInstructionsSubtitle}>Banking details for transfer</Text>
        </View>
        
        <View style={styles.wireInstructionsContent}>
          <View style={styles.wireInstructionsRow}>
            <Text style={styles.wireInstructionsLabel}>Bank:</Text>
            <Text style={styles.wireInstructionsValue}>Chase Bank</Text>
          </View>
          <View style={styles.wireInstructionsRow}>
            <Text style={styles.wireInstructionsLabel}>Account:</Text>
            <Text style={styles.wireInstructionsValue}>****1234</Text>
          </View>
          <View style={styles.wireInstructionsRow}>
            <Text style={styles.wireInstructionsLabel}>Reference:</Text>
            <Text style={styles.wireInstructionsValue}>Submariner Purchase</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.wireInstructionsButton}>
          <Text style={styles.wireInstructionsButtonText}>View Full Details</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.messageFooter}>
        <Text style={styles.messageTime}>{message.timestamp}</Text>
      </View>
    </View>
  );

  const renderMessage = (message: Message) => {
    if (message.type === 'wire_instructions') {
      return renderWireInstructionsMessage(message);
    }

    return (
      <View key={message.id} style={[
        styles.messageContainer,
        message.isOwn && styles.ownMessageContainer
      ]}>
        <View style={[
          styles.messageBubble,
          message.isOwn && styles.ownMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            message.isOwn && styles.ownMessageText
          ]}>
            {message.content}
          </Text>
          
          <View style={styles.messageFooter}>
            <Text style={[
              styles.messageTime,
              message.isOwn && styles.ownMessageTime
            ]}>
              {message.timestamp}
            </Text>
            
            {message.isOwn && message.status && (
              <View style={styles.messageStatus}>
                <View style={[
                  styles.statusIndicator,
                  message.status === 'read' && styles.statusRead,
                  message.status === 'delivered' && styles.statusDelivered,
                ]} />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

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
          
          <TouchableOpacity 
            style={styles.profileSection}
            onPress={handleViewProfile}
            activeOpacity={0.7}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{avatar}</Text>
              </View>
              {isOnline === 'true' && <View style={styles.onlineIndicator} />}
            </View>
            
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{name}</Text>
                <User size={14} color="#8892b0" />
              </View>
              <Text style={styles.userStatus}>
                {isOnline === 'true' ? 'Online' : 'Last seen 2h ago'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Phone size={20} color="#8892b0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Video size={20} color="#8892b0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MoreVertical size={20} color="#8892b0" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages */}
        <ScrollView 
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.attachButton}
            onPress={handleAttachmentPress}
          >
            <Plus size={20} color="#8892b0" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.messageInput}
            placeholder={`Message ${name}...`}
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
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Send size={18} color={messageText.trim() ? "#1a2332" : "#8892b0"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Attachment Menu */}
      <AttachmentMenu
        visible={showAttachmentMenu}
        onClose={() => setShowAttachmentMenu(false)}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
        onDocumentPress={handleDocumentPress}
        onLocationPress={handleLocationPress}
        onWireInstructionsPress={handleWireInstructionsPress}
        onWireFundsPress={handleWireFundsPress}
        onRequestFundsPress={handleRequestFundsPress}
      />

      {/* Wire Instructions Modal */}
      <WireInstructionsModal
        visible={showWireInstructionsModal}
        onClose={() => setShowWireInstructionsModal(false)}
        onSend={handleSendWireInstructions}
      />
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 12,
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
    borderColor: '#F5F0E1',
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  userStatus: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ownMessageContainer: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    padding: 12,
    maxWidth: '75%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  ownMessageBubble: {
    backgroundColor: '#8B7355',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
    borderColor: '#8B7355',
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    lineHeight: 20,
    marginBottom: 4,
  },
  ownMessageText: {
    color: '#FFFFFF',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageTime: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  messageStatus: {
    marginLeft: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666666',
  },
  statusDelivered: {
    backgroundColor: '#666666',
  },
  statusRead: {
    backgroundColor: '#A8D8AD',
  },
  wireInstructionsContainer: {
    justifyContent: 'flex-start',
  },
  wireInstructionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E57373',
    padding: 16,
    maxWidth: '85%',
  },
  wireInstructionsHeader: {
    marginBottom: 12,
  },
  wireInstructionsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  wireInstructionsSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  wireInstructionsContent: {
    gap: 8,
    marginBottom: 12,
  },
  wireInstructionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wireInstructionsLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  wireInstructionsValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  wireInstructionsButton: {
    backgroundColor: '#E57373',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  wireInstructionsButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
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