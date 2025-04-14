/** @format */

import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEntities } from "@/context/EntityContext";
import { Upload, Video } from "lucide-react";
import { ChevronDown } from "lucide-react";
import "../styles/components/EntityForm.css";

export default function EntityForm({ initialData, onSubmit, onEntityChange }) {
  const fileInputRef = useRef(null);
  const { addEntity, editEntity } = useEntities();

  const isEditing = Boolean(initialData);
  const [formData, setFormData] = useState(
    initialData || {
      id: `offline-${Date.now()}`,
      name: "",
      category: "",
      condition: "",
      description: "",
      price: "",
      seller: "John Doe",
      media: [],
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
    setFormErrors({ ...formErrors, [e.target.name]: e.target.value === "" });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (file.type.startsWith("video") && file.size > 50 * 1024 * 1024) {
        alert(
          `Video "${file.name}" exceeds the 50MB limit and will not be added.`
        );
        return false;
      }
      return file instanceof File;
    });
    setFormData((prev) => ({
      ...prev,
      media: [...(prev.media || []), ...validFiles],
    }));
  };

  const removeImage = (index) => {
    const updatedMedia = (formData.media || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, media: updatedMedia }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidPrice = parseFloat(formData.price) > 0;
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
      console.log(formData);
      // await editEntity(initialData.id, data);
      await editEntity(initialData.id, formData);
      onEntityChange();
    } else {
      console.log(formData);
      // await addEntity(data);
      await addEntity(formData);
      onEntityChange();
    }

    if (!isEditing) {
      setFormData({
        name: "",
        category: "",
        condition: "",
        description: "",
        price: "",
        media: [],
      });
    }

    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className='sell-form__content'>
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
            accept='image/*,video/*'
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
        </div>
        <div className='image-preview-grid'>
          {Array.isArray(formData.media) &&
            formData.media.length > 0 &&
            formData.media.map((file, index) => {
              let fileUrl = "";
              let fileType = "";

              if (file instanceof File) {
                fileUrl = URL.createObjectURL(file);
                fileType = file?.type || "";
              } else if (file.file) {
                fileUrl = file.file;
                fileType = file.file_type || "";
              } else {
                return null;
              }

              return (
                <div key={index} className='image-preview-item'>
                  {fileType.startsWith("video") ? (
                    <div style={{ position: "relative" }}>
                      <video src={fileUrl} controls className='image-preview' />
                      <Video
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          color: "white",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={fileUrl}
                      alt={`Preview ${index}`}
                      className='image-preview'
                    />
                  )}
                  <button
                    type='button'
                    className='remove-image-btn'
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      <div className='sell-form__fields'>
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
              <option value='vintage'>Vintage</option>
              <option value='casual'>Casual</option>
              <option value='smartwatch'>SmartWatch</option>
            </select>
            <ChevronDown className='form-select__icon' />
          </div>
          {formErrors.category && (
            <p className='form-error'>Category is required.</p>
          )}
        </div>

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
              <option value='used'>Used</option>
            </select>
            <ChevronDown className='form-select__icon' />
          </div>
          {formErrors.condition && (
            <p className='form-error'>Condition is required.</p>
          )}
        </div>

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
