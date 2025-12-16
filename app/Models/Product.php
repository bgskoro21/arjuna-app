<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'base_price',
        'sku',
        'is_customizable',
        'status',
    ];

    // Many-to-Many ke categories
    public function categories()
    {
        return $this->belongsToMany(ProductCategory::class, 'category_product');
    }

    // Many-to-Many ke attributes
    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'product_attributes');
    }

    // Custom Fields
    public function customFields()
    {
        return $this->hasMany(ProductCustomField::class);
    }
}
