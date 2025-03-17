import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddressSearchInput from "./AddressSearchInput";

const mockOnChange = jest.fn();
const mockOptions = [
  {
    id: "1",
    address: "123 Main St, Some City, Some State",
    housenumber: "123",
    street: "Main St",
    city: "Some City,",
    state: "Some State",
    country: "USA",
    country_code: "US",
    timezone: "America/New_York",
    lat: 40.7128,
    lon: -74.006,
  },
  {
    id: "2",
    address: "456 Test St, Test City, Test State",
    housenumber: "456",
    street: "Test St",
    city: "Test City",
    state: "Test State",
    country: "Country",
    country_code: "gb",
    timezone: "Eurpoe/London",
    lat: 51.5074,
    lon: -0.1278,
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

describe("AddressSearchInput Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input field with placeholder", () => {
    render(<AddressSearchInput onChange={mockOnChange} placeholder="Search an address" />);
    const input = screen.getByPlaceholderText("Search an address");
    expect(input).toBeInTheDocument();
  });

  test("renders input field with value", () => {
    render(<AddressSearchInput onChange={mockOnChange} value="123 Main St" />);
    const input = screen.getByDisplayValue("123 Main St");
    expect(input).toBeInTheDocument();
  });
});