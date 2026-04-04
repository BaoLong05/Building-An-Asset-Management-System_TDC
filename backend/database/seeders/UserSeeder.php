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
            'name' => 'user 1',
            'email' => 'baolongblog123@gmail.com',
            'password' => Hash::make('Long123@'),
            'phone' => '0890779767',
            'address' => 'tp Hồ Chí Minh',
            'role' => 'user',
            'status' => 1,
            'last_activity_at' => now(),
        ]);

        User::create([
            'name' => 'user 2',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('Long123@'),
             'phone' => '0890779767',
            'address' => 'tp Hồ Chí Minh',
            'status' => 1,
            'last_activity_at' => now(),
        ]);
    }
}
