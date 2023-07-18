<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'id',
        'attributes',
        'device_id',
        'type',
        'event_time',
        'position_id',
        'geofence_id',
        'maintenance_id',
    ];
}
