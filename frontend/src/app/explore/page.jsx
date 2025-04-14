/** @format */
"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronUp,
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
import { useRouter } from "next/navigation";
import { fetchWatches } from "@/api/watchApi";
import { useState, useEffect } from "react";
import WatchStatsDashboard from "@/components/WatchStatsDashboard";

export default function Home() {
  const router = useRouter();
  const { query, isReady } = router;
  console.log(query);
  const { loadEntities, backendReady } = useEntities();

  const [page, setPage] = useState(Number(query?.page) || 1);
  const [category, setCategory] = useState(query?.category || "");

  const [filters, setFilters] = useState({
    searchTerm: query?.search || "",
    price: query?.price || "All Prices",
    sort: query?.sort || "Featured",
  });

  useEffect(() => {
    if (!backendReady) return;
    const params = new URLSearchParams();

    if (page) params.set("page", page.toString());
    if (category) params.set("category", category);
    if (filters.price != "All Prices") params.set("price", filters.price);
    if (filters.sort != "Featured") params.set("sort", filters.sort);
    if (filters.searchTerm) params.set("search", filters.searchTerm);

    const queryString = params.toString();
    const newUrl = `/explore?${queryString}`;
    router.replace(newUrl);

    const loadData = async () => {
      const data = await loadEntities(queryString);

      const list = data.results ?? data; // ✅ use results or fallback
      const count = data.count ?? data.length ?? 0;

      setEntities(list);
      setTotalPages(Math.ceil(count / 8));
    };

    loadData();
  }, [page, category, filters, isReady, backendReady]);

  const [showCharts, setShowCharts] = useState(false); // New state
  const [statisticsEnabled, setStatisticsEnabled] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [entities, setEntities] = useState([]);
  // const { entities, loadEntities } = useEntities();

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const currentWatches = entities;

  const prices = entities.map(
    (w) =>
      parseFloat(
        w.price
          .toString()
          .replace(/[^\d.]/g, "")
          .trim()
      ) || 0
  );
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

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
          <Category
            Name='Luxury Watches'
            Description='Top-tier timepieces crafted with elegance'
            ImageURL='/images/luxury.png'
            onClick={() => handleCategoryChange("luxury")}
          />

          <Category
            Name='Vintage Watches'
            Description='Durable and stylish watches for active lifestyles'
            ImageURL='/images/vintage.png'
            onClick={() => handleCategoryChange("vintage")}
          />

          <Category
            Name='Casual Watches'
            Description='Everyday comfort with timeless design'
            ImageURL='/images/casual.png'
            onClick={() => handleCategoryChange("casual")}
          />

          <Category
            Name=' SmartWatches'
            Description='Classic heritage styles that never go out of fashion'
            ImageURL='/images/smartwatch.png'
            onClick={() => handleCategoryChange("smartwatch")}
          />
        </div>
      </section>

      {/* Featured section */}
      <section className='featured-section'>
        <h2 className='section-title'>Featured</h2>

        {/* Filters */}
        <Filter
          onFilterChange={handleFilterChange}
          showStats={statisticsEnabled}
          onToggleStats={() => setStatisticsEnabled((prev) => !prev)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem 0",
          }}
        >
          <button
            onClick={() => setShowCharts((prev) => !prev)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "none",
              border: "none",
              padding: 0,
              fontWeight: "normal",
              fontSize: "0.9rem",
              color: "#000",
              cursor: "pointer",
            }}
          >
            More Analysis{" "}
            {showCharts ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* 📈 Watch Charts */}
        {showCharts && <WatchStatsDashboard />}

        <hr></hr>
        {/* Products Grid - First Row */}

        {/* Products Grid - Second Row */}
        {currentWatches.length > 0 ? (
          <div className='product-grid'>
            {currentWatches.map((watch) => {
              if (!watch || !watch.id) return null; // ✅ Prevents crash

              return (
                <WatchCard
                  mode='selling'
                  key={watch.id}
                  id={watch.id}
                  name={watch.name}
                  description={watch.description}
                  price={watch.price}
                  media={watch.media}
                  seller={watch.seller}
                  category={watch.category}
                  condition={watch.condition}
                  statisticsEnabled={statisticsEnabled}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
              );
            })}
          </div>
        ) : (
          <p className='no-watches'>No watches match your criteria.</p>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      </section>
      <Footer />
    </div>
    // <Pagination />
    // {/* Footer */}
  );
}
