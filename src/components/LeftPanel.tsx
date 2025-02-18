import clsx from "clsx";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { PANEL_CONTENT } from "../state/consts/mainPanel";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import MainMenu from "./Navigation/MainMenu";
import FilterPanel from "./FilterPanel";
import { IoMdCloseCircleOutline } from "react-icons/io";

const LeftPanel = () => {
    const [leftPanel, setRightPanel] = useRecoilState(leftPanelStateAtom);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const isVisible = leftPanel !== PANEL_CONTENT.CLOSED;

    return (
        <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isVisible}
            className={clsx(
                'fixed left-0 top-0 h-full w-full sm:w-1/3 sm:min-w-96 bg-grey-950 text-grey-500 shadow-lg p-4 transition-transform duration-300 ease-in-out z-50',
                isVisible ? 'translate-x-0' : '-translate-x-full'
            )}
            data-testid="left-panel"
        >
            <button
                onClick={() => setRightPanel(PANEL_CONTENT.CLOSED)}
                className="absolute top-6 right-4 p-1 rounded-full text-grey-400 hover:bg-grey-700 transition"
                aria-label="Close left panel"
                data-testid="close-left-panel"
            >
                <IoMdCloseCircleOutline className="text-2xl" />
            </button>

            {leftPanel === PANEL_CONTENT.MAIN_MENU && <MainMenu />}
            {leftPanel === PANEL_CONTENT.FILTER_SORT && <FilterPanel />}
        </div>
    );
};

export default LeftPanel;