"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Truck, Shield, RotateCcw } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { useEffect, useState } from "react";
import { useKuponaTracking } from "@/hooks/use-kupona-tracking";
import { useParams } from "next/navigation";


export default function ProductPage() {
  const [product, setProduct] = useState<any>(null);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    fetchProduct();
  }, []);

  useKuponaTracking({
    pagetype: "productdetail",
    productId: product?.id,
    categoryId: product?.category,
  });

  const fetchProduct = async () => {
    const id = params.id;
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    const temp_products = await res.json();

    setProduct(temp_products);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>id: {product?.id || "..."}</p>
        <p>category: {product?.category || "..."}</p>

        {product ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg border p-8">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2 capitalize">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating.rate)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="text-3xl font-bold text-green-600 mb-6">
                  ${product.price}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <AddToCartButton product={product} />

                <Button variant="outline" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="w-4 h-4 text-orange-600" />
                  <span>30 Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 gap-12 text-gray-500">
            <div>
              <span>Loading product </span>
              <span className="animate-ping duration-1000">. </span>
              <span className="animate-ping delay-75 duration-1000">. </span>
              <span className="animate-ping delay-150 duration-1000">.</span>
            </div>

            <div className="rounded-full border-y border-blue-300 animate-spin h-12 w-12" />
          </div>
        )}
      </div>
    </div>
  );
}
