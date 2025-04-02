/** @format */

import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useEntities } from "@/context/EntityContext";
import WatchStatsDashboard from "../components/WatchStatsDashboard";

// Mock the useEntities hook
jest.mock("@/context/EntityContext", () => ({
  useEntities: jest.fn(),
}));

describe("WatchStatsDashboard", () => {
  beforeEach(() => {
    // Mock entities data
    useEntities.mockReturnValue({
      entities: [
        { price: "100", category: "Luxury", seller: { name: "Seller A" } },
        { price: "200", category: "Sport", seller: { name: "Seller B" } },
        { price: "150", category: "Casual", seller: { name: "Seller A" } },
      ],
    });
  });

  test("renders the main heading", () => {
    render(<WatchStatsDashboard />);
    expect(screen.getByText("📈 Watch Market Analytics")).toBeInTheDocument();
  });

  test("renders the bar chart with seller data", async () => {
    await act(async () => {
      render(<WatchStatsDashboard />);
    });

    expect(screen.getByText("🏷️ Top Sellers by Listings")).toBeInTheDocument();

    await waitFor(() => {
      const barChartLabels = screen.getAllByText(/Seller A|Seller B/i);
      expect(barChartLabels.length).toBeGreaterThan(0);
    });
  });

  test("handles empty entities gracefully", async () => {
    useEntities.mockReturnValue({ entities: [] });

    await act(async () => {
      render(<WatchStatsDashboard />);
    });

    expect(screen.getByText("📈 Watch Market Analytics")).toBeInTheDocument();
    expect(screen.getByText("💰 Total Price Pool (Live)")).toBeInTheDocument();
    expect(
      screen.getByText("⌚ Watch Listings by Category")
    ).toBeInTheDocument();
    expect(screen.getByText("🏷️ Top Sellers by Listings")).toBeInTheDocument();
  });
});
