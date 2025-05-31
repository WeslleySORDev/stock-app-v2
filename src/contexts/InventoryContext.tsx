import { createContext, ReactNode, useContext, useState } from "react";
import { StockCount } from "@/types/stock";

interface InventoryContextProps {
    inventory: StockCount[];
}

export const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

interface InventoryProviderProps {
    children: ReactNode;
}

export const InventoryProvider = ({ children }: InventoryProviderProps) => {
    const [inventory, setInventory] = useState<StockCount[]>([])

    return (
        <InventoryContext.Provider
            value={{
                inventory
            }}>
            {children}
        </InventoryContext.Provider>
    )
}

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) throw new Error("useInventory must be used within an InventoryProvider");
    return context;
}