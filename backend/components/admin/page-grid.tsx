"use client";

/**
 * Page Grid
 * Display catalog pages in a grid with delete functionality
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { CatalogPage } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PageGridProps {
  catalogId: string;
  pages: CatalogPage[];
}

export function PageGrid({ catalogId, pages: initialPages }: PageGridProps) {
  const [pages, setPages] = useState(initialPages);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (page: CatalogPage) => {
    if (!confirm(`Delete page ${page.page_number}?`)) return;

    setDeleting(page.id);
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("catalog-images")
        .remove([page.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("catalog_pages")
        .delete()
        .eq("id", page.id);

      if (dbError) throw dbError;

      setPages(pages.filter((p) => p.id !== page.id));
      router.refresh();
    } catch (error) {
      console.error("Error deleting page:", error);
      alert("Failed to delete page");
    } finally {
      setDeleting(null);
    }
  };

  if (pages.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-600">No pages uploaded yet. Upload your first page above!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Catalog Pages</CardTitle>
        <CardDescription>
          {pages.length} page{pages.length !== 1 ? "s" : ""} in this catalog
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pages.map((page) => (
            <div
              key={page.id}
              className="relative group border rounded-lg overflow-hidden bg-gray-50"
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={page.image_url}
                  alt={`Page ${page.page_number}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="p-2 bg-white border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Page {page.page_number}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(page)}
                    disabled={deleting === page.id}
                  >
                    {deleting === page.id ? "..." : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
