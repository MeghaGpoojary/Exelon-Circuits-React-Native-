import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Menu, Search, Settings, Star, Shirt, ShoppingCart } from 'lucide-react-native';
import { router } from 'expo-router';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Product, useCart } from '@/contexts/CartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

const categoryIcons = [
  { id: 'popular', name: 'Popular', icon: Star, color: '#007AFF' },
  { id: 'clothes', name: 'Clothes', icon: Shirt, color: '#34C759' },
  { id: 'shoes', name: 'Shoes', icon: 'shoe', color: '#FF9500' },
  { id: 'bags', name: 'Bags', icon: 'bag', color: '#AF52DE' },
  { id: 'watch', name: 'Watch', icon: 'watch', color: '#FF3B30' },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'popular') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: product.id }
    });
  };

  const cartItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const renderCategoryIcon = (category: any) => {
    const isActive = selectedCategory === category.id;
    
    if (category.icon === Star || category.icon === Shirt) {
      const IconComponent = category.icon;
      return (
        <TouchableOpacity
          key={category.id}
          style={[styles.categoryIcon, isActive && { backgroundColor: category.color }]}
          onPress={() => setSelectedCategory(category.id)}
        >
          <IconComponent 
            size={24} 
            color={isActive ? '#FFFFFF' : category.color} 
            fill={isActive ? '#FFFFFF' : 'none'}
          />
        </TouchableOpacity>
      );
    }
    
    
    let customIcon;
    switch (category.icon) {
      case 'shoe':
        customIcon = '👟';
        break;
      case 'bag':
        customIcon = '👜';
        break;
      case 'watch':
        customIcon = '⌚';
        break;
      default:
        customIcon = '📦';
    }
    
    return (
      <TouchableOpacity
        key={category.id}
        style={[styles.categoryIcon, isActive && { backgroundColor: category.color }]}
        onPress={() => setSelectedCategory(category.id)}
      >
        <Text style={[styles.customIconText, isActive && { color: '#FFFFFF' }]}>
          {customIcon}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProductGrid = () => {
    const rows = [];
    for (let i = 0; i < filteredProducts.length; i += 2) {
      const leftProduct = filteredProducts[i];
      const rightProduct = filteredProducts[i + 1];
      
      rows.push(
        <View key={i} style={styles.productRow}>
          <View style={[styles.productCard, { width: CARD_WIDTH }]}>
            <ProductCard product={leftProduct} onPress={handleProductPress} />
          </View>
          {rightProduct && (
            <View style={[styles.productCard, { width: CARD_WIDTH }]}>
              <ProductCard product={rightProduct} onPress={handleProductPress} />
            </View>
          )}
        </View>
      );
    }
    return rows;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Menu size={24} color="#1C1C1E" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999999"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={() => router.push('/cart')}
        >
          <ShoppingCart size={20} color="#FFFFFF" />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <View style={styles.categoryScrollView}>
          {categoryIcons.map(renderCategoryIcon)}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try selecting a different category or search term</Text>
          </View>
        ) : (
          <View style={styles.productsContainer}>
            {renderProductGrid()}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1C1C1E',
  },
  cartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryScrollView: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 8,
  },
  customIconText: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    // width is set dynamically
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});