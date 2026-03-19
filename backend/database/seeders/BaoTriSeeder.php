<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TaiSan;
use App\Models\BaoTri;

class BaoTriSeeder extends Seeder
{
    public function run(): void
    {
        $assets = TaiSan::where('TinhTrang', 'Tốt')
            ->inRandomOrder()
            ->limit(15)
            ->get();

        foreach ($assets as $asset) {

            $exists = BaoTri::where('MaTaiSan', $asset->MaTaiSan)
                ->where('TinhTrang', 'Đang bảo trì')
                ->exists();

            if (!$exists) {

                BaoTri::create([
                    'MaTaiSan' => $asset->MaTaiSan,
                    'NgayBaoTri' => now(),
                    'NoiDung' => 'Bảo trì tài sản: ' . $asset->TenTaiSan,
                    'TinhTrang' => 'Đang bảo trì',
                    'created_by' => 1
                ]);

                $asset->update([
                    'TinhTrang' => 'Đang bảo trì'
                ]);
            }
        }
    }
}