import "@testing-library/jest-dom";
import * as hooks from "../../hooks/useTagsByType";

jest.mock("./UserAccountForms/UserDetailsForm", () => () => <div data-testid="user-details-form">UserDetailsForm</div>);
jest.mock("./UserAccountForms/UserPasswordForm", () => ({ onCancel }: { onCancel: () => void }) => (
  <div data-testid="user-password-form">
    UserPasswordForm
    <button onClick={onCancel}>Cancel</button>
  </div>
));
jest.mock("./UserDetails", () => () => <div data-testid="user-details">UserDetails</div>);
jest.mock("../TagSelector", () => ({ heading }: { heading: string }) => <div data-testid={`tag-selector-${heading}`}>{heading}</div>);

describe("UserAccountPanel", () => {
  beforeEach(() => {
    jest.spyOn(hooks, "default").mockReturnValue({
      venueTypes: [{ id: "1", name: "Bar" }],
      dietaries: [{ id: "2", name: "Vegan" }],
      zeroDrinkTypes: [{ id: "3", name: "Soda" }],
      zeroDrinks: [{ id: "4", name: "Coke" }],
    });
  });

  test("TODO: Implement tests", () => {
    expect(true).toBe(true);
  });
});
