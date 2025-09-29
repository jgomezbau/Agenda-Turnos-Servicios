<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TemasController extends Controller
{
    public function show(Request $request)
    {
        $data = DB::table("dxtemas")->get();
        for ($i=0; $i < count($data); $i++) { 
            $temas[] = $data[$i];
        }
        return $temas;  
    }
}
