"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { useState } from "react"

interface Product {
  id: number
  title: string
  price: number
  image: string
}

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button onClick={handleAddToCart} className="w-full" size="lg" disabled={isAdded}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      {isAdded ? "Added to Cart!" : "Add to Cart"}
    </Button>
  )
}
