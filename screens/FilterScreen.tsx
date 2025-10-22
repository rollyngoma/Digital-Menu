import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import { colors, globalStyles } from '../styles/styles';
import MenuItemCard, { MenuItem } from '../components/MenuItemCard';

type RootStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
  Filter: undefined;
};

type FilterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Filter'>;

interface Props {
  navigation: FilterScreenNavigationProp;
}

export default function FilterScreen({ navigation }: Props) {
  const [selectedCourse, setSelectedCourse] = useState<'Starter' | 'Main' | 'Dessert' | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  // Sample menu items - in a real app, this would come from a state management solution
  const allMenuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with parmesan cheese and croutons',
      course: 'Starter',
      price: '12.99'
    },
    {
      id: '2',
      name: 'Grilled Salmon',
      description: 'Atlantic salmon with lemon herb butter and seasonal vegetables',
      course: 'Main',
      price: '24.99'
    },
    {
      id: '3',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center and vanilla ice cream',
      course: 'Dessert',
      price: '8.99'
    },
    {
      id: '4',
      name: 'Garlic Bread',
      description: 'Toasted artisan bread with garlic butter and herbs',
      course: 'Starter',
      price: '6.99'
    },
    {
      id: '5',
      name: 'Beef Tenderloin',
      description: '8oz tenderloin steak with red wine reduction and mashed potatoes',
      course: 'Main',
      price: '32.99'
    },
    {
      id: '6',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
      course: 'Dessert',
      price: '9.99'
    }
  ];

  const courseOptions = ['Starter', 'Main', 'Dessert'];

  // Filter menu items based on selected course
  const filteredItems = selectedCourse 
    ? allMenuItems.filter(item => item.course === selectedCourse)
    : allMenuItems;

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard item={item} />
  );

  const handleBackToHome = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      {/* Background Layers */}
      <View style={globalStyles.backgroundLayerContainer} pointerEvents="none">
        <View style={[globalStyles.bgBlob, globalStyles.bgBlobPink]} />
        <View style={[globalStyles.bgBlob, globalStyles.bgBlobBlue]} />
        <View style={[globalStyles.bgBlob, globalStyles.bgBlobPurple]} />
      </View>

      <View style={styles.container}>
        {/* Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Filter by Course</Text>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => setShowCourseModal(true)}
          >
            <Text style={[styles.pickerInput, !selectedCourse && { color: colors.textMuted }]}>
              {selectedCourse || 'Select a course to filter'}
            </Text>
            <Feather name="chevron-down" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Course Selection Modal */}
          <Modal
            visible={showCourseModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowCourseModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Course</Text>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedCourse(null);
                    setShowCourseModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>All Courses</Text>
                </TouchableOpacity>
                {courseOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.modalOption}
                    onPress={() => {
                      setSelectedCourse(option as 'Starter' | 'Main' | 'Dessert');
                      setShowCourseModal(false);
                    }}
                  >
                    <Text style={styles.modalOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.modalCancel}
                  onPress={() => setShowCourseModal(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
          {/* Results Summary */}
          <View style={styles.resultsSummary}>
            <Text style={styles.resultsText}>
              {selectedCourse 
                ? `${filteredItems.length} ${selectedCourse.toLowerCase()}${filteredItems.length === 1 ? '' : 's'} found`
                : `${filteredItems.length} total items`
              }
            </Text>
            {selectedCourse && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSelectedCourse(null)}
                accessibilityRole="button"
                accessibilityLabel="Clear filter"
              >
                <Feather name="x" size={16} color={colors.textMuted} />
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={[globalStyles.button, styles.backButton]}
          onPress={handleBackToHome}
          accessibilityRole="button"
          accessibilityLabel="Back to home screen"
        >
          <Feather name="arrow-left" size={20} color={colors.text} />
          <Text style={[globalStyles.buttonText, styles.backButtonText]}>
            Back to Home
          </Text>
        </TouchableOpacity>

        {/* Filtered Menu Items List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            {selectedCourse ? `${selectedCourse} Items` : 'All Menu Items'}
          </Text>
          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Feather name="search" size={48} color={colors.textMuted} />
                <Text style={styles.emptyStateText}>
                  No items found for the selected course
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: colors.button,
    borderColor: colors.buttonBorder,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerInput: {
    color: colors.text,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: colors.button,
  },
  modalOptionText: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  modalCancel: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: colors.error,
  },
  modalCancelText: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  resultsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.button,
    borderRadius: 6,
  },
  clearButtonText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  backButtonText: {
    marginLeft: 4,
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});
