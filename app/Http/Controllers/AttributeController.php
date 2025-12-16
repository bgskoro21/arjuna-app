<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttributeController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'id');
        $direction = $request->get('direction', 'asc');

        $attributes = Attribute::with('values')
            ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('attributes/index', [
            'attributes' => $attributes,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    public function create()
    {
        return Inertia::render('attributes/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:select,number,text',
        ]);

        Attribute::create($validated);

        return redirect()->route('attributes.index')->with('success', 'Attribute berhasil dibuat.');
    }

    public function edit(Attribute $attribute)
    {
        // Form attribute
        $attribute = $attribute;

        // Paginate values
        $values = $attribute->values()->paginate(10);

        return Inertia::render('attributes/edit', [
            'attribute' => $attribute,
            'values' => $values,
        ]);
    }

    public function update(Request $request, Attribute $attribute)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:select,number,text',
        ]);

        $attribute->update($validated);

        return redirect()->route('attributes.index')->with('success', 'Attribute berhasil diperbarui.');
    }

    public function destroy(Attribute $attribute)
    {
        $attribute->delete();
        return redirect()->route('attributes.index')->with('success', 'Attribute berhasil dihapus.');
    }
}
