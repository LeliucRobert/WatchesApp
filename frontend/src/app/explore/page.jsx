/** @format */
"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Heart,
  ShoppingCart,
  ArrowRight,
  Cat,
} from "lucide-react";
import "../../styles/explore.css";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import Category from "@/components/Category";
import Filter from "@/components/Filter";
import WatchCard from "@/components/WatchCard";
import { useEntities } from "@/context/EntityContext";
import { useState } from "react";
export default function Home() {
  const { entities } = useEntities();
  const [filters, setFilters] = useState({
    searchTerm: "",
    price: "All Prices",
    sort: "Featured",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  let filteredWatches = [...entities];

  if (filters.searchTerm) {
    filteredWatches = filteredWatches.filter((watch) =>
      watch.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
    );
  }

  // **Price Filtering**
  filteredWatches = filteredWatches.filter((watch) => {
    const cleanedPrice = watch.price
      .toString()
      .replace(/[^\d.]/g, "")
      .trim();
    const price = parseFloat(cleanedPrice) || 0;

    if (filters.price === "< $50") return price < 50;
    if (filters.price === "$50 - $249") return price >= 50 && price <= 249;
    if (filters.price === "$250 - $499") return price >= 250 && price <= 499;
    if (filters.price === "$500 - $999") return price >= 500 && price <= 999;
    if (filters.price === "$1000 - 4999$")
      return price >= 1000 && price <= 4999;
    if (filters.price === "> $4999") return price > 4999;

    return true;
  });

  // **Sorting**
  if (filters.sort === "Price: Low to High") {
    filteredWatches.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (filters.sort === "Price: High to Low") {
    filteredWatches.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (filters.sort === "Newest") {
    filteredWatches.sort((a, b) => b.id - a.id);
  }
  console.log("Selected Filters:", filters);
  console.log("Original Entities:", entities);
  console.log("Filtered Watches:", filteredWatches);

  return (
    // <div className='container'>
    // {/* Header */}

    <div className='main'>
      {/* Sell your watch section */}
      <section className='sell-section'>
        <div className='sell-content'>
          <h1 className='sell-title'>Sell your watch now!</h1>
          <p className='sell-description'>Put your watch up for sale now</p>
          {/* <button className='button'>Button</button>
           */}
          <Link href='/addEntity'>
            <Button variant='outline' className='button'>
              Sell your watch
            </Button>
          </Link>
        </div>
      </section>

      {/* Browse watches section */}
      <section className='browse-section'>
        <h2 className='section-title'>Browse watches</h2>

        <div className='category-grid'>
          {/* Men Watches */}
          <Category />
          {/* Women Watches 1 */}
          <Category />

          {/* Women Watches 2 */}
          <Category />

          {/* Women Watches 3 */}
          <Category />
        </div>
      </section>

      {/* Featured section */}
      <section className='featured-section'>
        <h2 className='section-title'>Featured</h2>

        {/* Filters */}
        <Filter onFilterChange={handleFilterChange} />
        <hr></hr>
        {/* Products Grid - First Row */}
        <div className='product-grid'>
          {[1, 2, 3, 4].map((item) => (
            <WatchCard key={`product-${item}`} mode='selling' />
          ))}
        </div>

        {/* Products Grid - Second Row */}
        {filteredWatches.length > 0 ? (
          <div className='product-grid'>
            {filteredWatches.map((watch) => (
              <WatchCard
                key={watch.id}
                mode='selling'
                name={watch.name}
                price={watch.price}
                images={watch.images}
                seller={watch.seller}
                description={watch.description}
                category={watch.category}
                condition={watch.condition}
              />
            ))}
          </div>
        ) : (
          <p className='no-watches'>No watches match your criteria.</p>
        )}

        {/* Pagination */}
      </section>
    </div>
    // <Pagination />
    // {/* Footer */}
    // {/* <Footer /> */}
    // </div>
  );
}
