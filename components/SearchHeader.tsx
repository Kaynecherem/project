import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder: string;
  onFilterPress?: () => void;
}

export default function SearchHeader({ 
  searchQuery, 
  onSearchChange, 
  placeholder,
  onFilterPress 
}: SearchHeaderProps) {
  return (
    <View style={styles.searchContainer}>
      <Search size={16} color="#8892b0" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#8892b0"
        value={searchQuery}
        onChangeText={onSearchChange}
      />
      {onFilterPress && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Filter size={16} color="#8892b0" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  filterButton: {
    padding: 4,
    marginLeft: 8,
  },
});