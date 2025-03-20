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
import EntityForm from "./EntityForm";

export default function EditForm({
  id,
  name,
  description,
  price,
  images,
  category,
  condition,
}) {
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
        {/* <Button className='trigger-btn'>Add New Watch</Button> */}
        <button className='listing-card__edit'>
          EDIT LISTING
          <ArrowRight className='arrow-icon' />
        </button>
      </DialogTrigger>
      <DialogContent className='dialog-content'>
        <DialogHeader>
          <DialogTitle className='dialog-title'></DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className='watchly-container'>
          <div className='logo-edit'>
            <Image
              src='/images/Watch.png'
              alt='Watchly Logo'
              width={44}
              height={44}
              className='logo-image'
            />

            <h1>Watchly</h1>
          </div>

          <hr />

          <div className='content'>
            <EntityForm
              initialData={{
                id,
                name,
                description,
                price,
                images,
                category,
                condition,
              }}
              onSubmit={() => setOpen(false)}
            />
          </div>

          <div className='footer'></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
