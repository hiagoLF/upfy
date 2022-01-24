import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type Pages = {
  data: Image[];
  after: string;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => (await api.get<Pages>('/api/images', { params: { after: pageParam } })).data
    ,
    { getNextPageParam: (lastPage, pages) => lastPage.after || null }
  );

  const formattedData = useMemo(() => {
    const formatted: Image[] = []
    data?.pages.forEach((page) => formatted.push(...page.data))
    return formatted
  }, [data]);

  if (isLoading) return <Loading />

  if (isError) return <Error />

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt={30}
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            loadingText='Carregando...'
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
