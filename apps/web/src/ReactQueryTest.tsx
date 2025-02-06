import { fetcher } from '@repo/api';
import { useQuery } from '@tanstack/react-query';

export default function ReactQueryTest() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['testAPI'],
    queryFn: () => fetcher.get('/posts'),
  });

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <p>{error.message}</p>;

  console.log(data);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
