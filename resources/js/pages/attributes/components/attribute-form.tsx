import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface AttributeFormProps {
  attribute?: { id: number; name: string; type: string };
}

export default function AttributeForm({ attribute }: AttributeFormProps) {
  const isEdit = Boolean(attribute);

  const { data, setData, post, put, processing, errors } = useForm({
    name: attribute?.name ?? '',
    type: attribute?.type ?? 'select',
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (isEdit && attribute) put(`/attributes/${attribute.id}`);
    else post('/attributes');
  };

  return (
    <div className="p-2 flex justify-center">
      <Card className="w-full rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{isEdit ? 'Edit Attribute' : 'Buat Attribute Baru'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="type">Type</Label>
              <Select value={data.type} onValueChange={(val) => setData('type', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
            </div>

            <div className="flex justify-end">
              <Button disabled={processing} className="rounded-xl">
                {isEdit ? 'Update Attribute' : 'Simpan Attribute'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
