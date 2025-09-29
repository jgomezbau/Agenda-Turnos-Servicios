<?php
namespace App\Http\Controllers;


    use Illuminate\Http\Request;
    use App\Models\User;
    use App\Models\UserJDP;
    use Illuminate\Support\Arr;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Log;

    use SimpleXMLElement;

    class JardinDelPilarController extends Controller
    {

        public function login(Request $request)
        {
            $request->validate([
                "usuario" => "required|String"
            ]);
            $user = User::where("name", "=", $request->usuario)->first();

            if (isset($user->id)) {
                //Creamos token
                $token = $user->createToken("auth_token", strval($user->name), "JDP", "JDP")->plainTextToken;
                return response()->json([
                    "status" => 1,
                    "msg" => "¡Login Exitoso!",
                    "usuario" => $user->name,
                    "acess_token" => $token,
                    "supervisor" => $user->supervisor,
                    "id" => $user->id
                ]);
            } else {
                return response()->json([
                    "status" => 0,
                    "msg" => "Usuario incorrecto"
                ], 404);
            }
        }

        public function spTipoSucursal(Request $request)
        {
            return DB::connection("JDP")->select('exec JDP_TUR_SpTipoSucursal ?', array($request->usuario));
        }
        public function spSucursal(Request $request)
        {
            $request->validate([
                "idTipoSucursal" => "required|Integer"
            ]);
            $id = intval($request->idTipoSucursal);
            return DB::connection("JDP")->select('exec JDP_TUR_SpSucursal ?,?', array($id, $request->usuario));
        }
        public function spUnidad(Request $request)
        {
            $request->validate([
                "idSucursal" => "required|Integer"
            ]);
            $id = intval($request->idSucursal);
            return DB::connection("JDP")->select('exec JDP_TUR_SpUnidad ?,?', array($id, $request->usuario));
        }
        public function spServicio(Request $request)
        {
            $request->validate([
                "idTipoSucursal" => "required|Integer"
            ]);
            $id = intval($request->idTipoSucursal);
            return DB::connection("JDP")->select('exec JDP_TUR_SpServicio ?,?', array($id, $request->usuario));
        }
        public function spTurnos(Request $request)
        {
            $request->validate([
                "desde" => "required",
                "hasta" => "required",
                "idUnidad" => "required",
                "idServicio" => "required"
            ]);
            return DB::connection("JDP")->select(
                'exec JDP_TUR_SpGrillaTurnos2 ?,?,?,?',
                array($request->idUnidad, $request->idServicio, $request->desde, $request->hasta)
            );
        }
        public function SpClienteCRM(Request $request)
        {
            return DB::connection("JDP")->select('exec JDP_TUR_SpClienteCRM');
        }
        public function SpClienteCRMFILTRADO(Request $request)
        {
            return DB::connection("JDP")->select('exec JDP_TUR_SpClienteCRMFiltrado ?', array($request->filtro));
        }
        public function SpTipoEstadoTurno(Request $request)
        {
            return DB::connection("JDP")->select('exec JDP_TUR_spTipoEstadosTurno');
        }
        public function SpTipoEstadoTurnoHabilitado(Request $request)
        {
            return DB::connection("JDP")->select('exec JDP_TUR_SPTIPO_ESTADOS_TURNO_HABILITADOS ?,?,?,?', array(intval($request->estado), $request->usuario, intval($request->idServicio), intval($request->idUnidad)));
        }

        public function SpPresupuestos(Request $request)
        {
            $request->validate([
                "idCliente" => "required"
            ]);
            return DB::connection("JDP")->select('exec JDP_TUR_SPPRESUPUESTOS ?', array($request->idCliente));
        }
        public function SpVersion(Request $request)
        {
            $request->validate([
                "idPresupuesto" => "required",
            ]);
            return DB::connection("JDP")->select('exec JDP_TUR_SPPRESUPUESTOSVERSION ?,?', array($request->idPresupuesto, $request->idCliente));
        }
        public function spValidarTurnos(Request $request)
        {
   
            $result = DB::connection("JDP")->select(
                'exec JDP_TUR_SPValidarTurno ?,?,?,?,?,?,?,?,?,?,?,?,?,?',
                array(
                    $request->desde,
                    $request->hasta,
                    $request->unidad,
                    $request->servicio,
                    $request->cliente,
                    $request->presupuesto,
                    $request->version,
                    $request->estado,
                    $request->observaciones,
                    $request->usuario,
                    intval($request->turno),
                    $request->ultima_actualizacion,
                    $request->sectorSolicitante,
                    $request->id_un_servicio
                )
            );
    
            return $result;
        }
        public function SPGrabarTurno(Request $request)
        {
            $datos = $request->adicionales;
            if (!is_null($datos)) {
    
                // Función para convertir un array asociativo a XML
                function arrayToXml($datos, &$xmlData)
                {
                    foreach ($datos as $clave => $valor) {
                        if (is_array($valor)) {
                            if (!is_numeric($clave)) {
                                $subElemento = $xmlData->addChild("$clave");
                                arrayToXml($valor, $subElemento);
                            } else {
                                arrayToXml($valor, $xmlData);
                            }
                        } else {
                            $xmlData->addChild("$clave", htmlspecialchars("$valor"));
                        }
                    }
                }
                $xmlData = new SimpleXMLElement('<?xml version="1.0"?><datos></datos>');
                arrayToXml($datos, $xmlData);
                $adicionales = $xmlData->asXML();
            } else {
                $xmlData = new SimpleXMLElement('<?xml version="1.0"?><datos></datos>');
                $adicionales = $xmlData->asXML();
            }
    
            $result = DB::connection("JDP")->select(
                'exec JDP_TUR_SPGrabarTurno ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',
                array(
                    intval($request->turno),
                    $request->desde,
                    $request->hasta,
                    $request->unidad,
                    $request->servicio,
                    $request->cliente,
                    $request->presupuesto,
                    $request->version,
                    $request->estado,
                    $request->observaciones,
                    $request->usuario,
                    $request->fallecido,
                    $request->sectorSolicitante,
                    $adicionales,
                    $request->id_un_servicio
                )
            );
    
            return $result;
        }
    
        public function armarAdicionales(Request $request)
        {
            return DB::connection("JDP")->select('exec JDP_TUR_SPGRILLASERVICIOSADICIONALES');
        }
        public function Adicionales(Request $request)
        {
            return DB::connection("JDP")->select('exec JDP_TUR_SPTURNO_UNIDAD_SERVICIOS_ADICIONALES ?,?,?', array($request->turno, $request->unidad, $request->servicio));
        }
        public function spSectoresHabilitados(Request $request)
        {
            return DB::connection("JDP")->select('exec JDP_TUR_SPSectoresHabilitados ?,?', array($request->usuario,$request->sector));
        }
        public function getLicense()
        {
            // Obtener la licencia desde la base de datos
            $license = DB::connection("sqlsrv")->table('JDP_Empresa')->select('licencia')->first();
        
            // Devolver la licencia como JSON
            if ($license) {
                return response()->json(['licencia' => $license->licencia]);
            } else {
                return response()->json(['message' => 'Licencia no encontrada'], 404);
            }
        }
        public function bloquearSala(Request $request)
        {
            // Validar los datos entrantes
            $validated = $request->validate([
                'id_turno' => 'nullable|integer',
                'id_servicio' => 'nullable|integer',
                'id_unidad' => 'nullable|integer',
                'fecha_desde' => 'required|date',
                'fecha_hasta' => 'required|date',
                'observaciones' => 'nullable|string',
                'estado_grilla' => 'nullable|integer',
                'usuario' => 'nullable|string',
            ]);
            try {
                // Convertir las fechas al formato adecuado para SQL Server
                $fechaDesde = \Carbon\Carbon::parse($validated['fecha_desde'])->format('Y-m-d H:i:s');
                $fechaHasta = \Carbon\Carbon::parse($validated['fecha_hasta'])->format('Y-m-d H:i:s');

                // Ejecutar el procedimiento almacenado y capturar el valor de salida
                $result = DB::connection('JDP')->statement('
                    DECLARE @resp VARCHAR(MAX);
                    EXEC dbo.JDP_TUR_SpBloqueaSalas ?,?, ?, ?, ?, ?, ?, ?, @resp OUTPUT;
                    SELECT @resp AS resp;
                ', [
                    $validated['id_turno'],
                    $validated['id_servicio'],
                    $validated['id_unidad'],
                    $fechaDesde,
                    $fechaHasta,
                    $validated['observaciones'],
                    $validated['usuario'],
                    $validated['estado_grilla'],
                ]);

                //return response()->json(['message' => $result], 200);
                // Capturar el valor de 'resp' del resultado
                // Verificar si se obtuvo una respuesta
                if (!empty($result) && isset($result[0]->resp)) {
                    $message = $result[0]->resp;
                } else {
                    $message = 'No se obtuvo respuesta del procedimiento, por favor verifica los parámetros de entrada y la lógica del procedimiento almacenado.';
                }
            return response()->json(['message' => $result], 200);            

            } catch (\Exception $e) {
                // Obtener el mensaje de error completo
                $errorMessage = $e->getMessage();

                // Usar una expresión regular para capturar solo el mensaje relevante
                if (preg_match('/SQL Server\] - (.*)/', $errorMessage, $matches)) {
                    // Captura solo el mensaje de error
                    $cleanMessage = $matches[1]; // El grupo 1 contiene el mensaje de error después de 'SQL Server] - '
                    // Limpiar el mensaje eliminando cualquier texto después de la descripción del error
                    $cleanMessage = trim(explode('(SQL:', $cleanMessage)[0]); 
                } else {
                    // Si no encuentra coincidencias, usa el mensaje completo
                    $cleanMessage = $errorMessage;
                }
                // Retornar solo el mensaje filtrado
                return response()->json(['message' => $cleanMessage], 500);
                }
        }
        public function getBloqueos(Request $request)
        {
            $usuario = $request->usuario;
            return DB::connection("JDP")->select('exec JDP_TUR_SpObtenerBloqueos ?', [$usuario]);
        }
        
    // Método para desactivar un bloqueo
    public function desactivarBloqueo(Request $request)
    {
        // Validar los datos entrantes
        $validated = $request->validate([
            'id' => 'required|integer',
            'habilitado' => 'required|integer',
        ]);

        try {
            // Ejecutar el procedimiento almacenado para desactivar el bloqueo
            $result = DB::connection('JDP')->select('
                EXEC JDP_TUR_SpDesactivarBloqueo ?, ?;
            ', [$validated['id'], $validated['habilitado']]);

            // Verificar si la respuesta del procedimiento es correcta
            if (!empty($result)) {
                return response()->json([
                    'status' => 200,
                    'message' => $result[0]->message
                ]);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'No se pudo desactivar el bloqueo. El procedimiento almacenado no devolvió resultados.'
                ], 500);
            }
        } catch (\Exception $e) {
                // Obtener el mensaje de error completo
                $errorMessage = $e->getMessage();

                // Usar una expresión regular para capturar solo el mensaje relevante
                if (preg_match('/SQL Server\] - (.*)/', $errorMessage, $matches)) {
                    // Captura solo el mensaje de error
                    $cleanMessage = $matches[1]; // El grupo 1 contiene el mensaje de error después de 'SQL Server] - '
                    // Limpiar el mensaje eliminando cualquier texto después de la descripción del error
                    $cleanMessage = trim(explode('(SQL:', $cleanMessage)[0]); 
                } else {
                    // Si no encuentra coincidencias, usa el mensaje completo
                    $cleanMessage = $errorMessage;
                }
                // Retornar solo el mensaje filtrado
                return response()->json(['message' => $cleanMessage], 500);
                }
        }
        public function getAutorizador(Request $request)
        {
            $request->validate([
                "id_unidad_negocio" => "required|integer",
                "usuario" => "required|string",
            ]);
        
            try {
                // Ejecutar el procedimiento almacenado
                $resultado = DB::connection("JDP")->select('exec JDP_TUR_SpgetAutorizador ?, ?', [
                    $request->id_unidad_negocio,
                    $request->usuario
                ]);
        
                // Retornar respuesta basada en el resultado
                if (!empty($resultado)) {
                    return response()->json([
                        'status' => 1,
                        'message' => $resultado[0]->Resultado,
                    ]);
                } else {
                    return response()->json([
                        'status' => 0,
                        'message' => 'No se encontró ningún autorizador con los criterios proporcionados.',
                    ], 404);
                }
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Error al ejecutar el procedimiento almacenado: ' . $e->getMessage(),
                ], 500);
            }
        }
        public function spGrillaTurnosComplete(Request $request)
        {
            // Log de los datos recibidos
            Log::info('Datos recibidos en spGrillaTurnosComplete:', [
                'desde' => $request->desde,
                'hasta' => $request->hasta
            ]);
            // Validación de los datos entrantes
            $request->validate([
                "desde" => "required|date",
                "hasta" => "required|date",
            ]);
        
        
            try {
                // Ejecutar el procedimiento almacenado
                $result = DB::connection("JDP")->select(
                    'exec JDP_TUR_SpGrillaTurnosComplete ?,?',
                    [
                        $request->desde,
                        $request->hasta
                    ]
                );
        
                // Log de la respuesta que se envía
                Log::info('Respuesta enviada desde spGrillaTurnosComplete:', [
                    'resultado' => $result
                ]);
        
                return response()->json($result);
        
            } catch (\Exception $e) {
                // Log del error si ocurre
                Log::error('Error al ejecutar spGrillaTurnosComplete:', [
                    'error' => $e->getMessage()
                ]);
        
                // Retornar una respuesta de error al cliente
                return response()->json([
                    'status' => 0,
                    'message' => 'Error al procesar la solicitud'
                ], 500);
            }
        }
    }
    