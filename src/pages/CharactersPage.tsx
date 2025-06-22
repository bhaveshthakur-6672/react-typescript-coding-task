import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { getCharacters } from '../api/rickAndMorty';
import { Link } from '@tanstack/react-router';
import Loader from '../components/Loader';
import { useState } from 'react';

export default function CharactersPage() {
  const queryClient = useQueryClient();
  const search = useSearch({ strict: false });
  const navigate = useNavigate({ from: '/characters' });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const page = parseInt(search.page ?? '1');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
    keepPreviousData: true,
  });

  const setPage = (newPage: number) => {
    navigate({ search: { page: String(newPage) } });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading || isRefreshing) return <Loader />;
  if (isError) return <p>Error fetching characters.</p>;

  return (
    <div className="space-y-4">
      <button
        onClick={handleRefresh}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Refresh Page
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.results.map((character: any) => (
          <Link
            key={character.id}
            to="/character/$id"
            params={{ id: character.id }}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            <img src={character.image} alt={character.name} className="rounded" />
            <h2 className="mt-2 font-semibold text-lg">{character.name}</h2>
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={!data.info.next}
          onClick={() => setPage(page + 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
