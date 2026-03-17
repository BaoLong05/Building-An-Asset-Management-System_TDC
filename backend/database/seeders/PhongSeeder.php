<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhongSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('phong')->insert([
            ['TenPhong' => 'Phòng IT'],
            ['TenPhong' => 'Phòng họp'],
            ['TenPhong' => 'Phòng làm việc'],
            ['TenPhong' => 'Phòng kế toán'],
            ['TenPhong' => 'Phòng nhân sự'],
            ['TenPhong' => 'Phòng giám đốc'],
            ['TenPhong' => 'Phòng phó giám đốc'],
            ['TenPhong' => 'Phòng tiếp khách'],
            ['TenPhong' => 'Phòng marketing'],
            ['TenPhong' => 'Phòng kinh doanh'],
            ['TenPhong' => 'Phòng đào tạo'],
            ['TenPhong' => 'Phòng nghiên cứu'],
            ['TenPhong' => 'Phòng kỹ thuật'],
            ['TenPhong' => 'Phòng bảo trì'],
            ['TenPhong' => 'Phòng bảo vệ'],
            ['TenPhong' => 'Phòng kho'],
            ['TenPhong' => 'Phòng máy chủ'],
            ['TenPhong' => 'Phòng hội nghị'],
            ['TenPhong' => 'Phòng sáng tạo'],
            ['TenPhong' => 'Phòng dự án']
        ]);
    }
}