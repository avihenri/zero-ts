import { useState, useRef } from "react";

const MIN_WIDTH = 400;
const MAX_WIDTH = 600;

interface UseResizablePanelProps {
    isSmallScreen: boolean;
    initialWidth?: number;
    isRightPanel?: boolean;
}

export const useResizablePanel = ({
    isSmallScreen,
    initialWidth = 384,
    isRightPanel = false,
}: UseResizablePanelProps) => {
    const [panelWidth, setPanelWidth] = useState(initialWidth);
    const isResizing = useRef(false);

    const handleMouseDown = () => {
        if (isSmallScreen) return;
        isResizing.current = true;
        document.body.style.userSelect = "none";
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current || isSmallScreen) return;
        
        let newWidth;
        if (isRightPanel) {
            newWidth = Math.min(Math.max(window.innerWidth - e.clientX, MIN_WIDTH), MAX_WIDTH);
        } else {
            newWidth = Math.min(Math.max(e.clientX, MIN_WIDTH), MAX_WIDTH);
        }

        setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return { panelWidth, handleMouseDown };
};
