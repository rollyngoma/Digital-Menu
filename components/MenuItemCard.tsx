import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, globalStyles } from '../styles/styles';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert';
  price: string;
}

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.courseContainer}>
        <Text style={styles.courseLabel}>Course:</Text>
        <Text style={styles.course}>{item.course}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dishName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  price: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
    marginRight: 6,
  },
  course: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(43, 134, 197, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
});
