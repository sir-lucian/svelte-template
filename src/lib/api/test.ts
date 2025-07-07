export async function getCatFact(count = 1): Promise<string[]> {
    const url = `/api/cat-facts/${count}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
    } else if (typeof data.data === 'string') {
        return [data.data];
    }
    return [];
}