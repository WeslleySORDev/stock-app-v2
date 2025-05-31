import { Product } from "./product";

export interface StockCount {
    id: string;
    creator: string;
    name: string;
    createdAt: number;
    products: Product[]
}