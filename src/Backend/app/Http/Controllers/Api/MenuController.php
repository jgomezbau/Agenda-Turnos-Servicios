<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{

    function show(Request $request)
    {
        $request->validate([
            "usuario" => "required"
        ]);
        $usuario = $request->usuario;
        $token = DB::table("personal_access_tokens")->where("user", "=", $request->usuario)->where("empresa", "!=", " ")->get("empresa");
        $nombreEmpresa = $token[0]->empresa;
        $Empresa = DB::table("JDP_empresa")->where("NombreEmpresa", "=", $nombreEmpresa)->get();
        $numEmpresa = $Empresa[0]->IDEmpresa;
        $menu = Menu::menus($usuario, $numEmpresa);
        return $menu;
      
    }
}
