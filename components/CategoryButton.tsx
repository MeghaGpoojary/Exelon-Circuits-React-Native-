import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Star, Shirt } from 'lucide-react-native';

interface CategoryButtonProps {
  category: {
    id: string;
    name: string;
    icon: string;
  };
  isActive: boolean;
  onPress: (categoryId: string) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isActive, onPress }) => {
  const getIcon = () => {
    switch (category.icon) {
      case 'star':
        return <Star size={20} color={isActive ? '#FFFFFF' : '#666666'} />;
      case 'shirt':
        return <Shirt size={20} color={isActive ? '#FFFFFF' : '#666666'} />;
      default:
        return <View style={[styles.iconPlaceholder, { backgroundColor: isActive ? '#FFFFFF' : '#666666' }]} />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={() => onPress(category.id)}
    >
      {getIcon()}
      <Text style={[styles.text, isActive && styles.activeText]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    minWidth: 80,
  },
  activeContainer: {
    backgroundColor: '#007AFF',
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
    marginTop: 4,
  },
  activeText: {
    color: '#FFFFFF',
  },
});

export default CategoryButton;