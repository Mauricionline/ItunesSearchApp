import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { iTunesItem } from '../../types/itunes';

interface ResultCardProps {
    item: iTunesItem;
}

const ResultCard: React.FC<ResultCardProps> = ({ item }) => {
    const formatPrice = (price: number | undefined, currency: string = 'USD') => {
        if (price === undefined || price === null) return null;
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: currency === 'USD' ? 'USD' : currency,
            minimumFractionDigits: 2
        }).format(price);
    };

    const getDefaultImage = () => {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNSAzNUg2NVY2NUgzNVYzNVoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTQ1IDQ1QzQ1IDQ3Ljc2MTQgNDIuNzYxNCA1MCA0MCA1MEM0Ny4yMzg2IDUwIDQ1IDQ3Ljc2MTQgNDUgNDVaIiBmaWxsPSIjOUM5Q0E2Ii8+CjxwYXRoIGQ9Ik0zNSA1NUw0NS4wNzE0IDQ1LjA3MTRMNTE0Mjg2IDUxLjQyODZMNjUgNjVIMzVWNTVaIiBmaWxsPSIjOUM5Q0E2Ii8+Cjwvc3ZnPgo=';
    };

    const price = formatPrice(item.collectionPrice || item.trackPrice, item.currency);
    const imageUrl = item.artworkUrl100 || item.artworkUrl60 || getDefaultImage();
    const title = item.collectionName || item.trackName || 'Sin título';
    const artist = item.artistName || 'Artista desconocido';

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="aspect-square overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getDefaultImage();
                    }}
                />
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {title}
                </h3>

                <p className="text-gray-600 mb-2 line-clamp-1">
                    {artist}
                </p>

                {item.primaryGenreName && (
                    <p className="text-sm text-gray-500 mb-2">
                        {item.primaryGenreName}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    {price && (
                        <span className="text-lg font-bold text-blue-600">
                            {price}
                        </span>
                    )}

                    {(item.collectionViewUrl || item.trackViewUrl) && (
                        <a
                            href={item.collectionViewUrl || item.trackViewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                            <ExternalLink size={16} />
                            Show in iTunes
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultCard;