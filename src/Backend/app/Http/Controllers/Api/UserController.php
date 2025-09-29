<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use App\Services\LastTokenService;
// User::where('name',$request->name)->update(['password'=>$request->password]);



class UserController extends Controller
{

    public function __construct(LastTokenService $service)
    {
        $this->lastTokenService = $service;
    }
    
    //-----Cerrar cesion-----

    public function logout(Request $request)
    {
        $JDP_token = $this->lastTokenService->getLastToken($request->bearerToken());
        $id = $JDP_token->id;
        
        try {
            PersonalAccessToken::select()->where('id', $id)->delete();
            return response()->json([
                "status" => 1,
                "msg" => "Logout"
            ]);
        } catch (\Throwable $th) {
            return $th;
        }
    }

    //----Verificar token---- 
    public function checkToken(Request $request)
    {
        $JDP_token = $this->lastTokenService->getLastToken($request->bearerToken());
        $id = $JDP_token->id;
        
        try {
            PersonalAccessToken::select()->where('id', $id)->get();
            return response()->json([
                "status" => 1,
                "msg" => "Check ok"
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => 0,
                "msg" => "Check ok"
            ]);
        }
    }
}
