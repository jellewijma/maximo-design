/**
 * Catalog Detail Page
 * View and manage pages within a catalog
 */

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CatalogHeader } from "@/components/admin/catalog-header";
import { PageUploader } from "@/components/admin/page-uploader";
import { PageGrid } from "@/components/admin/page-grid";

interface CatalogPageProps {
  params: Promise<{ id: string }>;
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch catalog
  const { data: catalog, error: catalogError } = await supabase
    .from("catalogs")
    .select("*")
    .eq("id", id)
    .single();

  if (catalogError || !catalog) {
    redirect("/admin");
  }

  // Fetch catalog pages
  const { data: pages, error: pagesError } = await supabase
    .from("catalog_pages")
    .select("*")
    .eq("catalog_id", id)
    .order("page_number", { ascending: true });

  if (pagesError) {
    console.error("Error fetching pages:", pagesError);
  }

  return (
    <div className="space-y-6">
      <CatalogHeader catalog={catalog} />

      <PageUploader catalogId={id} nextPageNumber={(pages?.length || 0) + 1} />

      <PageGrid catalogId={id} pages={pages || []} />
    </div>
  );
}
