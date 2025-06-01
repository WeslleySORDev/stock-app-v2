"use client";

import { AddProductModal } from "@/components/add-product-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInventory } from "@/contexts/InventoryContext";
import { Inventory } from "@/types/inventory";
import { Product } from "@/types/product";
import { ArrowLeft, Package, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewInventoryPage() {
  const router = useRouter();
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

  const handleAddProduct = (product: Product) => {
    setInventoryProducts((prev) => [...prev, product]);
    setIsAddProductModalOpen(false);
  };

  const handleCreateNewInventory = async () => {
    if (
      inventoryName !== "" &&
      inventoryCreatorName !== "" &&
      inventoryProducts.length > 0
    ) {
      const newInventory: Omit<Inventory, "id" | "createdAt"> = {
        name: inventoryName,
        creator: inventoryCreatorName,
        products: inventoryProducts,
      };
      setInventoryName("");
      setInventoryCreatorName("");
      setInventoryProducts([]);
      await addInventory(newInventory);
      router.push("/");
    }
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
                  <div className="space-y-2">
                    <Label className="" htmlFor="count-name">
                      Nome da Contagem
                    </Label>
                    <Input
                      id="count-name"
                      placeholder="Ex: Contagem Janeiro 2024"
                      value={inventoryName}
                      onChange={(e) => setInventoryName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
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
              <CardHeader className="flex flex-col gap-2">
                <CardTitle className="mx-auto">Produtos no Estoque</CardTitle>
                <Button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="w-full gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryProducts.length <= 0 ? (
                    <div className="flex items-center justify-center py-8">
                      <span>Nenhum item adicionado ainda !</span>
                    </div>
                  ) : null}
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
      <div>
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Resumo da Contagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de produtos:</span>
                  <span className="font-semibold">
                    {inventoryProducts.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de itens:</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-semibold">
                    {new Date().toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="pt-4 border-t">
                  <Button
                    onClick={handleCreateNewInventory}
                    className="w-full"
                    disabled={
                      !inventoryName.trim() || !inventoryCreatorName.trim()
                    }
                  >
                    Salvar Contagem
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onConfirm={handleAddProduct}
      />
    </div>
  );
}
