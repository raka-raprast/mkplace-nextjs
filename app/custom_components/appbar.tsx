"use client";
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuSearch } from "react-icons/lu";

export default function AppBar() {
    const searchParams = useSearchParams();
    const router = useRouter(); // Initialize the router for navigation
    const hideBar = searchParams.get('hideBar') === 'true';
    const [showAppBar, setShowAppBar] = useState(!hideBar);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        setShowAppBar(!hideBar);
    }, [hideBar]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Navigate to the search results page with the query parameter
            router.push(`/product/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return showAppBar ? (
        <nav>
            <ul className="flex space-x-4 justify-between px-6 md:px-12 lg:px-24 py-6 max-w-full">
                <li><a href="/" className="font-bold text-lg">MKPlace</a></li>
                <div className="flex space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500">
                        <input
                            type="text"
                            className="focus:outline-none"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                            onKeyDown={handleKeyDown} // Handle key down event
                        />
                        <LuSearch />
                    </div>
                    <Button
                    onClick={() => router.push(`/product/cart-list`)}
                        variant="outline"
                        className="w-full flex justify-center"
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                        className="w-full flex justify-center"
                        onClick={() => router.push(`/login`)}
                    >
                        <p className='text-sm'> Login</p>
                    </Button>
                    {/* <li><a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded">Login</a></li> */}
                </div>
            </ul>
        </nav>
    ) : null;
}
