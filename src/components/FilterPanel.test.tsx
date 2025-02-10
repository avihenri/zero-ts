import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import FilterPanel from "./FilterPanel";

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>{children}</RecoilRoot>
);

describe("FilterPanel Component", () => {
  test("renders filter panel and displays main elements", () => {
    render(
      <TestWrapper>
        <FilterPanel />
      </TestWrapper>
    );

    expect(screen.getByText("Filter by distance")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter distance in miles")).toBeInTheDocument();
    expect(screen.getByText("Filter by venue type")).toBeInTheDocument();
    expect(screen.getByText("Filter by dietaries")).toBeInTheDocument();
    expect(screen.getByText("Filter by non-alcoholic drink type")).toBeInTheDocument();
    expect(screen.getByText("Filter by non-alcoholic drinks")).toBeInTheDocument();
  });

  test("updates distance input value", () => {
    render(
      <TestWrapper>
        <FilterPanel />
      </TestWrapper>
    );

    const distanceInput = screen.getByPlaceholderText("Enter distance in miles") as HTMLInputElement;
    fireEvent.change(distanceInput, { target: { value: "30" } });

    expect(distanceInput.value).toBe("30");
  });

  test("renders all filter sections", () => {
    render(
      <TestWrapper>
        <FilterPanel />
      </TestWrapper>
    );

    expect(screen.getByText("Filter by venue type")).toBeInTheDocument();
    expect(screen.getByText("Filter by dietaries")).toBeInTheDocument();
    expect(screen.getByText("Filter by non-alcoholic drink type")).toBeInTheDocument();
    expect(screen.getByText("Filter by non-alcoholic drinks")).toBeInTheDocument();
  });

  // TODO: add tests for cleating and closing
});
