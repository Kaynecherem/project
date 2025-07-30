import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Crown, Shield, Users, ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function OnboardingScreen() {
  const [inviteCode, setInviteCode] = useState('');

  const handleContinue = () => {
    if (!inviteCode.trim()) {
      Alert.alert('Required', 'Please enter your invitation code');
      return;
    }
    
    // For testing purposes, accept any invitation code
    // In a real app, this would validate the invite code against a backend
    console.log('Using invitation code:', inviteCode);
    router.push('/onboarding/invite-code');
  };

  const handleUseDemoCode = () => {
    setInviteCode('DEMO2024');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Crown size={32} color="#d69e2e" />
          </View>
          <Text style={styles.title}>Welcome to WatchDealer</Text>
          <Text style={styles.subtitle}>
            Exclusive network for verified luxury watch dealers
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <Shield size={20} color="#38a169" />
            <Text style={styles.featureText}>Document verification required</Text>
          </View>
          <View style={styles.feature}>
            <Users size={20} color="#d69e2e" />
            <Text style={styles.featureText}>Invite-only network</Text>
          </View>
          <View style={styles.feature}>
            <Crown size={20} color="#d69e2e" />
            <Text style={styles.featureText}>Premium dealer experience</Text>
          </View>
        </View>

        {/* Demo Notice */}
        <View style={styles.demoNotice}>
          <Text style={styles.demoTitle}>🧪 Demo Mode</Text>
          <Text style={styles.demoText}>
            For testing purposes, you can use any invitation code or try our demo code below.
          </Text>
          <TouchableOpacity style={styles.demoButton} onPress={handleUseDemoCode}>
            <Text style={styles.demoButtonText}>Use Demo Code: DEMO2024</Text>
          </TouchableOpacity>
        </View>

        {/* Invite Code Input */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Invitation Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your invitation code"
              placeholderTextColor="#8892b0"
              value={inviteCode}
              onChangeText={setInviteCode}
              autoCapitalize="characters"
            />
            <Text style={styles.inputHint}>
              Any code will work for testing purposes
            </Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.continueButton,
              !inviteCode.trim() && styles.continueButtonDisabled
            ]} 
            onPress={handleContinue}
            disabled={!inviteCode.trim()}
          >
            <Text style={[
              styles.continueButtonText,
              !inviteCode.trim() && styles.continueButtonTextDisabled
            ]}>
              Continue
            </Text>
            <ArrowRight size={20} color={!inviteCode.trim() ? "#8892b0" : "#1a2332"} />
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.invitationInfo}>
          <Text style={styles.invitationTitle}>Invitation Required</Text>
          <Text style={styles.invitationText}>
            WatchDealer is an exclusive, invite-only network for verified luxury watch dealers. 
            Current members can invite new dealers who meet our verification standards.
          </Text>
          <Text style={styles.invitationText}>
            After entering your invitation code, you'll need to:
          </Text>
          <Text style={styles.invitationText}>
            • Upload your sales tax permit or business license{'\n'}
            • Complete identity verification{'\n'}
            • Wait for approval from our team
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E1',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    gap: 16,
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  demoNotice: {
    backgroundColor: 'rgba(139, 115, 85, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 115, 85, 0.3)',
    padding: 16,
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#8B7355',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  demoButton: {
    backgroundColor: '#8B7355',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  demoButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  form: {
    marginBottom: 32,
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
    marginBottom: 4,
  },
  inputHint: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: '#8B7355',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  continueButtonTextDisabled: {
    color: '#666666',
  },
  invitationInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 20,
  },
  invitationTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 12,
  },
  invitationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
});