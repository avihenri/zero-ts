import clsx from "clsx";
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { PANEL_CONTENT, PANEL_TITLES } from "../state/consts/panels";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import MainMenu from "./Navigation/MainMenu";
import FilterPanel from "./FilterPanel";
import { IoMdCloseCircleOutline } from "react-icons/io";
import VenueListPanel from "./VenueListPanel";
import VenueDetailsPanel from "./VenueDetailsPanel";
import AddVenueFormPanel from "./AddVenueFormPanel";
import Divider from "./Common/Divider";
import { selectedVenueDetailsStateAtom } from "../state/atoms/selectedVenueDetailsStateAtom";

const LeftPanel = () => {
    const [{ currentPanel, previousPanel }, setLeftPanel] = useRecoilState(leftPanelStateAtom);
    const setSelectedVenueDetails = useSetRecoilState(selectedVenueDetailsStateAtom);
    const isVisible = currentPanel !== PANEL_CONTENT.CLOSED;
    const panelRef = useRef<HTMLDivElement | null>(null);
    const panelTitle = PANEL_TITLES[currentPanel] || '';
    
    const closePanel = () => {
        setSelectedVenueDetails(null);
        if (previousPanel === PANEL_CONTENT.VENUE_LIST) {
            setLeftPanel({ currentPanel: PANEL_CONTENT.VENUE_LIST, previousPanel: null });
            return;
        }

        setLeftPanel({ currentPanel: PANEL_CONTENT.CLOSED, previousPanel: null });
    };

    return (
        <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isVisible}
            className={clsx(
                'fixed left-0 top-0 h-full w-full sm:w-1/3 sm:min-w-96 bg-grey-950 text-grey-500 shadow-lg py-4 pl-4 transition-transform duration-300 ease-in-out z-50',
                isVisible ? 'translate-x-0' : '-translate-x-full'
            )}
            data-testid="left-panel"
        >
            <div className="pr-4">
                <div className="flex justify-between mb-4 mt-2">
                    <div className="flex">
                        <div className="text-lg font-bold cursor-pointer text-primary-200 mr-1">{ panelTitle }</div>
                    </div>
                </div>

                <button
                    onClick={closePanel}
                    className="absolute top-6 right-4 p-1 rounded-full text-grey-400 hover:bg-grey-700 transition"
                    aria-label="Close left panel"
                    data-testid="close-left-panel"
                >
                    <IoMdCloseCircleOutline className="text-2xl" />
                </button>

                <Divider />
            </div>

            {currentPanel === PANEL_CONTENT.MAIN_MENU && <MainMenu />}
            {currentPanel === PANEL_CONTENT.FILTER_SORT && <FilterPanel />}
            {currentPanel === PANEL_CONTENT.VENUE_LIST && <VenueListPanel />}
            {currentPanel === PANEL_CONTENT.VIEW_VENUE && <VenueDetailsPanel />}
            {currentPanel === PANEL_CONTENT.ADD_VENUE && <AddVenueFormPanel />}
        </div>
    );
};

export default LeftPanel;