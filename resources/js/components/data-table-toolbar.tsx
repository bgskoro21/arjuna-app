import { router } from "@inertiajs/react";
import { useState } from "react";

interface Props {
  search?: string;
  endpoint: string;
}

export default function DataTableToolbar({ search = "", endpoint }: Props) {
  const [value, setValue] = useState(search);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    router.get(
      endpoint,
      { search: value },
      { preserveState: true, replace: true }
    );
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="px-3 py-2 border rounded-lg w-64 focus:ring focus:ring-indigo-300"
      />
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Search
      </button>
    </form>
  );
}
