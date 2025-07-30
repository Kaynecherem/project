import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { X, Users, DollarSign, Star } from 'lucide-react-native';
import { useState } from 'react';

interface VouchModalProps {
  visible: boolean;
  onClose: () => void;
  dealerName: string;
  onSubmit: (vouchData: VouchData) => void;
}

interface VouchData {
  dealSize: string;
  relationship: string;
  notes: string;
}

export default function VouchModal({ visible, onClose, dealerName, onSubmit }: VouchModalProps) {
  const [vouchData, setVouchData] = useState<VouchData>({
    dealSize: '',
    relationship: '',
    notes: '',
  });

  const dealSizeOptions = [
    { label: 'Under $10K', value: '10000' },
    { label: '$10K - $25K', value: '25000' },
    { label: '$25K - $50K', value: '50000' },
    { label: '$50K - $100K', value: '100000' },
    { label: '$100K - $250K', value: '250000' },
    { label: '$250K+', value: '250000+' },
  ];

  const relationshipOptions = [
    'Direct business partner',
    'Multiple successful deals',
    'Single large transaction',
    'Long-term relationship',
    'Referred by mutual contact',
  ];

  const handleSubmit = () => {
    if (!vouchData.dealSize || !vouchData.relationship) {
      Alert.alert('Required Fields', 'Please select deal size and relationship type');
      return;
    }
    
    onSubmit(vouchData);
    setVouchData({ dealSize: '', relationship: '', notes: '' });
    onClose();
  };

  const updateVouchData = (field: keyof VouchData, value: string) => {
    setVouchData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.backdrop}>
          <TouchableOpacity 
            style={styles.backdropTouch}
            onPress={onClose}
            activeOpacity={1}
          />
        </View>
        
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Star size={24} color="#d69e2e" />
              <Text style={styles.headerTitle}>Vouch for {dealerName}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#8892b0" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            {/* Deal Size */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <DollarSign size={20} color="#d69e2e" />
                <Text style={styles.sectionTitle}>Maximum Deal Size</Text>
                <Text style={styles.required}>*</Text>
              </View>
              <Text style={styles.sectionDescription}>
                What's the largest deal you've done with {dealerName}?
              </Text>
              
              <View style={styles.optionsGrid}>
                {dealSizeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionChip,
                      vouchData.dealSize === option.value && styles.optionChipActive
                    ]}
                    onPress={() => updateVouchData('dealSize', option.value)}
                  >
                    <Text style={[
                      styles.optionText,
                      vouchData.dealSize === option.value && styles.optionTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Relationship */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Users size={20} color="#d69e2e" />
                <Text style={styles.sectionTitle}>Business Relationship</Text>
                <Text style={styles.required}>*</Text>
              </View>
              <Text style={styles.sectionDescription}>
                How would you describe your business relationship?
              </Text>
              
              <View style={styles.relationshipOptions}>
                {relationshipOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.relationshipOption,
                      vouchData.relationship === option && styles.relationshipOptionActive
                    ]}
                    onPress={() => updateVouchData('relationship', option)}
                  >
                    <View style={[
                      styles.radioButton,
                      vouchData.relationship === option && styles.radioButtonActive
                    ]}>
                      {vouchData.relationship === option && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={[
                      styles.relationshipText,
                      vouchData.relationship === option && styles.relationshipTextActive
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Notes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Notes</Text>
              <Text style={styles.sectionDescription}>
                Any additional context about your experience (optional)
              </Text>
              <TextInput
                style={styles.textArea}
                placeholder="Share details about your business relationship, reliability, communication, etc."
                placeholderTextColor="#8892b0"
                value={vouchData.notes}
                onChangeText={(value) => updateVouchData('notes', value)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={500}
              />
              <Text style={styles.characterCount}>{vouchData.notes.length}/500</Text>
            </View>
          </View>
          
          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Vouch</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouch: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
    gap: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
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
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginLeft: 8,
  },
  required: {
    color: '#E57373',
    marginLeft: 4,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    backgroundColor: '#F5F0E1',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  optionChipActive: {
    backgroundColor: '#8B7355',
    borderColor: '#8B7355',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  relationshipOptions: {
    gap: 12,
  },
  relationshipOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0E1',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  relationshipOptionActive: {
    borderColor: '#8B7355',
    backgroundColor: 'rgba(139, 115, 85, 0.1)',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#8B7355',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B7355',
  },
  relationshipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    flex: 1,
  },
  relationshipTextActive: {
    color: '#333333',
  },
  textArea: {
    backgroundColor: '#F5F0E1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    minHeight: 80,
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'right',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#8B7355',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});