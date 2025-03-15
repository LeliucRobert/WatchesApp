/** @format */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/components/Navbar.css";
import { Heart, ShoppingCart, User, Moon } from "lucide-react";
export default function Navbar() {
  return (
    <div className='header-container'>
      <div className='logo'>
        <Image
          src='/placeholder.svg?height=24&width=24'
          alt='Watchly Logo'
          width={24}
          height={24}
          className='logo-image'
        />
        <span className='logo-text'>Watchly</span>
      </div>

      <nav className='nav'>
        <Link href='#' className='nav-link'>
          Home
        </Link>
        <Link href='#' className='nav-link'>
          Explore
        </Link>
        <Link href='#' className='nav-link'>
          Sell a watch
        </Link>
      </nav>

      <div className='header-actions'>
        <button className='icon-button'>
          <Heart className='icon' />
        </button>
        <button className='icon-button'>
          <User className='icon' />
        </button>
        <button className='icon-button'>
          <ShoppingCart className='icon' />
        </button>
        <button className='icon-button'>
          <Moon className='icon' />
        </button>
      </div>
    </div>
  );
}
