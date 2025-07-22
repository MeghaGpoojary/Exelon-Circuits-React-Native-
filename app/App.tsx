
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailScreen from 'C:/Exelon/Shopping-App/app/product/[id]';
import CartScreen from 'C:/Exelon/Shopping-App/app/(tabs)/cart';
import { Product } from 'C:/Exelon/Shopping-App/types/product';

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
