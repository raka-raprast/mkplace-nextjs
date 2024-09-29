"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Footer() {
    const searchParams = useSearchParams();
    const hideBar = searchParams.get('hideBar') === 'true';
    const [showFooter, setShowFooter] = useState(!hideBar);

    useEffect(() => {
        setShowFooter(!hideBar);
    }, [hideBar]);

    if (showFooter) {
        return (<footer className="w-full py-6 bg-gray-100 container-fluid footer">
            <div className="mt-8 border-t pt-8 text-center text-sm">
                © 2024 MKPlace. All rights reserved.
            </div></footer>
        )
    }
    return null;
}