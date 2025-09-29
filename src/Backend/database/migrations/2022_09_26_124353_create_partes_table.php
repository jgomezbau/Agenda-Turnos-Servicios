<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // DB::unprepared('DROP PROCEDURE IF EXISTS partesAll;');
        // DB::unprepared('CREATE PROCEDURE partesAll ()
        // BEGIN
        //     SELECT * FROM partes;
        // END;
        // ');
        Schema::create('partes', function (Blueprint $table) {
            $table->id();
            $table->date('Fecha');
            $table->string('Cliente');
            $table->time('Horas');
            $table->string('Proyecto');
            $table->string('Descripcion');
            $table->boolean('Sin_cargo');
            $table->boolean('Presencial')->nullable();
            $table->string('Asistente');
        });
    }
   
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partes');
    }
};
