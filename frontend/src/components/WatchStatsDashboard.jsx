/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { useEntities } from "@/context/EntityContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B620E0"];

export default function WatchStatsDashboard() {
  const { entities } = useEntities();
  const [priceData, setPriceData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [sellerData, setSellerData] = useState([]);

  // Calculate total price
  const getTotalPrice = () => {
    return entities.reduce(
      (acc, watch) => acc + parseFloat(watch.price || 0),
      0
    );
  };

  // Update chart data in real-time
  useEffect(() => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    const newTotal = getTotalPrice();
    setPriceData((prev) => [
      ...prev.slice(-9),
      { time: timestamp, value: newTotal },
    ]);

    // Pie Chart (by category)
    const categoryMap = {};
    entities.forEach((watch) => {
      const category = watch.category || "Unknown";
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });
    setCategoryData(
      Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
    );

    // Bar Chart (by seller)
    const sellerMap = {};
    entities.forEach((watch) => {
      const seller = watch.seller?.name || watch.seller || "Unknown";
      sellerMap[seller] = (sellerMap[seller] || 0) + 1;
    });
    const sortedSellers = Object.entries(sellerMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    setSellerData(
      sortedSellers.map(([name, listings]) => ({ name, listings }))
    );
  }, [entities]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "1rem" }}
      >
        📈 Watch Market Analytics
      </h2>

      {/* Flex Row Container */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
        {/* Area Chart */}
        <div style={{ flex: 1, minWidth: "300px", height: 400 }}>
          <h3>💰 Total Price Pool (Live)</h3>
          <ResponsiveContainer width='100%' height='85%'>
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id='colorPrice' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey='time' />
              <YAxis />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip />
              <Area
                type='monotone'
                dataKey='value'
                stroke='#8884d8'
                fillOpacity={1}
                fill='url(#colorPrice)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{ flex: 1, minWidth: "300px", height: 400 }}>
          <h3>⌚ Watch Listings by Category</h3>
          <ResponsiveContainer width='100%' height='85%'>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#8884d8'
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div
          style={{ flex: 1, minWidth: "300px", height: 400 }}
          aria-labe='bar-chart-div'
        >
          <h3 aria-label='bar-chart-title'>🏷️ Top Sellers by Listings</h3>
          <ResponsiveContainer width='100%' height='85%'>
            <BarChart data={sellerData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='listings' fill='#82ca9d' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
