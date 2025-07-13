import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { iTunesItem } from '../../types/itunes';
import noImage from '../../assets/noImage.jpg';

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
        return noImage;
    };

    const price = formatPrice(item.collectionPrice || item.trackPrice, item.currency);
    const imageUrl = item.artworkUrl100 || item.artworkUrl60 || getDefaultImage();
    const title = item.collectionName || item.trackName || 'Without title';
    const artist = item.artistName || 'No artist';
    const kind = item.kind || 'Unknown';

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
                <p className="text-gray-600 mb-2 line-clamp-1">
                    {kind}
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