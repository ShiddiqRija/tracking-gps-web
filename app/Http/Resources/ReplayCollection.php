<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ReplayCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($item) {
            $positions = [
                'location' => $item->location,
                'latitude' => $item->latitude,
                'longitude' => $item->longitude,
                'device_time' => $item->device_time,
                'attributes' => json_decode($item->attributes),
                'network' => json_decode($item->network),
            ];

            return [
                'id' => $item->device->id,
                'device_id' => $item->device->device_id,
                'group_id' => $item->device->group_id,
                'name' => $item->device->name,
                'unique_id' => $item->device->unique_id,
                'status' => $item->device->status,
                'position' => $positions,
            ];
        });
    }
}
