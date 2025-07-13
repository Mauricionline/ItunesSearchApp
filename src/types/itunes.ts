
export interface iTunesItem {
    trackId: number;
    artistName: string;
    collectionName?: string;
    trackName?: string;
    artworkUrl100?: string;
    artworkUrl60?: string;
    collectionPrice?: number;
    trackPrice?: number;
    currency?: string;
    primaryGenreName?: string;
    releaseDate?: string;
    kind?: string;
    previewUrl?: string;
    collectionViewUrl?: string;
    trackViewUrl?: string;
}

export interface SearchResponse {
    resultCount: number;
    results: iTunesItem[];
}

export interface SearchParams {
    term: string;
    mediaType: string;
    limit?: number;
    offset?: number;
}