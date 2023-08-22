<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AppLocation;
use App\Models\Device;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // User::create([
        //     'name'      => 'Administrator',
        //     'email'     => 'admin@tracking.com',
        //     'password'  => bcrypt('password')
        // ]);

        // AppLocation::create([
        //     'latitude' => 0.0,
        //     'longitude' => 0.0,
        //     'zoom' => 0
        // ]);

        // Device::factory(50)->create();

        Message::factory(20)->create();
    }
}
