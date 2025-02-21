// app/layout.tsx
import Menu from "@/components/Menu/Menu";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Users + Recipes",
    description: "Choose user or recipe",
};

export default function RootLayout({children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        <Menu/>
        <hr/>
        {children}
        </body>
        </html>
    );
}
