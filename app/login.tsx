import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Users, ArrowRight, UserPlus, LogIn } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  const handleSignIn = () => {
    console.log('Signing in with:', email);
    router.replace('/(tabs)');
  };

  const handleStartOnboarding = () => {
    router.push('/onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logo}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoText}>W</Text>
              </View>
            </View>
            <Text style={styles.title}>WatchDealer</Text>
            <Text style={styles.subtitle}>
              Exclusive network for verified luxury watch dealers
            </Text>
          </View>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Shield size={20} color="#059669" strokeWidth={1.5} />
              <Text style={styles.featureText}>Document-verified dealers only</Text>
            </View>
            <View style={styles.feature}>
              <Users size={20} color="#8B7355" strokeWidth={1.5} />
              <Text style={styles.featureText}>Invite-only network</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.premiumIcon}>
                <Text style={styles.premiumText}>P</Text>
              </View>
              <Text style={styles.featureText}>Premium dealer experience</Text>
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'signin' && styles.activeTab]}
              onPress={() => setActiveTab('signin')}
            >
              <LogIn size={20} color={activeTab === 'signin' ? '#F5F5F5' : '#9CA3AF'} strokeWidth={1.5} />
              <Text style={[styles.tabText, activeTab === 'signin' && styles.activeTabText]}>
                Sign In
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
              onPress={() => setActiveTab('signup')}
            >
              <UserPlus size={20} color={activeTab === 'signup' ? '#F5F5F5' : '#9CA3AF'} strokeWidth={1.5} />
              <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>
                Join Network
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'signin' && (
            <View style={styles.tabContent}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Welcome Back</Text>
                <Text style={styles.sectionDescription}>
                  Sign in to your verified dealer account
                </Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#6B7280"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#6B7280"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
                  <LogIn size={20} color="#F5F5F5" strokeWidth={1.5} />
                  <Text style={styles.primaryButtonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotButton}>
                  <Text style={styles.forgotButtonText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {activeTab === 'signup' && (
            <View style={styles.tabContent}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Join Our Network</Text>
                <Text style={styles.sectionDescription}>
                  Start your journey to become a verified dealer
                </Text>
              </View>

              <View style={styles.ctaCard}>
                <View style={styles.ctaHeader}>
                  <UserPlus size={32} color="#8B7355" strokeWidth={1.5} />
                  <Text style={styles.ctaTitle}>Ready to Join?</Text>
                </View>
                <Text style={styles.ctaDescription}>
                  Begin the verification process to join our exclusive network of luxury watch dealers.
                </Text>
                
                <TouchableOpacity style={styles.primaryButton} onPress={handleStartOnboarding}>
                  <UserPlus size={20} color="#F5F5F5" strokeWidth={1.5} />
                  <Text style={styles.primaryButtonText}>Start Application</Text>
                  <ArrowRight size={20} color="#F5F5F5" strokeWidth={1.5} />
                </TouchableOpacity>
              </View>

              <View style={styles.processCard}>
                <Text style={styles.processTitle}>Application Process</Text>
                
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Business Information</Text>
                    <Text style={styles.stepDescription}>Provide your business details and contact information</Text>
                  </View>
                </View>
                
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Document Verification</Text>
                    <Text style={styles.stepDescription}>Upload business license, tax permit, and ID verification</Text>
                  </View>
                </View>
                
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Review & Approval</Text>
                    <Text style={styles.stepDescription}>Our team reviews your application (24-48 hours)</Text>
                  </View>
                </View>
              </View>

              <View style={styles.pricingCard}>
                <Text style={styles.pricingTitle}>Membership Benefits</Text>
                <View style={styles.pricingHeader}>
                  <Text style={styles.pricingAmount}>$50</Text>
                  <Text style={styles.pricingPeriod}>/month</Text>
                </View>
                
                <View style={styles.benefitsList}>
                  <View style={styles.benefit}>
                    <Text style={styles.benefitIcon}>✓</Text>
                    <Text style={styles.benefitText}>Secure messaging & deal-making tools</Text>
                  </View>
                  <View style={styles.benefit}>
                    <Text style={styles.benefitIcon}>✓</Text>
                    <Text style={styles.benefitText}>MLS-style listing system</Text>
                  </View>
                  <View style={styles.benefit}>
                    <Text style={styles.benefitIcon}>✓</Text>
                    <Text style={styles.benefitText}>Verified dealer directory</Text>
                  </View>
                  <View style={styles.benefit}>
                    <Text style={styles.benefitIcon}>✓</Text>
                    <Text style={styles.benefitText}>Payment processing integration</Text>
                  </View>
                  <View style={styles.benefit}>
                    <Text style={styles.benefitIcon}>✓</Text>
                    <Text style={styles.benefitText}>Premium support & analytics</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E1',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    marginBottom: 16,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  logoText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
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
    gap: 12,
    marginBottom: 32,
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
  premiumIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#8B7355',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabContent: {
    gap: 24,
  },
  sectionHeader: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
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
  primaryButton: {
    backgroundColor: '#8B7355',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  forgotButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  forgotButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8B7355',
  },
  ctaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 24,
    alignItems: 'center',
  },
  ctaHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginTop: 12,
  },
  ctaDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  processCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 24,
  },
  processTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B7355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 24,
  },
  pricingTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  pricingHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 24,
  },
  pricingAmount: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#8B7355',
  },
  pricingPeriod: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginLeft: 4,
  },
  benefitsList: {
    gap: 12,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIcon: {
    fontSize: 16,
    color: '#A8D8AD',
    fontFamily: 'Inter-Bold',
  },
  benefitText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    flex: 1,
    lineHeight: 20,
  },
});