<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'id',
        'device_id',
        'location',
        'latitude',
        'longitude',
        'server_time',
        'device_time',
        'attributes',
        'network',
        'created_at',
        'updated_at',
    ];

    public function device()
    {
        return $this->hasOne(Device::class, 'device_id', 'device_id');
    }
}
