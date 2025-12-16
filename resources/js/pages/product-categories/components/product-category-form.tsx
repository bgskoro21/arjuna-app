import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductCategoryFormProps {
  category?: {
    id?: number;
    name: string;
    parent_id?: number | null;
  };
  parents: { [key: number]: string };
}

export default function ProductCategoryForm({ category, parents }: ProductCategoryFormProps) {
  const isEdit = Boolean(category);

  const { data, setData, post, put, processing, errors } = useForm({
    name: category?.name ?? '',
    parent_id: category?.parent_id ?? null,
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (isEdit && category?.id) {
      put(`/product-categories/${category.id}`, { preserveScroll: true });
    } else {
      post('/product-categories', { preserveScroll: true });
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isEdit ? 'Edit Product Category' : 'Buat Product Category Baru'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Nama kategori"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Parent */}
            <div className="space-y-1">
              <Label htmlFor="parent_id">Parent Category (Optional)</Label>
              <Select
                value={data.parent_id?.toString() ?? ''}
                onValueChange={(value) => setData('parent_id', value ? Number(value) : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih parent" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(parents).map(([id, name]) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.parent_id && <p className="text-red-500 text-sm">{errors.parent_id}</p>}
            </div>

            <div className="flex justify-end">
              <Button disabled={processing} className="rounded-xl">
                {isEdit ? 'Update Category' : 'Simpan Category'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
