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

export default function Filter() {
  const [selectedPrice, setSelectedPrice] = useState("All Prices");

  // Sort filter state
  const [selectedSort, setSelectedSort] = useState("Featured");
  return (
    <div className='filters'>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search in site'
          className='search-input'
        />
        <Search className='search-icon' />
      </div>

      <div className='filter-controls'>
        {/* Price Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='dropdown-button' variant='outline'>
              <span>Price Range: {selectedPrice}</span>
              <ChevronDown className='dropdown-icon' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='dropdown-content'>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedPrice === "All Prices" ? "selected" : ""
              }`}
              onClick={() => setSelectedPrice("All Prices")}
            >
              All Prices
              {selectedPrice === "All Prices" && (
                <Check className='check-icon' />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedPrice === "Under $50" ? "selected" : ""
              }`}
              onClick={() => setSelectedPrice("Under $50")}
            >
              Under $50
              {selectedPrice === "Under $50" && (
                <Check className='check-icon' />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedPrice === "$50 - $100" ? "selected" : ""
              }`}
              onClick={() => setSelectedPrice("$50 - $100")}
            >
              $50 - $100
              {selectedPrice === "$50 - $100" && (
                <Check className='check-icon' />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedPrice === "$100 - $200" ? "selected" : ""
              }`}
              onClick={() => setSelectedPrice("$100 - $200")}
            >
              $100 - $200
              {selectedPrice === "$100 - $200" && (
                <Check className='check-icon' />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedPrice === "Over $200" ? "selected" : ""
              }`}
              onClick={() => setSelectedPrice("Over $200")}
            >
              Over $200
              {selectedPrice === "Over $200" && (
                <Check className='check-icon' />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='dropdown-button' variant='outline'>
              <span>Sort By: {selectedSort}</span>
              <ChevronDown className='dropdown-icon' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='dropdown-content'>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedSort === "Featured" ? "selected" : ""
              }`}
              onClick={() => setSelectedSort("Featured")}
            >
              Featured
              {selectedSort === "Featured" && <Check className='check-icon' />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedSort === "Price: Low to High" ? "selected" : ""
              }`}
              onClick={() => setSelectedSort("Price: Low to High")}
            >
              Price: Low to High
              {selectedSort === "Price: Low to High" && (
                <Check className='check-icon' />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedSort === "Price: High to Low" ? "selected" : ""
              }`}
              onClick={() => setSelectedSort("Price: High to Low")}
            >
              Price: High to Low
              {selectedSort === "Price: High to Low" && (
                <Check className='check-icon' />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedSort === "Newest" ? "selected" : ""
              }`}
              onClick={() => setSelectedSort("Newest")}
            >
              Newest
              {selectedSort === "Newest" && <Check className='check-icon' />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`dropdown-item ${
                selectedSort === "Best Selling" ? "selected" : ""
              }`}
              onClick={() => setSelectedSort("Best Selling")}
            >
              Best Selling
              {selectedSort === "Best Selling" && (
                <Check className='check-icon' />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
