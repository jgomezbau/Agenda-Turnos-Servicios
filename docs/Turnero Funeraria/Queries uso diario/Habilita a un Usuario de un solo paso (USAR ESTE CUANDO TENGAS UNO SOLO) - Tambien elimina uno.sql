-- ACA AGREGO DE UN TIRO A UN USUARIO
--SELECT * FROM dbo.JDP_TUR_SECTOR_SUCURSAL  -- Lista los sectores
--SELECT * FROM dbo.JDP_TUR_USUARIO_SECTOR WHERE id_usuario = 781 -- Lista los sectores asignados a ese usuario
--SELECT * FROM JDP_TUR_ROLES_USUARIOS WHERE id_usuario = 781	    -- Lista las Unidades asignadas a ese usuario
--SELECT * FROM Diccionario_048006_003.dbo.users WHERE name IN('EDECEBAL','MMARCOS','DFERREYRA') --Lista el usuario 

-- Si nos solcitan el alta de un usuario, lo primero que hay que ver es si si copio de la tabla CRM_VENDEDORES
-- A la Tabla users del diccionario. 
-- Si no estuviera habria que copiarlo.

SELECT * FROM Diccionario_048006_003.dbo.users
WHERE name LIKE '%GUERREI%' OR name LIKE '%PISO%'

-- Una vez que vemos si esta en la Tabla Users, tomamos los IDs (primera columna) y con eso seguimos.

--Lo siguiente es ver que NO esten ya dados de alta en los sectores.
-- Si no estan aca, seguro nunca se dieron de alta
SELECT * FROM JDP_TUR_USUARIO_SECTOR WHERE id_usuario IN(1033)
-- o que no tengan roles asignados
SELECT *  FROM JDP_TUR_ROLES_USUARIOS WHERE id_usuario IN(1033)

-----------------------------------------------------------------------------------------------
-- Aca elimino ese Ususario de un tiro en todo
-----------------------------------------------------------------------------------------------
/*
DELETE dbo.JDP_TUR_USUARIO_SECTOR WHERE id_usuario in (1033)
DELETE JDP_TUR_ROLES_USUARIOS WHERE id_usuario in (1033) 
*/
-----------------------------------------------------------------------------------------------




------------------------------------------------------------------------------------------------------------
---  ACA EMPIEZO A DAR DE ALTA AL USUARIO - VOY A USAR LOS IDS QUE CONSEGUI MAS ARRIBA
---  Y NECESITO SABER LOS SECTORES A LOS QUE VA A REEMPRESENTAR
------------------------------------------------------------------------------------------------------------
-- VINCULO el Usuario con el sector  -- En nombre de que sectores puede pedir un turno
-----------------------------------------------------------------------------------------------
INSERT INTO dbo.JDP_TUR_USUARIO_SECTOR(id_usuario,id_sector,habilitado) VALUES (1033,13,DEFAULT) 
INSERT INTO dbo.JDP_TUR_USUARIO_SECTOR(id_usuario,id_sector,habilitado) VALUES (1033,8,DEFAULT) 
INSERT INTO dbo.JDP_TUR_USUARIO_SECTOR(id_usuario,id_sector,habilitado) VALUES (1033,18,DEFAULT) 

-----------------------------------------------------------------------------------------------
-- Agrego el rol de Iniciador a esos Usuarios
-----------------------------------------------------------------------------------------------
EXEC dbo.JDP_TUR_SpaAgregaRolesUsuarios @Usuario_IN = '1033',
                                        @ROL_IN = 1,            -- int
                                        @SUCURSALES_IN = '*',   -- varchar(max)
                                        @SERVICIOS_IN = '1,2',  -- varchar(max)
                                        @TIPOSUCURSAL_IN = '*'; -- varchar(max)

-----------------------------------------------------------------------------------------------
-- ACA LE PONGO DE DONDE QUIERO QUE SEA AUTORIZADOR
-----------------------------------------------------------------------------------------------
UPDATE JDP_TUR_ROLES_USUARIOS SET id_tipo_rol = 2 
FROM dbo.JDP_TUR_ROLES_USUARIOS RUS
LEFT JOIN  dbo.JDP_TUR_UNIDAD_NEGOCIO UN ON un.id_unidad_negocio = RUS.id_unidad_negocio
LEFT JOIN dbo.JDP_TUR_SERVICIO_UNIDAD_NEGOCIO UNS ON UNS.ID_unidad_negocio = UN.id_unidad_negocio
LEFT JOIN JDP_TUR_sector_sucursal SSU ON SSU.id_sucursal = UN.id_sucursal
where SSU.id_sector IN(13,8,19) AND RUS.id_usuario IN (1033)
-----------------------------------------------------------------------------------------------
--De puro Gusto le pongo el nombre en la Tabla de Ususarios.
-----------------------------------------------------------------------------------------------
UPDATE Diccionario_048006_003.dbo.users SET name_user = 'MARCELO JIMENEZ' where id = 1033

-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
-- Aca elimino ese Ususario de un tiro en todo
-----------------------------------------------------------------------------------------------
/*
DELETE dbo.JDP_TUR_USUARIO_SECTOR WHERE id_usuario in (781)
DELETE JDP_TUR_ROLES_USUARIOS WHERE id_usuario in (781) 
*/
-----------------------------------------------------------------------------------------------
