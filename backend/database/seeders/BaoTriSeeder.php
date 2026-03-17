<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TaiSan;
use App\Models\BaoTri;


class BaoTriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $assets = TaiSan::inRandomOrder()->limit(15)->get();

        foreach($assets as $asset){
            BaoTri::create([
                'MaTaiSan' => $asset->MaTaiSan,
                'NgayBaoTri' => now(),
                'NoiDung' => 'Bảo Trì Tài Sản' . $asset->TenTaiSan,
                'ChiPhi' => rand(20000,1000000),
                'TrangThai' => 'Đang Xử Lý',
                'created_by' => 1
            ]);
        }
    }
}
