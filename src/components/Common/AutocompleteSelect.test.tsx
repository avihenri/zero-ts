import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AutocompleteSelect from "./AutocompleteSelect";

const mockFetchOptions = jest.fn();
const mockOnChange = jest.fn();

jest.mock("lucide-react", () => ({
    Check: () => <svg data-testid="check-icon" />,
    X: () => <svg data-testid="x-icon" />,
}));

describe("AutocompleteSelect Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input with placeholder", () => {
    render(
      <AutocompleteSelect
        fetchOptions={mockFetchOptions}
        onChange={mockOnChange}
        placeholder="Search locations..."
      />
    );

    const input = screen.getByPlaceholderText("Search locations...");
    expect(input).toBeInTheDocument();
  });

  test("calls fetchOptions after typing with debounce", async () => {
    mockFetchOptions.mockResolvedValue([]);
    render(<AutocompleteSelect fetchOptions={mockFetchOptions} onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New York" } });

    await waitFor(() => expect(mockFetchOptions).toHaveBeenCalledWith("New York"), { timeout: 600 });
  });

  test("displays options when API returns results", async () => {
    mockFetchOptions.mockResolvedValue([
      { id: "1", address: "New York, USA", lat: 40.7128, lon: -74.006, country_code: "US", timezone: "EST" },
      { id: "2", address: "Los Angeles, USA", lat: 34.0522, lon: -118.2437, country_code: "US", timezone: "PST" }
    ]);

    render(<AutocompleteSelect fetchOptions={mockFetchOptions} onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Los" } });

    await waitFor(() => expect(screen.getByText("Los Angeles, USA")).toBeInTheDocument());
    expect(screen.getByText("New York, USA")).toBeInTheDocument();
  });

  test("selecting an option updates input and calls onChange", async () => {
    mockFetchOptions.mockResolvedValue([
      { id: "1", address: "New York, USA", lat: 40.7128, lon: -74.006, country_code: "US", timezone: "EST" }
    ]);

    render(<AutocompleteSelect fetchOptions={mockFetchOptions} onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New" } });

    await waitFor(() => expect(screen.getByText("New York, USA")).toBeInTheDocument());

    fireEvent.click(screen.getByText("New York, USA"));

    expect(input).toHaveValue("New York, USA");
    expect(mockOnChange).toHaveBeenCalledWith("1");
  });

  test("clears input when clear button is clicked", () => {
    render(
      <AutocompleteSelect value="New York" fetchOptions={mockFetchOptions} onChange={mockOnChange} />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("New York");

    const clearButton = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  test("hides dropdown when clicking outside", async () => {
    mockFetchOptions.mockResolvedValue([
      { id: "1", address: "New York, USA", lat: 40.7128, lon: -74.006, country_code: "US", timezone: "EST" }
    ]);

    render(<AutocompleteSelect fetchOptions={mockFetchOptions} onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New" } });

    await waitFor(() => expect(screen.getByText("New York, USA")).toBeInTheDocument());

    fireEvent.mouseDown(document.body);
    await waitFor(() => expect(screen.queryByText("New York, USA")).not.toBeInTheDocument());
  });
});
