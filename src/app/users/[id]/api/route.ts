import {cookies} from "next/headers";
import {apiService} from "@/services/api.services";
import {withTokenRefresh} from "@/utils";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const numericId = Number(id);
    if (isNaN(numericId)) {
        return Response.json({ message: 'Невірний ID' }, { status: 400 });
    }

    async function fetchData() {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        if (!accessToken) {
            return Response.json({ message: 'Нема access токена' }, { status: 401 });
        }
        const user = await apiService.getUser(accessToken, numericId);
        return { user };
    }

    return await withTokenRefresh(fetchData);
}
