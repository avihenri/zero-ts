import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import TagSelectorGroup from './TagSelectorGroup';
import { TagGroup, TagSelectorType } from '../ts/types';
import Divider from "./Common/Divider";

jest.mock('./TagSelector', () => (props: TagSelectorType) => (
    <div data-testid="tag-selector">
        <span>{props.heading}</span>
        <button onClick={() => props.setSelectedTags(['tag1'])}>Select Tag</button>
    </div>
));
jest.mock('./Common/Divider', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<typeof Divider>) => (
    <div data-testid="divider" className={props.classNames}></div>
  ),
}));

const tagGroups: TagGroup[] = [
    {
        heading: 'Group 1',
        tags: [{ id: 'tag1', name: 'Tag 1' }]
    },
    {
        heading: 'Group 2',
        tags: [{ id: 'tag2', name: 'Tag 2' }]
    }
];

describe('TagSelectorGroup', () => {
    it('renders TagSelector for each tag group', () => {
        render(
            <TagSelectorGroup
                tagGroups={tagGroups}
                selectedTagIds={[]}
                setSelectedTags={jest.fn()}
            />
        );
        expect(screen.getAllByTestId('tag-selector')).toHaveLength(2);
        expect(screen.getByText('Group 1')).toBeInTheDocument();
        expect(screen.getByText('Group 2')).toBeInTheDocument();
    });

    it('renders Divider between tag groups except after the last one', () => {
        render(
            <TagSelectorGroup
                tagGroups={tagGroups}
                selectedTagIds={[]}
                setSelectedTags={jest.fn()}
            />
        );
        expect(screen.getAllByTestId('divider')).toHaveLength(1);
        expect(screen.getByTestId('divider')).toHaveClass('my-4');
    });

    it('does not render Divider if only one tag group', () => {
        render(
            <TagSelectorGroup
                tagGroups={[tagGroups[0]]}
                selectedTagIds={[]}
                setSelectedTags={jest.fn()}
            />
        );
        expect(screen.queryByTestId('divider')).toBeNull();
    });

    it('calls setSelectedTags when TagSelector triggers selection', () => {
        const setSelectedTags = jest.fn();
        render(
            <TagSelectorGroup
                tagGroups={tagGroups}
                selectedTagIds={[]}
                setSelectedTags={setSelectedTags}
            />
        );
        const selectButtons = screen.getAllByRole('button', { name: /select tag/i });
        fireEvent.click(selectButtons[0]);
        expect(setSelectedTags).toHaveBeenCalledWith(['tag1']);
    });
});