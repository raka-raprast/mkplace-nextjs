/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import fakeData from '../../../data/fake_data.json';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingIndicator from '@/app/custom_components/loading';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  seller: string;
}

export default function ListProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(fakeData);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const query = searchParams.get('query');
    setLoading(true); // Set loading to true when filtering starts

    if (query) {
      const searchTerm = query.toLowerCase();
      const filtered = fakeData.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(fakeData);
    }

    setLoading(false); // Set loading to false after filtering is done
  }, [searchParams]);

  const navigate = (productId: string) => {
    if (window.Flutter && typeof window.Flutter.postMessage === "function") {
      window.Flutter.postMessage(JSON.stringify(productId));
    } else {
      navigateToProduct(productId);
    }
  };

  const navigateToProduct = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const query = searchParams.get('query');
  const hideBar = searchParams.get('hideBar');

  return (
    <main className="flex-1">
      <section className="w-full">
        <div className="container">
          {/* Only show the header if query is not empty */}
          {!hideBar && query && <h2 className='py-4'>Search Result</h2>}

          {loading ? (
            <LoadingIndicator />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product: Product) => (
                  <div
                    key={product.id}
                    className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm"
                    onClick={() => {
                      console.log("tapped");
                      navigate(product.id);
                    }}
                  >
                    <img
                      alt={product.name}
                      className="w-full object-cover rounded-t-lg"
                      height="300"
                      src={product.image_url}
                      width="300"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {product.description}
                      </p>
                      <span className="text-xl font-bold mt-4">${product.price.toFixed(2)}</span>
                      <div className="mt-auto flex justify-center sm:justify-end w-full">
                        <Button
                          className="mt-2 w-full flex justify-center"
                          onClick={() => navigate(product.id)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <p className='text-sm pl-2'>Add To Cart</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center flex items-center justify-center custom-height">No products found.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
