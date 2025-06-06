"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/product";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
}

export function AddProductModal({
  isOpen,
  onClose,
  onConfirm,
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  const handleConfirm = () => {
    if (formData.name.trim() && formData.code.trim()) {
      const newProduct: Product = {
        name: formData.name.trim(),
        code: formData.code.trim(),
        quantity: 0,
      };
      onConfirm(newProduct);
      setFormData({ name: "", code: "" });
    }
  };

  const handleClose = () => {
    setFormData({ name: "", code: "" });
    onClose();
  };

  const isValid = formData.name.trim() && formData.code.trim();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo produto para adicionar ao estoque.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="product-name">Nome do Produto *</Label>
            <Input
              id="product-name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Ex: Notebook Dell Inspiron"
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-code">Código do Produto *</Label>
            <Input
              id="product-code"
              value={formData.code}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, code: e.target.value }))
              }
              placeholder="Ex: NB001"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!isValid}>
            Adicionar Produto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
