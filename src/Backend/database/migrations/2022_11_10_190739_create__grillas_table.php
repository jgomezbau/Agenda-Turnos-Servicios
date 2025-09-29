<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('grillas', function (Blueprint $table) {
            $table->id();
            $table->integer('id_usuario');
            $table->string('Nombre_grilla');
            $table->text('Estructura');
            $table->string('ABM');  

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('grillas');
    }
};
