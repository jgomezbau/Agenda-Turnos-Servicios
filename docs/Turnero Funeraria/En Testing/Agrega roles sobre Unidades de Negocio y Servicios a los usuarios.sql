 USE [JDP]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  <Author,,Name>  
-- Create date: <Create Date,,>  
-- Description: <Description,,>  
-- =============================================  
----------------------  
-- Creado por JJGB  
----------------------  
  
ALTER PROCEDURE [dbo].[JDP_TUR_SpaAgregaRolesUsuarios]  
    -- Add the parameters for the stored procedure here  
    @Usuario_IN VARCHAR(MAX),  
    @ROL_IN INT,  
    @SUCURSALES_IN VARCHAR(MAX),	-- Si viene * son todas las sucursales, sino tiene que venir un string con numeros separados por comas 
    @SERVICIOS_IN VARCHAR(MAX),		-- Si viene * son todos los servicios, sino tiene que venir un string con numeros separados por comas 
	@TIPOSUCURSAL_IN VARCHAR(MAX)	-- Si viene * son todas los tipos de sucursales, sino tiene que venir un string con numeros separados por comas 
AS  
BEGIN
---------------------------------------------------------------------------------------------
--- Agregar ROLES A USUARIOS
---------------------------------------------------------------------------------------------

DECLARE @FiltroSucursalesXML AS XML = CAST('<X>' + REPLACE(@SUCURSALES_IN, ',', '</X><X>') + '</X>' AS XML);
DECLARE @FiltroServiciosXML AS XML = CAST('<X>' + REPLACE(@SERVICIOS_IN, ',', '</X><X>') + '</X>' AS XML);
DECLARE @FiltroTipoSucursalXML AS XML = CAST('<X>' + REPLACE(@TIPOSUCURSAL_IN, ',', '</X><X>') + '</X>' AS XML);

IF OBJECT_ID('tempdb..#Temp') IS NOT NULL
    DROP TABLE #Temp;
IF OBJECT_ID('tempdb..#TempFiltroSucursales') IS NOT NULL
    DROP TABLE #TempFiltroSucursales;
IF OBJECT_ID('tempdb..#TempFiltroServicios') IS NOT NULL
    DROP TABLE #TempFiltroServicios;
IF OBJECT_ID('tempdb..#TempFiltroTipoSucursal') IS NOT NULL
    DROP TABLE #TempFiltroTipoSucursal;

CREATE TABLE #TempFiltroSucursales
(
    value INT
)
CREATE TABLE #TempFiltroServicios
(
    value INT
);
CREATE TABLE #TempFiltroTipoSucursal
(
    value INT
);

IF (@SUCURSALES_IN <> '*')
    INSERT INTO #TempFiltroSucursales
    SELECT [N].value('.', 'varchar(50)') AS value
    FROM @FiltroSucursalesXML.nodes('X') AS [T]([N]);
ELSE
    INSERT INTO #TempFiltroSucursales
    SELECT SUC.id_sucursal
    FROM dbo.JDP_TUR_SUCURSAL SUC;

IF (@SERVICIOS_IN <> '*')
    INSERT INTO #TempFiltroServicios
    SELECT [N].value('.', 'varchar(50)') AS value
    FROM @FiltroServiciosXML.nodes('X') AS [T]([N]);
ELSE
    INSERT INTO #TempFiltroServicios
    SELECT SER.id_servicio
    FROM dbo.JDP_TUR_SERVICIO SER;

IF (@TIPOSUCURSAL_IN <> '*')
    INSERT INTO #TempFiltroTipoSucursal
    SELECT [N].value('.', 'varchar(50)') AS value
    FROM @FiltroTipoSucursalXML.nodes('X') AS [T]([N]);
ELSE
    INSERT INTO #TempFiltroTipoSucursal
    SELECT TSU.id_tipo_sucursal
    FROM dbo.JDP_TUR_TIPO_SUCURSAL TSU


-- EJECUTAR DESDE ACA
DECLARE @xml AS XML,
        @contador INT
    =   0,
        @limite INT,
        @delimitador AS VARCHAR(10) = ',',
        @Usuario INT, --
        @SUCURSALES XML =
        (
            SELECT SUC.id_sucursal
            FROM dbo.JDP_TUR_SUCURSAL SUC
            WHERE SUC.id_sucursal IN ( SELECT value FROM #TempFiltroSucursales ) 
            FOR XML PATH('Sucursal')
        ),
        @servicios XML =
        (
            SELECT id_servicio
            FROM dbo.JDP_TUR_SERVICIO SER
            WHERE SER.id_servicio IN ( SELECT value FROM #TempFiltroServicios ) 
            FOR XML PATH('Servicio')
        ),
        @TipoSucursal XML=
        (
            SELECT TSUC.id_tipo_sucursal
            FROM dbo.JDP_TUR_TIPO_SUCURSAL TSUC
            WHERE TSUC.id_tipo_sucursal IN (SELECT value FROM #TempFiltroTipoSucursal ) --TSUC.id_tipo_sucursal) -- esto es para ponerle un where y depsues limitarlo -- Si no limito incluye todos los tipos de sucursales
            FOR XML PATH('TipoSucursal')
        )

-----------------------------------------------------------------------------------------------------------------------------
-- desde aca empeza 
-----------------------------------------------------------------------------------------------------------------------------
SET @xml = CAST('<X>' + REPLACE(@Usuario_IN, @delimitador, '</X><X>') + '</X>' AS XML);
SET @limite =
(
    SELECT COUNT([N].value('.', 'varchar(50)')) AS value
    FROM @xml.nodes('X') AS [T]([N])
);
SELECT [N].value('.', 'varchar(50)') AS value
INTO #Temp
FROM @xml.nodes('X') AS [T]([N]);

-----------------------------------------------------------------------------------------------------------------------------
--- ACA EMPIEZA A EJECUTARSE en un bucle, Usuario x Usuario
-----------------------------------------------------------------------------------------------------------------------------
WHILE @contador < @limite
BEGIN
    SET @contador = @contador + 1;
    SET @Usuario =
    (
        SELECT value
        FROM
        (
            SELECT ROW_NUMBER() OVER (ORDER BY value ASC) AS rownumber,
                   value
            FROM #Temp
        ) AS foo
       WHERE rownumber = @contador
    );
    SELECT @Usuario
	EXEC dbo.JDP_TUR_SpGrabarRolesUsuarios @Usuario = @Usuario,       -- int
                                     @ROL = @ROL_IN,           -- int
                                     @SUCURSALES = @SUCURSALES, -- xml
                                     @servicios = @servicios,   -- xml,   -- xml
                                     @TIPOSUCURSAL = @TipoSucursal -- xml
END;


IF OBJECT_ID('tempdb..#Temp') IS NOT NULL
    DROP TABLE #Temp;
IF OBJECT_ID('tempdb..#TempFiltroSucursales') IS NOT NULL
    DROP TABLE #TempFiltroSucursales;
IF OBJECT_ID('tempdb..#TempFiltroServicios') IS NOT NULL
    DROP TABLE #TempFiltroServicios;
IF OBJECT_ID('tempdb..#TempFiltroTipoSucursal') IS NOT NULL
    DROP TABLE #TempFiltroTipoSucursal;
END
