/** @format */

import React from "react";
import "../styles/components/WatchCard.css";
import EditForm from "./EditForm";
import {
  Search,
  ChevronDown,
  Heart,
  ShoppingCart,
  ArrowRight,
  Cat,
  Trash2,
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
import { Button } from "@/components/ui/button";
export default function WatchCard({
  mode,
  id,
  name,
  description,
  price,
  image,
  seller,
}) {
  const { deleteEntity } = useEntities();
  return (
    <div className='listing-card'>
      <div className='listing-card__image'>
        <img src={image || "/images/test.jpg"} alt='Watch listing' />
      </div>
      <div className='listing-card__content'>
        <p className='listing-card__text'>{name || "Name"}</p>
        <p className='listing-card__price'>{price ? `$${price}` : "$0"}</p>
        <p className='listing-card__seller'>Seller: {seller || "Unknown"}</p>

        <div className='listing-card__actions'>
          {mode === "selling" && (
            <>
              <button className='add-to-cart-button'>
                <ShoppingCart className='cart-icon' />
                ADD TO CART
                <ArrowRight className='arrow-icon' />
              </button>
              <button className='favorite-button'>
                <Heart className='heart-icon' />
              </button>
            </>
          )}

          {mode === "editing" && (
            <>
              <EditForm />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className='listing-card__delete'>
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
