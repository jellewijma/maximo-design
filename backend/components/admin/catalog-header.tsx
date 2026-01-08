/**
 * Catalog Header
 * Shows catalog info and breadcrumb navigation
 */

import Link from "next/link";
import type { Catalog } from "@/lib/types/database";
import { Button } from "@/components/ui/button";

interface CatalogHeaderProps {
  catalog: Catalog;
}

export function CatalogHeader({ catalog }: CatalogHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/admin" className="hover:underline">
          Catalogs
        </Link>
        <span>/</span>
        <span>{catalog.title}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{catalog.title}</h1>
          {catalog.description && (
            <p className="text-gray-600 mt-1">{catalog.description}</p>
          )}
          {catalog.category && (
            <p className="text-sm text-gray-500 mt-2">
              Category: <span className="font-medium">{catalog.category}</span>
            </p>
          )}
          <div className="mt-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                catalog.is_published
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {catalog.is_published ? "Published" : "Draft"}
            </span>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin">Back to Catalogs</Link>
        </Button>
      </div>
    </div>
  );
}
