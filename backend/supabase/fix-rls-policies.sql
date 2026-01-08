-- Fix RLS Policies for Catalog Management
-- Run this in your Supabase SQL Editor to fix the authentication issues

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON catalogs;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON catalogs;
DROP POLICY IF EXISTS "Enable read access for published catalog pages" ON catalog_pages;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON catalog_pages;

-- Catalogs policies
-- Allow anyone to read published catalogs
CREATE POLICY "Public can view published catalogs" ON catalogs
  FOR SELECT USING (is_published = true);

-- Allow authenticated users to do everything with catalogs
CREATE POLICY "Authenticated users can manage catalogs" ON catalogs
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Catalog pages policies
-- Allow anyone to read pages from published catalogs
CREATE POLICY "Public can view published catalog pages" ON catalog_pages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM catalogs
      WHERE catalogs.id = catalog_pages.catalog_id
      AND catalogs.is_published = true
    )
  );

-- Allow authenticated users to do everything with catalog pages
CREATE POLICY "Authenticated users can manage catalog pages" ON catalog_pages
  FOR ALL USING (auth.uid() IS NOT NULL);
