import ConfirmDialog from '@/components/confirm-dialog'
import { DataTable } from '@/components/data-table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Filters, PaginationResult, User } from '@/types'
import { Head, Link, router} from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Plus, Trash2 } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard"
    },
    {
        title: "Users",
        href: "/users"
    },
]

interface UserPageProps{
  users: PaginationResult<User>;
  filters: Filters;
}

const UserPage = ({users, filters}: UserPageProps) => {

  const handleSort = (field: string) => {
    router.get(
      "/users",
      {
        ...filters,
        sort: field,
        direction: filters.direction === "asc" ? "desc" : "asc",
      },
      { preserveState: true, replace: true }
    );
  };

  const columns: ColumnDef<User>[] = [
    {
      header: () => (
        <button
          className="hover:underline"
          onClick={() => handleSort("id")}
        >
          ID
        </button>
      ),
      accessorKey: "id",
    },
    {
      header: () => (
        <button
          className="hover:underline"
          onClick={() => handleSort("name")}
        >
          Name
        </button>
      ),
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
        header: "Action",
        cell: ({ row }) => {
          const userId = row.original.id;

          return (
            <div className="flex gap-2">
              {/* Edit */}
              <Link href={`/users/${userId}/edit`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Detail
                </Button>
              </Link>

              {/* Delete */}
              <ConfirmDialog
                title="Hapus User?"
                description="User yang dihapus tidak bisa dikembalikan. Yakin ingin menghapus user ini?"
                onConfirm={() => router.delete(`/users/${userId}`)}
                confirmText='Ya, Hapus'
                trigger={
                  <Button variant="destructive" size="sm" className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Hapus
                  </Button>
                }
              />

            </div>
        );
      },
}

  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title='Users'/>
      <div className="space-y-4 p-4">
          <div className="flex justify-between">
            <h3 className='text-3xl'>Daftar User</h3>
             <Link
                href="/users/create"
                className="
                  inline-flex items-center gap-2 
                  px-4 py-2 rounded-lg 
                  bg-primary text-primary-foreground
                  hover:bg-primary/90
                  transition font-medium shadow-sm
                "
              >
                <Plus className="w-4 h-4" />
                Add User
            </Link>
          </div>
          <DataTable
            data={users}
            columns={columns}
            emptyMessage="Tidak ada data user"
            filters={filters}
            endpoint='/users'
          />
      </div>
    </AppLayout>
       
  )
}

export default UserPage