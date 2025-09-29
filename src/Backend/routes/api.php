<?php

use App\Http\Controllers\Api\ClientesController;
//use App\Http\Controllers\Api\MenuController as ApiMenuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\EmpresasController;
use App\Http\Controllers\Api\TokenController;
use App\Http\Controllers\Api\AsistentesController;
use App\Http\Controllers\Api\GrillasController;
use App\Http\Controllers\Api\PartesController;
use App\Http\Controllers\Api\TemasController;
use App\Http\Controllers\Api\ConceptoController;
use App\Http\Controllers\Api\TipoTareasController;
use App\Http\Controllers\Api\UsuarioProduccionController;
use App\Http\Controllers\Api\TareasController;

Route::get('/', function () {
    try {
        Artisan::call('cache:clear');
        Artisan::call('config:cache');
        Artisan::call('route:cache');
        Artisan::call('view:clear');
    } catch (Throwable $e) {
        report($e);

        return false;
    }
});

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get("checkToken", [UserController::class, "checkToken"]);
    Route::get("logout", [UserController::class, "logout"]);
    Route::post("menu", [MenuController::class, "show"]);
    Route::post("updatetoken", [TokenController::class, "update"]);
    Route::post("empresas", [EmpresasController::class, "show"]);
    Route::get("pedirtemas",[TemasController::class,"show"]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});





