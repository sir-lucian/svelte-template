import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
export const POST: RequestHandler = async ({ request }) => {
    const url = 'https://httpbun.org/post';

    const response = await fetch(url, request);

    if (!response.ok) {
        return new Response('Failed to post data', { status: 500 });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: data.status ?? 200 });
}

export const fallback: RequestHandler = async ({ request }) => {
	return text(`I caught your ${request.method} request!`);
};