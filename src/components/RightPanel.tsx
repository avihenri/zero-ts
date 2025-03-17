import clsx from "clsx";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PANEL_CONTENT, PANEL_TITLES } from "../state/consts/panels";
import { rightPanelStateAtom } from "../state/atoms/rightPanelStateAtom";
import UserMenu from "./Navigation/UserMenu";
import SavedVenueListPanel from "./Venue/SavedVenueListPanel";
import Divider from "./Common/Divider";

const RightPanel = () => {
    const [rightPanel, setRightPanel] = useRecoilState(rightPanelStateAtom);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const isVisible = rightPanel !== PANEL_CONTENT.CLOSED;
    const panelTitle = PANEL_TITLES[rightPanel] || '';

    return (
        <aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isVisible}
            className={clsx(
                'absolute right-0 top-0 bottom-0 w-full sm:w-1/3 sm:min-w-96 bg-grey-950 text-grey-500 p-4 transition-transform duration-300 ease-in-out z-40',
                isVisible ? 'translate-x-0' : 'translate-x-full'
            )}
            data-testid="right-panel"
        >
            {panelTitle && (
                <div className="flex justify-end">
                    <div className="flex">
                        <div className="text-lg font-bold cursor-pointer text-primary-200 mr-1">{panelTitle}</div>
                    </div>
                </div>
            )}
            <button
                onClick={() => setRightPanel(PANEL_CONTENT.CLOSED)}
                className="absolute top-4 left-4 p-1 rounded-full text-grey-400 hover:bg-grey-700 transition"
                aria-label="Close right panel"
                data-testid="close-right-panel"
            >
                <IoMdCloseCircleOutline className="text-2xl" />
            </button>

            {panelTitle && <Divider classNames="my-4" />}

            {rightPanel === PANEL_CONTENT.USER_MENU && <UserMenu />}
            {rightPanel === PANEL_CONTENT.SAVED_VENUE_LIST && <SavedVenueListPanel />}
        </aside>
    );
};

export default RightPanel;