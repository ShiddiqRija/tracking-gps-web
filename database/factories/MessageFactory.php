<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'device_id' => 1,
            'unique_id' => 98465143216546,
            'message' => fake()->sentence(3),
            'send_time' => 	round(microtime(true) * 1000),
            'created_by' => 1,
        ];
    }
}
