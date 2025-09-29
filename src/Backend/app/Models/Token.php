<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;
    protected $table="personal_access_tokens";
    public $timestamps = false;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d',
        "last_used_at" => 'datetime:Y-m-d',
        "expires_at" => 'datetime:Y-m-d'
    ];
}
