"use client";

/**
 * Page Uploader
 * Upload images to a catalog
 */

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PageUploaderProps {
  catalogId: string;
  nextPageNumber: number;
}

export function PageUploader({ catalogId, nextPageNumber }: PageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const pageNumber = nextPageNumber + i;
        const fileExt = file.name.split(".").pop();
        const fileName = `${catalogId}/${pageNumber}.${fileExt}`;

        // Upload to Supabase Storage
        const { error: uploadError, data } = await supabase.storage
          .from("catalog-images")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("catalog-images").getPublicUrl(fileName);

        // Create database entry
        const { error: dbError } = await supabase.from("catalog_pages").insert({
          catalog_id: catalogId,
          page_number: pageNumber,
          image_url: publicUrl,
          storage_path: fileName,
        });

        if (dbError) throw dbError;
      }

      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      router.refresh();
    } catch (error: any) {
      console.error("Error uploading:", error);
      alert(`Failed to upload: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Pages</CardTitle>
        <CardDescription>
          Upload catalog page images. Multiple files will be added sequentially starting
          from page {nextPageNumber}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {files.length > 0 && (
          <div className="text-sm text-gray-600">
            {files.length} file{files.length !== 1 ? "s" : ""} selected
          </div>
        )}

        <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
          {uploading ? "Uploading..." : "Upload Pages"}
        </Button>
      </CardContent>
    </Card>
  );
}
