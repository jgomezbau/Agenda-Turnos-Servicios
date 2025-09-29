<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UserJDP extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    // protected $connection = 'JDP';
    protected $table="CRM_Vendedores";
    protected $fillable = [
        'nombre'
    ];

    public $timestamps=false;

    // protected $casts = [
    //     'created_at' => 'datetime:YMD' ,
    //     'updated_at' => 'datetime:YMD'
    // ];
    // protected $hidden = [
    //     'password',
    //     'remember_token',
    // ];

    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];
    // protected $casts = [
    //     'supervisor' => 'integer',
    // ];
}
