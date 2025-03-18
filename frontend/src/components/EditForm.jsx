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
            <EntityForm />
          </div>

          <div className='footer'>
            <Button className='confirm-btn'>Confirm changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
