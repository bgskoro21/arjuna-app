<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCustomField extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'label',
        'type',
        'is_required',
        'price_per_unit',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
