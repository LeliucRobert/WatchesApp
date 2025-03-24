/** @format */

import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/explore/page";

// Mock useEntities so we can control the watches list
jest.mock("../context/EntityContext", () => ({
  useEntities: () => ({
    entities: [],
  }),
}));

describe("Explore Page", () => {
  test("renders main titles", () => {
    render(<Home />);
    expect(screen.getByText("Sell your watch now!")).toBeInTheDocument();
    expect(screen.getByText("Browse watches")).toBeInTheDocument();
  });

  test("renders all categories", () => {
    render(<Home />);
    expect(screen.getByText("Luxury Watches")).toBeInTheDocument();
    expect(screen.getByText("Vintage Watches")).toBeInTheDocument();
    expect(screen.getByText("Casual Watches")).toBeInTheDocument();
    expect(screen.getByText("SmartWatches")).toBeInTheDocument();
  });

  test("shows message when no watches match", () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/search in site/i);
    fireEvent.change(input, { target: { value: "xyz" } });

    expect(
      screen.getByText(/no watches match your criteria/i)
    ).toBeInTheDocument();
  });
});

jest.mock("../context/EntityContext", () => ({
  useEntities: () => ({
    entities: [
      {
        id: 1,
        name: "Rolex",
        price: "5000",
        images: ["/images/rolex.png"], // must be an array!
        seller: "John Doe", // must be an object with expected fields
        description: "A luxury dive watch",
        category: "Luxury",
        condition: "New",
      },
      {
        id: 2,
        name: "Casio",
        price: "25",
        images: ["/images/casio.png"],
        seller: "Jane Doe",
        description: "Affordable digital watch",
        category: "Casual",
        condition: "Used",
      },
    ],
  }),
}));

test("filters watches by name", () => {
  render(<Home />);
  const input = screen.getByPlaceholderText(/search/i); // depends on your Filter input
  fireEvent.change(input, { target: { value: "Rolex" } });
  expect(screen.getByText("Rolex")).toBeInTheDocument();
  expect(screen.queryByText("Casio")).not.toBeInTheDocument();
});
