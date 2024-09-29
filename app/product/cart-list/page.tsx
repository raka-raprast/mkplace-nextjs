"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  image_url: string
  seller: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: 49.99,
    stock: 150,
    category: "Electronics",
    image_url: "https://picsum.photos/id/1/300/300",
    seller: "TechZone"
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Feature-packed smartwatch with health tracking.",
    price: 199.99,
    stock: 75,
    category: "Electronics",
    image_url: "https://picsum.photos/id/2/300/300",
    seller: "WearTech"
  },
  {
    id: "3",
    name: "Portable Charger",
    description: "High-capacity portable charger for all your devices.",
    price: 29.99,
    stock: 200,
    category: "Electronics",
    image_url: "https://picsum.photos/id/3/300/300",
    seller: "PowerUp"
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    description: "Waterproof Bluetooth speaker with amazing sound quality.",
    price: 79.99,
    stock: 100,
    category: "Electronics",
    image_url: "https://picsum.photos/id/4/300/300",
    seller: "AudioPro"
  }
]

export default function Component() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const initialQuantities = products.reduce((acc, product) => {
      acc[product.id] = 1
      return acc
    }, {} as { [key: string]: number })
    setQuantities(initialQuantities)
  }, [])

  const handleCheckout = () => {
    const selectedProducts = products.filter(product => checkedItems[product.id])
    if (selectedProducts.length > 0) {
      console.log("Proceeding to checkout with:", selectedProducts.map(product => ({
        ...product,
        quantity: quantities[product.id]
      })))
      // Here you would typically navigate to a checkout page or open a checkout modal
    } else {
      alert("Please select at least one item to checkout.")
    }
  }

  const totalPrice = products.reduce((total, product) => {
    if (checkedItems[product.id]) {
      return total + product.price * quantities[product.id]
    }
    return total
  }, 0)

  const itemCount = Object.values(checkedItems).filter(Boolean).length

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Cart Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-6">
              {products.map((product) => (
                <div key={product.id} className="flex items-start space-x-4">
                  <Checkbox
                    id={`checkbox-${product.id}`}
                    checked={checkedItems[product.id] || false}
                    onCheckedChange={(checked) => 
                      setCheckedItems(prev => ({ ...prev, [product.id]: checked as boolean }))
                    }
                  />
                  <img
                    src={product.image_url}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <div className="flex-1 space-y-1">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-sm">Seller: {product.seller}</p>
                    <p className="text-sm">Category: {product.category}</p>
                    <p className="text-lg font-medium">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantities(prev => ({
                          ...prev,
                          [product.id]: Math.max(1, prev[product.id] - 1)
                        }))}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{quantities[product.id]}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantities(prev => ({
                          ...prev,
                          [product.id]: Math.min(product.stock, prev[product.id] + 1)
                        }))}
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">{product.stock} available</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 border-t pt-4">
          <div className="text-xl font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <Button size="lg" onClick={handleCheckout} disabled={itemCount === 0}>
            Checkout ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}