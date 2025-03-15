/** @format */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/components/Footer.css";
import { Facebook, Linkedin, Twitter, ArrowUp } from "lucide-react";
export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-columns'>
          {/* Logo */}
          <div className='footer-column'>
            <div className='footer-logo'>
              <Image
                src='/placeholder.svg?height=32&width=32'
                alt='Watchly Logo'
                width={32}
                height={32}
                className='logo-image'
              />
              <span className='logo-text'>Watchly</span>
            </div>
          </div>

          {/* Navigation */}
          <div className='footer-column'>
            <h3 className='footer-heading'>NAVIGATION</h3>
            <ul className='footer-links'>
              <li>
                <Link href='#' className='footer-link'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='#' className='footer-link'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='#' className='footer-link'>
                  What We Do
                </Link>
              </li>
              <li>
                <Link href='#' className='footer-link'>
                  To The Power of 10
                </Link>
              </li>
              <li>
                <Link href='#' className='footer-link'>
                  Dispute
                </Link>
              </li>
            </ul>
          </div>

          {/* Talk to us */}
          <div className='footer-column'>
            <h3 className='footer-heading'>TALK TO US</h3>
            <ul className='footer-links'>
              <li>
                <Link href='#' className='footer-link'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href='#' className='footer-link'>
                  Feedback
                </Link>
              </li>
              <li>
                <Link href='#' className='footer-link'>
                  Instagram
                </Link>
              </li>
              <li>
                <Link href='#' className='footer-link'>
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href='#' className='footer-link'>
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className='footer-bottom'>
          <div className='social-links'>
            <Link href='#' className='social-link'>
              <Facebook className='social-icon' />
            </Link>
            <Link href='#' className='social-link'>
              <Linkedin className='social-icon' />
            </Link>
            <Link href='#' className='social-link'>
              <Twitter className='social-icon' />
            </Link>
          </div>

          <p className='copyright'>© 2025 Watchly. All rights reserved.</p>
        </div>
      </div>

      {/* Back to top button */}
      <div className='back-to-top'>
        <button className='back-to-top-button'>
          <ArrowUp className='back-to-top-icon' />
        </button>
      </div>
    </footer>
  );
}
