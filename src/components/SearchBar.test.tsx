import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  test("renders search bar with input field and buttons", () => {
    render(<SearchBar />);

    const inputElement = screen.getByPlaceholderText("Search venue, dietary, 0% drink...");
    expect(inputElement).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  test("allows user to type in the input field", () => {
    render(<SearchBar />);
    
    const inputElement = screen.getByPlaceholderText("Search venue, dietary, 0% drink...") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Cocktail Bar" } });

    expect(inputElement.value).toBe("Cocktail Bar");
  });

  test("triggers click events on buttons", () => {
    render(<SearchBar />);
    
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);

    expect(buttons[0]).toBeEnabled();
    expect(buttons[1]).toBeEnabled();
  });
});
