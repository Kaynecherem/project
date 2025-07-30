import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight, FileText, Upload, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Camera, Image as ImageIcon } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  uploaded: boolean;
  fileName?: string;
}

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'sales-tax-permit',
      name: 'Sales Tax Permit',
      description: 'Valid sales tax permit or business license',
      required: true,
      uploaded: false,
    },
    {
      id: 'business-license',
      name: 'Business License',
      description: 'Current business license or registration',
      required: true,
      uploaded: false,
    },
    {
      id: 'id-verification',
      name: 'Government ID',
      description: 'Driver\'s license or passport',
      required: true,
      uploaded: false,
    },
    {
      id: 'insurance',
      name: 'Business Insurance',
      description: 'Proof of business insurance (optional)',
      required: false,
      uploaded: false,
    },
  ]);

  const handleDocumentUpload = (documentId: string) => {
    // Simulate document upload
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, uploaded: true, fileName: `${doc.name.replace(/\s+/g, '_').toLowerCase()}.pdf` }
        : doc
    ));
  };

  const handleContinue = () => {
    const requiredDocs = documents.filter(doc => doc.required);
    const uploadedRequiredDocs = requiredDocs.filter(doc => doc.uploaded);
    
    if (uploadedRequiredDocs.length < requiredDocs.length) {
      // In a real app, you might show an error message
      console.log('Please upload all required documents');
      return;
    }
    
    router.push('/onboarding/pending');
  };

  const renderDocument = (document: Document) => (
    <View key={document.id} style={styles.documentCard}>
      <View style={styles.documentHeader}>
        <View style={styles.documentInfo}>
          <View style={styles.documentTitleRow}>
            <Text style={styles.documentName}>{document.name}</Text>
            {document.required && (
              <Text style={styles.requiredBadge}>Required</Text>
            )}
          </View>
          <Text style={styles.documentDescription}>{document.description}</Text>
          {document.uploaded && document.fileName && (
            <Text style={styles.fileName}>📄 {document.fileName}</Text>
          )}
        </View>
        
        <View style={styles.documentStatus}>
          {document.uploaded ? (
            <CheckCircle size={24} color="#38a169" />
          ) : (
            <AlertCircle size={24} color={document.required ? "#e53e3e" : "#8892b0"} />
          )}
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.uploadButton,
          document.uploaded && styles.uploadButtonUploaded
        ]}
        onPress={() => handleDocumentUpload(document.id)}
      >
        {document.uploaded ? (
          <>
            <CheckCircle size={16} color="#38a169" />
            <Text style={styles.uploadButtonTextUploaded}>Document Uploaded</Text>
          </>
        ) : (
          <>
            <Upload size={16} color="#8892b0" />
            <Text style={styles.uploadButtonText}>Upload Document</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  const requiredDocsCount = documents.filter(doc => doc.required).length;
  const uploadedRequiredDocsCount = documents.filter(doc => doc.required && doc.uploaded).length;
  const isComplete = uploadedRequiredDocsCount === requiredDocsCount;

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
          <Text style={styles.headerTitle}>Document Verification</Text>
          <Text style={styles.headerSubtitle}>Step 2 of 3</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
        <Text style={styles.progressText}>Step 2 of 3</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Demo Notice */}
        <View style={styles.demoNotice}>
          <Text style={styles.demoTitle}>📄 Demo Mode</Text>
          <Text style={styles.demoText}>
            Click "Upload Document" buttons to simulate document uploads. All uploads are simulated for testing.
          </Text>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Upload Required Documents</Text>
          <Text style={styles.progressText}>
            {uploadedRequiredDocsCount} of {requiredDocsCount} required documents uploaded
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(uploadedRequiredDocsCount / requiredDocsCount) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#d69e2e" />
            <Text style={styles.sectionTitle}>Required Documents</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Upload clear, legible photos or scans of your business documents. All documents will be reviewed by our verification team.
          </Text>
          
          {documents.map(renderDocument)}
        </View>

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>📋 Verification Process</Text>
          <Text style={styles.noticeText}>
            • Documents are reviewed within 24-48 hours{'\n'}
            • You'll receive email updates on your application status{'\n'}
            • Additional documents may be requested if needed{'\n'}
            • All information is kept strictly confidential
          </Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.continueButton,
            !isComplete && styles.continueButtonDisabled
          ]} 
          onPress={handleContinue}
          disabled={!isComplete}
        >
          <Text style={[
            styles.continueButtonText,
            !isComplete && styles.continueButtonTextDisabled
          ]}>
            Submit for Review
          </Text>
          <ArrowRight size={20} color={!isComplete ? "#8892b0" : "#1a2332"} />
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
  },
  demoNotice: {
    backgroundColor: 'rgba(214, 158, 46, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(214, 158, 46, 0.3)',
    padding: 16,
    marginHorizontal: 20,
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
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
    marginBottom: 20,
  },
  documentCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
    marginBottom: 16,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  documentInfo: {
    flex: 1,
    marginRight: 12,
  },
  documentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  documentName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  requiredBadge: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#e53e3e',
    backgroundColor: 'rgba(229, 62, 62, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  documentDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    marginBottom: 4,
  },
  fileName: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#38a169',
  },
  documentStatus: {
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d3748',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  uploadButtonUploaded: {
    backgroundColor: 'rgba(56, 161, 105, 0.1)',
    borderWidth: 1,
    borderColor: '#38a169',
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8892b0',
  },
  uploadButtonTextUploaded: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#38a169',
  },
  noticeCard: {
    backgroundColor: '#1a2332',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3748',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  noticeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8892b0',
    lineHeight: 20,
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
    marginHorizontal: 20,
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