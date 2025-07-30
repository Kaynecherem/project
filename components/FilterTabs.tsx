import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface FilterTabsProps {
  filters: string[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

export default function FilterTabs({ filters, selectedFilter, onFilterSelect }: FilterTabsProps) {
  const getFilterAbbreviation = (filter: string) => {
    switch (filter.toLowerCase()) {
      case 'audemars piguet': return 'AP';
      case 'patek philippe': return 'PP';
      default: return filter;
    }
  };

  return (
    <View style={styles.filterContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => {
          const displayText = getFilterAbbreviation(filter);
          
          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.filterTabActive
              ]}
              onPress={() => onFilterSelect(filter)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  selectedFilter === filter && styles.filterTabTextActive
                ]}
              >
                {displayText}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 6,
  },
  filterTab: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
  },
  filterTabActive: {
    backgroundColor: '#8B7355',
    borderColor: '#8B7355',
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
    textAlign: 'center',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
});