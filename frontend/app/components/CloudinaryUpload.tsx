'use client';

import { useEffect, useRef } from 'react';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
}

interface CloudinaryResult {
  event: string;
  info: {
    secure_url: string;
  };
}

interface CloudinaryWidget {
  open: () => void;
}

export default function CloudinaryUpload({ onUpload }: CloudinaryUploadProps) {
  const widgetRef = useRef<CloudinaryWidget | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpload = () => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    type CloudinaryWindow = Window & {
      cloudinary: {
        createUploadWidget: (
          options: object,
          callback: (error: Error | null, result: CloudinaryResult) => void
        ) => CloudinaryWidget;
      };
    };

    widgetRef.current = (window as unknown as CloudinaryWindow).cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset: 'ecommerce_products',
        multiple: false,
        maxFiles: 1,
        resourceType: 'image',
      },
      (error: Error | null, result: CloudinaryResult) => {
        if (!error && result.event === 'success') {
          onUpload(result.info.secure_url);
        }
      }
    );

    widgetRef.current.open();
  };

  return (
    <button
      type="button"
      onClick={handleUpload}
      className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
    >
      Upload Image
    </button>
  );
}