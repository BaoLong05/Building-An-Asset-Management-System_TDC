<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Phong extends Model
{
    protected $table = 'phong';
    protected $primaryKey = 'MaPhong';

    protected $fillable = [
        'TenPhong',
        'ViTri',
        'created_by',
        'updated_by',
        'deleted_by'
     ];

     protected $dates = [
        'deleted_at',
     ];
}
