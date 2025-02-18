import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import RightPanel from "./RightPanel";
import { rightPanelStateAtom } from "../state/atoms/rightPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/mainPanel";

describe("RightPanel Component", () => {
    test("renders right panel when visible", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(rightPanelStateAtom, PANEL_CONTENT.MAIN_MENU)}>
                <RightPanel />
            </RecoilRoot>
        );

        const rightPanel = screen.getByTestId("right-panel");
        expect(rightPanel).toBeInTheDocument();
        expect(rightPanel).not.toHaveAttribute("aria-hidden", "true");
    });

    test("does not render when panel is closed", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(rightPanelStateAtom, PANEL_CONTENT.CLOSED)}>
                <RightPanel />
            </RecoilRoot>
        );

        expect(screen.getByTestId("right-panel")).toHaveAttribute("aria-hidden", "true");
    });

    test("closes panel when close button is clicked", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(rightPanelStateAtom, PANEL_CONTENT.MAIN_MENU)}>
                <RightPanel />
            </RecoilRoot>
        );

        const closeButton = screen.getByTestId("close-right-panel");
        fireEvent.click(closeButton);

        expect(screen.getByTestId("right-panel")).toHaveAttribute("aria-hidden", "true");
    });
});
