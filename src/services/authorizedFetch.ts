import { cookieService } from './cookieService';
import { authService } from './authService';

export async function authorizedFetch<T>(
    url: string,
    options: RequestInit = {},
    retry: boolean = true
): Promise<T> {
    // Отримуємо поточний accessToken з куків
    const token = await cookieService.get('accessToken');
    if (!token) {
        throw new Error('Немає access token');
    }

    // Додаємо заголовки (Authorization, Content-Type)
    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');

    // Виконуємо запит
    const response = await fetch(url, {
        ...options,
        headers,
        // Якщо API вимагає відправляти куки, додаємо:
        credentials: 'include',
    });

    // Якщо токен прострочився (401) і ми можемо повторити запит – оновлюємо токен
    if (response.status === 401 && retry) {
        try {
            await authService.refreshToken();
            // Після успішного оновлення повторюємо запит, але більше не робимо retry (щоб не було циклу)
            return authorizedFetch<T>(url, options, false);
        } catch {
            throw new Error('Оновлення токену не вдалося, сесія завершена');
        }
    }

    // Якщо інша помилка, виводимо деталі
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Помилка при запиті ${url}: ${response.status} - ${errorText}`);
        throw new Error(`Запит завершився помилкою: ${response.statusText}`);
    }

    // Повертаємо результат у форматі JSON
    return response.json();
}
