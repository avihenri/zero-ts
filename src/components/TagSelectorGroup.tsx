import React from 'react';
import TagSelector from './TagSelector';
import Divider from './Common/Divider';
import { TagGroup } from '../ts/types';

type Props = {
  tagGroups: TagGroup[];
  selectedTagIds: string[];
  setSelectedTags: (tagIds: string[]) => void;
};

const TagSelectorGroup: React.FC<Props> = ({ tagGroups, selectedTagIds, setSelectedTags }) => {
  return (
    <>
      {tagGroups.map(({ heading, tags }, index) => (
        <React.Fragment key={heading}>
          <TagSelector
            heading={heading}
            tags={tags}
            selectedTagIds={selectedTagIds}
            setSelectedTags={setSelectedTags}
          />
          {index !== tagGroups.length - 1 && <Divider classNames="my-4" />}
        </React.Fragment>
      ))}
    </>
  );
};

export default TagSelectorGroup;
