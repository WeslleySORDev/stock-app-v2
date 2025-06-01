"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInventory } from "@/contexts/InventoryContext";
import { Product } from "@/types/product";
import { ArrowLeft, Package, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewInventoryPage() {
  const { addInventory } = useInventory();
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryCreatorName, setInventoryCreatorName] = useState("");
  const [inventoryProducts, setInventoryProducts] = useState<Product[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleQuantityChange = (productCode: string, newQuantity: number) => {
    setInventoryProducts((prev) =>
      prev.map((product) =>
        product.code === productCode
          ? { ...product, quantity: Math.max(0, newQuantity) }
          : product
      )
    );
  };

  const totalItems = inventoryProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nova Contagem</h1>
            <p className="text-gray-600 mt-2">
              Crie uma nova contagem de inventário
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Informações da Contagem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="count-name">Nome da Contagem</Label>
                    <Input
                      id="count-name"
                      placeholder="Ex: Contagem Janeiro 2024"
                      value={inventoryName}
                      onChange={(e) => setInventoryName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="owner-name">
                      Nome da Pessoa que está contando
                    </Label>
                    <Input
                      id="owner-name"
                      placeholder="Ex: João Silva"
                      value={inventoryCreatorName}
                      onChange={(e) => setInventoryCreatorName(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Produtos no Estoque</CardTitle>
                <Button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryProducts.map((product) => (
                    <div
                      key={product.code}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-gray-400" />
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <Badge variant="outline" className="mt-1">
                              Código: {product.code}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                product.code,
                                Number.parseInt(e.target.value) || 0
                              )
                            }
                            className="w-20 text-center"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
