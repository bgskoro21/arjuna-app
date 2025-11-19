import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { router } from "@inertiajs/react";
import { PaginationResult } from "@/types";
import { useEffect, useState } from "react";

interface DataTableProps<TData> {
  endpoint: string;
  data: PaginationResult<TData>;
  columns: ColumnDef<TData, any>[];
  filters: any;
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<TData>({
  endpoint,
  data,
  columns,
  filters,
  loading = false,
  emptyMessage = "Tidak ada data",
}: DataTableProps<TData>) {

  const [search, setSearch] = useState(filters.search ?? "");

  // debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      router.get(
        endpoint,
        { ...filters, search, page: 1 },
        { preserveState: true, replace: true }
      );
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const changePage = (url: string | null) => {
    if (!url) return;
    router.visit(url, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const changePerPage = (value: number) => {
    router.get(
      endpoint,
      {
        ...filters,
        page: 1,
        perPage: value,
      },
      { preserveState: true, replace: true }
    );
  };

  return (
    <div className="space-y-4">

      {/* TOP BAR: Search + Show Entries */}
      <div className="flex items-center justify-between flex-wrap gap-3">

          {/* Show Entries */}
        <div className="flex items-center gap-2 text-sm">
          <span>Show</span>

          <select
            value={data.per_page}
            onChange={(e) => changePerPage(Number(e.target.value))}
            className="border rounded-sm px-2 py-1 bg-background dark:bg-background-dark"
          >
            {[10, 25, 50, 100].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

          <span>entries</span>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              border rounded-lg px-3 py-2 w-64
              bg-background text-gray-900 
              dark:bg-background-dark dark:text-gray-100
              focus:ring-primary focus:border-primary
            "
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg bg-background dark:bg-background-dark">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="p-3 text-left font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Loading */}
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={columns.length} className="p-6 text-center">
                  <div className="animate-pulse text-gray-500">
                    Loading...
                  </div>
                </td>
              </tr>
            </tbody>
          ) : data.data.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={columns.length} className="p-6 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">

        {/* Showing X to Y of Z */}
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Showing {data.from} to {data.to} of {data.total} entries
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {data.links.map((link, i) => (
            <button
              key={i}
              disabled={!link.url}
              className={`px-3 py-2 rounded-lg border transition
                ${
                  link.active
                    ? "bg-primary text-primary-foreground"
                    : "bg-background dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-gray-700"
                }
              `}
              onClick={() => changePage(link.url)}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
