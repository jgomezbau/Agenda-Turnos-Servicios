-- Coloca todos los correos y telefonos en el de Juan
-- Ejecutar esto despues de migrar la Base de datos.

SELECT * FROM dbo.JDP_TUR_SUCURSAL
UPDATE dbo.JDP_TUR_SUCURSAL
SET email ='jbau@jardindelpilar.com.ar',WhatsApp ='5491156618093'

SELECT * FROM dbo.JDP_TUR_SECTOR_SUCURSAL
UPDATE dbo.JDP_TUR_SECTOR_SUCURSAL
SET email ='jbau@jardindelpilar.com.ar',WhatsApp ='5491156618093'

SELECT * FROM Diccionario_048006_003.dbo.users
UPDATE Diccionario_048006_003.dbo.users
SET email ='jbau@jardindelpilar.com.ar'