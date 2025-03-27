/** @format */

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Filter({ onFilterChange, showStats, onToggleStats }) {
  const [filters, setFilters] = useState({
    searchTerm: "",
    price: "All Prices",
    sort: "Featured",
  });

  // **Instantly update and apply filters**
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [filterType]: value };
      onFilterChange(updatedFilters); // Pass the latest filters
      return updatedFilters;
    });
  };

  return (
    <div>
      <div className='filters'>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search in site'
            className='search-input'
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          />
          <Search className='search-icon' />
        </div>

        <div className='filter-controls'>
          {/* Price Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='dropdown-button' variant='outline'>
                <span>Price Range: {filters.price}</span>
                <ChevronDown className='dropdown-icon' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='dropdown-content'>
              {[
                "All Prices",
                "< $50",
                "$50 - $249",
                "$250 - $499",
                "$500 - $999",
                "$1000 - 4999$",
                "> $4999",
              ].map((price) => (
                <DropdownMenuItem
                  key={price}
                  className={`dropdown-item ${
                    filters.price === price ? "selected" : ""
                  }`}
                  onClick={() => handleFilterChange("price", price)}
                >
                  {price}{" "}
                  {filters.price === price && <Check className='check-icon' />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='dropdown-button' variant='outline'>
                <span>Sort By: {filters.sort}</span>
                <ChevronDown className='dropdown-icon' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='dropdown-content'>
              {[
                "Featured",
                "Price: Low to High",
                "Price: High to Low",
                "Newest",
              ].map((sort) => (
                <DropdownMenuItem
                  key={sort}
                  className={`dropdown-item ${
                    filters.sort === sort ? "selected" : ""
                  }`}
                  onClick={() => handleFilterChange("sort", sort)}
                >
                  {sort}{" "}
                  {filters.sort === sort && <Check className='check-icon' />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='stats-toggle-container'>
        <div className='stats-toggle-wrapper'>
          <label htmlFor='enable-stats' className='stats-toggle-label'>
            📊 Price Statistics
          </label>

          <label className='switch-wrapper'>
            <input
              id='enable-stats'
              type='checkbox'
              className='switch-checkbox'
              checked={showStats}
              onChange={onToggleStats}
            />
            <span className='switch-slider' />
          </label>
        </div>
      </div>
    </div>
  );
}
