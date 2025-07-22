import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from 'C:/Exelon/Shopping-App/hooks/useFrameworkReady';
import { CartProvider } from 'C:/Exelon/Shopping-App/contexts/CartContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </CartProvider>
  );
}