"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/components/cart-context"

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface CartItemProps {
  item: CartItem
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-white rounded-lg p-2">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
            <div className="text-lg font-bold text-green-600 mb-2">${item.price}</div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 text-red-500 hover:text-red-700"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
