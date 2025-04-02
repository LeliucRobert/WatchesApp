/**
 * @format
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import EditForm from "@/components/EditForm";
import { EntityProvider } from "@/context/EntityContext";

const mockData = {
  id: 0,
  name: "Edit Watch",
  description: "A nice watch to edit",
  price: "299",
  category: "luxury",
  condition: "used",
  images: [],
};

const renderWithContext = () =>
  render(
    <EntityProvider>
      <EditForm {...mockData} />
    </EntityProvider>
  );

describe("EditForm Component", () => {
  test("renders edit button", () => {
    renderWithContext();
    expect(screen.getByText(/edit listing/i)).toBeInTheDocument();
  });

  test("opens the dialog when edit button is clicked", () => {
    renderWithContext();
    fireEvent.click(screen.getByText(/edit listing/i));
    expect(screen.getByText(/watchly/i)).toBeInTheDocument(); // modal content
  });

  test("passes initial data to EntityForm", () => {
    renderWithContext();
    fireEvent.click(screen.getByText(/edit listing/i));

    expect(screen.getByDisplayValue(/edit watch/i)).toBeInTheDocument(); // name field
    expect(screen.getByDisplayValue("299")).toBeInTheDocument(); // price field
    expect(
      screen.getByDisplayValue(/a nice watch to edit/i)
    ).toBeInTheDocument(); // description
  });

  test("closes modal on successful form submit", () => {
    renderWithContext();

    fireEvent.click(screen.getByText(/edit listing/i));
    const nameInput = screen.getByPlaceholderText(/enter a name/i);
    const priceInput = screen.getByPlaceholderText(/add a price/i);
    const categorySelect = screen.getByRole("combobox", { name: /category/i });
    const conditionSelect = screen.getByRole("combobox", {
      name: /condition/i,
    });

    // Make valid changes
    fireEvent.change(nameInput, { target: { value: "Updated Watch" } });
    fireEvent.change(priceInput, { target: { value: "499" } });
    fireEvent.change(categorySelect, { target: { value: "casual" } });
    fireEvent.change(conditionSelect, { target: { value: "like-new" } });

    // Submit form
    fireEvent.click(screen.getByText(/submit/i));

    // Modal should close (logo disappears)
    setTimeout(() => {
      expect(screen.queryByText(/watchly/i)).not.toBeInTheDocument();
    }, 100);
  });
});
