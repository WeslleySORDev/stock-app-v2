"use client";

import { useInventory } from "@/contexts/InventoryContext";

export default function Home() {
  const { inventories } = useInventory();
  return (
    <div>
      {inventories && inventories.length > 0
        ? inventories.map((stock) => {
            return (
              <div key={stock.id}>
                <p>{stock.name}</p>
                <p>{stock.creator}</p>
                <p>{stock.createdAt}</p>
                {stock.products.length > 0
                  ? stock.products.map((product) => {
                      return <p key={product.code}>{product.name}</p>;
                    })
                  : null}
              </div>
            );
          })
        : null}
    </div>
  );
}
