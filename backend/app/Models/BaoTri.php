<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class BaoTri extends Model
{
    use SoftDeletes;

    protected $table = 'baotri';
    protected $primaryKey = 'MaBaoTri';

    protected $fillable = [
        'MaTaiSan',
        'NoiDung',
        'NgayBaoTri',
        'TinhTrang',
        'created_by',
        'assigned_to',
        'deleted_by',
        'updated_by'
    ];

    public function taisan()
    {
        return $this->belongsTo(TaiSan::class, 'MaTaiSan', 'MaTaiSan');
    }
    public function getTenTaiSanAttribute()
    {
        return $this->taisan->TenTaiSan ?? null;
    }
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
