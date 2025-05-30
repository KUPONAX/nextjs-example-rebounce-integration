import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-4">
          <div className="aspect-square bg-white rounded-lg mb-4 p-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={200}
              height={200}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
            />
          </div>

          <Badge variant="secondary" className="mb-2 text-xs capitalize">
            {product.category}
          </Badge>

          <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.title}</h3>

          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>

          <div className="text-lg font-bold text-green-600">${product.price}</div>
        </CardContent>
      </Card>
    </Link>
  )
}
