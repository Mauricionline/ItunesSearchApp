import type { SearchParams, SearchResponse } from "../types/itunes";

const BASE_URL = import.meta.env.VITE_REACT_APP_ITUNES_API_URL;
export class ITunesApiService {
    static async search(params: SearchParams): Promise<SearchResponse> {
        const { term, mediaType, limit = 25, offset = 0 } = params;

        if (!term.trim()) {
            throw new Error('term is required for search');
        }

        let url = `${BASE_URL}?term=${encodeURIComponent(term)}&limit=${limit}&offset=${offset}`;

        if (mediaType !== 'all') {
            url += `&entity=${mediaType}`;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data: SearchResponse = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching data from iTunes API: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    }
}