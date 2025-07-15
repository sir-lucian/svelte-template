export const GET = async ({ params }) => {
    const count = params.count ? parseInt(params.count, 10) : 1;

    const url = 'https://meowfacts.herokuapp.com/?count=' + count;

    // we can now simply pass on the original 3rd-party api response promise
    return fetch(url);
};

export const fallback = async ({ request }) => {
    return new Response(`I caught your ${request.method} request!`, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
    });
};