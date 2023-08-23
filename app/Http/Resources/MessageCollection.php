<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MessageCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($item) {
            return [
                'id' => $item->id,
                'device_id' => $item->device->name,
                'unique_id' => $item->unique_id,
                'message' => $item->message,
                'send_time' => $item->send_time,
                'created_by' => $item->user->name,
            ];
        });
    }
}
