/** @format */

import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Upload } from "lucide-react";
import "../styles/components/EntityForm.css";
export default function EntityForm() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // Triggers file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "drag-drop.jpg (50.7kb)", progress: 100 },
    { name: "drag-drop.jpg (50.7kb)", progress: 100 },
  ]);

  const [formErrors, setFormErrors] = useState({
    name: true,
    category: true,
    condition: true,
    description: false,
    price: true,
  });

  return (
    <div className='sell-form__content'>
      {/* Upload Image */}
      <div className='sell-form__upload'>
        <h2 className='sell-form__section-title'>Upload Image</h2>
        <div
          className='upload-area'
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <svg
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='upload-area__icon'
          >
            <Upload />
          </svg>
          <p className='upload-area__text'>Drag and Drop here</p>
          <p className='upload-area__text upload-area__text--muted'>or</p>
          <button className='upload-area__btn'>Select file</button>
          <input
            type='file'
            ref={fileInputRef}
            accept='image/png, image/jpeg'
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        {/* Uploaded files */}
      </div>

      {/* Form Fields */}
      <div className='sell-form__fields'>
        {/* Name */}
        <div className='form-group'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            placeholder='Enter a name...'
            className='form-input'
          />
        </div>

        {/* Category */}
        <div className='form-group'>
          <label className='form-label'>Category</label>
          <div className='form-select'>
            <select defaultValue=''>
              <option value=''>Select a category...</option>
              <option value='luxury'>Luxury</option>
              <option value='sport'>Sport</option>
              <option value='casual'>Casual</option>
            </select>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='form-select__icon'
            >
              <path
                d='M6 9L12 15L18 9'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>

        {/* Condition */}
        <div className='form-group'>
          <label className='form-label'>Condition</label>
          <div className='form-select'>
            <select defaultValue=''>
              <option value=''>Select a condition...</option>
              <option value='new'>New</option>
              <option value='like-new'>Like New</option>
              <option value='used'>Used</option>
              <option value='vintage'>Vintage</option>
            </select>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='form-select__icon'
            >
              <path
                d='M6 9L12 15L18 9'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>

        {/* Description */}
        <div className='form-group'>
          <label className='form-label'>Description</label>
          <textarea
            placeholder='Add a description...'
            className='form-textarea'
          ></textarea>
          {formErrors.description && (
            <p className='form-error'>Invalid input</p>
          )}
        </div>

        {/* Price */}
        <div className='form-group'>
          <label className='form-label'>Price</label>
          <input
            type='text'
            placeholder='Add a price...'
            className='form-input'
          />
        </div>

        <button className='submit-btn'>Submit</button>
      </div>
    </div>
  );
}
