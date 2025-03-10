import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import FilterPanel from "./FilterPanel";

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

const renderWithRecoil = (ui: React.ReactNode) => {
  return render(<RecoilRoot>{ui}</RecoilRoot>);
};

describe("FilterPanel Component", () => {
  test("renders FilterPanel", () => {
    renderWithRecoil(<FilterPanel />);

    waitFor(() => {
      expect(screen.getByTestId("filter-panel")).toBeInTheDocument();
    });
  });

  test("updates distance input value", () => {
    renderWithRecoil(<FilterPanel />);

    const distanceInput = screen.getByPlaceholderText("Enter distance in miles") as HTMLInputElement;
    fireEvent.change(distanceInput, { target: { value: "30" } });

    waitFor(() => {
      expect(screen.getByLabelText("Distance")).toBeInTheDocument();
    });
  });

  test("renders all filter sections", () => {
    renderWithRecoil(<FilterPanel />);

    expect(screen.getByText("Filter by venue type")).toBeInTheDocument();
    expect(screen.getByText("Filter by dietary type")).toBeInTheDocument();
    expect(screen.getByText("Filter by non-alcoholic drink type")).toBeInTheDocument();
    expect(screen.getByText("Filter by non-alcoholic drinks")).toBeInTheDocument();
  });

  // TODO: add tests for cleating and closing
});
