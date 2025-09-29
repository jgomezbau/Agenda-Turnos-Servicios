<?php

class Cconexion{
    public static function ConexionBD(){

        $host='10.100.35.4\AXSQLSERVER';
        $BBDD='JDP_DESARROLLO';
        $username='PQ';
        $contraseña='Qwerty2023!';
        $puerto=61046;
        try{
            $conn= new PDO("sqlsrv:Server=$host,$puerto;Database=$BBDD;TrustServerCertificate=true",$username,$contraseña);
            echo "Se conecto correctamente a la base de Datos de Desarrollo<br>";
            echo "10.100.35.4\\AXSQLSERVER<br>";
            echo "PORT: 61046<br>";
        }
        catch(PDOExeption $exp){
            
            echo "no se conecto a la base de datos: $BBDD, error: $exp";
        }
        return $conn;
    }
}
?>