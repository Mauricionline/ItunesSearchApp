import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

const mediaTypes = [
    'all',
    'song',
    'musicVideo',
    'movie',
    'podcast',
    'audiobook',
    'tvShow',
    'software',
    'shortFilm',
    'ebook',
];

type SearchFormProps = {
    onSearch: (searchTerm: string, mediaType: string) => void;
    loading: boolean;
};

const SearchForm = ({ onSearch, loading }: SearchFormProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [mediaType, setMediaType] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
        e?.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm, mediaType);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
            <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0 w-full min-w-max">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Term
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Ex: Jack Johnson"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(e);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="w-full md:w-48">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Media Type
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2 capitalize">
                                <Filter className="h-4 w-4 text-gray-500" />
                                {mediaType}
                            </span>
                            <ChevronDown
                                className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {mediaTypes.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => {
                                            setMediaType(type);
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 capitalize"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-auto">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Loading...
                            </div>
                        ) : (
                            'Search'
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export { SearchForm };
