/**
 * Admin Dashboard
 * Main page for managing catalogs
 */

import { createClient } from "@/lib/supabase/server";
import { CatalogList } from "@/components/admin/catalog-list";
import { CreateCatalogButton } from "@/components/admin/create-catalog-button";

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch all catalogs
  const { data: catalogs, error } = await supabase
    .from("catalogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching catalogs:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Catalogs</h1>
          <p className="text-gray-600 mt-1">
            Manage your product catalogs and pages
          </p>
        </div>
        <CreateCatalogButton />
      </div>

      <CatalogList catalogs={catalogs || []} />
    </div>
  );
}
