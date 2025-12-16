<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProductCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'parent_id',
    ];

    protected static function booted()
    {
        static::saving(function ($category) 
        {
            if (empty($category->slug) && !empty($category->name)) 
            {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    // Self referencing parent
    public function parent()
    {
        return $this->belongsTo(ProductCategory::class, 'parent_id');
    }

    // Self referencing children
    public function children()
    {
        return $this->hasMany(ProductCategory::class, 'parent_id');
    }

    // Many-to-Many ke products
    public function products()
    {
        return $this->belongsToMany(Product::class, 'category_product');
    }
}
