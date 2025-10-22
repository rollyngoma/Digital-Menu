import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import { colors, globalStyles } from '../styles/styles';

type RootStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
  Filter: undefined;
};

type AddMenuItemScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddMenuItem'>;

interface Props {
  navigation: AddMenuItemScreenNavigationProp;
}

export default function AddMenuItemScreen({ navigation }: Props) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<'Starter' | 'Main' | 'Dessert' | null>(null);
  const [price, setPrice] = useState('');
  const [showCourseModal, setShowCourseModal] = useState(false);

  const courseOptions = ['Starter', 'Main', 'Dessert'];

  const validateInput = () => {
    if (!dishName.trim()) {
      Alert.alert('Validation Error', 'Please enter a dish name');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description');
      return false;
    }
    if (!course) {
      Alert.alert('Validation Error', 'Please select a course');
      return false;
    }
    if (!price.trim()) {
      Alert.alert('Validation Error', 'Please enter a price');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      Alert.alert('Validation Error', 'Please enter a valid price');
      return false;
    }
    return true;
  };

  const handleAddItem = () => {
    if (validateInput()) {
      // In a real app, this would save to a state management solution or database
      Alert.alert(
        'Success',
        'Menu item added successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const handleCancel = () => {
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

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Dish Name Input */}
          <View style={styles.inputGroup}>
            <Text style={globalStyles.label}>Dish Name</Text>
            <TextInput
              style={globalStyles.input}
              value={dishName}
              onChangeText={setDishName}
              placeholder="Enter dish name"
              placeholderTextColor={colors.textMuted}
              accessibilityLabel="Dish name input"
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={globalStyles.label}>Description</Text>
            <TextInput
              style={[globalStyles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter dish description"
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              accessibilityLabel="Description input"
            />
          </View>

          {/* Course Picker */}
          <View style={styles.inputGroup}>
            <Text style={globalStyles.label}>Course</Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setShowCourseModal(true)}
            >
              <Text style={[styles.pickerInput, !course && { color: colors.textMuted }]}>
                {course || 'Select a course'}
              </Text>
              <Feather name="chevron-down" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

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
                {courseOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.modalOption}
                    onPress={() => {
                      setCourse(option as 'Starter' | 'Main' | 'Dessert');
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

          {/* Price Input */}
          <View style={styles.inputGroup}>
            <Text style={globalStyles.label}>Price</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={[globalStyles.input, styles.priceInput]}
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                accessibilityLabel="Price input"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[globalStyles.button, styles.button]}
              onPress={handleCancel}
              accessibilityRole="button"
              accessibilityLabel="Cancel adding menu item"
            >
              <Feather name="x" size={20} color={colors.text} />
              <Text style={[globalStyles.buttonText, styles.buttonText]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.primaryButton, styles.button]}
              onPress={handleAddItem}
              accessibilityRole="button"
              accessibilityLabel="Add menu item"
            >
              <Feather name="check" size={20} color={colors.text} />
              <Text style={[globalStyles.primaryButtonText, styles.buttonText]}>
                Add Item
              </Text>
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
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  formContainer: {
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  textArea: {
    height: 80,
  },
  pickerContainer: {
    backgroundColor: colors.button,
    borderColor: colors.buttonBorder,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarSign: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    marginTop: 12,
  },
  priceInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    marginLeft: 4,
  },
});
