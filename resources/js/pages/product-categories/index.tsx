import ConfirmDialog from '@/components/confirm-dialog'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Filters, PaginationResult } from '@/types'
import { Head, Link, router } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Plus, Trash2 } from 'lucide-react'

interface ProductCategory {
    id: number
    name: string
    slug: string
    parent?: { name: string } | null
}

interface ProductCategoryPageProps {
    categories: PaginationResult<ProductCategory>
    filters: Filters
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Product Categories", href: "/product-categories" },
]

const ProductCategoryPage = ({ categories, filters }: ProductCategoryPageProps) => {
    const handleSort = (field: string) => {
        router.get(
            "/product-categories",
            { ...filters, sort: field, direction: filters.direction === "asc" ? "desc" : "asc" },
            { preserveState: true, replace: true }
        )
    }

    const columns: ColumnDef<ProductCategory>[] = [
        {
            header: () => <button onClick={() => handleSort("id")} className="hover:underline">ID</button>,
            accessorKey: "id",
        },
        {
            header: () => <button onClick={() => handleSort("name")} className="hover:underline">Name</button>,
            accessorKey: "name",
        },
        {
            header: "Slug",
            accessorKey: "slug",
        },
        {
            header: "Parent",
            cell: ({ row }) => row.original.parent?.name || "-",
        },
        {
            header: "Action",
            cell: ({ row }) => {
                const categoryId = row.original.id
                return (
                    <div className="flex gap-2">
                        <Link href={`/product-categories/${categoryId}/edit`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Pencil className="w-4 h-4" /> Edit
                            </Button>
                        </Link>

                        <ConfirmDialog
                            title="Hapus Kategori?"
                            description="Kategori yang dihapus tidak bisa dikembalikan. Yakin ingin menghapus?"
                            onConfirm={() => router.delete(`/product-categories/${categoryId}`)}
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
        }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Categories" />
            <div className="space-y-4 p-4">
                <div className="flex justify-between">
                    <h3 className="text-3xl">Daftar Kategori Produk</h3>
                    <Link
                        href="/product-categories/create"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium shadow-sm"
                    >
                        <Plus className="w-4 h-4" /> Add Category
                    </Link>
                </div>

                <DataTable
                    data={categories}
                    columns={columns}
                    emptyMessage="Tidak ada kategori"
                    filters={filters}
                    endpoint="/product-categories"
                />
            </div>
        </AppLayout>
    )
}

export default ProductCategoryPage
