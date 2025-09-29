---------------------------------------------------------------------------------------------
--- Agregar los SECTORES HABILITADOS a los usuarios
---------------------------------------------------------------------------------------------

-- Aca agarro todos los usuarios habilitados del CRM, les pongo
-- Los perfiles de Facturacion de Tango y lo vinculo
-- Con las sucursales de Tango que luego vinculo con las sucursales 
-- del Turno y lo junto con los sectores.
-- De esta forma tengo todos los sectores habilitados por cada usuario 
-- habilitado de CRM

INSERT INTO  dbo.JDP_TUR_USUARIO_SECTOR
(
    id_usuario,
    id_sector,
    habilitado
)
--SELECT US.id,SCU.id_sector,SCU.id_sucursal,SC.*,SUC.COD_PERFIL,SUC.NOMBRE,PUS.USUARIO,VEN.NOMBRE,* 
SELECT US.id,SCU.id_sector,1
FROM dbo.JDP_TUR_SUCURSAL SC
LEFT JOIN  dbo.JDP_FUN_SUCURSALES SUC ON SC.id_suc_CRM = SUC.COD_PERFIL COLLATE Modern_Spanish_CI_AI
LEFT JOIN GVA51 PF ON  PF.COD_PERFIL = SUC.COD_PERFIL  COLLATE Modern_Spanish_CI_AI
LEFT JOIN GVA52 PUS on PUS.COD_PERFIL = SUC.COD_PERFIL  COLLATE Modern_Spanish_CI_AI
LEFT JOIN CRM_VENDEDORES VEN ON VEN.Nombre = PUS.USUARIO COLLATE Modern_Spanish_CI_AI
LEFT JOIN Diccionario_048006_003.dbo.users US ON US.id_crm = ven.ID_Vendedor
LEFT JOIN dbo.JDP_TUR_SECTOR_SUCURSAL SCU ON SCU.id_sucursal = SC.id_sucursal
WHERE usuario IS NOT NULL AND US.id IS NOT null
ORDER BY 1,2

--INSERT INTO  dbo.JDP_TUR_USUARIO_SECTOR
--SELECT *  FROM dbo.JDP_TUR_USUARIO_SECTOR
--SELECT * FROM dbo.JDP_TUR_SUCURSAL
--SELECT * FROM dbo.JDP_TUR_SECTOR_SUCURSAL
