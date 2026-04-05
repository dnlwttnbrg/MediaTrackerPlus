import React, { useState } from 'react';
import { t } from '@lingui/macro';
import { useUpdateSearchParams } from 'src/hooks/updateSearchParamsHook';
import { CheckboxWithTitleAndDescription } from './Checkbox';
import { MediaItemOrderBy } from 'mediatracker-api';

export const useShowRepeated = (
  isStatisticsPage: boolean,
  filter: unknown,
  orderBy: MediaItemOrderBy,
  disable: boolean
) => {
  const { currentValue, updateSearchParams } = useUpdateSearchParams<boolean>({
    filterParam: 'showRepeated',
    initialValue: false,
    resetPage: true,
  });
  const [showRepeated, setShowRepeated] = useState(currentValue);

  const handleToggle = (value: boolean) => {
    if (value === showRepeated) return;
    updateSearchParams(value);
    setShowRepeated(value);
  };

  console.log(disable);

  const hideComponenet = () => {
    if (
      orderBy !== 'lastSeen' ||
      isStatisticsPage ||
      filter['onlyOnWatchlist'] === true ||
      disable
    ) {
      handleToggle(false);
      return true;
    }
    return false;
  };

  return {
    showRepeated: disable ? disable : showRepeated,
    ShowRepeatedComponenet: () => {
      if (hideComponenet()) {
        return null;
      } else {
        return (
          <CheckboxWithTitleAndDescription
            title={t`Show Repeats`}
            checked={showRepeated}
            onChange={handleToggle}
          />
        );
      }
    },
  };
};
