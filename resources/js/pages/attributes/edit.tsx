import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import type { ColumnDef } from '@tanstack/react-table';
import { Filters, PaginationResult } from '@/types';
import ConfirmDialog from '@/components/confirm-dialog';
import AttributeForm from './components/attribute-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { formatNumber } from '@/utils/number';

interface EditAttributePageProps {
  attribute: {
    id: number;
    name: string;
    type: string;
  };
  values: PaginationResult<{ id: number; value: string; price_delta: number, attribute_id: number }>;
  filters: Filters;
}

export default function EditAttributePage({ attribute, values, filters }: EditAttributePageProps) {
  const columns: ColumnDef<any>[] = [
    { header: 'Value', accessorKey: 'value' },
    { header: 'Price Delta', cell: ({row}) => formatNumber(row.original.price_delta) },
    {
      header: 'Action',
      cell: ({ row }) => {
        const val = row.original;

        return (
          <div className="flex gap-2">
            {/* Edit Value */}
            <AttributeValueDialog
              mode="edit"
              initialData={{ value: val.value, price_delta: val.price_delta }}
              triggerButton={
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Pencil className="w-4 h-4" /> Edit
                </Button>
              }
              onSubmit={(data, reset) => {
                router.put(
                  `/attributes/${val.attribute_id}/values/${val.id}`,
                  data,
                  {
                    onSuccess: () => {
                      reset();
                      router.reload({ only: ['values'] });
                    },
                  }
                );
              }}
            />

            {/* Delete Value */}
            <ConfirmDialog
              title="Hapus Attribute Value?"
              description="Value yang dihapus tidak bisa dikembalikan"
              onConfirm={() =>
                router.delete(`/attributes/${val.attribute_id}/values/${val.id}`, { preserveScroll: true })
              }
              confirmText="Ya, Hapus"
              trigger={
                <Button variant="destructive" size="sm" className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Hapus
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Attributes', href: '/attributes' },
        { title: 'Edit', href: '#' },
      ]}
    >
      <Head title="Edit Attribute" />

      <div className="space-y-6 p-6">
        {/* Form Edit Attribute */}
        <AttributeForm attribute={attribute} />

        {/* List Attribute Values */}
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="text-xl font-bold">Attribute Values</h3>

            {/* Add Value */}
            <AttributeValueDialog
              mode="add"
              triggerButton={
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Value
                </Button>
              }
              onSubmit={(data, reset) => {
                router.post(
                  `/attributes/${attribute.id}/values`,
                  data,
                  {
                    onSuccess: () => {
                      reset();
                      router.reload({ only: ['values'] });
                    },
                  }
                );
              }}
            />
          </div>

          <DataTable
            data={values}
            columns={columns}
            emptyMessage="Belum ada value untuk attribute ini"
            endpoint={`/attributes/${attribute.id}/edit`}
            filters={filters}
          />
        </div>
      </div>
    </AppLayout>
  );
}

/* -----------------------------------
   Reusable Dialog Component
----------------------------------- */
interface AttributeValueDialogProps {
  mode: 'add' | 'edit';
  triggerButton?: React.ReactNode;
  initialData?: { value: string; price_delta: number };
  onSubmit: (data: { value: string; price_delta: number }, reset: () => void) => void;
}

function AttributeValueDialog({
  mode,
  triggerButton,
  initialData,
  onSubmit,
}: AttributeValueDialogProps) {
  const [open, setOpen] = useState(false);
  
  const { data, setData, reset, processing, errors } = useForm({
    value: initialData?.value ?? '',
    price_delta: initialData?.price_delta ?? 0,
  });

  // Update form jika initialData berubah (penting untuk edit)
  useEffect(() => {
    if (initialData && open) {
      setData({
        value: initialData.value,
        price_delta: initialData.price_delta,
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data, () => {
      reset();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ?? <Button>{mode === 'add' ? 'Add' : 'Edit'}</Button>}
      </DialogTrigger>

      <DialogContent className="space-y-4 w-full max-w-md">
        <h4 className="text-lg font-bold">
          {mode === 'add' ? 'Add Attribute Value' : 'Edit Attribute Value'}
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Input
              placeholder="Value"
              value={data.value}
              onChange={(e) => setData('value', e.target.value)}
            />
            {errors.value && <p className="text-red-500 text-sm">{errors.value}</p>}
          </div>

          <div className="space-y-1">
            <Input
              type="number"
              placeholder="Price Delta"
              value={data.price_delta}
              onChange={(e) => setData('price_delta', Number(e.target.value))}
            />
            {errors.price_delta && <p className="text-red-500 text-sm">{errors.price_delta}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}