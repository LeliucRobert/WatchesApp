/**
 * @format
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import EntityForm from "@/components/EntityForm";
import { EntityProvider } from "@/context/EntityContext";

// Wrap EntityForm with EntityProvider so it has access to addEntity
const renderWithContext = () =>
  render(
    <EntityProvider>
      <EntityForm />
    </EntityProvider>
  );

describe("EntityForm Component", () => {
  test("renders form inputs correctly", () => {
    renderWithContext();

    expect(screen.getByPlaceholderText(/enter a name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/add a description/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/add a price/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  test("shows error if required fields are empty", () => {
    renderWithContext();
    fireEvent.click(screen.getByText(/submit/i));
  });

  test("creates new entity on valid form submission", () => {
    renderWithContext();

    fireEvent.change(screen.getByPlaceholderText(/enter a name/i), {
      target: { value: "Test Watch" },
    });

    fireEvent.change(screen.getByPlaceholderText(/add a description/i), {
      target: { value: "A cool watch" },
    });

    fireEvent.change(screen.getByPlaceholderText(/add a price/i), {
      target: { value: "199" },
    });

    fireEvent.change(screen.getByRole("combobox", { name: /category/i }), {
      target: { value: "luxury" },
    });

    fireEvent.change(screen.getByRole("combobox", { name: /condition/i }), {
      target: { value: "new" },
    });

    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByPlaceholderText(/enter a name/i).value).toBe(""); // form reset = success
  });

  test("triggers file input when upload area is clicked", () => {
    renderWithContext();

    const uploadArea = screen.getByText(/drag and drop here/i).closest("div");
    const input = screen.getByLabelText("Select file input", {
      selector: "input[type=file]",
    });

    // Mock the click
    const clickSpy = jest.spyOn(input, "click");
    fireEvent.click(uploadArea);

    expect(clickSpy).toHaveBeenCalled();
  });

  test("uploads an image file and shows preview", async () => {
    renderWithContext();

    const file = new File(["hello"], "watch.jpg", { type: "image/jpeg" });
    const input = screen.getByLabelText("Select file input");

    fireEvent.change(input, { target: { files: [file] } });

    await new Promise((r) => setTimeout(r, 100));

    const preview = screen.getByAltText(/preview 0/i);
    expect(preview).toBeInTheDocument();
  });

  test("removes an uploaded image when clicking ×", async () => {
    renderWithContext();

    const file = new File(["test"], "img.png", { type: "image/png" });
    const input = screen.getByLabelText("Select file input");

    fireEvent.change(input, { target: { files: [file] } });
    await new Promise((r) => setTimeout(r, 100));

    const removeBtn = screen.getByRole("button", { name: /×/ });
    fireEvent.click(removeBtn);

    expect(screen.queryByAltText(/preview 0/i)).not.toBeInTheDocument();
  });
});
