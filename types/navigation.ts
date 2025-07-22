import { Product } from './product';

export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  ProductDetails: { product: Product };
  Cart: undefined;
};