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

export async function postTest(): Promise<string> {
    const response = await fetch('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'rice',
                halal: 'halal'
            })
            
        }
    );

    if (response.ok) {
        const data = await response.json();
        return data.data || 'Post successful';
    }

    return 'No message returned';
}