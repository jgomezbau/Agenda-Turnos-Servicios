/*
-- OJO NO ENCUENTRA LAS QUE DURAN DOS DIAS

--- Crea manualmente un bloqueo
--Se bloquean Salas “A” y “B” para velatorios y Depósitos por refacciones los días 6 y 7 de Junio.
-- Compañia Principal Olivos
SELECT * FROM dbo.JDP_TUR_SUCURSAL
-- Suc 22 
SELECT * FROM dbo.JDP_TUR_UNIDAD_NEGOCIO
WHERE id_sucursal = 18
-- UN 21 y 22 Son las Salas A y B de Principal Olivos
SELECT * FROM dbo.JDP_TUR_SERVICIO_UNIDAD_NEGOCIO
--108
--es 13 - 1
*/

DECLARE @id_Servicio INT = 0,   -- Servicio 0 es para todos los servicios
        @id_Unidad INT = 17,
        @fecha_hora_desde DATETIME = '2023-06-28 00:00:00',
        @fecha_hora_hasta DATETIME = '2023-06-29 13:00:00',
        --@fecha_hora_desde	DATETIME = '2023-06-02 15:00:00.000',	
        --@fecha_hora_hasta DATETIME = '2023-06-06 10:00:00.000',
        @observaciones VARCHAR(MAX)= 'Se Bloquea la Unidad por problemas estructurales en el sanitario.',
        @usuario VARCHAR(MAX) = 'SUPERVISOR',
        @estado_grilla INT = 1001,
		@id_un_servicio INT,
		@respuesta VARCHAR(MAX)



EXEC dbo.JDP_TUR_SpBloqueaSalas @id_Servicio = @id_Servicio,           -- int
                                @id_Unidad = @id_Unidad,               -- int
                                @fecha_hora_desde = @fecha_hora_desde, -- datetime
                                @fecha_hora_hasta = @fecha_hora_hasta, -- datetime
                                @observaciones = @observaciones,       -- varchar(max)
                                @usuario = @usuario,                   -- varchar(max)
                                @estado_grilla = @estado_grilla,       -- int
								@resp = @respuesta OUTPUT



SELECT ISNULL(@respuesta,'Se genero correctamente el bloqueo')

-- Aca busco el turno que aparece para cancelarlo en caso que hubiera
SELECT TOP 1 @id_UN_Servicio = id FROM dbo.JDP_TUR_SERVICIO_UNIDAD_NEGOCIO
WHERE ID_servicio = @id_Servicio AND ID_unidad_negocio= @id_Unidad
IF (@respuesta IS NOT NULL)
SELECT *
    FROM JDP_TUR_TURNOS TUR
        INNER JOIN
        (
            SELECT et.*
            FROM JDP_TUR_ESTADO_TURNO et
                INNER JOIN
                (
                    SELECT id_turno,
                           MAX(fecha_hora) AS fecha_hora
                    FROM JDP_TUR_ESTADO_TURNO
                    GROUP BY id_turno
                ) AS t
                    ON et.id_turno = t.id_turno
                       AND et.fecha_hora = t.fecha_hora
        ) AS estado
            ON TUR.id_turnos = estado.id_turno
        --ON estado.id_turno = @turno
        INNER JOIN dbo.JDP_TUR_TIPO_ESTADOS_TURNO EST
            ON EST.id_tipo_estados_turno = estado.id_estado
    WHERE (
              (
                  fecha_hora_desde <= @fecha_hora_desde
                  AND fecha_hora_hasta > @fecha_hora_desde
              )
              OR
              (
                  fecha_hora_desde >= @fecha_hora_desde
                  AND fecha_hora_desde < @fecha_hora_hasta
              )
          )
          AND TUR.id_un_servicio = @id_un_servicio
          AND EST.libera_grilla = 0

-- Cancela Los turnos
/*
INSERT INTO dbo.JDP_TUR_ESTADO_TURNO
(
    id_turno,
    id_estado,
    fecha_hora,
    usuario
)
VALUES
(   44, -- id_turno - int
    4, -- id_estado - int ESTADO 4 es cancelada
    GETDATE(), -- fecha_hora - datetime
    'SUPERVISOR'  -- usuario - varchar(50)
    )
*/
/*
-- Elimina los estado de los turnos

delete JDP_TUR_ESTADO_TURNO WHERE id_estado_turno IN (210,211,212)
*/
