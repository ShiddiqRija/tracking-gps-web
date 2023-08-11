<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PositionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($item) {
            $positionData = $item->position;
            if ($positionData == null) {
                $positions = null;
            } else {
                $positions = [
                    'location' => $positionData->location,
                    'latitude' => $positionData->latitude,
                    'longitude' => $positionData->longitude,
                    'device_time' => $positionData->device_time,
                    'attributes' => json_decode($positionData->attributes),
                    'network' => json_decode($positionData->network),
                ];
            }

            return [
                'id' => $item->id,
                'device_id' => $item->device_id,
                'group_id' => $item->group_id,
                'name' => $item->name,
                'unique_id' => $item->unique_id,
                'status' => $item->status,
                'position' => $positions,
            ];
        });
    }
}
