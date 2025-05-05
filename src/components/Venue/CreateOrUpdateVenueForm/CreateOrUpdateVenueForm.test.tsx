import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import CreateOrUpdateVenueForm from "./CreateOrUpdateVenueForm";

jest.mock("../../Common/Input", () => ({
    __esModule: true,
    default: () => <input data-testid="mock-input" placeholder="Mocked input" />,
  }));
  
jest.mock("../../Common/SelectInput", () => (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select {...props} data-testid="mock-select" />
));

jest.mock("../../Common/AddressSearchInput", () => (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} data-testid="mock-address-input" />
));

jest.mock("../../Map/MapComponent", () => (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} data-testid="mock-map-component" />
));

jest.mock("../../TagSelector", () => (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} data-testid="mock-tag-selector" />
));

jest.mock("../../Common/Divider", () => (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr {...props} data-testid="mock-divider" />
));

jest.mock("../../../hooks/useTagsByType", () => () => ({
    venueTypes: [{ id: "1", name: "Restaurant" }],
    dietaries: [{ id: "2", name: "Vegan" }],
    zeroDrinkTypes: [],
    zeroDrinkOptions: [],
  }));
jest.mock("../../../services/geoaplifyService", () => ({
  reverseGeocodeFromCoordinates: jest.fn().mockResolvedValue(null),
}));

const mockInitialData = {
    name: "",
    venue_type_tag_id: "",
    address: "",
    phone: null,
    website: "",
    tag_ids: [],
    lat: null,
    lon: null,
};

describe("CreateOrUpdateVenueForm", () => {
  test("renders the form correctly", () => {
    render(
      <RecoilRoot>
        <CreateOrUpdateVenueForm initialFormData={mockInitialData} />
      </RecoilRoot>
    );
    screen.debug();

    expect(screen.getByTestId("create-update-venue-form")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-input").length).toBeGreaterThan(0);
    expect(screen.getByTestId("mock-select")).toBeInTheDocument();
    expect(screen.getByTestId("mock-address-input")).toBeInTheDocument();
    expect(screen.getByTestId("mock-map-component")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-tag-selector").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("mock-divider").length).toBeGreaterThan(0);
  });

  test("validates form and displays error message on submit if invalid", () => {
    render(
      <RecoilRoot>
        <CreateOrUpdateVenueForm initialFormData={mockInitialData} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByText(/please fix the following errors/i)).toBeInTheDocument();
  });
});
