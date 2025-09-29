<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePqproducciontareasusuariosTable extends Migration
{
    // protected $connection = 'mysql';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('JDP_PRODUCCIONTAREAS_USUARIOS', function (Blueprint $table) {
            $table->id();
            $table->integer('nro_legajo');
            $table->string('nombre');
            $table->string('nombrecompleto');
            $table->boolean('supervisor');
            $table->string('usuario_tango');
            $table->string('clave_web');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('JDP_PRODUCCIONTAREAS_USUARIOS');
    }
}
