// src/app/layout.tsx
'use client'

import './globals.css';
import Menu from "@/components/Menu/Menu";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
            <Menu />
            <hr />
            {children}
        </body>
        </html>
    );
}
