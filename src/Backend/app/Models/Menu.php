<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Menu extends Model
{
    use HasFactory;
    protected $table = "JDP_menus";
    public $timestamps = false;
    protected $casts = [
        'expanded' => 'bool',
    ];

    public function optionsMenu($usuario, $numEmpresa)
    {
        $usuario = $usuario;
        $empresa = $numEmpresa;

        $menu = Menu::distinct()
            ->join('JDP_rolatributo', 'JDP_menus.id', '=', 'JDP_rolatributo.idopcionmenu')
            ->join('JDP_rol', 'JDP_rolatributo.idrol', '=', 'JDP_rol.idrol')
            ->join('JDP_permiso', 'JDP_rol.idrol', '=', 'JDP_permiso.idrol')
            ->join('JDP_rutas', 'JDP_menus.id', '=', 'JDP_rutas.id_menu')
            ->where('JDP_permiso.idempresa', '=', $empresa)
            ->join('users', 'JDP_permiso.idusuario', '=', 'users.id')
            ->where('users.name', '=', $usuario)
            ->orderby('parent')
            ->orderby('text')
            ->get();
        $data = [];
        $cont = 0;
        foreach ($menu as $value) {
            $cont++;
            $data[] = array(
                "id" => $value->IDOpcionMenu,   
                "text" => $value->text,
                "expanded" => $value->expanded,
                "parent" => $value->parent,
                "enabled" => $value->enabled,
                "routeName" => $value->routeName,
                "get" => $value->get,
                "create" => $value->create,
                "edit" => $value->edit,
                "delete" => $value->delete,
                "reducer" => $value->nombres_reducer,
                "order" => $value->order
            );
        }
        return $data;
    }
    public function getChildren($data, $line)
    {
        $children = [];
        foreach ($data as $line1) {
            if ($line["id"] == $line1['parent']) {

                $children = array_merge($children, [array_merge($line1, ['items' => $this->getChildren($data, $line1)])]);
            }
        }
        return $children;
    }
    public static function menus($usuario, $numEmpresa)
    {
        $menus = new Menu();
        $data = json_decode(json_encode($menus->optionsMenu($usuario, $numEmpresa)), true);
        $menuAll = [];
        foreach ($data as $line) {
            if ($line["parent"] == 0) {
                $item = [array_merge($line, ['items' => $menus->getChildren($data, $line)])];
                $menuAll = array_merge($menuAll, $item);
            }
        }
        return  $menus->menuAll = $menuAll;
    }
}
