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
import { useState, useEffect } from "react";

export default function Filter({ onFilterChange, showStats, onToggleStats }) {
  const [filters, setFilters] = useState({
    searchTerm: "",
    price: "All Prices",
    sort: "Featured",
  });
  const [searchInput, setSearchInput] = useState(filters.searchTerm || "");

  const handleSearchClick = () => {
    handleFilterChange("searchTerm", searchInput);
  };

  // **Instantly update and apply filters**
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [filterType]: value };
      return updatedFilters;
    });
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const priceOptions = [
    { label: "All Prices", value: "All Prices" },
    { label: "< $50", value: "0-49" },
    { label: "$50 - $249", value: "50-249" },
    { label: "$250 - $499", value: "250-499" },
    { label: "$500 - $999", value: "500-999" },
    { label: "$1000 - $4999", value: "1000-4999" },
    { label: "> $4999", value: "5000-2e9" }, // Example max value
  ];

  const sortOptions = [
    { label: "Featured", value: "Featured" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Newest", value: "newest" },
  ];

  return (
    <div>
      <div className='filters'>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search in site'
            className='search-input'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Search
            className='search-icon'
            onClick={handleSearchClick}
            style={{ cursor: "pointer" }} // 🔥 make it clickable
          />
        </div>

        <div className='filter-controls'>
          {/* Price Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='dropdown-button' variant='outline'>
                <span>
                  Price Range:{" "}
                  {priceOptions.find((opt) => opt.value === filters.price)
                    ?.label || "All Prices"}
                </span>
                <ChevronDown className='dropdown-icon' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='dropdown-content'>
              {priceOptions.map(({ label, value }) => (
                <DropdownMenuItem
                  key={value}
                  className={`dropdown-item ${
                    filters.price === value ? "selected" : ""
                  }`}
                  onClick={() => handleFilterChange("price", value)}
                >
                  {label}
                  {filters.price === value && <Check className='check-icon' />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='dropdown-button' variant='outline'>
                <span>
                  Sort By:{" "}
                  {sortOptions.find((opt) => opt.value === filters.sort)
                    ?.label || "Featured"}
                </span>
                <ChevronDown className='dropdown-icon' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='dropdown-content'>
              {sortOptions.map(({ label, value }) => (
                <DropdownMenuItem
                  key={value}
                  className={`dropdown-item ${
                    filters.sort === value ? "selected" : ""
                  }`}
                  onClick={() => handleFilterChange("sort", value)}
                >
                  {label}
                  {filters.sort === value && <Check className='check-icon' />}
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
