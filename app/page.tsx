import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";

async function getFeaturedProducts() {
  const res = await fetch("https://fakestoreapi.com/products?limit=8");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  const fashionCategories = categories.filter(
    (cat: string) => cat.includes("clothing") || cat === "jewelery"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="text-center text-white space-y-6 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Fashion Forward</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Discover the latest trends in fashion and jewelry
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fashionCategories.map((category: string) => (
              <Link
                key={category}
                href={`/category/${encodeURIComponent(category)}`}
              >
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="h-32 flex items-center justify-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">
                          {category === "men's clothing"
                            ? "👔"
                            : category === "women's clothing"
                            ? "👗"
                            : "💎"}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold capitalize">
                      {category.replace("'s", "'s ")}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
