import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GeoapifySearch from "./GeoapifySearch";

const mockOnChange = jest.fn();
const mockOptions = [
  {
    id: "1",
    address: "123 Main St, New York, NY",
    housenumber: "123",
    street: "Main St",
    city: "New York",
    state: "NY",
    country: "USA",
    country_code: "US",
    timezone: "EST",
    lat: 40.7128,
    lon: -74.006,
  },
  {
    id: "2",
    address: "456 Elm St, Los Angeles, CA",
    housenumber: "456",
    street: "Elm St",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    country_code: "US",
    timezone: "PST",
    lat: 34.0522,
    lon: -118.2437,
  },
];

jest.mock("lucide-react", () => ({
    Check: () => <svg data-testid="check-icon" />,
    X: () => <svg data-testid="x-icon" />,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: mockOptions }),
  })
) as jest.Mock;

describe("GeoapifySearch Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input field with placeholder", () => {
    render(<GeoapifySearch onChange={mockOnChange} placeholder="Search an address" />);
    const input = screen.getByPlaceholderText("Search an address");
    expect(input).toBeInTheDocument();
  });

  test.skip("fetches and displays options when typing", async () => {
    render(<GeoapifySearch onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    
    fireEvent.change(input, { target: { value: "123" } });
    
    await waitFor(() => {
      expect(screen.getByText("123 Main St, New York, NY")).toBeInTheDocument();
      expect(screen.getByText("456 Elm St, Los Angeles, CA")).toBeInTheDocument();
    });
  });

  test.skip("selecting an option updates input and calls onChange", async () => {
    render(<GeoapifySearch onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    
    fireEvent.change(input, { target: { value: "123" } });
    
    await waitFor(() => {
      fireEvent.click(screen.getByText("123 Main St, New York, NY"));
    });
    
    expect(input).toHaveValue("123 Main St, New York, NY");
    expect(mockOnChange).toHaveBeenCalledWith(mockOptions[0]);
  });

  test.skip("clears input and options when clear button is clicked", async () => {
    render(<GeoapifySearch onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    
    fireEvent.change(input, { target: { value: "123" } });
    
    await waitFor(() => {
      fireEvent.click(screen.getByText("123 Main St, New York, NY"));
    });
    
    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue("");
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });
});