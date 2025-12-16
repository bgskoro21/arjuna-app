import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ProductCategoryForm from './components/product-category-form';

export default function EditProductCategory({
  category,
  parents,
}: {
  category: { id: number; name: string; slug: string; parent_id?: number | null };
  parents: { [key: number]: string };
}) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Product Categories', href: '/product-categories' },
        { title: 'Edit', href: '#' },
      ]}
    >
      <Head title="Edit Product Category" />
      <ProductCategoryForm category={category} parents={parents} />
    </AppLayout>
  );
}
