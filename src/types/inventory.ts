import { Product } from "./product";

export interface Inventory {
  id: string;
  creator: string;
  name: string;
  createdAt: number;
  products: Product[];
}
