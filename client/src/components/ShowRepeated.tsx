import React, { useState } from 'react';
import { t } from '@lingui/macro';
import { useUpdateSearchParams } from 'src/hooks/updateSearchParamsHook';
import { CheckboxWithTitleAndDescription } from './Checkbox';

export const useShowRepeated = (isStatisticsPage: boolean) => {
  const { currentValue, updateSearchParams } = useUpdateSearchParams<boolean>({
    filterParam: 'showRepeated',
    initialValue: false,
    resetPage: true,
  });
  const [showRepeated, setShowRepeated] = useState(currentValue);

  const handleToggle = (value: boolean) => {
    console.log(value);
    updateSearchParams(value);
    setShowRepeated(value);
  };

  return {
    showRepeated: showRepeated,
    ShowRepeatedComponenet: () => {
      if (isStatisticsPage) {
        return null;
      } else {
        return (
          <CheckboxWithTitleAndDescription
            title={t`Show repeating Items`}
            checked={showRepeated}
            onChange={handleToggle}
          />
        );
      }
    },
  };
};
