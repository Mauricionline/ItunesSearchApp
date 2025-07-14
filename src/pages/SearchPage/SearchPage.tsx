import { useState } from 'react';
import { Music } from 'lucide-react';
import type { iTunesItem } from '../../types/itunes';
import { ITunesApiService } from '../../services/itunesApi';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import ResultGrid from '../../components/ResultGrid/ResultGrid';

const SearchPage = () => {
    const [results, setResults] = useState<iTunesItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentSearch, setCurrentSearch] = useState({ term: '', mediaType: '' });
    const [limit] = useState(10);

    const handleSearch = async (searchTerm: string, mediaType: string, page: number = 1) => {
        setLoading(true);
        setError(null);

        if (page === 1) {
            setResults([]);
            setCurrentSearch({ term: searchTerm, mediaType });
        }

        try {
            const offset = (page - 1) * limit;
            const data = await ITunesApiService.search({
                term: searchTerm,
                mediaType,
                limit,
                offset
            });

            if (page === 1) {
                setResults(data.results);
            } else {
                setResults(prev => [...prev, ...data.results]);
            }

            setHasSearched(true);
            setCurrentPage(page);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (currentSearch.term) {
            const nextPage = currentPage + 1;
            handleSearch(currentSearch.term, currentSearch.mediaType, nextPage);
        }
    };


    const handleSortChange = (order: 'asc' | 'desc') => {
        setSortOrder(order);

        setResults(prevResults => {
            const sorted = [...prevResults].sort((a, b) => {
                const nameA = (a.collectionName || a.trackName || '').toLowerCase();
                const nameB = (b.collectionName || b.trackName || '').toLowerCase();

                if (order === 'asc') {
                    return nameA.localeCompare(nameB);
                } else {
                    return nameB.localeCompare(nameA);
                }
            });

            return sorted;
        });
    };


    const canLoadMore = results.length >= limit && results.length % limit === 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <Music className="h-8 w-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-900">iTunes Search</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchForm onSearch={handleSearch} loading={loading} />

                <ResultGrid
                    results={results}
                    loading={loading}
                    error={error}
                    hasSearched={hasSearched}
                    searchTerm={currentSearch.term}
                    sortOrder={sortOrder}
                    onSortChange={handleSortChange}
                    onLoadMore={handleLoadMore}
                    canLoadMore={canLoadMore}
                />
            </div>
        </div>
    );
};

export { SearchPage };