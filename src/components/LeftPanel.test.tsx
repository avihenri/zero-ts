import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import LeftPanel from "./LeftPanel";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/panels";

jest.mock("lucide-react", () => ({
    Check: () => <svg data-testid="check-icon" />,
    X: () => <svg data-testid="x-icon" />,
}));

// TODO: fix test!! SVG breaking with jest
describe("LeftPanel Component", () => {
    test("renders left panel when visible", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(leftPanelStateAtom, { currentPanel: PANEL_CONTENT.MAIN_MENU, previousPanel: null })}>
                <LeftPanel />
            </RecoilRoot>
        );

        const leftPanel = screen.getByTestId("left-panel");
        expect(leftPanel).toBeInTheDocument();
        expect(leftPanel).not.toHaveAttribute("aria-hidden", "true");
    });

    test("does not render when panel is closed", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(leftPanelStateAtom, { currentPanel: PANEL_CONTENT.CLOSED, previousPanel: null })}>
                <LeftPanel />
            </RecoilRoot>
        );

        expect(screen.getByTestId("left-panel")).toHaveAttribute("aria-hidden", "true");
    });

    test("closes panel when close button is clicked", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(leftPanelStateAtom, { currentPanel: PANEL_CONTENT.MAIN_MENU, previousPanel: null })}>
                <LeftPanel />
            </RecoilRoot>
        );

        const closeButton = screen.getByTestId("close-left-panel");
        fireEvent.click(closeButton);

        expect(screen.getByTestId("left-panel")).toHaveAttribute("aria-hidden", "true");
    });
});
