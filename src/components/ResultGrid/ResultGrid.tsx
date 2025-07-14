// components/ResultGrid.tsx
import React from 'react';
import { Music } from 'lucide-react';
import type { iTunesItem } from '../../types/itunes';
import ResultCard from '../ResultCard/ResultCard';

interface ResultGridProps {
	results: iTunesItem[];
	loading: boolean;
	error: string | null;
	hasSearched: boolean;
	searchTerm: string;
	sortOrder: 'asc' | 'desc';
	onSortChange: (order: 'asc' | 'desc') => void;
	onLoadMore: () => void;
	canLoadMore: boolean;
}

const ResultGrid: React.FC<ResultGridProps> = ({
	results,
	loading,
	error,
	hasSearched,
	searchTerm,
	sortOrder,
	onSortChange,
	onLoadMore,
	canLoadMore
}) => {
	const sortResults = (results: iTunesItem[]) => {
		return [...results].sort((a, b) => {
			const nameA = (a.collectionName || a.trackName || '').toLowerCase();
			const nameB = (b.collectionName || b.trackName || '').toLowerCase();

			if (sortOrder === 'asc') {
				return nameA.localeCompare(nameB);
			} else {
				return nameB.localeCompare(nameA);
			}
		});
	};

	const sortedResults = sortResults(results);

	if (!hasSearched && !loading) {
		return null;
	}

	return (
		<div className="bg-white rounded-2xl shadow-lg p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-bold text-gray-900">
					Search results for "{searchTerm}"
					{results.length > 0 && (
						<span className="text-sm font-normal text-gray-500 ml-2">
							({results.length} results)
						</span>
					)}
				</h2>

				{results.length > 0 && (
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-600">Order:</span>
						<button
							onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
							className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
						>
							{sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
						</button>
					</div>
				)}
			</div>

			{error && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
					<p className="text-red-800">{error}</p>
				</div>
			)}

			{results.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
					{results.map((item) => (
						<ResultCard key={item.trackId} item={item} />
					))}
				</div>
			)}

			{!loading && hasSearched && sortedResults.length === 0 && !error && (
				<div className="text-center py-12">
					<Music className="h-16 w-16 text-gray-300 mx-auto mb-4" />
					<p className="text-gray-500 text-lg">
						No found results for "{searchTerm}"
					</p>
					<p className="text-gray-400 text-sm mt-2">
						try modifying your search term.
					</p>
				</div>
			)}

			{canLoadMore && (
				<div className="flex justify-center mt-8">
					<button
						type="button"
						onClick={onLoadMore}
						disabled={loading}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
					>
						{loading ? (
							<>
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
								Loading...
							</>
						) : (
							'Show more results'
						)}
					</button>
				</div>
			)}
		</div>
	);
};

export default ResultGrid;