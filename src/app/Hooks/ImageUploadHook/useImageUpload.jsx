'use client'
import { useState } from 'react';
import axios from 'axios';

const useImageUpload = () => {
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    setError(null);

    const photo = e.target.files[0];
    if (!photo) return null;

    const formData = new FormData();
    formData.append('image', photo);

    // Use NEXT_PUBLIC_ for client-side env variables in Next.js
    const photoUploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`;

    try {
      const res = await axios.post(photoUploadUrl, formData);
      const imageUrl = res.data.data.url;
      setPicture(imageUrl);
      return imageUrl;
    } catch (err) {
      console.error("Image upload failed:", err);
      setError(err);
      return null;
    }
  };

  return { picture, handleImageUpload, error };
};

export default useImageUpload;
