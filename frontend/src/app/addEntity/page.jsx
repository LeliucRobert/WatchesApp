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

import * as React from "react";
import EditForm from "@/components/EditForm";
import EntityForm from "@/components/EntityForm";
export default function WatchlyUI() {
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
      <section className='listings'>
        <h2 className='listings__title'>Active Listings</h2>
        <Carousel>
          <CarouselContent className='gap-x-7'>
            <CarouselItem className='basis-1/3'>
              <div className='listing-card'>
                <div className='listing-card__image'>
                  <img
                    src='/placeholder.svg?height=250&width=250'
                    alt='Watch listing'
                  />
                </div>
                <div className='listing-card__content'>
                  <p className='listing-card__text'>Text</p>
                  <p className='listing-card__price'>$0</p>
                  <p className='listing-card__seller'>Seller: Letuc Robert</p>

                  <div className='listing-card__actions'>
                    <button className='listing-card__delete'>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M3 6H5H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/3'>
              <div className='listing-card'>
                <div className='listing-card__image'>
                  <img
                    src='/placeholder.svg?height=250&width=250'
                    alt='Watch listing'
                  />
                </div>
                <div className='listing-card__content'>
                  <p className='listing-card__text'>Text</p>
                  <p className='listing-card__price'>$0</p>
                  <p className='listing-card__seller'>Seller: Letuc Robert</p>

                  <div className='listing-card__actions'>
                    <EditForm />

                    <button className='listing-card__edit'>EDIT LISTING</button>
                    <button className='listing-card__delete'>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M3 6H5H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/3'>
              <div className='listing-card'>
                <div className='listing-card__image'>
                  <img
                    src='/placeholder.svg?height=250&width=250'
                    alt='Watch listing'
                  />
                </div>
                <div className='listing-card__content'>
                  <p className='listing-card__text'>Text</p>
                  <p className='listing-card__price'>$0</p>
                  <p className='listing-card__seller'>Seller: Letuc Robert</p>

                  <div className='listing-card__actions'>
                    <button className='listing-card__edit'>EDIT LISTING</button>
                    <button className='listing-card__delete'>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M3 6H5H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/3'>
              <div className='listing-card'>
                <div className='listing-card__image'>
                  <img
                    src='/placeholder.svg?height=250&width=250'
                    alt='Watch listing'
                  />
                </div>
                <div className='listing-card__content'>
                  <p className='listing-card__text'>Text</p>
                  <p className='listing-card__price'>$0</p>
                  <p className='listing-card__seller'>Seller: Letuc Robert</p>

                  <div className='listing-card__actions'>
                    <button className='listing-card__edit'>EDIT LISTING</button>
                    <button className='listing-card__delete'>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M3 6H5H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
}
