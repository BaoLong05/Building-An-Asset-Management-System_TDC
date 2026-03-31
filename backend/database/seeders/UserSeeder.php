<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 'admin',
            'status' => 1,
            'last_activity_at' => now(),
        ]);

        User::create([
            'name' => 'User 1',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('123456'),
            'status' => 1,
            'last_activity_at' => now(),
        ]);

        User::create([
            'name' => 'Locked User',
            'email' => 'locked@gmail.com',
            'password' => Hash::make('123456'),
            'status' => 0,
            'last_activity_at' => now(),
        ]);
    }
}
