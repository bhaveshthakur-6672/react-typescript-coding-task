import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getCharacterById } from '../api/rickAndMorty';
import { Link } from '@tanstack/react-router';
import Loader from '../components/Loader';

export default function CharacterPage() {
  const { id } = useParams({ strict: false });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(Number(id)),
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error fetching character.</p>;

  return (
    <div className="space-y-4">
      <Link to="/characters" className="text-blue-500">← Back to list</Link>
      <div className="flex gap-4">
        <img src={data?.image} alt={data?.name} className="rounded w-48 h-48" />
        <div>
          <h2 className="text-2xl font-bold">{data?.name}</h2>
          <p>Status: {data?.status}</p>
          <p>Species: {data?.species}</p>
          <p>Gender: {data?.gender}</p>
          <p>Origin: {data?.origin?.name}</p>
        </div>
      </div>
    </div>
  );
}
