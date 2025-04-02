/**
 * @format
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import WatchCard from "@/components/WatchCard";
import { EntityProvider } from "@/context/EntityContext";

const renderWithContext = (props = {}) =>
  render(
    <EntityProvider>
      <WatchCard
        id={0}
        name='Test Watch'
        description='A great test watch'
        price='150'
        images={["/test1.jpg", "/test2.jpg"]}
        seller='Test Seller'
        category='luxury'
        condition='new'
        mode='selling'
        {...props}
      />
    </EntityProvider>
  );

describe("WatchCard Component", () => {
  test("renders with image and navigates carousel (lines 52–55)", () => {
    renderWithContext();
    const image = screen.getByAltText("Watch 0");
    expect(image).toBeInTheDocument();

    const nextBtn = screen.getByRole("button", { name: "Next Image" }); // Because icon button
    fireEvent.click(nextBtn);
    const image2 = screen.getByAltText("Watch 1");
    expect(image2).toBeInTheDocument();
  });

  test("renders fallback image if no images (line 65)", () => {
    renderWithContext({ images: [] });
    expect(screen.getByAltText("Default Watch")).toBeInTheDocument();
  });

  test("toggles view more/less content (lines 70–71)", () => {
    renderWithContext();
    const toggleBtn = screen.getByText(/view more/i);
    fireEvent.click(toggleBtn);
    expect(screen.getByText(/description:/i)).toBeInTheDocument();
    expect(screen.getByText(/condition:/i)).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.queryByText(/description:/i)).not.toBeInTheDocument();
  });

  test("shows selling mode buttons (lines 77–83)", () => {
    renderWithContext();
    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Favorite Watch" })
    ).toBeInTheDocument(); // heart button
  });

  test("shows delete button immediately", () => {
    renderWithContext({ mode: "editing" });
    expect(
      screen.getByRole("button", { name: /delete listing/i })
    ).toBeInTheDocument();
  });

  test("shows editing buttons and triggers dialog (lines 85–193)", () => {
    renderWithContext({ mode: "editing" });

    const editBtn = screen.getByText(/edit listing/i);
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(editBtn);
    expect(screen.getByText(/watchly/i)).toBeInTheDocument(); // dialog opens
  });
});
