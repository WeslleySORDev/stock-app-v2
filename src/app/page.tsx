"use client";

import Link from "next/link";
import { useInventory } from "@/contexts/InventoryContext";
import { Button } from "@/components/ui/button";
import { Calendar, Hash, Package, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Inventory } from "@/types/inventory";

export default function Home() {
  const { inventories } = useInventory();
  const getInventoryTotalItems = (inventory: Inventory) => {
    return inventory.products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
  };
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="sticky top-0 py-4 bg-background flex flex-col gap-6 items-start mb-8 lg:flex-row lg:gap-0 lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Controle de estoque
            </h1>
            <p>Gerencie suas contagens de inventário</p>
          </div>
          <Link href="/new-inventory">
            <Button>
              <Plus className="h-5 w-5" />
              Nova Contagem
            </Button>
          </Link>
        </header>
        <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inventories && inventories.length > 0
            ? inventories.map((inventory) => {
                return (
                  <Link href={`/inventory/${inventory.id}`} key={inventory.id}>
                    <Card className="hover:shadow.lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Package className="h-8 w-8 text-blue-600" />
                          <Badge variant="secondary">
                            {getInventoryTotalItems(inventory)} itens
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">
                          {inventory.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(inventory.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Total de produtos
                          </span>
                          <div className="flex items-center gap-1">
                            <Hash className="h-4 w-4 text-gray-400" />
                            <span className="font-semibold">
                              {getInventoryTotalItems(inventory)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            : null}
        </main>
        {inventories.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma contagem encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Comece criando sua primeira contagem de estoque
            </p>
            <Link href="/nova-contagem">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar primeira contagem
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
