/** @format */

import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEntities } from "@/context/EntityContext";
import { Upload } from "lucide-react";
import { ChevronDown } from "lucide-react";
import "../styles/components/EntityForm.css";
export default function EntityForm() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // Triggers file input
  };
  const { addEntity } = useEntities();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    condition: "",
    description: "",
    price: "",
    image: null,
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    category: false,
    condition: false,
    price: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate fields
    setFormErrors({ ...formErrors, [e.target.name]: e.target.value === "" });
  };

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    if (
      !formData.name ||
      !formData.category ||
      !formData.condition ||
      !formData.price
    ) {
      setFormErrors({
        name: !formData.name,
        category: !formData.category,
        condition: !formData.condition,
        price: !formData.price,
      });
      alert("Please fill in all required fields.");
      return;
    }

    // Add the new entity to the global state
    addEntity(formData);

    // Reset the form after submission
    setFormData({
      name: "",
      category: "",
      condition: "",
      description: "",
      price: "",
      image: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='sell-form__content'>
      {/* Upload Image */}
      <div className='sell-form__upload'>
        <h2 className='sell-form__section-title'>Upload Image</h2>
        <div
          className='upload-area'
          onClick={() => fileInputRef.current.click()}
          style={{ cursor: "pointer" }}
        >
          <Upload width='32' height='32' />

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
        {formData.image && (
          <img src={formData.image} alt='Preview' className='w-32 mt-2' />
        )}
      </div>

      {/* Form Fields */}
      <div className='sell-form__fields'>
        {/* Name */}
        <div className='form-group'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter a name...'
            className={`form-input ${formErrors.name ? "border-red-500" : ""}`}
          />

          {formErrors.name && <p className='form-error'>Invalid input</p>}
        </div>

        {/* Category */}
        <div className='form-group'>
          <label className='form-label'>Category</label>
          <div className='form-select'>
            <select
              name='category'
              value={formData.category}
              onChange={handleChange}
              className={`form-input ${
                formErrors.category ? "border-red-500" : ""
              }`}
            >
              <option value=''>Select a category...</option>
              <option value='luxury'>Luxury</option>
              <option value='sport'>Sport</option>
              <option value='casual'>Casual</option>
            </select>
            <ChevronDown className='form-select__icon' />
          </div>
          {formErrors.category && (
            <p className='form-error'>Category is required.</p>
          )}
        </div>

        {/* Condition */}
        <div className='form-group'>
          <label className='form-label'>Condition</label>
          <div className='form-select'>
            <select
              name='condition'
              value={formData.condition}
              onChange={handleChange}
              className={`form-input ${
                formErrors.condition ? "border-red-500" : ""
              }`}
            >
              <option value=''>Select a condition...</option>
              <option value='new'>New</option>
              <option value='like-new'>Like New</option>
              <option value='used'>Used</option>
              <option value='vintage'>Vintage</option>
            </select>
            <ChevronDown className='form-select__icon' />
          </div>
          {formErrors.condition && (
            <p className='form-error'>Condition is required.</p>
          )}
        </div>

        {/* Description */}
        <div className='form-group'>
          <label className='form-label'>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
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
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            placeholder='Add a price...'
            className={`form-input ${formErrors.price ? "border-red-500" : ""}`}
          />
          {formErrors.price && <p className='form-error'>Price is required.</p>}
        </div>

        <button
          type='submit'
          className='submit-btn bg-blue-600 text-white px-4 py-2 rounded mt-4'
        >
          Submit
        </button>
      </div>
    </form>
  );
}
