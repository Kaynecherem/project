import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions, ScrollView } from 'react-native';
import { 
  Camera, 
  Image as ImageIcon, 
  FileText, 
  MapPin, 
  DollarSign,
  Send,
  CreditCard,
  X,
  Banknote,
  Receipt,
  Building
} from 'lucide-react-native';
import { useState, useRef, useEffect } from 'react';

const { height: screenHeight } = Dimensions.get('window');

interface AttachmentOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  action: () => void;
  category: 'media' | 'files' | 'financial' | 'location';
}

interface AttachmentMenuProps {
  visible: boolean;
  onClose: () => void;
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onDocumentPress: () => void;
  onLocationPress: () => void;
  onWireInstructionsPress: () => void;
  onWireFundsPress: () => void;
  onRequestFundsPress: () => void;
}

export default function AttachmentMenu({
  visible,
  onClose,
  onCameraPress,
  onGalleryPress,
  onDocumentPress,
  onLocationPress,
  onWireInstructionsPress,
  onWireFundsPress,
  onRequestFundsPress,
}: AttachmentMenuProps) {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const attachmentOptions: AttachmentOption[] = [
    // Media Options
    {
      id: 'camera',
      title: 'Camera',
      description: 'Take a photo',
      icon: Camera,
      color: '#3182ce',
      action: onCameraPress,
      category: 'media',
    },
    {
      id: 'gallery',
      title: 'Photo Gallery',
      description: 'Choose from gallery',
      icon: ImageIcon,
      color: '#38a169',
      action: onGalleryPress,
      category: 'media',
    },
    
    // Files Options
    {
      id: 'document',
      title: 'Document',
      description: 'Share papers & certificates',
      icon: FileText,
      color: '#d69e2e',
      action: onDocumentPress,
      category: 'files',
    },
    
    // Location Options
    {
      id: 'location',
      title: 'Location',
      description: 'Share meeting location',
      icon: MapPin,
      color: '#805ad5',
      action: onLocationPress,
      category: 'location',
    },
    
    // Financial Options
    {
      id: 'wire-instructions',
      title: 'Wire Instructions',
      description: 'Send banking details',
      icon: Building,
      color: '#e53e3e',
      action: onWireInstructionsPress,
      category: 'financial',
    },
    {
      id: 'wire-funds',
      title: 'Wire Funds',
      description: 'Initiate wire transfer',
      icon: Send,
      color: '#38a169',
      action: onWireFundsPress,
      category: 'financial',
    },
    {
      id: 'request-funds',
      title: 'Request Funds',
      description: 'Request payment',
      icon: Receipt,
      color: '#d69e2e',
      action: onRequestFundsPress,
      category: 'financial',
    },
  ];

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'media': return '📸 Media';
      case 'files': return '📄 Documents';
      case 'location': return '📍 Location';
      case 'financial': return '💰 Financial';
      default: return '';
    }
  };

  const groupedOptions = attachmentOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, AttachmentOption[]>);

  const renderOption = (option: AttachmentOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionCard}
      onPress={() => {
        option.action();
        onClose();
      }}
    >
      <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
        <option.icon size={24} color={option.color} strokeWidth={2} />
      </View>
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{option.title}</Text>
        <Text style={styles.optionDescription}>{option.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = (category: string, options: AttachmentOption[]) => (
    <View key={category} style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{getCategoryTitle(category)}</Text>
      <View style={styles.optionsGrid}>
        {options.map(renderOption)}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.backdrop,
            { opacity: backdropOpacity }
          ]}
        >
          <TouchableOpacity 
            style={styles.backdropTouch}
            onPress={onClose}
            activeOpacity={1}
          />
        </Animated.View>
        
        <Animated.View
          style={[
            styles.menuContainer,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Handle */}
          <View style={styles.handle} />
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Attach</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#8892b0" />
            </TouchableOpacity>
          </View>
          
          {/* Content - Now properly scrollable */}
          <ScrollView 
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
          >
            {Object.entries(groupedOptions).map(([category, options]) =>
              renderCategory(category, options)
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouch: {
    flex: 1,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.75, // Reduced max height to ensure it fits
    minHeight: 300, // Minimum height to ensure content is visible
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#E0E0E0',
    flexDirection: 'column', // Ensure proper flex layout
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
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
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  scrollContent: {
    flex: 1, // Allow scroll view to take remaining space
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Add bottom padding for better scrolling experience
  },
  categorySection: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 12,
  },
  optionsGrid: {
    gap: 8,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0E1',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});