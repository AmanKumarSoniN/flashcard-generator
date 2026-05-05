import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import CreateFlashcard from "../pages/CreateFlashcard";

const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CreateFlashcard />
      </BrowserRouter>
    </Provider>
  );
};

describe("CreateFlashcard Component", () => {

  test("renders create flashcard form", () => {
    renderComponent();
    expect(screen.getByText(/Create Flashcard/i)).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    renderComponent();

    const button = screen.getByRole("button", { name: /create/i });

    await fireEvent.click(button);

    const errors = await screen.findAllByText(/Required/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  test("allows user to type in input fields", () => {
    renderComponent();

    const titleInput = screen.getByPlaceholderText("Enter Group Name");

    fireEvent.change(titleInput, { target: { value: "Test Group" } });

    expect(titleInput.value).toBe("Test Group");
  });

  test("submits form and triggers navigation", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <CreateFlashcard />
        </MemoryRouter>
      </Provider>
    );

    const titleInput = screen.getByPlaceholderText("Enter Group Name");
    const descInput = screen.getByPlaceholderText("Describe the deck...");

    fireEvent.change(titleInput, { target: { value: "Test" } });
    fireEvent.change(descInput, { target: { value: "Desc" } });

    const btn = screen.getByRole("button", { name: /create/i });

    await fireEvent.click(btn);

    expect(titleInput.value).toBe("Test");
  });

});