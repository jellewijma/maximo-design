"use client";

/**
 * Catalog List
 * Displays list of catalogs with actions
 */

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Catalog } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CatalogListProps {
  catalogs: Catalog[];
}

export function CatalogList({ catalogs: initialCatalogs }: CatalogListProps) {
  const [catalogs, setCatalogs] = useState(initialCatalogs);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this catalog?")) return;

    setDeleting(id);
    try {
      const { error } = await supabase.from("catalogs").delete().eq("id", id);

      if (error) throw error;

      setCatalogs(catalogs.filter((c) => c.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Error deleting catalog:", error);
      alert("Failed to delete catalog");
    } finally {
      setDeleting(null);
    }
  };

  const handleTogglePublish = async (catalog: Catalog) => {
    try {
      const { error } = await supabase
        .from("catalogs")
        .update({
          is_published: !catalog.is_published,
          published_at: !catalog.is_published ? new Date().toISOString() : null,
        })
        .eq("id", catalog.id);

      if (error) throw error;

      setCatalogs(
        catalogs.map((c) =>
          c.id === catalog.id
            ? {
                ...c,
                is_published: !c.is_published,
                published_at: !c.is_published ? new Date().toISOString() : null,
              }
            : c
        )
      );
      router.refresh();
    } catch (error) {
      console.error("Error updating catalog:", error);
      alert("Failed to update catalog");
    }
  };

  if (catalogs.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-600">No catalogs yet. Create your first one!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Catalogs</CardTitle>
        <CardDescription>
          {catalogs.length} catalog{catalogs.length !== 1 ? "s" : ""} total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {catalogs.map((catalog) => (
              <TableRow key={catalog.id}>
                <TableCell className="font-medium">{catalog.title}</TableCell>
                <TableCell>{catalog.category || "—"}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      catalog.is_published
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {catalog.is_published ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(catalog.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/catalogs/${catalog.id}`}>View</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublish(catalog)}
                  >
                    {catalog.is_published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(catalog.id)}
                    disabled={deleting === catalog.id}
                  >
                    {deleting === catalog.id ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
