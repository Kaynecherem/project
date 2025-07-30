import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight, User, Mail, Phone, Building } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function InviteCodeScreen() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessAddress: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!form.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      console.log('Form data:', form);
      router.push('/onboarding/documents');
    }
  };

  const updateForm = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const isFormValid = form.firstName.trim() && 
                     form.lastName.trim() && 
                     form.email.trim() && 
                     form.businessName.trim() &&
                     /\S+@\S+\.\S+/.test(form.email);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Business Information</Text>
          <Text style={styles.headerSubtitle}>Step 1 of 3</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '33%' }]} />
        </View>
        <Text style={styles.progressText}>Step 1 of 3</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Demo Notice */}
        <View style={styles.demoNotice}>
          <Text style={styles.demoTitle}>📝 Demo Mode</Text>
          <Text style={styles.demoText}>
            Fill out the form with any information to continue testing the onboarding flow.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Personal Details</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              First Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              placeholder="Enter your first name"
              placeholderTextColor="#8892b0"
              value={form.firstName}
              onChangeText={(value) => updateForm('firstName', value)}
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Last Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              placeholder="Enter your last name"
              placeholderTextColor="#8892b0"
              value={form.lastName}
              onChangeText={(value) => updateForm('lastName', value)}
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Email <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email address"
              placeholderTextColor="#8892b0"
              value={form.email}
              onChangeText={(value) => updateForm('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#8892b0"
              value={form.phone}
              onChangeText={(value) => updateForm('phone', value)}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Building size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Business Information</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Business Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.businessName && styles.inputError]}
              placeholder="Enter your business name"
              placeholderTextColor="#8892b0"
              value={form.businessName}
              onChangeText={(value) => updateForm('businessName', value)}
            />
            {errors.businessName && (
              <Text style={styles.errorText}>{errors.businessName}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Business Address</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter your business address"
              placeholderTextColor="#8892b0"
              value={form.businessAddress}
              onChangeText={(value) => updateForm('businessAddress', value)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.continueButton,
            !isFormValid && styles.continueButtonDisabled
          ]} 
          onPress={handleContinue}
          disabled={!isFormValid}
        >
          <Text style={[
            styles.continueButtonText,
            !isFormValid && styles.continueButtonTextDisabled
          ]}>
            Continue to Documents
          </Text>
          <ArrowRight size={20} color={!isFormValid ? "#8892b0" : "#1a2332"} />
        </TouchableOpacity>

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
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2d3748',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#d69e2e',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  demoNotice: {
    backgroundColor: 'rgba(214, 158, 46, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(214, 158, 46, 0.3)',
    padding: 16,
    marginVertical: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#d69e2e',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
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
  required: {
    color: '#e53e3e',
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
  inputError: {
    borderColor: '#e53e3e',
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
    minHeight: 80,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#e53e3e',
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#d69e2e',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  continueButtonDisabled: {
    backgroundColor: '#2d3748',
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1a2332',
  },
  continueButtonTextDisabled: {
    color: '#8892b0',
  },
  bottomSpacing: {
    height: 40,
  },
});