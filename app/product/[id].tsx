import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, ShoppingCart, Star, Heart } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { products } from 'C:/Exelon/Shopping-App/data/products';
import { useCart } from 'C:/Exelon/Shopping-App/contexts/CartContext';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { dispatch } = useCart();
  
  const product = useMemo(() => 
    products.find(p => p.id === id), [id]
  );

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity: 1,
      selectedColor: selectedColor || undefined,
      selectedSize: selectedSize || undefined,
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    
    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') },
      ]
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/(tabs)/cart');
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Heart 
            size={24} 
            color={isFavorite ? "#FF3B30" : "#1C1C1E"}
            fill={isFavorite ? "#FF3B30" : "transparent"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          {discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discountPercentage}%</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.storeName}>Multicom Store</Text>
          
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFB800" fill="#FFB800" />
            <Text style={styles.ratingText}>{product.rating}({product.reviews.toLocaleString()})</Text>
            <Text style={styles.soldText}>1.5k Sold</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>

          {product.colors && product.colors.length > 0 && (
            <View style={styles.optionSection}>
              <Text style={styles.optionTitle}>Color Family</Text>
              <View style={styles.colorOptions}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorButton,
                      selectedColor === color && styles.activeColorButton
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <Text style={[
                      styles.colorText,
                      selectedColor === color && styles.activeColorText
                    ]}>
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.optionSection}>
              <Text style={styles.optionTitle}>Show Size</Text>
              <View style={styles.sizeOptions}>
                <View style={styles.sizeDropdown}>
                  <Text style={styles.sizeText}>{selectedSize || 'Select Size'}</Text>
                </View>
                <View style={styles.quantitySection}>
                  <Text style={styles.quantityLabel}>Quantity</Text>
                  <View style={styles.quantityDropdown}>
                    <Text style={styles.quantityText}>1</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {product.description && (
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="#007AFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#F8F9FA',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
  },
  storeName: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  soldText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  originalPrice: {
    fontSize: 18,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginLeft: 12,
  },
  optionSection: {
    marginBottom: 24,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    marginBottom: 8,
  },
  activeColorButton: {
    backgroundColor: '#007AFF',
  },
  colorText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activeColorText: {
    color: '#FFFFFF',
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeDropdown: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  sizeText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  quantitySection: {
    flex: 1,
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  quantityDropdown: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    gap: 8,
  },
  chatButton: {
    flex: 0.2,
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  addToCartButton: {
    flex: 0.4,
    flexDirection: 'row',
    backgroundColor: '#F0F9FF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  buyNowButton: {
    flex: 0.4,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});