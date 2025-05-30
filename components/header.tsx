"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Menu, User } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { useState } from "react"

export function Header() {
  const { getTotalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Fashion Forward
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/category/men's%20clothing" className="hover:text-gray-600">
              Men
            </Link>
            <Link href="/category/women's%20clothing" className="hover:text-gray-600">
              Women
            </Link>
            <Link href="/category/jewelery" className="hover:text-gray-600">
              Jewelry
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input type="search" placeholder="Search products..." className="pl-10" />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/category/men's%20clothing" className="hover:text-gray-600">
                Men's Clothing
              </Link>
              <Link href="/category/women's%20clothing" className="hover:text-gray-600">
                Women's Clothing
              </Link>
              <Link href="/category/jewelery" className="hover:text-gray-600">
                Jewelry
              </Link>
              <div className="pt-2">
                <Input type="search" placeholder="Search products..." className="w-full" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
