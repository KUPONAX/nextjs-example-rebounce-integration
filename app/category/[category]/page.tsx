"use client";

import { ProductCard } from "@/components/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useKuponaTracking } from "@/hooks/use-kupona-tracking";

export default function CategoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    fetchProduct();
  }, []);

  useKuponaTracking({
    pagetype: "category",
    productId:
      products && products.length > 0 ? products.map((p) => p.id) : undefined,
    categoryId: category,
  });

  const fetchProduct = async () => {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    const temp_products = await res.json();

    setProducts(temp_products);
  };

  return (
    <div className="min-h-screen bg-background">
      {products && category ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold capitalize mb-2">
                {category.replace("'s", "'s ")}
              </h1>
              <p className="text-gray-600">{products.length} products found</p>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
  );
}
