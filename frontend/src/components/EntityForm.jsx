/** @format */

import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEntities } from "@/context/EntityContext";
import { Upload } from "lucide-react";
import { ChevronDown } from "lucide-react";
import "../styles/components/EntityForm.css";
export default function EntityForm({ initialData, onSubmit }) {
  const fileInputRef = useRef(null);

  const { addEntity, editEntity } = useEntities();

  const isEditing = Boolean(initialData); // Check if editing or adding
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      category: "",
      condition: "",
      description: "",
      price: "",
      images: [],
    }
  );

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
    const files = event.target.files;
    if (files.length > 0) {
      const imageArray = [...formData.images]; // Preserve existing images
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imageArray.push(reader.result);
          setFormData({ ...formData, images: imageArray });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidPrice = parseFloat(formData.price) > 0;
    // Validate form before submission
    if (
      !formData.name ||
      !formData.category ||
      !formData.condition ||
      !formData.price ||
      !isValidPrice
    ) {
      setFormErrors({
        name: !formData.name,
        category: !formData.category,
        condition: !formData.condition,
        price: !formData.price || !isValidPrice,
      });

      return;
    }

    if (isEditing) {
      editEntity({ id: initialData.id, ...formData });
    } else {
      addEntity(formData);
    }

    if (!isEditing) {
      setFormData({
        name: "",
        category: "",
        condition: "",
        description: "",
        price: "",
        images: [],
      });
    }

    if (onSubmit) onSubmit();
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
          <button type='button' className='upload-area__btn'>
            Select file
          </button>
          <input
            type='file'
            ref={fileInputRef}
            aria-label='Select file input'
            accept='image/png, image/jpeg'
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        {/* Uploaded files */}
        <div className='image-preview-grid'>
          {formData.images.map((image, index) => (
            <div key={index} className='image-preview-item'>
              <img
                src={image}
                alt={`Preview ${index}`}
                className='image-preview'
              />
              <button
                type='button'
                className='remove-image-btn'
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
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
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <div className='form-select'>
            <select
              id='category'
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
          <label htmlFor='condition' className='form-label'>
            Condition
          </label>
          <div className='form-select'>
            <select
              id='condition'
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
