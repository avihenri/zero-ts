import clsx from "clsx";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PANEL_CONTENT } from "../state/consts/panels";
import { rightPanelStateAtom } from "../state/atoms/rightPanelStateAtom";
import UserMenu from "./Navigation/UserMenu";

const RightPanel = () => {
    const [rightPanel, setRightPanel] = useRecoilState(rightPanelStateAtom);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const isVisible = rightPanel !== PANEL_CONTENT.CLOSED;

    return (
        <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isVisible}
            className={clsx(
                'fixed right-0 top-0 h-full w-full sm:w-1/3 sm:min-w-96 bg-grey-950 text-grey-500 shadow-lg p-4 transition-transform duration-300 ease-in-out z-50',
                isVisible ? 'translate-x-0' : 'translate-x-full'
            )}
            data-testid="right-panel"
        >
            <button
                onClick={() => setRightPanel(PANEL_CONTENT.CLOSED)}
                className="absolute top-6 left-4 p-1 rounded-full text-grey-400 hover:bg-grey-700 transition"
                aria-label="Close right panel"
                data-testid="close-right-panel"
            >
                <IoMdCloseCircleOutline className="text-2xl" />
            </button>

            {rightPanel === PANEL_CONTENT.USER_MENU && <UserMenu />}
        </div>
    );
};

export default RightPanel;