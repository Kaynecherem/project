import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck as CheckCircle, Clock, Mail, MessageCircle, ArrowRight, Crown } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PendingScreen() {
  const handleContactSupport = () => {
    // In a real app, this would open support chat or email
    console.log('Contact support');
  };

  const handleBackToLogin = () => {
    router.replace('/login');
  };

  const handleViewDashboard = () => {
    // For demo purposes, let's allow access to the main app
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <CheckCircle size={48} color="#38a169" />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Application Submitted!</Text>
            <Text style={styles.subtitle}>
              Your application is now under review
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%' }]} />
            </View>
            <Text style={styles.progressText}>Step 3 of 3 - Complete!</Text>
          </View>

          {/* Demo Notice */}
          <View style={styles.demoNotice}>
            <Text style={styles.demoTitle}>🎉 Demo Complete!</Text>
            <Text style={styles.demoText}>
              You've successfully completed the onboarding demo! In a real scenario, you'd wait for approval, but you can explore the app now.
            </Text>
            <TouchableOpacity style={styles.demoButton} onPress={handleViewDashboard}>
              <Crown size={16} color="#1a2332" />
              <Text style={styles.demoButtonText}>Explore App (Demo)</Text>
              <ArrowRight size={16} color="#1a2332" />
            </TouchableOpacity>
          </View>

          {/* Status Steps */}
          <View style={styles.statusContainer}>
            <View style={styles.statusStep}>
              <View style={styles.statusIconCompleted}>
                <CheckCircle size={20} color="#38a169" />
              </View>
              <View style={styles.statusContent}>
                <Text style={styles.statusTitle}>Application Submitted</Text>
                <Text style={styles.statusDescription}>Your documents have been received</Text>
              </View>
            </View>

            <View style={styles.statusStep}>
              <View style={styles.statusIconPending}>
                <Clock size={20} color="#d69e2e" />
              </View>
              <View style={styles.statusContent}>
                <Text style={styles.statusTitle}>Under Review</Text>
                <Text style={styles.statusDescription}>Our team is verifying your documents</Text>
              </View>
            </View>

            <View style={styles.statusStep}>
              <View style={styles.statusIconPending}>
                <Mail size={20} color="#8892b0" />
              </View>
              <View style={styles.statusContent}>
                <Text style={styles.statusTitlePending}>Approval Decision</Text>
                <Text style={styles.statusDescription}>You'll receive an email with the decision</Text>
              </View>
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.timelineCard}>
            <Text style={styles.timelineTitle}>⏱️ What to Expect</Text>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineText}>
                <Text style={styles.timelineBold}>24-48 hours:</Text> Initial document review
              </Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineText}>
                <Text style={styles.timelineBold}>2-5 business days:</Text> Complete verification process
              </Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineText}>
                <Text style={styles.timelineBold}>Email notification:</Text> Final approval decision
              </Text>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Need Help?</Text>
            <Text style={styles.contactText}>
              If you have questions about your application or need to submit additional documents, 
              our support team is here to help.
            </Text>
            <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
              <MessageCircle size={16} color="#d69e2e" />
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
              <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1a2332',
    borderWidth: 1,
    borderColor: '#2d3748',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 32,
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
    backgroundColor: '#38a169',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#38a169',
    textAlign: 'center',
    fontWeight: '600',
  },
  demoNotice: {
    backgroundColor: 'rgba(56, 161, 105, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 161, 105, 0.3)',
    padding: 20,
    marginBottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#38a169',
    marginBottom: 8,
    textAlign: 'center',
  },
  demoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  demoButton: {
    backgroundColor: '#d69e2e',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  demoButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#1a2332',
  },
  statusContainer: {
    width: '100%',
    marginBottom: 32,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  statusIconCompleted: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(56, 161, 105, 0.1)',
    borderWidth: 2,
    borderColor: '#38a169',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusIconPending: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a2332',
    borderWidth: 2,
    borderColor: '#2d3748',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusContent: {
    flex: 1,
    paddingTop: 4,
  },
  statusTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statusTitlePending: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#8892b0',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
  },
  timelineCard: {
    width: '100%',
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 20,
    marginBottom: 24,
  },
  timelineTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  timelineItem: {
    marginBottom: 12,
  },
  timelineText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
  },
  timelineBold: {
    fontFamily: 'Inter-Bold',
    color: '#d69e2e',
  },
  contactCard: {
    width: '100%',
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 20,
    marginBottom: 32,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d69e2e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#d69e2e',
  },
  actions: {
    width: '100%',
  },
  backButton: {
    backgroundColor: '#2d3748',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
});