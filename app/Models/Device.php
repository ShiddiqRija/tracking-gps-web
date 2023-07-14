<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'device_id',
        'group_id',
        'name',
        'unique_id',
        'status',
        'last_update',
        'position_id',
        'phone',
        'contact',
        'created_by',
        'created_at',
        'updated_at',
    ];
}
