<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttributeValueController extends Controller
{
    public function create(Attribute $attribute)
    {
        return Inertia::render('attribute-values/create', [
            'attribute' => $attribute
        ]);
    }

    public function store(Request $request, Attribute $attribute)
    {
        $validated = $request->validate([
            'value' => 'required|string',
            'price_delta' => 'nullable|numeric',
        ]);

        $attribute->values()->create($validated);

        return redirect()->route('attributes.edit', $attribute->id)->with('success', 'Attribute value berhasil ditambahkan.');
    }

    public function edit(AttributeValue $value)
    {
        return Inertia::render('attribute-values/edit', [
            'value' => $value,
            'attribute' => $value->attribute
        ]);
    }

    public function update(Request $request, Attribute $attribute, AttributeValue $value)
    {
        $validated = $request->validate([
            'value' => 'required|string',
            'price_delta' => 'nullable|numeric',
        ]);

        $value->update($validated);

        return redirect()->route('attributes.edit', $value->attribute_id)->with('success', 'Attribute value berhasil diperbarui.');
    }

    public function destroy(Attribute $attribute, AttributeValue $value)
    {
        $attributeId = $value->attribute_id;
        $value->delete();

        return redirect()->route('attributes.edit', $attributeId)->with('success', 'Attribute value berhasil dihapus.');
    }
}
