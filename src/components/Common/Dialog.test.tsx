import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dialog } from "./Dialog";

const onCloseMock = jest.fn();

describe("Dialog Component", () => {
    test("renders dialog when open", () => {
        render(
            <Dialog isOpen={true} onClose={onCloseMock} title="Test Dialog" description="This is a test dialog">
                <p>Dialog content</p>
            </Dialog>
        );

        expect(screen.getByTestId("dialog")).toBeInTheDocument();
        expect(screen.getByTestId("dialog-title")).toHaveTextContent("Test Dialog");
        expect(screen.getByTestId("dialog-description")).toHaveTextContent("This is a test dialog");
        expect(screen.getByText("Dialog content")).toBeInTheDocument();
    });

    test("closes when close button is clicked", () => {
        render(
            <Dialog isOpen={true} onClose={onCloseMock} title="Test Dialog">
                <p>Dialog content</p>
            </Dialog>
        );

        const closeButton = screen.getByTestId("dialog-close");
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalledWith(false);
    });

    test("does not render when isOpen is false", () => {
        render(
            <Dialog isOpen={false} onClose={onCloseMock} title="Test Dialog">
                <p>Dialog content</p>
            </Dialog>
        );
        
        expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
    });
});
