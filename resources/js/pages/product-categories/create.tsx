import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import ProductCategoryForm from './components/product-category-form';

export default function CreateProductCategory({ parents }: { parents: { [key: number]: string } }) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Product Categories', href: '/product-categories' },
        { title: 'Create', href: '#' },
      ]}
    >
      <Head title="Create Product Category" />
      <ProductCategoryForm parents={parents} />
    </AppLayout>
  );
}
