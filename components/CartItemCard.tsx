import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Minus, Plus, X } from 'lucide-react-native';
import { CartItem, useCart } from 'C:/Exelon/Shopping-App/contexts/CartContext';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { dispatch } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, quantity: newQuantity }
    });
  };

  const handleRemove = () => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item.id
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <X size={16} color="#999999" />
          </TouchableOpacity>
        </View>
        
        {item.selectedColor && (
          <Text style={styles.variant}>Color: {item.selectedColor}</Text>
        )}
        {item.selectedSize && (
          <Text style={styles.variant}>Size: {item.selectedSize}</Text>
        )}
        
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus size={16} color="#007AFF" />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  variant: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    minWidth: 30,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
});

export default CartItemCard;