"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Inventory } from "@/types/inventory";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/data/firebase";

interface InventoryContextProps {
    inventories: Inventory[];
}

export const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

interface InventoryProviderProps {
    children: ReactNode;
}

const DEFAULT_INVENTORY: Inventory[] = [
    {
        id: "ac3fb178-6779-4a98-a2da-a310b7826a14",
        name: "Contagem Atlas",
        creator: "Weslley",
        createdAt: Date.now(),
        products: [
            {
                code: "8000",
                name: "Kit Verniz 8000",
                quantity: 20
            },
            {
                code: "6100",
                name: "Kit Verniz 6100",
                quantity: 10
            },
            {
                code: "8937",
                name: "Verniz 8937",
                quantity: 2
            }
        ]
    }
]

export const InventoryProvider = ({ children }: InventoryProviderProps) => {
    const [inventories, setInventories] = useState<Inventory[]>(DEFAULT_INVENTORY)
    const inventoriesCollectionRef = collection(db, "inventories");

    useEffect(() => {
        const unsubscribe = onSnapshot(inventoriesCollectionRef, (snapshot) => {
            const fetchedInventories: Inventory[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data()?.createdAt?.toDate().getTime() || Date.now()
            } as Inventory))
            const orderedInventories = [...fetchedInventories].sort((a, b) => b.createdAt - a.createdAt)
            setInventories(orderedInventories)
        })
        return () => unsubscribe();
    }, [])

    const addInventory = async(inventoryData: Omit<Inventory, "id" | "createdAt">) => {
        const newInventoryDocRef = doc(inventoriesCollectionRef);
        const newInventory: Inventory = {
            id: newInventoryDocRef.id,
            createdAt: Date.now(),
            ...inventoryData
        };
        await setDoc(newInventoryDocRef, {
            creator: newInventory.creator,
            name: newInventory.name,
            createdAt: newInventory.createdAt,
            products: newInventory.products
        })
    }

    const deleteInventory = async(id: string) => {
        const inventoryDocRef = doc(db, "inventories", id);
        await deleteDoc(inventoryDocRef)
    }
    return (
        <InventoryContext.Provider
            value={{
                inventories
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