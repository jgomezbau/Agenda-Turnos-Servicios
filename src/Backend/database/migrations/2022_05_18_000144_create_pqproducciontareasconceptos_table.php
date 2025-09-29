<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePqproducciontareasconceptosTable extends Migration
{
    // protected $connection = 'mysql';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('JDP_PRODUCCIONTAREAS_CONCEPTOS', function (Blueprint $table) {
            $table->id();
            $table->string('cod_concepto', 10);
            $table->string('descripcion', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pqproducciontareasconceptos');
    }
}
