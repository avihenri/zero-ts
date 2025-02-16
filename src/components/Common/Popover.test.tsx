import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Popover } from "./Popover";


describe("Popover Component", () => {
    test("renders popover content when trigger is clicked", async () => {
        render(
            <Popover trigger={<button data-testid="popover-trigger">Open Popover</button>} content={<p>Popover content</p>} />
        );
        
        const triggerButton = screen.getByTestId("popover-trigger");
        fireEvent.click(triggerButton);
        
        expect(await screen.findByTestId("popover-content")).toBeInTheDocument();
        expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    test("closes popover when close button is clicked", async () => {
        render(
            <Popover
                trigger={<button data-testid="popover-trigger">Open Popover</button>}
                content={<p>Popover content</p>}
            />
        );
    
        const triggerButton = screen.getByTestId("popover-trigger");
        fireEvent.click(triggerButton);
    
        const closeButton = await screen.findByTestId("popover-close");
        fireEvent.click(closeButton);
    
        expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
    });
    
});
