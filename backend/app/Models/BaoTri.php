<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BaoTri extends Model
{
    use SoftDeletes;

    protected $table = 'baotri';
    protected $primaryKey = 'MaBaoTri';

    protected $fillable = [
        'MaTaiSan',
        'NoiDung',
        'NgayBaoTri',
        'TrangThai',
        'created_by',
        'deleted_by',
        'updated_by'
    ];

    public function taisan()
    {
        return $this->belongsTo(TaiSan::class, 'MaTaiSan');
    }
}
