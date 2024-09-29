/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import fakeData from '../data/fake_data.json';
import { ShoppingCart } from 'lucide-react';
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LoadingIndicator from './custom_components/loading';
import { Button } from '@/components/ui/button';
import Product from './models/product';


const shuffleArray = (array: Product[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Custom Arrow Component
interface ArrowProps {
  onClick: () => void;
  isHidden: boolean;
}

const NextArrow = ({ onClick, isHidden }: ArrowProps) => {
  if (isHidden) return null; // Hide the arrow if it shouldn't be shown
  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
      <button onClick={onClick} className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200">
        &gt; {/* Right Arrow Symbol */}
      </button>
    </div>
  );
};

const PrevArrow = ({ onClick, isHidden }: ArrowProps) => {
  if (isHidden) return null; // Hide the arrow if it shouldn't be shown
  return (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
      <button onClick={onClick} className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200">
        &lt; {/* Left Arrow Symbol */}
      </button>
    </div>
  );
};

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const sliderRef = useRef<Slider>(null); // Ref to access the slider

  useEffect(() => {
    const shuffledProducts = shuffleArray([...fakeData]).slice(0, 8);
    setFeaturedProducts(shuffledProducts);
  }, []);
  const viewMoreTap = () => {
    if (window.Flutter && typeof window.Flutter.postMessage === "function") {
      window.Flutter.postMessage(JSON.stringify("viewMore"));
    } else {
      router.push('/product/search')
    }
  };
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


  const handleAfterChange = (current: number) => {
    setCurrentSlide(current); // Update current slide index
  };

  const settings = {
    dots: false, // Hide dots
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow isHidden={currentSlide >= featuredProducts.length - 5} onClick={function (): void {
      throw new Error('Function not implemented.');
    } } />,
    prevArrow: <PrevArrow isHidden={currentSlide <= 0} onClick={function (): void {
      throw new Error('Function not implemented.');
    } } />,
    afterChange: handleAfterChange, // Track slide changes
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (featuredProducts.length === 0) {
    return (
     <LoadingIndicator/>
    );
  }
  

  return (
    <main className="flex-1">
      <section className="w-full overflow-auto">
        <div className="container">
          <h2 className="text-2xl font-bold tracking-tighter lg:text-center md:text-center mb-6">
            Featured Products
          </h2>

          <div className="hidden lg:block relative touch-pan-y">
            <Slider {...settings} ref={sliderRef}>
              {featuredProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm"
                  onClick={() => navigate(product.id)}
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
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
                    <span className="text-xl font-bold mt-4">${product.price.toFixed(2)}</span>
                    <div className="mt-auto flex justify-center sm:justify-end w-full">
                      <Button
                        className="mt-2 w-full flex justify-center"
                        onClick={() => navigate(product.id)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <p className='text-sm pl-2'> Add To Cart</p>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="lg:hidden grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 touch-pan-y">
            {featuredProducts.map((product: Product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm"
                onClick={() => navigate(product.id)}
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
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
                  <span className="text-xl font-bold mt-4">${product.price.toFixed(2)}</span>
                  <div className="mt-auto flex justify-center sm:justify-end w-full">
                    <Button
                      className="mt-2 w-full flex justify-center"
                      onClick={() => navigate(product.id)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <p className='text-sm pl-2'> Add To Cart</p>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button onClick={() => viewMoreTap()} className="w-full max-w-md">
              View More
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}



