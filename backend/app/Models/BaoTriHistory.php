<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class BaoTriHistory extends Model
{
    protected $table = 'baotri_history';
    protected $primaryKey = 'MaLichSuBaoTri';

    protected $fillable = [
        'MaBaoTri',
        'MaTaiSan',
        'NoiDung',
        'NgayBaoTri',
        'TinhTrang',
        'created_by',
        'assigned_to',
        'updated_by',
    ];

    public function taisan()
    {
        return $this->belongsTo(TaiSan::class, 'MaTaiSan', 'MaTaiSan');
    }

    public function baotri()
    {
        return $this->belongsTo(BaoTri::class, 'MaBaoTri', 'MaBaoTri');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
