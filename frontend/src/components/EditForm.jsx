/** @format */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Cloud, Trash2, Watch } from "lucide-react";
import Image from "next/image";
import "../styles/components/EditForm.css";

export default function EditForm() {
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: true,
    category: true,
    condition: true,
    description: true,
    price: true,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='trigger-btn'>Add New Watch</Button>
      </DialogTrigger>
      <DialogContent className='dialog-content'>
        <DialogHeader>
          <DialogTitle className='dialog-title'></DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className='watchly-container'>
          <header className='header'>
            <div className='logo'>
              <div className='watch-icon'>
                <Watch className='watch-face' strokeWidth={1.5} />
                <div className='watch-circle'></div>
                <div className='watch-band'></div>
              </div>
              <h1>Watchly</h1>
            </div>
          </header>

          <hr />

          <div className='content'>
            <div className='upload-section'>
              <h2>Upload Image</h2>

              <div className='upload-area'>
                <Cloud className='cloud-icon' />
                <p>Drag and Drop here</p>
                <p>or</p>
                <Button variant='outline' className='select-file-btn'>
                  Select file
                </Button>
              </div>

              <div className='thumbnails'>
                {[1, 2, 3].map((item) => (
                  <div key={item} className='thumbnail'>
                    <div className='thumbnail-img'>
                      <Image
                        src='/placeholder.svg?height=96&width=96'
                        alt='Watch thumbnail'
                        width={96}
                        height={96}
                        className='thumbnail-image'
                      />
                    </div>
                    <button className='delete-btn'>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className='navigation'>
                <Button variant='ghost' className='nav-btn prev-btn'>
                  <ArrowLeft size={16} />
                  Previous
                </Button>
                <Button variant='ghost' className='nav-btn next-btn'>
                  Next
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            <div className='form-section'>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <Input
                  id='name'
                  placeholder='Enter a name...'
                  className={formErrors.name ? "error" : ""}
                />
                {formErrors.name && (
                  <p className='error-message'>Invalid input</p>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='category'>Category</label>
                <div
                  className={`select-wrapper ${
                    formErrors.category ? "error" : ""
                  }`}
                >
                  <Select>
                    <SelectTrigger id='category'>
                      <SelectValue placeholder='Select a category...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='luxury'>Luxury</SelectItem>
                      <SelectItem value='sport'>Sport</SelectItem>
                      <SelectItem value='casual'>Casual</SelectItem>
                      <SelectItem value='vintage'>Vintage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formErrors.category && (
                  <p className='error-message'>Invalid input</p>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='condition'>Condition</label>
                <div
                  className={`select-wrapper ${
                    formErrors.condition ? "error" : ""
                  }`}
                >
                  <Select>
                    <SelectTrigger id='condition'>
                      <SelectValue placeholder='Select a condition...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='new'>New</SelectItem>
                      <SelectItem value='like-new'>Like New</SelectItem>
                      <SelectItem value='good'>Good</SelectItem>
                      <SelectItem value='fair'>Fair</SelectItem>
                      <SelectItem value='poor'>Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formErrors.condition && (
                  <p className='error-message'>Invalid input</p>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <Textarea
                  id='description'
                  placeholder='Add a description...'
                  className={formErrors.description ? "error" : ""}
                />
                {formErrors.description && (
                  <p className='error-message'>Invalid input</p>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='price'>Price</label>
                <Input
                  id='price'
                  placeholder='Add a price...'
                  className={formErrors.price ? "error" : ""}
                />
                {formErrors.price && (
                  <p className='error-message'>Invalid input</p>
                )}
              </div>
            </div>
          </div>

          <hr />

          <div className='footer'>
            <Button className='confirm-btn'>Confirm changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
