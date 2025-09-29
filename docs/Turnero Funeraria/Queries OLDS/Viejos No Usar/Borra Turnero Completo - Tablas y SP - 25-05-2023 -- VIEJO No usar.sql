-- ELIMIMNA LAS TABLAS DEL TURNERO y los STORE PROCEDURE
-- BORRA EL TURNERO POR COMPLETO.

--ACA ELIMINO LAS TABLAS PROPIAS DEL DESARROLLO DE PQ DENTRO DEL DICCIONARIO
USE [Diccionario_048006_003]
GO

DROP TABLE users					-- Usuarios habilitados
DROP table personal_access_tokens	-- Creo ques una tabla para logs de accesos.
DROP table PQ_Empresa				-- LAs Empresas Configuradas
DROP table pq_menus					-- Las Opciones de Menus en Pantalla
DROP table pq_rolatributo			-- Aca se indica que menus van a ver los usuarios y cuales los administradores.
DROP table pq_rol					-- Roles en el sistema (Administrador o usuarios)
DROP table pq_permiso				-- Una Tabla con 800 lineas donde se guarda si es administrador o usuario, no se si esta relacionado con nosotros.
DROP table pq_rutas				    -- Aca pone cual es la pagina que tiene que abrir y que nombre va a figurar en pantalla.
DROP table dxtemas					-- Temas para la web

-- ACA ELIMINO LAS TABLAS PROPIAS DEL TURNERO EN SI MISMO
USE [JDP]
GO

DROP table PQ_TUR_ESTADO_TURNO
drop table PQ_TUR_ESTADOS_GRILLA
DROP TABLE PQ_TUR_FLUJO_ESTADO_TURNO
DROP TABLE PQ_TUR_HORARIOS_UN_SERVICIO
DROP TABLE PQ_TUR_MAILS_CCO
DROP TABLE PQ_TUR_TIPO_ESTADOS_TURNO
DROP TABLE PQ_TUR_UN_SER_ROL
DROP TABLE PQ_TUR_USUARIO_SECTOR
DROP TABLE PQ_TUR_DEF_FLUJO_ESTADO
DROP TABLE PQ_TUR_ROLES_USUARIOS
DROP TABLE PQ_TUR_TIPO_ROLES
DROP TABLE PQ_TUR_UNIDAD_SERVICIOS_ADICIONALES
DROP table PQ_TUR_TIPO_UNIDAD_SERVICIOS_ADICIONALES
drop table PQ_TUR_TURNOS
drop table PQ_TUR_SERVICIO_UNIDAD_NEGOCIO
drop table PQ_TUR_SECTOR_SUCURSAL
drop table PQ_TUR_TIPO_SERVICIOS_ADICIONALES
drop table PQ_TUR_SERVICIO
DROP table PQ_TUR_UNIDAD_NEGOCIO
DROP table PQ_TUR_SUCURSAL
DROP table PQ_TUR_TIPO_SUCURSAL


-- ACA ELIMINO LOS STORE PROCEDURES PROPIOS DEL TURNERO EN SI MISMO
USE [JDP]
GO
DROP PROCEDURE PQ_TUR_SpClienteCRM
DROP PROCEDURE PQ_TUR_SpClienteCRMFiltrado
DROP PROCEDURE PQ_TUR_SpEnviaCorreo
DROP PROCEDURE PQ_TUR_SpGrabarTurno
DROP PROCEDURE PQ_TUR_SpGrillaServiciosAdicionales
DROP PROCEDURE PQ_TUR_SpGrillaTurnos2
DROP PROCEDURE PQ_TUR_SpHorariosInhablitados
DROP PROCEDURE PQ_TUR_SpPresupuestos
DROP PROCEDURE PQ_TUR_SpPresupuestosVersion
DROP PROCEDURE PQ_TUR_SPSectoresHabilitados
DROP PROCEDURE PQ_TUR_SpServicio
DROP PROCEDURE PQ_TUR_SpSucursal
DROP PROCEDURE PQ_TUR_SPSucursalesHabilitadas
DROP PROCEDURE PQ_TUR_SpTipo_Estados_Turno_Habilitados
DROP PROCEDURE PQ_TUR_SpTipoEstadosTurno
DROP PROCEDURE PQ_TUR_SpTipoSucursal
DROP PROCEDURE PQ_TUR_SpTurno_Unidad_Servicios_adicionales
DROP PROCEDURE PQ_TUR_SpTurnosInhablitados
DROP PROCEDURE PQ_TUR_SpTurnosOcupados
DROP PROCEDURE PQ_TUR_SpUnidad
DROP PROCEDURE PQ_TUR_SPValidarTurno
