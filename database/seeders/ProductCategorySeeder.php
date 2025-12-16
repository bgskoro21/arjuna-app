<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parentCategories = [
            'Signage',
            'Vehicles Plate',
            'Stainless Products',
            'Stamp & Seal',
        ];

        foreach ($parentCategories as $parentName) 
        {
            $parent = ProductCategory::create([
                'name' => $parentName,
                'slug' => Str::slug($parentName),
                'parent_id' => null,
            ]);

            // Tambahkan beberapa child category dummy
            for ($i = 1; $i <= 3; $i++) {
                ProductCategory::create([
                    'name' => $parentName . ' Sub ' . $i,
                    'slug' => Str::slug($parentName . ' Sub ' . $i),
                    'parent_id' => $parent->id,
                ]);
            }
        }
    }
}
