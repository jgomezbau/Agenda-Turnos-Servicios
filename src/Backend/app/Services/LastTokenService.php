<?php


namespace App\Services;


use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\PersonalAccessToken;
class LastTokenService
{
    public function getLastToken($bearerToken)
    {
        return PersonalAccessToken::findToken($bearerToken);
    }
}
