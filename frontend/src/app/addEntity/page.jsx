/** @format */

"use client";

import "../../styles/addEntity.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEntities } from "@/context/EntityContext";
import * as React from "react";
import EditForm from "@/components/EditForm";
import EntityForm from "@/components/EntityForm";
import WatchCard from "@/components/WatchCard";
import WatchStatsDashboard from "@/components/WatchStatsDashboard";
import Footer from "@/components/Footer";
import GenerateFakeButton from "@/components/GenerateFakeButton";
export default function WatchlyUI() {
  const { entities } = useEntities();
  if (entities.length > 0) {
    // console.log(entities);
    // console.log(entities[0]);
    // console.log(entities[0].id);
  }
  return (
    <div className='container'>
      {/* Sell your watch form */}
      <section className='sell-form'>
        <div className='sell-form__container'>
          <h1 className='sell-form__title'>Sell your watch now!</h1>
          <p className='sell-form__subtitle'>Provide the information below</p>
          <EntityForm />
        </div>
      </section>
      {/* Active Listings */}
      <section
        className='listings'
        style={{ marginBottom: "4rem" }} // adds large spacing after section
      >
        <h2 className='listings__title'>Active Listings</h2>
        {entities.length > 0 ? (
          <Carousel>
            <CarouselContent className='gap-x-7'>
              {entities.map((watch) => {
                if (!watch || !watch.id) return null; // ✅ Prevents crash

                return (
                  <CarouselItem key={watch.id} className='basis-1/3'>
                    <WatchCard
                      mode='editing'
                      id={watch.id}
                      name={watch.name}
                      description={watch.description}
                      price={watch.price}
                      media={watch.media}
                      category={watch.category}
                      condition={watch.condition}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p className='text-gray-500'>
            No active listings. Add a watch above.
          </p>
        )}
      </section>
      <GenerateFakeButton />

      <div style={{ marginBottom: "4rem" }}>
        <WatchStatsDashboard />
      </div>

      <Footer />
    </div>
  );
}
