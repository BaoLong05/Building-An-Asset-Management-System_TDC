<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DanhMuc extends Model
{
    protected $table = 'danhmuc';
    protected $primaryKey = 'MaDanhMuc';

    protected $fillable = [
        'TenDanhMuc',
        'MoTa',
        'created_by',
        'updated_by',
        'deleted_by',
        ];
        
        protected $dates = [
        'deleted_at'

    ] ;
}
