<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmpresasController extends Controller
{
    function show(Request $request)
    {
        $request->validate([
            "user" => "required"
        ]);
        $empresas = DB::table('JDP_empresa')->select('JDP_empresa.idempresa', 'JDP_empresa.NombreEmpresa', 'JDP_empresa.NombreBD')
            ->get();

        $data = [];
        foreach ($empresas as $value) {
            $data[] = array("NombreEmpresa" => $value->NombreEmpresa, "NombreDB" => $value->NombreBD);
        }
        return $data;
    }
}
