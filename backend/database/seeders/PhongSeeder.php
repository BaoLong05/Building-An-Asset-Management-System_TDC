<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhongSeeder extends Seeder
{
    public function run(): void
    {
        $data = [];

        for ($floor = 0; $floor <= 2; $floor++) {

            for ($room = 1; $room <= 3; $room++) {

                $roomNumber = str_pad($room, 2, '0', STR_PAD_LEFT);

                $baseCode = "B{$floor}{$roomNumber}";

                $data[] = ['TenPhong' => $baseCode . 'A'];
                $data[] = ['TenPhong' => $baseCode . 'B'];
            }
        }

        DB::table('phong')->insert($data);
    }
}