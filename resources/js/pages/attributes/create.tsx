import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import AttributeForm from './components/attribute-form';

export default function CreateAttribute() {
  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Attributes', href: '/attributes' },
        { title: 'Create', href: '#' },
      ]}
    >
      <Head title="Create Attribute" />
      <div className="p-6">
        <AttributeForm />
      </div>
    </AppLayout>
  );
}
