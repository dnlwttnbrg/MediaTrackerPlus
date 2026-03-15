import { useQuery, useMutation } from 'react-query';

import { Items, MediaItemItemsResponse } from 'mediatracker-api';
import { mediaTrackerApi } from 'src/api/api';

type paginatedApiReturnType = {
  data: MediaItemItemsResponse[];
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
};

export const useItems = (args: Items.Paginated.RequestQuery) => {
  const { error, data, isFetched } = useQuery(
    [`items${args.showRepeated ? 'showRepeated' : ''}`, args],
    async () => mediaTrackerApi.items.paginated(args),
    {
      keepPreviousData: true,
    }
  );

  const search = useMutation((query: string) =>
    mediaTrackerApi.search.search({ mediaType: args.mediaType, q: query })
  );

  return {
    items: search.data ? search.data : (data as paginatedApiReturnType)?.data,
    error: error,
    isLoading: !isFetched || search.isLoading,
    numberOfPages: data
      ? (data as paginatedApiReturnType).totalPages
      : undefined,
    numberOfItemsTotal: data
      ? (data as paginatedApiReturnType).total
      : undefined,
    search: search.mutate,
  };
};

export const useRandomItem = (args: Items.Random.RequestQuery) => {
  const { error, data, isFetched } = useQuery(
    ['randomItems', args],
    async () => mediaTrackerApi.items.random(args),
    {
      keepPreviousData: true,
    }
  );

  const search = useMutation((query: string) =>
    mediaTrackerApi.search.search({ mediaType: args.mediaType, q: query })
  );

  return {
    items: search.data ? search.data : (data as MediaItemItemsResponse[]),
    error: error,
    isLoading: !isFetched || search.isLoading,
    numberOfItemsTotal: data
      ? (data as MediaItemItemsResponse[]).length
      : undefined,
    search: search.mutate,
  };
};
