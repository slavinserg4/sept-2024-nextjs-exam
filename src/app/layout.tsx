// app/layout.tsx
import Menu from "@/components/Menu/Menu";

export default async function RootLayout({ children }: { children: React.ReactNode }) {


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
