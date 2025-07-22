
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailScreen from '../app/product/[id]';
import CartScreen from './(tabs)/cart';
import { Product } from '../types/product';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { product: Product };
  Cart: { addProduct?: Product } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
