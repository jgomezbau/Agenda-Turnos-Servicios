<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\JardinDelPilarController;

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

Route::post("loginJdp",[JardinDelPilarController::class,"login"]);

Route::group(["middleware" => ["auth:sanctum"]], function () {
    //rutas protegidas 
    Route::post("tiposucursal", [JardinDelPilarController::class, "spTipoSucursal"]);
    Route::post("sucursal", [JardinDelPilarController::class, "spSucursal"]);
    Route::post("unidad", [JardinDelPilarController::class, "spUnidad"]);
    Route::post("servicio", [JardinDelPilarController::class, "spServicio"]);
    Route::post("turnos", [JardinDelPilarController::class, "spTurnos"]);
    Route::get("SpClienteCRM", [JardinDelPilarController::class, "SpClienteCRM"]);
    Route::post("SpTipoEstadoTurno", [JardinDelPilarController::class, "SpTipoEstadoTurno"]);
    Route::post("SpTipoEstadoTurnoHabilitado", [JardinDelPilarController::class, "SpTipoEstadoTurnoHabilitado"]);
    Route::post("SpPresupuestos", [JardinDelPilarController::class, "SpPresupuestos"]);
    Route::post("SpVersion", [JardinDelPilarController::class, "SpVersion"]);
    Route::post("spValidarTurnos", [JardinDelPilarController::class, "spValidarTurnos"]);
    Route::post("SPGrabarTurno", [JardinDelPilarController::class, "SPGrabarTurno"]);
    Route::post("SpClienteCRMFILTRADO", [JardinDelPilarController::class, "SpClienteCRMFILTRADO"]);
    Route::get("armarAdicionales", [JardinDelPilarController::class, "armarAdicionales"]);
    Route::post("Adicionales", [JardinDelPilarController::class, "Adicionales"]);
    Route::post("spSectorHabilitado", [JardinDelPilarController::class, "spSectoresHabilitados"]);
    Route::get("getLicense", [JardinDelPilarController::class, "getLicense"]);
    Route::post('/bloquearSala', [JardinDelPilarController::class, 'bloquearSala']);
    Route::post('bloqueos', [JardinDelPilarController::class, 'getBloqueos']);
    Route::post('desactivarBloqueo', [JardinDelPilarController::class, 'desactivarBloqueo']);
    Route::post("getAutorizador", [JardinDelPilarController::class, "getAutorizador"]);
    Route::post("grillaTurnosComplete", [JardinDelPilarController::class, "spGrillaTurnosComplete"]);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});