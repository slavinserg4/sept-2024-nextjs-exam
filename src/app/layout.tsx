import Menu from "@/components/Menu/Menu";
import {Metadata} from "next";
import './globals.css'
export const metadata: Metadata = {
    title: "Users + Recipes",
    description: "Choose user or recipe",
};

export default function RootLayout({children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={'body'}>
                 <Menu/>
                 <hr/>
                 {children}
            </body>
        </html>
    );
}
