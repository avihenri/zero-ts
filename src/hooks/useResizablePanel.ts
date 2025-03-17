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

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (isSmallScreen) return;
        isResizing.current = true;
        document.body.style.userSelect = "none";
    
        if ("touches" in event) {
            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("touchend", handleTouchEnd);
        } else {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizing.current || isSmallScreen) return;
        updatePanelWidth(event.clientX);
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleTouchMove = (event: TouchEvent) => {
        if (!isResizing.current || isSmallScreen) return;
        const touch = event.touches[0];
        updatePanelWidth(touch.clientX);
    };

    const handleTouchEnd = () => {
        isResizing.current = false;
        document.body.style.userSelect = "auto";
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
    };

    const updatePanelWidth = (clientX: number) => {
        let newWidth;
        if (isRightPanel) {
            newWidth = Math.min(Math.max(window.innerWidth - clientX, MIN_WIDTH), MAX_WIDTH);
        } else {
            newWidth = Math.min(Math.max(clientX, MIN_WIDTH), MAX_WIDTH);
        }
        setPanelWidth(newWidth);
    };

    return { panelWidth, handleMouseDown };
};
