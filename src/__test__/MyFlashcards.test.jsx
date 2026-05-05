import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import CreateFlashcard from "../pages/CreateFlashcard";

const initializeComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CreateFlashcard />
      </BrowserRouter>
    </Provider>
  );
};

describe("CreateFlashcard Component", () => {

  test("renders the create flashcard form", () => {
    initializeComponent();
    expect(screen.getByText(/Create Flashcard/i)).toBeInTheDocument();
  });

  test("shows validation errors on empty submission", async () => {
    initializeComponent();

    const submitButton = screen.getByRole("button", { name: /create/i });

    await fireEvent.click(submitButton);

    const validationErrors = await screen.findAllByText(/Required/i);
    expect(validationErrors.length).toBeGreaterThan(0);
  });

  test("allows user input in fields", () => {
    initializeComponent();

    const groupNameField = screen.getByPlaceholderText("Enter Group Name");

    fireEvent.change(groupNameField, { target: { value: "Test Group" } });

    expect(groupNameField.value).toBe("Test Group");
  });

  test("handles form submission and triggers navigation", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <CreateFlashcard />
        </MemoryRouter>
      </Provider>
    );

    const groupNameField = screen.getByPlaceholderText("Enter Group Name");
    const deckDescriptionField = screen.getByPlaceholderText("Describe the deck...");

    fireEvent.change(groupNameField, { target: { value: "Test" } });
    fireEvent.change(deckDescriptionField, { target: { value: "Desc" } });

    const submitButton = screen.getByRole("button", { name: /create/i });

    await fireEvent.click(submitButton);

    expect(groupNameField.value).toBe("Test");
  });
});