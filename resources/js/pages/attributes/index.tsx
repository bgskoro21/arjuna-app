import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import ConfirmDialog from '@/components/confirm-dialog';
import { Filters, PaginationResult } from '@/types';

interface Attribute {
  id: number;
  name: string;
type: string;
  values: { id: number; value: string; price_delta: number }[];
}

interface AttributePageProps {
  attributes: PaginationResult<Attribute>;
  filters: Filters;
}

export default function AttributePage({ attributes, filters }: AttributePageProps) {
  const handleSort = (field: string) => {
    router.get(
      '/attributes',
      { ...filters, sort: field, direction: filters.direction === 'asc' ? 'desc' : 'asc' },
      { preserveState: true, replace: true }
    );
  };

  const columns: ColumnDef<Attribute>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Type', accessorKey: 'type' },
    {
      header: 'Values',
      cell: ({ row }) => row.original.values.map((v) => v.value).join(', ')
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`/attributes/${row.original.id}/edit`}>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Pencil className="w-4 h-4" /> Detail
            </Button>
          </Link>
          <ConfirmDialog
            title="Hapus Attribute?"
            description="Attribute yang dihapus tidak bisa dikembalikan."
            onConfirm={() => router.delete(`/attributes/${row.original.id}`)}
            confirmText="Ya, Hapus"
            trigger={
              <Button variant="destructive" size="sm" className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Hapus
              </Button>
            }
          />
        </div>
      )
    }
  ];

  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Attributes', href: '/attributes' }]}>
      <Head title="Attributes" />
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <h3 className="text-3xl">Attributes</h3>
          <Link
            href="/attributes/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Attribute
          </Link>
        </div>

        <DataTable data={attributes} columns={columns} emptyMessage="Tidak ada attribute" filters={filters} endpoint="/attributes" />
      </div>
    </AppLayout>
  );
}
