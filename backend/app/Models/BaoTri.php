<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaoTri extends Model
{
    protected $table = 'baotri';

    protected $primaryKey = 'MaBaoTri';

    protected $fillable = [
        'MaTaiSan',
        'NgayBaoTri',
        'NoiDung',
        'ChiPhi',
        'TrangThai',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

    protected $dates = [
        'deleted_at'
    ];
}
