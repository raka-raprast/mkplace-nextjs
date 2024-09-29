/* eslint-disable @next/next/no-img-element */
// app/product/[id]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import fakeData from '../../../data/fake_data.json'; 
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProductDetail = () => {
    const { id } = useParams(); // Use useParams to get the product ID from the URL
  
    // Find the product by ID from your fake data
    const product = fakeData.find((item) => item.id === id);
  
    if (!product) {
      return <p>Product not found.</p>;
    }
  
    return (
      <div className="container mx-auto px-4">
        <Card className=" mx-auto">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <img
                  src={product.image_url} // Ensure this URL is correctly formatted for Image component
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold mb-2">{product.name}</CardTitle>
                  <p className="text-2xl font-semibold text-primary mb-2">${product.price.toFixed(2)}</p>
                  <p className="text-muted-foreground mb-4">Sold by {product.seller}</p>
                  <Badge variant="secondary" className="mb-4">{product.category}</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Button className="w-full md:w-auto flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                  <p className="text-sm text-muted-foreground">{product.stock} in stock</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Product ID: {product.id}</p>
          </CardFooter>
        </Card>
      </div>
    );
  };

export default ProductDetail;
