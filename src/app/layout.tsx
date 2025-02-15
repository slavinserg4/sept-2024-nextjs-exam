// app/layout.tsx
import { cookies } from 'next/headers';
import Menu from "@/components/Menu/Menu";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
    const userName = cookieStore.get('userName')?.value;
    const userImage = cookieStore.get('userImage')?.value;

    return (
        <html lang="en">
        <body>
        <Menu isAuthenticated={isAuthenticated} userName={userName} userImage={userImage} />
        <hr/>
        {children}
        </body>
        </html>
    );
}
