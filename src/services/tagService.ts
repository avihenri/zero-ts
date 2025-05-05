import { TagIndexResponse } from "../ts/types";

export async function fetchTags(params?: Record<string, string | number | Array<string | number>>): Promise<TagIndexResponse> {

    const url = new URL(`http://localhost/api/tags?include=tagType`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                url.searchParams.append(key, value.join(','));
            } else {
                url.searchParams.append(key, value.toString());
            }
        });
    }
    const response = await fetch(url.toString(), {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    const data: TagIndexResponse = await response.json();
    return data;
}
