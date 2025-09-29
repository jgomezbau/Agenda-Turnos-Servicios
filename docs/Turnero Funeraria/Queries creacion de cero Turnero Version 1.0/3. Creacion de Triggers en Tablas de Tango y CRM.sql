USE [JDP]
GO
GO
/****** Object:  Trigger [dbo].[JDP_PQ_INSERT_CRM_VENDEDORES]    Script Date: 31/5/2023 11:16:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[JDP_PQ_INSERT_CRM_VENDEDORES]  
ON [dbo].[CRM_VENDEDORES]  
FOR INSERT  
AS  
BEGIN  
    -- SET NOCOUNT ON added to prevent extra result sets from  
    -- interfering with SELECT statements.  
    SET NOCOUNT ON;  
    BEGIN  
        INSERT INTO Diccionario_048006_003.dbo.users  
        (  
            name,  
            name_user,  
            password,  
            supervisor,  
            email,
			habilitado,
			Reporta_A,
			id_crm
        )  
        SELECT v.Nombre,  
               v.Nombre,  
               v.Password,  
               0,  
               v.DIR_MAIL
			   ,v.habilitado
			   ,Reporta_A, v.ID_Vendedor
        FROM Inserted v;  
    END;  
END;  
GO

ALTER TABLE [dbo].[CRM_VENDEDORES] ENABLE TRIGGER [JDP_PQ_INSERT_CRM_VENDEDORES]
GO

/****** Object:  Trigger [dbo].[JDP_PQ_UPDATE_CRM_VENDEDORES]    Script Date: 31/5/2023 11:16:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[JDP_PQ_UPDATE_CRM_VENDEDORES]
ON [dbo].[CRM_VENDEDORES]
FOR UPDATE
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON;
    BEGIN
	DECLARE @name VARCHAR(255) = (SELECT Nombre FROM Inserted)
	DECLARE @Password VARCHAR(255) = (SELECT Password FROM Inserted)
	DECLARE @mail VARCHAR(255) = (SELECT DIR_MAIL FROM Inserted)
	DECLARE @habilitado VARCHAR(255) = (SELECT habilitado FROM Inserted)
	DECLARE @Reporta_A VARCHAR(255) = (SELECT Reporta_A FROM Inserted)

        UPDATE Diccionario_048006_003.dbo.users
		SET password = @Password,email = @mail, habilitado=@habilitado, Reporta_A=@Reporta_A
		WHERE name = @name
    END;
END;
GO
ALTER TABLE [dbo].[CRM_VENDEDORES] ENABLE TRIGGER [JDP_PQ_UPDATE_CRM_VENDEDORES]
GO




