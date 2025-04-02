/** @format */

import React from "react";
import "../styles/components/WatchCard.css";
import EditForm from "./EditForm";
import { useState } from "react";
import {
  Search,
  ChevronDown,
  Heart,
  ShoppingCart,
  ArrowRight,
  Cat,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEntities } from "@/context/EntityContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function WatchCard({
  mode,
  id,
  name,
  description,
  price,
  images = [],
  seller,
  category,
  condition,
  statisticsEnabled = false,
  minPrice,
  maxPrice,
}) {
  const [showMore, setShowMore] = useState(false);
  const { deleteEntity } = useEntities();
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image
  const [isHovered, setIsHovered] = useState(false);

  function getPriceColor(price, min, max) {
    if (max === min) return "hsl(120, 100%, 40%)"; // Avoid division by 0
    const ratio = (price - min) / (max - min); // Range between 0 and 1
    const hue = 120 - ratio * 120; // 120 = green, 0 = red
    return `hsl(${hue}, 100%, 40%)`; // returns HSL color string
  }

  const numericPrice = parseFloat(price.toString().replace(/[^\d.]/g, ""));
  const priceColor = statisticsEnabled
    ? getPriceColor(numericPrice, minPrice, maxPrice)
    : "inherit";

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    if (images.length > 1 && isHovered) {
      const interval = setInterval(() => {
        nextImage();
      }, 2000); // Change image every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [images.length, currentImageIndex, isHovered]);
  return (
    <div
      className='listing-card'
      onMouseEnter={() => setIsHovered(true)} // Pause on hover
      onMouseLeave={() => setIsHovered(false)} // Resume on leave
    >
      <div className='listing-card__image'>
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={`Watch ${currentImageIndex}`}
              className='listing-card__carousel-image'
            />

            {/* Show navigation buttons only if more than 1 image */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className='carousel-prev'
                  aria-label='Previous Image'
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className='carousel-next'
                  aria-label='Next Image'
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </>
        ) : (
          <img src='/images/test.jpg' alt='Default Watch' />
        )}
      </div>
      <div className='listing-card__content'>
        <p className='listing-card__text'>{name || "Name"}</p>
        <p className='listing-card__category'>
          Category: {category || "Uncategorized"}
        </p>
        <p className='listing-card__price' style={{ color: priceColor }}>
          {price ? `$${price}` : "$0"}
        </p>
        <p className='listing-card__seller'>Seller: {seller || "Unknown"}</p>

        {showMore && (
          <div className='listing-card__more-details'>
            <p className='listing-card__description'>
              <strong>Description:</strong>{" "}
              {description || "No description available."}
            </p>
            <p className='listing-card__condition'>
              <strong>Condition:</strong> {condition || "Unknown"}
            </p>
          </div>
        )}

        {/* View More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className='listing-card__view-more'
        >
          {showMore ? "View Less ▲" : "View More ▼"}
        </button>

        <div className='listing-card__actions'>
          {mode === "selling" && (
            <>
              <button className='add-to-cart-button'>
                <ShoppingCart className='cart-icon' />
                ADD TO CART
                <ArrowRight className='arrow-icon' />
              </button>
              <button className='favorite-button' aria-label='Favorite Watch'>
                <Heart className='heart-icon' />
              </button>
            </>
          )}

          {mode === "editing" && (
            <>
              <EditForm
                id={id}
                name={name}
                description={description}
                price={price}
                images={images}
                category={category}
                condition={condition}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className='listing-card__delete'
                    aria-label='Delete Listing'
                  >
                    <Trash2 className='trash2-icon' />
                  </button>
                </AlertDialogTrigger>

                <AlertDialogContent className='alert-dialog-content'>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='alert-dialog-title'>
                      Confirm Deletion
                    </AlertDialogTitle>
                    <AlertDialogDescription className='alert-dialog-description'>
                      Are you sure you want to delete <strong>{name}</strong>?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter className='alert-dialog-footer'>
                    <AlertDialogCancel className='alert-dialog-cancel'>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteEntity(id)}
                      className='alert-dialog-confirm'
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
