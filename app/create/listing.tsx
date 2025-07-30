import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  X, 
  Plus,
  DollarSign,
  MapPin,
  Tag,
  FileText,
  Shield,
  Clock
} from 'lucide-react-native';

interface ListingForm {
  images: string[];
  description: string;
  brand?: string;
  model?: string;
  nickname?: string;
  price?: string;
  condition?: string;
  year?: string;
  location?: string;
}

export default function CreateListingScreen() {
  const [form, setForm] = useState<ListingForm>({
    images: [],
    description: '',
  });

  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const conditions = ['New', 'Like New', 'Excellent', 'Very Good', 'Good', 'Fair'];
  const popularBrands = ['Rolex', 'Audemars Piguet', 'Patek Philippe', 'Omega', 'Tudor', 'Cartier'];

  const handleImageAdd = () => {
    // In a real app, this would open camera/gallery
    Alert.alert('Add Photo', 'Camera functionality would be implemented here', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Simulate Add', 
        onPress: () => {
          const newImage = `https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400`;
          setForm(prev => ({ 
            ...prev, 
            images: [...prev.images, newImage] 
          }));
        }
      }
    ]);
  };

  const handleImageRemove = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleQuickPost = () => {
    if (form.images.length === 0 || !form.description.trim()) {
      Alert.alert('Missing Requirements', 'Please add at least 1 photo and a description to post');
      return;
    }
    
    // In a real app, this would submit to backend
    Alert.alert('Success', 'Your listing has been posted! You can edit details anytime.', [
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

  const updateForm = (field: keyof ListingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
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
          <Text style={styles.headerTitle}>Quick Listing</Text>
          <Text style={styles.headerSubtitle}>Fast & easy posting</Text>
        </View>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleQuickPost}
        >
          <Text style={styles.submitButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Post Notice */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>⚡ Quick Post</Text>
          <Text style={styles.noticeText}>
            Just add a photo and description to post instantly. All other details are optional and can be added later.
          </Text>
        </View>

        {/* Photos Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Camera size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Photos</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Add at least 1 photo. You can add up to 10 total.
          </Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
            <TouchableOpacity style={styles.addPhotoButton} onPress={handleImageAdd}>
              <Plus size={24} color="#8892b0" />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
            
            {form.images.map((image, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{ uri: image }} style={styles.photo} />
                <TouchableOpacity 
                  style={styles.removePhotoButton}
                  onPress={() => handleImageRemove(index)}
                >
                  <X size={16} color="#ffffff" />
                </TouchableOpacity>
                {index === 0 && (
                  <View style={styles.mainPhotoBadge}>
                    <Text style={styles.mainPhotoText}>Main</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={styles.textArea}
            placeholder="Describe the watch - condition, price, included accessories, etc."
            placeholderTextColor="#8892b0"
            value={form.description}
            onChangeText={(value) => updateForm('description', value)}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Optional Fields Toggle */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.toggleButton}
            onPress={() => setShowOptionalFields(!showOptionalFields)}
          >
            <Text style={styles.toggleButtonText}>
              {showOptionalFields ? 'Hide' : 'Add'} Optional Details
            </Text>
            <Text style={styles.toggleIcon}>
              {showOptionalFields ? '−' : '+'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.toggleDescription}>
            Adding structured details helps buyers find your listing
          </Text>
        </View>

        {/* Optional Fields */}
        {showOptionalFields && (
          <>
            {/* Watch Details */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Tag size={20} color="#8892b0" />
                <Text style={styles.sectionTitle}>Watch Details</Text>
                <Text style={styles.optional}>(Optional)</Text>
              </View>

              {/* Brand */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Brand</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Rolex"
                  placeholderTextColor="#8892b0"
                  value={form.brand}
                  onChangeText={(value) => updateForm('brand', value)}
                />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsContainer}>
                  {popularBrands.map((brand) => (
                    <TouchableOpacity
                      key={brand}
                      style={styles.suggestionChip}
                      onPress={() => updateForm('brand', brand)}
                    >
                      <Text style={styles.suggestionText}>{brand}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Model */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Model</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Submariner Date 116610LN"
                  placeholderTextColor="#8892b0"
                  value={form.model}
                  onChangeText={(value) => updateForm('model', value)}
                />
              </View>

              {/* Nickname */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nickname</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Black Sub, Hulk, Batman"
                  placeholderTextColor="#8892b0"
                  value={form.nickname}
                  onChangeText={(value) => updateForm('nickname', value)}
                />
              </View>

              {/* Year */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Year</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 2019"
                  placeholderTextColor="#8892b0"
                  value={form.year}
                  onChangeText={(value) => updateForm('year', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Condition */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Shield size={20} color="#8892b0" />
                <Text style={styles.sectionTitle}>Condition</Text>
                <Text style={styles.optional}>(Optional)</Text>
              </View>
              
              <View style={styles.conditionsGrid}>
                {conditions.map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={[
                      styles.conditionChip,
                      form.condition === condition && styles.conditionChipActive
                    ]}
                    onPress={() => updateForm('condition', condition)}
                  >
                    <Text style={[
                      styles.conditionText,
                      form.condition === condition && styles.conditionTextActive
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price & Location */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <DollarSign size={20} color="#8892b0" />
                <Text style={styles.sectionTitle}>Price & Location</Text>
                <Text style={styles.optional}>(Optional)</Text>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                  <Text style={styles.inputLabel}>Price (USD)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="12500"
                    placeholderTextColor="#8892b0"
                    value={form.price}
                    onChangeText={(value) => updateForm('price', value)}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Location</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="New York, NY"
                    placeholderTextColor="#8892b0"
                    value={form.location}
                    onChangeText={(value) => updateForm('location', value)}
                  />
                </View>
              </View>
            </View>
          </>
        )}

        {/* Quick Post Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>⚡ Quick Post Tips</Text>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Post now with just photo + description</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Edit and add details anytime after posting</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Structured details help buyers find your listing</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Use good lighting for photos</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  submitButton: {
    backgroundColor: '#8B7355',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  noticeCard: {
    backgroundColor: 'rgba(139, 115, 85, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 115, 85, 0.3)',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#8B7355',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginLeft: 8,
  },
  required: {
    color: '#E57373',
    marginLeft: 4,
  },
  optional: {
    color: '#666666',
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  photosContainer: {
    flexDirection: 'row',
  },
  addPhotoButton: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addPhotoText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
    marginTop: 8,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 12,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainPhotoBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#8B7355',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mainPhotoText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    minHeight: 120,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  toggleButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  toggleIcon: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#8B7355',
  },
  toggleDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestionChip: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  suggestionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  conditionChipActive: {
    backgroundColor: '#8B7355',
    borderColor: '#8B7355',
  },
  conditionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  conditionTextActive: {
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
  },
  tipsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 12,
  },
  tip: {
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