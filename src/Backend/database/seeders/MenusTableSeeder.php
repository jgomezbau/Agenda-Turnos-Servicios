<?php

namespace Database\Seeders;
use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $menu = new Menu();
        $menu->text = "Opción 1";
        
        $menu->parent = 0;
        $menu->order = 0;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 2";
       
        $menu->parent = 0;
        $menu->order = 1;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 3";
       
        $menu->parent = 0;
        $menu->order = 2;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 4";
        
        $menu->parent = 0;
        $menu->order = 3;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 5";
        
        $menu->parent = 0;
        $menu->order = 4;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 1.1";
        
        $menu->parent = 1;
        $menu->order = 0;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 1.2";
        $menu->routeName = "pruebaproceso";
        $menu->parent = 1;
        $menu->order = 1;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 3.1";
        
        $menu->parent = 3;
        $menu->order = 0;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 3.2";
       
        $menu->parent = 3;
        $menu->order = 1;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 4.1";
        
        $menu->parent = 4;
        $menu->order = 0;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 3.2.1";

        $menu->parent = 8;
        $menu->order = 0;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 3.2.2";
       
        $menu->parent = 8;
        $menu->order = 1;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 3.2.3";
        
        $menu->parent = 8;
        $menu->order = 2;
        $menu->save();

        $menu = new Menu();
        $menu->text = "Opción 5.1";
        
        $menu->parent = 5;
        $menu->order = 0;
        $menu->save();
    
    
    }
}
