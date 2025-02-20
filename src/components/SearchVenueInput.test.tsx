import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import VenueSearchAndFiltersBar from "./VenueSearchAndFiltersBar";
import { RecoilRoot } from "recoil";

describe("SearchVenueInput Component", () => {
  test("renders search bar with input field and buttons", () => {
    render(
      <RecoilRoot>
        <VenueSearchAndFiltersBar classNames="text-primary-200 text-lg mx-2" />
      </RecoilRoot>
    );

    const inputElement = screen.getByPlaceholderText("Search venue, dietary, 0% drink...");
    expect(inputElement).toBeInTheDocument();
  });

  test("allows user to type in the input field", () => {
    render(
      <RecoilRoot>
        <VenueSearchAndFiltersBar classNames="text-primary-200 text-lg mx-2" />
      </RecoilRoot>
    );

    const inputElement = screen.getByPlaceholderText("Search venue, dietary, 0% drink...") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Cocktail Bar" } });

    expect(inputElement.value).toBe("Cocktail Bar");
  });
});
