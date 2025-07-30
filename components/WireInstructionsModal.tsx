import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { X, Copy, Building, CreditCard, Hash, User } from 'lucide-react-native';
import { useState } from 'react';

interface WireInstructionsModalProps {
  visible: boolean;
  onClose: () => void;
  onSend: (instructions: WireInstructions) => void;
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

export default function WireInstructionsModal({ visible, onClose, onSend }: WireInstructionsModalProps) {
  const [instructions, setInstructions] = useState<WireInstructions>({
    bankName: 'Chase Bank',
    routingNumber: '021000021',
    accountNumber: '****1234',
    accountName: 'Marcus Chen Trading LLC',
    swiftCode: 'CHASUS33',
    reference: '',
    amount: '',
    notes: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSend = () => {
    onSend(instructions);
    onClose();
  };

  const copyToClipboard = (text: string) => {
    // In a real app, this would copy to clipboard
    console.log('Copied to clipboard:', text);
  };

  const updateInstructions = (field: keyof WireInstructions, value: string) => {
    setInstructions(prev => ({ ...prev, [field]: value }));
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
              <Building size={24} color="#e53e3e" />
              <Text style={styles.headerTitle}>Wire Instructions</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#8892b0" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Bank Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bank Information</Text>
              
              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <View style={styles.infoLabel}>
                    <Building size={16} color="#8892b0" />
                    <Text style={styles.labelText}>Bank Name</Text>
                  </View>
                  <View style={styles.infoValue}>
                    <Text style={styles.valueText}>{instructions.bankName}</Text>
                    <TouchableOpacity 
                      style={styles.copyButton}
                      onPress={() => copyToClipboard(instructions.bankName)}
                    >
                      <Copy size={16} color="#8892b0" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <View style={styles.infoLabel}>
                    <Hash size={16} color="#8892b0" />
                    <Text style={styles.labelText}>Routing Number</Text>
                  </View>
                  <View style={styles.infoValue}>
                    <Text style={styles.valueText}>{instructions.routingNumber}</Text>
                    <TouchableOpacity 
                      style={styles.copyButton}
                      onPress={() => copyToClipboard(instructions.routingNumber)}
                    >
                      <Copy size={16} color="#8892b0" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <View style={styles.infoLabel}>
                    <CreditCard size={16} color="#8892b0" />
                    <Text style={styles.labelText}>Account Number</Text>
                  </View>
                  <View style={styles.infoValue}>
                    <Text style={styles.valueText}>{instructions.accountNumber}</Text>
                    <TouchableOpacity 
                      style={styles.copyButton}
                      onPress={() => copyToClipboard(instructions.accountNumber)}
                    >
                      <Copy size={16} color="#8892b0" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <View style={styles.infoLabel}>
                    <User size={16} color="#8892b0" />
                    <Text style={styles.labelText}>Account Name</Text>
                  </View>
                  <View style={styles.infoValue}>
                    <Text style={styles.valueText}>{instructions.accountName}</Text>
                    <TouchableOpacity 
                      style={styles.copyButton}
                      onPress={() => copyToClipboard(instructions.accountName)}
                    >
                      <Copy size={16} color="#8892b0" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                {instructions.swiftCode && (
                  <View style={styles.infoRow}>
                    <View style={styles.infoLabel}>
                      <Text style={styles.labelText}>SWIFT Code</Text>
                    </View>
                    <View style={styles.infoValue}>
                      <Text style={styles.valueText}>{instructions.swiftCode}</Text>
                      <TouchableOpacity 
                        style={styles.copyButton}
                        onPress={() => copyToClipboard(instructions.swiftCode!)}
                      >
                        <Copy size={16} color="#8892b0" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Transaction Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Transaction Details</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Reference/Memo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Submariner Purchase - Invoice #1234"
                  placeholderTextColor="#8892b0"
                  value={instructions.reference}
                  onChangeText={(value) => updateInstructions('reference', value)}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Amount (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., $12,500"
                  placeholderTextColor="#8892b0"
                  value={instructions.amount}
                  onChangeText={(value) => updateInstructions('amount', value)}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Additional Notes</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Any additional instructions or notes..."
                  placeholderTextColor="#8892b0"
                  value={instructions.notes}
                  onChangeText={(value) => updateInstructions('notes', value)}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Important Notice */}
            <View style={styles.noticeCard}>
              <Text style={styles.noticeTitle}>⚠️ Important</Text>
              <Text style={styles.noticeText}>
                • Verify all details before sending{'\n'}
                • Include reference number for tracking{'\n'}
                • Wire transfers are typically irreversible{'\n'}
                • Contact your bank for international transfers
              </Text>
            </View>
          </ScrollView>
          
          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send Instructions</Text>
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
  },
  headerTitle: {
    fontSize: 20,
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
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#F5F0E1',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  labelText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  infoValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  copyButton: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F0E1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  textArea: {
    backgroundColor: '#F5F0E1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    minHeight: 80,
  },
  noticeCard: {
    backgroundColor: 'rgba(229, 115, 115, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(229, 115, 115, 0.3)',
    padding: 16,
    marginBottom: 20,
  },
  noticeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#E57373',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
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
  sendButton: {
    flex: 1,
    backgroundColor: '#E57373',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});