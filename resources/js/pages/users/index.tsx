import { DataTable } from '@/components/data-table'
import DataTableToolbar from '@/components/data-table-toolbar'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Filters, PaginationResult, User } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

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
      cell: ({ row }) => (
        <a
          href={`/users/${row.original.id}`}
          className="text-indigo-600 hover:underline"
        >
          Detail
        </a>
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-4 p-4">
          <h3 className='text-3xl'>Daftar User</h3>
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