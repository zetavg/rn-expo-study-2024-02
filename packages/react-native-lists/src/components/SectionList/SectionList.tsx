import React, { useCallback } from 'react';
import {
  DefaultSectionT,
  SectionList as RNSectionList,
  SectionListData,
  SectionListProps as RNSectionListProps,
  SectionListRenderItemInfo as RNSectionListRenderItemInfo,
} from 'react-native';

import { calculateListPosition } from '../../utils';

export type SectionListRenderItemInfo<ItemT, SectionT> =
  RNSectionListRenderItemInfo<ItemT, SectionT> & {
    listPosition: 'first' | 'middle' | 'last' | 'only';
  };

export type Props<ItemT, SectionT = DefaultSectionT> = Omit<
  RNSectionListProps<ItemT, SectionT>,
  'renderItem' | 'renderSectionHeader'
> & {
  /** Default renderer for every item in every section. */
  renderItem: (
    info: SectionListRenderItemInfo<ItemT, SectionT>,
  ) => React.ReactElement | null;
  /** Rendered at the top of each section. */
  renderSectionHeader?:
    | ((info: {
        section: SectionListData<ItemT, SectionT>;
        first: boolean;
      }) => React.ReactElement | null)
    | undefined;
};

export function SectionList<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ItemT = any,
  SectionT = DefaultSectionT,
>({
  sections: sectionsProp,
  renderItem: renderItemProp,
  renderSectionHeader: renderSectionHeaderProp,
  ...props
}: Props<ItemT, SectionT>) {
  const renderItem = useCallback(
    (info: RNSectionListRenderItemInfo<ItemT, SectionT>) => {
      const { section, index } = info;
      const listPosition = calculateListPosition(index, section.data.length);
      return renderItemProp?.({ ...info, listPosition }) || null;
    },
    [renderItemProp],
  );

  const sections = Array.isArray(sectionsProp)
    ? sectionsProp.map((section, i) => ({ ...section, __sl_index: i }))
    : sectionsProp;
  const renderSectionHeader = useCallback(
    (info: { section: SectionListData<ItemT, SectionT> }) => {
      const { section } = info;
      return (
        renderSectionHeaderProp?.({
          ...info,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          first: (section as any).__sl_index === 0,
        }) || null
      );
    },
    [renderSectionHeaderProp],
  );

  return (
    <RNSectionList
      {...props}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
}

export default SectionList;
