"use client";

import { useInventory } from "@/contexts/InventoryContext";

export default function Home() {
  const { inventories } = useInventory();
  function formatMillisecondsTimestampToDDMMYYYY(milliseconds: number) {
    const date = new Date(milliseconds);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <div>
      {inventories && inventories.length > 0
        ? inventories.map((inventory) => {
            return (
              <div key={inventory.id}>
                <p>{inventory.name}</p>
                <p>{inventory.creator}</p>
                <p>{formatMillisecondsTimestampToDDMMYYYY(inventory.createdAt)}</p>
                {inventory.products.length > 0
                  ? inventory.products.map((product) => {
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
