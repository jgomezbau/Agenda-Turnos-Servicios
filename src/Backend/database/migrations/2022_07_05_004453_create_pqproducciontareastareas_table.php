<?php

use App\Models\Operacion;
use App\Models\TipoTareas;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePqproducciontareastareasTable extends Migration
{
    // protected $connection = 'mysql';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('JDP_PRODUCCIONTAREAS_TAREAS', function (Blueprint $table) {
            $table->id();
            $table->string('usuario_tango_supervisor', 50)->nullable();
            $table->dateTime('fecha');
            $table->bigInteger('id_tipo_tarea');
            $table->bigInteger( 'id_operacion')->nullable();
            $table->char('id_ot', 13)->nullable();
            $table->char('id_pieza', 15)->nullable();
            $table->bigInteger('id_maquina')->nullable();
            $table->decimal('cant_teorica', 16, 6)->nullable();
            $table->string('observaciones', 255)->nullable();
            $table->string('usuario_tango', 50)->nullable();
            $table->decimal('horas_teorica', 15,2)->nullable();
            $table->decimal('piezas_hora', 8,4)->nullable();

            $table->boolean('asignado')->nullable();
            $table->bigInteger('id_concepto');
            $table->decimal('cant_real', 16, 6);
            $table->decimal('hora_desde', 4, 2);
            $table->decimal('hora_hasta', 4, 2);
            $table->decimal('horas_real', 4, 2)->nullable();
            $table->string('usuario_tango_revision', 50)->nullable();
            $table->datetime('fecha_revision')->nullable();
            $table->decimal('horas_np')->nullable();
            $table->integer('renglon')->nullable();
            $table->integer('primero')->nullable();
            $table->integer('editado')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pqproducciontareastareas');
    }
}
