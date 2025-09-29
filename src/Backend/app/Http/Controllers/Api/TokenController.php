<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\User;
use App\Services\LastTokenService;

class TokenController extends Controller
{
    public function __construct(LastTokenService $service)
    {
        $this->lastTokenService = $service;
    }
    function update(Request $request)
    {
        $JDP_token = $this->lastTokenService->getLastToken($request->bearerToken());
        $id = $JDP_token->id;
        PersonalAccessToken::select()->where('id', $id)->delete();
        
        $request->validate([
            "user" => "required",
            "empresa" => "required",
            "db" => "required"
        ]);
        $user = User::where("name", "=", $request->user)->first();
        if (isset($user->id)) {

            //Crear token
            $token = $user->createToken("auth_token", $user->name, $request->empresa, $request->db)->plainTextToken;


            return response()->json([
                "status" => 1,
                "acess_token" => $token
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "Usuario incorrecto"
            ], 404);
        }
    }
}
