<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wifi extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'location_name',
        'mac',
    ];

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('location_name', 'like', "%{$search}%")
                ->orWhere('mac', 'like', "%{$search}%");
        });
    }
}
