import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUpdateSearchParams = <T>(args: {
  filterParam: string;
  initialValue: T;
  resetPage: boolean;
}) => {
  const { initialValue, filterParam, resetPage } = args;

  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = searchParams.get(filterParam)
    ? (searchParams.get(filterParam) as T)
    : initialValue;

  const deleteFunction = useCallback(
    ([name], value) => {
      if (!resetPage && value === initialValue) {
        return name !== filterParam;
      } else if (resetPage && value !== initialValue) {
        return name !== 'page';
      } else {
        return name !== filterParam && name !== 'page';
      }
    },
    [filterParam, initialValue, resetPage]
  );

  const deleteEntry = useCallback(
    (value: T) => {
      if (!resetPage && value !== initialValue) {
        return;
      }
      setSearchParams(
        Object.fromEntries(
          Array.from(searchParams.entries()).filter(([name]) =>
            deleteFunction(name, value)
          )
        )
      );
    },
    [deleteFunction, initialValue, resetPage, searchParams, setSearchParams]
  );

  const updateSearchParams = useCallback(
    (value: T) => {
      deleteEntry(value);

      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        [filterParam]: value.toString(),
      });
    },
    [deleteEntry, filterParam, searchParams, setSearchParams]
  );

  return { currentValue, updateSearchParams };
};
