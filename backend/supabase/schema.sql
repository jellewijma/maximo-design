-- Maximo Design CMS Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Catalogs table
CREATE TABLE catalogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Catalog pages table (individual images/pages in a catalog)
CREATE TABLE catalog_pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  catalog_id UUID REFERENCES catalogs(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(catalog_id, page_number)
);

-- Create indexes for better query performance
CREATE INDEX idx_catalogs_published ON catalogs(is_published, published_at DESC);
CREATE INDEX idx_catalog_pages_catalog_id ON catalog_pages(catalog_id, page_number);

-- Enable Row Level Security (RLS)
ALTER TABLE catalogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalog_pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for catalogs
-- Public can read published catalogs
CREATE POLICY "Public can view published catalogs" ON catalogs
  FOR SELECT USING (is_published = true);

-- Authenticated users can manage all catalogs
CREATE POLICY "Authenticated users can manage catalogs" ON catalogs
  FOR ALL USING (auth.uid() IS NOT NULL);

-- RLS Policies for catalog_pages
-- Public can read pages from published catalogs
CREATE POLICY "Public can view published catalog pages" ON catalog_pages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM catalogs
      WHERE catalogs.id = catalog_pages.catalog_id
      AND catalogs.is_published = true
    )
  );

-- Authenticated users can manage all catalog pages
CREATE POLICY "Authenticated users can manage catalog pages" ON catalog_pages
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_catalogs_updated_at BEFORE UPDATE ON catalogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket for catalog images
-- Run this in the Supabase Storage UI or via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('catalog-images', 'catalog-images', true);

-- Storage policies (allows authenticated users to upload, anyone to read public images)
-- CREATE POLICY "Allow authenticated uploads" ON storage.objects
--   FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'catalog-images');

-- CREATE POLICY "Allow public reads" ON storage.objects
--   FOR SELECT TO public
--   USING (bucket_id = 'catalog-images');
