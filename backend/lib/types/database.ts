/**
 * Database Types
 * TypeScript types for Supabase database tables
 */

export interface Catalog {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface CatalogPage {
  id: string;
  catalog_id: string;
  page_number: number;
  image_url: string;
  thumbnail_url: string | null;
  storage_path: string;
  created_at: string;
}

export interface CatalogWithPages extends Catalog {
  catalog_pages: CatalogPage[];
}

export type NewCatalog = Omit<Catalog, "id" | "created_at" | "updated_at">;
export type NewCatalogPage = Omit<CatalogPage, "id" | "created_at">;
