import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Hash,
  Search,
  DollarSign,
  Users,
  Crown,
  Quote
} from 'lucide-react-native';

interface ThreadForm {
  channel: string;
  category: string;
  title: string;
  content: string;
}

export default function CreateThreadScreen() {
  const { type } = useLocalSearchParams();
  
  const [form, setForm] = useState<ThreadForm>({
    channel: '',
    category: type === 'callout' ? 'callout' : 'general',
    title: '',
    content: '',
  });

  const channels = [
    { id: 'rolex-dealers', name: 'Rolex Dealers', isPremium: true, members: 247 },
    { id: 'ap-collectors', name: 'Audemars Piguet', isPremium: true, members: 189 },
    { id: 'vintage-collectors', name: 'Vintage Collectors', isPremium: false, members: 156 },
    { id: 'general-discussion', name: 'General Discussion', isPremium: false, members: 423 },
    { id: 'patek-philippe', name: 'Patek Philippe', isPremium: true, members: 134 },
    { id: 'need-quote', name: 'Need a Quote', isPremium: false, members: 89 },
    { id: 'reference-check', name: 'Reference Check', isPremium: false, members: 156 },
  ];

  const categories = [
    { 
      id: 'listing', 
      name: 'Listing', 
      icon: '💰', 
      description: 'Post a watch for sale',
      color: '#38a169'
    },
    { 
      id: 'callout', 
      name: 'Call Out', 
      icon: '🔍', 
      description: 'Looking for a specific watch',
      color: '#3182ce'
    },
    { 
      id: 'quote', 
      name: 'Need Quote', 
      icon: '💬', 
      description: 'Request pricing or quotes',
      color: '#805ad5'
    },
    { 
      id: 'general', 
      name: 'General', 
      icon: '💬', 
      description: 'General discussion',
      color: '#8892b0'
    },
  ];

  const handleSubmit = () => {
    if (!form.channel || !form.title || !form.content) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    
    // In a real app, this would submit to backend
    Alert.alert('Success', 'Your thread has been created!', [
      { text: 'OK', onPress: () => handleBack() }
    ]);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const updateForm = (field: keyof ThreadForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const getSelectedChannel = () => {
    return channels.find(c => c.id === form.channel);
  };

  const getSelectedCategory = () => {
    return categories.find(c => c.id === form.category);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Start Thread</Text>
          <Text style={styles.headerSubtitle}>Begin a new discussion</Text>
        </View>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Channel Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Hash size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Channel</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Choose which channel to post your thread in
          </Text>
          
          <View style={styles.channelsGrid}>
            {channels.map((channel) => (
              <TouchableOpacity
                key={channel.id}
                style={[
                  styles.channelCard,
                  form.channel === channel.id && styles.channelCardActive
                ]}
                onPress={() => updateForm('channel', channel.id)}
              >
                <View style={styles.channelHeader}>
                  <View style={styles.channelIcon}>
                    <Hash size={16} color={form.channel === channel.id ? "#1a2332" : "#d69e2e"} />
                  </View>
                  <View style={styles.channelInfo}>
                    <View style={styles.channelNameRow}>
                      <Text style={[
                        styles.channelName,
                        form.channel === channel.id && styles.channelNameActive
                      ]}>
                        {channel.name}
                      </Text>
                      {channel.isPremium && (
                        <Crown size={12} color={form.channel === channel.id ? "#1a2332" : "#d69e2e"} />
                      )}
                    </View>
                    <View style={styles.channelMeta}>
                      <Users size={12} color={form.channel === channel.id ? "#1a2332" : "#8892b0"} />
                      <Text style={[
                        styles.channelMembers,
                        form.channel === channel.id && styles.channelMembersActive
                      ]}>
                        {channel.members} members
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Category</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <Text style={styles.sectionDescription}>
            What type of thread are you creating?
          </Text>
          
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  form.category === category.id && styles.categoryCardActive,
                  { borderLeftColor: category.color }
                ]}
                onPress={() => updateForm('category', category.id)}
              >
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={[
                    styles.categoryName,
                    form.category === category.id && styles.categoryNameActive
                  ]}>
                    {category.name}
                  </Text>
                  <Text style={[
                    styles.categoryDescription,
                    form.category === category.id && styles.categoryDescriptionActive
                  ]}>
                    {category.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Thread Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Thread Details</Text>
          </View>

          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Title <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                form.category === 'listing' ? 'e.g., GMT Master II - Perfect Condition' :
                form.category === 'callout' ? 'e.g., Call Out: Royal Oak 15400ST' :
                form.category === 'quote' ? 'e.g., Need Quote: Vintage Daytona' :
                'e.g., Basel World 2024 Predictions'
              }
              placeholderTextColor="#8892b0"
              value={form.title}
              onChangeText={(value) => updateForm('title', value)}
              maxLength={100}
            />
            <Text style={styles.characterCount}>{form.title.length}/100</Text>
          </View>

          {/* Content */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Content <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder={
                form.category === 'listing' ? 'Describe the watch, condition, price, and any included accessories...' :
                form.category === 'callout' ? 'Describe what you\'re looking for, budget, and preferred condition...' :
                form.category === 'quote' ? 'Describe the watch you need pricing for, condition requirements, and timeline...' :
                'Start the discussion with your thoughts, questions, or observations...'
              }
              placeholderTextColor="#8892b0"
              value={form.content}
              onChangeText={(value) => updateForm('content', value)}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              maxLength={2000}
            />
            <Text style={styles.characterCount}>{form.content.length}/2000</Text>
          </View>
        </View>

        {/* Preview */}
        {(form.title || form.content) && (
          <View style={styles.previewSection}>
            <Text style={styles.previewTitle}>Preview</Text>
            <View style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <View style={styles.previewAvatar}>
                  <Text style={styles.previewAvatarText}>YO</Text>
                </View>
                <View style={styles.previewMeta}>
                  <Text style={styles.previewAuthor}>You</Text>
                  <Text style={styles.previewTime}>now</Text>
                </View>
                {getSelectedCategory() && (
                  <View style={styles.previewCategoryBadge}>
                    <Text style={styles.previewCategoryEmoji}>{getSelectedCategory()?.icon}</Text>
                    <Text style={[styles.previewCategoryText, { color: getSelectedCategory()?.color }]}>
                      {getSelectedCategory()?.name.toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
              
              {form.title && (
                <Text style={styles.previewThreadTitle}>{form.title}</Text>
              )}
              
              {form.content && (
                <Text style={styles.previewContent} numberOfLines={3}>
                  {form.content}
                </Text>
              )}
            </View>
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
    backgroundColor: '#0f1419',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  submitButton: {
    backgroundColor: '#d69e2e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1a2332',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  required: {
    color: '#e53e3e',
    marginLeft: 4,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    marginBottom: 16,
    lineHeight: 20,
  },
  channelsGrid: {
    gap: 12,
  },
  channelCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
  },
  channelCardActive: {
    backgroundColor: '#d69e2e',
    borderColor: '#d69e2e',
  },
  channelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#2d3748',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  channelInfo: {
    flex: 1,
  },
  channelNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  channelName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  channelNameActive: {
    color: '#1a2332',
  },
  channelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  channelMembers: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  channelMembersActive: {
    color: '#1a2332',
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    borderLeftWidth: 4,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryCardActive: {
    backgroundColor: '#2d3748',
  },
  categoryIcon: {
    marginRight: 16,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  categoryNameActive: {
    color: '#ffffff',
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  categoryDescriptionActive: {
    color: '#8892b0',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  textArea: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    minHeight: 160,
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    textAlign: 'right',
    marginTop: 4,
  },
  previewSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  previewCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d69e2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  previewAvatarText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#1a2332',
  },
  previewMeta: {
    flex: 1,
  },
  previewAuthor: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  previewTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  previewCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#2d3748',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  previewCategoryEmoji: {
    fontSize: 12,
  },
  previewCategoryText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  previewThreadTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  previewContent: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});