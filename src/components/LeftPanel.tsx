import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { PANEL_CONTENT, PANEL_TITLES } from "../state/consts/panels";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import MainMenu from "./Navigation/MainMenu";
import FilterPanel from "./FilterPanel";
import { IoMdCloseCircleOutline } from "react-icons/io";
import VenueListPanel from "./Venue/VenueListPanel";
import VenueDetailsPanel from "./Venue/VenueDetailsPanel";
import Divider from "./Common/Divider";
import { selectedVenueDetailsStateAtom } from "../state/atoms/selectedVenueDetailsStateAtom";
import CreateOrUpdateVenuePanel from "./Venue/CreateOrUpdateVenuePanel";
import { GripVertical } from "lucide-react";
import useScreenSize from "../hooks/useScreenSize";
import { venueCoordinatesStateAtom } from "../state/atoms/venueCoordinatesStateAtom";

const MIN_WIDTH = 400;
const MAX_WIDTH = 600;

const LeftPanel = () => {
    const [{ currentPanel, previousPanel }, setLeftPanel] = useRecoilState(leftPanelStateAtom);
    const setSelectedVenueDetails = useSetRecoilState(selectedVenueDetailsStateAtom);
    const resetVenueCoordinates = useResetRecoilState(venueCoordinatesStateAtom);
    const isVisible = currentPanel !== PANEL_CONTENT.CLOSED;
    const panelRef = useRef<HTMLDivElement | null>(null);
    const panelTitle = PANEL_TITLES[currentPanel] || '';

    const [panelWidth, setPanelWidth] = useState(384); // tailwind's sm:w-96 (384px)
    const isResizing = useRef(false);
    const isSmallScreen = useScreenSize();

    const closePanel = () => {
        setSelectedVenueDetails(null);
        resetVenueCoordinates();
        if (previousPanel === PANEL_CONTENT.VENUE_LIST) {
            setLeftPanel({ currentPanel: PANEL_CONTENT.VENUE_LIST, previousPanel: null });
            return;
        }
        setLeftPanel({ currentPanel: PANEL_CONTENT.CLOSED, previousPanel: null });
    };

    const handleMouseDown = () => {
        if (isSmallScreen) return;
        isResizing.current = true;
        document.body.style.userSelect = "none";
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current || isSmallScreen) return;
        const newWidth = Math.min(Math.max(e.clientX, MIN_WIDTH), MAX_WIDTH);
        setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
        if (!isVisible && panelRef.current?.contains(document.activeElement)) {
          document.getElementById('open-panel-btn')?.focus();
        }
      }, [isVisible]);

    return (
        <aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isVisible}
            className={clsx(
                'absolute top-0 left-0 bottom-0 bg-grey-950 text-grey-500 pt-4 pl-4 transition-transform duration-300 ease-in-out z-40',
                isVisible ? 'translate-x-0' : '-translate-x-full'
            )}
            style={{ width: isSmallScreen ? "100%" : `${panelWidth}px` }}
            data-testid="left-panel"
        >
            <div className="pr-4">
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="text-lg font-bold cursor-pointer text-primary-200 mr-1">{panelTitle}</div>
                    </div>
                </div>

                <button
                    onClick={closePanel}
                    className="absolute top-4 right-4 p-1 rounded-full text-grey-400 hover:bg-grey-700 transition"
                    aria-label="Close left panel"
                    data-testid="close-left-panel"
                >
                    <IoMdCloseCircleOutline className="text-2xl" />
                </button>

                <Divider classNames="mt-4 mb-2" />
            </div>

            {currentPanel === PANEL_CONTENT.MAIN_MENU && <MainMenu />}
            {currentPanel === PANEL_CONTENT.FILTER_SORT && <FilterPanel />}
            {currentPanel === PANEL_CONTENT.VENUE_LIST && <VenueListPanel />}
            {currentPanel === PANEL_CONTENT.VIEW_VENUE && <VenueDetailsPanel />}
            {currentPanel === PANEL_CONTENT.ADD_VENUE && <CreateOrUpdateVenuePanel />}

            {!isSmallScreen && (
                 <div
                    className="absolute top-0 right-0 bottom-0 w-2 cursor-ew-resize bg-grey-900 hover:bg-grey-800 sm:block"
                    onMouseDown={handleMouseDown}
                >
                    <div className="absolute top-1/2 right-0 -translate-y-1/2" >
                        <GripVertical className="text-primary-50 w-2 h-2" />
                        <GripVertical className="text-primary-50 w-2 h-2" />
                        <GripVertical className="text-primary-50 w-2 h-2" />
                        <GripVertical className="text-primary-50 w-2 h-2" />
                    </div>
                </div>
            )}
        </aside>
    );
};

export default LeftPanel;
