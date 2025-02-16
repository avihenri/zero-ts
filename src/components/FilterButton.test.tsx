import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import FilterButton from "./FilterButton";
import { selectedTagCountStateAtom } from "../state/atoms/selectedTagCountStateAtom";
import { leftPanelStateAtom } from "../state/atoms/leftPanelStateAtom";
import { PANEL_CONTENT } from "../state/consts/mainPanel";


describe("FilterButton Component", () => {
    test("renders filter button correctly", () => {
        render(
            <RecoilRoot>
                <FilterButton />
            </RecoilRoot>
        );

        const filterButton = screen.getByTestId("filter-button");
        expect(filterButton).toBeInTheDocument();
        expect(screen.getByTestId("filter-icon")).toBeInTheDocument();
    });

    test("displays selected tag count when greater than zero", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(selectedTagCountStateAtom, 3)}>
                <FilterButton />
            </RecoilRoot>
        );

        expect(screen.getByTestId("selected-tag-count")).toHaveTextContent("3");
    });

    test("toggles panel state when clicked", () => {
        render(
            <RecoilRoot initializeState={({ set }) => set(leftPanelStateAtom, PANEL_CONTENT.CLOSED)}>
                <FilterButton />
            </RecoilRoot>
        );
        
        const filterButton = screen.getByTestId("filter-button");
        fireEvent.click(filterButton);
        
        expect(screen.getByTestId("filter-button")).toBeInTheDocument();
    });
});
