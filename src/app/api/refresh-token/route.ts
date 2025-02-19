// app/api/refresh-token/route.ts
import { NextResponse } from 'next/server';
import {authService} from "@/services/authService";

export async function GET(request: Request) {
    console.log(request);
    try {
        const tokenData = await authService.refreshToken()
        const response = NextResponse.json({ message: 'Токени оновлено' });
        response.cookies.set('accessToken', tokenData.accessToken, {
            httpOnly: true,
            path: '/',
        });
        response.cookies.set('refreshToken', tokenData.refreshToken, {
            httpOnly: true,
            path: '/',
        });
        console.log(tokenData,' new tokens in route')
        return NextResponse.json({ message: 'Токени оновлено' });
    } catch {
        return NextResponse.json({ status: 401 });
    }
}
