<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'device_id',
        'unique_id',
        'message',
        'send_time',
        'created_by',
        'created_at',
        'updated_at',
    ];

    public function device()
    {
        return $this->hasOne(Device::class, 'device_id', 'device_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'created_by');
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereHas('device', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orWhere('unique_id', 'like', "%{$search}%")
            ->orWhere('message', 'like', "%{$search}%")
            ->orWhere('send_time', 'like', "%{$search}%")
            ->orWhereHas('user', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            });
        });
    }
}
