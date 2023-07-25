<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'latitude',
        'longitude',
        'zoom',
        'created_at',
        'updated_at',
    ];
}
