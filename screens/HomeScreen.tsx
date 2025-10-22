import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
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

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  // Sample menu items - in a real app, this would come from a state management solution
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
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
    }
  ]);

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard item={item} />
  );

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      {/* Background Layers (Discord-style EDM aesthetic) */}
      <View style={globalStyles.backgroundLayerContainer} pointerEvents="none">
        <View style={[globalStyles.bgBlob, globalStyles.bgBlobPink]} />
        <View style={[globalStyles.bgBlob, globalStyles.bgBlobBlue]} />
        <View style={[globalStyles.bgBlob, globalStyles.bgBlobPurple]} />
      </View>

      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={globalStyles.title}>Digital Menu</Text>
          <Text style={styles.itemCount}>
            {menuItems.length} {menuItems.length === 1 ? 'item' : 'items'} total
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[globalStyles.primaryButton, styles.actionButton]}
            onPress={() => navigation.navigate('AddMenuItem')}
            accessibilityRole="button"
            accessibilityLabel="Add new menu item"
          >
            <Feather name="plus" size={20} color={colors.text} />
            <Text style={[globalStyles.primaryButtonText, styles.buttonText]}>
              Add New Item
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.button, styles.actionButton]}
            onPress={() => navigation.navigate('Filter')}
            accessibilityRole="button"
            accessibilityLabel="Filter menu by course"
          >
            <Feather name="filter" size={20} color={colors.text} />
            <Text style={[globalStyles.buttonText, styles.buttonText]}>
              Filter by Course
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Menu Items</Text>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
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
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  itemCount: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    marginLeft: 4,
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});
